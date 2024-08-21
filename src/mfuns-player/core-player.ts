export { Player } from "@/player";
export * from "@/plugin";
export * from "@/config";
export * as Utils from "@/utils";
export * as Components from "@/components";
import { Player } from "@core";
import "@css/index.scss";

console.log(
  `${"\n"} %c mfunsPlayer v${Player.version} ${Player.gitHash} %c https://github.com/Mfuns-cn ${"\n"}${"\n"}`,
  "color: #fff; background: #7b7ff7; padding:5px 0;",
  "background: #f5f5f5; padding:5px 0;"
);
