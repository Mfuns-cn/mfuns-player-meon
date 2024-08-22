import { classPrefix } from "@/config";
import { Player } from "@/player";

import { BasePlugin, ControlsItem, PluginFrom } from "@/plugin";
import { createElement } from "@/utils";
import { PlayerOptions } from "@core";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-header-mask"></div>
  <div class="${classPrefix}-header-main mpui-crystal">
    <div class="${classPrefix}-header-left"></div>
    <div class="${classPrefix}-header-center"></div>
    <div class="${classPrefix}-header-right"></div>
  </div>
`;

declare module "@core" {
  interface PlayerPlugins {
    header?: Header;
  }
  interface PlayerOptions {
    header?: { controls?: HeaderControls };
  }
}
export interface HeaderControls {
  left?: PluginFrom<ControlsItem>[];
  center?: PluginFrom<ControlsItem>[];
  right?: PluginFrom<ControlsItem>[];
}

/** 控制栏 */
export default class Header extends BasePlugin {
  static pluginName = "header";
  player: Player;
  $el: HTMLElement;
  $main: HTMLElement;
  $left: HTMLElement;
  $center: HTMLElement;
  $right: HTMLElement;

  isHover = false;

  protected inactiveHook: () => boolean;
  protected mouseEnterHandler: () => void;
  protected mouseLeaveHandler: () => void;
  protected controls: HeaderControls = {};

  constructor(player: Player) {
    super(player);
    this.player = player;
    this.$el = createElement("div", { class: `${classPrefix}-header` }, templateHTML);
    this.$main = this.$el.querySelector(`.${classPrefix}-header-main`)!;
    this.$left = this.$el.querySelector(`.${classPrefix}-header-left`)!;
    this.$center = this.$el.querySelector(`.${classPrefix}-header-center`)!;
    this.$right = this.$el.querySelector(`.${classPrefix}-header-right`)!;
    this.player.$main.append(this.$el);

    this.inactiveHook = () => !this.isHover;
    this.mouseEnterHandler = () => {
      this.isHover = true;
    };
    this.mouseLeaveHandler = () => {
      this.isHover = false;
    };
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook);
    this.$el.addEventListener("mouseenter", this.mouseEnterHandler);
    this.$el.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  apply(player: Player, options: PlayerOptions) {
    this.controls = options.header?.controls || {};
  }
  ready() {
    this.setControls(this.controls);
  }
  /** 更新控制组件 */
  setControls(controls: HeaderControls) {
    this.controls = controls;
    const { left, center, right } = controls;
    this.build(this.$left, left);
    this.build(this.$center, center);
    this.build(this.$right, right);
  }
  protected build(container: HTMLElement, list?: PluginFrom<ControlsItem>[]) {
    container.innerHTML = "";
    const fragment = new DocumentFragment();
    list?.forEach((item) => {
      const el = this.player.plugin.from<ControlsItem>(item)?.$el;
      if (el) fragment.appendChild(el);
    });
    container.appendChild(fragment);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook);
    this.$el.removeEventListener("mouseenter", this.mouseEnterHandler);
    this.$el.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
