import { Player as CorePlayer } from "./core-player";
import { PlayerOptions } from "@/types";
import DanmakuList from "../mfuns-plugin/danmakuList";
import Hotkeys from "@plugins/panels/hotkeyInfo";
import About from "@plugins/panels/about";
import { presetBasic } from "@plugins/presets/basic";
import AutoPart from "@plugins/enhance/playback/autoPart";
import AutoPlay from "@plugins/enhance/playback/autoPlay";
import Theme from "@plugins/theme";
import Part from "@plugins/videoOptions/part";
import Seamless from "@plugins/patch/seamless";
import PartList from "@plugins/panels/partList";
import ButtonDanmakulist from "@plugins/controls/button/ButtonDanmakulist";
import ButtonQuality from "@plugins/controls/button/ButtonQuality";
import Quality from "@plugins/quality";
import VideoStatus from "@plugins/enhance/ui/videoStatus";
import LoadingMask from "@plugins/enhance/ui/loadingMask";
import VideoTitle from "@plugins/controls/videoTitle";
import Header from "@plugins/ui/header";
import { presetDanmaku } from "@plugins/presets/danmaku";
import VideoQuality from "@plugins/videoOptions/qualities";
import FlvLoader from "@plugins/videoLoader/flvLoader";
import HlsLoader from "@plugins/videoLoader/hlsLoader";
import DashLoader from "@plugins/videoLoader/dashLoader";
import AspectRatio from "@plugins/enhance/video/aspectRatio";

/** 预设插件 */
const plugins = [
  Quality,
  VideoQuality,
  Header,
  Part,
  Seamless,
  DanmakuList,
  AspectRatio,
  AutoPlay,
  AutoPart,
  Theme,
  VideoStatus,
  LoadingMask,
];
const controls = [ButtonDanmakulist, ButtonQuality, VideoTitle];
const panels = [About, Hotkeys, PartList];
const loaders = [FlvLoader, HlsLoader, DashLoader];

const allPlugins = [
  ...presetBasic,
  ...presetDanmaku,
  ...plugins,
  ...panels,
  ...controls,
  ...loaders,
];

/** MfunsPlayer 标准版播放器
 *
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表
 */
export class Player extends CorePlayer {
  constructor(options: PlayerOptions) {
    super({
      autoPart: true,
      controller: {
        controls: {
          top: ["progress"],
          center: ["danmakuBar"],
          left: ["buttonPrev", "buttonPlay", "buttonNext", "videoTime", "buttonLoop"],
          right: [
            "buttonQuality",
            "buttonPart",
            "buttonVolume",
            "buttonSettings",
            "buttonPip",
            "buttonFullscreen",
          ],
        },
      },
      danmakuBar: {
        controls: {
          outer: ["buttonDanmakuToggle", "buttonDanmakuSettings"],
          left: ["buttonDanmakuStyle"],
        },
      },
      side: {
        panels: ["partList"],
      },
      ...options,
      plugins: [...allPlugins, ...(options.plugins || [])],
    });
  }
}

export * from "@/plugin";
export * from "@/config";
export * as Utils from "@/utils";
export * as Components from "@/components";
export type { allPlugins };
