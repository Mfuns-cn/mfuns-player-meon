var ot = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var J = (s, t, e) => (ot(s, t, "read from private field"), e ? e.call(s) : t.get(s)), K = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, D = (s, t, e, i) => (ot(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e);
const At = /mobile/i.test(window.navigator.userAgent), bt = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || !1, kt = document.pictureInPictureEnabled || !1;
function _(s, t, e) {
  const i = document.createElement(s);
  if (t)
    for (const n in t)
      i.setAttribute(n, t[n]);
  return typeof e == "string" ? i.innerHTML = e : e instanceof Node && i.appendChild(e), i;
}
function Ct(s, t) {
  typeof t == "string" ? s.innerHTML = t : (s.innerHTML = "", s.appendChild(t));
}
const xt = (s, t, e = !1) => {
  let i = null, n = !1;
  return function(...r) {
    i && clearTimeout(i), e && !n ? (s.apply(this, r), n = !0) : i = setTimeout(() => {
      s.apply(this, r), clearTimeout(i), i = null, n = !1;
    }, t);
  };
}, Et = (s, t) => {
  let e = null;
  return function(...i) {
    e || (e = setTimeout(() => {
      s.apply(this, i), clearTimeout(e), e = null;
    }, t));
  };
};
function St(s, t) {
  return s + Math.random() * (t - s);
}
function it(s, t, e) {
  return s > t ? s < e ? s : e : t;
}
function Mt(s) {
  const t = s.split(":").slice(-3), e = parseInt(t[t.length - 1]) || 0, i = parseInt(t[t.length - 2]) || 0, n = parseInt(t[t.length - 3]) || 0, o = parseInt(t[t.length - 4]) || 0;
  return e + i * 60 + n * 3600 + o * 86400;
}
function wt(s, t = 6) {
  if (s = Number.isFinite(s) ? Math.floor(s) : 0, !(t & 15))
    return s.toString();
  const e = (...r) => r.map((h) => h < 10 ? `0${h}` : `${h}`).join(":");
  let i, n, o;
  return t & 1 && s < 60 ? s.toString() : (i = Math.floor(s / 60), s = s % 60, t & 2 && i < 60 ? e(i, s) : (n = Math.floor(i / 60), i = i % 60, t & 4 && n < 24 ? e(n, i, s) : (o = Math.floor(n / 60), n = n % 24, e(o, n, i, s))));
}
function Lt(s) {
  return s[0] === "#" && (s = s.substring(1)), s.length === 3 && (s = `${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`), parseInt(s, 16) + 0 & 16777215;
}
function Tt(s) {
  return `#${`00000${s.toString(16)}`.slice(-6)}`;
}
const Q = {
  yyyy: (s) => s.getFullYear().toString(),
  yy: (s) => s.getFullYear().toString().slice(-2),
  MM: (s) => (s.getMonth() + 1).toString().padStart(2, "0"),
  dd: (s) => s.getDate().toString().padStart(2, "0"),
  HH: (s) => s.getHours().toString().padStart(2, "0"),
  mm: (s) => s.getMinutes().toString().padStart(2, "0"),
  ss: (s) => s.getSeconds().toString().padStart(2, "0")
};
function Ht(s, t) {
  return t.replace(
    /yyyy|yy|MM|dd|HH|mm|ss/g,
    (e) => {
      var i;
      return (i = Q[e]) == null ? void 0 : i.call(Q, s);
    }
  );
}
const he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HexColorToNumber: Lt,
  clamp: it,
  createElement: _,
  dateFormat: Ht,
  debounce: xt,
  fullScreenEnabled: bt,
  isMobile: At,
  numberToHexColor: Tt,
  pictureInPictureEnabled: kt,
  random: St,
  replaceChildren: Ct,
  secondToTime: wt,
  throttle: Et,
  timeToSecond: Mt
}, Symbol.toStringTag, { value: "Module" })), q = "mfuns-player", Nt = "3.0.0-alpha.3", Pt = "e10520a", ae = "https://github.com/Mfuns-cn/mfunsPlayer/tree/v3-beta", ce = [
  { name: "Minteea", id: "Minteea", link: "https://github.com/Minteea" },
  { name: "鲁迪钨丝", id: "Rudiusu", link: "https://github.com/Rudiusu" }
], rt = {
  play: () => [],
  pause: () => [],
  ended: () => [],
  loadeddata: () => [],
  loadedmetadata: () => [],
  waiting: () => [],
  playing: () => [],
  canplay: () => [],
  canplaythrough: () => [],
  timeupdate: (s) => [s.currentTime],
  durationchange: (s) => [s.duration],
  progress: (s) => [s.buffered],
  seeking: (s) => [s.currentTime],
  seeked: (s) => [s.currentTime],
  volumechange: (s) => [s.volume, s.muted],
  ratechange: (s) => [s.playbackRate],
  enterpictureinpicture: () => [],
  leavepictureinpicture: () => []
};
class Vt {
  constructor(t, e) {
    this.ratio = null, this.info = {}, this.mediaController = null, this.player = t, this.$el = this.player.$content.appendChild(
      _("video", { class: `${q}-video` })
    ), this._attachEvent(this.$el), this.player.on("ended", () => {
      this.player.hook.call("end").then((i) => {
        i && this.player.emit("end");
      });
    });
  }
  /** 设置视频 */
  set(t, e, i) {
    this.player.hook.call("video.set", t).then(async (n) => {
      var o, r;
      if (n) {
        (r = (o = this.mediaController) == null ? void 0 : o.destroy) == null || r.call(o), this.mediaController = null, this.info = t, this.player.emit("videoChange", { ...t });
        let { url: h, type: l, live: a } = t;
        const c = { url: h, type: l, play: e, time: i, live: a };
        this.player.hook.call("video.beforeLoad", c).then(() => {
          c.url ? this.load(c) : this.player.throw(new Error("缺少视频播放信息"));
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
    for (const e in rt) {
      const i = rt[e];
      t.addEventListener(
        e,
        () => {
          this.player.emit(
            e,
            ...i(t)
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
    var t, e, i;
    return {
      url: (t = this.mediaController) == null ? void 0 : t.url,
      type: ((e = this.mediaController) == null ? void 0 : e.type) || "",
      live: ((i = this.mediaController) == null ? void 0 : i.live) || !1
    };
  }
}
class Rt {
  constructor(t) {
    this.isInit = !1, this.isReady = !1, this.isMounted = !1, this.player = t;
  }
  get list() {
    return this.player.plugins;
  }
  /** 插件模块初始化 @internal */
  init(t) {
    var e;
    this.isInit || (this.isInit = !0, (e = t.plugins) == null || e.forEach((i) => {
      this.register(i, t);
    }), this.pluginsReady(), this.player.emit("ready"), this.player.once("mounted", () => {
      this.playerMounted();
    }));
  }
  /** 注册插件 */
  register(t, e) {
    var n, o, r, h;
    const i = typeof t == "function" ? new t(this.player) : t;
    t.pluginName && (this.list[t.pluginName] = i), !i.initialized && ((n = i.init) == null || n.call(i, this.player), (o = i.apply) == null || o.call(i, this.player, e), this.isReady && ((r = i.ready) == null || r.call(i, this.player)), this.isMounted && ((h = i.mounted) == null || h.call(i, this.player)), i.initialized = !0);
  }
  /** 访问已安装插件实例 */
  get(t) {
    return this.list[t];
  }
  /** 获取插件实例 */
  from(t) {
    switch (typeof t) {
      case "object":
        return t;
      case "function":
        return this.build(t);
      default:
        return this.list[t];
    }
  }
  /** 初始化插件实例 */
  build(t, e = {}) {
    var n, o, r, h;
    const i = typeof t == "function" ? new t(this.player) : t;
    return i.initialized || ((n = i.init) == null || n.call(i, this.player), (o = i.apply) == null || o.call(i, this.player, e), this.isReady ? (r = i.ready) == null || r.call(i, this.player) : this.player.once("ready", () => {
      var l;
      return (l = i.mounted) == null ? void 0 : l.call(i, this.player);
    }), this.isMounted ? (h = i.mounted) == null || h.call(i, this.player) : this.player.once("mounted", () => {
      var l;
      return (l = i.mounted) == null ? void 0 : l.call(i, this.player);
    }), i.initialized = !0), i;
  }
  /** 所有插件注册完毕后执行 @internal */
  pluginsReady() {
    var t;
    if (!this.isReady) {
      for (const e in this.list) {
        const i = this.list[e];
        (t = i.ready) == null || t.call(i, this.player);
      }
      this.isReady = !0;
    }
  }
  /** 播放器挂载后执行 @internal */
  playerMounted() {
    var t;
    if (!this.isMounted)
      for (const e in this.list) {
        const i = this.list[e];
        (t = i.mounted) == null || t.call(i, this.player);
      }
  }
  /** 销毁所有插件 @internal */
  destroy() {
    var t;
    for (const e in this.list) {
      const i = this.list[e];
      (t = i.destroy) == null || t.call(i);
    }
  }
}
class It {
  constructor() {
    this.hooks = {};
  }
  /** 注册钩子 */
  register(t, e, i = !1) {
    let n = this.hooks[t];
    n || (n = [], this.hooks[t] = n), i ? n.unshift(e) : n.push(e);
  }
  /** 移除钩子 */
  unregister(t, e) {
    let i = this.hooks[t];
    i || (i = [], this.hooks[t] = i);
    const n = i.indexOf(e);
    n > -1 && i.splice(n, 1);
  }
  /** 调用钩子函数
   * @param name 钩子名称
   * @param ctx 钩子上下文
   * @param defaultFunc 钩子在正常遍历完毕后最终执行的钩子函数
   */
  async call(t, e, i) {
    const n = this.hooks[t];
    if (n != null && n.length)
      for (const o of n) {
        const r = await o(e);
        if (r == !0)
          return console.log(`钩子提前结束调用: ${t}`), console.log(o), !0;
        if (r == !1)
          return console.log(`钩子被拦截: ${t}`), console.log(o), !1;
      }
    return console.log(`钩子调用完毕: ${t}`), console.log(e), (i == null ? void 0 : i(e)) ?? !0;
  }
}
class Dt {
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
    for (const [i, n] of this.list)
      if (n.check(t))
        return n.create(t, e);
    return this.createDefault(t, e);
  }
  /** 常规方式创建实例 */
  createDefault(t, e) {
    const { type: i, url: n, live: o, play: r, time: h } = t, l = {
      type: i || "",
      url: n,
      live: o || !1,
      mediaElement: e,
      destroy() {
        this.mediaElement.src = "";
      }
    }, a = h === !0 ? this.player.currentTime : h;
    return e.src = n, e.addEventListener(
      "loadeddata",
      () => {
        a && this.player.seek(a), r && this.player.play();
      },
      { once: !0 }
    ), l;
  }
}
class jt {
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
    const i = this.listeners[t].indexOf(e);
    i > -1 && this.listeners[t].splice(i, 1);
  }
  /** 触发事件 */
  emit(t, ...e) {
    var i, n;
    if ((i = this.listeners[t]) != null && i.length)
      for (let o = 0; o < this.listeners[t].length; o++)
        this.listeners[t][o](...e);
    if ((n = this.onceListeners[t]) != null && n.length) {
      for (let o = 0; o < this.onceListeners[t].length; o++)
        this.onceListeners[t][o](...e);
      this.onceListeners[t] = [];
    }
  }
}
const U = class U {
  constructor(t) {
    this.hook = new It(), this.plugins = {}, this.invokes = {}, this._eventEmitter = new jt(), this.Player = U, this.container = t.container, this.$el = _("div", { class: `${q} mpui` }), this.$main = this.$el.appendChild(_("div", { class: `${q}-main` })), this.$area = this.$main.appendChild(_("div", { class: `${q}-area` })), this.$content = this.$area.appendChild(
      _("div", { class: `${q}-content` })
    ), this.invokes = t.invokes ?? {}, this.plugin = new Rt(this), this._videoController = new Vt(this, t), this.loader = new Dt(this), this.init(t);
  }
  /** 初始化播放器 */
  async init(t) {
    var e;
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
    }), this.plugin.init(t), (e = this.container) == null || e.appendChild(this.$el), this.emit("mounted"), this._videoController.set(t.video || {}, t.autoPlay, t.time);
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
  setVideo(t, e, i) {
    return this._videoController.set(t, e, i);
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
      e && (this.$video.currentTime = it(t, 0, this.$video.duration));
    });
  }
  /** 设置音量
   * @param volume 音量（0-1）
   */
  setVolume(t) {
    this.$video.volume = it(t, 0, 1);
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
    this.plugin.destroy();
  }
};
U.version = Nt, U.gitHash = Pt;
let X = U;
class mt {
  constructor(t) {
    this.player = t, this.plugins = t.plugins, this.throw = t.throw;
  }
}
class qt extends mt {
  $(t) {
    return this.$el.querySelector(t);
  }
  constructor(t, e) {
    super(t), this.$el = e;
  }
}
var L;
class vt extends qt {
  constructor() {
    super(...arguments);
    K(this, L, void 0);
  }
  /** 挂载 */
  mount(e, i) {
    e.appendChild(this.$el), this.unmount(), D(this, L, i == null ? void 0 : i.onUnmount);
  }
  /** 卸载 */
  unmount() {
    var e;
    (e = J(this, L)) == null || e.call(this), D(this, L, void 0);
  }
  show() {
    this.$el.style.display = "";
  }
  hide() {
    this.$el.style.display = "none";
  }
}
L = new WeakMap();
class de extends vt {
}
var T;
class ue extends vt {
  constructor(e, i) {
    super(e, i);
    K(this, T, void 0);
    this.shown = !1;
  }
  /** 挂载 */
  mount(e, i) {
    super.mount(e, { onUnmount: i == null ? void 0 : i.onUnmount }), D(this, T, i == null ? void 0 : i.onToggle);
  }
  /** 卸载 */
  unmount() {
    this.toggle(!1), super.unmount(), D(this, T, void 0);
  }
  /** 切换显示隐藏状态 */
  toggle(e) {
    var i;
    this.shown = e ?? !this.shown, (i = J(this, T)) == null || i.call(this, this.shown);
  }
}
T = new WeakMap();
class pe extends mt {
}
const Ut = ({ divider: s }) => (
  /*html*/
  `
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
      ${s ? (
    /*html*/
    `
            <div class="mpui-slider-divider">
              ${new Array(s).fill(
      /*html*/
      '<div class="mpui-slider-divider-dot"></div>'
    ).join("")}
            </div>
          `
  ) : ""}
    </div>
  </div>
`
);
class Bt {
  constructor({
    container: t,
    min: e,
    max: i,
    step: n,
    divider: o = 0,
    value: r = 0,
    onChange: h,
    onDragStart: l,
    onDragEnd: a,
    onDrag: c
  }) {
    this.container = t, this.min = e, this.max = i, this.step = n || 0, this.divider = o ? typeof o == "boolean" ? this.step : o : 0, this.value = isNaN(r) ? r : Number(r), this.onChange = h, this.onDragStart = l, this.onDragEnd = a, this.onDrag = c, this.$el = this.container.appendChild(
      _(
        "div",
        {
          class: "mpui-slider mpui-slider-horizontal",
          style: "position: relative; width: 100%; height: 100%"
        },
        Ut({ divider: this.divider })
      )
    ), this.$track = this.$el.querySelector(".mpui-slider-track"), this.$bar = this.$track.querySelector(".mpui-slider-bar"), this.$thumbTrack = this.$track.querySelector(".mpui-slider-thumb-track"), this.$thumb = this.$track.querySelector(".mpui-slider-thumb"), this.$el.addEventListener("mousedown", (d) => {
      var w;
      const u = d, { clientX: g } = u, m = this.$track.offsetWidth;
      let p = this.$thumbTrack.offsetWidth;
      p = p || m;
      const P = (m - p) / 2, A = this.$el.getBoundingClientRect().left;
      let y = g - A - P;
      y = y >= p ? p : y <= 0 ? 0 : y;
      const x = this.step ? Math.round(y / p * (this.max - this.min) / this.step) * this.step + this.min : y / p * (this.max - this.min) + this.min;
      (w = this.onDragStart) == null || w.call(this, x), this.value != x && this.drag(x);
      const V = (k) => {
        var nt;
        const b = k, { clientX: $ } = b;
        b.preventDefault(), b.stopPropagation();
        let f = $ - A - P;
        f = f >= p ? p : f <= 0 ? 0 : f;
        const I = this.step ? Math.round(f / p * (this.max - this.min) / this.step) * this.step + this.min : f / p * (this.max - this.min) + this.min;
        this.value != I && this.drag(I), (nt = window.getSelection()) == null || nt.removeAllRanges();
      }, R = (k) => {
        var $, f;
        k.stopPropagation(), ($ = window.getSelection()) == null || $.removeAllRanges(), document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", R), (f = this.onDragEnd) == null || f.call(this, x);
      };
      document.addEventListener("mousemove", V), document.addEventListener("mouseup", R);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var i;
    this.value = t <= this.min ? this.min : t >= this.max ? this.max : t;
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.left = `${e * 100}%`, this.$bar.style.width = `${e * 100}%`, (i = this.onChange) == null || i.call(this, this.value);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const zt = (
  /*html*/
  `
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
`
);
class Ot {
  constructor({
    container: t,
    min: e,
    max: i,
    step: n,
    value: o = 0,
    onChange: r,
    onDragStart: h,
    onDragEnd: l,
    onDrag: a
  }) {
    this.container = t, this.min = e, this.max = i, this.step = n || 0, this.value = isNaN(o) ? o : Number(o), this.onChange = r, this.onDragStart = h, this.onDragEnd = l, this.onDrag = a, this.$el = _(
      "div",
      {
        class: "mpui-slider mpui-slider-vertical",
        style: "position: relative; width: 100%; height: 100%"
      },
      zt
    ), this.$track = this.$el.querySelector(".mpui-slider-track"), this.$bar = this.$track.querySelector(".mpui-slider-bar"), this.$thumbTrack = this.$track.querySelector(".mpui-slider-thumb-track"), this.$thumb = this.$track.querySelector(".mpui-slider-thumb"), this.container.appendChild(this.$el), this.$el.addEventListener("mousedown", (c) => {
      var R;
      const d = c, { clientY: u } = d, g = this.$track.offsetHeight;
      let m = this.$thumbTrack.offsetHeight;
      m = m || g;
      const p = (g - m) / 2, P = this.$el.getBoundingClientRect().top;
      let A = m - (u - P - p);
      A = A >= m ? m : A <= 0 ? 0 : A;
      const y = this.step ? Math.round(A / m * (this.max - this.min) / this.step) * this.step + this.min : A / m * (this.max - this.min) + this.min;
      (R = this.onDragStart) == null || R.call(this, y), this.value != y && this.drag(y);
      const x = (w) => {
        var I;
        const k = w, { clientY: b } = k;
        k.preventDefault(), k.stopPropagation();
        let $ = m - (b - P - p);
        $ = $ >= m ? m : $ <= 0 ? 0 : $;
        const f = this.step ? Math.round($ / m * (this.max - this.min) / this.step) * this.step + this.min : $ / m * (this.max - this.min) + this.min;
        this.value != f && this.drag(f), (I = window.getSelection()) == null || I.removeAllRanges();
      }, V = (w) => {
        var b, $;
        w.stopPropagation(), (b = window.getSelection()) == null || b.removeAllRanges(), document.removeEventListener("mousemove", x), document.removeEventListener("mouseup", V), ($ = this.onDragEnd) == null || $.call(this, y);
      };
      document.addEventListener("mousemove", x), document.addEventListener("mouseup", V);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var i;
    this.value = Math.max(Math.min(t, this.max), this.min);
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.top = `${(1 - e) * 100}%`, this.$bar.style.height = `${Math.max(Math.min(e, 1), 0) * 100}%`, (i = this.onChange) == null || i.call(this, t);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt;
const Z = window, H = Z.trustedTypes, lt = H ? H.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, st = "$lit$", C = `lit$${(Math.random() + "").slice(9)}$`, gt = "?" + C, Wt = `<${gt}>`, M = document, B = () => M.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", $t = Array.isArray, Yt = (s) => $t(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", et = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, at = />/g, E = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, dt = /"/g, ft = /^(?:script|style|textarea|title)$/i, Xt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), F = Xt(1), O = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), S = M.createTreeWalker(M, 129, null, !1);
function yt(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const Zt = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : "", r = j;
  for (let h = 0; h < e; h++) {
    const l = s[h];
    let a, c, d = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, c = r.exec(l), c !== null); )
      u = r.lastIndex, r === j ? c[1] === "!--" ? r = ht : c[1] !== void 0 ? r = at : c[2] !== void 0 ? (ft.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = E) : c[3] !== void 0 && (r = E) : r === E ? c[0] === ">" ? (r = n ?? j, d = -1) : c[1] === void 0 ? d = -2 : (d = r.lastIndex - c[2].length, a = c[1], r = c[3] === void 0 ? E : c[3] === '"' ? dt : ct) : r === dt || r === ct ? r = E : r === ht || r === at ? r = j : (r = E, n = void 0);
    const g = r === E && s[h + 1].startsWith("/>") ? " " : "";
    o += r === j ? l + Wt : d >= 0 ? (i.push(a), l.slice(0, d) + st + l.slice(d) + C + g) : l + C + (d === -2 ? (i.push(void 0), h) : g);
  }
  return [yt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class W {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const h = t.length - 1, l = this.parts, [a, c] = Zt(t, e);
    if (this.el = W.createElement(a, i), S.currentNode = this.el.content, e === 2) {
      const d = this.el.content, u = d.firstChild;
      u.remove(), d.append(...u.childNodes);
    }
    for (; (n = S.nextNode()) !== null && l.length < h; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const d = [];
          for (const u of n.getAttributeNames())
            if (u.endsWith(st) || u.startsWith(C)) {
              const g = c[r++];
              if (d.push(u), g !== void 0) {
                const m = n.getAttribute(g.toLowerCase() + st).split(C), p = /([.?@])?(.*)/.exec(g);
                l.push({ type: 1, index: o, name: p[2], strings: m, ctor: p[1] === "." ? Gt : p[1] === "?" ? Kt : p[1] === "@" ? Qt : G });
              } else
                l.push({ type: 6, index: o });
            }
          for (const u of d)
            n.removeAttribute(u);
        }
        if (ft.test(n.tagName)) {
          const d = n.textContent.split(C), u = d.length - 1;
          if (u > 0) {
            n.textContent = H ? H.emptyScript : "";
            for (let g = 0; g < u; g++)
              n.append(d[g], B()), S.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[u], B());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === gt)
          l.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(C, d + 1)) !== -1; )
            l.push({ type: 7, index: o }), d += C.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = M.createElement("template");
    return i.innerHTML = t, i;
  }
}
function N(s, t, e = s, i) {
  var n, o, r, h;
  if (t === O)
    return t;
  let l = i !== void 0 ? (n = e._$Co) === null || n === void 0 ? void 0 : n[i] : e._$Cl;
  const a = z(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), a === void 0 ? l = void 0 : (l = new a(s), l._$AT(s, e, i)), i !== void 0 ? ((r = (h = e)._$Co) !== null && r !== void 0 ? r : h._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = N(s, l._$AS(s, t.values), l, i)), t;
}
class Ft {
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
    const { el: { content: i }, parts: n } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : M).importNode(i, !0);
    S.currentNode = o;
    let r = S.nextNode(), h = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (h === a.index) {
        let c;
        a.type === 2 ? c = new Y(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new te(r, this, t)), this._$AV.push(c), a = n[++l];
      }
      h !== (a == null ? void 0 : a.index) && (r = S.nextNode(), h++);
    }
    return S.currentNode = M, o;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Y {
  constructor(t, e, i, n) {
    var o;
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cp = (o = n == null ? void 0 : n.isConnected) === null || o === void 0 || o;
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
    t = N(this, t, e), z(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Yt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== v && z(this._$AH) ? this._$AA.nextSibling.data = t : this.$(M.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = W.createElement(yt(n.h, n.h[0]), this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.v(i);
    else {
      const r = new Ft(o, this), h = r.u(this.options);
      r.v(i), this.$(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new W(t)), e;
  }
  T(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t)
      n === e.length ? e.push(i = new Y(this.k(B()), this.k(B()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class G {
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = N(this, t, e, 0), r = !z(t) || t !== this._$AH && t !== O, r && (this._$AH = t);
    else {
      const h = t;
      let l, a;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        a = N(this, h[i + l], e, l), a === O && (a = this._$AH[l]), r || (r = !z(a) || a !== this._$AH[l]), a === v ? t = v : t !== v && (t += (a ?? "") + o[l + 1]), this._$AH[l] = a;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
const Jt = H ? H.emptyScript : "";
class Kt extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== v ? this.element.setAttribute(this.name, Jt) : this.element.removeAttribute(this.name);
  }
}
class Qt extends G {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = N(this, t, e, 0)) !== null && i !== void 0 ? i : v) === O)
      return;
    const n = this._$AH, o = t === v && n !== v || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== v && (n === v || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class te {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
}
const pt = Z.litHtmlPolyfillSupport;
pt == null || pt(W, Y), ((tt = Z.litHtmlVersions) !== null && tt !== void 0 ? tt : Z.litHtmlVersions = []).push("2.8.0");
const _t = (s, t, e) => {
  var i, n;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = o._$litPart$;
  if (r === void 0) {
    const h = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    o._$litPart$ = r = new Y(t.insertBefore(B(), h), h, void 0, e ?? {});
  }
  return r._$AI(s), r;
}, ee = ({
  list: s,
  template: t
}) => F`
  <ul class="mpui-picker">
    ${s.map(
  (e, i) => F`
        <li class="mpui-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, i)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class ie {
  constructor({ container: t, value: e, onChange: i, onPick: n, list: o, template: r, condition: h }) {
    this.container = t, this.list = o, this.value = e, this.onChange = i, this.onPick = n, this.template = r, this.condition = h, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    _t(ee({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(".mpui-picker"), this.$items = this.$el.querySelectorAll(".mpui-picker-item"), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.pick(e.getAttribute("data-value") || void 0);
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.$items.forEach((i, n) => {
      (this.condition ? this.condition(i.getAttribute("data-value"), t) : i.getAttribute("data-value") == t) ? i.classList.add("is-checked") : i.classList.remove("is-checked");
    }), this.value = t, (e = this.onChange) == null || e.call(this, t);
  }
  /** 点选一个选项 */
  pick(t) {
    var e;
    this.setValue(t), (e = this.onPick) == null || e.call(this, t);
  }
}
const se = ({
  list: s,
  template: t
}) => F`
  <ul class="mpui-picker">
    ${s.map(
  (e, i) => F`
        <li class="mpui-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, i)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class ne {
  /** 已选值 */
  get value() {
    return [...this.valueSet];
  }
  constructor({ container: t, value: e = [], list: i, onChange: n, onToggle: o }) {
    this.container = t, this.list = i, this.valueSet = new Set(e), this.onChange = n, this.onToggle = o, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    _t(se({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(".mpui-picker"), this.$items = this.$el.querySelectorAll(".mpui-picker-item"), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.toggle(e.getAttribute("data-value"));
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.valueSet = new Set(t), this.$items.forEach((i, n) => {
      this.valueSet.has(i.getAttribute("data-value")) ? i.classList.add("is-checked") : i.classList.remove("is-checked");
    }), (e = this.onChange) == null || e.call(this, t);
  }
  /** 切换一个选项的选择状态 */
  toggle(t, e) {
    var n, o;
    const i = e ?? !this.valueSet.has(t);
    i ? this.valueSet.add(t) : this.valueSet.delete(t), this.$items.forEach((r, h) => {
      r.getAttribute("data-value") == t && r.classList.toggle("is-checked", i);
    }), (n = this.onChange) == null || n.call(this, this.value), (o = this.onToggle) == null || o.call(this, t, i);
  }
}
class oe {
  constructor({ container: t, value: e = !1, onChange: i, onToggle: n }) {
    this.container = t, this.value = e, this.onChange = i, this.onToggle = n, this.$el = _("div", { class: "mpui-switch" }, this.label), this.$el = this.container.querySelector(".mpui-switch"), this.$el.addEventListener("click", () => {
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
class re {
  constructor({ container: t, value: e = !1, onChange: i, onToggle: n, label: o }) {
    this.container = t, this.value = e, this.onChange = i, this.onToggle = n, this.label = o, this.$el = this.container.appendChild(
      _(
        "div",
        { class: "mpui-checkbox" },
        /*html*/
        `
          <div class="mpui-checkbox-icon"></div>
          <div class="mpui-checkbox-label">${o}</div>
        `
      )
    ), this.$el.addEventListener("click", () => {
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
const me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Checkbox: re,
  MultiPicker: ne,
  Picker: ie,
  Slider: Bt,
  SliderVertical: Ot,
  Switch: oe
}, Symbol.toStringTag, { value: "Module" }));
console.log(
  `
 %c mfunsPlayer v${X.version} ${X.gitHash} %c https://github.com/Mfuns-cn 

`,
  "color: #fff; background: #7b7ff7; padding:5px 0;",
  "background: #f5f5f5; padding:5px 0;"
);
export {
  mt as BasePlugin,
  me as Components,
  de as ControlsPlugin,
  pe as MenuPlugin,
  vt as MountablePlugin,
  ue as PanelPlugin,
  X as Player,
  qt as UIPlugin,
  he as Utils,
  q as classPrefix,
  ce as developers,
  Pt as gitHash,
  ae as repositoryLink,
  Nt as version
};
//# sourceMappingURL=core-player.es.js.map
(function(){"use strict";try{if(typeof document<"u"){var A=document.createElement("style");A.appendChild(document.createTextNode(`@charset "UTF-8";@font-face{font-family:mfunsPlayerIcon;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%20%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3cmetadata%3eGenerated%20by%20IcoMoon%3c/metadata%3e%3cdefs%3e%3cfont%20id='mfunsPlayerIcon'%20horiz-adv-x='1024'%3e%3cfont-face%20units-per-em='1024'%20ascent='960'%20descent='-64'%20/%3e%3cmissing-glyph%20horiz-adv-x='1024'%20/%3e%3cglyph%20unicode='&%23x20;'%20horiz-adv-x='512'%20d=''%20/%3e%3cglyph%20unicode='&%23xe900;'%20glyph-name='play'%20d='M213.398%20860.235c-0.004%200-0.008%200-0.013%200-23.593%200-42.719-19.126-42.719-42.719%200-0.004%200-0.008%200-0.012v0.001-739.009c0-0.045%200-0.098%200-0.151%200-23.516%2019.064-42.58%2042.58-42.58%207.892%200%2015.282%202.147%2021.619%205.889l-0.198-0.108%20640%20369.504c12.843%207.515%2021.333%2021.241%2021.333%2036.951s-8.49%2029.436-21.132%2036.842l-0.201%200.109-640%20369.504c-6.092%203.619-13.428%205.764-21.264%205.78h-0.005z'%20/%3e%3cglyph%20unicode='&%23xe901;'%20glyph-name='pause'%20d='M725.333%20853.333h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-725.333c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v725.333c0%2023.564%2019.103%2042.667%2042.667%2042.667zM213.333%20853.333h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-725.333c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v725.333c0%2023.564%2019.103%2042.667%2042.667%2042.667z'%20/%3e%3cglyph%20unicode='&%23xe902;'%20glyph-name='prev'%20d='M853.13%20845.42c0.053%200%200.116%200%200.179%200%2023.577%200%2042.691-19.113%2042.691-42.691%200-0.020%200-0.040%200-0.060v0.003-709.345c0-0.016%200-0.035%200-0.054%200-23.579-19.115-42.693-42.693-42.693-0.062%200-0.124%200-0.186%200h0.010c-10.061%200.016-19.29%203.568-26.513%209.479l0.075-0.059-443.669%20354.673c-9.804%207.885-16.025%2019.879-16.025%2033.327s6.221%2025.442%2015.943%2033.262l0.083%200.064%20443.669%20354.673c7.149%205.852%2016.377%209.403%2026.435%209.42h0.004zM170.666%20832h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-682.666c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v682.666c0%2023.564%2019.103%2042.667%2042.667%2042.667z'%20/%3e%3cglyph%20unicode='&%23xe903;'%20glyph-name='next'%20d='M170.87%20845.42c-0.053%200-0.116%200-0.179%200-23.577%200-42.691-19.113-42.691-42.691%200-0.020%200-0.040%200-0.060v0.003-709.345c0-0.016%200-0.035%200-0.054%200-23.579%2019.115-42.693%2042.693-42.693%200.062%200%200.124%200%200.186%200h-0.010c10.061%200.016%2019.29%203.568%2026.513%209.479l-0.075-0.059%20443.669%20354.673c9.804%207.885%2016.025%2019.879%2016.025%2033.327s-6.221%2025.442-15.943%2033.262l-0.083%200.064-443.669%20354.673c-7.149%205.852-16.377%209.403-26.435%209.42h-0.004zM768%20832h85.333c23.564%200%2042.667-19.103%2042.667-42.667v-682.667c0-23.564-19.103-42.667-42.667-42.667h-85.333c-23.564%200-42.667%2019.103-42.667%2042.667v682.667c0%2023.564%2019.103%2042.667%2042.667%2042.667z'%20/%3e%3cglyph%20unicode='&%23xe904;'%20glyph-name='repeat'%20d='M213.333%20704h597.333v-238.325l-42.667%2042.667-60.342-60.342%20145.675-145.675%20145.675%20145.675-60.342%2060.342-42.667-42.667v280.992c0%2023.564-19.103%2042.667-42.667%2042.667v0h-682.667c-23.564%200-42.667-19.103-42.667-42.667v0-85.333h85.333zM810.667%20192h-597.333v238.325l42.667-42.667%2060.342%2060.342-145.675%20145.675-145.675-145.675%2060.342-60.342%2042.667%2042.667v-280.992c0-23.564%2019.103-42.667%2042.667-42.667v0h682.667c23.564%200%2042.667%2019.103%2042.667%2042.667v0%2085.333h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe905;'%20glyph-name='repeat-off'%20d='M938.667%20508.342l-42.667-42.667v280.992c0%2023.564-19.103%2042.667-42.667%2042.667v0h-469.333v-85.333h426.667v-238.325l-42.667%2042.667-60.342-60.342%20145.675-145.675%20145.675%20145.675zM213.333%20192v238.325l42.667-42.667%2060.342%2060.342-145.675%20145.675-145.675-145.675%2060.342-60.342%2042.667%2042.667v-280.992c0-23.564%2019.103-42.667%2042.667-42.667v0h469.333v85.333zM140.496%20759.162l60.337%2060.338%20682.671-682.662-60.337-60.338-682.671%20682.662z'%20/%3e%3cglyph%20unicode='&%23xe90c;'%20glyph-name='volume-off'%20d='M285.781%20661.333h-200.448c-23.561-0.009-42.658-19.106-42.667-42.666v-341.334c0.009-23.561%2019.106-42.658%2042.666-42.667h200.449l311.552-207.701v842.069zM512%20186.368l-200.448%20133.632h-183.552v256h183.552l200.448%20133.632zM968.832%20545.826l-60.331%2060.348-97.835-97.835-97.835%2097.835-60.331-60.348%2097.826-97.826-97.826-97.835%2060.331-60.331%2097.835%2097.835%2097.835-97.835%2060.331%2060.331-97.826%2097.835%2097.826%2097.826z'%20/%3e%3cglyph%20unicode='&%23xe90f;'%20glyph-name='volume'%20d='M285.781%20661.333h-200.448c-23.561-0.009-42.658-19.106-42.667-42.666v-341.334c0.009-23.561%2019.106-42.658%2042.666-42.667h200.449l311.552-207.701v842.069zM512%20186.368l-200.448%20133.632h-183.552v256h183.552l200.448%20133.632zM725.333%20448c0-0.040%200-0.087%200-0.134%200-58.859-23.911-112.133-62.549-150.639l-0.006-0.006%2060.41-60.41c54.048%2054.048%2087.478%20128.715%2087.478%20211.189s-33.429%20157.141-87.478%20211.189v0l-60.41-60.41c38.644-38.512%2062.555-91.786%2062.555-150.645%200-0.047%200-0.094%200-0.141v0.007zM896%20448c0-0.071%200-0.156%200-0.241%200-105.946-43.039-201.839-112.588-271.15l-0.011-0.011%2060.467-60.467c84.933%2084.933%20137.465%20202.266%20137.465%20331.869s-52.532%20246.936-137.465%20331.869v0l-60.467-60.467c69.559-69.321%20112.598-165.215%20112.598-271.16%200-0.085%200-0.17%200-0.254v0.013z'%20/%3e%3cglyph%20unicode='&%23xe910;'%20glyph-name='widescreen'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20302.327l-145.673%20145.673%20145.673%20145.673%2060.339-60.339-85.333-85.333%2085.333-85.333-60.339-60.339zM640%20302.327l-60.339%2060.339%2085.333%2085.333-85.333%2085.333%2060.339%2060.339%20145.673-145.673-145.673-145.673z'%20/%3e%3cglyph%20unicode='&%23xe911;'%20glyph-name='widescreen-exit'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM298.667%20302.327l145.673%20145.673-145.673%20145.673-60.339-60.339%2085.333-85.333-85.333-85.333%2060.339-60.339zM725.333%20302.327l60.339%2060.339-85.333%2085.333%2085.333%2085.333-60.339%2060.339-145.673-145.673%20145.673-145.673z'%20/%3e%3cglyph%20unicode='&%23xe912;'%20glyph-name='web-fullscreen'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM341.333%20448v128h128v85.333h-213.333v-213.333h85.333zM682.667%20448v-128h-128v-85.333h213.333v213.333h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe913;'%20glyph-name='web-fullscreen-exit'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20661.333v-85.333h-128v-85.333h213.333v170.667h-85.333zM640%20234.667v85.333h128v85.333h-213.333v-170.667h85.333z'%20/%3e%3cglyph%20unicode='&%23xe914;'%20glyph-name='picture-in-picture'%20d='M426.667%20149.333h-256v597.333h682.667v-256h85.333v298.667c0%2023.564-19.103%2042.667-42.667%2042.667v0h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h298.667zM853.333%20320v-170.667h-256v170.667h256zM896%20405.333h-341.333c-23.564%200-42.667-19.103-42.667-42.667v0-256c0-23.564%2019.103-42.667%2042.667-42.667v0h341.333c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20256c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20661.333v-67.661l-97.826%2097.835-60.348-60.348%2097.835-97.826h-67.661v-85.333h213.333v213.333h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe915;'%20glyph-name='picture-in-picture-exit'%20d='M426.667%20149.333h-256v597.333h682.667v-256h85.333v298.667c0%2023.564-19.103%2042.667-42.667%2042.667v0h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h298.667zM853.333%20320v-170.667h-256v170.667h256zM896%20405.333h-341.333c-23.564%200-42.667-19.103-42.667-42.667v0-256c0-23.564%2019.103-42.667%2042.667-42.667v0h341.333c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20256c0%2023.564-19.103%2042.667-42.667%2042.667v0zM341.333%20448v67.661l97.826-97.835%2060.348%2060.348-97.835%2097.826h67.661v85.333h-213.333v-213.333h85.333z'%20/%3e%3cglyph%20unicode='&%23xe91e;'%20glyph-name='fullscreen'%20d='M170.667%20576v170.667h170.667v85.333h-256v-256h85.333zM682.667%20746.667h170.667v-170.667h85.333v256h-256v-85.333zM341.333%20149.333h-170.667v170.667h-85.333v-256h256v85.333zM853.333%20320v-170.667h-170.667v-85.333h256v256h-85.333z'%20/%3e%3cglyph%20unicode='&%23xe91f;'%20glyph-name='fullscreen-exit'%20d='M256%20832v-170.667h-170.667v-85.333h256v256h-85.333zM938.667%20661.333h-170.667v170.667h-85.333v-256h256v85.333zM85.333%20234.667h170.667v-170.667h85.333v256h-256v-85.333zM768%2064v170.667h170.667v85.333h-256v-256h85.333z'%20/%3e%3cglyph%20unicode='&%23xe920;'%20glyph-name='danmaku'%20d='M896%20832h-768c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h623.957c23.561%200.009%2042.658%2019.106%2042.667%2042.666v597.334c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-0.001zM853.333%20234.667h-611.328l-71.339-57.088v569.088h682.667zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333zM597.333%20490.667h170.667v-85.333h-170.667v85.333z'%20/%3e%3cglyph%20unicode='&%23xe921;'%20glyph-name='danmaku-off'%20d='M512%20234.667h-269.995l-71.339-57.088v569.088h682.667v-256h85.333v298.667c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-768.001c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h239.957zM768%20448c-117.821%200-213.333-95.513-213.333-213.333s95.513-213.333%20213.333-213.333c117.821%200%20213.333%2095.513%20213.333%20213.333v0c0%20117.821-95.513%20213.333-213.333%20213.333v0zM896%20234.667c-0.023-20.025-4.677-38.957-12.948-55.791l0.332%200.747-170.428%20170.428c16.18%207.96%2035.219%2012.616%2055.345%2012.616%2070.527%200%20127.7-57.173%20127.7-127.7%200-0.106%200-0.211%200-0.317v0.016zM640%20234.667c0.023%2020.025%204.677%2038.957%2012.948%2055.791l-0.332-0.747%20170.428-170.428c-16.18-7.961-35.219-12.617-55.346-12.617-70.526%200-127.698%2057.172-127.698%20127.698%200%200.106%200%200.212%200%200.319v-0.016zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333z'%20/%3e%3cglyph%20unicode='&%23xe923;'%20glyph-name='danmaku-settings'%20d='M512%20234.667h-269.995l-71.339-57.088v569.088h682.667v-256h85.333v298.667c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-768.001c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h239.957zM938.667%20234.667c-0.047%2016.253-2.363%2031.946-6.646%2046.804l0.297-1.203%2041.767%2024.115-42.667%2073.901-41.703-24.078c-21.129%2021.473-47.877%2037.355-77.862%2045.267l-1.187%200.266v48.261h-85.333v-48.261c-31.172-8.178-57.92-24.060-79.027-45.51l-0.022-0.022-41.703%2024.078-42.667-73.901%2041.768-24.115c-4.030-13.664-6.349-29.362-6.349-45.602s2.319-31.938%206.643-46.781l-0.294%201.18-41.768-24.115%2042.667-73.901%2041.703%2024.078c21.129-21.473%2047.877-37.355%2077.862-45.267l1.187-0.266v-48.261h85.333v48.261c31.172%208.177%2057.92%2024.060%2079.027%2045.51l0.022%200.023%2041.703-24.078%2042.667%2073.901-41.768%2024.115c3.986%2013.656%206.302%2029.349%206.349%2045.575v0.026zM768%20149.333c-47.128%200-85.333%2038.205-85.333%2085.333s38.205%2085.333%2085.333%2085.333c47.128%200%2085.333-38.205%2085.333-85.333v0c-0.055-47.106-38.227-85.279-85.329-85.333h-0.005zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333z'%20/%3e%3cglyph%20unicode='&%23xe928;'%20glyph-name='advanced-danmaku'%20d='M469.333%20234.667h-227.328l-71.339-57.088v569.088h682.667v-256h85.333v298.667c-0.009%2023.561-19.106%2042.658-42.666%2042.667h-768.001c-23.561-0.009-42.658-19.106-42.667-42.666v-789.334l186.709%20149.333h197.291zM768%20329.788c29.345-34.657%2060.463-65.776%2093.965-94.166l1.156-0.955c-34.658-29.345-65.776-60.463-94.167-93.966l-0.954-1.155c-29.345%2034.657-60.463%2065.776-93.965%2094.166l-1.156%200.955c34.658%2029.346%2065.776%2060.464%2094.167%2093.967l0.954%201.154zM768%20476.026v0c-60.461-99.627-141.732-180.898-238.245-239.6l-3.114-1.759c99.627-60.462%20180.898-141.733%20239.6-238.245l1.759-3.113c60.462%2099.627%20141.733%20180.898%20238.245%20239.6l3.113%201.759c-99.627%2060.462-180.898%20141.733-239.6%20238.245l-1.759%203.113zM768-6.692v0zM256%20661.333h128v-85.333h-128v85.333zM469.333%20661.333h213.333v-85.333h-213.333v85.333zM256%20490.667h256v-85.333h-256v85.333z'%20/%3e%3cglyph%20unicode='&%23xe92a;'%20glyph-name='text'%20d='M170.667%20149.333h682.667v-85.333h-682.667v85.333zM772.508%20194.25l76.317%2038.167-298.667%20597.329h-76.321l-298.667-597.329%2076.325-38.167%2073.541%20147.083h373.929zM367.703%20426.667l144.297%20288.596%20144.299-288.596z'%20/%3e%3cglyph%20unicode='&%23xe92f;'%20glyph-name='send-danmaku'%20d='M904.88%20466.672l-745.228%20411.837c-2.985%201.694-6.557%202.692-10.363%202.692-11.758%200-21.289-9.532-21.289-21.289%200-0.026%200-0.053%200-0.079v0.004-823.673c0-0.022%200-0.048%200-0.074%200-11.758%209.532-21.289%2021.289-21.289%203.805%200%207.377%200.998%2010.469%202.748l-0.106-0.055%20745.228%20411.836c6.617%203.708%2011.015%2010.676%2011.015%2018.672s-4.398%2014.963-10.907%2018.616l-0.107%200.055zM213.333%20144.655v260.678h256v85.333h-256v260.679l548.91-303.345z'%20/%3e%3cglyph%20unicode='&%23xe930;'%20glyph-name='settings'%20d='M405.163%20861.099c0.11-1.989%200.173-4.317%200.173-6.659%200-70.685-57.302-127.987-127.987-127.987-25.858%200-49.924%207.668-70.050%2020.854l0.487-0.3c-49.397-50.063-86.486-112.394-106.279-182.005l-0.729-2.997c41.806-21.62%2069.888-64.533%2069.888-114.005s-28.082-92.386-69.175-113.67l-0.713-0.336c20.522-72.609%2057.611-134.94%20107.054-185.050l-0.046%200.047c19.639%2012.887%2043.705%2020.555%2069.563%2020.555%2070.685%200%20127.987-57.302%20127.987-127.987%200-2.342-0.063-4.67-0.187-6.981l0.014%200.322c32.061-8.618%2068.871-13.568%20106.837-13.568s74.776%204.95%20109.819%2014.24l-2.982-0.672c-0.11%201.989-0.173%204.316-0.173%206.658%200%2070.685%2057.302%20127.987%20127.987%20127.987%2025.858%200%2049.924-7.668%2070.050-20.854l-0.487%200.3c49.397%2050.064%2086.485%20112.394%20106.279%20182.006l0.729%202.997c-41.806%2021.62-69.888%2064.533-69.888%20114.005s28.082%2092.386%2069.175%20113.67l0.713%200.336c-20.523%2072.609-57.611%20134.94-107.054%20185.050l0.046-0.047c-19.638-12.886-43.705-20.554-69.562-20.554-70.685%200-127.987%2057.302-127.987%20127.987%200%202.342%200.063%204.669%200.187%206.98l-0.014-0.322c-32.061%208.618-68.871%2013.568-106.837%2013.568s-74.776-4.95-109.82-14.241l2.982%200.672zM544%20787.797c28.86-85.883%20108.63-146.651%20202.592-146.651%2015.406%200%2030.43%201.634%2044.909%204.737l-1.4-0.251c11.636-16.023%2022.368-34.224%2031.316-53.425l0.855-2.042c-33.68-37.56-54.272-87.458-54.272-142.165s20.592-104.606%2054.449-142.366l-0.177%200.2c-9.803-21.242-20.535-39.444-32.837-56.434l0.667%200.967c-13.079%202.852-28.103%204.485-43.509%204.485-93.963%200-173.732-60.768-202.153-145.147l-0.439-1.504c-10.496-1.024-21.248-1.536-32-1.536s-21.504%200.512-32%201.536c-28.86%2085.883-108.63%20146.651-202.592%20146.651-15.406%200-30.43-1.634-44.909-4.737l1.4%200.251c-11.636%2016.023-22.368%2034.224-31.316%2053.425l-0.855%202.042c33.68%2037.56%2054.272%2087.458%2054.272%20142.165s-20.592%20104.606-54.449%20142.366l0.177-0.2c9.803%2021.242%2020.535%2039.444%2032.837%2056.434l-0.667-0.967c13.079-2.852%2028.103-4.485%2043.509-4.485%2093.963%200%20173.732%2060.768%20202.153%20145.147l0.44%201.504c10.496%201.024%2021.248%201.536%2032%201.536s21.504-0.512%2032-1.536zM512%20533.333c47.128%200%2085.333-38.205%2085.333-85.333s-38.205-85.333-85.333-85.333c-47.128%200-85.333%2038.205-85.333%2085.333v0c0.055%2047.106%2038.227%2085.278%2085.328%2085.333h0.005zM512%20618.667c-94.257%200-170.667-76.41-170.667-170.667s76.41-170.667%20170.667-170.667c94.257%200%20170.667%2076.41%20170.667%20170.667v0c0%2094.257-76.41%20170.667-170.667%20170.667v0z'%20/%3e%3cglyph%20unicode='&%23xe931;'%20glyph-name='caption'%20d='M853.333%20746.667v-597.333h-682.667v597.333h682.667zM896%20832h-768c-23.564%200-42.667-19.103-42.667-42.667v0-682.667c0-23.564%2019.103-42.667%2042.667-42.667v0h768c23.564%200%2042.667%2019.103%2042.667%2042.667v0%20682.667c0%2023.564-19.103%2042.667-42.667%2042.667v0zM384%20362.667c-0.017%200-0.037%200-0.057%200-47.128%200-85.333%2038.205-85.333%2085.333s38.205%2085.333%2085.333%2085.333c23.578%200%2044.923-9.563%2060.367-25.021l0.001-0.001%2060.368%2060.368c-30.885%2030.885-73.551%2049.987-120.679%2049.987-94.257%200-170.667-76.41-170.667-170.667s76.41-170.667%20170.667-170.667c47.128%200%2089.795%2019.103%20120.68%2049.987v0l-60.368%2060.368c-15.405-15.458-36.715-25.022-60.258-25.022-0.019%200-0.037%200-0.056%200h0.003zM682.667%20362.667c-0.017%200-0.037%200-0.057%200-47.128%200-85.333%2038.205-85.333%2085.333s38.205%2085.333%2085.333%2085.333c23.578%200%2044.923-9.563%2060.367-25.021l0.001-0.001%2060.368%2060.368c-30.885%2030.885-73.551%2049.987-120.679%2049.987-94.257%200-170.667-76.41-170.667-170.667s76.41-170.667%20170.667-170.667c47.128%200%2089.795%2019.103%20120.68%2049.987v0l-60.368%2060.368c-15.405-15.458-36.715-25.022-60.258-25.022-0.019%200-0.037%200-0.056%200h0.003z'%20/%3e%3cglyph%20unicode='&%23xe940;'%20glyph-name='left-arrow'%20d='M512%20892.339l60.339-60.339-341.333-341.333h707.661v-85.333h-707.661l341.333-341.333-60.339-60.339-444.339%20444.339%20444.339%20444.339z'%20/%3e%3cglyph%20unicode='&%23xe941;'%20glyph-name='right-arrow'%20d='M512%20892.339l-60.339-60.339%20341.333-341.333h-707.661v-85.333h707.661l-341.333-341.333%2060.339-60.339%20444.339%20444.339-444.339%20444.339z'%20/%3e%3cglyph%20unicode='&%23xe945;'%20glyph-name='close'%20d='M883.499%20759.159l-60.331%2060.339-311.168-311.159-311.159%20311.159-60.339-60.339%20311.159-311.159-311.159-311.168%2060.339-60.331%20311.159%20311.159%20311.168-311.159%2060.331%2060.331-311.159%20311.168%20311.159%20311.159z'%20/%3e%3c/font%3e%3c/defs%3e%3c/svg%3e") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=mpicon-],[class*=" mpicon-"]{font-family:mfunsPlayerIcon!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mpicon-play:before{content:""}.mpicon-pause:before{content:""}.mpicon-prev:before{content:""}.mpicon-next:before{content:""}.mpicon-loop:before{content:""}.mpicon-loop-off:before{content:""}.mpicon-volume-off:before{content:""}.mpicon-volume:before{content:""}.mpicon-widescreen:before{content:""}.mpicon-widescreen-exit:before{content:""}.mpicon-webscreen:before{content:""}.mpicon-webscreen-exit:before{content:""}.mpicon-pip:before{content:""}.mpicon-pip-exit:before{content:""}.mpicon-fullscreen:before{content:""}.mpicon-fullscreen-exit:before{content:""}.mpicon-danmaku:before{content:""}.mpicon-danmaku-off:before{content:""}.mpicon-danmaku-settings:before{content:""}.mpicon-advanced-danmaku:before{content:""}.mpicon-text:before{content:""}.mpicon-send-danmaku:before{content:""}.mpicon-settings:before{content:""}.mpicon-caption:before{content:""}.mpicon-left-arrow:before{content:""}.mpicon-right-arrow:before{content:""}.mpicon-close:before{content:""}.mfuns-player{-webkit-user-select:none;user-select:none;width:100%;height:100%;font-size:12px;display:flex;flex-direction:column}.mfuns-player-main{position:relative;width:100%;flex-grow:1;overflow:hidden}.mfuns-player-area{position:relative;width:100%;height:100%}.mfuns-player-content{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center;background:#000;box-sizing:border-box}.mfuns-player-content video{display:block;width:100%;height:100%}.mfuns-player-head-wrap{position:absolute}.mfuns-player-side-wrap,.mfuns-player-modal-wrap,.mfuns-player-contextmenu-wrap{position:absolute;width:100%;height:100%;top:0;left:0}.mfuns-player-danmaku-wrap{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-danmaku-wrap>div{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player li{list-style:none}.mfuns-player.is-webscreen{z-index:233333}.mfuns-player.is-webscreen .mfuns-player-main{position:fixed;top:0;bottom:0;left:0;right:0;z-index:233333;height:100%}.mpui{color:#404040}.mpui-input{font-family:inherit;font-size:inherit;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;border:1px solid;background-color:transparent;color:#404040;border-color:#e6e6e6;transition:all .2s}.mpui-input:hover{border-color:gray}.mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-button{font-family:inherit;font-size:inherit;height:22px;line-height:22px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;border:1px solid;background-color:transparent;color:#404040;border-color:gray;cursor:pointer;transition:all .2s}.mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mpui-slider{position:relative}.mpui-slider-track{width:4px;height:4px;border-radius:2px;margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:pointer;background:gray}.mpui-slider-bar{background:var(--mp-primary-color, #7b7ff7);border-radius:2px}.mpui-slider-thumb-track{position:relative;width:calc(100% - 12px);height:calc(100% - 12px)}.mpui-slider-thumb{z-index:1;width:12px;height:12px;border-radius:100%;background:var(--mp-primary-color, #7b7ff7)}.mpui-slider-divider{position:absolute;width:100%;display:flex;justify-content:space-between}.mpui-slider-divider-dot{height:4px;width:1px;background-color:#404040;transform:translateY(-50%)}.mpui-picker-item{display:inline-block;padding:0 5px;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);border:transparent solid 1px;transition:color .2s;cursor:pointer}.mpui-picker-item.is-checked{border:transparent solid 1px;border-color:var(--mp-primary-color, #7b7ff7);color:var(--mp-primary-color, #7b7ff7)}.mpui-picker-item:hover,.mpui-picker-item:active{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox{height:22px;cursor:pointer}.mpui-checkbox-icon{position:relative;display:inline-block;vertical-align:middle;margin:4px 0;width:13px;height:13px;border-radius:var(--mp-border-radius, 4px);border:solid;border-width:1px;border-color:gray;box-sizing:border-box;transition:all .2s}.mpui-checkbox-label{position:relative;display:inline-block;vertical-align:middle;line-height:22px;margin:0 2px;transition:all .2s}.mpui-checkbox:hover .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:hover .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox.is-checked .mpui-checkbox-icon{background-color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7);background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain}.mpui-background,.mfuns-player-controls-panel{background-color:var(--mp-bg-light, #ffffff)}.mpui-black,.mfuns-player-danmakubar .mfuns-player-controls-panel,.mpui-dark,.mfuns-player.is-lightoff{color:#ffffffe0}.mpui-black .mpui-input,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input,.mpui-dark .mpui-input,.mfuns-player.is-lightoff .mpui-input{background-color:transparent;color:#ffffffe0;border-color:#ffffff40}.mpui-black .mpui-input:hover,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input:hover,.mpui-dark .mpui-input:hover,.mfuns-player.is-lightoff .mpui-input:hover{border-color:#ffffff80}.mpui-black .mpui-input:focus,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input:focus,.mpui-dark .mpui-input:focus,.mfuns-player.is-lightoff .mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-button,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-button,.mpui-dark .mpui-button,.mfuns-player.is-lightoff .mpui-button{background-color:transparent;color:#ffffffe0;border-color:#ffffff80}.mpui-black .mpui-button:hover,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-button:hover,.mpui-dark .mpui-button:hover,.mfuns-player.is-lightoff .mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-slider-track,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-slider-track,.mpui-dark .mpui-slider-track,.mfuns-player.is-lightoff .mpui-slider-track{background:#ffffff80}.mpui-black .mpui-slider-divider-dot,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-slider-divider-dot,.mpui-dark .mpui-slider-divider-dot,.mfuns-player.is-lightoff .mpui-slider-divider-dot{background-color:#ffffffe0}.mpui-black .mpui-checkbox,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox,.mpui-dark .mpui-checkbox,.mfuns-player.is-lightoff .mpui-checkbox{border-color:#ffffff80}.mpui-black .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-dark .mpui-background,.mfuns-player.is-lightoff .mpui-background,.mpui-dark .mfuns-player-controls-panel,.mfuns-player.is-lightoff .mfuns-player-controls-panel,.mpui-dark.mpui-background,.mpui-background.mfuns-player.is-lightoff,.mpui-dark.mfuns-player-controls-panel,.mfuns-player-controls-panel.mfuns-player.is-lightoff{background-color:var(--mp-bg-dark, #202020)}.mpui-black .mpui-background,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-background,.mpui-black .mfuns-player-controls-panel,.mpui-black.mpui-background,.mpui-black.mfuns-player-controls-panel,.mfuns-player-danmakubar .mfuns-player-controls-panel{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725))}.mfuns-player-danmaku{position:absolute;left:0;right:0;top:0;bottom:0;color:#fff}.mfuns-player-danmaku.is-paused .mfuns-player-danmaku-item{animation-play-state:paused}.mfuns-player-danmaku-top,.mfuns-player-danmaku-bottom{position:absolute;left:50%;text-align:center;visibility:hidden;white-space:pre;will-change:visibility;animation:danmaku-show var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-item{display:inline-block;-webkit-user-select:none;user-select:none;white-space:pre;text-shadow:rgb(0,0,0) 1px 0px 1px,rgb(0,0,0) 0px 1px 1px,rgb(0,0,0) 0px -1px 1px,rgb(0,0,0) -1px 0px 1px;cursor:default}.mfuns-player-danmaku-roll{position:absolute;left:var(--offset);white-space:pre;will-change:transform;animation:danmaku-roll var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-reverse{position:absolute;right:var(--offset);white-space:pre;will-change:transform;animation:danmaku-reverse var(--duration) linear;animation-play-state:running}@keyframes danmaku-roll{0%{transform:translate(0)}to{transform:translate(var(--translateX))}}@keyframes danmaku-reverse{0%{transform:translate(0)}to{transform:translate(calc(var(--translateX) * -1))}}@keyframes danmaku-show{0%{visibility:visible}to{visibility:visible}}.mfuns-player-controller-wrap{position:absolute;bottom:-50px;left:0;right:0;height:50px;transition:bottom .4s ease}.mfuns-player-controller-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;bottom:0;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-controller{position:absolute;bottom:0;left:0;right:0;height:50px;margin:0 15px}.mfuns-player-controller-content{height:calc(100% - 20px);position:relative;margin:15px 0 5px;display:flex;justify-content:space-between;align-items:center;gap:20px}.mfuns-player-controller-left{height:100%;display:flex;align-items:center;flex-shrink:0}.mfuns-player-controller-right{height:100%;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-controller-center{flex-grow:1;display:flex;align-items:center;justify-content:center}.mfuns-player-controller-top{width:100%;height:14px;position:absolute;top:0;display:flex;align-items:center;cursor:pointer;box-sizing:border-box}.mfuns-player.is-active .mfuns-player-controller-wrap,.mfuns-player.is-start .mfuns-player-controller-wrap{bottom:0}.mfuns-player.is-active .mfuns-player-controller-mask,.mfuns-player.is-start .mfuns-player-controller-mask{opacity:1}.mfuns-player-header{position:absolute;top:-50px;left:0;right:0;height:50px;transition:top .4s ease;pointer-events:none}.mfuns-player-header-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x top;bottom:-30px;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-header-main{position:relative;bottom:0;left:0;right:0;height:50px;margin:0 15px;color:#ffffffe0;display:flex;justify-content:space-between;align-items:center}.mfuns-player-header-left{height:100%;max-width:200px;display:flex;align-items:center;flex-shrink:0}.mfuns-player-header-right{height:100%;min-width:200px;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-header-center{flex-grow:1}.mfuns-player.is-active .mfuns-player-header,.mfuns-player.is-start .mfuns-player-header{top:0}.mfuns-player.is-active .mfuns-player-header-mask,.mfuns-player.is-start .mfuns-player-header-mask{opacity:1}.mfuns-player-controls-button{position:relative;height:30px;font-size:12px;display:flex;justify-content:center;cursor:pointer}.mfuns-player-controls-button-icon{padding:0 7px;transition:transform .3s ease}.mfuns-player-controls-button-icon i{font-size:21px;line-height:30px;display:none}.mfuns-player-controls-button-icon i:nth-child(1){display:block}.mfuns-player-controls-button.is-on .mfuns-player-controls-button-icon i:nth-child(1){display:none}.mfuns-player-controls-button.is-on .mfuns-player-controls-button-icon i:nth-child(2){display:block}.mfuns-player-controls-button-text{font-weight:700;font-size:14px;line-height:30px}.mfuns-player-controls-button:hover .mpui-tooltip,.mfuns-player-controls-button:hover .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon{transform:translateY(-2px)}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon:active{transform:translateY(1px)}.mfuns-player-controls-button.is-control .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button.is-control .mfuns-player-controls-icon{transform:translateY(-2px)}.mfuns-player-controls-panel-wrap{position:absolute;left:50%;bottom:100%;transform:translate(-50%);display:none;cursor:default}.mfuns-player-controls-panel{margin-bottom:20px;border-radius:var(--mp-border-radius, 4px);overflow:hidden}.mfuns-player-videotime{width:90px;text-align:center;font-size:13px;margin:0 5px;cursor:pointer}.mfuns-player-videotime-label{width:100%;white-space:nowrap;text-align:center}.mfuns-player-videotime-input{display:none;width:60px;margin:auto;font-size:13px;text-align:center}.mfuns-player-videotime.is-input .mfuns-player-videotime-label{display:none}.mfuns-player-videotime.is-input .mfuns-player-videotime-input{display:block}.mfuns-player-videotitle{font-size:16px;white-space:nowrap}.mfuns-player-progress{position:relative;width:100%;height:4px;background-color:#ffffff40;transition:height .2s ease}.mfuns-player-progress-played{position:absolute;top:0;left:0;height:100%;background-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-progress-buffered{position:absolute;top:0;left:0;height:100%;background-color:#ffffff80}.mfuns-player-progress-thumb-track{position:absolute;top:50%;left:0;width:100%;height:0}.mfuns-player-progress-thumb{position:absolute;transform:translate(-50%,-50%) scale(0);width:14px;height:14px;background-color:var(--mp-primary-color, #7b7ff7);border-radius:7px;transition:transform,border;transition-timing-function:ease;transition-duration:.2s;box-sizing:border-box;border:4px solid white}.mfuns-player-progress-preview{position:absolute;top:-12px;width:0;height:0}.mfuns-player-progress-time{position:absolute;left:50%;bottom:0;transform:translate(-50%);display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-progress-tip{display:none;position:absolute;top:-10px}.mfuns-player-progress-tip:after{content:"";display:block;position:absolute;bottom:-10px;left:50%;transform:translate(-50%);border:5px solid;border-color:var(--mp-primary-color, #7b7ff7) transparent transparent transparent}.mfuns-player-progress.mfuns-player-progress-active{height:6px}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-thumb{transform:translate(-50%,-50%) scale(1)}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-tip{display:block}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-time{display:inline-block}.mfuns-player-progress.mfuns-player-progress-dragging .mfuns-player-progress-thumb{border-width:2px}.mfuns-player.mode-solid .mfuns-player-progress{background-color:#e6e6e680}.mfuns-player.mode-solid .mfuns-player-progress-buffered{background-color:var(--mp-primary-color, #7b7ff7);opacity:.25}.mfuns-player.mode-solid .mfuns-player-progress-time{background-color:var(--mp-bg-light, #ffffff);color:#404040}.mfuns-player-side-wrap{display:none}.mfuns-player-side-wrap.is-show{display:block}.mfuns-player-side{position:absolute;right:20px;width:300px;top:50px;height:calc(100% - 120px);background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-side-mask{position:absolute;width:100%;height:100%}.mfuns-player-side-head{height:36px;padding:0 8px;font-size:14px;display:flex;justify-content:space-between}.mfuns-player-side-title{line-height:36px}.mfuns-player-side-content{height:calc(100% - 36px);overflow:hidden}.mfuns-player-side-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-side-content>*.is-show{display:block}.mfuns-player-side-close{position:absolute;right:0;cursor:pointer}.mfuns-player-side-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-side-panel{position:relative;width:100%;height:100%}.mfuns-player-side .mfuns-player-side-panel{display:none}.mfuns-player-side .mfuns-player-side-panel.is-show{display:block}.mfuns-player-modal-wrap{display:none}.mfuns-player-modal-wrap.is-show{display:block}.mfuns-player-modal{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:200px;min-height:150px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-modal-mask{position:absolute;width:100%;height:100%}.mfuns-player-modal-head{position:relative;height:30px;font-size:14px}.mfuns-player-modal-title{position:absolute;width:100%;text-align:center;line-height:36px}.mfuns-player-modal-close{position:absolute;right:0;cursor:pointer}.mfuns-player-modal-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-modal-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-modal-content>*.is-show{display:block}.mfuns-player-modal .mfuns-player-controller-icon{cursor:pointer;font-size:21px;line-height:30px}.mfuns-player-contextmenu-wrap{display:none}.mfuns-player-contextmenu-wrap.is-show{display:block}.mfuns-player-contextmenu{-webkit-user-select:none;user-select:none;position:absolute;min-width:200px;color:#ffffffe0}.mfuns-player-contextmenu li{height:36px;line-height:36px;cursor:pointer;padding:0 10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mfuns-player-contextmenu li+li{border-top:1px solid rgba(255,255,255,.2509803922)}.mfuns-player-contextmenu li:hover{background-color:#ffffff40}.mfuns-player-contextmenu>ul{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);overflow:hidden;margin-bottom:4px}.mfuns-player-contextmenu>ul:last-child{margin-bottom:0}.mfuns-player-contextmenu-danmaku{max-width:400px}.mfuns-player-contextmenu-danmaku-item{display:flex;justify-content:space-between}.mfuns-player-contextmenu-danmaku-item-content{flex-grow:1}.mfuns-player-contextmenu-danmaku-item-operate{display:flex;flex-shrink:0}.mfuns-player-contextmenu-danmaku-item-operate-btn{padding:0 4px}.mfuns-player-contextmenu-danmaku-item-operate-btn:hover{background-color:#ffffff40}.mfuns-player-footbar{height:40px;width:100%;display:flex;position:relative;bottom:0;left:0;justify-content:space-between;align-items:center;background-color:var(--mp-bg-light, #ffffff);border-top:none;box-sizing:border-box;color:#404040}.mfuns-player-footbar-left{display:flex;flex-shrink:0;height:100%}.mfuns-player-footbar-right{display:flex;flex-grow:1;height:100%;justify-content:flex-end}.mfuns-player-button-volume .mpicon-volume-off,.mfuns-player-button-volume.is-muted .mpicon-volume{display:none}.mfuns-player-button-volume.is-muted .mpicon-volume-off{display:block}.mfuns-player-button-volume-value{width:100%;text-align:center;padding-bottom:4px}.mfuns-player-button-volume-slider{width:100%;height:60px}.mfuns-player-button-volume .mfuns-player-controls-panel{width:30px;padding:4px 0 6px}.mfuns-player-button-settings .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-button-part{display:none}.mfuns-player-button-part.is-show{display:flex}.mfuns-player-button-quality-list{min-width:50px;height:100%}.mfuns-player-button-quality-item{white-space:nowrap;padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-button-quality-item:hover{background-color:#ffffff40}.mfuns-player-button-quality-item.is-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button-next:hover .mfuns-player-controls-button-icon{transform:translate(2px)}.mfuns-player-button-next:hover .mfuns-player-controls-button-icon:active{transform:translate(-1px)}.mfuns-player-button-prev:hover .mfuns-player-controls-button-icon{transform:translate(-2px)}.mfuns-player-button-prev:hover .mfuns-player-controls-button-icon:active{transform:translate(1px)}.mfuns-player-button-next,.mfuns-player-button-prev{display:flex}.mfuns-player-button-next.is-disabled,.mfuns-player-button-prev.is-disabled{color:#ffffff80;cursor:not-allowed}.mfuns-player-button-next.is-disabled.is-autohide,.mfuns-player-button-prev.is-disabled.is-autohide{display:none}.mfuns-player-button-next.is-disabled:hover .mfuns-player-controls-button-icon,.mfuns-player-button-prev.is-disabled:hover .mfuns-player-controls-button-icon,.mfuns-player-button-next.is-disabled:hover .mfuns-player-controls-button-icon:active,.mfuns-player-button-prev.is-disabled:hover .mfuns-player-controls-button-icon:active{transform:unset}.mfuns-player-button-next.is-hidden,.mfuns-player-button-prev.is-hidden{display:none}.mfuns-player-button-next .mfuns-player-controls-button-icon i,.mfuns-player-button-prev .mfuns-player-controls-button-icon i{font-size:16px}.mfuns-player.is-webscreen .mfuns-player-button-widescreen,.mfuns-player.is-fullscreen .mfuns-player-button-widescreen,.mfuns-player-button-danmakutoggle .mpicon-danmaku{display:none}.mfuns-player-button-danmakutoggle.is-on{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button-danmakusettings .mfuns-player-controls-panel{width:270px;padding:5px 15px}.mfuns-player-button-danmakusettings .mfuns-player-slider-wrap{width:160px}.mfuns-player-button-danmakustyle .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-danmaku-style-color-input{width:60px}.mfuns-player-danmaku-style-color-preview{width:36px;height:18px;border:2px solid rgba(255,255,255,.6274509804);border-radius:var(--mp-border-radius, 4px);margin-left:8px}.mfuns-player-danmaku-style-color-dropper{margin-left:5px}.mfuns-player-danmaku-style-color-picker{margin-top:8px;margin-left:30px}.mfuns-player-danmaku-style-color-picker .mpui-picker-item{border:none;padding:0}.mfuns-player-danmaku-style-color-picker .mpui-picker-item>div{width:12px;height:12px;border:2px solid rgba(0,0,0,.2509803922);border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmaku-style-color-picker .mpui-picker-item.is-checked{border:none}.mfuns-player-danmaku-style-color-picker .mpui-picker-item.is-checked>div{border-color:#fff}.mode-solid .mfuns-player-danmaku-style-color-preview{border-color:#00000040}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item>div{border-color:#00000020;border-radius:var(--mp-border-radius, 4px)}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item.is-checked>div{border-color:#00000080}.mfuns-player-hotkeys-list{padding:5px 0;max-height:200px;overflow-y:auto}.mfuns-player-hotkeys-list-item{height:30px;line-height:30px;text-align:center}.mfuns-player-hotkeys-list-key{display:inline-block;width:80px}.mfuns-player-hotkeys-list-description{display:inline-block;width:180px}.mfuns-player-about{padding:10px}.mfuns-player-about-logo{width:360px;height:60px;background-image:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20120%2020'%3e%3cpath%20d='M.896,13.75977v-11.52H3.45605L7.35986,6.896,11.248,2.23975h2.57617v11.52H11.32813v-7.728L7.35986,10.76758,3.376,6.04785v7.71192Z'%20style='fill:%23fff'/%3e%3cpath%20d='M15.69629,13.75977v-10a2.18059,2.18059,0,0,1,.31982-1.15186,2.48209,2.48209,0,0,1,.84815-.84814,2.20945,2.20945,0,0,1,1.168-.31983H21.584V3.90381H18.144V4.48H21.584V6.92773H18.144v6.832Z'%20style='fill:%23fff'/%3e%3cpath%20d='M24.04736,13.43994a2.41285,2.41285,0,0,1-.83984-.84814,2.22332,2.22332,0,0,1-.312-1.15186V4.48h2.44775v6.83154h4.51221V4.48h2.44775v6.96a2.22332,2.22332,0,0,1-.312,1.15186,2.41285,2.41285,0,0,1-.83984.84814,2.21068,2.21068,0,0,1-1.168.31983H25.21533A2.20945,2.20945,0,0,1,24.04736,13.43994Z'%20style='fill:%23fff'/%3e%3cpath%20d='M34.03125,13.75977V4.48h7.08838a2.21076,2.21076,0,0,1,1.168.31982,2.41288,2.41288,0,0,1,.83984.84815,2.22331,2.22331,0,0,1,.312,1.15185v6.96H40.9917v-6.832H36.47949v6.832Z'%20style='fill:%23fff'/%3e%3cpath%20d='M45.91992,13.43994a2.48215,2.48215,0,0,1-.84814-.84814,2.1806,2.1806,0,0,1-.31983-1.15186v-.46435h2.44776v.33593h4.5122v-.96H47.07178a2.18059,2.18059,0,0,1-1.15186-.31982,2.48218,2.48218,0,0,1-.84814-.84815A2.18059,2.18059,0,0,1,44.752,8.03174V6.7998A2.18059,2.18059,0,0,1,45.07178,5.648a2.48218,2.48218,0,0,1,.84814-.84815A2.18068,2.18068,0,0,1,47.07178,4.48h4.76806a2.20953,2.20953,0,0,1,1.168.31982A2.48221,2.48221,0,0,1,53.856,5.648a2.18058,2.18058,0,0,1,.31982,1.15185v.46387H51.71191V6.92773h-4.5122v.96h4.64013a2.20985,2.20985,0,0,1,1.168.32031,2.48077,2.48077,0,0,1,.84815.84765,2.18228,2.18228,0,0,1,.31982,1.15235v1.23193A2.18059,2.18059,0,0,1,53.856,12.5918a2.48218,2.48218,0,0,1-.84815.84814,2.20945,2.20945,0,0,1-1.168.31983H47.07178A2.1806,2.1806,0,0,1,45.91992,13.43994Z'%20style='fill:%23fff'/%3e%3cpath%20d='M61.00732,13.75977V2.25586h9.6001a1.84742,1.84742,0,0,1,.96778.26367,1.9812,1.9812,0,0,1,.69628.69629,1.85,1.85,0,0,1,.25586.96v3.376a1.85,1.85,0,0,1-.25586.96,1.98128,1.98128,0,0,1-.69628.69629,1.84742,1.84742,0,0,1-.96778.26367h-8.3042v4.28809Zm1.91993-5.6001h7.68017a.61483.61483,0,0,0,.43994-.17578.5747.5747,0,0,0,.18409-.43213v-3.376a.62856.62856,0,0,0-.624-.624H62.92725a.62854.62854,0,0,0-.624.624v3.376a.57473.57473,0,0,0,.18408.43213A.614.614,0,0,0,62.92725,8.15967Z'%20style='fill:%23fff'/%3e%3cpath%20d='M74.56689,13.49561a2.01455,2.01455,0,0,1-.70361-.70362,1.845,1.845,0,0,1-.26416-.96826V1.43994h1.312V11.82373a.62854.62854,0,0,0,.624.624H77.103v1.312H75.53516A1.845,1.845,0,0,1,74.56689,13.49561Z'%20style='fill:%23fff'/%3e%3cpath%20d='M80.207,13.75977a1.845,1.845,0,0,1-.96826-.26416,2.01446,2.01446,0,0,1-.70361-.70362,1.845,1.845,0,0,1-.26416-.96826V8.46387h8.12793V6.41553a.62773.62773,0,0,0-.624-.62354H78.271V4.48h7.5039a1.877,1.877,0,0,1,.98389.26367,2.02128,2.02128,0,0,1,.7041.7041,1.84453,1.84453,0,0,1,.26416.96778v7.34424Zm0-1.312h6.1919V9.77588H79.583v2.04785a.62854.62854,0,0,0,.624.624Z'%20style='fill:%23fff'/%3e%3cpath%20d='M90.92627,17.43994V16.11182h5.792a.62772.62772,0,0,0,.624-.624v-1.728h-6.1919a1.842,1.842,0,0,1-.96777-.26416,2.01585,2.01585,0,0,1-.7041-.70362,1.845,1.845,0,0,1-.26416-.96826v-7.312h1.312v7.312a.62854.62854,0,0,0,.624.624h5.56787a.62771.62771,0,0,0,.624-.624v-7.312h1.312V15.48779a1.92385,1.92385,0,0,1-.25586.98389,1.95831,1.95831,0,0,1-.6958.7041,1.8791,1.8791,0,0,1-.98438.26416Z'%20style='fill:%23fff'/%3e%3cpath%20d='M100.96729,13.49561a2.01587,2.01587,0,0,1-.70411-.70362,1.845,1.845,0,0,1-.26416-.96826V6.41553a1.84453,1.84453,0,0,1,.26416-.96778,2.02131,2.02131,0,0,1,.70411-.7041,1.84611,1.84611,0,0,1,.96777-.26367h5.56787a1.87868,1.87868,0,0,1,.98437.26367,2.024,2.024,0,0,1,.70362.7041,1.84453,1.84453,0,0,1,.26416.96778V9.77588h-8.144v2.04785a.62854.62854,0,0,0,.624.624h7.52v1.312h-7.52A1.842,1.842,0,0,1,100.96729,13.49561Zm.34375-5.03174H108.127V6.41553a.62771.62771,0,0,0-.624-.62354h-5.56787a.62771.62771,0,0,0-.624.62354Z'%20style='fill:%23fff'/%3e%3cpath%20d='M111.00684,13.75977V6.41553a1.84453,1.84453,0,0,1,.26416-.96778,2.01989,2.01989,0,0,1,.70361-.7041,1.8491,1.8491,0,0,1,.96826-.26367h5.21582V5.792h-5.21582a.62771.62771,0,0,0-.624.62354v7.34424Z'%20style='fill:%23fff'/%3e%3c/svg%3e");background-size:cover}.mfuns-player-about a{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-list{scrollbar-width:thin;height:100%;overflow-y:auto}.mfuns-player-partlist-list::-webkit-scrollbar{width:5px}.mfuns-player-partlist-list::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-partlist-item{padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-partlist-item:hover{background-color:#ffffff40}.mfuns-player-partlist-item.is-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-item-id{display:inline-block;width:40px;flex-shrink:0}.mfuns-player-partlist-item-title{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mfuns-player-panel-row{display:flex;padding:5px 0}.mfuns-player-row-label{flex-shrink:0;height:22px;line-height:22px;padding-right:10px}.mfuns-player-row-value{height:22px;line-height:22px;padding-left:10px}.mfuns-player-videostatus{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mfuns-player-videostatus-paused{display:none;position:absolute;bottom:60px;right:20px;width:65px;height:55px;background:url(data:image/png;base64,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);background-size:100% 100%}.mfuns-player-videostatus-loading{display:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:100px}.mfuns-player-videostatus-loading-icon{width:100%;display:flex;justify-content:center;align-items:center;font-size:16px;font-weight:700;height:35px}.mfuns-player-videostatus-loading-icon>span{width:20px;height:35px;font-size:16px;text-align:center;line-height:16px;color:var(--mp-primary-color, #7b7ff7);animation:loading-float 1.4s ease-in-out infinite;text-shadow:1px 1px #666}.mfuns-player-videostatus-loading-icon>span:nth-child(2){animation-delay:-1.2s}.mfuns-player-videostatus-loading-icon>span:nth-child(3){animation-delay:-1s}.mfuns-player-videostatus-loading-icon>span:nth-child(4){animation-delay:-.8s}.mfuns-player-videostatus-loading-icon>span:nth-child(5){animation-delay:-.6s}.mfuns-player-videostatus-loading-icon>span:nth-child(6){animation-delay:-.4s}.mfuns-player-videostatus-loading-icon>span:nth-child(7){animation-delay:-.2s}.mfuns-player-videostatus-loading-content{width:100%;text-align:center;font-size:14px;font-weight:700;color:#fff;text-shadow:1px 1px #666}.mfuns-player.is-paused .mfuns-player-videostatus-paused,.mfuns-player.is-loading .mfuns-player-videostatus-loading{display:block}@keyframes loading-float{0%,to{height:35px}50%{height:20px}}.mfuns-player-danmakubar{display:flex;flex-grow:1;justify-content:space-between;align-items:center;height:100%;max-width:600px}.mfuns-player-danmakubar .mfuns-player-danmakubar-status-loading,.mfuns-player-danmakubar .mfuns-player-danmakubar-status-login{display:none;padding-left:10px}.mfuns-player-danmakubar .mfuns-player-danmakubar-status-login a{color:var(--mp-primary-color, #7b7ff7);cursor:pointer}.mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 5px}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-slot{display:none}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap{background-color:#e6e6e6}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-status-login{display:block}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mpui-dark .mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap,.mfuns-player.is-lightoff .mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap{background-color:#ffffff40}.mfuns-player-danmakubar.is-loading .mfuns-player-controls-button{pointer-events:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#e6e6e6 10%,#f0f0f0 24%,#f6f6f6 32%,#f6f6f6 68%,#f0f0f0 76%,#e6e6e6 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mpui-dark .mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap,.mfuns-player.is-lightoff .mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#555 10%,#444 24%,#333 32%,#333 68%,#444 76%,#555 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-slot{display:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-status-loading{display:block}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-status-login{display:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mfuns-player-danmakubar-outer,.mfuns-player-danmakubar-left,.mfuns-player-danmakubar-right{display:flex;flex-shrink:0}.mfuns-player-danmakubar-input-wrap{display:flex;flex-grow:1;align-items:center;position:relative;height:100%;background-color:#ffffff40;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmakubar-input{font-size:13px;flex:5;height:30px;outline:none;border:none;margin-left:5px;color:#ffffffe0;background-color:transparent;box-sizing:border-box;width:0}.mfuns-player-danmakubar-input::-webkit-input-placeholder{color:#ffffff80}.mfuns-player-danmakubar-status-loading{font-size:13px;flex:5;height:32px;line-height:32px;color:#999;box-sizing:border-box;display:none}.mfuns-player-danmakubar-status-login{font-size:13px;flex:5;height:32px;line-height:32px;box-sizing:border-box;display:none}.mfuns-player-danmakubar-send{width:60px;display:flex;align-items:center;justify-content:center;height:30px;font-size:12px;color:#fff;background:var(--mp-primary-color, #7b7ff7);border-radius:0 var(--mp-border-radius, 4px) var(--mp-border-radius, 4px) 0;cursor:pointer}.mfuns-player-footbar{height:40px}.mfuns-player-footbar .mfuns-player-danmakubar{max-width:unset}.mfuns-player-footbar .mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 7px}.mfuns-player-footbar .mfuns-player-danmakubar-input-wrap{height:100%;border-left:1px solid #e6e6e6;border-radius:0;background-color:transparent}.mfuns-player-footbar .mfuns-player-danmakubar-input{font-family:inherit;height:100%;margin-left:5px;color:#404040}.mfuns-player-footbar .mfuns-player-danmakubar-input::-webkit-input-placeholder{color:gray}.mfuns-player-footbar .mfuns-player-danmakubar-send{background:var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);margin-right:6px}.mfuns-player-footbar .mfuns-player-danmakubar-send.is-disabled{background:#e6e6e6;color:gray;cursor:not-allowed}@keyframes skeleton-loading{0%{background-position:200% 0%}to{background-position:0% 100%}}.mfuns-player-settings-play,.mfuns-player-settings-others{display:flex;flex-wrap:wrap;gap:0 10px}.mfuns-player-loadingmask{position:absolute;width:100%;height:100%;left:0;top:0;display:none;background:#000;flex-direction:column;overflow:hidden;color:#ffffffe0}.mfuns-player-loadingmask.is-show{display:flex}.mfuns-player-loadingmask-info{display:flex;flex-direction:column;justify-content:end;flex-grow:1;padding:8px}.mfuns-player-loadingmask-tips{flex-shrink:0;height:24px;padding:0 8px}.mfuns-player-loadingmask-icon{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.mfuns-player-loadingmask-image{width:96px;height:96px;background:url(data:image/gif;base64,R0lGODdhQABAAHcAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLs94w+M85H0iNY7iYp6SS6NG6Tby+AO09uMztOdO6qV4mYRF4DIaGxhqCaVBujlEqzFrFWqBZnu9b0X7HZB35jNY+0+yzqB2b4N4+25qrkNrNvxlvTxfAJwgY4ZTyV4jYh8So2Ejo5xiW2FF5NQl5F1ly2YXJ2cV5yOLZBDoKRWpoWmMltWqZuYlKSNMUWjoLupl2Ectb67bVKgOHAfzZu3L7Wzyph0e5q/womZuQbK2t/chtqhEXfE0M16ypa75DzqoOtoidZ467Lk8t2t2+2q3Xo8afr1wmgOCQJSJ4z9m+b+cE/mNYZlkdewndRaRoMWOgjBlt0nGcE46NtZEkS5o8iTKlypUsW7p8qagAACH5BAkKAAAALAAAAABAAEAAgAAAAAAAAAL/hI+py+0Po5y02otl2Dxk3VHd+EGjF51kyajb44asEqNtzc0J3pzHqgPgbDufwajzIX9AZi65Wh6bU1lpiaU6XyxpMxu7WrfDchlmTqtV6LVb3X7zEOl4LXjj9rT4vT7/1xdnJwgSSDNW6Ee0wKdYdAgZ+Uj3tFg52ZeI+LcJeOGJSTT2FTroQGoplKo6YVo1KsO2+nqJqkriApt5y0sb+4ZRmxgs3MrJWAx6LCmZO2vMvOXc6ej6Wktp/UtpIg07sybay2gnF2brfX6WTr7OjqwOD3gXb/6dgt7s7lsBPc6vEJ9h2TJ4Iojvw8CEUsIt9PVPTMNf5aj122Wm0buNHro0cvyYCeRHeXXOdTuJMqXKlSxbunwJM6bMmRAKAAAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLZdg8T95pYOg94xadYOmoqOm+bBIHcD0rtc3sZO7j6UaGU+5gNA5XSCLQCVA2oVFpiapCWIvUjDQI9lHC5DKzZU6DIer2jv0+arNwmbxu7/3u6P3izNeX9+cXSDi4JGTYAKiHuDj3GKkImYjnVXh5I9QI1SUiOcV59tUISnk4SqK0dapZteICm7n52oZhailKhksrOhmGGcqVJzub61pLw9o65kuMOruIPFnJ+CxtnfoqLFat7OzWvDwMLD7+i3ceI6iO4+i9LUjX+5l+bV+PTA1dXjHO71igfAEDdouWDR/CKwSfoftnLNHCYw93xSO3LuNCjRoa53Hk9aGMuSDaSpo8iTKlypUsW7p8CXNRAQAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLs5ah++mFGxSKZPmNDGqubKsib7rMcGx3bh7EcglAKVgGok8YBCaQReZI2YQ5o7SN83o7TDFQLe/LA4HH5O2wjCaf0uzc+uvzZs+6uLjumNt3vYd+T9eXVwXY8CcnWGhIWMOouOQIiffYOFlpSfmDKYnXVXiYRNPVAjq4qZkIpRoZASplQuRJ4VqlBMfFSsUZ6oZ7isgJpkFriTacyxscdvyrq9xnVkGcmLlrSl0NfG2lhuqHfNkWrd0q3rvYjGpug44d/nJ9HvhWGi/rbH9kZN2efmE2zd+/OQEBAUR2j9u9gO4GwptnT+C7fc/Wretn0dy3jBfi7ozh1TGbyJEkS5o8iTKlypUsW1IoAAA7) center/contain no-repeat;filter:invert(25%) drop-shadow(2px 2px #222);image-rendering:pixelated}.mfuns-player.mpui-white .mfuns-player-loadingmask{background:#fff;color:#404040}.mfuns-player.mpui-white .mfuns-player-loadingmask-image{filter:invert(10%) drop-shadow(2px 2px #aaa)}.mfuns-player-mini{background-color:#000;position:fixed;width:400px;height:225px;right:40px;bottom:40px;display:none;overflow:hidden}.mfuns-player-mini.is-show{display:block}.mfuns-player.is-lightoff{position:relative;z-index:233333}.mfuns-player-lightoff-mask{display:none;z-index:-10;opacity:.9;background-color:#000;position:fixed;top:0;bottom:0;left:0;right:0}.mfuns-player.is-lightoff .mfuns-player-lightoff-mask{display:block}.mfuns-player .mfuns-player-content{padding:var(--padding, 0)}.mfuns-player.is-widescreen .mfuns-player-video-wrap,.mfuns-player.is-webscreen .mfuns-player-video-wrap,.mfuns-player.is-fullscreen .mfuns-player-video-wrap{padding:0}.mfuns-player-toast{position:absolute;bottom:60px;left:20px}.mfuns-player-toast-item{font-size:14px;border-radius:var(--mp-border-radius, 4px);background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;height:30px;margin-bottom:4px;width:fit-content}.mfuns-player-toast-item-content{line-height:30px;padding:0 8px}`)),document.head.appendChild(A)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
