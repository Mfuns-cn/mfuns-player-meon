import { Player } from "@/player";
import { classPrefix } from "@/config";
import { PanelPlugin } from "@/plugin";
import { createElement } from "@/utils";

const template = (list: HotkeyInfoListItem[]) => /*html*/ `
  <div class="${classPrefix}-hotkeys-list">
    ${list
      .map(
        ({ key, description }) => /*html*/ `
        <div class="${classPrefix}-hotkeys-list-item">
          <div class="${classPrefix}-hotkeys-list-key">${key}</div>
          <div class="${classPrefix}-hotkeys-list-description">${description}</div>
        </div>
      `
      )
      .join("")}
  </div>
`;

interface HotkeyInfoListItem {
  key: string;
  description: string;
}

/** 快捷键信息面板 */
export default class HotkeyInfo extends PanelPlugin {
  static pluginName = "hotkeyInfo";

  title = "快捷键说明";
  constructor(player: Player) {
    const hotkeyInfoList = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" },
    ];
    super(
      player,
      createElement("div", { class: `${classPrefix}-hotkeys` }, template(hotkeyInfoList))
    );
  }
}
