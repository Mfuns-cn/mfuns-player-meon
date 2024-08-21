import { createElement, debounce, secondToTime } from "@/utils";
import { dateFormat } from "@/utils/index";
import { DanmakuItem } from "@plugins/danmaku/types";
import { Player } from "@/player";
import { classPrefix } from "@/config";
import { html, render } from "lit-html";
import { VirtualList } from "./VirtualList";
import "./style.scss";
import Danmaku from "@plugins/danmaku/danmaku";
import { PanelPlugin } from "@/plugin";
import { PlayerOptions } from "@core";

declare module "@core" {
  interface PlayerEventMap {
    "danmakuList:autoScrollChange": (flag: boolean) => void;
    "danmakuList:select": (dan: DanmakuItem[]) => void;
  }
  interface PlayerPlugins {
    danmakuList?: DanmakuList;
  }
  interface PlayerOptions {
    /** 弹幕列表设置 */
    danmakuList?: {
      /** 自动滚动 */
      autoScroll: boolean;
    };
  }

  interface PlayerSetValueMap {
    "danmakuList:autoScroll": boolean;
  }
}

const templateHTML = /*html*/ `
  <div class="${classPrefix}-danmakulist-main">
    <div class="${classPrefix}-danmakulist-head">
      <div class="list-column col-time">时间</div>
      <div class="list-column col-content">弹幕内容</div>
      <div class="list-column col-date">发送时间</div>
    </div>
    <div class="${classPrefix}-danmakulist-select">
      <div class="${classPrefix}-danmakulist-select-info"></div>
      <div class="${classPrefix}-danmakulist-select-operate">
        <div class="list-operate-btn" data-action="clearSelect">取消选择</div>
      </div>
    </div>
    <div class="${classPrefix}-danmakulist-container"></div>
    <div class="${classPrefix}-danmakulist-status">
      <div class="status-loading-text">弹幕列表装填中……</div>
      <div class="status-failed-text">弹幕加载失败 X_X</div>
      <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
    </div>
  </div>
  <div class="${classPrefix}-danmakulist-foot">
    <div class="${classPrefix}-danmakulist-foot-left">
      <span class="${classPrefix}-danmakulist-autoscroll">列表滚动[关]</span>
    </div>
    <div class="${classPrefix}-danmakulist-foot-right"></div>
  </div>
`;

/** 获取弹幕列表项 @internal */
const getDanmakuListItem = (
  danmaku: DanmakuItem,
  index: number,
  {
    operation,
    onClick,
    onDblclick,
    selected,
    focused,
    title,
  }: {
    operation: [string, (dm: DanmakuItem) => void, unknown][];
    onClick: (e: MouseEvent) => void;
    onDblclick: (e: MouseEvent) => void;
    selected: boolean;
    focused: boolean;
    title: string;
  }
) => {
  const item = createElement(
    "div",
    {
      class: "list-row",
      "data-index": index.toString(),
      "data-mode": danmaku.mode.toString(),
      title: title,
    },
    /* html */ `
      <div class="list-cell col-time">${secondToTime(danmaku.time)}</div>
      <div class="list-cell col-content">${danmaku.content}</div>
      <div class="list-cell col-date">
        ${danmaku.date ? dateFormat(new Date(danmaku.date * 1000), "yy-MM-dd HH:mm") : "-"}
      </div>
    `
  );
  selected && item.classList.add("is-selected");
  focused && item.classList.add("is-focused");
  item.ondblclick = onDblclick;
  item.onclick = onClick;

  // 操作按钮
  const operations = operation;
  if (operations.length) {
    const operationList = createElement("div", { class: "list-operate" });
    // 添加操作按钮
    operations.forEach(([label, onClick, available]) => {
      if (!available) return;
      const operationItem = createElement("div", { class: "list-operate-btn" }, label);
      operationItem.onclick = (e) => {
        e.stopPropagation();
        onClick(danmaku);
      };
      operationList.appendChild(operationItem);
    });
    item.appendChild(operationList);
  }

  return item;
};

export default class DanmakuList extends PanelPlugin {
  static readonly pluginName = "danmakuList";
  title = "弹幕列表";

