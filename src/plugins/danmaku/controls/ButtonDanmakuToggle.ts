import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-danmaku-off"></i>
    <i class="mpicon-danmaku"></i>
  </div>
  <div class="mpui-tooltip">关闭弹幕</div>
`;

export default class ButtonDanmakuToggle extends ControlsPlugin {
  static pluginName = "buttonDanmakuToggle";

  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-danmakutoggle is-on` },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`);
    this.$tooltip = this.$(".mpui-tooltip");
  }

  init() {
    this.player.on("danmaku:on", () => {
      this._change(true);
    });
    this.player.on("danmaku:off", () => {
      this._change(false);
    });
    this.$icon.addEventListener("click", () => {
      this.plugins.danmaku?.toggle();
    });
  }

  /** 设置按钮状态 */
  private _change(flag: boolean) {
    this.$el.classList.toggle("is-on", flag);
    this.$tooltip.innerText = flag ? "关闭弹幕" : "开启弹幕";
  }
}
