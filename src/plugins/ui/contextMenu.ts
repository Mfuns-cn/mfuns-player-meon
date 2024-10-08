import { classPrefix } from "@/config";
import { Player } from "@/player";
import { BasePlugin, MenuItem, PluginFrom } from "@/plugin";
import { createElement } from "@/utils";
import { PlayerOptions } from "@core";

declare module "@core" {
  interface PlayerPlugins {
    contextMenu?: ContextMenu;
  }
  interface PlayerEventMap {
    contextMenuShow: (x: number, y: number) => void;
    contextMenuHide: () => void;
  }
  interface PlayerOptions {
    contextMenu?: {
      list: PluginFrom<MenuItem>[];
    };
  }
}

/** 右键菜单 */

export default class ContextMenu extends BasePlugin {
  static pluginName = "contextMenu";
  player: Player;
  container: HTMLElement;
  $el: HTMLElement;
  $list: HTMLElement;
  list: PluginFrom<MenuItem>[] = [];
  private isShow = false;
  constructor(player: Player) {
    super(player);
    this.player = player;

    this.container = createElement(
      "div",
      { class: `${classPrefix}-contextmenu-wrap` },
      /*html*/ `
      <div class="${classPrefix}-contextmenu">
        <ul class="${classPrefix}-contextmenu-list mpui-black"></ul>
      </div>
      `
    );
    this.$el = this.container.querySelector(`.${classPrefix}-contextmenu`)!;
    this.$list = this.$el.querySelector(`.${classPrefix}-contextmenu-list`)!;

    this.player.$main.appendChild(this.container);
  }
  apply(player: Player, options: PlayerOptions): void {
    this.list = options.contextMenu?.list || [];
  }
  ready(): void {
    this.setMenu(this.list);
  }
  setMenu(list: PluginFrom<MenuItem>[]) {
    this.$list.innerHTML = "";
    const fragment = new DocumentFragment();
    list.forEach((pi) => {
      const item = this.player.plugin.from<MenuItem>(pi);
      if (!item) return;
      const el = createElement("li", { class: `${classPrefix}-contextmenu-item` });
      if (item.onClick)
        el.onclick = () => {
          item.onClick?.(this.player);
        };
      let content: string | HTMLElement;
      if (typeof item.content == "function") {
        content = item.content(this.player);
      } else {
        content = item.content;
      }
      if (typeof content == "object") {
        el.appendChild(content);
      } else {
        el.innerText = content;
      }
      fragment.appendChild(el);
    });
    this.$list.appendChild(fragment);
  }
  init() {
    this.player.$area.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const clientRect = this.player.$area.getBoundingClientRect();
      const x = e.clientX - clientRect.left;
      const y = e.clientY - clientRect.top;
      this.show(x, y);
    });
    this.container.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const clientRect = this.container.getBoundingClientRect();
      const x = e.clientX - clientRect.left;
      const y = e.clientY - clientRect.top;
      this.show(x, y);
    });
    document.addEventListener("click", () => {
      if (this.isShow) {
        this.hide();
      }
    });
  }
  show(x: number, y: number) {
    this.container.classList.add("is-show");
    const clientRect = this.player.$area.getBoundingClientRect();
    if (x + this.$el.offsetWidth >= clientRect.width) {
      this.$el.style.right = clientRect.width - x + "px";
      this.$el.style.left = "initial";
    } else {
      this.$el.style.left = x + "px";
      this.$el.style.right = "initial";
    }
    if (y + this.$el.offsetHeight >= clientRect.height) {
      this.$el.style.bottom = clientRect.height - y + "px";
      this.$el.style.top = "initial";
    } else {
      this.$el.style.top = y + "px";
      this.$el.style.bottom = "initial";
    }
    this.isShow = true;
    this.player.emit("contextMenuShow", x, y);
  }
  hide() {
    this.container.classList.remove("is-show");
    this.isShow = false;
    this.player.emit("contextMenuHide");
  }
}
