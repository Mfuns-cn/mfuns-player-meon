import { DanmakuMode } from "../types";
/** 播放器弹幕引擎 */

import { DanmakuItem } from "../types";
import { numberToHexColor } from "@/utils";

export type TrackType = "roll" | "reverse" | "top" | "bottom";

export interface DanmakuEngineOptions {
  fontScale?: number;
  fontFamily?: string;
  fontWeight?: string;
  speed?: number;
  opacity?: number;
  limitArea?: number;
  classPrefix?: string;
  /** 颜色限制 */
  colorFilter?: boolean;
  /** 用户屏蔽 */
  userFilter?: (string | number)[];
  /** 内容屏蔽 */
  contentFilter?: (string | RegExp)[];
  /** 轨道屏蔽 */
  trackFilter?: Record<TrackType, boolean>;
  /** 获取当前时间函数 */
  getTime: () => number;
}

export default class MeonDanmakuEngine {
  /** 暂停状态 */
  public paused = false;

  /** 隐藏状态 */
  public hidden = false;

  /** 弹幕容器 */
  public readonly container: HTMLDivElement;

  /** 弹幕不透明度 */
  public opacity: number;
  /** 弹幕移动速度 */
  public speed: number;
  /** 限制区域 */
  public limitArea: number;
  /** 弹幕字号缩放 */
  public fontScale: number;
  /** 字体 */
  public fontFamily: string;
  /** 字重 */
  public fontWeight: string;

  /** 基准轨道高度 */
  public baseTrackHeight: number;
  /** 轨道边距 */
  public trackPadding: number;
  /** 颜色屏蔽 */
  public colorFilter: boolean;
  /** 轨道屏蔽 */
  public trackFilter: Record<TrackType, boolean>;
  public userFilter: (string | number)[];
  public contentFilter: (string | RegExp)[];
  /** 允许重叠 */
  public overlap: boolean;
  /** 类名前缀 */
  public classPrefix: string;
  /** 获取当前时间函数 */
  public getTime: () => number;
  /** 当前时间 */
  private time = 0;

  /** 弹幕池 */
  private list: DanmakuItem[] = [];
  /** 待添加弹幕索引 */
  private currentIndex = 0;
  /** 文字测量上下文 */
  private measureContext: CanvasRenderingContext2D | null = null;

  /** 弹幕发射位置与播放器边界的距离 */
  public startDistance = 2;
  /** 时间偏移 */
  public timeOffset = 0;
  /** 滚动弹幕基准速度 */
  public baseSpeed = 100;
  /** 静止弹幕基准持续时间 */
  public baseDuration = 5;
  /** 弹幕速度增加率k值
   * 弹幕速度 = baseSpeed * (1 + deltaSpeed * 弹幕宽度)
   */
  public deltaSpeed = 0.002;

  /** 弹幕轨道高度 */
  private trackHeights: Record<TrackType, number[]> = {
    roll: [],
    reverse: [],
    top: [],
    bottom: [],
  };

  /** 弹幕轨道 */
  private danmakuTracks: Record<TrackType, HTMLElement[][]> = {
    roll: [],
    reverse: [],
    top: [],
    bottom: [],
  };

  /** 弹幕池弹幕总数 */
  get count() {
    return this.list.length;
  }

  /** 屏幕弹幕总数 */
  get screenCount() {
    let count = 0;
    for (const ty in this.danmakuTracks) {
      this.danmakuTracks[ty as TrackType].forEach((t) => {
        count += t.length;
      });
    }
    return count;
  }

