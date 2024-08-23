import { Player } from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox } from "@/components";

declare module "@core" {}

/** 启用自动播放设置 */

export default class AutoPlay extends BasePlugin {
  static pluginName = "autoPlay";
  protected checkbox?: Checkbox;
  apply(player: Player, options: PlayerOptions) {
    if (options.autoplay) this.toggle(true);
  }
  ready() {
    if (this.plugins.settings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.player.autoplay,
        onToggle: (val) => {
          this.toggle(val);
          this.player.emit("setValue", "autoplay", val);
        },
        label: "自动播放",
      });
      this.plugins.settings.$play.appendChild(container);
      this.player.on("autoplayChange", (flag) => {
        this.checkbox?.setValue(flag);
      });
    }
  }
  toggle(v: boolean) {
    if (v) {
      this.player.setAutoplay(true);
    } else {
      this.player.setAutoplay(false);
    }
  }
}