  danmaku: Danmaku;
  data: DanmakuItem[] = [];
  selected: DanmakuItem[] = [];
  private focused: DanmakuItem | null = null;
  sortedBy: keyof DanmakuItem = "time";
  sortOrder = 1 | -1;

  list!: VirtualList<DanmakuItem>;
  /** 是否随播放自动滚动 */
  autoScroll = true;
  /** 自动滚动冻结 */
  frozen = false;

  $main: HTMLElement;
  $container: HTMLElement;
  $status: HTMLElement;
  $colTime: HTMLElement;
  $colDate: HTMLElement;
  $colContent: HTMLElement;
  $autoscroll: HTMLElement;

  $select: HTMLElement;
  $selectInfo: HTMLElement;
  $clearSelect: HTMLElement;

  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-danmakulist` }, templateHTML));
    this.danmaku = player.plugins.danmaku!;
    this.$main = this.$(`.${classPrefix}-danmakulist-main`);
    this.$container = this.$(`.${classPrefix}-danmakulist-container`);
    this.$status = this.$(`.${classPrefix}-danmakulist-status`);
    this.$colTime = this.$(".col-time");
    this.$colDate = this.$(".col-date");
    this.$colContent = this.$(".col-content");
    this.$autoscroll = this.$(`.${classPrefix}-danmakulist-autoscroll`);

    this.$select = this.$(`.${classPrefix}-danmakulist-select`);
    this.$selectInfo = this.$(`.${classPrefix}-danmakulist-select-info`);
    this.$clearSelect = this.$(`.list-operate-btn[data-action="clearSelect"]`);

    this.$clearSelect.onclick = () => {
      this.select([]);
    };

    this.$colTime.onclick = () => {
      this.setAutoScroll(false);
      if (this.sortedBy == "time") {
        this.sort("time", -this.sortOrder);
      } else {
        this.sort("time", 1);
      }
    };
    this.$colDate.onclick = () => {
      this.setAutoScroll(false);
      if (this.sortedBy == "date") {
        this.sort("date", -this.sortOrder);
      } else {
        this.sort("date", 1);
      }
    };
    this.$colContent.onclick = () => {
      this.setAutoScroll(false);
      if (this.sortedBy == "content") {
        this.sort("content", -this.sortOrder);
      } else {
        this.sort("content", 1);
      }
    };
    this.$autoscroll.onclick = () => {
      this.setAutoScroll(!this.autoScroll);
      this.player.emit("setValue", "danmakuList:autoScroll", !this.autoScroll);
    };
    this.player.on("danmakuList:autoScrollChange", (flag) => {
      if (flag) {
        this.$autoscroll.innerText = "列表滚动[开]";
      } else {
        this.$autoscroll.innerText = "列表滚动[关]";
      }
    });
    if (this.autoScroll) {
      this.player.emit("danmakuList:autoScrollChange", true);
    }
    this.player.on("danmakuList:select", (dm) => {
      const num = dm.length;
      this.$selectInfo.innerText = num ? `已选择${num}条弹幕` : "";
      this.$select.classList.toggle("is-show", num > 1);
    });
  }
  mount(
    el: HTMLElement,
    opt?: { onToggle?: ((flag: boolean) => void) | undefined; onUnmount?: (() => void) | undefined }
  ): void {
    super.mount(el, opt);
    const pos = this.list?.scrollTop;
    console.log("mountpos: " + pos);
    requestAnimationFrame(() => {
      pos != null && this.list?.scrollTo(pos);
      -this.autoScroll && this.locateByTime(this.player.currentTime);
    });
  }
  toggle(flag?: boolean | undefined): void {
    super.toggle(flag);
    if (this.shown) {
      const pos = this.list?.scrollTop;
      pos != null && this.list?.scrollTo(pos);
      this.autoScroll && this.locateByTime(this.player.currentTime);
    }
  }
  init() {
    const invokes = this.player.invokes;
    const operate = this.plugins.danmakuOperate;
    this.list = new VirtualList({
      el: this.$container,
      getData: () => {
        return this.data;
      },
      itemHeight: 24,
      createItem: (danmaku, i) =>
        getDanmakuListItem(danmaku, i, {
          operation: ((dm) => {
            const myDanmaku = this.player.userId && dm.user == this.player.userId;
            return [
              [
                "举报",
                () => {
                  operate?.report(dm);
                },
                !myDanmaku && invokes?.danmakuReport,
              ],
              [
                "屏蔽",
                (dm: DanmakuItem) => {
                  operate?.blockUser(dm.user, true);
                },
                !myDanmaku && invokes?.danmakuBlockUser,
              ],
              [
                "撤回",
                (dm: DanmakuItem) => {
                  operate?.recall(dm);
                },
                myDanmaku && invokes?.danmakuRecall,
              ],
            ].filter((v) => v[2]) as [string, (dm: DanmakuItem) => void, unknown][];
          })(danmaku),
          onClick: (e) => {
            this.clickSelect(danmaku, e.shiftKey, e.ctrlKey);
          },
          onDblclick: () => {
            this.player.seek(danmaku.time);
          },
          selected: this.selected.includes(danmaku),
          focused: this.focused == danmaku,
          title: `${danmaku.content}\n${
            danmaku.date ? dateFormat(new Date(danmaku.date * 1000), "yyyy-MM-dd HH:mm:ss") : "-"
          } @ ${secondToTime(danmaku.time, 0x0010)}`,
        }),
      overflow: 5,
    });

    const unFreeze = debounce(() => {
      this.frozen = false;
    }, 5000);
    this.list.$el.addEventListener("wheel", () => {
      this.frozen = true;
      unFreeze();
    });
    this.list.$el.addEventListener("mousedown", () => {
      this.frozen = true;
      unFreeze();
    });
    this.$main.addEventListener("mouseleave", () => {
      this.frozen = false;
    });
    // 切换到新分P时，清空上一P弹幕
    this.player.on("videoChange", () => {
      this.clear();
    });
    this.player.on("danmaku:add", (dan) => {
      this.fill(dan);
      if (this.autoScroll) {
        this.sort("time");
      }
    });
    this.player.on("timeupdate", (time) => {
      if (this.autoScroll && !this.frozen) {
        this.locateByTime(time);
      }
    });
    this.player.on("danmaku:select", (dan) => {
      this.locateByDanmaku(dan);
      this.select([dan]);
    });
  }
  apply(player: Player, options: PlayerOptions): void {
    this.setAutoScroll(!!options.danmakuList?.autoScroll);
  }
  /** 弹幕列表排序 */
  sort(sortedBy: keyof DanmakuItem, sortOrder = 1) {
    this.sortedBy = sortedBy;
    this.sortOrder = sortOrder;
    this.data.sort((a: any, b: any) => {
      const at = a[this.sortedBy];
      const bt = b[this.sortedBy];
      // 排序
      return at > bt ? sortOrder : at == bt ? 0 : -sortOrder;
    });
    this.list.reload();
  }
  /** 装填弹幕(重载列表) */
  fill(dan: DanmakuItem[]) {
    this.data = this.data.concat(dan);
    // 弹幕列表装填
    if (!this.data.length) {
      this.setStatus("empty");
    } else {
      this.reload();
      this.setStatus();
    }
  }
  /** 添加弹幕(不重载列表) */
  add(dan: DanmakuItem[]) {
    this.data = this.data.concat(dan);
    // 弹幕列表装填
    if (!this.data.length) {
      this.setStatus("empty");
    } else {
      this.list.update();
      this.setStatus();
    }
  }
  /** 重载弹幕列表 */
  reload() {
    this.sort(this.sortedBy, this.sortOrder);
    if (this.autoScroll) {
      this.locateByTime(this.player.currentTime);
    }
  }
  clear() {
    // 清空弹幕列表
    this.list.clear();
    this.data = [];
    this.setStatus("loading");
  }
  setStatus(status = "") {
    this.$status.dataset.status = status;
    console.log("弹幕加载状态" + status);
  }
  /** 根据播放时间定位 */
  locateByTime(time: number) {
    let viewEnd = this.list.viewEnd;
    if (this.data[viewEnd]?.time > time) {
      // 如果列表可视区域最后一项的时间超过当前时间, 则重头开始遍历, 否则从列表可视区域最后一项遍历
      viewEnd = 0;
    }
    while (this.data[viewEnd + 1]?.time <= time) {
      // 遍历并检测下一项弹幕时间是否超过当前时间, 若超过, 则以当前弹幕为定位点
      viewEnd++;
    }
    this.list.locateEnd(viewEnd);
  }
  /** 定位弹幕 */
  locateByDanmaku(dan: DanmakuItem) {
    const index = this.data.indexOf(dan);
    if (index > -1) {
      this.list.locateStart(index);
      this.frozen = true;
    }
  }
  setAutoScroll(flag: boolean) {
    this.player.emit("danmakuList:autoScrollChange", flag);
    // 设置自动滚动
    this.autoScroll = flag;
    if (flag) {
      this.frozen = false;
      this.sort("time");
      this.locateByTime(this.player.currentTime);
      this.list.handleScroll();
    }
  }
  /** 设置选定状态 */
  select(dan: DanmakuItem[], focused?: DanmakuItem) {
    this.selected = dan;
    const selectedIndex: number[] = [];
    this.focused = focused || (dan.length == 1 ? dan[0] : null);
    const focusedIndex = this.data.indexOf(this.focused!);
    dan.forEach((dm) => {
      const index = this.data.indexOf(dm);
      selectedIndex.push(index);
    });
    for (const item of this.list.$content.children) {
      item.classList.toggle(
        "is-selected",
        selectedIndex.includes(Number((item as HTMLElement).dataset.index))
      );
      item.classList.toggle(
        "is-focused",
        focusedIndex == Number((item as HTMLElement).dataset.index)
      );
    }
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 设置某条弹幕的选定状态，若选定则聚焦弹幕，否则取消聚焦 */
  private toggleSelect(dm: DanmakuItem, flag: boolean) {
    const focusedItem = this.list.$content.querySelector(
      `[data-index="${this.data.indexOf(this.focused!)}"]`
    );
    const item = this.list.$content.querySelector(`[data-index="${this.data.indexOf(dm)}"]`);
    if (flag) {
      if (!this.selected.includes(dm)) {
        this.selected.push(dm);
      }
      this.focused = dm;
      item?.classList.add("is-selected");
      item?.classList.add("is-focused");
    } else if (!flag) {
      const index = this.selected.indexOf(dm);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
      item?.classList.remove("is-selected");
      focusedItem?.classList.remove("is-focused");
    }
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 单击选定弹幕 */
  private clickSelect(dm: DanmakuItem, shift?: boolean, ctrl?: boolean) {
    if (shift) {
      // 按住shift，则以已聚焦弹幕到当前选择弹幕范围选定弹幕，若无已聚焦弹幕，则只选定该弹幕
      // 该操作既不会取消选择已选弹幕，也不会重新设定已存在的聚焦弹幕
      if (this.focused) {
        const index = this.data.indexOf(dm);
        const focusedIndex = this.data.indexOf(this.focused!);
        if (index == -1 || focusedIndex == -1) {
          // 若弹幕列表中没有该弹幕，或未设定已聚焦弹幕，则只选定该弹幕
          this.select([dm]);
        } else {
          const from = index < focusedIndex ? index : focusedIndex;
          const to = (index < focusedIndex ? focusedIndex : index) + 1;
          this.select(this.data.slice(from, to), this.focused);
        }
      } else {
        this.select([dm]);
      }
    } else if (ctrl) {
      // 按住ctrl，则将该条弹幕添加到已选择弹幕中，若该弹幕已选择，则移除选择
      // 选定弹幕时设定聚焦状态，移除选择时移除聚焦状态
      this.toggleSelect(dm, !this.selected.includes(dm));
    } else {
      // 如果该弹幕是唯一一条已选择弹幕，则清除选择，否则选择该条弹幕
      if (this.selected.length == 1 && this.selected[0] == dm) {
        this.select([]);
      } else {
        this.select([dm]);
      }
    }
  }
}
