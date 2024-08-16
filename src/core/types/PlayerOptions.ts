import { VideoInfo, PluginConstructor, PlayerExternals, PluginItem, PlayerInvokes } from "@/types";

/** 播放器初始化选项 */
export interface PlayerOptions {
  /** 播放器容器 */
  container?: HTMLElement;
  /** 视频信息 */
  video?: VideoInfo;

  // --- 播放配置 --- //
  /** 音量 */
  volume?: number;
  /** 播放速率 */
  playbackRate?: number;
  /** 自动播放 */
  autoPlay?: boolean;
  /** 播放时间 */
  time?: number;
  /** 循环播放 */
  loop?: boolean;
  /** 功能插件 */
  plugins?: (PluginConstructor | PluginItem)[];
  /** 外部扩展 */
  externals?: PlayerExternals;
  /** 调用外部函数 */
  invokes?: PlayerInvokes;
}
