import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-widescreen"></i>
    <i class="mpicon-widescreen-exit"></i>
  </div>
  <div class="mpui-tooltip">宽屏模式</div>
`;

export default class ButtonWidescreen extends ControlsPlugin {
  static pluginName = "buttonWidescreen";

  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-widescreen` },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.player.on("widescreenEnter", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出宽屏模式";
    });
    this.player.on("widescreenExit", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "宽屏模式";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.isWidescreen) {
        this.player.enterWidescreen?.();
      } else {
        this.player.exitWidescreen?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterWidescreen;
  }
}
