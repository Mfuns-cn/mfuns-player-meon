import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement, fullScreenEnabled } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-fullscreen"></i>
    <i class="mpicon-fullscreen-exit"></i>
  </div>
  <div class="mpui-tooltip">进入全屏</div>
`;

export default class ButtonFullscreen extends ControlsPlugin {
  static pluginName = "buttonFullscreen";

  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-fullscreen` },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`);
    this.$tooltip = this.$(".mpui-tooltip");
  }

  init() {
    this.player.on("fullscreenEnter", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出全屏";
    });
    this.player.on("fullscreenExit", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "进入全屏";
    });
    this.$icon.addEventListener("click", () => {
      if (!this.player.isFullscreen) {
        this.player.enterFullscreen?.();
      } else {
        this.player.exitFullscreen?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterFullscreen || !fullScreenEnabled;
  }
}
