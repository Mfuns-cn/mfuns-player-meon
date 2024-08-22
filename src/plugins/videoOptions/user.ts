import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Player } from "@core";

declare module "@core" {
  interface Player {
    userId?: number;
    authorId?: number;
    login?: () => Promise<void>;
  }
  interface PlayerEventMap {
    login: (userId: number) => void;
  }
  interface PlayerOptions {
    userId?: number;
  }
  interface PlayerInvokes {
    login?: () => Promise<number>;
  }
  interface PlayerPlugins {
    user?: User;
  }
  interface VideoInfo {
    author?: {
      id: number;
    };
  }
}

export default class User extends BasePlugin {
  static pluginName = "user";
  private _userId = 0;
  private _authorId = 0;

  get invokeLogin() {
    return this.player.invokes.login;
  }
  init() {
    this.player.define("userId", { get: () => this._userId });
    this.player.define("authorId", { get: () => this._authorId });
    this.player.define("login", () => {
      return this.login();
    });
    this.player.on("videoChange", ({ author }) => {
      if (author?.id != null) {
        this._authorId = author.id || 0;
      }
    });
  }
  apply(player: Player, options: PlayerOptions): void {
    this._userId = options.userId || 0;
  }
  /** 调用页面登录 */
  async login() {
    await this.invokeLogin?.().then((res) => {
      res != null && this.setUser(res);
    });
  }
  /** 设置用户 */
  async setUser(userId: number) {
    this._userId = userId;
    this.player.emit("login", userId);
  }
}
