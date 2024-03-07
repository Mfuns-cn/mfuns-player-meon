import { Player } from "@/player";
import { PluginFrom } from "@/plugin";
import { PlayerOptions, PluginItem, PluginConstructor } from "@/types";

export default class PluginManager {
  player: Player;
  get list() {
    return this.player.plugins as unknown as Record<string, PluginItem>;
  }
  private isInit = false;
  private isReady = false;
  private isMounted = false;
  constructor(player: Player) {
    this.player = player;
  }

  /** 插件模块初始化 @internal */
  init(options: PlayerOptions) {
    if (this.isInit) return;
    this.isInit = true;
    options.plugins?.forEach((pluginItem) => {
      this.register(pluginItem, options);
    });
    this.pluginsReady();
    this.player.emit("ready");
    this.player.once("mounted", () => {
      this.playerMounted();
    });
  }

  /** 注册插件 */
  register(pluginItem: PluginConstructor | PluginItem, options: PlayerOptions) {
    const plugin: PluginItem =
      typeof pluginItem == "function" ? new pluginItem(this.player) : pluginItem;
    if (pluginItem.pluginName) this.list[pluginItem.pluginName] = plugin;
    if (plugin.initialized) return;
    plugin.init?.(this.player);
    plugin.apply?.(this.player, options);
    this.isReady && plugin.ready?.(this.player);
    this.isMounted && plugin.mounted?.(this.player);
    plugin.initialized = true;
  }

  /** 访问已安装插件实例 */
  get(name: string): PluginItem | undefined {
    return this.list[name];
  }

  /** 获取插件实例 */
  from<T extends PluginItem>(item: PluginFrom<T>): T | undefined {
    switch (typeof item) {
      case "object":
        return item;
      case "function":
        return this.build(item);
      default:
        return this.list[item] as T;
    }
  }

  /** 初始化插件实例 */
  build<T extends PluginItem>(
    pluginItem: (new (player: Player) => T) | T,
    options: PlayerOptions = {}
  ): T {
    const plugin: T = typeof pluginItem == "function" ? new pluginItem(this.player) : pluginItem;
    if (plugin.initialized) return plugin;
    plugin.init?.(this.player);
    plugin.apply?.(this.player, options);
    this.isReady
      ? plugin.ready?.(this.player)
      : this.player.once("ready", () => plugin.mounted?.(this.player));
    this.isMounted
      ? plugin.mounted?.(this.player)
      : this.player.once("mounted", () => plugin.mounted?.(this.player));
    plugin.initialized = true;
    return plugin;
  }

  /** 所有插件注册完毕后执行 @internal */
  protected pluginsReady() {
    if (this.isReady) return;
    for (const name in this.list) {
      const plugin = this.list[name];
      plugin.ready?.(this.player);
    }
    this.isReady = true;
  }

  /** 播放器挂载后执行 @internal */
  protected playerMounted() {
    if (this.isMounted) return;
    for (const name in this.list) {
      const plugin = this.list[name];
      plugin.mounted?.(this.player);
    }
  }

  /** 销毁所有插件 @internal */
  destroy() {
    for (const name in this.list) {
      const plugin = this.list[name];
      plugin.destroy?.();
    }
  }
}
