import { Player } from "@/player";
import { classPrefix, developers, repositoryLink } from "@/config";
import { PanelPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-about-logo"></div>
  <div class="${classPrefix}-about-version">version ${Player.version}-${Player.gitHash}</div>
  <div>github：<a href="${repositoryLink}" target="_blank">mfuns-cn/mfunsPlayer</a></div>
  <div>开发者：</div>
  <ul class="${classPrefix}-about-developers">
    ${developers
      .map(
        ({ name, link }) => /*html*/ `
        <li>
          <a href="${link}" target="_blank">${name}</a>
        </li>
      `
      )
      .join("")}
    <li></li>
  </ul>
`;

/** 播放器面板 */
export default class about extends PanelPlugin {
  static pluginName = "about";

  title = "关于";
  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-about` }, templateHTML));
  }
}
