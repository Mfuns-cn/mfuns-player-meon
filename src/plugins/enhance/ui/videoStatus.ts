import { classPrefix } from "@/config";
import { UIPlugin } from "@/plugin";
import { createElement } from "@/utils";
import { Player } from "@/player";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-videostatus-paused"></div>
  <div class="${classPrefix}-videostatus-loading">
    <div class="${classPrefix}-videostatus-loading-icon">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    <div class="${classPrefix}-videostatus-loading-content">正在缓冲</div>
    <div class="${classPrefix}-videostatus-loading-speed"></div>
  </div>
  <div class="${classPrefix}-videostatus-volume"></div>
`;

/** 视频状态显示 */

export default class VideoStatus extends UIPlugin {
  static pluginName = "videoStatus";
  $paused: HTMLElement;
  $loading: HTMLElement;
  $volume: HTMLElement;
  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-videostatus` }, templateHTML));
    this.$paused = this.$(`.${classPrefix}-videostatus-paused`)!;
    this.$loading = this.$(`.${classPrefix}-videostatus-loading`)!;
    this.$volume = this.$(`.${classPrefix}-videostatus-volume`)!;

    this.player.$area.appendChild(this.$el);
  }
}
