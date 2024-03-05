# Mfuns Player Meon

可插件化配置的播放器。


### 使用方法

待补充


### 基础配置选项
⚠️ 注意：播放器实例化过程会操作部分 DOM，建议在页面加载完成后(window.onload(Vallina JS)/mounted(Vue)/componentDidMount(React))进行实例化操作，避免部分功能出现问题

```ts
import {Player} from "@mfuns-player-meon"
const container = document.querySelector(".content");
//初始化播放器
window.onload = function(){
 new Player({
  container, // 容器
  video: {
    url: "...", //视频链接地址
    type: "mp4", //视频类型
  },
  volume: 0.7, // 视频初始音量
});
}
```

播放器基础配置接口参数
```ts
interface PlayerOptions {
  /** 播放器容器 */
  container: HTMLElement;
  /** 视频信息 */
  video: VideoInfo;
  
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

  /** 插件 */
  plugins?: (PluginConstructor | PluginItem)[];
  /** 外部扩展库(插件用) */
  externals?: PlayerExternals;
  /** 播放器调用的外部函数(插件用) */
  invoke?: PlayerInvokes;
}
```


更多配置详见各插件的PlayerOptions接口。