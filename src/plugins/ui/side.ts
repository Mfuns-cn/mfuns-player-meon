import { classPrefix } from "@/config";
import { Player } from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin, PanelItem, PluginFrom } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-side-mask"></div>
  <div class="${classPrefix}-side">
    <div class="${classPrefix}-side-head">
      <div class="${classPrefix}-side-title"></div>
      <div class="${classPrefix}-side-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${classPrefix}-side-content"></div>
  </div>
`;

declare module "@core" {
  interface PlayerPlugins {
    side?: Side;
  }
  interface PlayerOptions {
    side?: {
      panels?: PluginFrom<PanelItem>[];
    };
  }
}

export default class Side extends BasePlugin {
  static readonly pluginName = "side";
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
    this.container = createElement("div", { class: `${classPrefix}-side-wrap` }, templateHTML);
    this.$el = this.container.querySelector(`.${classPrefix}-side`)!;
    this.$mask = this.container.querySelector(`.${classPrefix}-side-mask`)!;
    this.$content = this.$el.querySelector(`.${classPrefix}-side-content`)!;
    this.$title = this.$el.querySelector(`.${classPrefix}-side-title`)!;
    this.$close = this.$el.querySelector(`.${classPrefix}-side-close`)!;

    this.player.$main.appendChild(this.container);
  }
  init() {
    // --- 事件 --- //
    this.$mask.addEventListener("click", () => {
      this.hide();
    });
    this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  apply(player: Player, options: PlayerOptions): void {
    this.#initPanels = options.side?.panels || [];
  }
  ready(): void {
    this.#initPanels.forEach((item) => {
      const panel = this.player.plugin.from(item);
      panel && this.append(panel);
    });
    this.#initPanels = [];
  }

  hide() {
    this.current?.toggle?.(false);
  }

  append(panel: PanelItem) {
    panel.mount(this.$content, {
      onToggle: (flag) => {
        if (flag) {
          this.current?.toggle?.(false);
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
