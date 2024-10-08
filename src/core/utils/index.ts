import { PlayerOptions } from "@/types";

export const isMobile = /mobile/i.test(window.navigator.userAgent);

/** 是否支持全屏 */
export const fullScreenEnabled =
  document.fullscreenEnabled ||
  (document as any).webkitFullscreenEnabled ||
  (document as any).mozFullScreenEnabled ||
  (document as any).msFullscreenEnabled ||
  false;

/** 是否支持画中画 */
export const pictureInPictureEnabled = document.pictureInPictureEnabled || false;

/**
 * 创建元素
 * @param tagName 元素标签名
 * @param attributes 元素属性
 * @param children 子元素/HTML字符串
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  attributes?: Record<string, string>,
  children?: Node | string
) {
  const el = document.createElement(tagName);
  if (attributes) {
    for (const name in attributes) {
      el.setAttribute(name, attributes[name]);
    }
  }
  if (typeof children == "string") {
    el.innerHTML = children;
  } else if (children instanceof Node) {
    el.appendChild(children);
  }
  return el;
}

/**
 * 替换子元素
 * @param element 父元素
 * @param children 要替换的子节点或HTML字符串
 */
export function replaceChildren(element: HTMLElement, children: Node | string) {
  if (typeof children == "string") {
    element.innerHTML = children;
  } else {
    element.innerHTML = "";
    element.appendChild(children);
  }
}
/**
 * 防抖
 * @param fn 需要防抖处理的函数
 * @param delay 防抖延迟执行时间
 * @param immediate 是否立即执行一次
 */
export const debounce = <T extends any[]>(
  fn: (...args: T) => void,
  delay: number,
  immediate: boolean = false
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isInvoke = false;
  const f = function (this: unknown, ...args: T) {
    if (timer) clearTimeout(timer);
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer!);
        timer = null;
        isInvoke = false;
      }, delay);
    }
  };
  /*   f.clear = () => {
    if (timer) clearTimeout(timer);
  }; */
  return f;
};

/**
 * 节流
 * @param fn 需要节流处理的函数
 * @param wait 执行一次后需要等待的时间
 */
export const throttle = <T extends any[]>(fn: (...args: T) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: T) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer!);
        timer = null;
      }, wait);
    }
  };
};

/** 生成一个范围内的随机数
 * @param lower 最小值
 * @param upper 最大值
 * @returns 生成的随机数
 */
export function random(lower: number, upper: number): number {
  return lower + Math.random() * (upper - lower);
}

/** 钳制数值
 * @param number 传入数值
 * @param lower 最小值
 * @param upper 最大值
 * @returns 钳制后的数值
 */
export function clamp(number: number, lower: number, upper: number): number {
  return number > lower ? (number < upper ? number : upper) : lower;
}

/**
 * 将时间文本转换为秒数
 *
 * @param time 冒号分隔的时间文本
 * @return 秒数
 */
export function timeToSecond(time: string): number {
  const arr = time.split(":").slice(-3);
  const sec = parseInt(arr[arr.length - 1]) || 0;
  const min = parseInt(arr[arr.length - 2]) || 0;
  const hour = parseInt(arr[arr.length - 3]) || 0;
  const day = parseInt(arr[arr.length - 4]) || 0;
  return sec + min * 60 + hour * 3600 + day * 86400;
}

/**
 * 将秒数转换为时间文本
 *
 * @param second 秒数
 * @param level 转换等级(二进制位属性，表示可转换的时间格式，4-天时分秒，3-时分秒，2-分秒, 1-秒)
 * @return 时间文本
 */
export function secondToTime(second: number, level: number = 0b0110): string {
  second = Number.isFinite(second) ? Math.floor(second) : 0;
  if (!(level & 0b1111)) return second.toString();
  const join = (...args: number[]) =>
    args.map((num) => (num < 10 ? `0${num}` : `${num}`)).join(":");
  let minute: number, hour: number, day: number;
  if (level & 0b0001 && second < 60) {
    return second.toString();
  }
  minute = Math.floor(second / 60);
  second = second % 60;
  if (level & 0b0010 && minute < 60) {
    return join(minute, second);
  }
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  if (level & 0b0100 && hour < 24) {
    return join(hour, minute, second);
  }
  day = Math.floor(hour / 60);
  hour = hour % 24;
  return join(day, hour, minute, second);
}

/** 十六进制颜色转数字
 * @param color 颜色字符串，可以省略#符号
 * @return 数值
 */
export function HexColorToNumber(color: string): number {
  if (color[0] === "#") {
    color = color.substring(1);
  }
  if (color.length === 3) {
    color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
  }
  return (parseInt(color, 16) + 0x000000) & 0xffffff;
}

/**
 * 数字转十六进制颜色
 * @param number 传入的数字
 * @return 十六进制颜色
 */
export function numberToHexColor(number: number): string {
  return `#${`00000${number.toString(16)}`.slice(-6)}`;
}

const dateFormatMap = {
  yyyy: (d: Date) => d.getFullYear().toString(),
  yy: (d: Date) => d.getFullYear().toString().slice(-2),
  MM: (d: Date) => (d.getMonth() + 1).toString().padStart(2, "0"),
  dd: (d: Date) => d.getDate().toString().padStart(2, "0"),
  HH: (d: Date) => d.getHours().toString().padStart(2, "0"),
  mm: (d: Date) => d.getMinutes().toString().padStart(2, "0"),
  ss: (d: Date) => d.getSeconds().toString().padStart(2, "0"),
};

/**
 * 格式化时间
 * @param date 时间对象
 * @param format 日期格式
 * @return 格式化后的字符串
 */
export function dateFormat(date: Date, format: string): string {
  return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, (match) =>
    dateFormatMap[match as keyof typeof dateFormatMap]?.(date)
  );
}

// 判断是否是纯粹对象
export function isPlainObject(obj: object) {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

// 深合并(不包括数组)
export function assignDeep(...args: Record<string, any>[]) {
  if (args.length < 2) return args[0];
  // 合并结果
  let result = args[0];
  args.shift();
  args.forEach((item) => {
    if (isPlainObject(item)) {
      if (!isPlainObject(result)) result = {};
      for (const key in item) {
        if (result[key] && isPlainObject(item[key])) {
          result[key] = assignDeep(result[key], item[key]);
        } else {
          result[key] = item[key];
        }
      }
    }
  });
  return result;
}

export function mergeOptions(...opts: PlayerOptions[]) {
  let result = { ...opts[0] };
  let plugins = opts[0].plugins || [];
  opts.shift();
  opts.forEach((op) => {
    if (op.plugins) plugins = plugins.concat(plugins, op.plugins);
    assignDeep(result, op);
  });
  result.plugins = plugins;
  return result;
}