  constructor(container: HTMLDivElement, options: DanmakuEngineOptions) {
    this.container = container;
    this.fontScale = options.fontScale ?? 1;
    this.baseTrackHeight = 28;
    this.trackPadding = 6;
    this.speed = options.speed ?? 1;
    this.opacity = options.opacity ?? 1;
    this.limitArea = 1;
    this.overlap = false;
    this.fontFamily = options.fontFamily ?? "SimHei";
    this.fontWeight = options.fontWeight ?? "bold";
    this.classPrefix = options.classPrefix ?? "meon";
    this.colorFilter = options.colorFilter || false;
    this.trackFilter = Object.assign(
      {
        roll: false,
        reverse: false,
        top: false,
        bottom: false,
      },
      options.trackFilter
    );
    this.userFilter = options.userFilter || [];
    this.contentFilter = options.contentFilter || [];
    this.getTime = options.getTime;

    this.container.classList.add(`${this.classPrefix}-danmaku`);
    this.checkDanmaku();
  }

  play() {
    this.paused = false;
    this.container.classList.remove("is-paused");
  }

  pause() {
    this.paused = true;
    this.container.classList.add("is-paused");
  }

  /** 发生跳转 */
  seek() {
    // 清屏
    this.clear();
    // 重新获取当前时间及待添加弹幕索引
    this.time = this.getTime();
    const index = this.list.findIndex((d) => this.time <= d.time);
    this.currentIndex = index === -1 ? this.list.length : index;
  }

  /** 设置弹幕池 */
  setPool(dan: DanmakuItem[]) {
    // 直接设置弹幕池并排序
    this.list = [...dan];
    this.list.sort((a, b) => a.time - b.time);
    const index = this.list.findIndex((d) => this.time <= d.time);
    this.currentIndex = index === -1 ? this.list.length : index;
  }

  /** 重置弹幕池 */
  reset() {
    this.clear();
    this.list = [];
    this.currentIndex = 0;
  }

  /** 弹幕池添加弹幕 */
  add(dan: DanmakuItem[], play?: boolean) {
    dan.forEach((dm) => {
      /** 按时间顺序插入弹幕 */
      const index = this.list.findIndex((d) => dm.time <= d.time);
      this.list.splice(index === -1 ? this.list.length : index, 0, dm);
      // 若插入弹幕的时间小于当前时间，则待添加弹幕索引+1
      if (dm.time < this.time) {
        this.currentIndex += 1;
        play && this.draw(dan);
      }
    });
  }

