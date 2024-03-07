import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <div class="${classPrefix}-controls-button-text">P0</div>
  </div>
  <div class="mpui-tooltip">分P列表</div>
`;

export default class ButtonPart extends ControlsPlugin {
  static pluginName = "buttonPart";

  $icon: HTMLElement;
  $text: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-part` },
        templateHTML
      )
    );

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.$icon.addEventListener("click", () => {
      this.plugins.partList?.toggle();
    });
    this.player.on("videoChange", (info) => {
      this.$text.innerText = `P${info.part}`;
      this.$el.classList.toggle("is-show", (info.list?.length || 1) > 1);
    });
  }
}
