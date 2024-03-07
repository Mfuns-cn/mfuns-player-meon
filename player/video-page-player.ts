import { Player as CorePlayer } from "./core-player";
import { PlayerOptions } from "@/types";
import DanmakuList from "../mfuns-plugin/danmakuList";
import BlackBorder from "@plugins/enhance/video/blackBorder";
import Widescreen from "@plugins/screen/widescreen";
import { ButtonWebscreen, ButtonWidescreen } from "@plugins/controls";
import About from "@plugins/panels/about";
import Hotkeys from "@plugins/panels/hotkeyInfo";
import { presetBasic } from "@plugins/presets/basic";
import AutoPart from "@plugins/enhance/playback/autoPart";
import AutoPlay from "@plugins/enhance/playback/autoPlay";
import AutoSeek from "@plugins/enhance/playback/autoSeek";
import Theme from "@plugins/theme";
import Part from "@plugins/videoOptions/part";
import Seamless from "@plugins/patch/seamless";
import PartList from "@plugins/panels/partList";
import ButtonDanmakulist from "@plugins/controls/button/ButtonDanmakulist";
import Quality from "@plugins/quality";
import ButtonQuality from "@plugins/controls/button/ButtonQuality";
import VideoStatus from "@plugins/enhance/ui/videoStatus";
import LoadingMask from "@plugins/enhance/ui/loadingMask";
import VideoTitle from "@plugins/controls/videoTitle";
import Header from "@plugins/ui/header";
import Mini from "@plugins/enhance/ui/mini";
import LightOff from "@plugins/enhance/ui/lightOff";
import Webscreen from "@plugins/screen/webscreen";
import { presetDanmaku } from "@plugins/presets/danmaku";
import VideoQuality from "@plugins/videoOptions/qualities";
import HlsLoader from "@plugins/videoLoader/hlsLoader";
import DashLoader from "@plugins/videoLoader/dashLoader";
import FlvLoader from "@plugins/videoLoader/flvLoader";
import AspectRatio from "@plugins/enhance/video/aspectRatio";
import Footbar from "@plugins/ui/footbar";

/** 内置插件 */
const plugins = [
  Quality,
  VideoQuality,
  Header,
  Part,
  Seamless,
  DanmakuList,
  BlackBorder,
  AspectRatio,
  Webscreen,
  Widescreen,
  AutoPlay,
  AutoPart,
  AutoSeek,
  Theme,
  VideoStatus,
  LoadingMask,
  Mini,
  LightOff,
  Footbar,
];

const panels = [About, Hotkeys, PartList];

const controls = [ButtonWebscreen, ButtonWidescreen, ButtonDanmakulist, ButtonQuality, VideoTitle];

const loaders = [FlvLoader, HlsLoader, DashLoader];

/** MfunsPlayer 播放页版播放器
 *
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表、视频黑边、宽屏模式、关灯模式
 */
export class Player extends CorePlayer {
  constructor(options: PlayerOptions) {
    super({
      autoPart: true,
      controller: {
        controls: {
          top: ["progress"],
          center: [],
          left: ["buttonPrev", "buttonPlay", "buttonNext", "videoTime", "buttonLoop"],
          right: [
            "buttonQuality",
            "buttonPart",
            "buttonVolume",
            "buttonSettings",
            "buttonPip",
            "buttonWidescreen",
            "buttonWebscreen",
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
      footbar: {
        controls: {
          right: ["danmakuBar"],
        },
      },
      ...options,
      plugins: [
        ...presetBasic,
        ...presetDanmaku,
        ...plugins,
        ...panels,
        ...controls,
        ...loaders,
        ...(options.plugins || []),
      ],
    });
  }
}

export * from "@/plugin";
export * from "@/config";
export * as Utils from "@/utils";
export * as Components from "@/components";
