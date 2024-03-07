import { PlayerOptions, PluginItem } from "@/types";
import { Player } from "@/player";

/** 基础插件 */
export abstract class BasePlugin implements PluginItem {
  static pluginName: string;
  protected readonly player: Player;
  protected readonly plugins: Player["plugins"];
  /** 抛出错误 */
  protected readonly throw: Player["throw"];
  constructor(player: Player) {
    this.player = player;
    this.plugins = player.plugins;
    this.throw = player.throw;
  }
  /** 插件创建后 */
  init?(player: Player): void;
  /** 作为插件注册 */
  apply?(player: Player, options: PlayerOptions): void;
  /** 所有插件加载后 */
  ready?(player: Player): void;
  /** 播放器挂载后 */
  mounted?(player: Player): void;
  /** 执行销毁 */
  destroy?(): void;
}

/** UI组件 */
export interface UIItem extends PluginItem {
  /** 组件元素 */
  $el: HTMLElement;
  /** 组件标题 */
  title?: string;
  /** 忽略该组件，用于不支持的情况 */
  ignored?: boolean;
}

/** 可挂载组件 */
export interface MountableItem extends UIItem {
  /** 将组件挂载到父元素 */
  mount(
    /** 挂载的容器元素 */
    el: HTMLElement,
    opt?: {
      /** 挂载组件时执行的逻辑 */
      onToggle?: (flag: boolean) => void;
      /** 卸载组件时执行的逻辑 */
      onUnmount?: () => void;
    }
  ): void;
  /** 卸载组件 */
  unmount(): void;
}

/** 控制组件 */
export interface ControlsItem extends UIItem {}

/** 面板组件 */
export interface PanelItem extends MountableItem {
  toggle(flag?: boolean): void;
}

/** 菜单项组件 */
export interface MenuItem extends PluginItem {
  icon?: HTMLElement | ((player: Player) => HTMLElement);
  content: string | HTMLElement | ((player: Player) => string | HTMLElement);
  onClick?: (player: Player) => void;
}

/** 界面插件 */
export abstract class UIPlugin extends BasePlugin {
  $el: HTMLElement;
  $<T extends Element>(selectors: string) {
    return this.$el.querySelector<T>(selectors);
  }
  constructor(player: Player, el: HTMLElement) {
    super(player);
    this.$el = el;
  }
}

/** 可挂载组件插件 */
export abstract class MountablePlugin extends UIPlugin implements MountableItem {
  title?: string;
  #onUnmount?: () => void;
  /** 挂载 */
  mount(el: HTMLElement, opt?: { onUnmount?: () => void }) {
    el.appendChild(this.$el);
    this.unmount();
    this.#onUnmount = opt?.onUnmount;
  }
  /** 卸载 */
  unmount() {
    this.#onUnmount?.();
    this.#onUnmount = undefined;
  }
  show() {
    this.$el.style.display = "";
  }
  hide() {
    this.$el.style.display = "none";
  }
}

/** 控制组件插件 */
export abstract class ControlsPlugin extends MountablePlugin implements ControlsItem {}

/** 面板插件 */
export abstract class PanelPlugin extends MountablePlugin implements PanelItem {
  title?: string;
  container?: HTMLElement;
  #onToggle?: (flag: boolean) => void;
  shown = false;
  constructor(player: Player, el: HTMLElement) {
    super(player, el);
  }
  /** 挂载 */
  mount(el: HTMLElement, opt?: { onToggle?: (flag: boolean) => void; onUnmount?: () => void }) {
    super.mount(el, { onUnmount: opt?.onUnmount });
    this.#onToggle = opt?.onToggle;
  }
  /** 卸载 */
  unmount() {
    this.toggle(false);
    super.unmount();
    this.#onToggle = undefined;
  }
  /** 切换显示隐藏状态 */
  toggle(flag?: boolean) {
    this.shown = flag ?? !this.shown;
    this.#onToggle?.(this.shown);
  }
}

/** 菜单项插件 */
export abstract class MenuPlugin extends BasePlugin implements MenuItem {
  abstract name: string;
  abstract content: string | HTMLElement | ((player: Player) => string | HTMLElement);
}

export interface PanelContainer {
  mount: (panel: PanelPlugin) => void;
}

export type PluginFrom<T = PluginItem> = (new (player: Player) => T) | T | string;
