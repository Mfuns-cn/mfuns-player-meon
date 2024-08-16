import { classPrefix } from "@/config";
import { Player } from "@/player";

import { ControlsItem, PluginFrom, UIPlugin } from "@/plugin";
import { createElement } from "@/utils";
import { PlayerOptions } from "@core";

const templateHTML = /*html*/ `
    <div class="${classPrefix}-footbar-left"></div>
    <div class="${classPrefix}-footbar-right"></div>
`;

declare module "@core" {
  interface PlayerPlugins {
    footbar?: Footbar;
  }
  interface PlayerOptions {
    /** 弹幕栏设置 */
    footbar?: {
      controls?: FootbarControls;
    };
  }
}

export interface FootbarControls {
  left?: PluginFrom<ControlsItem>[];
  right?: PluginFrom<ControlsItem>[];
}

/** 底栏 */
export default class Footbar extends UIPlugin {
  static pluginName = "footbar";
  $left: HTMLElement;
  $right: HTMLElement;

  controls: FootbarControls = {};

  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-footbar` }, templateHTML));
    this.$left = this.$(`.${classPrefix}-footbar-left`);
    this.$right = this.$(`.${classPrefix}-footbar-right`);
  }
  apply(player: Player, options: PlayerOptions) {
    this.controls = options.footbar?.controls || {};
    this.player.$el.append(this.$el);
  }
  ready() {
    this.setControls(this.controls);
  }
  /** 更新控制组件 */
  setControls(controls: FootbarControls) {
    this.controls = controls;
    const { left, right } = controls;
    this.build(this.$left, left);
    this.build(this.$right, right);
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
