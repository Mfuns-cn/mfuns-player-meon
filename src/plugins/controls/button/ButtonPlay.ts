import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-play"></i>
    <i class="mpicon-pause"></i>
  </div>
  <div class="mpui-tooltip">播放</div>
`;

export default class ButtonPlay extends ControlsPlugin {
  static pluginName = "buttonPlay";

  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-play is-paused` },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.player.on("pause", () => {
      this._change(false);
    });
    this.player.on("play", () => {
      this._change(true);
    });
    this.player.on("videoChange", () => {
      this._change(false);
    });
    this.$icon.addEventListener("click", () => {
      this.player.paused ? this.player.play() : this.player.pause();
    });
  }
  /** 设置按钮状态 */
  private _change(flag: boolean) {
    this.$el.classList.toggle("is-on", flag);
    this.$tooltip.innerText = flag ? "暂停" : "播放";
  }
}