  /** 弹幕池移除弹幕 */
  remove(dan: DanmakuItem[]) {
    const displayed = [
      ...this.container.querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-item`),
    ];
    dan.forEach((dm) => {
      const index = this.list.indexOf(dm);
      if (index === -1) return;
      this.list.splice(index, 1);
      // 移除位置若小于当前待添加弹幕位置，则待添加弹幕索引-1
      if (index < this.currentIndex) this.currentIndex -= 1;
      // 从DOM中移除弹幕
      const el = displayed.find((d) => d.dataset.id === dm.id.toString());
      if (el) {
        // 此处不移除DOM是为了使弹幕顺利完成动画，以便轨道自动清除弹幕DOM
        el.innerHTML = "";
      }
    });
  }

  /** 弹幕清屏 */
  clear(type?: TrackType) {
    if (type) {
      this.danmakuTracks[type] = [];
      return;
    }
    this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: [],
    };
    this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: [],
    };
    this.container.innerHTML = "";
  }

  /** 检查弹幕是否需要进入弹幕池 */
  checkDanmaku() {
    if (this.list.length && !this.paused && !this.hidden) {
      let item = this.list[this.currentIndex];
      const dan = [];
      // 刷新当前时间
      this.time = this.getTime();
      // 若待添加弹幕时间小于当前时间，则持续添加弹幕直到下一条弹幕的时间不小于当前时间为止
      while (item && item.time < this.time) {
        if (
          this.checkTrackFilter(item) &&
          this.checkColorFilter(item) &&
          this.checkUserFilter(item) &&
          this.checkContentFilter(item)
        ) {
          dan.push(item);
        }
        this.currentIndex += 1;
        item = this.list[this.currentIndex];
      }
      // console.log(this.currentIndex)
      this.draw(dan);
    }
    window.requestAnimationFrame(() => {
      this.checkDanmaku();
    });
  }

  /** 设置弹幕类型过滤 */
  setTrackFilter(type: TrackType, value: boolean) {
    this.trackFilter[type] = value;
    if (value) {
      this.container
        .querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-${type}`)
        .forEach((el) => {
          el.innerHTML = "";
        });
    }
  }

  /** 检查弹幕类型过滤 */
  checkTrackFilter(dm: DanmakuItem) {
    return !this.trackFilter[DanmakuMode[dm.mode] as TrackType];
  }

  /** 设置弹幕颜色过滤 */
  setColorFilter(value: boolean) {
    this.colorFilter = value;
    if (value) {
      const items = this.container.querySelectorAll<HTMLElement>(
        `.${this.classPrefix}-danmaku-item`
      );
      items.forEach((el) => {
        if (el.style.color !== "rgb(255, 255, 255)") {
          el.innerHTML = "";
        }
      });
    }
  }

  /** 检查弹幕颜色过滤 */
  checkColorFilter(dm: DanmakuItem) {
    return !this.colorFilter || dm.color === 16777215;
  }

  /** 设置内容过滤 */
  setContentFilter(content: string | RegExp, value: boolean) {
    const contentIndex = this.contentFilter.indexOf(content);
    if (value) {
      if (contentIndex > -1) {
        return;
      }
      this.contentFilter.push(content);
      const items = this.container.querySelectorAll<HTMLElement>(
        `.${this.classPrefix}-danmaku-item`
      );
      if (typeof content == "string") {
        items.forEach((el) => {
          if (el.innerText.includes(content)) {
            el.innerHTML = "";
          }
        });
      } else {
        items.forEach((el) => {
          if (content.test(el.innerText)) {
            el.innerHTML = "";
          }
        });
      }
    } else {
      contentIndex > -1 && this.contentFilter.splice(contentIndex, 1);
    }
  }
  /** 检查弹幕内容过滤 */
  checkContentFilter(dm: DanmakuItem) {
    for (const keyword of this.contentFilter) {
      if (typeof keyword == "string") {
        if (dm.content.search(keyword)) return false;
      } else if (keyword.test(dm.content)) {
        return false;
      }
    }
    return true;
  }

  /** 设置用户过滤 */
  setUserFilter(user: string | number, value: boolean) {
    const contentIndex = this.userFilter.indexOf(user);
    if (value) {
      if (contentIndex > -1) {
        return;
      }
      this.userFilter.push(user);
      const items = this.container.querySelectorAll<HTMLElement>(
        `.${this.classPrefix}-danmaku-item`
      );
      items.forEach((el) => {
        if (el.dataset.user == user) {
          el.innerHTML = "";
        }
      });
    } else {
      contentIndex > -1 && this.userFilter.splice(contentIndex, 1);
    }
  }
  /** 检查用户过滤 */
  checkUserFilter(dm: DanmakuItem) {
    return this.userFilter.indexOf(dm.user) == -1;
  }

  /** 绘制弹幕 */
  draw(dan: DanmakuItem[]) {
    /** 弹幕轨道高度 */
    const itemHeight = this.baseTrackHeight * this.fontScale;
    /** 弹幕容器宽度 */
    const containerWidth = this.container.offsetWidth;
    /** 弹幕区域高度 */
    const containerHeight = this.container.offsetHeight * this.limitArea;
    /** 轨道数量 */
    const itemY = Math.floor(containerHeight / itemHeight);
    // console.log(itemY);
    if (this.trackHeights.roll.length !== itemY) {
      this.trackHeights.roll = new Array(itemY).fill(itemHeight);
    }
    if (this.trackHeights.reverse.length !== itemY) {
      this.trackHeights.reverse = new Array(itemY).fill(itemHeight);
    }
    if (this.trackHeights.top.length !== itemY) {
      this.trackHeights.top = new Array(itemY).fill(itemHeight);
    }
    if (this.trackHeights.bottom.length !== itemY) {
      this.trackHeights.bottom = new Array(itemY).fill(itemHeight);
    }
    /** 弹幕与弹幕容器右侧的距离(滚动弹幕) */
    const danItemRight = (el: HTMLElement) => {
      const containerRight = this.container.getBoundingClientRect().right;
      const elRight = el.getBoundingClientRect().right;
      return containerRight - elRight;
    };
    /** 弹幕与弹幕容器左侧的距离(逆向弹幕) */
    const danItemLeft = (el: HTMLElement) => {
      const containerLeft = this.container.getBoundingClientRect().left;
      const elLeft = el.getBoundingClientRect().left;
      return elLeft - containerLeft;
    };
    /** 获取弹幕速度 */
    const getSpeed = (width: number) => this.baseSpeed * (1 + this.deltaSpeed * width) * this.speed;
    /** 获取单个轨道内所有弹幕 */
    const getDOMTrack = (type: string, i: number) => {
      return [
        ...this.container.querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-${type}`),
      ].filter((el: HTMLElement) => el.dataset.track === `${i}`);
    };
    /** 获取弹幕可进入的轨道 */
    const getTrack = (ele: HTMLElement, type: TrackType, width: number) => {
      // 对可用范围内的轨道进行一次遍历
      forTrack: for (let i = 0; this.overlap || i < itemY; i++) {
        const DOMTrack = getDOMTrack(type, i);
        /** 该轨道内的所有弹幕 */
        let track = this.danmakuTracks[type][i];
        this.danmakuTracks[type][i] = DOMTrack;
        if (track && track.length) {
          // 如果该轨道存在弹幕
          if (type === "roll") {
            /** 弹幕从发射到触碰另一边边界到所需要的时间 */
            const enterTime = containerWidth / getSpeed(width);
            if (track.length !== DOMTrack.length) {
              //
              track = DOMTrack;
            }
            for (const dm of track) {
              const danRight = danItemRight(dm) - 10;
              this.trackHeights[type][i] = parseInt(dm.style.fontSize) + this.trackPadding;
              // 如果滚动弹幕存在同一轨道碰撞的可能，则该轨道不可装填弹幕
              if (
                danRight <=
                  containerWidth - enterTime * getSpeed(dm.getBoundingClientRect().width) ||
                danRight <= 0
              ) {
                // 轨道高度设置为该条弹幕的高度
                continue forTrack;
              }
            }
          } else if (type === "reverse") {
            /** 弹幕从发射到触碰另一边边界到所需要的时间 */
            const enterTime = containerWidth / getSpeed(width);
            if (track.length !== DOMTrack.length) {
              //
              track = DOMTrack;
            }
            for (const dm of track) {
              const danLeft = danItemLeft(dm) - 10;
              this.trackHeights[type][i] = parseInt(dm.style.fontSize) + this.trackPadding;
              // 如果逆向弹幕存在同一轨道碰撞的可能，则该轨道不可装填弹幕
              if (
                danLeft <=
                  containerWidth - enterTime * getSpeed(dm.getBoundingClientRect().width) ||
                danLeft <= 0
              ) {
                continue forTrack;
              }
            }
          } else {
            // 非滚动弹幕该轨道不可装填
            continue forTrack;
          }
          // 轨道弹幕组遍历完毕，组内所有弹幕均完全进入容器，可以向该轨道装填弹幕
          this.danmakuTracks[type][i].push(ele);
          // 动画结束后，需从轨道弹幕组中移除该弹幕
          ele.addEventListener("animationend", () => {
            const index = this.danmakuTracks[type][i]?.indexOf(ele);
            index && this.danmakuTracks[type][i]?.splice(index, 1);
          });
          return i;
        } else {
          // 如果该轨道没有弹幕，可以向该轨道装填弹幕
          if (Array.isArray(this.danmakuTracks[type][i])) {
            this.danmakuTracks[type][i].push(ele);
          } else {
            this.danmakuTracks[type][i] = [ele];
          }

          ele.addEventListener("animationend", () => {
            const index = this.danmakuTracks[type][i]?.indexOf(ele);
            index && this.danmakuTracks[type][i]?.splice(index, 1);
          });
          return i;
        }
      }
      // 遍历完毕，所有轨道都不可用，返回-1
      return -1;
    };

    const docFragment = document.createDocumentFragment();

    for (let i = 0; i < dan.length; i++) {
      const dm = dan[i];
      /** 忽略非普通弹幕 */
      if (dm.mode >= 7) {
        continue;
      }
      /** 弹幕DOM */
      const item = document.createElement("div");
      item.classList.add(`${this.classPrefix}-danmaku-item`);
      item.classList.add(`${this.classPrefix}-danmaku-${DanmakuMode[dm.mode]}`);
      item.innerHTML = `${dm.content.replace(/(\\n)/g, "\n")}`;
      if (typeof dm.color == "number") {
        item.style.color = numberToHexColor(dm.color);
      } else {
        item.style.color = dm.color;
      }
      item.style.opacity = this.opacity.toString();
      item.style.fontSize = +dm.size * this.fontScale + "px";
      if (dm.fromHere) {
        item.style.border = "2px solid white";
      }
      /** 弹幕运动结束后，从DOM中移除该弹幕 */
      item.addEventListener("animationend", () => {
        if ([...this.container.children].indexOf(item) > -1) this.container.removeChild(item);
      });

      /** 弹幕内容宽度 */
      const itemWidth = this.measureTextWidth(
        dm.content,
        `${this.fontWeight} ${+dm.size * this.fontScale}px ${this.fontFamily}`
      );

      /** 轨道类型 */
      let trackType = DanmakuMode[dm.mode] as TrackType;
      /** 轨道位置 */
      let track: number;
      /** 轨道序号 */
      let trackIndex;
      // adjust
      switch (trackType) {
        case "roll":
        case "reverse":
          // 无限弹幕模式下轨道序号可能大于itemY，可通过取余得到实际轨道位置
          trackIndex = getTrack(item, trackType, itemWidth);
          track = trackIndex % itemY;
          // console.log(track);
          if (track >= 0) {
            const maxTop = this.trackHeights[trackType]
              .slice(0, itemY)
              .reduce((prev, cur) => prev + cur, 0);
            const top =
              this.trackHeights[trackType].slice(0, track).reduce((prev, cur) => prev + cur, 0) %
              maxTop;
            // console.log(top, track);
            if (top + parseInt(item.style.fontSize) + this.trackPadding > containerHeight) {
              this.danmakuTracks[trackType][i]?.pop();
              return;
            }
            const speed = getSpeed(itemWidth);
            const distance = itemWidth + containerWidth + this.startDistance * 2;
            item.dataset.track = trackIndex.toString();
            item.style.width = itemWidth + 1 + "px";
            item.style.top = top + "px";
            item.style.fontFamily = this.fontFamily;
            item.style.fontWeight = this.fontWeight;
            item.style.setProperty("--duration", `${distance / speed}s`); // 持续时间
            item.style.setProperty("--offset", `${containerWidth + this.startDistance}px`); // 起始位置
            item.style.setProperty("--translateX", `${-distance}px`); // 位移距离
          }
          break;
        case "top":
          track = getTrack(item, trackType, 0) % itemY;
          if (track >= 0) {
            const topArr: HTMLElement[] = [];
            const topDan = this.danmakuTracks.top;
            for (const t of topDan) {
              topArr.push(...t);
            }
            const top = topArr
              .map((el) => {
                return parseInt(el.style.fontSize) + this.trackPadding;
              })
              .slice(0, track)
              .reduce((prev, cur) => prev + cur, 0);

            if (top + parseInt(item.style.fontSize) + this.trackPadding > containerHeight) {
              this.danmakuTracks[trackType][i]?.pop();
              return;
            }
            item.dataset.track = track.toString();
            item.style.width = itemWidth + 1 + "px";
            item.style.marginLeft = `-${(itemWidth + 1) * 0.5}px`;
            item.style.top = top + "px";
            item.style.fontFamily = this.fontFamily;
            item.style.fontWeight = this.fontWeight;
            item.style.setProperty("--duration", `${this.baseDuration / this.speed}s`); // 持续时间
          }
          break;
        case "bottom":
          trackType = "bottom";
          track = getTrack(item, trackType, 0) % itemY;
          if (track >= 0) {
            const bottomArr: HTMLElement[] = [];
            const bottomDan = this.danmakuTracks.bottom;
            for (const t of bottomDan) {
              bottomArr.push(...t);
            }
            const bottom = bottomArr
              .map((el) => {
                return parseInt(el.style.fontSize) + this.trackPadding;
              })
              .slice(0, track)
              .reduce((prev, cur) => prev + cur, 0);

            if (bottom + parseInt(item.style.fontSize) + this.trackPadding > containerHeight) {
              this.danmakuTracks[trackType][i]?.pop();
              return;
            }
            item.dataset.track = track.toString();
            item.style.width = itemWidth + 1 + "px";
            item.style.marginLeft = `-${(itemWidth + 1) * 0.5}px`;
            item.style.bottom = bottom + "px";
            item.style.fontFamily = this.fontFamily;
            item.style.fontWeight = this.fontWeight;
            item.style.setProperty("--duration", `${this.baseDuration / this.speed}s`); // 持续时间
          }
          break;
        default:
          track = -1;
          console.error(`无法处理的弹幕模式: ${dm.mode}`);
      }
      if (track >= 0) {
        item.dataset.id = dm.id.toString();
        item.dataset.user = dm.user.toString();
        // 添加弹幕到容器
        this.container.appendChild(item);
      }
    }
    return docFragment;
  }
  /** 测量字体宽度 */
  measureTextWidth(text: string, font: string) {
    if (!this.measureContext) {
      this.measureContext = document.createElement("canvas").getContext("2d")!;
    }
    this.measureContext.font = font;
    return this.measureContext.measureText(text).width;
  }
  /** 根据某一坐标捕获弹幕DOM */
  captureDanmakuDOM(x: number, y: number, range: number, single = false) {
    const result: HTMLElement[] = [];
    // 遍历所有在屏上的弹幕
    const items = this.container.querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-item`);
    for (const el of items) {
      if (el.innerHTML) {
        // 获取检测边界
        const elRect = el.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        const edgeLeft = elRect.left - containerRect.left;
        const edgeRight = elRect.right - containerRect.left;
        const edgeTop = elRect.top - containerRect.top;
        const edgeBottom = elRect.bottom - containerRect.top;
        if (
          x >= edgeLeft - range &&
          x <= edgeRight + range &&
          y >= edgeTop - range &&
          y <= edgeBottom + range
        ) {
          result.push(el);
          // 如果只要求获取一个元素，则停止遍历以优化性能
          if (single) return result;
        }
      }
    }
    return result;
  }
  /** 根据某一坐标捕获弹幕 */
  captureDanmaku(x: number, y: number, range: number, single = false) {
    const resultDOM = this.captureDanmakuDOM(x, y, range, single);
    const result: DanmakuItem[] = [];
    for (const el of resultDOM) {
      const dm = this.getDanmakuById(el.dataset.id!);
      if (dm) {
        result.push(dm);
      }
    }
    return result;
  }
  /** 根据id获取弹幕 */
  getDanmakuById(id: string | number) {
    return this.list.find((dm) => dm.id.toString() === id.toString());
  }

  /** 显示弹幕 */
  show() {
    this.hidden = false;
  }

  /** 隐藏弹幕 */
  hide() {
    this.hidden = true;
    this.clear();
  }
}
