import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsItem, ControlsPlugin, PluginFrom } from "@/plugin";
import { PlayerOptions } from "@core";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-settings"></i>
  </div>
  <div class="${classPrefix}-controls-panel-wrap">
    <div class="${classPrefix}-controls-panel"></div>
  </div>
`;

declare module "@core" {
  interface PlayerOptions {
    buttonSettings?: {
      controls?: ControlsPlugin[];
    };
  }
}

export default class ButtonSettings extends ControlsPlugin {
  static pluginName = "buttonSettings";

  $icon: HTMLElement;
  $panel: HTMLElement;

  controls: ControlsPlugin[] = [];

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-settings` },
        templateHTML
      )
    );

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`);
    this.$panel = this.$(`.${classPrefix}-controls-panel`);
  }

  apply(player: Player, options: PlayerOptions) {
    this.controls = options.buttonSettings?.controls || [];
  }

  ready() {
    this.build(this.$panel, this.controls);
    this.player.plugins.settings?.mount(this.$panel);
  }

  setControls(controls: ControlsPlugin[]) {
    this.controls = controls;
    this.build(this.$panel, controls);
  }

  protected build(container: HTMLElement, list?: PluginFrom<ControlsItem>[]) {
    container.innerHTML = "";
    const fragment = new DocumentFragment();
    list?.forEach((item) => {
      const el = this.player.plugin.from(item)?.$el;
      if (el) fragment.appendChild(el);
    });
    container.appendChild(fragment);
  }
}
