import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">弹幕列表</div>
    </div>
    <div class="mpui-tooltip">弹幕列表</div>
  </div>
`;

export default class ButtonDanmakulist extends ControlsPlugin {
  static pluginName = "buttonDanmakuList";

  $icon: HTMLElement;
  $tooltip: HTMLElement;
  $text: HTMLElement;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-danmakulist` },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.$icon.addEventListener("click", () => {
      (this.plugins as any).danmakuList?.toggle();
    });
  }
}
