import { classPrefix } from "@/config";
import { Player } from "@/player";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";
import { html, render } from "lit-html";
import { DanmakuItem } from "./types";

const templateDanmaku = (
  danmaku: DanmakuItem[],
  operation: (dm: DanmakuItem) => [string, (dm: DanmakuItem) => void, unknown][],
  onClick: (dm: DanmakuItem) => void,
  hide: () => void
) => html`
  ${danmaku.map(
    (dm) => html`
      <li
        class="${classPrefix}-contextmenu-danmaku-item"
        @click=${() => {
          onClick(dm);
        }}
      >
        <div class="${classPrefix}-contextmenu-danmaku-item-content">${dm.content}</div>
        <div class="${classPrefix}-contextmenu-danmaku-item-operate">
          ${operation(dm).map(
            ([label, onClick]) =>
              html`<div
                class="${classPrefix}-contextmenu-danmaku-item-operate-btn"
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  onClick(dm);
                  hide();
                }}
              >
                ${label}
              </div>`
          )}
        </div>
      </li>
    `
  )}
`;

const copyClip = (content: string) => navigator.clipboard.writeText(content);

/** 弹幕菜单
 *
 * 前置插件: `danmaku` `contextMenu`
 */
export default class DanmakuMenu extends BasePlugin {
  static pluginName = "danmakuMenu";
  $el: HTMLElement;
  constructor(player: Player) {
    super(player);
    this.$el = createElement("ul", { class: `${classPrefix}-contextmenu-danmaku mpui-black` });
  }
  init() {
    this.player.on("contextMenuShow", (x, y) => {
      const captured = this.plugins.danmakuEngine?.capture(x, y, 4);
      this.update(captured || []);
    });
  }
  ready() {
    this.plugins.contextMenu?.$list.before(this.$el);
  }
  update(danmaku: DanmakuItem[]) {
    const invokes = this.player.invokes;
    const operate = this.plugins.danmakuOperate;
    if (danmaku?.length) {
      this.$el.style.display = "";
    } else {
      this.$el.style.display = "none";
    }
    render(
      templateDanmaku(
        danmaku,
        (dm) => {
          const myDanmaku = this.player.userId && dm.user == this.player.userId;
          return [
            [
              "举报",
              (dm: DanmakuItem) => {
                operate?.report(dm);
              },
              !myDanmaku && invokes?.danmakuReport,
            ],
            [
              "屏蔽",
              (dm: DanmakuItem) => {
                operate?.blockUser(dm.user, true);
              },
              !myDanmaku && invokes?.danmakuBlockUser,
            ],
            [
              "撤回",
              (dm: DanmakuItem) => {
                operate?.recall(dm);
              },
              myDanmaku && invokes?.danmakuRecall,
            ],
            [
              "复制",
              (dm: DanmakuItem) => {
                copyClip(dm.content);
              },
              true,
            ],
          ].filter((v) => v[2]) as [string, (dm: DanmakuItem) => void, unknown][];
        },
        (dm) => {
          this.player.emit("danmaku:select", dm);
        },
        () => {
          this.plugins.contextMenu?.hide();
        }
      ),
      this.$el
    );
  }
}
