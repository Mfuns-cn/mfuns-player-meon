import { classPrefix } from "@/config";
import { createElement } from "@/utils";
import { Player, UIPlugin } from "@core";

declare module "@core" {
  interface Player {
    /** 添加一条toast消息 */
    toast?: (content: string | HTMLElement, duration?: number, close?: boolean) => ToastItem;
  }
}

export interface ToastItem {
  el: HTMLElement;
  close(): void;
}

export default class Toast extends UIPlugin {
  /** 默认toast持续时间 */
  public defaultDuration = 5000;
  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-toast` }));
    this.player.$area.appendChild(this.$el);
  }

  init() {
    this.player.define(
      "toast",
      (content: string | HTMLElement, duration?: number, close?: boolean) =>
        this.append(content, duration, close)
    );
  }

  /** 添加toast消息
   * @param content 要发送的消息
   * @param duration 持续时间(ms)
   * @returns 消息id
   */
  public append(content: string | HTMLElement, duration?: number, close?: boolean) {
    const item = this.createToastItem({ content, duration, close });
    this.$el.appendChild(item.el);
    return item;
  }

  /** 创建一个toast元素 */
  protected createToastItem(opt: {
    content: string | HTMLElement;
    duration?: number;
    close?: boolean;
  }): ToastItem {
    const el = createElement("div", { class: `${classPrefix}-toast-item` });
    const content = el.appendChild(
      createElement("div", { class: `${classPrefix}-toast-item-content` })
    );
    content.appendChild(typeof opt.content == "object" ? opt.content : new Text(opt.content));
    const item = {
      el,
      close() {
        this.el.remove();
      },
    };
    if (opt.close) {
      const button = el.appendChild(
        createElement(
          "div",
          { class: `${classPrefix}-toast-item-close` },
          /*html*/ `
            <i class="mpicon-close"></i>
          `
        )
      );
      button.onclick = () => {
        item.close();
      };
    }
    let timer = 0;
    const closeHandler = () => {
      item.close();
      window.clearTimeout(timer);
    };
    timer = window.setTimeout(closeHandler, opt.duration || this.defaultDuration);
    return item;
  }

  /** 移除toast消息 */
  public remove(item: ToastItem) {
    item.close();
  }
  /** 清除所有toast消息 */
  public clear() {
    this.$el.innerHTML = "";
  }
}
