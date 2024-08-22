import { classPrefix } from "@/config";
import { Player } from "@/player";
import { createElement } from "@/utils";
import { ControlsPlugin } from "@/plugin";

export default class DanmakuCount extends ControlsPlugin {
  static pluginName = "danmakuCount";

  $value: HTMLElement;

  get count() {
    return this.player.plugins.danmakuEngine?.count || 0;
  }

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-danmakucount`, title: "已装填弹幕总数" },
        /*html*/ `弹幕数 <span class="${classPrefix}-danmakucount-value">0</span>`
      )
    );

    this.$value = this.$(`.${classPrefix}-danmakucount-value`)!;
  }

  init() {
    this.player.on("danmaku:clear", () => {
      this.updateCount(0);
    });
    this.player.on("danmaku:add", () => {
      this.updateCount(this.count);
    });
    this.player.on("danmaku:remove", () => {
      this.updateCount(this.count);
    });
  }

  protected updateCount(count: number) {
    this.$value.innerText = `${count}`;
    this.$el.title = `已装填弹幕总数：${count}`;
  }
}
