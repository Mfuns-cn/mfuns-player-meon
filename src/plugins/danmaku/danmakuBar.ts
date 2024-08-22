import type { DanmakuSendItem } from "@plugins/danmaku/types";
import { keyCode } from "@/utils/KeyCode.enum";
import { PlayerOptions } from "@/types";
import { Player } from "@/player";
import { classPrefix } from "@/config";
import Controller from "../ui/controller";
import { ControlsPlugin, ControlsItem, PluginFrom } from "@/plugin";
import Danmaku from "./danmaku";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-danmakubar-outer"></div>
  <div class="${classPrefix}-danmakubar-input-wrap">
    <div class="${classPrefix}-danmakubar-left"></div>
    <input type="text" autocompleted="new-password" class="${classPrefix}-danmakubar-input" />
    <div class="${classPrefix}-danmakubar-status-loading">弹幕功能加载中...</div>
    <div class="${classPrefix}-danmakubar-status-login">需要<a>登录</a>后才能发送弹幕哦~</div>
    <div class="${classPrefix}-danmakubar-right"></div>
    <div class="${classPrefix}-danmakubar-send">发送</div>
  </div>
`;

declare module "@core" {
  interface PlayerOptions {
    /** 弹幕栏设置 */
    danmakuBar?: {
      controls?: DanmakuBarControls;
      /** 占位文本 */
      placeholder?: string;
      /** 需要登录 */
      loginRequired?: boolean;
    };
    danmakuStyle?: {
      /** 选色列表 */
      colorList?: string[];
      /** 字号列表 */
      sizeList?: [number, string?][];
      /** 弹幕模式列表 */
      modeList?: number[];
      /** 默认弹幕字号 */
      defaultSize?: number;
      /** 默认弹幕模式 */
      defaultMode?: number;
      /** 默认弹幕模式 */
      defaultColor?: number;
    };
  }
  interface PlayerPlugins {
    danmakuBar?: DanmakuBar;
  }
}

export interface DanmakuBarControls {
  outer?: PluginFrom<ControlsItem>[];
  left?: PluginFrom<ControlsItem>[];
  right?: PluginFrom<ControlsItem>[];
}

/** 弹幕栏
 *
 * 前置插件: `danmaku`
 */
export default class DanmakuBar extends ControlsPlugin {
  static pluginName = "danmakuBar";

  $send: HTMLElement;
  $input: HTMLInputElement;
  $outer: HTMLElement;
  $left: HTMLElement;
  $right: HTMLElement;

  $logina: HTMLElement;

  controller: Controller;
  danmaku: Danmaku;

  danmakuColor = 0xffffff;
  danmakuMode = 1;
  danmakuSize = 25;

  /** 是否需要登录 */
  #loginRequired = false;

  get loginRequired() {
    return this.#loginRequired;
  }
  get loginStatus() {
    return this.$el.classList.contains("is-login");
  }

  /** 冷却计时器 */
  coolDownTimer = 0;

  protected controls: DanmakuBarControls = {};

  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-danmakubar` }, templateHTML));

    this.controller = this.plugins.controller!;
    this.danmaku = this.plugins.danmaku!;

    this.$send = this.$el.querySelector(`.${classPrefix}-danmakubar-send`)!;
    this.$input = this.$el.querySelector(`.${classPrefix}-danmakubar-input`)!;
    this.$outer = this.$el.querySelector(`.${classPrefix}-danmakubar-outer`)!;
    this.$left = this.$el.querySelector(`.${classPrefix}-danmakubar-left`)!;
    this.$right = this.$el.querySelector(`.${classPrefix}-danmakubar-right`)!;

    this.$logina = this.$el.querySelector(`.${classPrefix}-danmakubar-status-login a`)!;
    this.$logina.onclick = () => this.player.login?.();

    this.player.on("videoChange", () => {
      this.setLoadingStatus(true);
    });
    this.player.on("loadeddata", () => {
      this.setLoadingStatus(false);
    });
    this.player.on("login", (id) => {
      this.#loginRequired && this.setLoginStatus(!id);
    });

    this.$input.addEventListener("keydown", (e) => {
      if (e.keyCode == keyCode.Enter) {
        this.send();
      }
    });
    this.$send.onclick = () => {
      this.send();
    };
  }

  apply(player: Player, options: PlayerOptions): void {
    if (options.danmakuBar?.loginRequired) {
      this.#loginRequired = true;
      !player.userId && this.setLoginStatus(true);
    }
    this.setPlaceHolder(options.danmakuBar?.placeholder || defaultPlaceholder);
    this.controls = options.danmakuBar?.controls || {};
  }
  ready() {
    this.setControls(this.controls);
  }
  /** 更新控制组件 */
  setControls(controls: DanmakuBarControls) {
    this.controls = controls;
    const { outer, left, right } = controls;
    this.build(this.$outer, outer);
    this.build(this.$left, left);
    this.build(this.$right, right);
  }
  setPlaceHolder(placeholder: string) {
    this.$input.placeholder = placeholder;
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
  /** 执行弹幕发送操作 */
  private send() {
    // 如果内容为空或只有空格，则不进行发送操作
    if (!this.$input.value.trim() || this.coolDownTimer) return;
    this.plugins.danmakuOperate?.send(this.generateDanmaku());
    this.$input.value = "";
  }
  /** 设置弹幕发送冷却 */
  public setCoolDown(time: number) {
    if (this.coolDownTimer) {
      window.clearInterval(this.coolDownTimer);
    }
    let t = Math.round(time);
    this.$send.classList.add("is-disabled");
    this.$send.innerText = `${t}秒`;
    this.coolDownTimer = window.setInterval(() => {
      t -= 1;
      if (t) {
        this.$send.innerText = `${t}秒`;
      } else {
        this.$send.innerText = "发送";
        this.$send.classList.remove("is-disabled");
        window.clearInterval(this.coolDownTimer);
        this.coolDownTimer = 0;
      }
    }, 1000);
  }
  generateDanmaku(): DanmakuSendItem {
    return {
      time: this.player.currentTime,
      content: this.$input.value,
      mode: this.danmakuMode,
      color: this.danmakuColor,
      size: this.danmakuSize,
    };
  }
  /** 设置登录状态 */
  private setLoginStatus(flag: boolean) {
    if (flag) {
      this.$el.classList.add("is-login");
    } else {
      this.$el.classList.remove("is-login");
    }
  }
  /** 设置加载状态 */
  private setLoadingStatus(flag: boolean) {
    if (flag) {
      this.$el.classList.add("is-loading");
    } else {
      this.$el.classList.remove("is-loading");
    }
  }
}

const defaultPlaceholder = "发条弹幕吧~";
