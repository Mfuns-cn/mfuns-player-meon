import ContextMenu from "@plugins/ui/contextMenu";
import Controller from "@plugins/ui/controller";
import {
  ButtonPlay,
  ButtonPrev,
  ButtonNext,
  LabelTime,
  ButtonLoop,
  ButtonPart,
  ButtonVolume,
  ButtonSettings,
  ButtonPip,
  ButtonFullscreen,
} from "@plugins/controls";
import Hotkey from "@plugins/hotkey";
import Modal from "@plugins/ui/modal";
import Progress from "@plugins/controls/progress";
import Settings from "@plugins/settings";
import { PlayerOptions } from "@/types";
import Side from "@plugins/ui/side";
import Pip from "@plugins/screen/pip";
import Fullscreen from "@plugins/screen/fullscreen";
import User from "@plugins/videoOptions/user";
import StateActive from "../state/stateActive";
import StateFocus from "../state/stateFocus";
import StateResize from "../state/stateResize";
import StateIntersecting from "../state/stateIntersecting";
import Toast from "@plugins/ui/toast";

/** 核心插件 */
export const corePlugins = [
  StateActive,
  StateFocus,
  StateResize,
  StateIntersecting,
  Pip,
  Fullscreen,
];

/** 基础插件 */
export const basicPlugins = [Modal, Side, Controller, Toast, Settings, Hotkey, ContextMenu, User];

/** 基础控件 */
export const basicControls = [
  Progress,
  ButtonPlay,
  ButtonPrev,
  ButtonNext,
  LabelTime,
  ButtonLoop,
  ButtonPart,
  ButtonVolume,
  ButtonSettings,
  ButtonPip,
  ButtonFullscreen,
];

export const presetBasic = [...corePlugins, ...basicPlugins, ...basicControls];
