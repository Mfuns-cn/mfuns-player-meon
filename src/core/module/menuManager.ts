import Player from "@/player";
import { MenuItem, UIOptionsItem } from "@/plugin";
import { PlayerHookMap } from "@/types";

export default class MenuManager {
  protected list = new Map<string, MenuItem>();
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }
  /** 注册菜单项 */
  register(name: string, item: MenuItem | (new (player: Player) => MenuItem)) {
    this.list.set(name, typeof item == "function" ? this.build(item) : item);
  }

  /** 移除菜单项 */
  unregister<T extends keyof PlayerHookMap>(name: T) {
    this.list.delete(name);
  }

  /** 获取菜单项 */
  get(item: UIOptionsItem<MenuItem>): MenuItem | undefined {
    switch (typeof item) {
      case "object":
        return item;
      case "function":
        return this.build(item);
      default:
        return this.list.get(item);
    }
  }

  /** 创建菜单项 */
  build(func: new (player: Player) => MenuItem) {
    const item = new func(this.player);
    item.init?.(this.player);
    item.ready?.(this.player);
    item.mounted?.(this.player);
    return item;
  }
}
