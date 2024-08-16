import { classPrefix } from "@/config";
import { Player } from "@/player";
import { PlayerOptions } from "@/types";
import { createElement } from "@/utils";
import {
  BasePlugin,
  MountableContainer,
  MountableItem,
  PanelItem,
  PanelPlugin,
  PluginFrom,
} from "@/plugin";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-modal-mask"></div>
  <div class="${classPrefix}-modal">
    <div class="${classPrefix}-modal-head">
      <div class="${classPrefix}-modal-title"></div>
      <div class="${classPrefix}-modal-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${classPrefix}-modal-content"></div>
  </div>
`;

declare module "@core" {
  interface PlayerPlugins {
    modal?: Modal;
  }
  interface PlayerOptions {
    modal?: {
      panels?: PanelPlugin[];
    };
  }
}

export default class Modal extends BasePlugin implements MountableContainer {
  static readonly pluginName = "modal";
  container: HTMLElement;
  $el: HTMLElement;
  $mask: HTMLElement;
  $content: HTMLElement;
  $title: HTMLElement;
  $close: HTMLElement;
  current: PanelItem | null = null;
  #initPanels: PluginFrom<PanelItem>[] = [];
  get isShow(): boolean {
    return this.container.classList.contains("is-show");
  }

  constructor(player: Player) {
    super(player);
    this.container = createElement("div", { class: `${classPrefix}-modal-wrap` }, templateHTML);
    this.$el = this.container.querySelector(`.${classPrefix}-modal`)!;
    this.$mask = this.container.querySelector(`.${classPrefix}-modal-mask`)!;
    this.$content = this.$el.querySelector(`.${classPrefix}-modal-content`)!;
    this.$title = this.$el.querySelector(`.${classPrefix}-modal-title`)!;
    this.$close = this.$el.querySelector(`.${classPrefix}-modal-close`)!;

    this.player.$main.appendChild(this.container);
  }

  init() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    });
    this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  apply(player: Player, options: PlayerOptions): void {
    this.#initPanels = options.modal?.panels || [];
  }
  ready(): void {
    this.#initPanels.forEach((item) => {
      const panel = this.player.plugin.from(item);
      panel && this.append(panel);
    });
    this.#initPanels = [];
  }
  /** 关闭模态框 */
  hide() {
    this.current?.toggle?.(false);
  }
  /** 挂载一个面板 */
  append(panel: PanelItem) {
    panel.mount(this.$content, {
      onToggle: (flag) => {
        if (flag) {
          for (const a of this.$content.children) {
            a.classList.toggle("is-show", a == panel.$el);
          }
          this.container.classList.add("is-show");
          this.$title.innerText = panel.title || "";
          this.current = panel;
        } else {
          if (this.current == panel) {
            this.container.classList.remove("is-show");
            panel.$el.classList.remove("is-show");
            this.$title.innerText = "";
            this.current = null;
          }
        }
      },
    });
  }
}
