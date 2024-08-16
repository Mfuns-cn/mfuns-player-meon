import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement, pictureInPictureEnabled } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-pip"></i>
    <i class="mpicon-pip-exit"></i>
  </div>
  <div class="mpui-tooltip">画中画</div>
`;

export default class ButtonPip extends ControlsPlugin {
  static pluginName = "buttonPip";

  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-pip` },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`);
    this.$tooltip = this.$(".mpui-tooltip");
  }

  init() {
    this.player.on("enterpictureinpicture", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出画中画";
    });
    this.player.on("leavepictureinpicture", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "画中画";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.isPip) {
        this.player.exitPip?.();
      } else {
        this.player.enterPip?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterPip || !pictureInPictureEnabled;
  }
}
