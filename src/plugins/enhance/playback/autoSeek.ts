import { Player } from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox } from "@/components";

declare module "@core" {
  interface PlayerEventMap {
    /** 跳转到上次播放位置 */
    autoSeekChange: (flag: boolean) => void;
  }
  interface PlayerOptions {
    /** 跳转到上次播放位置 */
    autoSeek?: boolean;
    /** 上次播放的时间点(秒)，若存在time选项则此项失效 */
    lastPosition?: number;
  }
  interface PlayerSetValueMap {
    /** 跳转到上次播放位置 */
    autoSeek: boolean;
  }
}

/** 跳转到上次播放位置 */

export default class AutoSeek extends BasePlugin {
  static pluginName = "autoSeek";
  private _status = false;
  protected checkbox?: Checkbox;

  apply(player: Player, options: PlayerOptions) {
    if (options.autoSeek) {
      this.toggle(true);
      if (!options.lastPosition) return;
      this.player.once("loadedmetadata", () => {
        console.log(`ok: ${options.time} ${options.lastPosition}`);
        !options.time && this.player.seek(Math.floor(options.lastPosition!));
        options.autoPlay && this.player.play();
      });
    }
  }

  ready() {
    if (this.plugins.settings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.status,
        onToggle: (val) => {
          this.toggle(val);
          this.player.emit("setValue", "autoSeek", val);
        },
        label: "断点续播",
      });
      this.plugins.settings.$play.appendChild(container);
    }
  }

  toggle(v: boolean) {
    if (v) {
      this._status = true;
    } else {
      this._status = false;
    }
    this.player.emit("autoSeekChange", v);
  }
  get status() {
    return this._status;
  }
}
