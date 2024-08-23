import { Player } from "@/player";
import MeonDanmakuEngine, { TrackType } from "./MeonDanmakuEngine";
import { PlayerOptions } from "@/types";
import { BasePlugin } from "@/plugin";
import { classPrefix } from "@/config";
import { createElement } from "@/utils";

declare module "@core" {
  interface PlayerPlugins {
    danmakuEngine?: DanmakuEngine;
  }
}

/** css弹幕引擎
 *
 * 负责弹幕播放与绘制
 *
 * 前置插件: `danmaku`
 */

export default class DanmakuEngine extends BasePlugin {
  static readonly pluginName = "danmakuEngine";
  core: MeonDanmakuEngine;
  $el: HTMLDivElement;
  constructor(player: Player) {
    super(player);
    this.$el = this.plugins.danmaku!.$el.appendChild(
      createElement("div", { class: `${classPrefix}-rowdanmaku` })
    );
    this.core = new MeonDanmakuEngine(this.$el, {
      getTime: () => this.player.currentTime,
      classPrefix: classPrefix,
    });
  }
  init() {
    this.player.on("play", () => {
      this.core.play();
    });
    this.player.on("pause", () => {
      this.core.pause();
    });
    this.player.on("seeking", () => {
      this.core.pause();
      this.core.seek();
    });
    this.player.on("seeked", () => {
      !this.player.paused && this.core.play();
    });
    this.player.on("danmaku:blockType", (type, flag) => {
      switch (type) {
        case "top":
        case "bottom":
        case "roll":
        case "reverse":
          this.core.setTrackFilter(type, flag);
          return;
        case "color":
          this.core.setColorFilter(flag);
      }
    });
    this.player.on("danmaku:add", (dan, play) => {
      this.core.add(dan, play);
    });
    this.player.on("danmaku:remove", (dan) => {
      this.core.remove(dan);
    });
    this.player.on("danmaku:draw", (dm) => {
      this.core.draw([dm]);
    });
    this.player.on("danmaku:blockUser", (user, flag) => {
      this.core.setUserFilter(user, flag);
    });
    this.player.on("danmaku:blockContent", (content, flag) => {
      this.core.setContentFilter(content, flag);
    });
    this.player.on("danmaku:clear", () => {
      this.core.clear();
    });
    this.player.on("danmaku:on", () => {
      this.core.show();
    });
    this.player.on("danmaku:off", () => {
      this.core.hide();
    });
  }

  apply(player: Player, options: PlayerOptions): void {
    if (options.danmaku) {
      const { scale, area, font, bold, speed, opacity, blockType } = options.danmaku;
      scale && this.setScale(scale);
      font && this.setFont(font);
      bold != null && this.setBold(bold);
      area != null && this.setArea(area);
      speed && this.setSpeed(speed);
      opacity && this.setOpacity(opacity);
      blockType?.forEach((type) => this.player.emit("danmaku:blockType", type, true));
    }
  }

  // 弹幕播放属性
  /** 弹幕不透明度 */
  get opacity() {
    return this.core.opacity;
  }
  /** 弹幕速度 */
  get speed() {
    return this.core.speed;
  }
  /** 弹幕区域 */
  get area() {
    return this.core.limitArea == 1 && this.core.overlap ? Infinity : this.core.limitArea;
  }
  /** 设置弹幕大小 */
  get scale() {
    return this.core.fontScale;
  }
  /** 设置弹幕字体 */
  get font() {
    return this.core.fontFamily;
  }
  /** 弹幕加粗 */
  get bold() {
    return this.core.fontWeight == "bold";
  }

  /** 弹幕数 */
  get count() {
    return this.core.count;
  }
  /** 屏幕弹幕数 */
  get screenCount() {
    return this.core.screenCount;
  }
  /** 类型屏蔽列表 */
  getTypeBlockList() {
    const list: string[] = (["roll", "reverse", "top", "bottom"] as TrackType[]).filter(
      (t) => this.core.trackFilter[t]
    );
    this.core.colorFilter && list.push("color");
    return list;
  }

  // 弹幕播放属性设置

  /** 设置弹幕不透明度 */
  setOpacity(value: number) {
    this.core.opacity = value;
    this.player.emit("danmaku:opacityChange", value);
  }
  /** 设置弹幕速度 */
  setSpeed(value: number) {
    this.core.speed = value;
    this.player.emit("danmaku:speedChange", value);
  }
  /** 设置弹幕区域 */
  setArea(value: number) {
    if (value > 1) {
      this.core.limitArea = 1;
      this.core.overlap = true;
    } else {
      this.core.limitArea = value;
      this.core.overlap = false;
    }
    this.player.emit("danmaku:areaChange", value);
  }
  /** 设置弹幕大小 */
  setScale(value: number) {
    this.core.fontScale = value;
    this.player.emit("danmaku:scaleChange", value);
  }
  /** 设置弹幕字体 */
  setFont(value: string) {
    this.core.fontFamily = value;
    this.player.emit("danmaku:fontChange", value);
  }
  /** 设置弹幕加粗 */
  setBold(value: boolean) {
    this.core.fontWeight = value ? "bold" : "";
    this.player.emit("danmaku:boldChange", value);
  }
  /** 根据坐标捕获弹幕 */
  capture(x: number, y: number, r: number) {
    return this.core.captureDanmaku(x, y, r);
  }
}
