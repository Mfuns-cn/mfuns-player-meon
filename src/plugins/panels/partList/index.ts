import { Player } from "@/player";
import { classPrefix } from "@/config";
import { html, render } from "lit-html";
import { VideoInfo } from "@/types";
import { PanelPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateList = (list: Omit<VideoInfo, "list" | "part">[], setPart: (p: number) => void) =>
  list.map(
    ({ title }, index) => html`
      <li
        class="${classPrefix}-partlist-item"
        @click=${() => {
          setPart(index + 1);
        }}
        data-part="${index + 1}"
      >
        <div class="${classPrefix}-partlist-item-id">P${index + 1}</div>
        <div class="${classPrefix}-partlist-item-title">${title}</div>
      </li>
    `
  );

declare module "@core" {
  interface PlayerPlugins {
    partList?: PartList;
  }
}
/** 分P列表面板 */
export default class PartList extends PanelPlugin {
  static pluginName = "partList";

  title = "分P列表";
  $list: HTMLElement;
  private _part = 0;
  private _list: VideoInfo["list"] = [];

  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-partlist` }));
    this.$list = this.$el.appendChild(
      createElement("ul", { class: `${classPrefix}-partlist-list mpui-list` })
    );
  }
  init() {
    this.player.on("videoChange", (v) => {
      this._update(v.list);
      this._select(v.part || 1);
    });
  }
  private _update(list: VideoInfo["list"]) {
    if (list == this._list) return;
    this._list = list;
    render(
      templateList(list || [], (p) => {
        this.plugins.part?.set(p);
      }),
      this.$list
    );
  }
  private _select(p: number) {
    this.$list.querySelector(`li[data-part="${this._part}"]`)?.classList.remove("is-selected");
    this._part = p;
    this.$list.querySelector(`li[data-part="${p}"]`)?.classList.add("is-selected");
  }
}
