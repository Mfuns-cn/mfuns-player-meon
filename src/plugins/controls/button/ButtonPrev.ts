import { Player } from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-prev"></i>
  </div>
  <div class="mpui-tooltip">上一P</div>
`;

declare module "@core" {
  interface PlayerOptions {
    /** 视频切换按钮 */
    switchButton?: {
      /** 自动隐藏按钮，默认值为false */
      autoHide?: boolean;
      /** 只有一个视频时，隐藏所有切换按钮，默认值为true */
      singleHide?: boolean;
    };
  }
}

export default class ButtonPrev extends ControlsPlugin {
  static pluginName = "buttonPrev";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  /** 只有单个视频时，隐藏所有切换按钮 */
  singleHide: boolean = true;

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        {
          class: `${classPrefix}-controls-button ${classPrefix}-button-prev is-autohide is-disabled`,
        },
        templateHTML
      )
    );
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  apply(player: Player, options: PlayerOptions): void {
    this.singleHide = options.switchButton?.singleHide ?? true;
  }

  init() {
    this.$icon.addEventListener("click", () => {
      this.player.prev();
    });
    this.player.on("videoChange", (info) => {
      const { hasNext, hasPrev } = info;
      this.setDisabled(!hasPrev);
      this.$el.classList.toggle("is-hidden", this.singleHide && !hasPrev && !hasNext);
    });
  }
  setDisabled(flag: boolean) {
    this.$el.classList.toggle("is-disabled", flag);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(flag: boolean) {
    this.$el.classList.toggle("is-autohide", flag);
  }
  get disabled() {
    return this.$el.classList.contains("is-disabled");
  }
}
