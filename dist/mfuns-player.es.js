var Is = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
};
var R = (i, t, e) => (Is(i, t, "read from private field"), e ? e.call(i) : t.get(i)), z = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, M = (i, t, e, s) => (Is(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e);
const wi = /mobile/i.test(window.navigator.userAgent), ri = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || !1, ai = document.pictureInPictureEnabled || !1;
function T(i, t, e) {
  const s = document.createElement(i);
  if (t)
    for (const n in t)
      s.setAttribute(n, t[n]);
  return typeof e == "string" ? s.innerText = e : e instanceof Node ? s.appendChild(e) : e != null && e.html ? (s.innerHTML = e.html, s.normalize()) : e != null && e.text && (s.innerText = e.text), s;
}
function xi(i, t) {
  i.innerHTML = "", typeof t == "string" ? i.innerText = t : i.appendChild(t);
}
const Me = (i, t, e = !1) => {
  let s = null, n = !1;
  return function(...l) {
    s && clearTimeout(s), e && !n ? (i.apply(this, l), n = !0) : s = setTimeout(() => {
      i.apply(this, l), clearTimeout(s), s = null, n = !1;
    }, t);
  };
}, ki = (i, t) => {
  let e = null;
  return function(...s) {
    e || (e = setTimeout(() => {
      i.apply(this, s), clearTimeout(e), e = null;
    }, t));
  };
};
function Si(i, t) {
  return i + Math.random() * (t - i);
}
function _t(i, t, e) {
  return i > t ? i < e ? i : e : t;
}
function Ft(i) {
  const t = i.split(":").slice(-3), e = parseInt(t[t.length - 1]) || 0, s = parseInt(t[t.length - 2]) || 0, n = parseInt(t[t.length - 3]) || 0, a = parseInt(t[t.length - 4]) || 0;
  return e + s * 60 + n * 3600 + a * 86400;
}
function pt(i, t = 6) {
  if (i = Number.isFinite(i) ? Math.floor(i) : 0, !(t & 15))
    return i.toString();
  const e = (...l) => l.map((o) => o < 10 ? `0${o}` : `${o}`).join(":");
  let s, n, a;
  return t & 1 && i < 60 ? i.toString() : (s = Math.floor(i / 60), i = i % 60, t & 2 && s < 60 ? e(s, i) : (n = Math.floor(s / 60), s = s % 60, t & 4 && n < 24 ? e(n, s, i) : (a = Math.floor(n / 60), n = n % 24, e(a, n, s, i))));
}
function Ei(i) {
  return i[0] === "#" && (i = i.substring(1)), i.length === 3 && (i = `${i[0]}${i[0]}${i[1]}${i[1]}${i[2]}${i[2]}`), parseInt(i, 16) + 0 & 16777215;
}
function li(i) {
  return `#${`00000${i.toString(16)}`.slice(-6)}`;
}
const kt = {
  yyyy: (i) => i.getFullYear().toString(),
  yy: (i) => i.getFullYear().toString().slice(-2),
  MM: (i) => (i.getMonth() + 1).toString().padStart(2, "0"),
  dd: (i) => i.getDate().toString().padStart(2, "0"),
  HH: (i) => i.getHours().toString().padStart(2, "0"),
  mm: (i) => i.getMinutes().toString().padStart(2, "0"),
  ss: (i) => i.getSeconds().toString().padStart(2, "0")
};
function De(i, t) {
  return t.replace(
    /yyyy|yy|MM|dd|HH|mm|ss/g,
    (e) => {
      var s;
      return (s = kt[e]) == null ? void 0 : s.call(kt, i);
    }
  );
}
const wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HexColorToNumber: Ei,
  clamp: _t,
  createElement: T,
  dateFormat: De,
  debounce: Me,
  fullScreenEnabled: ri,
  isMobile: wi,
  numberToHexColor: li,
  pictureInPictureEnabled: ai,
  random: Si,
  replaceChildren: xi,
  secondToTime: pt,
  throttle: ki,
  timeToSecond: Ft
}, Symbol.toStringTag, { value: "Module" })), r = "mfuns-player", Li = void 0, Ti = "026c7e2", Ai = "https://github.com/Mfuns-cn/mfunsPlayer/tree/v3-beta", _i = [
  { name: "Minteea", id: "Minteea", link: "https://github.com/Minteea" },
  { name: "鲁迪钨丝", id: "Rudiusu", link: "https://github.com/Rudiusu" }
], qs = {
  play: () => [],
  pause: () => [],
  ended: () => [],
  loadeddata: () => [],
  loadedmetadata: () => [],
  waiting: () => [],
  playing: () => [],
  canplay: () => [],
  canplaythrough: () => [],
  timeupdate: (i) => [i.currentTime],
  durationchange: (i) => [i.duration],
  progress: (i) => [i.buffered],
  seeking: (i) => [i.currentTime],
  seeked: (i) => [i.currentTime],
  volumechange: (i) => [i.volume, i.muted],
  ratechange: (i) => [i.playbackRate],
  enterpictureinpicture: () => [],
  leavepictureinpicture: () => []
};
class Fi {
  constructor(t, e) {
    this.ratio = null, this.info = {}, this.mediaController = null, this.player = t, this.$el = this.player.$content.appendChild(
      T("video", { class: `${r}-video` })
    ), this._attachEvent(this.$el), this.player.on("ended", () => {
      this.player.hook.call("end").then((s) => {
        s && this.player.emit("end");
      });
    });
  }
  /** 设置视频 */
  set(t, e, s) {
    this.player.hook.call("video.set", t).then(async (n) => {
      var a, l;
      if (n) {
        (l = (a = this.mediaController) == null ? void 0 : a.destroy) == null || l.call(a), this.mediaController = null, this.info = t, this.player.emit("videoChange", { ...t });
        let { url: o, type: h, live: c } = t;
        const u = { url: o, type: h, play: e, time: s, live: c };
        this.player.hook.call("video.beforeLoad", u).then(() => {
          u.url ? this.load(u) : this.player.throw(new Error("缺少视频播放信息"));
        });
      }
    });
  }
  /** 加载视频 */
  load(t) {
    this.player.hook.call("video.load", t).then((e) => {
      e ? (this.mediaController = this.player.loader.create(t, this.$el), this.player.emit("videoLoad", t)) : this.player.throw(new Error("视频加载失败"));
    });
  }
  /** 添加视频事件 */
  _attachEvent(t) {
    this.detachEventController = new AbortController();
    for (const e in qs) {
      const s = qs[e];
      t.addEventListener(
        e,
        () => {
          this.player.emit(
            e,
            ...s(t)
          );
        },
        { signal: this.detachEventController.signal }
      );
    }
  }
  bind(t) {
    var e;
    this.$el = t, (e = this.detachEventController) == null || e.abort(), this._attachEvent(t);
  }
  /** 获取播放信息 */
  getVideoInfo() {
    return {
      ...this.info
    };
  }
  /** 获取媒体信息 */
  getMediaInfo() {
    var t, e, s;
    return {
      url: (t = this.mediaController) == null ? void 0 : t.url,
      type: ((e = this.mediaController) == null ? void 0 : e.type) || "",
      live: ((s = this.mediaController) == null ? void 0 : s.live) || !1
    };
  }
}
class Hi {
  constructor(t) {
    this.initialized = !1, this.player = t;
  }
  get plugin() {
    return this.player.plugin;
  }
  /** 注册插件 */
  register(t, e) {
    var n, a, l, o;
    const s = typeof t == "function" ? new t(this.player) : t;
    (n = s.init) == null || n.call(s, this.player), t.pluginName && (this.player.plugin[t.pluginName] = s), console.log(t.pluginName), (a = s.apply) == null || a.call(s, this.player, e), this.initialized && ((l = s.ready) == null || l.call(s, this.player), (o = s.mounted) == null || o.call(s, this.player));
  }
  /** 批量注册插件 */
  pluginsRegister(t) {
    var e;
    (e = t.plugins) == null || e.forEach((s) => {
      this.register(s, t);
    }), this.pluginsReady();
  }
  /** 所有插件注册完毕后执行 */
  pluginsReady() {
    var t;
    if (!this.initialized) {
      for (const e in this.plugin) {
        const s = this.plugin[e];
        (t = s.ready) == null || t.call(s, this.player);
      }
      this.initialized = !0;
    }
  }
  /** 播放器挂载后执行 */
  playerMounted() {
    var t;
    for (const e in this.plugin) {
      const s = this.plugin[e];
      (t = s.mounted) == null || t.call(s, this.player);
    }
  }
  /** 销毁所有插件 */
  destroy() {
    var t;
    for (const e in this.plugin) {
      const s = this.plugin[e];
      (t = s.destroy) == null || t.call(s);
    }
  }
}
class Mi {
  constructor() {
    this.hooks = {};
  }
  /** 注册钩子 */
  register(t, e, s = !1) {
    let n = this.hooks[t];
    n || (n = [], this.hooks[t] = n), s ? n.unshift(e) : n.push(e);
  }
  /** 移除钩子 */
  unregister(t, e) {
    let s = this.hooks[t];
    s || (s = [], this.hooks[t] = s);
    const n = s.indexOf(e);
    n > -1 && s.splice(n, 1);
  }
  /** 调用钩子函数
   * @param name 钩子名称
   * @param ctx 钩子上下文
   * @param defaultFunc 钩子在正常遍历完毕后最终执行的钩子函数
   */
  async call(t, e, s) {
    const n = this.hooks[t];
    if (n != null && n.length)
      for (const a of n) {
        const l = await a(e);
        if (l == !0)
          return console.log(`钩子提前结束调用: ${t}`), console.log(a), !0;
        if (l == !1)
          return console.log(`钩子被拦截: ${t}`), console.log(a), !1;
      }
    return console.log(`钩子调用完毕: ${t}`), console.log(e), (s == null ? void 0 : s(e)) ?? !0;
  }
}
class Di {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册控制组件 */
  register(t, e) {
    this.list.set(t, typeof e == "function" ? this.build(e) : e);
  }
  /** 移除控制组件 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 获取控制组件 */
  get(t) {
    let e;
    switch (typeof t) {
      case "object":
        e = t;
        break;
      case "function":
        e = this.build(t);
        break;
      default:
        e = this.list.get(t);
        break;
    }
    return e != null && e.ignored ? void 0 : e;
  }
  /** 创建控制组件 */
  build(t) {
    var s, n, a;
    const e = new t(this.player);
    return (s = e.init) == null || s.call(e, this.player), (n = e.ready) == null || n.call(e, this.player), (a = e.mounted) == null || a.call(e, this.player), e;
  }
}
class Pi {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册面板 */
  register(t, e) {
    this.list.set(t, typeof e == "function" ? this.build(e) : e);
  }
  /** 移除面板 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 获取面板 */
  get(t) {
    switch (typeof t) {
      case "object":
        return t;
      case "function":
        return this.build(t);
      default:
        return this.list.get(t);
    }
  }
  /** 创建面板 */
  build(t) {
    var s, n, a;
    const e = new t(this.player);
    return (s = e.init) == null || s.call(e, this.player), (n = e.ready) == null || n.call(e, this.player), (a = e.mounted) == null || a.call(e, this.player), e;
  }
}
class Ri {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册菜单项 */
  register(t, e) {
    this.list.set(t, typeof e == "function" ? this.build(e) : e);
  }
  /** 移除菜单项 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 获取菜单项 */
  get(t) {
    switch (typeof t) {
      case "object":
        return t;
      case "function":
        return this.build(t);
      default:
        return this.list.get(t);
    }
  }
  /** 创建菜单项 */
  build(t) {
    var s, n, a;
    const e = new t(this.player);
    return (s = e.init) == null || s.call(e, this.player), (n = e.ready) == null || n.call(e, this.player), (a = e.mounted) == null || a.call(e, this.player), e;
  }
}
class Ni {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册加载器 */
  register(t, e) {
    this.list.set(t, e);
  }
  /** 移除加载器 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 创建媒体控制实例 */
  create(t, e) {
    for (const [s, n] of this.list)
      if (n.check(t))
        return n.create(t, e);
    return this.createDefault(t, e);
  }
  /** 常规方式创建实例 */
  createDefault(t, e) {
    const { type: s, url: n, live: a, play: l, time: o } = t, h = {
      type: s || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        this.mediaElement.src = "";
      }
    }, c = o === !0 ? this.player.currentTime : o;
    return e.src = n, e.addEventListener(
      "loadeddata",
      () => {
        c && this.player.seek(c), l && this.player.play();
      },
      { once: !0 }
    ), h;
  }
}
class Ii {
  constructor() {
    this.listeners = {}, this.onceListeners = {}, this.customEventList = [];
  }
  /** 添加监听 */
  on(t, e) {
    this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push(e);
  }
  /** 添加一次性监听 */
  once(t, e) {
    this.onceListeners[t] || (this.onceListeners[t] = []), this.onceListeners[t].push(e);
  }
  /** 移除监听 */
  off(t, e) {
    this.listeners[t] || (this.listeners[t] = []);
    const s = this.listeners[t].indexOf(e);
    s > -1 && this.listeners[t].splice(s, 1);
  }
  /** 触发事件 */
  emit(t, ...e) {
    var s, n;
    if ((s = this.listeners[t]) != null && s.length)
      for (let a = 0; a < this.listeners[t].length; a++)
        this.listeners[t][a](...e);
    if ((n = this.onceListeners[t]) != null && n.length) {
      for (let a = 0; a < this.onceListeners[t].length; a++)
        this.onceListeners[t][a](...e);
      this.onceListeners[t] = [];
    }
  }
}
var G;
let at = (G = class {
  constructor(t) {
    this.hook = new Mi(), this.plugin = {}, this._eventEmitter = new Ii(), this.Player = G, this.container = t.container, this.$el = T("div", { class: `${r} mpui` }), this.$main = this.$el.appendChild(T("div", { class: `${r}-main` })), this.$area = this.$main.appendChild(T("div", { class: `${r}-area` })), this.$content = this.$area.appendChild(
      T("div", { class: `${r}-content` })
    ), this._pluginManager = new Hi(this), this._videoController = new Fi(this, t), this.loader = new Ni(this), this.controls = new Di(this), this.panel = new Pi(this), this.menu = new Ri(this), this.init(t);
  }
  /** 初始化播放器 */
  async init(t) {
    this.on("videoChange", () => {
      this.$el.classList.add("is-start");
    }), this.$el.classList.add("is-paused"), this.on("play", () => {
      this.$el.classList.remove("is-start"), this.$el.classList.remove("is-paused");
    }), this.on("pause", () => {
      this.$el.classList.add("is-paused");
    }), this.on("waiting", () => {
      this.$el.classList.add("is-loading");
    }), this.on("playing", () => {
      this.$el.classList.remove("is-loading");
    }), this._pluginManager.pluginsRegister(t), this.container.appendChild(this.$el), this._pluginManager.playerMounted(), this.emit("mounted"), this._videoController.set(t.video, t.autoPlay, t.time);
  }
  /** 播放器视频元素 */
  get $video() {
    return this._videoController.$el;
  }
  /** 获取视频信息 */
  getVideoInfo() {
    return this._videoController.getVideoInfo();
  }
  /** 获取媒体信息 */
  getMediaInfo() {
    return this._videoController.getMediaInfo();
  }
  /** 获取播放器的媒体元素 */
  getMediaElement() {
    return this._videoController.$el;
  }
  /** 绑定媒体元素 */
  attachMediaElement(t) {
    this._videoController.bind(t);
  }
  /** 获取媒体控制实例 */
  getMediaController() {
    return this._videoController.mediaController;
  }
  /** 绑定媒体控制实例 */
  attachMediaController(t) {
    this._videoController.mediaController = t, this._videoController.bind(t.mediaElement);
  }
  /** 设置视频内容 */
  setVideo(t, e, s) {
    return this._videoController.set(t, e, s);
  }
  /** 加载视频源 */
  loadVideo(t) {
    return this._videoController.load(t);
  }
  // --- 播放切换控制 --- //
  /** 切换上一个 */
  prev() {
    this.hook.call("prev");
  }
  /** 切换下一个 */
  next() {
    this.hook.call("next");
  }
  // --- 视频播放控制 --- //
  /** 当前播放器暂停状态 */
  get paused() {
    return this.$video.paused;
  }
  /** 当前播放时间 */
  get currentTime() {
    return this.$video.currentTime;
  }
  /** 当前播放总时间 */
  get duration() {
    return this.$video.duration;
  }
  /** 当前播放音量 */
  get volume() {
    return this.$video.volume;
  }
  /** 当前静音状态 */
  get muted() {
    return this.$video.muted;
  }
  /** 当前播放速度 */
  get playbackRate() {
    return this.$video.playbackRate;
  }
  /** 当前视频循环 */
  get loop() {
    return this.$video.loop;
  }
  /** 开始播放 */
  play() {
    this.hook.call("play").then((t) => {
      t && this.$video.play();
    });
  }
  /** 暂停播放 */
  pause() {
    this.hook.call("pause").then((t) => {
      t && this.$video.pause();
    });
  }
  /** 跳转
   * @param time 跳转时间点（秒）
   */
  seek(t) {
    this.hook.call("seek").then((e) => {
      e && (this.$video.currentTime = _t(t, 0, this.$video.duration));
    });
  }
  /** 设置音量
   * @param volume 音量（0-1）
   */
  setVolume(t) {
    this.$video.volume = _t(t, 0, 1);
  }
  /** 静音 */
  setMuted(t) {
    this.$video.muted = t;
  }
  /** 设置倍速 */
  setPlaybackRate(t) {
    this.$video.playbackRate = t;
  }
  /** 设置视频循环 */
  setLoop(t) {
    this.$video.loop = t, this.emit("loopChange", t);
  }
  // --- 事件 --- //
  /** 监听事件 */
  on(t, e) {
    this._eventEmitter.on(t, e);
  }
  /** 取消监听事件 */
  off(t, e) {
    this._eventEmitter.off(t, e);
  }
  /** 一次性监听事件 */
  once(t, e) {
    this._eventEmitter.once(t, e);
  }
  /** 发送事件 */
  emit(t, ...e) {
    this._eventEmitter.emit(t, ...e);
  }
  define(t, e) {
    Object.defineProperty(this, t, typeof e == "function" ? { value: e } : e);
  }
  /** 抛出错误 */
  throw(t) {
    console.error(t), this.emit("error", t);
  }
  /** 播放器销毁 */
  destroy() {
    this._pluginManager.destroy();
  }
}, G.version = Li, G.gitHash = Ti, G);
class b {
  constructor(t) {
    this.player = t, this.plugin = t.plugin, this.throw = t.throw;
  }
}
class Pe extends b {
  $(t) {
    return this.$el.querySelector(t);
  }
  constructor(t, e) {
    super(t), this.$el = e;
  }
}
class D extends Pe {
  apply(t, e) {
    t.controls.register(this.name, this);
  }
  show() {
    this.$el.style.display = "";
  }
  hide() {
    this.$el.style.display = "none";
  }
}
class mt extends Pe {
  constructor(t, e) {
    super(t, e), this.shown = !1;
  }
  apply(t, e) {
    t.panel.register(this.name, this);
  }
  /** 挂载 */
  mount(t, e) {
    t.appendChild(this.$el), this.unmount(), this.onToggle = e == null ? void 0 : e.onToggle, this.onUnmount = e == null ? void 0 : e.onUnmount;
  }
  /** 卸载 */
  unmount() {
    var t;
    this.toggle(!1), (t = this.onUnmount) == null || t.call(this), this.onToggle = void 0, this.onUnmount = void 0;
  }
  /** 切换显示隐藏状态 */
  toggle(t) {
    var e;
    this.shown = t ?? !this.shown, (e = this.onToggle) == null || e.call(this, this.shown);
  }
}
class xr extends b {
  apply(t) {
    t.menu.register(this.name, this);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var St;
const wt = window, tt = wt.trustedTypes, Os = tt ? tt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ht = "$lit$", B = `lit$${(Math.random() + "").slice(9)}$`, oi = "?" + B, qi = `<${oi}>`, Z = document, lt = () => Z.createComment(""), ot = (i) => i === null || typeof i != "object" && typeof i != "function", hi = Array.isArray, Oi = (i) => hi(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Et = `[ 	
\f\r]`, it = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zs = /-->/g, Bs = />/g, j = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vs = /'/g, js = /"/g, ci = /^(?:script|style|textarea|title)$/i, zi = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), p = zi(1), ht = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), Ws = /* @__PURE__ */ new WeakMap(), U = Z.createTreeWalker(Z, 129, null, !1);
function di(i, t) {
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Os !== void 0 ? Os.createHTML(t) : t;
}
const Bi = (i, t) => {
  const e = i.length - 1, s = [];
  let n, a = t === 2 ? "<svg>" : "", l = it;
  for (let o = 0; o < e; o++) {
    const h = i[o];
    let c, u, f = -1, k = 0;
    for (; k < h.length && (l.lastIndex = k, u = l.exec(h), u !== null); )
      k = l.lastIndex, l === it ? u[1] === "!--" ? l = zs : u[1] !== void 0 ? l = Bs : u[2] !== void 0 ? (ci.test(u[2]) && (n = RegExp("</" + u[2], "g")), l = j) : u[3] !== void 0 && (l = j) : l === j ? u[0] === ">" ? (l = n ?? it, f = -1) : u[1] === void 0 ? f = -2 : (f = l.lastIndex - u[2].length, c = u[1], l = u[3] === void 0 ? j : u[3] === '"' ? js : Vs) : l === js || l === Vs ? l = j : l === zs || l === Bs ? l = it : (l = j, n = void 0);
    const A = l === j && i[o + 1].startsWith("/>") ? " " : "";
    a += l === it ? h + qi : f >= 0 ? (s.push(c), h.slice(0, f) + Ht + h.slice(f) + B + A) : h + B + (f === -2 ? (s.push(void 0), o) : A);
  }
  return [di(i, a + (i[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class ct {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let a = 0, l = 0;
    const o = t.length - 1, h = this.parts, [c, u] = Bi(t, e);
    if (this.el = ct.createElement(c, s), U.currentNode = this.el.content, e === 2) {
      const f = this.el.content, k = f.firstChild;
      k.remove(), f.append(...k.childNodes);
    }
    for (; (n = U.nextNode()) !== null && h.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const f = [];
          for (const k of n.getAttributeNames())
            if (k.endsWith(Ht) || k.startsWith(B)) {
              const A = u[l++];
              if (f.push(k), A !== void 0) {
                const L = n.getAttribute(A.toLowerCase() + Ht).split(B), v = /([.?@])?(.*)/.exec(A);
                h.push({ type: 1, index: a, name: v[2], strings: L, ctor: v[1] === "." ? ji : v[1] === "?" ? Ui : v[1] === "@" ? Ci : xt });
              } else
                h.push({ type: 6, index: a });
            }
          for (const k of f)
            n.removeAttribute(k);
        }
        if (ci.test(n.tagName)) {
          const f = n.textContent.split(B), k = f.length - 1;
          if (k > 0) {
            n.textContent = tt ? tt.emptyScript : "";
            for (let A = 0; A < k; A++)
              n.append(f[A], lt()), U.nextNode(), h.push({ type: 2, index: ++a });
            n.append(f[k], lt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === oi)
          h.push({ type: 2, index: a });
        else {
          let f = -1;
          for (; (f = n.data.indexOf(B, f + 1)) !== -1; )
            h.push({ type: 7, index: a }), f += B.length - 1;
        }
      a++;
    }
  }
  static createElement(t, e) {
    const s = Z.createElement("template");
    return s.innerHTML = t, s;
  }
}
function et(i, t, e = i, s) {
  var n, a, l, o;
  if (t === ht)
    return t;
  let h = s !== void 0 ? (n = e._$Co) === null || n === void 0 ? void 0 : n[s] : e._$Cl;
  const c = ot(t) ? void 0 : t._$litDirective$;
  return (h == null ? void 0 : h.constructor) !== c && ((a = h == null ? void 0 : h._$AO) === null || a === void 0 || a.call(h, !1), c === void 0 ? h = void 0 : (h = new c(i), h._$AT(i, e, s)), s !== void 0 ? ((l = (o = e)._$Co) !== null && l !== void 0 ? l : o._$Co = [])[s] = h : e._$Cl = h), h !== void 0 && (t = et(i, h._$AS(i, t.values), h, s)), t;
}
class Vi {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: s }, parts: n } = this._$AD, a = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : Z).importNode(s, !0);
    U.currentNode = a;
    let l = U.nextNode(), o = 0, h = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let u;
        c.type === 2 ? u = new vt(l, l.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(l, c.name, c.strings, this, t) : c.type === 6 && (u = new Xi(l, this, t)), this._$AV.push(u), c = n[++h];
      }
      o !== (c == null ? void 0 : c.index) && (l = U.nextNode(), o++);
    }
    return U.currentNode = Z, a;
  }
  v(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class vt {
  constructor(t, e, s, n) {
    var a;
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cp = (a = n == null ? void 0 : n.isConnected) === null || a === void 0 || a;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = et(this, t, e), ot(t) ? t === P || t == null || t === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : t !== this._$AH && t !== ht && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Oi(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== P && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.$(Z.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: s, _$litType$: n } = t, a = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ct.createElement(di(n.h, n.h[0]), this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === a)
      this._$AH.v(s);
    else {
      const l = new Vi(a, this), o = l.u(this.options);
      l.v(s), this.$(o), this._$AH = l;
    }
  }
  _$AC(t) {
    let e = Ws.get(t.strings);
    return e === void 0 && Ws.set(t.strings, e = new ct(t)), e;
  }
  T(t) {
    hi(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const a of t)
      n === e.length ? e.push(s = new vt(this.k(lt()), this.k(lt()), this, this.options)) : s = e[n], s._$AI(a), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class xt {
  constructor(t, e, s, n, a) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = P;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, n) {
    const a = this.strings;
    let l = !1;
    if (a === void 0)
      t = et(this, t, e, 0), l = !ot(t) || t !== this._$AH && t !== ht, l && (this._$AH = t);
    else {
      const o = t;
      let h, c;
      for (t = a[0], h = 0; h < a.length - 1; h++)
        c = et(this, o[s + h], e, h), c === ht && (c = this._$AH[h]), l || (l = !ot(c) || c !== this._$AH[h]), c === P ? t = P : t !== P && (t += (c ?? "") + a[h + 1]), this._$AH[h] = c;
    }
    l && !n && this.j(t);
  }
  j(t) {
    t === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ji extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === P ? void 0 : t;
  }
}
const Wi = tt ? tt.emptyScript : "";
class Ui extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== P ? this.element.setAttribute(this.name, Wi) : this.element.removeAttribute(this.name);
  }
}
class Ci extends xt {
  constructor(t, e, s, n, a) {
    super(t, e, s, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = et(this, t, e, 0)) !== null && s !== void 0 ? s : P) === ht)
      return;
    const n = this._$AH, a = t === P && n !== P || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, l = t !== P && (n === P || a);
    a && this.element.removeEventListener(this.name, this, n), l && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xi {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    et(this, t);
  }
}
const Us = wt.litHtmlPolyfillSupport;
Us == null || Us(ct, vt), ((St = wt.litHtmlVersions) !== null && St !== void 0 ? St : wt.litHtmlVersions = []).push("2.8.0");
const $ = (i, t, e) => {
  var s, n;
  const a = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let l = a._$litPart$;
  if (l === void 0) {
    const o = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    a._$litPart$ = l = new vt(t.insertBefore(lt(), o), o, void 0, e ?? {});
  }
  return l._$AI(i), l;
}, Yi = ({ divider: i }) => p` <div
    class="mpui-slider mpui-slider-horizontal"
    style="position: relative; width: 100%; height: 100%"
  >
    <div
      class="mpui-slider-track"
      style="
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    "
    >
      <div class="mpui-slider-bar" style="position: absolute; left: 0; height: 100%"></div>
      <div class="mpui-slider-thumb-track" style="height: 0px">
        <div
          class="mpui-slider-thumb"
          style="position: absolute; transform: translate(-50%, -50%)"
        ></div>
        ${i ? p`
              <div class="mpui-slider-divider">
                ${new Array(i).fill(p`<div class="mpui-slider-divider-dot"></div>`)}
              </div>
            ` : ""}
      </div>
    </div>
  </div>`;
class nt {
  constructor({
    container: t,
    min: e,
    max: s,
    step: n,
    divider: a = 0,
    value: l = 0,
    onChange: o,
    onDragStart: h,
    onDragEnd: c,
    onDrag: u
  }) {
    this.container = t, this.min = e, this.max = s, this.step = n || 0, this.divider = a ? typeof a == "boolean" ? this.step : a : 0, this.value = isNaN(l) ? l : Number(l), this.onChange = o, this.onDragStart = h, this.onDragEnd = c, this.onDrag = u, $(Yi({ divider: this.divider }), t), this.$el = this.container.querySelector(".mpui-slider"), this.$track = this.$el.querySelector(".mpui-slider-track"), this.$bar = this.$track.querySelector(".mpui-slider-bar"), this.$thumbTrack = this.$track.querySelector(".mpui-slider-thumb-track"), this.$thumb = this.$track.querySelector(".mpui-slider-thumb"), this.$el.addEventListener("mousedown", (f) => {
      var x;
      const k = f, { clientX: A } = k, L = this.$track.offsetWidth;
      let v = this.$thumbTrack.offsetWidth;
      v = v || L;
      const m = (L - v) / 2, d = this.$el.getBoundingClientRect().left;
      let g = A - d - m;
      g = g >= v ? v : g <= 0 ? 0 : g;
      const E = this.step ? Math.round(g / v * (this.max - this.min) / this.step) * this.step + this.min : g / v * (this.max - this.min) + this.min;
      (x = this.onDragStart) == null || x.call(this, E), this.value != E && this.drag(E);
      const w = (S) => {
        var st;
        const F = S, { clientX: y } = F;
        F.preventDefault(), F.stopPropagation();
        let H = y - d - m;
        H = H >= v ? v : H <= 0 ? 0 : H;
        const N = this.step ? Math.round(H / v * (this.max - this.min) / this.step) * this.step + this.min : H / v * (this.max - this.min) + this.min;
        this.value != N && this.drag(N), (st = window.getSelection()) == null || st.removeAllRanges();
      }, _ = (S) => {
        var y, H;
        S.stopPropagation(), (y = window.getSelection()) == null || y.removeAllRanges(), document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", _), (H = this.onDragEnd) == null || H.call(this, E);
      };
      document.addEventListener("mousemove", w), document.addEventListener("mouseup", _);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var s;
    this.value = t <= this.min ? this.min : t >= this.max ? this.max : t;
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.left = `${e * 100}%`, this.$bar.style.width = `${e * 100}%`, (s = this.onChange) == null || s.call(this, this.value);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const Ki = () => p`
  <div
    class="mpui-slider mpui-slider-vertical"
    style="position: relative; width: 100%; height: 100%"
  >
    <div
      class="mpui-slider-track"
      style="
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center
      "
    >
      <div class="mpui-slider-bar" style="position: absolute; bottom: 0; width: 100%"></div>
      <div class="mpui-slider-thumb-track" style="width: 0px">
        <div
          class="mpui-slider-thumb"
          style="position: absolute; transform: translate(-50%, -50%)"
        ></div>
      </div>
    </div>
  </div>
`;
class ui {
  constructor({
    container: t,
    min: e,
    max: s,
    step: n,
    value: a = 0,
    onChange: l,
    onDragStart: o,
    onDragEnd: h,
    onDrag: c
  }) {
    this.container = t, this.min = e, this.max = s, this.step = n || 0, this.value = isNaN(a) ? a : Number(a), this.onChange = l, this.onDragStart = o, this.onDragEnd = h, this.onDrag = c, $(Ki(), t), this.$el = this.container.querySelector(".mpui-slider"), this.$track = this.$el.querySelector(".mpui-slider-track"), this.$bar = this.$track.querySelector(".mpui-slider-bar"), this.$thumbTrack = this.$track.querySelector(".mpui-slider-thumb-track"), this.$thumb = this.$track.querySelector(".mpui-slider-thumb"), this.$el.addEventListener("mousedown", (u) => {
      var _;
      const f = u, { clientY: k } = f, A = this.$track.offsetHeight;
      let L = this.$thumbTrack.offsetHeight;
      L = L || A;
      const v = (A - L) / 2, m = this.$el.getBoundingClientRect().top;
      let d = L - (k - m - v);
      d = d >= L ? L : d <= 0 ? 0 : d;
      const g = this.step ? Math.round(d / L * (this.max - this.min) / this.step) * this.step + this.min : d / L * (this.max - this.min) + this.min;
      (_ = this.onDragStart) == null || _.call(this, g), this.value != g && this.drag(g);
      const E = (x) => {
        var N;
        const S = x, { clientY: F } = S;
        S.preventDefault(), S.stopPropagation();
        let y = L - (F - m - v);
        y = y >= L ? L : y <= 0 ? 0 : y;
        const H = this.step ? Math.round(y / L * (this.max - this.min) / this.step) * this.step + this.min : y / L * (this.max - this.min) + this.min;
        this.value != H && this.drag(H), (N = window.getSelection()) == null || N.removeAllRanges();
      }, w = (x) => {
        var F, y;
        x.stopPropagation(), (F = window.getSelection()) == null || F.removeAllRanges(), document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", w), (y = this.onDragEnd) == null || y.call(this, g);
      };
      document.addEventListener("mousemove", E), document.addEventListener("mouseup", w);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var s;
    this.value = Math.max(Math.min(t, this.max), this.min);
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.top = `${(1 - e) * 100}%`, this.$bar.style.height = `${Math.max(Math.min(e, 1), 0) * 100}%`, (s = this.onChange) == null || s.call(this, t);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const Gi = ({
  list: i,
  template: t
}) => p`
  <ul class="mpui-picker">
    ${i.map(
  (e, s) => p`
        <li class="mpui-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, s)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class Mt {
  constructor({ container: t, value: e, onChange: s, onPick: n, list: a, template: l, condition: o }) {
    this.container = t, this.list = a, this.value = e, this.onChange = s, this.onPick = n, this.template = l, this.condition = o, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    $(Gi({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(".mpui-picker"), this.$items = this.$el.querySelectorAll(".mpui-picker-item"), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.pick(e.getAttribute("data-value") || void 0);
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.$items.forEach((s, n) => {
      (this.condition ? this.condition(s.getAttribute("data-value"), t) : s.getAttribute("data-value") == t) ? s.classList.add("is-checked") : s.classList.remove("is-checked");
    }), this.value = t, (e = this.onChange) == null || e.call(this, t);
  }
  /** 点选一个选项 */
  pick(t) {
    var e;
    this.setValue(t), (e = this.onPick) == null || e.call(this, t);
  }
}
const Zi = ({
  list: i,
  template: t
}) => p`
  <ul class="mpui-picker">
    ${i.map(
  (e, s) => p`
        <li class="mpui-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, s)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class pi {
  /** 已选值 */
  get value() {
    return [...this.valueSet];
  }
  constructor({ container: t, value: e = [], list: s, onChange: n, onToggle: a }) {
    this.container = t, this.list = s, this.valueSet = new Set(e), this.onChange = n, this.onToggle = a, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    $(Zi({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(".mpui-picker"), this.$items = this.$el.querySelectorAll(".mpui-picker-item"), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.toggle(e.getAttribute("data-value"));
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.valueSet = new Set(t), this.$items.forEach((s, n) => {
      this.valueSet.has(s.getAttribute("data-value")) ? s.classList.add("is-checked") : s.classList.remove("is-checked");
    }), (e = this.onChange) == null || e.call(this, t);
  }
  /** 切换一个选项的选择状态 */
  toggle(t, e) {
    var n, a;
    const s = e ?? !this.valueSet.has(t);
    s ? this.valueSet.add(t) : this.valueSet.delete(t), this.$items.forEach((l, o) => {
      l.getAttribute("data-value") == t && l.classList.toggle("is-checked", s);
    }), (n = this.onChange) == null || n.call(this, this.value), (a = this.onToggle) == null || a.call(this, t, s);
  }
}
const Ji = ({ label: i }) => p` <div class="mpui-switch">${i}</div> `;
class Qi {
  constructor({ container: t, value: e = !1, onChange: s, onToggle: n }) {
    this.container = t, this.value = e, this.onChange = s, this.onToggle = n, $(Ji({ label: this.label }), this.container), this.$el = this.container.querySelector(".mpui-switch"), this.$el.addEventListener("click", () => {
      this.toggle(!this.value);
    }), this.setValue(this.value);
  }
  /** 设置开关状态 */
  setValue(t) {
    var e;
    this.value = t, this.$el.classList.toggle("is-checked", t), (e = this.onChange) == null || e.call(this, t);
  }
  /** 点按开关 */
  toggle(t = !this.value) {
    var e;
    this.setValue(t), (e = this.onToggle) == null || e.call(this, t);
  }
}
const tn = ({ label: i }) => p`
  <div class="mpui-checkbox">
    <div class="mpui-checkbox-icon"></div>
    <div class="mpui-checkbox-label">${i}</div>
  </div>
`;
class Re {
  constructor({ container: t, value: e = !1, onChange: s, onToggle: n, label: a }) {
    this.container = t, this.value = e, this.onChange = s, this.onToggle = n, this.label = a, $(tn({ label: this.label }), this.container), this.$el = this.container.querySelector(".mpui-checkbox"), this.$el.addEventListener("click", () => {
      this.toggle();
    }), this.setValue(this.value);
  }
  /** 设置开关状态 */
  setValue(t) {
    var e;
    this.value = t, this.$el.classList.toggle("is-checked", t), (e = this.onChange) == null || e.call(this, t);
  }
  /** 点按开关 */
  toggle(t = !this.value) {
    var e;
    this.setValue(t), (e = this.onToggle) == null || e.call(this, t);
  }
}
const kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Checkbox: Re,
  MultiPicker: pi,
  Picker: Mt,
  Slider: nt,
  SliderVertical: ui,
  Switch: Qi
}, Symbol.toStringTag, { value: "Module" }));
console.log(
  `
 %c mfunsPlayer v${at.version} ${at.gitHash} %c https://github.com/Mfuns-cn 

`,
  "color: #fff; background: #7b7ff7; padding:5px 0;",
  "background: #f5f5f5; padding:5px 0;"
);
class en {
  constructor({
    el: t,
    getData: e,
    itemHeight: s,
    createItem: n,
    overflow: a = 0
  }) {
    this.data = [], this.scrollTop = 0, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.$el = t, this.getData = e, this.itemHeight = s, this.createItem = n, this.overflow = a, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.$el.classList.add("vlist-container"), this.$content = document.createElement("div"), this.$content.classList.add("vlist-content"), this.$el.appendChild(this.$content), this.$el.addEventListener("scroll", () => {
      this.cleared || this.handleScroll();
    }), this.reload();
  }
  /** 重载列表 */
  reload() {
    this.clear(), this.data = this.getData(), console.log(this.data), this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.handleScroll(), this.cleared = !1;
  }
  /** 更新列表 */
  update() {
    this.data = this.getData(), this.handleScroll();
  }
  handleScroll() {
    if (!this.throttle) {
      const t = this.$el.clientHeight, e = this.$el.scrollTop;
      t && (this.scrollTop = e), this.viewStart = this.getViewStart(e), this.viewEnd = this.getViewEnd(e, t), (this.viewStart <= this.renderStart || this.viewEnd >= this.renderEnd) && this.render(t, e);
    }
  }
  render(t, e) {
    const s = this.renderStart, n = this.renderEnd;
    if (this.renderStart = this.getViewStart(e) - this.overflow, this.renderEnd = this.getViewEnd(e, t) + this.overflow, this.renderStart < s) {
      const a = document.createDocumentFragment(), l = Math.max(this.renderStart, 0), o = Math.min(s - 1, this.renderEnd, this.data.length - 1);
      for (let h = l; h <= o; h++)
        a.appendChild(this.createItem(this.data[h], h, this.data));
      this.$content.insertBefore(a, this.$content.firstElementChild);
    } else {
      const a = Math.max(s, 0), l = Math.min(this.renderStart - 1, n);
      for (let o = a; o <= l; o++) {
        const h = this.$content.firstElementChild;
        h && this.$content.removeChild(h);
      }
    }
    if (this.renderEnd > n) {
      const a = document.createDocumentFragment(), l = Math.max(n + 1, this.renderStart), o = Math.min(this.renderEnd, this.data.length - 1);
      for (let h = l; h <= o; h++)
        a.appendChild(this.createItem(this.data[h], h, this.data));
      this.$content.appendChild(a);
    } else {
      const a = Math.min(n, this.data.length - 1), l = Math.max(this.renderEnd + 1, s);
      for (let o = a; o >= l; o--) {
        const h = this.$content.lastElementChild;
        h && this.$content.removeChild(h);
      }
    }
    this.$content.style.paddingTop = `${this.renderStart > 0 ? this.renderStart * this.itemHeight : 0}px`, this.$content.style.paddingBottom = `${this.renderEnd < this.data.length - 1 ? (this.data.length - this.renderEnd - 1) * this.itemHeight : 0}px`;
  }
  getViewStart(t) {
    return Math.floor(t / this.itemHeight);
  }
  getViewEnd(t, e) {
    return Math.ceil((t + e) / this.itemHeight) - 1;
  }
  // 清空列表
  clear() {
    this.data = [], this.$content.innerHTML = "", this.$content.style.paddingTop = "0px", this.$content.style.paddingBottom = "0px", this.cleared = !0;
  }
  locateStart(t) {
    this.scrollTo(t * this.itemHeight);
  }
  locateEnd(t) {
    this.scrollTo(t * this.itemHeight - this.$el.clientHeight);
  }
  scrollTo(t) {
    this.$el.scrollTo({
      top: t,
      behavior: "auto"
    });
  }
}
const sn = (i) => p`
  <div class="${r}-danmakulist">
    <div class="${r}-danmakulist-main">
      <div class="${r}-danmakulist-head">
        <div class="list-column col-time">时间</div>
        <div class="list-column col-content">弹幕内容</div>
        <div class="list-column col-date">发送时间</div>
      </div>
      <div class="${r}-danmakulist-select">
        <div class="${r}-danmakulist-select-info"></div>
        <div class="${r}-danmakulist-select-operate">
          <div class="list-operate-btn" @click=${i}>取消选择</div>
        </div>
      </div>
      <div class="${r}-danmakulist-container"></div>
      <div class="${r}-danmakulist-status">
        <div class="status-loading-text">弹幕列表装填中……</div>
        <div class="status-failed-text">弹幕加载失败 X_X</div>
        <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
      </div>
    </div>
    <div class="${r}-danmakulist-foot">
      <div class="${r}-danmakulist-foot-left">
        <span class="${r}-danmakulist-autoscroll">列表滚动[关]</span>
      </div>
      <div class="${r}-danmakulist-foot-right"></div>
    </div>
  </div>
`, nn = (i, t, {
  operation: e,
  onClick: s,
  onDblclick: n,
  selected: a,
  focused: l,
  title: o
}) => {
  const h = p`
    <div
      class="${`list-row ${a(i) ? "is-selected" : ""} ${l(i) ? "is-focused" : ""}`.trim()}"
      data-index="${t}"
      data-mode="${i.mode}"
      @dblclick=${(u) => {
    n(u, i);
  }}
      @click=${(u) => {
    s(u, i);
  }}
      title="${o(i)}"
    >
      <div class="list-cell col-time">${pt(i.time)}</div>
      <div class="list-cell col-content">${i.content}</div>
      <div class="list-cell col-date">
        ${i.date ? De(new Date(i.date * 1e3), "yy-MM-dd HH:mm") : "-"}
      </div>
      ${e.length ? p`<div class="list-operate" title="">
            ${e(i).map(
    ([u, f]) => p`<div
                  class="list-operate-btn"
                  @click=${(k) => {
      k.stopPropagation(), f(i);
    }}
                >
                  ${u}
                </div>`
  )}
          </div>` : ""}
    </div>
  `, c = new DocumentFragment();
  return $(h, c), c.firstElementChild;
}, Ie = class Ie extends mt {
  constructor(t) {
    const e = new DocumentFragment();
    $(
      sn(() => this.select([])),
      e
    ), super(t, e.querySelector(`.${r}-danmakulist`)), this.name = "danmakuList", this.title = "弹幕列表", this.data = [], this.selected = [], this.focused = null, this.sortedBy = "time", this.sortOrder = -1, this.autoScroll = !0, this.frozen = !1, this.player = t, this.danmaku = t.plugin.danmaku, this.$main = this.$(`.${r}-danmakulist-main`), this.$container = this.$(`.${r}-danmakulist-container`), this.$status = this.$(`.${r}-danmakulist-status`), this.$colTime = this.$(".col-time"), this.$colDate = this.$(".col-date"), this.$colContent = this.$(".col-content"), this.$autoscroll = this.$(`.${r}-danmakulist-autoscroll`), this.$select = this.$(`.${r}-danmakulist-select`), this.$selectInfo = this.$(`.${r}-danmakulist-select-info`), this.$colTime.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "time" ? this.sort("time", -this.sortOrder) : this.sort("time", 1);
    }, this.$colDate.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "date" ? this.sort("date", -this.sortOrder) : this.sort("date", 1);
    }, this.$colContent.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "content" ? this.sort("content", -this.sortOrder) : this.sort("content", 1);
    }, this.$autoscroll.onclick = () => {
      this.setAutoScroll(!this.autoScroll);
    }, this.player.on("danmakuList:autoScrollChange", (s) => {
      s ? this.$autoscroll.innerText = "列表滚动[开]" : this.$autoscroll.innerText = "列表滚动[关]";
    }), this.autoScroll && this.player.emit("danmakuList:autoScrollChange", !0), this.player.on("danmakuList:select", (s) => {
      const n = s.length;
      this.$selectInfo.innerText = n ? `已选择${n}条弹幕` : "", this.$select.classList.toggle("is-show", n > 1);
    });
  }
  mount(t, e) {
    var n;
    super.mount(t, e);
    const s = (n = this.list) == null ? void 0 : n.scrollTop;
    console.log("mountpos: " + s), requestAnimationFrame(() => {
      var a;
      s != null && ((a = this.list) == null || a.scrollTo(s)), -this.autoScroll && this.locateByTime(this.player.currentTime);
    });
  }
  toggle(t) {
    var e, s;
    if (super.toggle(t), this.shown) {
      const n = (e = this.list) == null ? void 0 : e.scrollTop;
      n != null && ((s = this.list) == null || s.scrollTo(n)), this.autoScroll && this.locateByTime(this.player.currentTime);
    }
  }
  init() {
    var n;
    const t = (n = this.plugin.danmaku) == null ? void 0 : n.invoke, e = this.plugin.danmakuOperate;
    this.list = new en({
      el: this.$container,
      getData: () => this.data,
      itemHeight: 24,
      createItem: (a, l) => nn(a, l, {
        operation: (o) => {
          const h = this.player.userId && o.user == this.player.userId;
          return [
            [
              "举报",
              (c) => {
                e == null || e.report(c);
              },
              !h && (t == null ? void 0 : t.report)
            ],
            [
              "屏蔽",
              (c) => {
                e == null || e.blockUser(c.user, !0);
              },
              !h && (t == null ? void 0 : t.blockUser)
            ],
            [
              "撤回",
              (c) => {
                e == null || e.recall(c);
              },
              h && (t == null ? void 0 : t.recall)
            ]
          ].filter((c) => c[2]);
        },
        onClick: (o, h) => {
          this.clickSelect(h, o.shiftKey, o.ctrlKey);
        },
        onDblclick: (o, h) => {
          this.player.seek(h.time);
        },
        selected: (o) => this.selected.includes(o),
        focused: (o) => this.focused == o,
        title: (o) => `${o.content}
${a.date ? De(new Date(a.date * 1e3), "yyyy-MM-dd HH:mm:ss") : "-"} @ ${pt(a.time, 16)}`
      }),
      overflow: 5
    });
    const s = Me(() => {
      this.frozen = !1;
    }, 5e3);
    this.list.$el.addEventListener("wheel", () => {
      this.frozen = !0, s();
    }), this.list.$el.addEventListener("mousedown", () => {
      this.frozen = !0, s();
    }), this.$main.addEventListener("mouseleave", () => {
      this.frozen = !1;
    }), this.player.on("videoChange", () => {
      this.clear();
    }), this.player.on("danmaku:add", (a) => {
      this.fill(a), this.autoScroll && this.sort("time");
    }), this.player.on("timeupdate", (a) => {
      this.autoScroll && !this.frozen && this.locateByTime(a);
    }), this.player.on("danmaku:select", (a) => {
      this.locateByDanmaku(a), this.select([a]);
    });
  }
  /** 弹幕列表排序 */
  sort(t, e = 1) {
    this.sortedBy = t, this.sortOrder = e, this.data.sort((s, n) => {
      const a = s[this.sortedBy], l = n[this.sortedBy];
      return a > l ? e : a == l ? 0 : -e;
    }), this.list.reload();
  }
  /** 装填弹幕(重载列表) */
  fill(t) {
    this.data = this.data.concat(t), this.data.length ? (this.reload(), this.setStatus()) : this.setStatus("empty");
  }
  /** 添加弹幕(不重载列表) */
  add(t) {
    this.data = this.data.concat(t), this.data.length ? (this.list.update(), this.setStatus()) : this.setStatus("empty");
  }
  /** 重载弹幕列表 */
  reload() {
    this.sort(this.sortedBy, this.sortOrder), this.autoScroll && this.locateByTime(this.player.currentTime);
  }
  clear() {
    this.list.clear(), this.data = [], this.setStatus("loading");
  }
  setStatus(t = "") {
    this.$status.dataset.status = t, console.log("弹幕加载状态" + t);
  }
  /** 根据播放时间定位 */
  locateByTime(t) {
    var s, n;
    let e = this.list.viewEnd;
    for (((s = this.data[e]) == null ? void 0 : s.time) > t && (e = 0); ((n = this.data[e + 1]) == null ? void 0 : n.time) <= t; )
      e++;
    this.list.locateEnd(e);
  }
  /** 定位弹幕 */
  locateByDanmaku(t) {
    const e = this.data.indexOf(t);
    e > -1 && (this.list.locateStart(e), this.frozen = !0);
  }
  setAutoScroll(t) {
    this.player.emit("danmakuList:autoScrollChange", t), this.autoScroll = t, t && (this.frozen = !1, this.sort("time"), this.locateByTime(this.player.currentTime), this.list.handleScroll());
  }
  /** 设置选定状态 */
  select(t, e) {
    this.selected = t;
    const s = [];
    this.focused = e || (t.length == 1 ? t[0] : null);
    const n = this.data.indexOf(this.focused);
    t.forEach((a) => {
      const l = this.data.indexOf(a);
      s.push(l);
    });
    for (const a of this.list.$content.children)
      a.classList.toggle(
        "is-selected",
        s.includes(Number(a.dataset.index))
      ), a.classList.toggle(
        "is-focused",
        n == Number(a.dataset.index)
      );
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 设置某条弹幕的选定状态，若选定则聚焦弹幕，否则取消聚焦 */
  toggleSelect(t, e) {
    const s = this.list.$content.querySelector(
      `[data-index="${this.data.indexOf(this.focused)}"]`
    ), n = this.list.$content.querySelector(`[data-index="${this.data.indexOf(t)}"]`);
    if (e)
      this.selected.includes(t) || this.selected.push(t), this.focused = t, n == null || n.classList.add("is-selected"), n == null || n.classList.add("is-focused");
    else if (!e) {
      const a = this.selected.indexOf(t);
      a > -1 && this.selected.splice(a, 1), n == null || n.classList.remove("is-selected"), s == null || s.classList.remove("is-focused");
    }
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 单击选定弹幕 */
  clickSelect(t, e, s) {
    if (e)
      if (this.focused) {
        const n = this.data.indexOf(t), a = this.data.indexOf(this.focused);
        if (n == -1 || a == -1)
          this.select([t]);
        else {
          const l = n < a ? n : a, o = (n < a ? a : n) + 1;
          this.select(this.data.slice(l, o), this.focused);
        }
      } else
        this.select([t]);
    else
      s ? this.toggleSelect(t, !this.selected.includes(t)) : this.selected.length == 1 && this.selected[0] == t ? this.select([]) : this.select([t]);
  }
};
Ie.pluginName = "danmakuList";
let Dt = Ie;
const rn = (i) => p`
  <div class="${r}-hotkeys">
    <div class="${r}-hotkeys-list">
      ${i.map(
  ({ key: t, description: e }) => p`
          <div class="${r}-hotkeys-list-item">
            <div class="${r}-hotkeys-list-key">${t}</div>
            <div class="${r}-hotkeys-list-description">${e}</div>
          </div>
        `
)}
    </div>
  </div>
`, qe = class qe extends mt {
  constructor(t) {
    const e = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" }
    ], s = new DocumentFragment();
    $(rn(e), s), super(t, s.querySelector(`.${r}-hotkeys`)), this.name = "hotkeyInfo", this.title = "快捷键说明";
  }
};
qe.pluginName = "hotkeyInfo";
let Pt = qe;
const an = () => p`
  <div class="${r}-about">
    <div class="${r}-about-logo"></div>
    <div class="${r}-about-version">version ${at.version}-${at.gitHash}</div>
    <div>github：<a href="${Ai}" target="_blank">mfuns-cn/mfunsPlayer</a></div>
    <div>开发者：</div>
    <ul class="${r}-about-developers">
      ${_i.map(
  ({ name: i, link: t }) => p`
          <li>
            <a href="${t}" target="_blank">${i}</a>
          </li>
        `
)}
      <li></li>
    </ul>
  </div>
`, Oe = class Oe extends mt {
  constructor(t) {
    const e = new DocumentFragment();
    $(an(), e), super(t, e.querySelector(`.${r}-about`)), this.name = "about", this.title = "关于";
  }
};
Oe.pluginName = "about";
let Rt = Oe;
const ln = () => p`
  <div class="${r}-contextmenu">
    <ul class="${r}-contextmenu-list mpui-black"></ul>
  </div>
`, ze = class ze extends b {
  constructor(t) {
    super(t), this.list = [], this.isShow = !1, this.player = t, this.container = T("div", { class: `${r}-contextmenu-wrap` }), $(ln(), this.container), this.$el = this.container.querySelector(`.${r}-contextmenu`), this.$list = this.$el.querySelector(`.${r}-contextmenu-list`), this.player.$main.appendChild(this.container);
  }
  apply(t, e) {
    var s;
    this.list = ((s = e.contextMenu) == null ? void 0 : s.list) || [];
  }
  setMenu(t) {
    this.$list.innerHTML = "";
    const e = new DocumentFragment();
    t.forEach((s) => {
      const n = T("li", { class: `${r}-contextmenu-item` });
      s.onClick && (n.onclick = () => {
        var l;
        (l = s.onClick) == null || l.call(s, this.player);
      });
      let a;
      typeof s.content == "function" ? a = s.content(this.player) : a = s.content, typeof a == "object" ? n.appendChild(a) : n.innerText = a, e.appendChild(n);
    }), this.$list.appendChild(e);
  }
  init() {
    this.player.$area.addEventListener("contextmenu", (t) => {
      t.preventDefault();
      const e = this.player.$area.getBoundingClientRect(), s = t.clientX - e.left, n = t.clientY - e.top;
      this.show(s, n);
    }), this.container.addEventListener("contextmenu", (t) => {
      t.preventDefault();
      const e = this.container.getBoundingClientRect(), s = t.clientX - e.left, n = t.clientY - e.top;
      this.show(s, n);
    }), document.addEventListener("click", () => {
      this.isShow && this.hide();
    });
  }
  show(t, e) {
    this.container.classList.add("is-show");
    const s = this.player.$area.getBoundingClientRect();
    t + this.$el.offsetWidth >= s.width ? (this.$el.style.right = s.width - t + "px", this.$el.style.left = "initial") : (this.$el.style.left = t + "px", this.$el.style.right = "initial"), e + this.$el.offsetHeight >= s.height ? (this.$el.style.bottom = s.height - e + "px", this.$el.style.top = "initial") : (this.$el.style.top = e + "px", this.$el.style.bottom = "initial"), this.isShow = !0, this.player.emit("contextMenuShow", t, e);
  }
  hide() {
    this.container.classList.remove("is-show"), this.isShow = !1, this.player.emit("contextMenuHide");
  }
};
ze.pluginName = "contextMenu";
let Nt = ze;
const on = () => p`
  <div class="${r}-controller-mask"></div>
  <div class="${r}-controller mpui-black">
    <div class="${r}-controller-top"></div>
    <div class="${r}-controller-content">
      <div class="${r}-controller-left"></div>
      <div class="${r}-controller-center"></div>
      <div class="${r}-controller-right"></div>
    </div>
  </div>
`, Be = class Be extends b {
  constructor(t) {
    super(t), this.isHover = !1, this.controls = {}, this.player = t, this.container = document.createElement("div"), this.container.className = `${r}-controller-wrap`;
    const e = new DocumentFragment();
    $(on(), e), this.$el = e.querySelector(`.${r}-controller`), this.$top = this.$el.querySelector(`.${r}-controller-top`), this.$content = this.$el.querySelector(`.${r}-controller-content`), this.$left = this.$el.querySelector(`.${r}-controller-left`), this.$center = this.$el.querySelector(`.${r}-controller-center`), this.$right = this.$el.querySelector(`.${r}-controller-right`), this.player.$main.append(this.container), this.inactiveHook = () => !this.isHover && void 0, this.mouseEnterHandler = () => {
      this.isHover = !0;
    }, this.mouseLeaveHandler = () => {
      this.isHover = !1;
    }, this.container.appendChild(e);
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook), this.container.addEventListener("mouseenter", this.mouseEnterHandler), this.container.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  apply(t, e) {
    var s;
    this.controls = ((s = e.controller) == null ? void 0 : s.controls) || {};
  }
  ready() {
    this.setControls(this.controls);
  }
  /** 更新控制组件 */
  setControls(t) {
    const { left: e, center: s, right: n, top: a } = t;
    this.build(this.$left, e), this.build(this.$center, s), this.build(this.$right, n), this.build(this.$top, a);
  }
  build(t, e) {
    t.innerHTML = "";
    const s = new DocumentFragment();
    e == null || e.forEach((n) => {
      var l;
      const a = (l = this.player.controls.get(n)) == null ? void 0 : l.$el;
      a && s.appendChild(a);
    }), t.appendChild(s);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook), this.container.removeEventListener("mouseenter", this.mouseEnterHandler), this.container.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
};
Be.pluginName = "controller";
let It = Be;
const hn = p`
  <div class="${r}-controls-button ${r}-button-play is-paused">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-play"></i>
      <i class="mpicon-pause"></i>
    </div>
    <div class="mpui-tooltip">播放</div>
  </div>
`, Ve = class Ve extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(hn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "play", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("pause", () => {
      this._change(!1);
    }), this.player.on("play", () => {
      this._change(!0);
    }), this.player.on("videoChange", () => {
      this._change(!1);
    }), this.$icon.addEventListener("click", () => {
      this.player.paused ? this.player.play() : this.player.pause();
    });
  }
  /** 设置按钮状态 */
  _change(t) {
    this.$el.classList.toggle("is-on", t), this.$tooltip.innerText = t ? "暂停" : "播放";
  }
};
Ve.pluginName = "buttonPlay";
let qt = Ve;
const cn = p`
  <div class="${r}-controls-button ${r}-button-prev is-autohide is-disabled">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-prev"></i>
    </div>
    <div class="mpui-tooltip">上一P</div>
  </div>
`, je = class je extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(cn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "prev", this.singleHide = !0, this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  apply(t, e) {
    var s;
    super.apply(t, e), this.singleHide = ((s = e.switchButton) == null ? void 0 : s.singleHide) ?? !0;
  }
  init() {
    this.$icon.addEventListener("click", () => {
      this.player.prev();
    }), this.player.on("videoChange", (t) => {
      const { hasNext: e, hasPrev: s } = t;
      this.setDisabled(!s), this.$el.classList.toggle("is-hidden", this.singleHide && !s && !e);
    });
  }
  setDisabled(t) {
    this.$el.classList.toggle("is-disabled", t);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(t) {
    this.$el.classList.toggle("is-autohide", t);
  }
  get disabled() {
    return this.$el.classList.contains("is-disabled");
  }
};
je.pluginName = "buttonPrev";
let Ot = je;
const dn = p`
  <div class="${r}-controls-button ${r}-button-next is-autohide is-disabled">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-next"></i>
    </div>
    <div class="mpui-tooltip">下一P</div>
  </div>
`, We = class We extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(dn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "next", this.singleHide = !0, this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  apply(t, e) {
    var s;
    super.apply(t, e), this.singleHide = ((s = e.switchButton) == null ? void 0 : s.singleHide) ?? !0;
  }
  init(t) {
    this.$icon.addEventListener("click", () => {
      this.player.next();
    }), this.player.on("videoChange", (e) => {
      const { hasNext: s, hasPrev: n } = e;
      this.setDisabled(!s), this.$el.classList.toggle("is-hidden", this.singleHide && !n && !s);
    });
  }
  setDisabled(t) {
    this.$el.classList.toggle("is-disabled", t);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(t) {
    this.$el.classList.toggle("is-autohide", t);
  }
  get disabled() {
    return this.$el.classList.contains("is-disabled");
  }
};
We.pluginName = "buttonNext";
let zt = We;
const un = p`
  <div class="${r}-videotime">
    <div class="${r}-videotime-label">
      <span class="${r}-videotime-current">00:00</span>
      <span class="${r}-videotime-divider">/</span>
      <span class="${r}-videotime-total">00:00</span>
    </div>
    <input class="${r}-videotime-input mpui-input" />
  </div>
`, Ue = class Ue extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(un, e), super(t, e.querySelector(`.${r}-videotime`)), this.name = "time", this.valueBeforeEdited = "", this.timeFormat = 2, this.$label = this.$(`.${r}-videotime-label`), this.$current = this.$(`.${r}-videotime-current`), this.$total = this.$(`.${r}-videotime-total`), this.$input = this.$(`.${r}-videotime-input`);
  }
  init() {
    this.player.on("timeupdate", (t) => {
      this.$current.innerText = this.format(t);
    }), this.player.on("seeking", (t) => {
      this.$current.innerText = this.format(t);
    }), this.player.on("durationchange", (t) => {
      this.timeFormat = t > 3600 ? 4 : 2, this.$total.innerText = this.format(t);
    }), this.$label.addEventListener("click", () => {
      this.$el.classList.add("is-input"), this.$input.value = this.format(this.player.currentTime), this.valueBeforeEdited = this.$input.value, this.$input.focus();
    }), this.$input.addEventListener("blur", () => {
      const t = this.$input.value;
      t != this.valueBeforeEdited && (this.player.seek(Ft(t)), this.player.play()), this.exitInput();
    }), this.$input.addEventListener("keydown", (t) => {
      const e = t || window.event;
      e.keyCode == 13 && (this.player.seek(Ft(this.$input.value)), this.player.play(), this.exitInput()), e.keyCode == 27 && this.exitInput();
    });
  }
  /** 退出输入模式 */
  exitInput() {
    this.$el.classList.remove("is-input"), this.$input.value = "", this.valueBeforeEdited = "";
  }
  /** 格式化时间 */
  format(t) {
    return pt(t, this.timeFormat);
  }
};
Ue.pluginName = "videoTime";
let Bt = Ue;
const pn = p`
  <div class="${r}-controls-button ${r}-button-loop">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-loop-off"></i>
      <i class="mpicon-loop"></i>
    </div>
    <div class="mpui-tooltip">洗脑循环</div>
  </div>
`, Ce = class Ce extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(pn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "loop", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("loopChange", (t) => {
      this.$el.classList.toggle("is-on", t), this.$tooltip.innerText = t ? "关闭洗脑循环" : "洗脑循环";
    }), this.$icon.addEventListener("click", () => {
      this.player.loop ? this.player.setLoop(!1) : this.player.setLoop(!0);
    });
  }
};
Ce.pluginName = "buttonLoop";
let Vt = Ce;
const mn = p`
  <div class="${r}-controls-button ${r}-button-part">
    <div class="${r}-controls-button-icon">
      <div class="${r}-controls-button-text">P0</div>
    </div>
    <div class="mpui-tooltip">分P列表</div>
  </div>
`, Xe = class Xe extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(mn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "part", this.$icon = this.$(`.${r}-controls-button-icon`), this.$text = this.$(`.${r}-controls-button-text`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.$icon.addEventListener("click", () => {
      var t;
      (t = this.plugin.partList) == null || t.toggle();
    }), this.player.on("videoChange", (t) => {
      var e;
      this.$text.innerText = `P${t.part}`, this.$el.classList.toggle("is-show", (((e = t.list) == null ? void 0 : e.length) || 1) > 1);
    });
  }
};
Xe.pluginName = "buttonPart";
let jt = Xe;
const vn = p`
  <div class="${r}-controls-button ${r}-button-volume">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-volume"></i>
      <i class="mpicon-volume-off"></i>
    </div>

    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel">
        <div class="${r}-button-volume-value">0</div>
        <div class="${r}-button-volume-slider"></div>
      </div>
    </div>
  </div>
`, Ye = class Ye extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(vn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "volume", this.$icon = this.$(`.${r}-controls-button-icon`), this.$slider = this.$(`.${r}-button-volume-slider`), this.$value = this.$(`.${r}-button-volume-value`);
  }
  init() {
    this.slider = new ui({
      container: this.$slider,
      min: 0,
      max: 100,
      step: 1,
      value: this.player.volume * 100,
      onChange: (t) => {
        this.$value.innerText = t.toString();
      },
      onDrag: (t) => {
        this.player.setVolume(t / 100);
      },
      onDragStart: (t) => {
        this.player.muted && t != 0 && this.player.setMuted(!1), this.$el.classList.add("is-control"), this.player.isControlled = !0;
      },
      onDragEnd: () => {
        this.$el.classList.remove("is-control"), this.player.isControlled = !1;
      }
    }), this.player.on("volumechange", (t, e) => {
      e ? (this.$el.classList.add("is-muted"), this.slider.setValue(0)) : (this.$el.classList.remove("is-muted"), this.slider.setValue(Math.round(t * 100))), t == 0 && this.$el.classList.add("is-muted");
    }), this.$icon.addEventListener("click", () => {
      this.player.muted || this.player.volume == 0 ? (this.player.volume == 0 && this.player.setVolume(0.1), this.player.setMuted(!0)) : this.player.setMuted(!1);
    });
  }
};
Ye.pluginName = "buttonVolume";
let Wt = Ye;
const gn = p`
  <div class="${r}-controls-button ${r}-button-settings">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-settings"></i>
    </div>
    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel"></div>
    </div>
  </div>
`, Ke = class Ke extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(gn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "settings", this.$icon = this.$(`.${r}-controls-button-icon`), this.$panel = this.$(`.${r}-controls-panel`);
  }
  ready() {
    const t = this.player.panel.get("settings");
    t == null || t.mount(this.$panel);
  }
};
Ke.pluginName = "buttonSettings";
let Ut = Ke;
const $n = p`
  <div class="${r}-controls-button ${r}-button-pip">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-pip"></i>
      <i class="mpicon-pip-exit"></i>
    </div>
    <div class="mpui-tooltip">画中画</div>
  </div>
`, Ge = class Ge extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $($n, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "pip", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("enterpictureinpicture", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出画中画";
    }), this.player.on("leavepictureinpicture", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "画中画";
    }), this.$icon.addEventListener("click", () => {
      var t, e, s, n;
      this.player.isPip ? (e = (t = this.player).exitPip) == null || e.call(t) : (n = (s = this.player).enterPip) == null || n.call(s);
    });
  }
  get ignored() {
    return !this.player.enterPip || !ai;
  }
};
Ge.pluginName = "buttonPip";
let Ct = Ge;
const fn = p`
  <div class="${r}-controls-button ${r}-button-widescreen">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-widescreen"></i>
      <i class="mpicon-widescreen-exit"></i>
    </div>
    <div class="mpui-tooltip">宽屏模式</div>
  </div>
`, Ze = class Ze extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(fn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "widescreen", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("widescreenEnter", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出宽屏模式";
    }), this.player.on("widescreenExit", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "宽屏模式";
    }), this.$icon.addEventListener("click", () => {
      var t, e, s, n;
      this.player.isWidescreen ? (e = (t = this.player).enterWidescreen) == null || e.call(t) : (n = (s = this.player).exitWidescreen) == null || n.call(s);
    });
  }
  get ignored() {
    return !this.player.enterWidescreen;
  }
};
Ze.pluginName = "buttonWidescreen";
let Cs = Ze;
const yn = p`
  <div class="${r}-controls-button ${r}-button-webscreen">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-webscreen"></i>
      <i class="mpicon-webscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">网页全屏</div>
  </div>
`, Je = class Je extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(yn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "webscreen", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("webscreenEnter", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出网页全屏";
    }), this.player.on("webscreenExit", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "网页全屏";
    }), this.$icon.addEventListener("click", () => {
      var t, e, s, n;
      this.player.isWebscreen ? (n = (s = this.player).exitWebscreen) == null || n.call(s) : (e = (t = this.player).enterWebscreen) == null || e.call(t);
    });
  }
  get ignored() {
    return !this.player.enterWebscreen;
  }
};
Je.pluginName = "buttonWebscreen";
let Xs = Je;
const bn = p`
  <div class="${r}-controls-button ${r}-button-fullscreen">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-fullscreen"></i>
      <i class="mpicon-fullscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">进入全屏</div>
  </div>
`, Qe = class Qe extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(bn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "fullscreen", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("fullscreenEnter", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出全屏";
    }), this.player.on("fullscreenExit", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "进入全屏";
    }), this.$icon.addEventListener("click", () => {
      var t, e, s, n;
      this.player.isFullscreen ? (n = (s = this.player).exitFullscreen) == null || n.call(s) : (e = (t = this.player).enterFullscreen) == null || e.call(t);
    });
  }
  get ignored() {
    return !this.player.enterFullscreen || !ri;
  }
};
Qe.pluginName = "buttonFullscreen";
let Xt = Qe;
var W = /* @__PURE__ */ ((i) => (i[i.Backspace = 8] = "Backspace", i[i.Tab = 9] = "Tab", i[i.Enter = 13] = "Enter", i[i.Shift = 16] = "Shift", i[i.Ctrl = 17] = "Ctrl", i[i.Alt = 18] = "Alt", i[i.PauseBreak = 19] = "PauseBreak", i[i.CapsLock = 20] = "CapsLock", i[i.Escape = 27] = "Escape", i[i.Space = 32] = "Space", i[i.PageUp = 33] = "PageUp", i[i.PageDown = 34] = "PageDown", i[i.End = 35] = "End", i[i.Home = 36] = "Home", i[i.LeftArrow = 37] = "LeftArrow", i[i.UpArrow = 38] = "UpArrow", i[i.RightArrow = 39] = "RightArrow", i[i.DownArrow = 40] = "DownArrow", i[i.Insert = 45] = "Insert", i[i.Delete = 46] = "Delete", i[i.Zero = 48] = "Zero", i[
  i.ClosedParen = 48
  /* Zero */
] = "ClosedParen", i[i.One = 49] = "One", i[
  i.ExclamationMark = 49
  /* One */
] = "ExclamationMark", i[i.Two = 50] = "Two", i[
  i.AtSign = 50
  /* Two */
] = "AtSign", i[i.Three = 51] = "Three", i[
  i.PoundSign = 51
  /* Three */
] = "PoundSign", i[
  i.Hash = 51
  /* PoundSign */
] = "Hash", i[i.Four = 52] = "Four", i[
  i.DollarSign = 52
  /* Four */
] = "DollarSign", i[i.Five = 53] = "Five", i[
  i.PercentSign = 53
  /* Five */
] = "PercentSign", i[i.Six = 54] = "Six", i[
  i.Caret = 54
  /* Six */
] = "Caret", i[
  i.Hat = 54
  /* Caret */
] = "Hat", i[i.Seven = 55] = "Seven", i[
  i.Ampersand = 55
  /* Seven */
] = "Ampersand", i[i.Eight = 56] = "Eight", i[
  i.Star = 56
  /* Eight */
] = "Star", i[
  i.Asterik = 56
  /* Star */
] = "Asterik", i[i.Nine = 57] = "Nine", i[
  i.OpenParen = 57
  /* Nine */
] = "OpenParen", i[i.A = 65] = "A", i[i.B = 66] = "B", i[i.C = 67] = "C", i[i.D = 68] = "D", i[i.E = 69] = "E", i[i.F = 70] = "F", i[i.G = 71] = "G", i[i.H = 72] = "H", i[i.I = 73] = "I", i[i.J = 74] = "J", i[i.K = 75] = "K", i[i.L = 76] = "L", i[i.M = 77] = "M", i[i.N = 78] = "N", i[i.O = 79] = "O", i[i.P = 80] = "P", i[i.Q = 81] = "Q", i[i.R = 82] = "R", i[i.S = 83] = "S", i[i.T = 84] = "T", i[i.U = 85] = "U", i[i.V = 86] = "V", i[i.W = 87] = "W", i[i.X = 88] = "X", i[i.Y = 89] = "Y", i[i.Z = 90] = "Z", i[i.LeftWindowKey = 91] = "LeftWindowKey", i[i.RightWindowKey = 92] = "RightWindowKey", i[i.SelectKey = 93] = "SelectKey", i[i.Numpad0 = 96] = "Numpad0", i[i.Numpad1 = 97] = "Numpad1", i[i.Numpad2 = 98] = "Numpad2", i[i.Numpad3 = 99] = "Numpad3", i[i.Numpad4 = 100] = "Numpad4", i[i.Numpad5 = 101] = "Numpad5", i[i.Numpad6 = 102] = "Numpad6", i[i.Numpad7 = 103] = "Numpad7", i[i.Numpad8 = 104] = "Numpad8", i[i.Numpad9 = 105] = "Numpad9", i[i.Multiply = 106] = "Multiply", i[i.Add = 107] = "Add", i[i.Subtract = 109] = "Subtract", i[i.DecimalPoint = 110] = "DecimalPoint", i[i.Divide = 111] = "Divide", i[i.F1 = 112] = "F1", i[i.F2 = 113] = "F2", i[i.F3 = 114] = "F3", i[i.F4 = 115] = "F4", i[i.F5 = 116] = "F5", i[i.F6 = 117] = "F6", i[i.F7 = 118] = "F7", i[i.F8 = 119] = "F8", i[i.F9 = 120] = "F9", i[i.F10 = 121] = "F10", i[i.F11 = 122] = "F11", i[i.F12 = 123] = "F12", i[i.NumLock = 144] = "NumLock", i[i.ScrollLock = 145] = "ScrollLock", i[i.SemiColon = 186] = "SemiColon", i[i.Equals = 187] = "Equals", i[i.Comma = 188] = "Comma", i[i.Dash = 189] = "Dash", i[i.Period = 190] = "Period", i[
  i.UnderScore = 189
  /* Dash */
] = "UnderScore", i[
  i.PlusSign = 187
  /* Equals */
] = "PlusSign", i[i.ForwardSlash = 191] = "ForwardSlash", i[i.Tilde = 192] = "Tilde", i[
  i.GraveAccent = 192
  /* Tilde */
] = "GraveAccent", i[i.OpenBracket = 219] = "OpenBracket", i[i.ClosedBracket = 221] = "ClosedBracket", i[i.Quote = 222] = "Quote", i))(W || {});
const ts = class ts {
  constructor(t) {
    this.player = t, this.controlMask = this.player.$area;
  }
  apply() {
    this.initKey(), this.initMask();
  }
  initKey() {
    document.addEventListener("keydown", (t) => {
      var n, a;
      const e = (n = document.activeElement) == null ? void 0 : n.tagName.toUpperCase(), s = (a = document.activeElement) == null ? void 0 : a.getAttribute("contenteditable");
      if (this.player.isFocused) {
        if (e == "INPUT" || e == "TEXTAREA" || s == "" || s == "true")
          return;
        switch (t.keyCode) {
          case W.Space:
            t.preventDefault(), this.player.paused ? this.player.play() : this.player.pause();
            break;
          case W.LeftArrow:
            t.preventDefault(), this.player.seek(this.player.currentTime - 5);
            break;
          case W.RightArrow:
            t.preventDefault(), this.player.seek(this.player.currentTime + 5);
            break;
          case W.UpArrow:
            t.preventDefault(), this.player.setVolume(this.player.volume + 0.1);
            break;
          case W.DownArrow:
            t.preventDefault(), this.player.setVolume(this.player.volume - 0.1);
            break;
        }
      }
    });
  }
  initMask() {
    this.controlMask.addEventListener("click", () => {
      this.player.paused ? this.player.play() : this.player.pause();
    });
  }
};
ts.pluginName = "hotkey";
let Yt = ts;
const wn = () => p`
  <div class="${r}-modal-mask"></div>
  <div class="${r}-modal">
    <div class="${r}-modal-head">
      <div class="${r}-modal-title"></div>
      <div class="${r}-modal-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${r}-modal-content"></div>
  </div>
`;
var C;
const es = class es extends b {
  constructor(e) {
    super(e);
    z(this, C, void 0);
    this.current = null, M(this, C, []), this.container = T("div", { class: `${r}-modal-wrap` }), $(wn(), this.container), this.$el = this.container.querySelector(`.${r}-modal`), this.$mask = this.container.querySelector(`.${r}-modal-mask`), this.$content = this.$el.querySelector(`.${r}-modal-content`), this.$title = this.$el.querySelector(`.${r}-modal-title`), this.$close = this.$el.querySelector(`.${r}-modal-close`), this.player.$main.appendChild(this.container);
  }
  get isShow() {
    return this.container.classList.contains("is-show");
  }
  init() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    }), this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  apply(e, s) {
    var n;
    M(this, C, ((n = s.modal) == null ? void 0 : n.panels) || []);
  }
  ready() {
    R(this, C).forEach((e) => {
      const s = this.player.panel.get(e);
      s && this.mount(s);
    }), M(this, C, []);
  }
  /** 关闭模态框 */
  hide() {
    var e;
    (e = this.current) == null || e.toggle(!1);
  }
  /** 挂载一个面板 */
  mount(e) {
    e.mount(this.$content, {
      onToggle: (s) => {
        if (s) {
          for (const n of this.$content.children)
            n.classList.toggle("is-show", n == e.$el);
          this.container.classList.add("is-show"), this.$title.innerText = e.title || "", this.current = e;
        } else
          this.current == e && (this.container.classList.remove("is-show"), e.$el.classList.remove("is-show"), this.$title.innerText = "", this.current = null);
      }
    });
  }
};
C = new WeakMap(), es.pluginName = "modal";
let Kt = es;
const xn = () => p`
  <div class="${r}-progress">
    <div class="${r}-progress-bar">
      <div class="${r}-progress-buffered"></div>
      <div class="${r}-progress-played"></div>
      <div class="${r}-progress-thumb-track">
        <div class="${r}-progress-thumb"></div>
      </div>
      <div class="${r}-progress-preview">
        <div class="${r}-progress-thumbnail"></div>
        <div class="${r}-progress-time"></div>
      </div>
      <div class="${r}-progress-tip"></div>
    </div>
  </div>
`, ss = class ss extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(xn(), e), super(t, e.querySelector(`.${r}-progress`)), this.name = "progress", this.trackLength = 0, this.distance = 0, this.nMax = 0, this.nLeft = 0, this.isDragging = !1, this.isHover = !1, this.isActive = !1, this.$bar = this.$(`.${r}-progress-bar`), this.$buffered = this.$(`.${r}-progress-buffered`), this.$played = this.$(`.${r}-progress-played`), this.$thumbTrack = this.$(`.${r}-progress-thumb-track`), this.$thumb = this.$(`.${r}-progress-thumb`), this.$preview = this.$(`.${r}-progress-preview`), this.$thumbnail = this.$(`.${r}-progress-thumbnail`), this.$time = this.$(`.${r}-progress-time`), this.$tip = this.$(`.${r}-progress-tip`), this.$el.addEventListener("mousedown", (a) => {
      const { clientX: l } = a;
      this.trackLength = this.$el.offsetWidth, this.nMax = this.$thumbTrack.offsetWidth || this.trackLength, this.nLeft = this.$el.getBoundingClientRect().left, this.distance = l - this.nLeft, this.setPlayed(this.nValue), this.$el.classList.add(`${r}-progress-dragging`), this.isDragging = !0, document.addEventListener("mousemove", s), document.addEventListener("mouseup", n);
    });
    const s = (a) => {
      var o;
      const { clientX: l } = a;
      a.preventDefault(), a.stopPropagation(), this.distance = l - this.nLeft, this.setPlayed(this.nValue), this.updateTip(), (o = window.getSelection()) == null || o.removeAllRanges();
    }, n = (a) => {
      var l;
      a.stopPropagation(), (l = window.getSelection()) == null || l.removeAllRanges(), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", n), this.$el.classList.remove(`${r}-progress-dragging`), this.isDragging = !1, this.isHover || this.setActive(!1), this.player.seek(this.nValue), this.player.play();
    };
    this.$el.addEventListener("mouseenter", () => {
      this.isHover = !0, this.isDragging || this.updateTip();
    }), this.$el.addEventListener("mousemove", (a) => {
      if (this.isDragging)
        return;
      const { clientX: l } = a;
      this.trackLength = this.$el.offsetWidth, this.nMax = this.$thumbTrack.offsetWidth || this.trackLength, this.nLeft = this.$el.getBoundingClientRect().left, this.distance = l - this.nLeft, this.updateTip();
    }), this.$el.addEventListener("mouseleave", () => {
      this.isHover = !1, this.isDragging || this.setActive(!1);
    }), this.player.on("timeupdate", (a) => {
      this.isDragging || this.setPlayed(a);
    }), this.player.on("progress", (a) => {
      this.setBuffered(a.length ? a.end(a.length - 1) : 0);
    });
  }
  /** 滑动距离 */
  get nLength() {
    const t = this.distance - this.thumbTrackX;
    return t >= this.nMax ? this.nMax : t <= 0 ? 0 : t;
  }
  /** 滑块轨道与总轨道距离差 */
  get thumbTrackX() {
    return (this.trackLength - this.nMax) / 2;
  }
  /** 滑动值 */
  get nValue() {
    return this.nLength / this.nMax * this.player.duration;
  }
  /** 设置已播放进度条位置 */
  setPlayed(t) {
    const e = t / this.player.duration || 0;
    this.$thumb.style.left = `${e * 100}%`, this.$played.style.width = `${e * 100}%`;
  }
  /** 设置已播放进度条位置 */
  setBuffered(t) {
    const e = t / this.player.duration || 0;
    this.$buffered.style.width = `${e * 100}%`;
  }
  /** 设置进度条活跃状态 */
  setActive(t) {
    this.isActive = t, this.$el.classList.toggle(`${r}-progress-active`, t), t ? this.player.isControlled = !0 : this.player.isControlled = !1;
  }
  /** 更新指针位置 */
  updateTip() {
    this.isActive || this.setActive(!0);
    let t = this.distance / this.trackLength;
    t = t >= 1 ? 1 : t <= 0 ? 0 : t, this.$tip.style.left = `${t * 100}%`, this.$preview.style.left = `${t * 100}%`, this.$time.innerText = pt(this.nValue);
  }
};
ss.pluginName = "progress";
let Gt = ss;
const kn = p`
  <div class="${r}-settings">
    <div class="${r}-settings-slot">
      <div class="${r}-panel-row">
        <div class="${r}-row-label">播放倍速</div>
        <div class="${r}-settings-rate-picker"></div>
      </div>
      <div class="${r}-panel-row">
        <div class="${r}-row-label">视频比例</div>
        <div class="${r}-settings-ratio-picker"></div>
      </div>
    </div>
    <div class="${r}-panel-row">
      <div class="${r}-row-label">播放方式</div>
      <div class="${r}-settings-play"></div>
    </div>
    <div class="${r}-panel-row">
      <div class="${r}-row-label">其他设置</div>
      <div class="${r}-settings-others"></div>
    </div>
  </div>
`, is = class is extends mt {
  constructor(t) {
    const e = new DocumentFragment();
    $(kn, e), super(t, e.querySelector(`.${r}-settings`)), this.name = "settings", this.title = "设置", this.$slot = this.$(`.${r}-settings-slot`), this.$play = this.$(`.${r}-settings-play`), this.$others = this.$(`.${r}-settings-others`), this.$ratePicker = this.$(`.${r}-settings-rate-picker`), this.$ratioPicker = this.$(`.${r}-settings-ratio-picker`);
  }
  init() {
    this.pickerRate = new Mt({
      container: this.$ratePicker,
      list: [
        { value: 0.5, label: "0.5" },
        { value: 0.75, label: "0.75" },
        { value: 1, label: "1.0" },
        { value: 1.25, label: "1.25" },
        { value: 1.5, label: "1.5" },
        { value: 2, label: "2.0" }
      ],
      value: this.player.playbackRate || 1,
      onPick: (t) => {
        this.player.setPlaybackRate(Number(t));
      }
    }), this.player.on("ratechange", (t) => {
      this.pickerRate.setValue(t);
    }), this.pickerRatio = new Mt({
      container: this.$ratioPicker,
      list: [
        { value: "", label: "自动" },
        { value: "16/9", label: "16:9" },
        { value: "4/3", label: "4:3" }
      ],
      value: this.player.aspectRatio || "",
      onPick: (t) => {
        var e, s;
        (s = (e = this.player).setAspectRatio) == null || s.call(e, t || "");
      }
    }), this.player.on("aspectRatioChange", (t) => {
      this.pickerRatio.setValue(t);
    });
  }
};
is.pluginName = "settings";
let Zt = is;
const Sn = () => p`
  <div class="${r}-side-mask"></div>
  <div class="${r}-side">
    <div class="${r}-side-head">
      <div class="${r}-side-title"></div>
      <div class="${r}-side-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${r}-side-content"></div>
  </div>
`;
var X;
const ns = class ns extends b {
  constructor(e) {
    super(e);
    z(this, X, void 0);
    this.current = null, M(this, X, []), this.container = T("div", { class: `${r}-side-wrap` }), $(Sn(), this.container), this.$el = this.container.querySelector(`.${r}-side`), this.$mask = this.container.querySelector(`.${r}-side-mask`), this.$content = this.$el.querySelector(`.${r}-side-content`), this.$title = this.$el.querySelector(`.${r}-side-title`), this.$close = this.$el.querySelector(`.${r}-side-close`), this.player.$main.appendChild(this.container);
  }
  get isShow() {
    return this.container.classList.contains("is-show");
  }
  init() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    }), this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  apply(e, s) {
    var n;
    M(this, X, ((n = s.side) == null ? void 0 : n.panels) || []);
  }
  ready() {
    R(this, X).forEach((e) => {
      const s = this.player.panel.get(e);
      s && this.mount(s);
    }), M(this, X, []);
  }
  hide() {
    var e;
    (e = this.current) == null || e.toggle(!1);
  }
  mount(e) {
    e.mount(this.$content, {
      onToggle: (s) => {
        var n;
        if (s) {
          (n = this.current) == null || n.toggle(!1);
          for (const a of this.$content.children)
            a.classList.toggle("is-show", a == e.$el);
          this.container.classList.add("is-show"), this.$title.innerText = e.title || "", this.current = e;
        } else
          this.current == e && (this.container.classList.remove("is-show"), e.$el.classList.remove("is-show"), this.$title.innerText = "", this.current = null);
      }
    });
  }
};
X = new WeakMap(), ns.pluginName = "side";
let Jt = ns;
const rs = class rs extends b {
  constructor(t) {
    super(t), this.player.define("isPip", {
      get: () => this.status
    }), this.player.define("enterPip", () => this.enter()), this.player.define("exitPip", () => this.exit()), this.player.on("enterpictureinpicture", () => {
      this.player.$el.classList.add("is-pip"), this.player.emit("enterpictureinpicture");
    }), this.player.on("leavepictureinpicture", () => {
      this.player.$el.classList.remove("is-pip"), this.player.emit("leavepictureinpicture");
    }), this.player.on("enterpictureinpicture", () => {
      var e, s;
      (s = (e = this.player).exitFullscreen) == null || s.call(e);
    }), this.player.on("fullscreenEnter", () => {
      this.exit();
    });
  }
  enter() {
    this.status || this.player.$video.requestPictureInPicture();
  }
  exit() {
    this.status && document.exitPictureInPicture();
  }
  get status() {
    return document.pictureInPictureElement == this.player.$video;
  }
};
rs.pluginName = "pip";
let Qt = rs;
const as = class as extends b {
  constructor(t) {
    super(t), this.$el = this.player.$main, this.player.define("isFullscreen", {
      get: () => this.status
    }), this.player.define("enterFullscreen", () => this.enter()), this.player.define("exitFullscreen", () => this.exit());
    const e = () => {
      this.status ? (this.player.$el.classList.add("is-fullscreen"), this.player.emit("fullscreenEnter")) : (this.player.$el.classList.remove("is-fullscreen"), this.player.emit("fullscreenExit"));
    };
    this.$el.addEventListener("fullscreenchange", e), this.$el.addEventListener("webkitfullscreenchange", e), this.$el.addEventListener("mozfullscreenchange", e), this.$el.addEventListener("msfullscreenchange", e);
  }
  enter() {
    if (this.status)
      return;
    const t = this.$el;
    t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.webkitEnterFullscreen ? t.webkitEnterFullscreen() : t.webkitEnterFullScreen ? t.webkitEnterFullScreen() : t.msRequestFullscreen && t.msRequestFullscreen();
  }
  exit() {
    if (!this.status)
      return;
    const t = document;
    document.exitFullscreen ? document.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen ? t.webkitExitFullscreen() : t.webkitExitFullScreen ? t.webkitExitFullScreen() : this.$el.msExitFullscreen && this.$el.msExitFullscreen();
  }
  get status() {
    return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement == this.$el);
  }
};
as.pluginName = "fullscreen";
let te = as;
var Q, ut;
const ls = class ls extends b {
  constructor() {
    super(...arguments);
    z(this, Q, 0);
    z(this, ut, 0);
  }
  init() {
    this.player.define("userId", { get: () => R(this, Q) }), this.player.define("authorId", { get: () => R(this, ut) }), this.player.define("login", () => this.login()), this.player.on("videoChange", ({ author: e }) => {
      (e == null ? void 0 : e.id) != null && M(this, ut, e.id || 0);
    });
  }
  apply(e, s) {
    var n;
    M(this, Q, s.userId || 0), this.invokeLogin = (n = s.invoke) == null ? void 0 : n.login;
  }
  /** 调用页面登录 */
  async login() {
    var e;
    await ((e = this.invokeLogin) == null ? void 0 : e.call(this).then((s) => {
      s != null && this.setUser(s);
    }));
  }
  /** 设置用户 */
  async setUser(e) {
    M(this, Q, e), this.player.emit("login", e);
  }
};
Q = new WeakMap(), ut = new WeakMap(), ls.pluginName = "user";
let ee = ls;
var q, V;
const os = class os extends b {
  constructor(e) {
    super(e);
    z(this, q, void 0);
    z(this, V, void 0);
    M(this, q, !1), M(this, V, !1), this.activeDuration = 3e3, this.player.define("isActive", {
      get: () => R(this, q)
    });
    const s = Me(() => {
      M(this, V, !1), this.remove();
    }, this.activeDuration);
    this.player.$main.addEventListener("mousemove", () => {
      M(this, V, !0), this.set(), s();
    }), this.player.$main.addEventListener("mouseleave", () => {
      M(this, V, !1), this.remove();
    });
  }
  apply(e, s) {
    this.activeDuration = s.activeDuration ?? 3e3;
  }
  /** 设置播放器活跃状态 */
  set() {
    R(this, q) || (this.player.$el.classList.add("is-active"), M(this, q, !0), this.player.emit("active"));
  }
  /** 移除播放器活跃状态 */
  remove() {
    !R(this, q) || R(this, V) || this.player.isControlled || this.player.hook.call("inactive").then((e) => {
      e && (this.player.$el.classList.remove("is-active"), M(this, q, !1), this.player.emit("inactive"));
    });
  }
};
q = new WeakMap(), V = new WeakMap(), os.pluginName = "stateActive";
let se = os;
const hs = class hs extends b {
  constructor(t) {
    super(t), this.player.define("isFocused", {
      get: () => this.status
    }), document.addEventListener(
      "click",
      () => {
        this.toggle(!1);
      },
      !0
    ), this.player.$el.addEventListener(
      "click",
      () => {
        this.toggle(!0);
      },
      !0
    );
  }
  /** 设置播放器聚焦状态 */
  toggle(t) {
    this.status != t && (this.player.$el.classList.toggle("is-focus", t), this.player.emit(t ? "focus" : "blur"));
  }
  get status() {
    return this.player.$el.classList.contains("is-focus");
  }
};
hs.pluginName = "stateFocus";
let ie = hs;
var Y = [], En = function() {
  return Y.some(function(i) {
    return i.activeTargets.length > 0;
  });
}, Ln = function() {
  return Y.some(function(i) {
    return i.skippedTargets.length > 0;
  });
}, Ys = "ResizeObserver loop completed with undelivered notifications.", Tn = function() {
  var i;
  typeof ErrorEvent == "function" ? i = new ErrorEvent("error", {
    message: Ys
  }) : (i = document.createEvent("Event"), i.initEvent("error", !1, !1), i.message = Ys), window.dispatchEvent(i);
}, dt;
(function(i) {
  i.BORDER_BOX = "border-box", i.CONTENT_BOX = "content-box", i.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(dt || (dt = {}));
var K = function(i) {
  return Object.freeze(i);
}, An = /* @__PURE__ */ function() {
  function i(t, e) {
    this.inlineSize = t, this.blockSize = e, K(this);
  }
  return i;
}(), mi = function() {
  function i(t, e, s, n) {
    return this.x = t, this.y = e, this.width = s, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, K(this);
  }
  return i.prototype.toJSON = function() {
    var t = this, e = t.x, s = t.y, n = t.top, a = t.right, l = t.bottom, o = t.left, h = t.width, c = t.height;
    return { x: e, y: s, top: n, right: a, bottom: l, left: o, width: h, height: c };
  }, i.fromRect = function(t) {
    return new i(t.x, t.y, t.width, t.height);
  }, i;
}(), Ne = function(i) {
  return i instanceof SVGElement && "getBBox" in i;
}, vi = function(i) {
  if (Ne(i)) {
    var t = i.getBBox(), e = t.width, s = t.height;
    return !e && !s;
  }
  var n = i, a = n.offsetWidth, l = n.offsetHeight;
  return !(a || l || i.getClientRects().length);
}, Ks = function(i) {
  var t;
  if (i instanceof Element)
    return !0;
  var e = (t = i == null ? void 0 : i.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(e && i instanceof e.Element);
}, _n = function(i) {
  switch (i.tagName) {
    case "INPUT":
      if (i.type !== "image")
        break;
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return !0;
  }
  return !1;
}, rt = typeof window < "u" ? window : {}, gt = /* @__PURE__ */ new WeakMap(), Gs = /auto|scroll/, Fn = /^tb|vertical/, Hn = /msie|trident/i.test(rt.navigator && rt.navigator.userAgent), I = function(i) {
  return parseFloat(i || "0");
}, J = function(i, t, e) {
  return i === void 0 && (i = 0), t === void 0 && (t = 0), e === void 0 && (e = !1), new An((e ? t : i) || 0, (e ? i : t) || 0);
}, Zs = K({
  devicePixelContentBoxSize: J(),
  borderBoxSize: J(),
  contentBoxSize: J(),
  contentRect: new mi(0, 0, 0, 0)
}), gi = function(i, t) {
  if (t === void 0 && (t = !1), gt.has(i) && !t)
    return gt.get(i);
  if (vi(i))
    return gt.set(i, Zs), Zs;
  var e = getComputedStyle(i), s = Ne(i) && i.ownerSVGElement && i.getBBox(), n = !Hn && e.boxSizing === "border-box", a = Fn.test(e.writingMode || ""), l = !s && Gs.test(e.overflowY || ""), o = !s && Gs.test(e.overflowX || ""), h = s ? 0 : I(e.paddingTop), c = s ? 0 : I(e.paddingRight), u = s ? 0 : I(e.paddingBottom), f = s ? 0 : I(e.paddingLeft), k = s ? 0 : I(e.borderTopWidth), A = s ? 0 : I(e.borderRightWidth), L = s ? 0 : I(e.borderBottomWidth), v = s ? 0 : I(e.borderLeftWidth), m = f + c, d = h + u, g = v + A, E = k + L, w = o ? i.offsetHeight - E - i.clientHeight : 0, _ = l ? i.offsetWidth - g - i.clientWidth : 0, x = n ? m + g : 0, S = n ? d + E : 0, F = s ? s.width : I(e.width) - x - _, y = s ? s.height : I(e.height) - S - w, H = F + m + _ + g, N = y + d + w + E, st = K({
    devicePixelContentBoxSize: J(Math.round(F * devicePixelRatio), Math.round(y * devicePixelRatio), a),
    borderBoxSize: J(H, N, a),
    contentBoxSize: J(F, y, a),
    contentRect: new mi(f, h, F, y)
  });
  return gt.set(i, st), st;
}, $i = function(i, t, e) {
  var s = gi(i, e), n = s.borderBoxSize, a = s.contentBoxSize, l = s.devicePixelContentBoxSize;
  switch (t) {
    case dt.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case dt.BORDER_BOX:
      return n;
    default:
      return a;
  }
}, Mn = /* @__PURE__ */ function() {
  function i(t) {
    var e = gi(t);
    this.target = t, this.contentRect = e.contentRect, this.borderBoxSize = K([e.borderBoxSize]), this.contentBoxSize = K([e.contentBoxSize]), this.devicePixelContentBoxSize = K([e.devicePixelContentBoxSize]);
  }
  return i;
}(), fi = function(i) {
  if (vi(i))
    return 1 / 0;
  for (var t = 0, e = i.parentNode; e; )
    t += 1, e = e.parentNode;
  return t;
}, Dn = function() {
  var i = 1 / 0, t = [];
  Y.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var o = [];
      l.activeTargets.forEach(function(c) {
        var u = new Mn(c.target), f = fi(c.target);
        o.push(u), c.lastReportedSize = $i(c.target, c.observedBox), f < i && (i = f);
      }), t.push(function() {
        l.callback.call(l.observer, o, l.observer);
      }), l.activeTargets.splice(0, l.activeTargets.length);
    }
  });
  for (var e = 0, s = t; e < s.length; e++) {
    var n = s[e];
    n();
  }
  return i;
}, Js = function(i) {
  Y.forEach(function(e) {
    e.activeTargets.splice(0, e.activeTargets.length), e.skippedTargets.splice(0, e.skippedTargets.length), e.observationTargets.forEach(function(n) {
      n.isActive() && (fi(n.target) > i ? e.activeTargets.push(n) : e.skippedTargets.push(n));
    });
  });
}, Pn = function() {
  var i = 0;
  for (Js(i); En(); )
    i = Dn(), Js(i);
  return Ln() && Tn(), i > 0;
}, Lt, yi = [], Rn = function() {
  return yi.splice(0).forEach(function(i) {
    return i();
  });
}, Nn = function(i) {
  if (!Lt) {
    var t = 0, e = document.createTextNode(""), s = { characterData: !0 };
    new MutationObserver(function() {
      return Rn();
    }).observe(e, s), Lt = function() {
      e.textContent = "".concat(t ? t-- : t++);
    };
  }
  yi.push(i), Lt();
}, In = function(i) {
  Nn(function() {
    requestAnimationFrame(i);
  });
}, yt = 0, qn = function() {
  return !!yt;
}, On = 250, zn = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Qs = [
  "resize",
  "load",
  "transitionend",
  "animationend",
  "animationstart",
  "animationiteration",
  "keyup",
  "keydown",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout",
  "blur",
  "focus"
], ti = function(i) {
  return i === void 0 && (i = 0), Date.now() + i;
}, Tt = !1, Bn = function() {
  function i() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return i.prototype.run = function(t) {
    var e = this;
    if (t === void 0 && (t = On), !Tt) {
      Tt = !0;
      var s = ti(t);
      In(function() {
        var n = !1;
        try {
          n = Pn();
        } finally {
          if (Tt = !1, t = s - ti(), !qn())
            return;
          n ? e.run(1e3) : t > 0 ? e.run(t) : e.start();
        }
      });
    }
  }, i.prototype.schedule = function() {
    this.stop(), this.run();
  }, i.prototype.observe = function() {
    var t = this, e = function() {
      return t.observer && t.observer.observe(document.body, zn);
    };
    document.body ? e() : rt.addEventListener("DOMContentLoaded", e);
  }, i.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Qs.forEach(function(e) {
      return rt.addEventListener(e, t.listener, !0);
    }));
  }, i.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), Qs.forEach(function(e) {
      return rt.removeEventListener(e, t.listener, !0);
    }), this.stopped = !0);
  }, i;
}(), ne = new Bn(), ei = function(i) {
  !yt && i > 0 && ne.start(), yt += i, !yt && ne.stop();
}, Vn = function(i) {
  return !Ne(i) && !_n(i) && getComputedStyle(i).display === "inline";
}, jn = function() {
  function i(t, e) {
    this.target = t, this.observedBox = e || dt.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return i.prototype.isActive = function() {
    var t = $i(this.target, this.observedBox, !0);
    return Vn(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, i;
}(), Wn = /* @__PURE__ */ function() {
  function i(t, e) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = e;
  }
  return i;
}(), $t = /* @__PURE__ */ new WeakMap(), si = function(i, t) {
  for (var e = 0; e < i.length; e += 1)
    if (i[e].target === t)
      return e;
  return -1;
}, ft = function() {
  function i() {
  }
  return i.connect = function(t, e) {
    var s = new Wn(t, e);
    $t.set(t, s);
  }, i.observe = function(t, e, s) {
    var n = $t.get(t), a = n.observationTargets.length === 0;
    si(n.observationTargets, e) < 0 && (a && Y.push(n), n.observationTargets.push(new jn(e, s && s.box)), ei(1), ne.schedule());
  }, i.unobserve = function(t, e) {
    var s = $t.get(t), n = si(s.observationTargets, e), a = s.observationTargets.length === 1;
    n >= 0 && (a && Y.splice(Y.indexOf(s), 1), s.observationTargets.splice(n, 1), ei(-1));
  }, i.disconnect = function(t) {
    var e = this, s = $t.get(t);
    s.observationTargets.slice().forEach(function(n) {
      return e.unobserve(t, n.target);
    }), s.activeTargets.splice(0, s.activeTargets.length);
  }, i;
}(), bi = function() {
  function i(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    ft.connect(this, t);
  }
  return i.prototype.observe = function(t, e) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Ks(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    ft.observe(this, t, e);
  }, i.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Ks(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    ft.unobserve(this, t);
  }, i.prototype.disconnect = function() {
    ft.disconnect(this);
  }, i.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, i;
}();
const cs = class cs extends b {
  constructor(t) {
    super(t);
    const e = window.ResizeObserver || bi;
    e && (this.observer = new e(([s]) => {
      const { width: n, height: a } = s.contentRect;
      this.player.emit("resize", [n, a]);
    }));
  }
  mounted() {
    var t;
    (t = this.observer) == null || t.observe(this.player.$el);
  }
};
cs.pluginName = "stateResize";
let re = cs;
const ds = class ds extends b {
  constructor(t) {
    super(t), this._status = !1, this.player.define("isIntersecting", {
      get: () => this._status
    }), window.IntersectionObserver && (this.observer = new window.IntersectionObserver(([e]) => {
      const { isIntersecting: s } = e;
      this._status = s, this.player.emit("intersection", s);
    })), this.player.once("mounted", () => {
      var e;
      (e = this.observer) == null || e.observe(this.player.$el);
    });
  }
};
ds.pluginName = "stateIntersecting";
let ae = ds;
class Un extends Pe {
  constructor(t) {
    super(t, T("div", { class: `${r}-toast` })), this.defaultDuration = 5e3, this.player.$area.appendChild(this.$el);
  }
  init() {
    this.player.define(
      "toast",
      (t, e, s) => this.append(t, e, s)
    );
  }
  /** 添加toast消息
   * @param content 要发送的消息
   * @param duration 持续时间(ms)
   * @returns 消息id
   */
  append(t, e, s) {
    const n = this.createToastItem({ content: t, duration: e, close: s });
    return this.$el.appendChild(n.el), n;
  }
  /** 创建一个toast元素 */
  createToastItem(t) {
    const e = T("div", { class: `${r}-toast-item` });
    e.appendChild(
      T("div", { class: `${r}-toast-item-content` })
    ).appendChild(typeof t.content == "object" ? t.content : new Text(t.content));
    const n = {
      el: e,
      close() {
        this.el.remove();
      }
    };
    if (t.close) {
      const o = e.appendChild(
        T("div", {
          class: `${r}-toast-item-close`
        })
      );
      o.onclick = () => {
        n.close();
      };
    }
    let a = 0;
    const l = () => {
      n.close(), window.clearTimeout(a);
    };
    return a = window.setTimeout(l, t.duration || this.defaultDuration), n;
  }
  /** 移除toast消息 */
  remove(t) {
    t.close();
  }
}
const Cn = [
  se,
  ie,
  re,
  ae,
  Qt,
  te
], Xn = [Kt, Jt, It, Un, Zt, Yt, Nt, ee], Yn = [
  Gt,
  qt,
  Ot,
  zt,
  Bt,
  Vt,
  jt,
  Wt,
  Ut,
  Ct,
  Xt
], Kn = [...Cn, ...Xn, ...Yn], us = class us extends b {
  constructor() {
    super(...arguments), this._status = !1;
  }
  init() {
    this.player.hook.register("end", () => {
      if (this.status) {
        const { part: t, list: e } = this.player.getVideoInfo();
        if (t != (e == null ? void 0 : e.length))
          return this.player.next(), !1;
      }
    });
  }
  apply(t, e) {
    e.autoPart && this.toggle(!0);
  }
  ready() {
    if (this.plugin.settings) {
      const t = document.createElement("div");
      this.checkbox = new Re({
        container: t,
        value: this.status,
        onToggle: (e) => {
          this.toggle(e);
        },
        label: "分P连播"
      }), this.plugin.settings.$play.appendChild(t);
    }
  }
  toggle(t) {
    t ? this._status = !0 : this._status = !1, this.player.emit("autoPartChange", t);
  }
  get status() {
    return this._status;
  }
};
us.pluginName = "autoPart";
let le = us;
const ps = class ps extends b {
  constructor() {
    super(...arguments), this._status = !1;
  }
  apply(t, e) {
    e.autoPlay && this.toggle(!0);
  }
  ready() {
    if (this.plugin.settings) {
      const t = document.createElement("div");
      this.checkbox = new Re({
        container: t,
        value: this.status,
        onToggle: (e) => {
          this.toggle(e);
        },
        label: "自动播放"
      }), this.plugin.settings.$play.appendChild(t);
    }
  }
  toggle(t) {
    t ? this._status = !0 : this._status = !1, this.player.emit("autoPlayChange", t);
  }
  get status() {
    return this._status;
  }
};
ps.pluginName = "autoPlay";
let oe = ps;
const At = {
  primaryColor: "--mp-primary-color",
  secondaryColor: "--mp-secondary-color",
  borderRadius: "--mp-border-radius",
  bgLight: "--mp-bg-light",
  bgDark: "--mp-bg-dark",
  bgBlack: "--mp-bg-black"
}, ms = class ms extends b {
  constructor(t) {
    super(t), this.properties = {}, this._matchDarkScheme = window.matchMedia("(prefers-color-scheme: dark)"), this.themeElement = [this.player.container], this._handleDarkScheme = (e) => {
      this.player.$el.classList.toggle("mpui-dark", e.matches);
    };
  }
  apply(t, e) {
    this.setTheme(e.theme || {});
  }
  /** 设置主题 */
  setTheme(t) {
    Object.assign(this.properties, t), this.themeElement.forEach((e) => {
      let s;
      for (s in t)
        e.style.setProperty(At[s], t[s]);
    });
  }
  /** 设置某个主题属性 */
  set(t, e) {
    this.properties[t] = e, this.themeElement.forEach((s) => {
      s.style.setProperty(At[t], e);
    });
  }
  get(t) {
    return this.properties[t];
  }
  /** 为元素绑定主题变量 */
  bind(t) {
    this.themeElement.push(t);
    let e;
    for (e in this.properties) {
      const s = this.properties[e];
      s && t.style.setProperty(At[e], s);
    }
  }
  setColorScheme(t) {
    this.player.$el.classList.toggle("mpui-dark", t == "dark"), t == "auto" ? this._matchDarkScheme.addEventListener("change", this._handleDarkScheme) : this._matchDarkScheme.removeEventListener("change", this._handleDarkScheme);
  }
};
ms.pluginName = "theme";
let he = ms;
const vs = class vs extends b {
  constructor(t) {
    super(t), this.baseVideoInfo = null;
  }
  init() {
    this.player.hook.register(
      "video.set",
      (t) => {
        var e, s;
        (!((e = this.baseVideoInfo) != null && e.list) || ((s = this.baseVideoInfo) == null ? void 0 : s.list) != t.list) && (this.baseVideoInfo = { ...t }, this.player.emit("partListChange", [])), t.list ? (t.part || (t.part = 1), Object.assign(t, t.list[t.part - 1]), t.hasNext || (t.hasNext = t.part < t.list.length), t.hasPrev || (t.hasPrev = t.part > 1), this.player.emit("partChange", t.part)) : this.player.emit("partChange", 1);
      },
      !0
    ), this.player.hook.register("next", () => {
      if (this.list && this.part < this.num)
        return this.set(this.part + 1), !1;
    }), this.player.hook.register("prev", () => {
      if (this.list && this.part > 1)
        return this.set(this.part - 1), !1;
    });
  }
  /** 设置分P */
  set(t, e) {
    var n;
    const s = this.player.getVideoInfo();
    t > 0 && t <= (((n = s.list) == null ? void 0 : n.length) || 0) && this.player.setVideo(
      {
        ...this.baseVideoInfo,
        part: t
      },
      e ?? !this.player.paused
    );
  }
  get num() {
    var t;
    return ((t = this.player.getVideoInfo().list) == null ? void 0 : t.length) || 0;
  }
  get list() {
    return this.player.getVideoInfo().list || [];
  }
  get part() {
    return this.player.getVideoInfo().part || 1;
  }
};
vs.pluginName = "part";
let ce = vs;
const gs = class gs extends b {
  constructor(t) {
    super(t);
  }
  /** 无缝加载视频 */
  load(t) {
    this.player.emit("videoLoad", t);
    const { url: e, type: s, play: n, time: a } = t, l = this.player.$video, o = l.cloneNode(), h = this.player.loader.create(t, o);
    o.addEventListener(
      "loadedmetadata",
      () => {
        this.player.$content.insertBefore(o, l);
        const c = a === !0 ? this.player.currentTime : a || 0;
        o.currentTime = c, !this.player.paused && o.play(), o.addEventListener(
          "canplay",
          () => {
            this.player.emit("videoLoad", t), this.player.isPip && o.requestPictureInPicture(), this.player.attachMediaController(h), l.remove(), n == !0 && this.player.paused && this.player.play(), n == !1 && !this.player.paused && this.player.pause();
          },
          { once: !0 }
        );
      },
      { once: !0 }
    );
  }
  ready() {
    this.player.hook.register("video.load", (t) => {
      if (t.time === !0)
        return this.load(t), this.player.emit("videoLoad", t), !1;
    });
  }
};
gs.pluginName = "seamless";
let de = gs;
const Gn = p`
  <div class="${r}-partlist">
    <ul class="${r}-partlist-list mpui-list"></ul>
  </div>
`, Zn = (i, t) => i.map(
  ({ title: e }, s) => p`
      <li
        class="${r}-partlist-item"
        @click=${() => {
    t(s + 1);
  }}
        data-part="${s + 1}"
      >
        <div class="${r}-partlist-item-id">P${s + 1}</div>
        <div class="${r}-partlist-item-title">${e}</div>
      </li>
    `
), $s = class $s extends mt {
  constructor(t) {
    const e = new DocumentFragment();
    $(Gn, e), super(t, e.querySelector(`.${r}-partlist`)), this.name = "partList", this.title = "分P列表", this._part = 0, this._list = [], this.$list = this.$(`.${r}-partlist-list`);
  }
  init() {
    this.player.on("videoChange", (t) => {
      this._update(t.list), this._select(t.part || 1);
    });
  }
  _update(t) {
    t != this._list && (this._list = t, $(
      Zn(t || [], (e) => {
        var s;
        (s = this.plugin.part) == null || s.set(e);
      }),
      this.$list
    ));
  }
  _select(t) {
    var e, s;
    (e = this.$list.querySelector(`li[data-part="${this._part}"]`)) == null || e.classList.remove("is-selected"), this._part = t, (s = this.$list.querySelector(`li[data-part="${t}"]`)) == null || s.classList.add("is-selected");
  }
};
$s.pluginName = "partList";
let ue = $s;
const Jn = p`
  <div class="${r}-controls-button ${r}-button-danmakulist">
    <div class="${r}-controls-button-icon">
      <div class="${r}-controls-button-text">弹幕列表</div>
    </div>
    <div class="mpui-tooltip">弹幕列表</div>
  </div>
`, fs = class fs extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(Jn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "danmakuList", this.$icon = this.$(`.${r}-controls-button-icon`), this.$text = this.$(`.${r}-controls-button-text`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.$icon.addEventListener("click", () => {
      var t;
      (t = this.plugin.danmakuList) == null || t.toggle();
    });
  }
};
fs.pluginName = "buttonDanmakuList";
let pe = fs;
const Qn = p`
  <div class="${r}-controls-button ${r}-button-quality">
    <div class="${r}-controls-button-icon">
      <div class="${r}-controls-button-text">自动</div>
    </div>

    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel">
        <ul class="${r}-button-quality-list"></ul>
      </div>
    </div>
  </div>
`, ys = class ys extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(Qn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "quality", this._itemMap = /* @__PURE__ */ new Map(), this.$icon = this.$(`.${r}-controls-button-icon`), this.$text = this.$(`.${r}-controls-button-text`), this.$panel = this.$(`.${r}-controls-panel`), this.$list = this.$(`.${r}-button-quality-list`);
  }
  init() {
    this.player.on("qualityListUpdate", (t) => {
      this._updateList(t);
    }), this.player.on("qualityChanging", (t) => {
      this._updateItem(t);
    }), this.player.on("qualityChanged", (t) => {
      this._updateItem(t);
    }), this.player.on("qualityChangeFailed", () => {
      this._updateItem(this.player.quality.current || {});
    });
  }
  _updateList(t) {
    this._itemMap = /* @__PURE__ */ new Map(), t.length ? (this.$panel.style.display = "", this.$icon.style.cursor = "") : (this.$panel.style.display = "none", this.$icon.style.cursor = "default"), this.$list.innerHTML = "";
    const e = new DocumentFragment();
    t == null || t.forEach((s) => {
      var a;
      const n = s.label || ((a = this.getLabel) == null ? void 0 : a.call(this, s)) || s.quality;
      if (n) {
        const l = T(
          "li",
          {
            class: `${r}-button-quality-item`,
            "data-value": s.quality || ""
          },
          typeof n == "string" ? new Text(n) : n
        );
        l.onclick = () => {
          var o;
          (o = this.player.quality) == null || o.set(s);
        }, this._itemMap.set(s, l), e.appendChild(l);
      }
    }), this.$list.appendChild(e);
  }
  _updateItem(t) {
    var s, n;
    const e = t.buttonLabel || ((s = this.getButtonLabel) == null ? void 0 : s.call(this, t)) || (typeof t.label == "object" ? t.label.cloneNode(!0) : t.label) || ((n = this.getLabel) == null ? void 0 : n.call(this, t)) || t.quality;
    e ? (this.show(), typeof e == "string" ? this.$text.innerText = e : (this.$text.innerHTML = "", this.$text.appendChild(e))) : this.hide(), this.$list.querySelectorAll("li").forEach((a) => {
      a.classList.toggle("is-checked", a == this._itemMap.get(t));
    });
  }
  get ignored() {
    return !this.player.quality;
  }
};
ys.pluginName = "buttonQuality";
let me = ys;
const bs = class bs extends b {
  constructor() {
    super(...arguments), this.current = null, this.target = null, this.list = [];
  }
  init() {
    this.player.hook.register("video.set", () => {
      this.current = null, this.target = null, this.list = [];
    });
  }
  apply() {
    this.player.define("quality", { value: this });
  }
  /** 切换视频质量 */
  set(t) {
    let e;
    if (typeof t == "string") {
      const s = this.list.find((n) => e === n.quality);
      if (!s) {
        this._emitChangeFailed({});
        return;
      }
      e = s;
    } else
      e = t;
    e.change ? e.change(e.url).then(
      () => {
        this.updateCurrent(e);
      },
      () => {
        this._emitChangeFailed(e);
      }
    ) : e.url && (this.player.loadVideo({ url: e.url, type: e.type, play: !0, time: !0 }), this.player.once("canplay", () => {
      this.updateCurrent(e);
    }));
  }
  _emitChangeFailed(t) {
    this.target = null, this.player.emit("qualityChangeFailed", t);
  }
  /** 更新当前视频质量 */
  async updateCurrent(t) {
    this.current = t, this.target = null, this.player.emit("qualityChanged", t);
  }
  /** 更新视频质量列表 */
  async updateList(t) {
    this.list = t, this.player.emit("qualityListUpdate", t);
  }
};
bs.pluginName = "quality";
let ve = bs;
const tr = p`
  <div class="${r}-videostatus-paused"></div>
  <div class="${r}-videostatus-loading">
    <div class="${r}-videostatus-loading-icon">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    <div class="${r}-videostatus-loading-content">正在缓冲</div>
    <div class="${r}-videostatus-loading-speed"></div>
  </div>
  <div class="${r}-videostatus-volume"></div>
`, ws = class ws extends b {
  constructor(t) {
    super(t), this.$el = T("div", { class: `${r}-videostatus` }), $(tr, this.$el), this.$paused = this.$el.querySelector(`.${r}-videostatus-paused`), this.$loading = this.$el.querySelector(`.${r}-videostatus-loading`), this.$volume = this.$el.querySelector(`.${r}-videostatus-volume`), this.player.$area.appendChild(this.$el);
  }
};
ws.pluginName = "videoStatus";
let ge = ws;
const er = p`
  <div class="${r}-loadingmask-icon">
    <div class="${r}-loadingmask-image"></div>
  </div>
  <div class="${r}-loadingmask-info"></div>
  <div class="${r}-loadingmask-tips">Loading...</div>
`, xs = class xs extends b {
  constructor(t) {
    super(t), this.delay = 0, this.$el = T("div", { class: `${r}-loadingmask` }), $(er, this.$el), this.$info = this.$el.querySelector(`.${r}-loadingmask-info`), this.$tips = this.$el.querySelector(`.${r}-loadingmask-tips`), this.player.$main.appendChild(this.$el);
  }
  apply(t, e) {
    var s, n;
    this.getTips = (s = e.loadingMask) == null ? void 0 : s.getTips, this.delay = ((n = e.loadingMask) == null ? void 0 : n.delay) || 0;
  }
  init() {
    this._toggle(!0), this._add("init", "播放器初始化…"), this.player.on("danmaku:loading", () => {
      this._add("danmaku", "请求弹幕数据中…");
    }), this.player.on("danmaku:loaded", (t, e) => {
      this._change("danmaku", (s) => {
        e ? s.innerText = `请求弹幕数据中… [失败] ${e}` : s.innerText = "请求弹幕数据中… [完成]";
      });
    }), this.player.on("videoChange", async () => {
      var t;
      this._toggle(!0), this._tips(await ((t = this.getTips) == null ? void 0 : t.call(this)));
    }), this.player.on("videoLoad", () => {
      this._add("video", "请求视频数据中…"), this.player.once("canplay", () => {
        this._change("video", (t) => {
          t.innerText = "请求视频数据中… [完成]";
          let e = 0;
          const s = () => {
            this._toggle(!1), this._tips("Loading..."), this._clear(), window.clearTimeout(e);
          };
          this.delay ? e = window.setTimeout(s, this.delay) : s();
        });
      }), this.player.$video.addEventListener(
        "error",
        (t) => {
          this._change("video", (e) => {
            e.innerText = `请求视频数据中… [失败] ${t}`;
          });
        },
        { once: !0 }
      );
    }), this.player.on("error", (t) => {
      this._add("error", `${t}`);
    });
  }
  ready() {
    this._change("init", (t) => {
      t.innerText = "播放器初始化… [完成]";
    });
  }
  _clear() {
    this.$info.innerHTML = "";
  }
  _add(t, e) {
    const s = T("div", { class: `${r}-loadingmask-info-item` });
    s.dataset.id = t, s.append(e), this.$info.appendChild(s);
  }
  _change(t, e) {
    const s = this.$info.querySelector(`[data-id="${t}"]`);
    s && e(s);
  }
  _toggle(t) {
    this.$el.classList.toggle("is-show", t);
  }
  _tips(t) {
    this.$tips.innerHTML = "", t && this.$tips.append(t);
  }
};
xs.pluginName = "loadingMask";
let $e = xs;
const ks = class ks extends D {
  constructor(t) {
    super(t, T("div", { class: `${r}-videotitle` })), this.name = "title";
  }
  init() {
    this.player.on("videoChange", (t) => {
      console.log(t.title), this.$el.innerText = t.title || "";
    });
  }
};
ks.pluginName = "videoTitle";
let fe = ks;
const sr = () => p`
  <div class="${r}-header-mask"></div>
  <div class="${r}-header-main mpui-crystal">
    <div class="${r}-header-left"></div>
    <div class="${r}-header-center"></div>
    <div class="${r}-header-right"></div>
  </div>
`, Ss = class Ss extends b {
  constructor(t) {
    super(t), this.isHover = !1, this.player = t, this.$el = T("div", { class: `${r}-header` }), $(sr(), this.$el), this.$main = this.$el.querySelector(`.${r}-header-main`), this.$left = this.$el.querySelector(`.${r}-header-left`), this.$center = this.$el.querySelector(`.${r}-header-center`), this.$right = this.$el.querySelector(`.${r}-header-right`), this.player.$main.append(this.$el), this.inactiveHook = () => !this.isHover, this.mouseEnterHandler = () => {
      this.isHover = !0;
    }, this.mouseLeaveHandler = () => {
      this.isHover = !1;
    };
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook), this.$el.addEventListener("mouseenter", this.mouseEnterHandler), this.$el.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook), this.$el.removeEventListener("mouseenter", this.mouseEnterHandler), this.$el.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
};
Ss.pluginName = "header";
let ye = Ss;
const Es = class Es extends b {
  constructor(t) {
    super(t), this.handler = {}, this._status = !0, this.invoke = {}, this.$el = T("div", { class: `${r}-danmaku-wrap` }), this.player.$content.after(this.$el);
  }
  get status() {
    return this._status;
  }
  init() {
    this.player.define("danmaku", { value: this });
  }
  apply(t, e) {
    this.invoke = e.danmakuInvoke || {};
  }
  /**
   * 添加弹幕到弹幕池
   * @param dan 要添加的弹幕
   * @param play 是否播放超时弹幕
   * */
  add(t, e) {
    this.player.emit("danmaku:add", t, e || !1);
  }
  /**
   * 绘制一条弹幕
   * @param dm 要绘制的弹幕
   * */
  draw(t) {
    this.player.emit("danmaku:draw", t);
  }
  /**
   * 从弹幕池中移除弹幕
   * @param ids 要移除的弹幕id
   * */
  remove(t) {
    this.player.emit("danmaku:remove", t);
  }
  /** 清空弹幕池 */
  clear() {
    this.player.emit("danmaku:clear");
  }
  /** 切换弹幕显示 */
  toggle(t) {
    t ? (this._status = !0, this.player.emit("danmaku:on")) : t != null ? (this._status = !1, this.player.emit("danmaku:off")) : this.toggle(!this._status);
  }
  // 弹幕屏蔽
  /**
   * 弹幕类型屏蔽
   * @param type 类型
   * @param flag 设置是否屏蔽
   */
  filterType(t, e) {
    this.player.emit("danmaku:filter", t, e);
  }
};
Es.pluginName = "danmaku";
let be = Es;
var bt = /* @__PURE__ */ ((i) => (i[i.roll = 1] = "roll", i[i.bottom = 4] = "bottom", i[i.top = 5] = "top", i[i.reverse = 6] = "reverse", i[i.special = 7] = "special", i[i.advanced = 9] = "advanced", i))(bt || {});
class ir {
  constructor(t, e) {
    this.paused = !1, this.hidden = !1, this.time = 0, this.list = [], this.currentIndex = 0, this.measureContext = null, this.startDistance = 2, this.timeOffset = 0, this.baseSpeed = 100, this.baseDuration = 5, this.deltaSpeed = 2e-3, this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.container = t, this.fontScale = e.fontScale ?? 1, this.baseTrackHeight = 28, this.trackPadding = 6, this.speed = e.speed ?? 1, this.opacity = e.opacity ?? 1, this.limitArea = 1, this.overlap = !1, this.fontFamily = e.fontFamily ?? "SimHei", this.fontWeight = e.fontWeight ?? "bold", this.classPrefix = e.classPrefix ?? "meon", this.colorFilter = e.colorFilter || !1, this.trackFilter = Object.assign(
      {
        roll: !1,
        reverse: !1,
        top: !1,
        bottom: !1
      },
      e.trackFilter
    ), this.userFilter = e.userFilter || [], this.contentFilter = e.contentFilter || [], this.getTime = e.getTime, this.container.classList.add(`${this.classPrefix}-danmaku`), this.checkDanmaku();
  }
  play() {
    this.paused = !1, this.container.classList.remove("is-paused");
  }
  pause() {
    this.paused = !0, this.container.classList.add("is-paused");
  }
  /** 发生跳转 */
  seek() {
    this.clear(), this.time = this.getTime();
    const t = this.list.findIndex((e) => this.time <= e.time);
    this.currentIndex = t === -1 ? this.list.length : t;
  }
  /** 设置弹幕池 */
  setPool(t) {
    this.list = [...t], this.list.sort((s, n) => s.time - n.time);
    const e = this.list.findIndex((s) => this.time <= s.time);
    this.currentIndex = e === -1 ? this.list.length : e;
  }
  /** 重置弹幕池 */
  reset() {
    this.clear(), this.list = [], this.currentIndex = 0;
  }
  /** 弹幕池添加弹幕 */
  add(t, e) {
    t.forEach((s) => {
      const n = this.list.findIndex((a) => s.time <= a.time);
      this.list.splice(n === -1 ? this.list.length : n, 0, s), s.time < this.time && (this.currentIndex += 1, e && this.draw(t));
    });
  }
  /** 弹幕池移除弹幕 */
  remove(t) {
    const e = [
      ...this.container.querySelectorAll(`.${this.classPrefix}-danmaku-item`)
    ];
    t.forEach((s) => {
      const n = this.list.indexOf(s);
      if (n === -1)
        return;
      this.list.splice(n, 1), n < this.currentIndex && (this.currentIndex -= 1);
      const a = e.find((l) => l.dataset.id === s.id.toString());
      a && (a.innerHTML = "");
    });
  }
  /** 弹幕清屏 */
  clear(t) {
    if (t) {
      this.danmakuTracks[t] = [];
      return;
    }
    this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.container.innerHTML = "";
  }
  /** 检查弹幕是否需要进入弹幕池 */
  checkDanmaku() {
    if (this.list.length && !this.paused && !this.hidden) {
      let t = this.list[this.currentIndex];
      const e = [];
      for (this.time = this.getTime(); t && t.time < this.time; )
        this.checkTrackFilter(t) && this.checkColorFilter(t) && this.checkUserFilter(t) && this.checkContentFilter(t) && e.push(t), this.currentIndex += 1, t = this.list[this.currentIndex];
      this.draw(e);
    }
    window.requestAnimationFrame(() => {
      this.checkDanmaku();
    });
  }
  /** 设置弹幕类型过滤 */
  setTrackFilter(t, e) {
    this.trackFilter[t] = e, e && this.container.querySelectorAll(`.${this.classPrefix}-danmaku-${t}`).forEach((s) => {
      s.innerHTML = "";
    });
  }
  /** 检查弹幕类型过滤 */
  checkTrackFilter(t) {
    return !this.trackFilter[bt[t.mode]];
  }
  /** 设置弹幕颜色过滤 */
  setColorFilter(t) {
    this.colorFilter = t, t && this.container.querySelectorAll(
      `.${this.classPrefix}-danmaku-item`
    ).forEach((s) => {
      s.style.color !== "rgb(255, 255, 255)" && (s.innerHTML = "");
    });
  }
  /** 检查弹幕颜色过滤 */
  checkColorFilter(t) {
    return !this.colorFilter || t.color === 16777215;
  }
  /** 设置内容过滤 */
  setContentFilter(t, e) {
    const s = this.contentFilter.indexOf(t);
    if (e) {
      if (s > -1)
        return;
      this.contentFilter.push(t);
      const n = this.container.querySelectorAll(
        `.${this.classPrefix}-danmaku-item`
      );
      typeof t == "string" ? n.forEach((a) => {
        a.innerText.includes(t) && (a.innerHTML = "");
      }) : n.forEach((a) => {
        t.test(a.innerText) && (a.innerHTML = "");
      });
    } else
      s > -1 && this.contentFilter.splice(s, 1);
  }
  /** 检查弹幕内容过滤 */
  checkContentFilter(t) {
    for (const e of this.contentFilter)
      if (typeof e == "string") {
        if (t.content.search(e))
          return !1;
      } else if (e.test(t.content))
        return !1;
    return !0;
  }
  /** 设置用户过滤 */
  setUserFilter(t, e) {
    const s = this.userFilter.indexOf(t);
    if (e) {
      if (s > -1)
        return;
      this.userFilter.push(t), this.container.querySelectorAll(
        `.${this.classPrefix}-danmaku-item`
      ).forEach((a) => {
        a.dataset.user == t && (a.innerHTML = "");
      });
    } else
      s > -1 && this.userFilter.splice(s, 1);
  }
  /** 检查用户过滤 */
  checkUserFilter(t) {
    return this.userFilter.indexOf(t.user) == -1;
  }
  /** 绘制弹幕 */
  draw(t) {
    var k, A, L;
    const e = this.baseTrackHeight * this.fontScale, s = this.container.offsetWidth, n = this.container.offsetHeight * this.limitArea, a = Math.floor(n / e);
    this.trackHeights.roll.length !== a && (this.trackHeights.roll = new Array(a).fill(e)), this.trackHeights.reverse.length !== a && (this.trackHeights.reverse = new Array(a).fill(e)), this.trackHeights.top.length !== a && (this.trackHeights.top = new Array(a).fill(e)), this.trackHeights.bottom.length !== a && (this.trackHeights.bottom = new Array(a).fill(e));
    const l = (v) => {
      const m = this.container.getBoundingClientRect().right, d = v.getBoundingClientRect().right;
      return m - d;
    }, o = (v) => {
      const m = this.container.getBoundingClientRect().left;
      return v.getBoundingClientRect().left - m;
    }, h = (v) => this.baseSpeed * (1 + this.deltaSpeed * v) * this.speed, c = (v, m) => [
      ...this.container.querySelectorAll(`.${this.classPrefix}-danmaku-${v}`)
    ].filter((d) => d.dataset.track === `${m}`), u = (v, m, d) => {
      t:
        for (let g = 0; this.overlap || g < a; g++) {
          const E = c(m, g);
          let w = this.danmakuTracks[m][g];
          if (this.danmakuTracks[m][g] = E, w && w.length) {
            if (m === "roll") {
              const _ = s / h(d);
              w.length !== E.length && (w = E);
              for (const x of w) {
                const S = l(x) - 10;
                if (this.trackHeights[m][g] = parseInt(x.style.fontSize) + this.trackPadding, S <= s - _ * h(x.getBoundingClientRect().width) || S <= 0)
                  continue t;
              }
            } else if (m === "reverse") {
              const _ = s / h(d);
              w.length !== E.length && (w = E);
              for (const x of w) {
                const S = o(x) - 10;
                if (this.trackHeights[m][g] = parseInt(x.style.fontSize) + this.trackPadding, S <= s - _ * h(x.getBoundingClientRect().width) || S <= 0)
                  continue t;
              }
            } else
              continue t;
            return this.danmakuTracks[m][g].push(v), v.addEventListener("animationend", () => {
              var x, S;
              const _ = (x = this.danmakuTracks[m][g]) == null ? void 0 : x.indexOf(v);
              _ && ((S = this.danmakuTracks[m][g]) == null || S.splice(_, 1));
            }), g;
          } else
            return Array.isArray(this.danmakuTracks[m][g]) ? this.danmakuTracks[m][g].push(v) : this.danmakuTracks[m][g] = [v], v.addEventListener("animationend", () => {
              var x, S;
              const _ = (x = this.danmakuTracks[m][g]) == null ? void 0 : x.indexOf(v);
              _ && ((S = this.danmakuTracks[m][g]) == null || S.splice(_, 1));
            }), g;
        }
      return -1;
    }, f = document.createDocumentFragment();
    for (let v = 0; v < t.length; v++) {
      const m = t[v];
      if (m.mode >= 7)
        continue;
      const d = document.createElement("div");
      d.classList.add(`${this.classPrefix}-danmaku-item`), d.classList.add(`${this.classPrefix}-danmaku-${bt[m.mode]}`), d.innerHTML = `${m.content.replace(/(\\n)/g, `
`)}`, typeof m.color == "number" ? d.style.color = li(m.color) : d.style.color = m.color, d.style.opacity = this.opacity.toString(), d.style.fontSize = +m.size * this.fontScale + "px", m.fromHere && (d.style.border = "2px solid white"), d.addEventListener("animationend", () => {
        [...this.container.children].indexOf(d) > -1 && this.container.removeChild(d);
      });
      const g = this.measureTextWidth(
        m.content,
        `${this.fontWeight} ${+m.size * this.fontScale}px ${this.fontFamily}`
      );
      let E = bt[m.mode], w, _;
      switch (E) {
        case "roll":
        case "reverse":
          if (_ = u(d, E, g), w = _ % a, w >= 0) {
            const x = this.trackHeights[E].slice(0, a).reduce((H, N) => H + N, 0), S = this.trackHeights[E].slice(0, w).reduce((H, N) => H + N, 0) % x;
            if (S + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (k = this.danmakuTracks[E][v]) == null || k.pop();
              return;
            }
            const F = h(g), y = g + s + this.startDistance * 2;
            d.dataset.track = _.toString(), d.style.width = g + 1 + "px", d.style.top = S + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${y / F}s`), d.style.setProperty("--offset", `${s + this.startDistance}px`), d.style.setProperty("--translateX", `${-y}px`);
          }
          break;
        case "top":
          if (w = u(d, E, 0) % a, w >= 0) {
            const x = [], S = this.danmakuTracks.top;
            for (const y of S)
              x.push(...y);
            const F = x.map((y) => parseInt(y.style.fontSize) + this.trackPadding).slice(0, w).reduce((y, H) => y + H, 0);
            if (F + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (A = this.danmakuTracks[E][v]) == null || A.pop();
              return;
            }
            d.dataset.track = w.toString(), d.style.width = g + 1 + "px", d.style.marginLeft = `-${(g + 1) * 0.5}px`, d.style.top = F + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${this.baseDuration / this.speed}s`);
          }
          break;
        case "bottom":
          if (E = "bottom", w = u(d, E, 0) % a, w >= 0) {
            const x = [], S = this.danmakuTracks.bottom;
            for (const y of S)
              x.push(...y);
            const F = x.map((y) => parseInt(y.style.fontSize) + this.trackPadding).slice(0, w).reduce((y, H) => y + H, 0);
            if (F + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (L = this.danmakuTracks[E][v]) == null || L.pop();
              return;
            }
            d.dataset.track = w.toString(), d.style.width = g + 1 + "px", d.style.marginLeft = `-${(g + 1) * 0.5}px`, d.style.bottom = F + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${this.baseDuration / this.speed}s`);
          }
          break;
        default:
          w = -1, console.error(`无法处理的弹幕模式: ${m.mode}`);
      }
      w >= 0 && (d.dataset.id = m.id.toString(), d.dataset.user = m.user.toString(), this.container.appendChild(d));
    }
    return f;
  }
  /** 测量字体宽度 */
  measureTextWidth(t, e) {
    return this.measureContext || (this.measureContext = document.createElement("canvas").getContext("2d")), this.measureContext.font = e, this.measureContext.measureText(t).width;
  }
  /** 根据某一坐标捕获弹幕DOM */
  captureDanmakuDOM(t, e, s, n = !1) {
    const a = [], l = this.container.querySelectorAll(`.${this.classPrefix}-danmaku-item`);
    for (const o of l)
      if (o.innerHTML) {
        const h = o.getBoundingClientRect(), c = this.container.getBoundingClientRect(), u = h.left - c.left, f = h.right - c.left, k = h.top - c.top, A = h.bottom - c.top;
        if (t >= u - s && t <= f + s && e >= k - s && e <= A + s && (a.push(o), n))
          return a;
      }
    return a;
  }
  /** 根据某一坐标捕获弹幕 */
  captureDanmaku(t, e, s, n = !1) {
    const a = this.captureDanmakuDOM(t, e, s, n), l = [];
    for (const o of a) {
      const h = this.getDanmakuById(o.dataset.id);
      h && l.push(h);
    }
    return l;
  }
  /** 根据id获取弹幕 */
  getDanmakuById(t) {
    return this.list.find((e) => e.id.toString() === t.toString());
  }
  /** 显示弹幕 */
  show() {
    this.hidden = !1;
  }
  /** 隐藏弹幕 */
  hide() {
    this.hidden = !0, this.clear();
  }
}
const Ls = class Ls extends b {
  constructor(t) {
    super(t), this.$el = this.plugin.danmaku.$el.appendChild(
      T("div", { class: `${r}-rowdanmaku` })
    ), this.core = new ir(this.$el, {
      getTime: () => this.player.currentTime,
      classPrefix: r
    });
  }
  init() {
    this.player.on("play", () => {
      this.core.play();
    }), this.player.on("pause", () => {
      this.core.pause();
    }), this.player.on("seeking", () => {
      this.core.pause(), this.core.seek();
    }), this.player.on("seeked", () => {
      !this.player.paused && this.core.play();
    }), this.player.on("danmaku:filter", (t, e) => {
      switch (t) {
        case "top":
        case "bottom":
        case "roll":
        case "reverse":
          this.core.setTrackFilter(t, e);
          return;
        case "color":
          this.core.setColorFilter(e);
      }
    }), this.player.on("danmaku:add", (t, e) => {
      this.core.add(t, e);
    }), this.player.on("danmaku:remove", (t) => {
      this.core.remove(t);
    }), this.player.on("danmaku:draw", (t) => {
      this.core.draw([t]);
    }), this.player.on("danmaku:blockUser", (t, e) => {
      this.core.setUserFilter(t, e);
    }), this.player.on("danmaku:blockContent", (t, e) => {
      this.core.setContentFilter(t, e);
    }), this.player.on("danmaku:clear", () => {
      this.core.clear();
    }), this.player.on("danmaku:on", () => {
      this.core.show();
    }), this.player.on("danmaku:off", () => {
      this.core.hide();
    });
  }
  apply(t, e) {
    if (e.danmaku) {
      const { scale: s, font: n, bold: a, speed: l, opacity: o } = e.danmaku;
      s && this.setScale(s), n && this.setFont(n), a != null && this.setBold(a), l && this.setSpeed(l), o && this.setOpacity(o);
    }
  }
  // 弹幕播放属性设置
  /** 设置弹幕不透明度 */
  setOpacity(t) {
    this.core.opacity = t, this.player.emit("danmaku:opacityChange", t);
  }
  /** 设置弹幕速度 */
  setSpeed(t) {
    this.core.speed = t, this.player.emit("danmaku:speedChange", t);
  }
  /** 设置弹幕区域 */
  setArea(t) {
    this.core.limitArea = t, this.player.emit("danmaku:areaChange", t);
  }
  /** 设置弹幕大小 */
  setScale(t) {
    this.core.fontScale = t, this.player.emit("danmaku:scaleChange", t);
  }
  /** 设置弹幕字体 */
  setFont(t) {
    this.core.fontFamily = t, this.player.emit("danmaku:fontChange", t);
  }
  /** 设置弹幕加粗 */
  setBold(t) {
    this.core.fontWeight = t ? "bold" : "", this.player.emit("danmaku:boldChange", t);
  }
  /** 根据坐标捕获弹幕 */
  capture(t, e, s) {
    return this.core.captureDanmaku(t, e, s);
  }
};
Ls.pluginName = "danmakuEngine";
let we = Ls, ii = 1e3;
const ni = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
function nr() {
  const i = [], t = ni.length;
  for (let e = 0; e < 8; e++)
    i.push(ni[Math.floor(Math.random() * t)]);
  return ii++, i.join("") + `${ii}`;
}
const Ts = class Ts extends b {
  constructor() {
    super(...arguments), this.type = "", this.parser = rr;
  }
  get danmaku() {
    return this.player.danmaku;
  }
  init() {
    this.player.on("videoChange", (t) => {
      this.reload(t);
    });
  }
  apply(t, e) {
    var s;
    this.type = ((s = e.danmaku) == null ? void 0 : s.type) || "", this.parser = Object.assign(this.parser, e.danmakuParser);
  }
  /** 从响应中获取数据 */
  async getResponseData(t, e) {
    return e == "json" ? await t.json() : e == "xml" ? new DOMParser().parseFromString(await t.text(), "text/xml") : await t.text();
  }
  parse(t, e) {
    if (e) {
      const s = this.parser[e];
      if (!s)
        throw "未知弹幕格式";
      try {
        return s.parse(t);
      } catch {
        throw "无法正确解析弹幕格式";
      }
    } else
      return t;
  }
  /** 加载附加弹幕文件 */
  loadSource({ url: t, type: e }) {
    fetch(t).then((s) => this.getResponseData(s, this.parser[e].type)).then((s) => this.parse(s, e)).then((s) => {
      s && this.add(s), this.player.emit("danmaku:loaded", s, { url: t });
    }).catch((s) => {
      this.player.emit("danmaku:loadFailed", s, { url: t }), console.error(s);
    });
  }
  /** 加载弹幕 */
  load(t) {
    var e, s;
    (s = (e = this.danmaku.invoke).get) == null || s.call(e, t).then((n) => this.parse(n, this.type)).then((n) => {
      n && this.add(n), this.player.emit("danmaku:loaded", n, t);
    }).catch((n) => {
      this.player.emit("danmaku:loadFailed", n, t);
    });
  }
  add(t) {
    this.danmaku.add(t);
  }
  /** 重载弹幕 */
  async reload(t) {
    var e;
    this.danmaku.clear(), this.player.emit("danmaku:loading"), this.load(t), (e = t.danmaku) == null || e.forEach((s) => {
      this.loadSource(s);
    });
  }
};
Ts.pluginName = "danmakuLoader";
let xe = Ts;
const rr = {
  "bilibili-xml": {
    type: "xml",
    parse: (i) => {
      const t = [], e = i.childNodes, s = (n) => {
        var a;
        for (let l = 0; l < n.length; l++) {
          const o = n[l];
          if ((a = o == null ? void 0 : o.attributes) != null && a.length && l > 0) {
            const h = o.attributes[0].nodeValue.split(","), c = o.innerHTML;
            t.push([c, h]);
          } else
            o.childNodes.length > 0 && s(o.childNodes);
        }
      };
      return s(e), t.map(([n, a]) => ({
        time: +a[0],
        mode: +a[1],
        color: +a[3],
        user: a[6],
        content: n,
        size: +a[2],
        date: +a[4],
        id: +a[7]
      }));
    }
  },
  dplayer: {
    type: "json",
    parse: (i) => i.map((t, e) => ({
      time: t[0],
      mode: [1, 5, 4, 6][t[1]],
      color: t[2],
      user: t[3],
      content: t[4],
      size: 25,
      date: 0,
      id: nr()
    }))
  },
  mfuns: {
    type: "json",
    parse: (i) => i.map((t) => ({
      time: t[0],
      mode: t[1],
      color: t[2],
      user: t[3],
      content: t[4],
      size: t[5],
      date: t[6] > 1 ? t[6] : 0,
      id: t[7]
    }))
  }
}, As = class As extends b {
  get danmaku() {
    return this.player.danmaku;
  }
  get invoke() {
    var t;
    return ((t = this.player.danmaku) == null ? void 0 : t.invoke) || {};
  }
  /**
   * 发送弹幕
   * @param danmaku 要发送的弹幕
   * @return 操作结果
   * */
  async send(t) {
    if (!this.invoke.send)
      throw "发送失败";
    return await this.invoke.send(t, this.player.getVideoInfo()).then((e) => (this.danmaku.add(
      [
        Object.assign(
          {
            id: `send:${Date.now()}`,
            date: Math.floor(Date.now() / 1e3),
            user: this.player.userId || 0,
            fromHere: !0
          },
          t
        )
      ],
      !0
    ), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 举报弹幕
   * @param danmaku 要举报的弹幕
   * @return 操作结果
   * */
  async report(t) {
    if (!this.invoke.report)
      throw "操作失败";
    return await this.invoke.report(t, this.player.getVideoInfo()).then((e) => (this.danmaku.remove([t]), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 删除弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async delete(t) {
    if (!this.invoke.delete)
      throw "操作失败";
    return await this.invoke.delete(t, this.player.getVideoInfo()).then((e) => (this.danmaku.remove(t), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 删除自己发送的弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async recall(t) {
    if (!this.invoke.recall)
      throw "操作失败";
    return await this.invoke.recall(t, this.player.getVideoInfo()).then((e) => (this.danmaku.remove([t]), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 屏蔽用户
   * @param user 用户id
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockUser(t, e) {
    if (!this.invoke.blockUser)
      throw "操作失败";
    return await this.invoke.blockUser(t, e).then(() => {
      this.player.emit("danmaku:blockUser", t, e);
    }).catch((s) => {
      throw s;
    });
  }
  /**
   * 屏蔽关键词
   * @param content 关键词内容
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockContent(t, e) {
    if (!this.invoke.blockContent)
      throw "操作失败";
    return await this.invoke.blockContent(t, e).then((s) => {
      this.player.emit("danmaku:blockContent", t, e);
    }).catch((s) => {
      throw s;
    });
  }
};
As.pluginName = "danmakuOperate";
let ke = As;
const ar = p`
  <div class="${r}-controls-button ${r}-button-danmakutoggle is-on">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-danmaku-off"></i>
      <i class="mpicon-danmaku"></i>
    </div>
    <div class="mpui-tooltip">关闭弹幕</div>
  </div>
`, _s = class _s extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(ar, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "danmakuToggle", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("danmaku:on", () => {
      this._change(!0);
    }), this.player.on("danmaku:off", () => {
      this._change(!1);
    }), this.$icon.addEventListener("click", () => {
      var t;
      (t = this.plugin.danmaku) == null || t.toggle();
    });
  }
  /** 设置按钮状态 */
  _change(t) {
    this.$el.classList.toggle("is-on", t), this.$tooltip.innerText = t ? "关闭弹幕" : "开启弹幕";
  }
};
_s.pluginName = "buttonDanmakuToggle";
let Se = _s;
const lr = p`
  <div class="${r}-danmakubar">
    <div class="${r}-danmakubar-slot"></div>
    <div class="${r}-danmakubar-input-wrap">
      <div class="${r}-danmakubar-input-slot"></div>
      <input type="text" autocompleted="new-password" class="${r}-danmakubar-input" />
      <div class="${r}-danmakubar-status-loading">弹幕功能加载中...</div>
      <div class="${r}-danmakubar-status-login">需要<a>登录</a>后才能发送弹幕哦~</div>
      <div class="${r}-danmakubar-send">发送</div>
    </div>
  </div>
`, Fs = class Fs extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(lr, e), super(t, e.querySelector(`.${r}-danmakubar`)), this.name = "danmakuBar", this.danmakuColor = 16777215, this.danmakuMode = 1, this.danmakuSize = 25, this.coolDownTimer = 0, this.controller = this.plugin.controller, this.danmaku = this.plugin.danmaku, this.$send = this.$el.querySelector(`.${r}-danmakubar-send`), this.$input = this.$el.querySelector(`.${r}-danmakubar-input`), this.$slot = this.$el.querySelector(`.${r}-danmakubar-slot`), this.$inputSlot = this.$el.querySelector(`.${r}-danmakubar-input-slot`), this.$logina = this.$el.querySelector(`.${r}-danmakubar-status-login a`), this.$logina.onclick = () => {
      var s, n;
      return (n = (s = this.player).login) == null ? void 0 : n.call(s);
    }, this.player.on("videoChange", () => {
      this.setLoading(!0);
    }), this.player.on("loadeddata", () => {
      this.setLoading(!1);
    }), this.$input.addEventListener("keydown", (s) => {
      s.keyCode == W.Enter && this.send();
    }), this.$send.onclick = () => {
      this.send();
    };
  }
  /** 是否需要登录 */
  get loginRequired() {
    return this.$el.classList.contains("is-login");
  }
  apply(t, e) {
    var s, n;
    (s = e.danmakuBar) != null && s.loginRequired && this.setLoginRequired(!0), this.setPlaceHolder(((n = e.danmakuBar) == null ? void 0 : n.placeholder) || or);
  }
  setPlaceHolder(t) {
    this.$input.placeholder = t;
  }
  /** 执行弹幕发送操作 */
  send() {
    var t;
    !this.$input.value.trim() || this.coolDownTimer || ((t = this.plugin.danmakuOperate) == null || t.send(this.generateDanmaku()), this.$input.value = "");
  }
  /** 设置弹幕发送冷却 */
  setCoolDown(t) {
    this.coolDownTimer && window.clearInterval(this.coolDownTimer);
    let e = Math.round(t);
    this.$send.classList.add("is-disabled"), this.$send.innerText = `${e}秒`, this.coolDownTimer = window.setInterval(() => {
      e -= 1, e ? this.$send.innerText = `${e}秒` : (this.$send.innerText = "发送", this.$send.classList.remove("is-disabled"), window.clearInterval(this.coolDownTimer), this.coolDownTimer = 0);
    }, 1e3);
  }
  generateDanmaku() {
    return {
      time: this.player.currentTime,
      content: this.$input.value,
      mode: this.danmakuMode,
      color: this.danmakuColor,
      size: this.danmakuSize
    };
  }
  /** 设置登录限制 */
  setLoginRequired(t) {
    t ? this.$el.classList.add("is-login") : this.$el.classList.remove("is-login");
  }
  /** 设置加载状态 */
  setLoading(t) {
    t ? this.$el.classList.add("is-loading") : this.$el.classList.remove("is-loading");
  }
};
Fs.pluginName = "danmakuBar";
let Ee = Fs;
const or = "发条弹幕吧~", hr = p`
  <div class="${r}-controls-button ${r}-button-danmakusettings">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-danmaku-settings"></i>
    </div>
    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel ${r}-controls-panel-danmaku-settings">
        <div class="${r}-panel-row">
          <div class="${r}-row-label">类型屏蔽</div>
          <div class="${r}-danmaku-settings-filter-picker"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">不透明度</div>
          <div
            class="${r}-danmaku-settings-opacity-slider ${r}-slider-wrap"
          ></div>
          <div class="${r}-danmaku-settings-opacity-value ${r}-row-value"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">显示区域</div>
          <div class="${r}-danmaku-settings-area-slider ${r}-slider-wrap"></div>
          <div class="${r}-danmaku-settings-area-value ${r}-row-value"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">文字大小</div>
          <div class="${r}-danmaku-settings-size-slider ${r}-slider-wrap"></div>
          <div class="${r}-danmaku-settings-size-value ${r}-row-value"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">弹幕速度</div>
          <div
            class="${r}-danmaku-settings-speed-slider  ${r}-slider-wrap"
          ></div>
          <div class="${r}-danmaku-settings-speed-value ${r}-row-value"></div>
        </div>
      </div>
    </div>
  </div>
`, Hs = class Hs extends D {
  constructor(t) {
    const e = new DocumentFragment();
    $(hr, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "danmakuSettings", this.$icon = this.$(`.${r}-controls-button-icon`), this.$filterPicker = this.$(`.${r}-danmaku-settings-filter-picker`), this.$opacitySlider = this.$(`.${r}-danmaku-settings-opacity-slider`), this.$areaSlider = this.$(`.${r}-danmaku-settings-area-slider`), this.$sizeSlider = this.$(`.${r}-danmaku-settings-size-slider`), this.$speedSlider = this.$(`.${r}-danmaku-settings-speed-slider`), this.$opacityValue = this.$(`.${r}-danmaku-settings-opacity-value`), this.$areaValue = this.$(`.${r}-danmaku-settings-area-value`), this.$sizeValue = this.$(`.${r}-danmaku-settings-size-value`), this.$speedValue = this.$(`.${r}-danmaku-settings-speed-value`);
  }
  get danmaku() {
    return this.plugin.danmaku;
  }
  get danmakuEngine() {
    return this.plugin.danmakuEngine;
  }
  init() {
    this.pickerFilter = new pi({
      container: this.$filterPicker,
      value: [],
      list: [
        { value: "roll", label: "滚动" },
        { value: "top", label: "顶部" },
        { value: "bottom", label: "底部" },
        { value: "color", label: "彩色" },
        { value: "special", label: "特殊" }
      ],
      onToggle: (t, e) => {
        this.danmaku.filterType(t, e);
      }
    }), this.sliderOpacity = new nt({
      container: this.$opacitySlider,
      min: 10,
      max: 100,
      step: 1,
      value: 100,
      onDrag: (t) => {
        this.danmakuEngine.setOpacity(t / 100);
      },
      onChange: (t) => {
        this.$opacityValue.innerText = `${t}%`;
      }
    }), this.sliderArea = new nt({
      container: this.$areaSlider,
      min: 20,
      max: 105,
      step: 5,
      value: 25,
      onDrag: (t) => {
        const e = t / 100;
        this.danmakuEngine.setArea(e > 100 ? 0 : e);
      },
      onChange: (t) => {
        this.$areaValue.innerText = t < 100 ? `${t}%` : t == 100 ? "不重叠" : "无限";
      }
    }), this.sliderArea.drag(25), this.sliderSize = new nt({
      container: this.$sizeSlider,
      min: 50,
      max: 200,
      step: 1,
      value: 100,
      onDrag: (t) => {
        this.danmakuEngine.setScale(t / 100);
      },
      onChange: (t) => {
        this.$sizeValue.innerText = `${t}%`;
      }
    }), this.sliderSpeed = new nt({
      container: this.$speedSlider,
      min: 20,
      max: 180,
      step: 10,
      value: 100,
      divider: 5,
      onDrag: (t) => {
        this.danmakuEngine.setSpeed(t / 100);
      },
      onChange: (t) => {
        this.$speedValue.innerText = `${t}%`;
      }
    });
  }
};
Hs.pluginName = "buttonDanmakuSettings";
let Le = Hs;
const cr = (i, t, e, s) => p`
  ${i.map(
  (n) => p`
      <li
        class="${r}-contextmenu-danmaku-item"
        @click=${() => {
    e(n);
  }}
      >
        <div class="${r}-contextmenu-danmaku-item-content">${n.content}</div>
        <div class="${r}-contextmenu-danmaku-item-operate">
          ${t(n).map(
    ([a, l]) => p`<div
                class="${r}-contextmenu-danmaku-item-operate-btn"
                @click=${(o) => {
      o.stopPropagation(), l(n), s();
    }}
              >
                ${a}
              </div>`
  )}
        </div>
      </li>
    `
)}
`, dr = (i) => navigator.clipboard.writeText(i), Ms = class Ms extends b {
  constructor(t) {
    super(t), this.$el = T("ul", { class: `${r}-contextmenu-danmaku mpui-black` });
  }
  init() {
    this.player.on("contextMenuShow", (t, e) => {
      var n;
      const s = (n = this.plugin.danmakuEngine) == null ? void 0 : n.capture(t, e, 4);
      this.update(s || []);
    });
  }
  ready() {
    var t;
    (t = this.plugin.contextMenu) == null || t.$list.before(this.$el);
  }
  update(t) {
    var n;
    const e = (n = this.plugin.danmaku) == null ? void 0 : n.invoke, s = this.plugin.danmakuOperate;
    t != null && t.length ? this.$el.style.display = "" : this.$el.style.display = "none", $(
      cr(
        t,
        (a) => {
          const l = this.player.userId && a.user == this.player.userId;
          return [
            [
              "举报",
              (o) => {
                s == null || s.report(o);
              },
              !l && (e == null ? void 0 : e.report)
            ],
            [
              "屏蔽",
              (o) => {
                s == null || s.blockUser(o.user, !0);
              },
              !l && (e == null ? void 0 : e.blockUser)
            ],
            [
              "撤回",
              (o) => {
                s == null || s.recall(o);
              },
              l && (e == null ? void 0 : e.recall)
            ],
            [
              "复制",
              (o) => {
                dr(o.content);
              },
              !0
            ]
          ].filter((o) => o[2]);
        },
        (a) => {
          this.player.emit("danmaku:select", a);
        },
        () => {
          var a;
          (a = this.plugin.contextMenu) == null || a.hide();
        }
      ),
      this.$el
    );
  }
};
Ms.pluginName = "danmakuMenu";
let Te = Ms;
const ur = [
  be,
  we,
  xe,
  ke,
  Ee,
  Te
], pr = [Se, Le], mr = [...ur, ...pr];
class vr extends b {
  init() {
    this.player.on("videoChange", (t) => {
      var e;
      t.qualities && (this.compare && t.qualities.sort((s, n) => this.compare(s, n)), (e = this.player.quality) == null || e.updateList(t.qualities));
    }), this.player.hook.register("video.beforeLoad", (t) => {
      var n;
      const e = this.player.getVideoInfo().qualities;
      let s = {};
      !t.url && e && (s = this.prior ? this.prior(e) : e[0], t.url = s.url, t.type = s.type), (n = this.player.quality) == null || n.updateCurrent(s);
    });
  }
}
const Ds = class Ds extends b {
  constructor(t) {
    super(t);
  }
  apply(t, e) {
    var s;
    this._getFlvjs = (s = e.externals) == null ? void 0 : s.flvjs, this.player.loader.register("flv", this);
  }
  check(t) {
    return t.type == "flv";
  }
  create(t, e) {
    const { type: s, url: n, live: a, play: l, time: o } = t, h = {
      kernel: null,
      type: s || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        var c;
        (c = this.kernel) == null || c.destroy(), this.kernel = null;
      }
    };
    return this.initFlv().then(() => {
      const c = this.flvjs.createPlayer({
        type: s || "flv",
        url: n,
        cors: !0,
        isLive: a
      });
      h.kernel = c;
      const u = o === !0 ? this.player.currentTime : o === !1 ? 0 : o;
      c.attachMediaElement(e), c.load(), u && (c.currentTime = u), l && c.play();
    }), h;
  }
  /** 初始化flvjs */
  async initFlv() {
    var t;
    if (this._supported != !0) {
      if (this._supported == !1)
        throw new Error("播放器不支持flv加载");
      if (this.flvjs ?? (this.flvjs = window.flvjs), !this.flvjs)
        if (this._getFlvjs) {
          if (this.flvjs = await this._getFlvjs().catch((e) => {
            throw new Error(`flv.js初始化失败: ${e}`);
          }) || void 0, this._supported = ((t = this.flvjs) == null ? void 0 : t.isSupported()) || !1, this._supported == !1)
            throw new Error("播放器不支持flv加载");
        } else
          throw new Error("flv.js初始化失败: 播放器未引入flv.js");
    }
  }
};
Ds.pluginName = "flvLoader";
let Ae = Ds;
const Ps = class Ps extends b {
  constructor(t) {
    super(t);
  }
  apply(t, e) {
    var s;
    this._getHlsjs = (s = e.externals) == null ? void 0 : s.hlsjs, this.player.loader.register("hls", this);
  }
  check(t) {
    return t.type == "hls" || t.type == "m3u8";
  }
  create(t, e) {
    const { type: s, url: n, live: a, play: l, time: o } = t, h = {
      kernel: null,
      type: s || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        var c;
        (c = this.kernel) == null || c.destroy(), this.kernel = null;
      }
    };
    return this.initHls().then(() => {
      const c = new this.Hls();
      h.kernel = c;
      const u = o === !0 ? this.player.currentTime : o;
      return c.attachMedia(e), c.on(this.Hls.Events.MEDIA_ATTACHED, () => {
        c.loadSource(n);
      }), this.player.once("loadedmetadata", () => {
        u && this.player.seek(u), l && this.player.play();
      }), !0;
    }), h;
  }
  /** 初始化hls.js */
  async initHls() {
    var t;
    if (this._supported != !0) {
      if (this._supported == !1)
        throw new Error("播放器不支持hls加载");
      if (this.Hls ?? (this.Hls = window.Hls), !this.Hls) {
        if (!this._getHlsjs)
          this.throw(new Error("hls.js初始化失败: 播放器未引入hls.js"));
        else if (this.Hls = await this._getHlsjs().catch((e) => {
          this.throw(new Error(`hls.js初始化失败: ${e}`));
        }) || void 0, this._supported = ((t = this.Hls) == null ? void 0 : t.isSupported()) || !1, this._supported == !1)
          throw new Error("播放器不支持hls加载");
      }
    }
  }
};
Ps.pluginName = "hlsLoader";
let _e = Ps;
const Rs = class Rs extends b {
  constructor(t) {
    super(t);
  }
  apply(t, e) {
    var s;
    this._getDashjs = (s = e.externals) == null ? void 0 : s.dashjs, this.player.loader.register("dash", this);
  }
  check(t) {
    return t.type == "dash" || t.type == "m3u8";
  }
  create(t, e) {
    const { type: s, url: n, live: a, play: l, time: o } = t, h = {
      kernel: null,
      type: s || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        var c;
        (c = this.kernel) == null || c.destroy(), this.kernel = null;
      }
    };
    return this.initDash().then(() => {
      const c = this.dashjs.MediaPlayer().create();
      h.kernel = c;
      const u = o === !0 ? this.player.currentTime : o === !1 ? 0 : o;
      c.initialize(e, n, l, u);
    }), h;
  }
  /** 初始化dash.js */
  async initDash() {
    var t;
    if (this._supported != !0) {
      if (this._supported == !1)
        throw new Error("播放器不支持dash加载");
      if (this.dashjs ?? (this.dashjs = window.dashjs), !this.dashjs)
        if (this._getDashjs) {
          if (this.dashjs = await this._getDashjs().catch((e) => {
            throw new Error(`dash.js初始化失败: ${e}`);
          }) || void 0, this._supported = ((t = this.dashjs) == null ? void 0 : t.supportsMediaSource()) || !1, this._supported == !1)
            throw new Error("播放器不支持dash加载");
        } else
          throw new Error("dash.js初始化失败: 播放器未引入dash.js");
    }
  }
};
Rs.pluginName = "dashLoader";
let Fe = Rs;
var O;
const Ns = class Ns extends b {
  constructor(e) {
    super(e);
    z(this, O, null);
    const s = window.ResizeObserver || bi;
    s && (this.observer = new s(([n]) => {
      const { width: a, height: l } = n.contentRect;
      this._keepRatio(a, l);
    }));
  }
  apply(e, s) {
    M(this, O, this._parse(s.aspectRatio || ""));
  }
  init() {
    this.player.define("aspectRatio", { get: () => this._stringify(R(this, O)) }), this.player.define("setAspectRatio", (e) => {
      this.set(e);
    });
  }
  mounted() {
    var e;
    console.log("233333311111111"), (e = this.observer) == null || e.observe(this.player.$area), this._setRatio(R(this, O));
  }
  set(e) {
    const s = this._parse(e);
    M(this, O, s), this._setRatio(s), this.player.emit("aspectRatioChange", this._stringify(s));
  }
  /** 设置视频比例 */
  _setRatio(e) {
    const s = this.player.$video;
    if (s.style.width = "", s.style.height = "", e) {
      const [n, a] = e;
      s.style.aspectRatio = `${n}/${a}`, s.style.objectFit = "fill";
      const { width: l, height: o } = s.getBoundingClientRect(), { width: h, height: c } = this.player.$area.getBoundingClientRect();
      l == h && o == c && this._rescale(l, o, n, a);
    } else
      s.style.aspectRatio = "", s.style.objectFit = "";
  }
  /** 保持视频比例 */
  _keepRatio(e, s) {
    if (R(this, O)) {
      const n = this.player.$video;
      n.style.width = "", n.style.height = "";
      const [a, l] = R(this, O), { width: o, height: h } = n.getBoundingClientRect();
      console.log(`${o} x ${h} -- ${e} x ${s}`), Math.abs(o - e) < 1 && Math.abs(h - s) < 1 && this._rescale(e, s, a, l);
    }
  }
  /** 根据当前视频宽高重新维持视频比例 */
  _rescale(e, s, n, a) {
    const l = n * s, o = a * e, h = this.player.$video;
    l < o ? (h.style.width = `${l / o * 100}%`, h.style.height = "100%") : (h.style.width = "100%", h.style.height = `${o / l * 100}%`);
  }
  _parse(e) {
    const [s, n] = e.split("/").map((a) => parseFloat(a));
    return s && n && isFinite(s) && isFinite(n) ? [s, n] : null;
  }
  _stringify(e) {
    return e ? e.join("/") : "";
  }
};
O = new WeakMap(), Ns.pluginName = "aspectRatio";
let He = Ns;
const gr = [
  ve,
  vr,
  ye,
  ce,
  de,
  Dt,
  He,
  oe,
  le,
  he,
  ge,
  $e
], $r = [pe, me, fe], fr = [Rt, Pt, ue], yr = [Ae, _e, Fe];
class Sr extends at {
  constructor(t) {
    super({
      autoPart: !0,
      controller: {
        controls: {
          top: ["progress"],
          left: ["prev", "play", "next", "time"],
          right: ["quality", "part", "volume", "settings", "pip", "fullscreen"]
        }
      },
      side: {
        panels: ["partList"]
      },
      ...t,
      plugins: [
        ...mr,
        ...Kn,
        ...gr,
        ...fr,
        ...$r,
        ...yr,
        ...t.plugins || []
      ]
    });
  }
}
export {
  b as BasePlugin,
  kr as Components,
  D as ControlsPlugin,
  xr as MenuPlugin,
  mt as PanelPlugin,
  Sr as Player,
  Pe as UIPlugin,
  wr as Utils,
  r as classPrefix,
  _i as developers,
  Ti as gitHash,
  Ai as repositoryLink,
  Li as version
};
//# sourceMappingURL=mfuns-player.es.js.map
(function(){"use strict";try{if(typeof document<"u"){var A=document.createElement("style");A.appendChild(document.createTextNode(`@charset "UTF-8";@font-face{font-family:mfunsPlayerIcon;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%20%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3cmetadata%3eGenerated%20by%20IcoMoon%3c/metadata%3e%3cdefs%3e%3cfont%20id='mfunsPlayerIcon'%20horiz-adv-x='1024'%3e%3cfont-face%20units-per-em='1024'%20ascent='960'%20descent='-64'%20/%3e%3cmissing-glyph%20horiz-adv-x='1024'%20/%3e%3cglyph%20unicode='&%23x20;'%20horiz-adv-x='512'%20d=''%20/%3e%3cglyph%20unicode='&%23xe900;'%20glyph-name='play'%20d='M213.398%20860.235c-0.004%200-0.008%200-0.013%200-23.593%200-42.719-19.126-42.719-42.719%200-0.004%200-0.008%200-0.012v0.001-739.009c0-0.045%200-0.098%200-0.151%200-23.516%2019.064-42.58%2042.58-42.58%207.892%200%2015.282%202.147%2021.619%205.889l-0.198-0.108%20640%20369.504c12.843%207.515%2021.333%2021.241%2021.333%2036.951s-8.49%2029.436-21.132%2036.842l-0.201%200.109-640%20369.504c-6.092%203.619-13.428%205.764-21.264%205.78h-0.005z'%20/%3e%3cglyph%20unicode='&%23xe901;'%20glyph-name='pause'%20d='M725.333%20853.333h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-725.333c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v725.333c0%2023.564%2019.103%2042.667%2042.667%2042.667zM213.333%20853.333h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-725.333c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v725.333c0%2023.564%2019.103%2042.667%2042.667%2042.667z'%20/%3e%3cglyph%20unicode='&%23xe902;'%20glyph-name='prev'%20d='M853.13%20845.42c0.053%200%200.116%200%200.179%200%2023.577%200%2042.691-19.113%2042.691-42.691%200-0.020%200-0.040%200-0.060v0.003-709.345c0-0.016%200-0.035%200-0.054%200-23.579-19.115-42.693-42.693-42.693-0.062%200-0.124%200-0.186%200h0.010c-10.061%200.016-19.29%203.568-26.513%209.479l0.075-0.059-443.669%20354.673c-9.804%207.885-16.025%2019.879-16.025%2033.327s6.221%2025.442%2015.943%2033.262l0.083%200.064%20443.669%20354.673c7.149%205.852%2016.377%209.403%2026.435%209.42h0.004zM170.666%20832h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-682.666c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v682.666c0%2023.564%2019.103%2042.667%2042.667%2042.667z'%20/%3e%3cglyph%20unicode='&%23xe903;'%20glyph-name='next'%20d='M170.87%20845.42c-0.053%200-0.116%200-0.179%200-23.577%200-42.691-19.113-42.691-42.691%200-0.020%200-0.040%200-0.060v0.003-709.345c0-0.016%200-0.035%200-0.054%200-23.579%2019.115-42.693%2042.693-42.693%200.062%200%200.124%200%200.186%200h-0.010c10.061%200.016%2019.29%203.568%2026.513%209.479l-0.075-0.059%20443.669%20354.673c9.804%207.885%2016.025%2019.879%2016.025%2033.327s-6.221%2025.442-15.943%2033.262l-0.083%200.064-443.669%20354.673c-7.149%205.852-16.377%209.403-26.435%209.42h-0.004zM768%20832h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-682.667c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v682.667c0%2023.564%2019.103%2042.667%2042.667%2042.667z'%20/%3e%3cglyph%20unicode='&%23xe904;'%20glyph-name='repeat'%20d='M213.333%20704h597.333v-238.325l-42.667%2042.667-60.342-60.342%20145.675-145.675%20145.675%20145.675-60.342%2060.342-42.667-42.667v280.992c0%2023.564-19.103%2042.667-42.667%2042.667v0h-682.667c-23.564%200-42.667-19.103-42.667-42.667v0-85.333h85.333zM810.667%20192h-597.333v238.325l42.667-42.667%2060.342%2060.342-145.675%20145.675-145.675-145.675%2060.342-60.342%2042.667%2042.667v-280.992c0-23.564%2019.103-42.667%2042.667-42.667v0h682.667c23.564%200%2042.667%2019.103%2042.667%2042.667v0%2085.333h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe905;'%20glyph-name='repeat-off'%20d='M938.667%20508.342l-42.667-42.667v280.992c0%2023.564-19.103%2042.667-42.667%2042.667v0h-469.333v-85.333h426.667v-238.325l-42.667%2042.667-60.342-60.342%20145.675-145.675%20145.675%20145.675zM213.333%20192v238.325l42.667-42.667%2060.342%2060.342-145.675%20145.675-145.675-145.675%2060.342-60.342%2042.667%2042.667v-280.992c0-23.564%2019.103-42.667%2042.667-42.667v0h469.333v85.333zM140.496%20759.162l60.337%2060.338%20682.671-682.662-60.337-60.338-682.671%20682.662z'%20/%3e%3cglyph%20unicode='&%23xe90c;'%20glyph-name='volume-off'%20d='M285.781%20661.333h-200.448c-23.561-0.009-42.658-19.106-42.667-42.666v-341.334c0.009-23.561%2019.106-42.658%2042.666-42.667h200.449l311.552-207.701v842.069zM512%20186.368l-200.448%20133.632h-183.552v256h183.552l200.448%20133.632zM968.832%20545.826l-60.331%2060.348-97.835-97.835-97.835%2097.835-60.331-60.348%2097.826-97.826-97.826-97.835%2060.331-60.331%2097.835%2097.835%2097.835-97.835%2060.331%2060.331-97.826%2097.835%2097.826%2097.826z'%20/%3e%3cglyph%20unicode='&%23xe90f;'%20glyph-name='volume'%20d='M285.781%20661.333h-200.448c-23.561-0.009-42.658-19.106-42.667-42.666v-341.334c0.009-23.561%2019.106-42.658%2042.666-42.667h200.449l311.552-207.701v842.069zM512%20186.368l-200.448%20133.632h-183.552v256h183.552l200.448%20133.632zM725.333%20448c0-0.040%200-0.087%200-0.134%200-58.859-23.911-112.133-62.549-150.639l-0.006-0.006%2060.41-60.41c54.048%2054.048%2087.478%20128.715%2087.478%20211.189s-33.429%20157.141-87.478%20211.189v0l-60.41-60.41c38.644-38.512%2062.555-91.786%2062.555-150.645%200-0.047%200-0.094%200-0.141v0.007zM896%20448c0-0.071%200-0.156%200-0.241%200-105.946-43.039-201.839-112.588-271.15l-0.011-0.011%2060.467-60.467c84.933%2084.933%20137.465%20202.266%20137.465%20331.869s-52.532%20246.936-137.465%20331.869v0l-60.467-60.467c69.559-69.321%20112.598-165.215%20112.598-271.16%200-0.085%200-0.17%200-0.254v0.013z'%20/%3e%3cglyph%20unicode='&%23xe910;'%20glyph-name='widescreen'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20302.327l-145.673%20145.673%20145.673%20145.673%2060.339-60.339-85.333-85.333%2085.333-85.333-60.339-60.339zM640%20302.327l-60.339%2060.339%2085.333%2085.333-85.333%2085.333%2060.339%2060.339%20145.673-145.673-145.673-145.673z'%20/%3e%3cglyph%20unicode='&%23xe911;'%20glyph-name='widescreen-exit'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM298.667%20302.327l145.673%20145.673-145.673%20145.673-60.339-60.339%2085.333-85.333-85.333-85.333%2060.339-60.339zM725.333%20302.327l60.339%2060.339-85.333%2085.333%2085.333%2085.333-60.339%2060.339-145.673-145.673%20145.673-145.673z'%20/%3e%3cglyph%20unicode='&%23xe912;'%20glyph-name='web-fullscreen'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM341.333%20448v128h128v85.333h-213.333v-213.333h85.333zM682.667%20448v-128h-128v-85.333h213.333v213.333h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe913;'%20glyph-name='web-fullscreen-exit'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20661.333v-85.333h-128v-85.333h213.333v170.667h-85.333zM640%20234.667v85.333h128v85.333h-213.333v-170.667h85.333z'%20/%3e%3cglyph%20unicode='&%23xe914;'%20glyph-name='picture-in-picture'%20d='M426.667%20149.333h-256v597.333h682.667v-256h85.333v298.667c0%2023.564-19.103%2042.667-42.667%2042.667v0h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h298.667zM853.333%20320v-170.667h-256v170.667h256zM896%20405.333h-341.333c-23.564%200-42.667-19.103-42.667-42.667v0-256c0-23.564%2019.103-42.667%2042.667-42.667v0h341.333c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20256c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20661.333v-67.661l-97.826%2097.835-60.348-60.348%2097.835-97.826h-67.661v-85.333h213.333v213.333h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe915;'%20glyph-name='picture-in-picture-exit'%20d='M426.667%20149.333h-256v597.333h682.667v-256h85.333v298.667c0%2023.564-19.103%2042.667-42.667%2042.667v0h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h298.667zM853.333%20320v-170.667h-256v170.667h256zM896%20405.333h-341.333c-23.564%200-42.667-19.103-42.667-42.667v0-256c0-23.564%2019.103-42.667%2042.667-42.667v0h341.333c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20256c0%2023.564-19.103%2042.667-42.667%2042.667v0zM341.333%20448v67.661l97.826-97.835%2060.348%2060.348-97.835%2097.826h67.661v85.333h-213.333v-213.333h85.333z'%20/%3e%3cglyph%20unicode='&%23xe91e;'%20glyph-name='fullscreen'%20d='M170.667%20576v170.667h170.667v85.333h-256v-256h85.333zM682.667%20746.667h170.667v-170.667h85.333v256h-256v-85.333zM341.333%20149.333h-170.667v170.667h-85.333v-256h256v85.333zM853.333%20320v-170.667h-170.667v-85.333h256v256h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe91f;'%20glyph-name='fullscreen-exit'%20d='M256%20832v-170.667h-170.667v-85.333h256v256h-85.333zM938.667%20661.333h-170.667v170.667h-85.333v-256h256v85.333zM85.333%20234.667h170.667v-170.667h85.333v256h-256v-85.333zM768%2064v170.667h170.667v85.333h-256v-256h85.333z'%20/%3e%3cglyph%20unicode='&%23xe920;'%20glyph-name='danmaku'%20d='M896%20832h-768c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h623.957c23.561%200.009%2042.658%2019.106%2042.667%2042.666v597.334c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-0.001zM853.333%20234.667h-611.328l-71.339-57.088v569.088h682.667zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333zM597.333%20490.667h170.667v-85.333h-170.667v85.333z'%20/%3e%3cglyph%20unicode='&%23xe921;'%20glyph-name='danmaku-off'%20d='M512%20234.667h-269.995l-71.339-57.088v569.088h682.667v-256h85.333v298.667c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-768.001c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h239.957zM768%20448c-117.821%200-213.333-95.513-213.333-213.333s95.513-213.333%20213.333-213.333c117.821%200%20213.333%2095.513%20213.333%20213.333v0c0%20117.821-95.513%20213.333-213.333%20213.333v0zM896%20234.667c-0.023-20.025-4.677-38.957-12.948-55.791l0.332%200.747-170.428%20170.428c16.18%207.96%2035.219%2012.616%2055.345%2012.616%2070.527%200%20127.7-57.173%20127.7-127.7%200-0.106%200-0.211%200-0.317v0.016zM640%20234.667c0.023%2020.025%204.677%2038.957%2012.948%2055.791l-0.332-0.747%20170.428-170.428c-16.18-7.961-35.219-12.617-55.346-12.617-70.526%200-127.698%2057.172-127.698%20127.698%200%200.106%200%200.212%200%200.319v-0.016zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333z'%20/%3e%3cglyph%20unicode='&%23xe923;'%20glyph-name='danmaku-settings'%20d='M512%20234.667h-269.995l-71.339-57.088v569.088h682.667v-256h85.333v298.667c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-768.001c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h239.957zM938.667%20234.667c-0.047%2016.253-2.363%2031.946-6.646%2046.804l0.297-1.203%2041.767%2024.115-42.667%2073.901-41.703-24.078c-21.129%2021.473-47.877%2037.355-77.862%2045.267l-1.187%200.266v48.261h-85.333v-48.261c-31.172-8.178-57.92-24.060-79.027-45.51l-0.022-0.022-41.703%2024.078-42.667-73.901%2041.768-24.115c-4.030-13.664-6.349-29.362-6.349-45.602s2.319-31.938%206.643-46.781l-0.294%201.18-41.768-24.115%2042.667-73.901%2041.703%2024.078c21.129-21.473%2047.877-37.355%2077.862-45.267l1.187-0.266v-48.261h85.333v48.261c31.172%208.177%2057.92%2024.060%2079.027%2045.51l0.022%200.023%2041.703-24.078%2042.667%2073.901-41.768%2024.115c3.986%2013.656%206.302%2029.349%206.349%2045.575v0.026zM768%20149.333c-47.128%200-85.333%2038.205-85.333%2085.333s38.205%2085.333%2085.333%2085.333c47.128%200%2085.333-38.205%2085.333-85.333v0c-0.055-47.106-38.227-85.279-85.329-85.333h-0.005zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333z'%20/%3e%3cglyph%20unicode='&%23xe928;'%20glyph-name='advanced-danmaku'%20d='M469.333%20234.667h-227.328l-71.339-57.088v569.088h682.667v-256h85.333v298.667c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-768.001c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h197.291zM768%20329.788c29.345-34.657%2060.463-65.776%2093.965-94.166l1.156-0.955c-34.658-29.345-65.776-60.463-94.167-93.966l-0.954-1.155c-29.345%2034.657-60.463%2065.776-93.965%2094.166l-1.156%200.955c34.658%2029.346%2065.776%2060.464%2094.167%2093.967l0.954%201.154zM768%20476.026v0c-60.461-99.627-141.732-180.898-238.245-239.6l-3.114-1.759c99.627-60.462%20180.898-141.733%20239.6-238.245l1.759-3.113c60.462%2099.627%20141.733%20180.898%20238.245%20239.6l3.113%201.759c-99.627%2060.462-180.898%20141.733-239.6%20238.245l-1.759%203.113zM768-6.692v0zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333z'%20/%3e%3cglyph%20unicode='&%23xe92a;'%20glyph-name='text'%20d='M170.667%20149.333h682.667v-85.333h-682.667v85.333zM772.508%20194.25l76.317%2038.167-298.667%20597.329h-76.321l-298.667-597.329%2076.325-38.167%2073.541%20147.083h373.929zM367.703%20426.667l144.297%20288.596%20144.299-288.596z'%20/%3e%3cglyph%20unicode='&%23xe92f;'%20glyph-name='send-danmaku'%20d='M904.88%20466.672l-745.228%20411.837c-2.985%201.694-6.557%202.692-10.363%202.692-11.758%200-21.289-9.532-21.289-21.289%200-0.026%200-0.053%200-0.079v0.004-823.673c0-0.022%200-0.048%200-0.074%200-11.758%209.532-21.289%2021.289-21.289%203.805%200%207.377%200.998%2010.469%202.748l-0.106-0.055%20745.228%20411.836c6.617%203.708%2011.015%2010.676%2011.015%2018.672s-4.398%2014.963-10.907%2018.616l-0.107%200.055zM213.333%20144.655v260.678h256v85.333h-256v260.679l548.91-303.345z'%20/%3e%3cglyph%20unicode='&%23xe930;'%20glyph-name='settings'%20d='M405.163%20861.099c0.11-1.989%200.173-4.317%200.173-6.659%200-70.685-57.302-127.987-127.987-127.987-25.858%200-49.924%207.668-70.050%2020.854l0.487-0.3c-49.397-50.063-86.486-112.394-106.279-182.005l-0.729-2.997c41.806-21.62%2069.888-64.533%2069.888-114.005s-28.082-92.386-69.175-113.67l-0.713-0.336c20.522-72.609%2057.611-134.94%20107.054-185.050l-0.046%200.047c19.639%2012.887%2043.705%2020.555%2069.563%2020.555%2070.685%200%20127.987-57.302%20127.987-127.987%200-2.342-0.063-4.67-0.187-6.981l0.014%200.322c32.061-8.618%2068.871-13.568%20106.837-13.568s74.776%204.95%20109.819%2014.24l-2.982-0.672c-0.11%201.989-0.173%204.316-0.173%206.658%200%2070.685%2057.302%20127.987%20127.987%20127.987%2025.858%200%2049.924-7.668%2070.050-20.854l-0.487%200.3c49.397%2050.064%2086.485%20112.394%20106.279%20182.006l0.729%202.997c-41.806%2021.62-69.888%2064.533-69.888%20114.005s28.082%2092.386%2069.175%20113.67l0.713%200.336c-20.523%2072.609-57.611%20134.94-107.054%20185.050l0.046-0.047c-19.638-12.886-43.705-20.554-69.562-20.554-70.685%200-127.987%2057.302-127.987%20127.987%200%202.342%200.063%204.669%200.187%206.98l-0.014-0.322c-32.061%208.618-68.871%2013.568-106.837%2013.568s-74.776-4.95-109.82-14.241l2.982%200.672zM544%20787.797c28.86-85.883%20108.63-146.651%20202.592-146.651%2015.406%200%2030.43%201.634%2044.909%204.737l-1.4-0.251c11.636-16.023%2022.368-34.224%2031.316-53.425l0.855-2.042c-33.68-37.56-54.272-87.458-54.272-142.165s20.592-104.606%2054.449-142.366l-0.177%200.2c-9.803-21.242-20.535-39.444-32.837-56.434l0.667%200.967c-13.079%202.852-28.103%204.485-43.509%204.485-93.963%200-173.732-60.768-202.153-145.147l-0.439-1.504c-10.496-1.024-21.248-1.536-32-1.536s-21.504%200.512-32%201.536c-28.86%2085.883-108.63%20146.651-202.592%20146.651-15.406%200-30.43-1.634-44.909-4.737l1.4%200.251c-11.636%2016.023-22.368%2034.224-31.316%2053.425l-0.855%202.042c33.68%2037.56%2054.272%2087.458%2054.272%20142.165s-20.592%20104.606-54.449%20142.366l0.177-0.2c9.803%2021.242%2020.535%2039.444%2032.837%2056.434l-0.667-0.967c13.079-2.852%2028.103-4.485%2043.509-4.485%2093.963%200%20173.732%2060.768%20202.153%20145.147l0.44%201.504c10.496%201.024%2021.248%201.536%2032%201.536s21.504-0.512%2032-1.536zM512%20533.333c47.128%200%2085.333-38.205%2085.333-85.333s-38.205-85.333-85.333-85.333c-47.128%200-85.333%2038.205-85.333%2085.333v0c0.055%2047.106%2038.227%2085.278%2085.328%2085.333h0.005zM512%20618.667c-94.257%200-170.667-76.41-170.667-170.667s76.41-170.667%20170.667-170.667c94.257%200%20170.667%2076.41%20170.667%20170.667v0c0%2094.257-76.41%20170.667-170.667%20170.667v0z'%20/%3e%3cglyph%20unicode='&%23xe931;'%20glyph-name='caption'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20362.667c-0.017%200-0.037%200-0.057%200-47.128%200-85.333%2038.205-85.333%2085.333s38.205%2085.333%2085.333%2085.333c23.578%200%2044.923-9.563%2060.367-25.021l0.001-0.001%2060.368%2060.368c-30.885%2030.885-73.551%2049.987-120.679%2049.987-94.257%200-170.667-76.41-170.667-170.667s76.41-170.667%20170.667-170.667c47.128%200%2089.795%2019.103%20120.68%2049.987v0l-60.368%2060.368c-15.405-15.458-36.715-25.022-60.258-25.022-0.019%200-0.037%200-0.056%200h0.003zM682.667%20362.667c-0.017%200-0.037%200-0.057%200-47.128%200-85.333%2038.205-85.333%2085.333s38.205%2085.333%2085.333%2085.333c23.578%200%2044.923-9.563%2060.367-25.021l0.001-0.001%2060.368%2060.368c-30.885%2030.885-73.551%2049.987-120.679%2049.987-94.257%200-170.667-76.41-170.667-170.667s76.41-170.667%20170.667-170.667c47.128%200%2089.795%2019.103%20120.68%2049.987v0l-60.368%2060.368c-15.405-15.458-36.715-25.022-60.258-25.022-0.019%200-0.037%200-0.056%200h0.003z'%20/%3e%3cglyph%20unicode='&%23xe940;'%20glyph-name='left-arrow'%20d='M512%20892.339l60.339-60.339-341.333-341.333h707.661v-85.333h-707.661l341.333-341.333-60.339-60.339-444.339%20444.339%20444.339%20444.339z'%20/%3e%3cglyph%20unicode='&%23xe941;'%20glyph-name='right-arrow'%20d='M512%20892.339l-60.339-60.339%20341.333-341.333h-707.661v-85.333h707.661l-341.333-341.333%2060.339-60.339%20444.339%20444.339-444.339%20444.339z'%20/%3e%3cglyph%20unicode='&%23xe945;'%20glyph-name='close'%20d='M883.499%20759.159l-60.331%2060.339-311.168-311.159-311.159%20311.159-60.339-60.339%20311.159-311.159-311.159-311.168%2060.339-60.331%20311.159%20311.159%20311.168-311.159%2060.331%2060.331-311.159%20311.168%20311.159%20311.159z'%20/%3e%3c/font%3e%3c/defs%3e%3c/svg%3e") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=mpicon-],[class*=" mpicon-"]{font-family:mfunsPlayerIcon!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mpicon-play:before{content:""}.mpicon-pause:before{content:""}.mpicon-prev:before{content:""}.mpicon-next:before{content:""}.mpicon-loop:before{content:""}.mpicon-loop-off:before{content:""}.mpicon-volume-off:before{content:""}.mpicon-volume:before{content:""}.mpicon-widescreen:before{content:""}.mpicon-widescreen-exit:before{content:""}.mpicon-webscreen:before{content:""}.mpicon-webscreen-exit:before{content:""}.mpicon-pip:before{content:""}.mpicon-pip-exit:before{content:""}.mpicon-fullscreen:before{content:""}.mpicon-fullscreen-exit:before{content:""}.mpicon-danmaku:before{content:""}.mpicon-danmaku-off:before{content:""}.mpicon-danmaku-settings:before{content:""}.mpicon-advanced-danmaku:before{content:""}.mpicon-text:before{content:""}.mpicon-send-danmaku:before{content:""}.mpicon-settings:before{content:""}.mpicon-caption:before{content:""}.mpicon-left-arrow:before{content:""}.mpicon-right-arrow:before{content:""}.mpicon-close:before{content:""}.mfuns-player{-webkit-user-select:none;user-select:none;width:100%;height:100%;font-size:12px;display:flex;flex-direction:column}.mfuns-player-main{position:relative;width:100%;flex-grow:1;overflow:hidden}.mfuns-player-area{position:relative;width:100%;height:100%}.mfuns-player-content{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center;background:#000;box-sizing:border-box}.mfuns-player-content video{display:block;width:100%;height:100%}.mfuns-player-head-wrap{position:absolute}.mfuns-player-side-wrap,.mfuns-player-modal-wrap,.mfuns-player-contextmenu-wrap{position:absolute;width:100%;height:100%;top:0;left:0}.mfuns-player-danmaku-wrap{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-danmaku-wrap>div{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player li{list-style:none}.mfuns-player.is-webscreen{z-index:233333}.mfuns-player.is-webscreen .mfuns-player-main{position:fixed;top:0;bottom:0;left:0;right:0;z-index:233333;height:100%}.mpui{color:#404040}.mpui-input{font-family:inherit;font-size:inherit;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;border:1px solid;background-color:transparent;color:#404040;border-color:#e6e6e6;transition:all .2s}.mpui-input:hover{border-color:gray}.mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-button{font-family:inherit;font-size:inherit;height:22px;line-height:22px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;border:1px solid;background-color:transparent;color:#404040;border-color:gray;cursor:pointer;transition:all .2s}.mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mpui-slider{position:relative}.mpui-slider-track{width:4px;height:4px;border-radius:2px;margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:pointer;background:gray}.mpui-slider-bar{background:var(--mp-primary-color, #7b7ff7);border-radius:2px}.mpui-slider-thumb-track{position:relative;width:calc(100% - 12px);height:calc(100% - 12px)}.mpui-slider-thumb{z-index:1;width:12px;height:12px;border-radius:100%;background:var(--mp-primary-color, #7b7ff7)}.mpui-slider-divider{position:absolute;width:100%;display:flex;justify-content:space-between}.mpui-slider-divider-dot{height:4px;width:1px;background-color:#404040;transform:translateY(-50%)}.mpui-picker-item{display:inline-block;padding:0 5px;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);border:transparent solid 1px;transition:color .2s;cursor:pointer}.mpui-picker-item.is-checked{border:transparent solid 1px;border-color:var(--mp-primary-color, #7b7ff7);color:var(--mp-primary-color, #7b7ff7)}.mpui-picker-item:hover,.mpui-picker-item:active{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox{height:22px;cursor:pointer}.mpui-checkbox-icon{position:relative;display:inline-block;vertical-align:middle;margin:4px 0;width:13px;height:13px;border-radius:var(--mp-border-radius, 4px);border:solid;border-width:1px;border-color:gray;box-sizing:border-box;transition:all .2s}.mpui-checkbox-label{position:relative;display:inline-block;vertical-align:middle;line-height:22px;margin:0 2px;transition:all .2s}.mpui-checkbox:hover .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:hover .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox.is-checked .mpui-checkbox-icon{background-color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7);background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain}.mpui-background,.mfuns-player-controls-panel{background-color:var(--mp-bg-light, #ffffff)}.mpui-black,.mfuns-player-danmakubar .mfuns-player-controls-panel,.mpui-dark,.mfuns-player.is-lightoff{color:#ffffffe0}.mpui-black .mpui-input,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input,.mpui-dark .mpui-input,.mfuns-player.is-lightoff .mpui-input{background-color:transparent;color:#ffffffe0;border-color:#ffffff40}.mpui-black .mpui-input:hover,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input:hover,.mpui-dark .mpui-input:hover,.mfuns-player.is-lightoff .mpui-input:hover{border-color:#ffffff80}.mpui-black .mpui-input:focus,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input:focus,.mpui-dark .mpui-input:focus,.mfuns-player.is-lightoff .mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-button,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-button,.mpui-dark .mpui-button,.mfuns-player.is-lightoff .mpui-button{background-color:transparent;color:#ffffffe0;border-color:#ffffff80}.mpui-black .mpui-button:hover,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-button:hover,.mpui-dark .mpui-button:hover,.mfuns-player.is-lightoff .mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-slider-track,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-slider-track,.mpui-dark .mpui-slider-track,.mfuns-player.is-lightoff .mpui-slider-track{background:#ffffff80}.mpui-black .mpui-slider-divider-dot,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-slider-divider-dot,.mpui-dark .mpui-slider-divider-dot,.mfuns-player.is-lightoff .mpui-slider-divider-dot{background-color:#ffffffe0}.mpui-black .mpui-checkbox,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox,.mpui-dark .mpui-checkbox,.mfuns-player.is-lightoff .mpui-checkbox{border-color:#ffffff80}.mpui-black .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-dark .mpui-background,.mfuns-player.is-lightoff .mpui-background,.mpui-dark .mfuns-player-controls-panel,.mfuns-player.is-lightoff .mfuns-player-controls-panel,.mpui-dark.mpui-background,.mpui-background.mfuns-player.is-lightoff,.mpui-dark.mfuns-player-controls-panel,.mfuns-player-controls-panel.mfuns-player.is-lightoff{background-color:var(--mp-bg-dark, #202020)}.mpui-black .mpui-background,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-background,.mpui-black .mfuns-player-controls-panel,.mpui-black.mpui-background,.mpui-black.mfuns-player-controls-panel,.mfuns-player-danmakubar .mfuns-player-controls-panel{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725))}.mfuns-player-danmaku{position:absolute;left:0;right:0;top:0;bottom:0;color:#fff}.mfuns-player-danmaku.is-paused .mfuns-player-danmaku-item{animation-play-state:paused}.mfuns-player-danmaku-top,.mfuns-player-danmaku-bottom{position:absolute;left:50%;text-align:center;visibility:hidden;white-space:pre;will-change:visibility;animation:danmaku-show var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-item{display:inline-block;-webkit-user-select:none;user-select:none;white-space:pre;text-shadow:rgb(0,0,0) 1px 0px 1px,rgb(0,0,0) 0px 1px 1px,rgb(0,0,0) 0px -1px 1px,rgb(0,0,0) -1px 0px 1px;cursor:default}.mfuns-player-danmaku-roll{position:absolute;left:var(--offset);white-space:pre;will-change:transform;animation:danmaku-roll var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-reverse{position:absolute;right:var(--offset);white-space:pre;will-change:transform;animation:danmaku-reverse var(--duration) linear;animation-play-state:running}@keyframes danmaku-roll{0%{transform:translate(0)}to{transform:translate(var(--translateX))}}@keyframes danmaku-reverse{0%{transform:translate(0)}to{transform:translate(calc(var(--translateX) * -1))}}@keyframes danmaku-show{0%{visibility:visible}to{visibility:visible}}.mfuns-player-controller-wrap{position:absolute;bottom:-50px;left:0;right:0;height:50px;transition:bottom .4s ease}.mfuns-player-controller-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;bottom:0;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-controller{position:absolute;bottom:0;left:0;right:0;height:50px;margin:0 15px}.mfuns-player-controller-content{height:calc(100% - 20px);position:relative;margin:15px 0 5px;display:flex;justify-content:space-between;align-items:center}.mfuns-player-controller-left{height:100%;max-width:200px;display:flex;align-items:center;flex-shrink:0}.mfuns-player-controller-right{height:100%;min-width:200px;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-controller-center{flex-grow:1}.mfuns-player-controller-center.is-bar{margin:0 60px;max-width:600px}.mfuns-player-controller-top{width:100%;height:14px;position:absolute;top:0;display:flex;align-items:center;cursor:pointer;box-sizing:border-box}.mfuns-player.is-active .mfuns-player-controller-wrap,.mfuns-player.is-start .mfuns-player-controller-wrap{bottom:0}.mfuns-player.is-active .mfuns-player-controller-mask,.mfuns-player.is-start .mfuns-player-controller-mask{opacity:1}.mfuns-player-header{position:absolute;top:-50px;left:0;right:0;height:50px;transition:top .4s ease;pointer-events:none}.mfuns-player-header-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x top;bottom:-30px;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-header-main{position:relative;bottom:0;left:0;right:0;height:50px;margin:0 15px;color:#ffffffe0;display:flex;justify-content:space-between;align-items:center}.mfuns-player-header-left{height:100%;max-width:200px;display:flex;align-items:center;flex-shrink:0}.mfuns-player-header-right{height:100%;min-width:200px;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-header-center{flex-grow:1}.mfuns-player.is-active .mfuns-player-header,.mfuns-player.is-start .mfuns-player-header{top:0}.mfuns-player.is-active .mfuns-player-header-mask,.mfuns-player.is-start .mfuns-player-header-mask{opacity:1}.mfuns-player-controls-button{position:relative;height:30px;font-size:12px;display:flex;justify-content:center;cursor:pointer}.mfuns-player-controls-button-icon{padding:0 7px;transition:transform .3s ease}.mfuns-player-controls-button-icon i{font-size:21px;line-height:30px;display:none}.mfuns-player-controls-button-icon i:nth-child(1){display:block}.mfuns-player-controls-button.is-on .mfuns-player-controls-button-icon i:nth-child(1){display:none}.mfuns-player-controls-button.is-on .mfuns-player-controls-button-icon i:nth-child(2){display:block}.mfuns-player-controls-button-text{font-weight:700;font-size:14px;line-height:30px}.mfuns-player-controls-button:hover .mpui-tooltip,.mfuns-player-controls-button:hover .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon{transform:translateY(-2px)}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon:active{transform:translateY(1px)}.mfuns-player-controls-button.is-control .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button.is-control .mfuns-player-controls-icon{transform:translateY(-2px)}.mfuns-player-controls-panel-wrap{position:absolute;left:50%;bottom:100%;transform:translate(-50%);display:none;cursor:default}.mfuns-player-controls-panel{margin-bottom:20px;border-radius:var(--mp-border-radius, 4px);overflow:hidden}.mfuns-player-videotime{width:90px;text-align:center;font-size:13px;margin:0 5px;cursor:pointer}.mfuns-player-videotime-label{width:100%;white-space:nowrap;text-align:center}.mfuns-player-videotime-input{display:none;width:60px;margin:auto;font-size:13px;text-align:center}.mfuns-player-videotime.is-input .mfuns-player-videotime-label{display:none}.mfuns-player-videotime.is-input .mfuns-player-videotime-input{display:block}.mfuns-player-videotitle{font-size:16px;white-space:nowrap}.mfuns-player-progress{position:relative;width:100%;height:4px;background-color:#ffffff40;transition:height .2s ease}.mfuns-player-progress-played{position:absolute;top:0;left:0;height:100%;background-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-progress-buffered{position:absolute;top:0;left:0;height:100%;background-color:#ffffff80}.mfuns-player-progress-thumb-track{position:absolute;top:50%;left:0;width:100%;height:0}.mfuns-player-progress-thumb{position:absolute;transform:translate(-50%,-50%) scale(0);width:14px;height:14px;background-color:var(--mp-primary-color, #7b7ff7);border-radius:7px;transition:transform,border;transition-timing-function:ease;transition-duration:.2s;box-sizing:border-box;border:4px solid white}.mfuns-player-progress-preview{position:absolute;top:-12px;width:0;height:0}.mfuns-player-progress-time{position:absolute;left:50%;bottom:0;transform:translate(-50%);display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-progress-tip{display:none;position:absolute;top:-10px}.mfuns-player-progress-tip:after{content:"";display:block;position:absolute;bottom:-10px;left:50%;transform:translate(-50%);border:5px solid;border-color:var(--mp-primary-color, #7b7ff7) transparent transparent transparent}.mfuns-player-progress.mfuns-player-progress-active{height:6px}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-thumb{transform:translate(-50%,-50%) scale(1)}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-tip{display:block}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-time{display:inline-block}.mfuns-player-progress.mfuns-player-progress-dragging .mfuns-player-progress-thumb{border-width:2px}.mfuns-player.mode-solid .mfuns-player-progress{background-color:#e6e6e680}.mfuns-player.mode-solid .mfuns-player-progress-buffered{background-color:var(--mp-primary-color, #7b7ff7);opacity:.25}.mfuns-player.mode-solid .mfuns-player-progress-time{background-color:var(--mp-bg-light, #ffffff);color:#404040}.mfuns-player-side-wrap{display:none}.mfuns-player-side-wrap.is-show{display:block}.mfuns-player-side{position:absolute;right:20px;width:300px;top:50px;height:calc(100% - 120px);background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-side-mask{position:absolute;width:100%;height:100%}.mfuns-player-side-head{height:36px;padding:0 8px;font-size:14px;display:flex;justify-content:space-between}.mfuns-player-side-title{line-height:36px}.mfuns-player-side-content{height:calc(100% - 36px);overflow:hidden}.mfuns-player-side-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-side-content>*.is-show{display:block}.mfuns-player-side-close{position:absolute;right:0;cursor:pointer}.mfuns-player-side-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-side-panel{position:relative;width:100%;height:100%}.mfuns-player-side .mfuns-player-side-panel{display:none}.mfuns-player-side .mfuns-player-side-panel.is-show{display:block}.mfuns-player-modal-wrap{display:none}.mfuns-player-modal-wrap.is-show{display:block}.mfuns-player-modal{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:200px;min-height:150px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-modal-mask{position:absolute;width:100%;height:100%}.mfuns-player-modal-head{position:relative;height:30px;font-size:14px}.mfuns-player-modal-title{position:absolute;width:100%;text-align:center;line-height:36px}.mfuns-player-modal-close{position:absolute;right:0;cursor:pointer}.mfuns-player-modal-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-modal-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-modal-content>*.is-show{display:block}.mfuns-player-modal .mfuns-player-controller-icon{cursor:pointer;font-size:21px;line-height:30px}.mfuns-player-contextmenu-wrap{display:none}.mfuns-player-contextmenu-wrap.is-show{display:block}.mfuns-player-contextmenu{-webkit-user-select:none;user-select:none;position:absolute;min-width:200px;color:#ffffffe0}.mfuns-player-contextmenu li{height:36px;line-height:36px;cursor:pointer;padding:0 10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mfuns-player-contextmenu li+li{border-top:1px solid rgba(255,255,255,.2509803922)}.mfuns-player-contextmenu li:hover{background-color:#ffffff40}.mfuns-player-contextmenu>ul{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);overflow:hidden;margin-bottom:4px}.mfuns-player-contextmenu>ul:last-child{margin-bottom:0}.mfuns-player-contextmenu-danmaku{max-width:400px}.mfuns-player-contextmenu-danmaku-item{display:flex;justify-content:space-between}.mfuns-player-contextmenu-danmaku-item-content{flex-grow:1}.mfuns-player-contextmenu-danmaku-item-operate{display:flex;flex-shrink:0}.mfuns-player-contextmenu-danmaku-item-operate-btn{padding:0 4px}.mfuns-player-contextmenu-danmaku-item-operate-btn:hover{background-color:#ffffff40}.mfuns-player-footbar{height:40px;width:100%;display:flex;position:relative;bottom:0;left:0;justify-content:space-between;align-items:center;background-color:var(--mp-bg-light, #ffffff);border-top:none;box-sizing:border-box;color:#404040}.mfuns-player.mode-nofootbar .mfuns-player-main{width:100%;height:100%}.mfuns-player.mode-nofootbar .mfuns-player-footbar,.mfuns-player-button-volume .mpicon-volume-off,.mfuns-player-button-volume.is-muted .mpicon-volume{display:none}.mfuns-player-button-volume.is-muted .mpicon-volume-off{display:block}.mfuns-player-button-volume-value{width:100%;text-align:center;padding-bottom:4px}.mfuns-player-button-volume-slider{width:100%;height:60px}.mfuns-player-button-volume .mfuns-player-controls-panel{width:30px;padding:4px 0 6px}.mfuns-player-button-settings .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-button-part{display:none}.mfuns-player-button-part.is-show{display:flex}.mfuns-player-button-quality-list{min-width:50px;height:100%}.mfuns-player-button-quality-item{white-space:nowrap;padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-button-quality-item:hover{background-color:#ffffff40}.mfuns-player-button-quality-item.is-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button-next:hover .mfuns-player-controls-button-icon{transform:translate(2px)}.mfuns-player-button-next:hover .mfuns-player-controls-button-icon:active{transform:translate(-1px)}.mfuns-player-button-prev:hover .mfuns-player-controls-button-icon{transform:translate(-2px)}.mfuns-player-button-prev:hover .mfuns-player-controls-button-icon:active{transform:translate(1px)}.mfuns-player-button-next,.mfuns-player-button-prev{display:flex}.mfuns-player-button-next.is-disabled,.mfuns-player-button-prev.is-disabled{color:#ffffff80;cursor:not-allowed}.mfuns-player-button-next.is-disabled.is-autohide,.mfuns-player-button-prev.is-disabled.is-autohide{display:none}.mfuns-player-button-next.is-disabled:hover .mfuns-player-controls-button-icon,.mfuns-player-button-prev.is-disabled:hover .mfuns-player-controls-button-icon,.mfuns-player-button-next.is-disabled:hover .mfuns-player-controls-button-icon:active,.mfuns-player-button-prev.is-disabled:hover .mfuns-player-controls-button-icon:active{transform:unset}.mfuns-player-button-next.is-hidden,.mfuns-player-button-prev.is-hidden{display:none}.mfuns-player-button-next .mfuns-player-controls-button-icon i,.mfuns-player-button-prev .mfuns-player-controls-button-icon i{font-size:16px}.mfuns-player.is-webscreen .mfuns-player-button-widescreen,.mfuns-player.is-fullscreen .mfuns-player-button-widescreen,.mfuns-player-button-danmakutoggle .mpicon-danmaku{display:none}.mfuns-player-button-danmakutoggle.is-on{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button-danmakusettings .mfuns-player-controls-panel{width:270px;padding:5px 15px}.mfuns-player-button-danmakusettings .mfuns-player-slider-wrap{width:160px}.mfuns-player-button-danmakustyle .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-danmaku-style-color-input{width:60px}.mfuns-player-danmaku-style-color-preview{width:36px;height:18px;border:2px solid rgba(255,255,255,.6274509804);border-radius:var(--mp-border-radius, 4px);margin-left:8px}.mfuns-player-danmaku-style-color-dropper{margin-left:5px}.mfuns-player-danmaku-style-color-picker{margin-top:8px;margin-left:30px}.mfuns-player-danmaku-style-color-picker .mpui-picker-item{border:none;padding:0}.mfuns-player-danmaku-style-color-picker .mpui-picker-item>div{width:12px;height:12px;border:2px solid rgba(0,0,0,.2509803922);border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmaku-style-color-picker .mpui-picker-item.is-checked{border:none}.mfuns-player-danmaku-style-color-picker .mpui-picker-item.is-checked>div{border-color:#fff}.mode-solid .mfuns-player-danmaku-style-color-preview{border-color:#00000040}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item>div{border-color:#00000020;border-radius:var(--mp-border-radius, 4px)}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item.is-checked>div{border-color:#00000080}.mfuns-player-hotkeys-list{padding:5px 0;max-height:200px;overflow-y:auto}.mfuns-player-hotkeys-list-item{height:30px;line-height:30px;text-align:center}.mfuns-player-hotkeys-list-key{display:inline-block;width:80px}.mfuns-player-hotkeys-list-description{display:inline-block;width:180px}.mfuns-player-about{padding:10px}.mfuns-player-about-logo{width:360px;height:60px;background-image:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20120%2020'%3e%3cpath%20d='M.896,13.75977v-11.52H3.45605L7.35986,6.896,11.248,2.23975h2.57617v11.52H11.32813v-7.728L7.35986,10.76758,3.376,6.04785v7.71192Z'%20style='fill:%23fff'/%3e%3cpath%20d='M15.69629,13.75977v-10a2.18059,2.18059,0,0,1,.31982-1.15186,2.48209,2.48209,0,0,1,.84815-.84814,2.20945,2.20945,0,0,1,1.168-.31983H21.584V3.90381H18.144V4.48H21.584V6.92773H18.144v6.832Z'%20style='fill:%23fff'/%3e%3cpath%20d='M24.04736,13.43994a2.41285,2.41285,0,0,1-.83984-.84814,2.22332,2.22332,0,0,1-.312-1.15186V4.48h2.44775v6.83154h4.51221V4.48h2.44775v6.96a2.22332,2.22332,0,0,1-.312,1.15186,2.41285,2.41285,0,0,1-.83984.84814,2.21068,2.21068,0,0,1-1.168.31983H25.21533A2.20945,2.20945,0,0,1,24.04736,13.43994Z'%20style='fill:%23fff'/%3e%3cpath%20d='M34.03125,13.75977V4.48h7.08838a2.21076,2.21076,0,0,1,1.168.31982,2.41288,2.41288,0,0,1,.83984.84815,2.22331,2.22331,0,0,1,.312,1.15185v6.96H40.9917v-6.832H36.47949v6.832Z'%20style='fill:%23fff'/%3e%3cpath%20d='M45.91992,13.43994a2.48215,2.48215,0,0,1-.84814-.84814,2.1806,2.1806,0,0,1-.31983-1.15186v-.46435h2.44776v.33593h4.5122v-.96H47.07178a2.18059,2.18059,0,0,1-1.15186-.31982,2.48218,2.48218,0,0,1-.84814-.84815A2.18059,2.18059,0,0,1,44.752,8.03174V6.7998A2.18059,2.18059,0,0,1,45.07178,5.648a2.48218,2.48218,0,0,1,.84814-.84815A2.18068,2.18068,0,0,1,47.07178,4.48h4.76806a2.20953,2.20953,0,0,1,1.168.31982A2.48221,2.48221,0,0,1,53.856,5.648a2.18058,2.18058,0,0,1,.31982,1.15185v.46387H51.71191V6.92773h-4.5122v.96h4.64013a2.20985,2.20985,0,0,1,1.168.32031,2.48077,2.48077,0,0,1,.84815.84765,2.18228,2.18228,0,0,1,.31982,1.15235v1.23193A2.18059,2.18059,0,0,1,53.856,12.5918a2.48218,2.48218,0,0,1-.84815.84814,2.20945,2.20945,0,0,1-1.168.31983H47.07178A2.1806,2.1806,0,0,1,45.91992,13.43994Z'%20style='fill:%23fff'/%3e%3cpath%20d='M61.00732,13.75977V2.25586h9.6001a1.84742,1.84742,0,0,1,.96778.26367,1.9812,1.9812,0,0,1,.69628.69629,1.85,1.85,0,0,1,.25586.96v3.376a1.85,1.85,0,0,1-.25586.96,1.98128,1.98128,0,0,1-.69628.69629,1.84742,1.84742,0,0,1-.96778.26367h-8.3042v4.28809Zm1.91993-5.6001h7.68017a.61483.61483,0,0,0,.43994-.17578.5747.5747,0,0,0,.18409-.43213v-3.376a.62856.62856,0,0,0-.624-.624H62.92725a.62854.62854,0,0,0-.624.624v3.376a.57473.57473,0,0,0,.18408.43213A.614.614,0,0,0,62.92725,8.15967Z'%20style='fill:%23fff'/%3e%3cpath%20d='M74.56689,13.49561a2.01455,2.01455,0,0,1-.70361-.70362,1.845,1.845,0,0,1-.26416-.96826V1.43994h1.312V11.82373a.62854.62854,0,0,0,.624.624H77.103v1.312H75.53516A1.845,1.845,0,0,1,74.56689,13.49561Z'%20style='fill:%23fff'/%3e%3cpath%20d='M80.207,13.75977a1.845,1.845,0,0,1-.96826-.26416,2.01446,2.01446,0,0,1-.70361-.70362,1.845,1.845,0,0,1-.26416-.96826V8.46387h8.12793V6.41553a.62773.62773,0,0,0-.624-.62354H78.271V4.48h7.5039a1.877,1.877,0,0,1,.98389.26367,2.02128,2.02128,0,0,1,.7041.7041,1.84453,1.84453,0,0,1,.26416.96778v7.34424Zm0-1.312h6.1919V9.77588H79.583v2.04785a.62854.62854,0,0,0,.624.624Z'%20style='fill:%23fff'/%3e%3cpath%20d='M90.92627,17.43994V16.11182h5.792a.62772.62772,0,0,0,.624-.624v-1.728h-6.1919a1.842,1.842,0,0,1-.96777-.26416,2.01585,2.01585,0,0,1-.7041-.70362,1.845,1.845,0,0,1-.26416-.96826v-7.312h1.312v7.312a.62854.62854,0,0,0,.624.624h5.56787a.62771.62771,0,0,0,.624-.624v-7.312h1.312V15.48779a1.92385,1.92385,0,0,1-.25586.98389,1.95831,1.95831,0,0,1-.6958.7041,1.8791,1.8791,0,0,1-.98438.26416Z'%20style='fill:%23fff'/%3e%3cpath%20d='M100.96729,13.49561a2.01587,2.01587,0,0,1-.70411-.70362,1.845,1.845,0,0,1-.26416-.96826V6.41553a1.84453,1.84453,0,0,1,.26416-.96778,2.02131,2.02131,0,0,1,.70411-.7041,1.84611,1.84611,0,0,1,.96777-.26367h5.56787a1.87868,1.87868,0,0,1,.98437.26367,2.024,2.024,0,0,1,.70362.7041,1.84453,1.84453,0,0,1,.26416.96778V9.77588h-8.144v2.04785a.62854.62854,0,0,0,.624.624h7.52v1.312h-7.52A1.842,1.842,0,0,1,100.96729,13.49561Zm.34375-5.03174H108.127V6.41553a.62771.62771,0,0,0-.624-.62354h-5.56787a.62771.62771,0,0,0-.624.62354Z'%20style='fill:%23fff'/%3e%3cpath%20d='M111.00684,13.75977V6.41553a1.84453,1.84453,0,0,1,.26416-.96778,2.01989,2.01989,0,0,1,.70361-.7041,1.8491,1.8491,0,0,1,.96826-.26367h5.21582V5.792h-5.21582a.62771.62771,0,0,0-.624.62354v7.34424Z'%20style='fill:%23fff'/%3e%3c/svg%3e");background-size:cover}.mfuns-player-about a{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-list{scrollbar-width:thin;height:100%;overflow-y:auto}.mfuns-player-partlist-list::-webkit-scrollbar{width:5px}.mfuns-player-partlist-list::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-partlist-item{padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-partlist-item:hover{background-color:#ffffff40}.mfuns-player-partlist-item.is-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-item-id{display:inline-block;width:40px;flex-shrink:0}.mfuns-player-partlist-item-title{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mfuns-player-panel-row{display:flex;padding:5px 0}.mfuns-player-row-label{flex-shrink:0;height:22px;line-height:22px;padding-right:10px}.mfuns-player-row-value{height:22px;line-height:22px;padding-left:10px}.mfuns-player-videostatus{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mfuns-player-videostatus-paused{display:none;position:absolute;bottom:60px;right:20px;width:65px;height:55px;background:url(data:image/png;base64,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);background-size:100% 100%}.mfuns-player-videostatus-loading{display:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:100px}.mfuns-player-videostatus-loading-icon{width:100%;display:flex;justify-content:center;align-items:center;font-size:16px;font-weight:700;height:35px}.mfuns-player-videostatus-loading-icon>span{width:20px;height:35px;font-size:16px;text-align:center;line-height:16px;color:var(--mp-primary-color, #7b7ff7);animation:loading-float 1.4s ease-in-out infinite;text-shadow:1px 1px #666}.mfuns-player-videostatus-loading-icon>span:nth-child(2){animation-delay:-1.2s}.mfuns-player-videostatus-loading-icon>span:nth-child(3){animation-delay:-1s}.mfuns-player-videostatus-loading-icon>span:nth-child(4){animation-delay:-.8s}.mfuns-player-videostatus-loading-icon>span:nth-child(5){animation-delay:-.6s}.mfuns-player-videostatus-loading-icon>span:nth-child(6){animation-delay:-.4s}.mfuns-player-videostatus-loading-icon>span:nth-child(7){animation-delay:-.2s}.mfuns-player-videostatus-loading-content{width:100%;text-align:center;font-size:14px;font-weight:700;color:#fff;text-shadow:1px 1px #666}.mfuns-player.is-paused .mfuns-player-videostatus-paused,.mfuns-player.is-loading .mfuns-player-videostatus-loading{display:block}@keyframes loading-float{0%,to{height:35px}50%{height:20px}}.mfuns-player-danmakubar{display:flex;flex-grow:1;justify-content:space-between;align-items:center;height:100%}.mfuns-player-danmakubar .mfuns-player-danmakubar-status-loading,.mfuns-player-danmakubar .mfuns-player-danmakubar-status-login{display:none;padding-left:10px}.mfuns-player-danmakubar .mfuns-player-danmakubar-status-login a{color:var(--mp-primary-color, #7b7ff7);cursor:pointer}.mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 5px}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-slot{display:none}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap{background-color:#e6e6e6}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-status-login{display:block}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mpui-dark .mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap,.mfuns-player.is-lightoff .mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap{background-color:#ffffff40}.mfuns-player-danmakubar.is-loading .mfuns-player-controls-button{pointer-events:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#e6e6e6 10%,#f0f0f0 24%,#f6f6f6 32%,#f6f6f6 68%,#f0f0f0 76%,#e6e6e6 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mpui-dark .mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap,.mfuns-player.is-lightoff .mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#555 10%,#444 24%,#333 32%,#333 68%,#444 76%,#555 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-slot{display:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-status-loading{display:block}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-status-login{display:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mfuns-player-danmakubar-slot,.mfuns-player-danmakubar-input-slot{display:flex;flex-shrink:0}.mfuns-player-danmakubar-input-wrap{display:flex;flex-grow:1;align-items:center;position:relative;height:100%;background-color:#ffffff40;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmakubar-input{font-size:13px;flex:5;height:30px;outline:none;border:none;margin-left:5px;color:#ffffffe0;background-color:transparent;box-sizing:border-box}.mfuns-player-danmakubar-input::-webkit-input-placeholder{color:#ffffff80}.mfuns-player-danmakubar-status-loading{font-size:13px;flex:5;height:32px;line-height:32px;color:#999;box-sizing:border-box;display:none}.mfuns-player-danmakubar-status-login{font-size:13px;flex:5;height:32px;line-height:32px;box-sizing:border-box;display:none}.mfuns-player-danmakubar-send{width:60px;display:flex;align-items:center;justify-content:center;height:30px;font-size:12px;color:#fff;background:var(--mp-primary-color, #7b7ff7);border-radius:0 var(--mp-border-radius, 4px) var(--mp-border-radius, 4px) 0;cursor:pointer}.mfuns-player-danmakubar-wrap{height:40px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 7px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input-wrap{height:100%;border-left:1px solid #e6e6e6;border-radius:0;background-color:transparent}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input{font-family:inherit;height:100%;margin-left:5px;color:#404040}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input::-webkit-input-placeholder{color:gray}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-send{background:var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);margin-right:6px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-send.is-disabled{background:#e6e6e6;color:gray;cursor:not-allowed}@keyframes skeleton-loading{0%{background-position:200% 0%}to{background-position:0% 100%}}.mfuns-player-settings-play,.mfuns-player-settings-others{display:flex;flex-wrap:wrap;gap:0 10px}.mfuns-player-loadingmask{position:absolute;width:100%;height:100%;left:0;top:0;display:none;background:#000;flex-direction:column;overflow:hidden;color:#ffffffe0}.mfuns-player-loadingmask.is-show{display:flex}.mfuns-player-loadingmask-info{display:flex;flex-direction:column;justify-content:end;flex-grow:1;padding:8px}.mfuns-player-loadingmask-tips{flex-shrink:0;height:24px;padding:0 8px}.mfuns-player-loadingmask-icon{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.mfuns-player-loadingmask-image{width:96px;height:96px;background:url(data:image/gif;base64,R0lGODdhQABAAHcAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLs94w+M85H0iNY7iYp6SS6NG6Tby+AO09uMztOdO6qV4mYRF4DIaGxhqCaVBujlEqzFrFWqBZnu9b0X7HZB35jNY+0+yzqB2b4N4+25qrkNrNvxlvTxfAJwgY4ZTyV4jYh8So2Ejo5xiW2FF5NQl5F1ly2YXJ2cV5yOLZBDoKRWpoWmMltWqZuYlKSNMUWjoLupl2Ectb67bVKgOHAfzZu3L7Wzyph0e5q/womZuQbK2t/chtqhEXfE0M16ypa75DzqoOtoidZ467Lk8t2t2+2q3Xo8afr1wmgOCQJSJ4z9m+b+cE/mNYZlkdewndRaRoMWOgjBlt0nGcE46NtZEkS5o8iTKlypUsW7p8qagAACH5BAkKAAAALAAAAABAAEAAgAAAAAAAAAL/hI+py+0Po5y02otl2Dxk3VHd+EGjF51kyajb44asEqNtzc0J3pzHqgPgbDufwajzIX9AZi65Wh6bU1lpiaU6XyxpMxu7WrfDchlmTqtV6LVb3X7zEOl4LXjj9rT4vT7/1xdnJwgSSDNW6Ee0wKdYdAgZ+Uj3tFg52ZeI+LcJeOGJSTT2FTroQGoplKo6YVo1KsO2+nqJqkriApt5y0sb+4ZRmxgs3MrJWAx6LCmZO2vMvOXc6ej6Wktp/UtpIg07sybay2gnF2brfX6WTr7OjqwOD3gXb/6dgt7s7lsBPc6vEJ9h2TJ4Iojvw8CEUsIt9PVPTMNf5aj122Wm0buNHro0cvyYCeRHeXXOdTuJMqXKlSxbunwJM6bMmRAKAAAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLZdg8T95pYOg94xadYOmoqOm+bBIHcD0rtc3sZO7j6UaGU+5gNA5XSCLQCVA2oVFpiapCWIvUjDQI9lHC5DKzZU6DIer2jv0+arNwmbxu7/3u6P3izNeX9+cXSDi4JGTYAKiHuDj3GKkImYjnVXh5I9QI1SUiOcV59tUISnk4SqK0dapZteICm7n52oZhailKhksrOhmGGcqVJzub61pLw9o65kuMOruIPFnJ+CxtnfoqLFat7OzWvDwMLD7+i3ceI6iO4+i9LUjX+5l+bV+PTA1dXjHO71igfAEDdouWDR/CKwSfoftnLNHCYw93xSO3LuNCjRoa53Hk9aGMuSDaSpo8iTKlypUsW7p8CXNRAQAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLs5ah++mFGxSKZPmNDGqubKsib7rMcGx3bh7EcglAKVgGok8YBCaQReZI2YQ5o7SN83o7TDFQLe/LA4HH5O2wjCaf0uzc+uvzZs+6uLjumNt3vYd+T9eXVwXY8CcnWGhIWMOouOQIiffYOFlpSfmDKYnXVXiYRNPVAjq4qZkIpRoZASplQuRJ4VqlBMfFSsUZ6oZ7isgJpkFriTacyxscdvyrq9xnVkGcmLlrSl0NfG2lhuqHfNkWrd0q3rvYjGpug44d/nJ9HvhWGi/rbH9kZN2efmE2zd+/OQEBAUR2j9u9gO4GwptnT+C7fc/Wretn0dy3jBfi7ozh1TGbyJEkS5o8iTKlypUsW1IoAAA7) center/contain no-repeat;filter:invert(25%) drop-shadow(2px 2px #222);image-rendering:pixelated}.mfuns-player.mpui-white .mfuns-player-loadingmask{background:#fff;color:#404040}.mfuns-player.mpui-white .mfuns-player-loadingmask-image{filter:invert(10%) drop-shadow(2px 2px #aaa)}.mfuns-player-mini{background-color:#000;position:fixed;width:400px;height:225px;right:40px;bottom:40px;display:none;overflow:hidden}.mfuns-player-mini.is-show{display:block}.mfuns-player.is-lightoff{position:relative;z-index:233333}.mfuns-player-lightoff-mask{display:none;z-index:-10;opacity:.9;background-color:#000;position:fixed;top:0;bottom:0;left:0;right:0}.mfuns-player.is-lightoff .mfuns-player-lightoff-mask{display:block}.mfuns-player .mfuns-player-content{padding:var(--padding, 0)}.mfuns-player.is-widescreen .mfuns-player-video-wrap,.mfuns-player.is-webscreen .mfuns-player-video-wrap,.mfuns-player.is-fullscreen .mfuns-player-video-wrap{padding:0}.mfuns-player-toast{position:absolute;bottom:60px;left:20px}.mfuns-player-toast-item{font-size:14px;border-radius:var(--mp-border-radius, 4px);background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;height:30px;margin-bottom:4px;width:fit-content}.mfuns-player-toast-item-content{line-height:30px;padding:0 8px}.mfuns-player-danmakulist{-webkit-user-select:none;user-select:none;width:100%;height:100%;box-sizing:border-box;font-size:12px}.mfuns-player-danmakulist .list-row,.mfuns-player-danmakulist .mfuns-player-danmakulist-head{position:relative;line-height:24px;height:24px;white-space:nowrap}.mfuns-player-danmakulist-head{box-shadow:1px 0 2px #ccc}.mfuns-player-danmakulist-head :hover{background-color:#e6e6e633}.mfuns-player-danmakulist-select{position:absolute;box-sizing:border-box;line-height:24px;height:24px;width:100%;top:0;padding:0 8px;justify-content:space-between;display:none;background:#fff}.mfuns-player-danmakulist-select.is-show{display:flex}.mfuns-player-danmakulist-container .list-row:hover,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover{background-color:#e6e6e633}.mfuns-player-danmakulist-container .list-row:hover .list-operate,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover .list-operate{display:flex}.mfuns-player-danmakulist-container .list-row:hover .col-date,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover .col-date{visibility:hidden}.mfuns-player-danmakulist-container .list-row.is-selected,.mfuns-player-danmakulist-container .is-selected.mfuns-player-danmakulist-head{color:var(--mp-primary-color, #7b7ff7);background-color:#e6e6e680}.mfuns-player-danmakulist-container .list-row.is-focus,.mfuns-player-danmakulist-container .is-focus.mfuns-player-danmakulist-head{color:var(--mp-primary-color, #7b7ff7);background-color:#e6e6e6}.mfuns-player-danmakulist .list-column,.mfuns-player-danmakulist .list-cell{box-sizing:content-box;display:inline-block;height:100%;padding:0 4px;overflow:hidden}.mfuns-player-danmakulist .list-column.col-time,.mfuns-player-danmakulist .list-cell.col-time{padding-left:8px;width:40px}.mfuns-player-danmakulist .list-column.col-date,.mfuns-player-danmakulist .list-cell.col-date{padding-right:8px;width:90px;text-align:center}.mfuns-player-danmakulist .list-column.col-content,.mfuns-player-danmakulist .list-cell.col-content{width:calc(100% - 162px);text-overflow:ellipsis;white-space:overflow}.mfuns-player-danmakulist .list-operate{position:absolute;right:0;top:0;width:100px;height:100%;display:none;justify-content:flex-end;align-items:center}.mfuns-player-danmakulist .list-operate-btn{cursor:pointer;line-height:20px;margin-left:4px;padding:0 8px;border:1px solid var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-danmakulist-main{position:relative;overflow:hidden;width:100%;height:calc(100% - 40px)}.mfuns-player-danmakulist-container{overflow:hidden;position:absolute;overflow-y:auto;scrollbar-width:thin;top:24px;left:0;width:100%;height:calc(100% - 24px)}.mfuns-player-danmakulist-container::-webkit-scrollbar{width:5px}.mfuns-player-danmakulist-container::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-danmakulist-status{position:absolute;top:50%;width:100%}.mfuns-player-danmakulist-status div{text-align:center;display:none;color:gray}.mfuns-player-danmakulist-status[data-status=loading] .status-loading-text,.mfuns-player-danmakulist-status[data-status=failed] .status-failed-text,.mfuns-player-danmakulist-status[data-status=empty] .status-empty-text{display:block}.mfuns-player-danmakulist-foot{border-top:1px solid #e6e6e6;display:flex;justify-content:space-between;height:40px}.mfuns-player-danmakulist-foot-left,.mfuns-player-danmakulist-foot-right{display:flex;align-items:center}.mfuns-player-danmakulist-autoscroll{cursor:pointer;padding:4px;margin:0 4px;color:#404040}`)),document.head.appendChild(A)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
