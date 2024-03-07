import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-loop-off"></i>
    <i class="mpicon-loop"></i>
  </div>
  <div class="mpui-tooltip">洗脑循环</div>
`;

export default class ButtonLoop extends ControlsPlugin {
  static pluginName = "buttonLoop";

  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-loop` },
        templateHTML
      )
    );

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.player.on("loopChange", (flag) => {
      this.$el.classList.toggle("is-on", flag);
      this.$tooltip.innerText = flag ? "关闭洗脑循环" : "洗脑循环";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.loop) {
        this.player.setLoop(false);
      } else {
        this.player.setLoop(true);
      }
    });
  }
}
