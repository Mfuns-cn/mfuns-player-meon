import { MultiPicker, Slider } from "@/components";
import { Player } from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { createElement } from "@/utils";

const templateHTML = /*html*/ `
  <div class="${classPrefix}-controls-button-icon">
    <i class="mpicon-danmaku-settings"></i>
  </div>
  <div class="${classPrefix}-controls-panel-wrap">
    <div class="${classPrefix}-controls-panel ${classPrefix}-controls-panel-danmaku-settings">
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">类型屏蔽</div>
        <div class="${classPrefix}-danmaku-settings-filter-picker"></div>
      </div>
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">不透明度</div>
        <div
          class="${classPrefix}-danmaku-settings-opacity-slider ${classPrefix}-slider-wrap"
        ></div>
        <div class="${classPrefix}-danmaku-settings-opacity-value ${classPrefix}-row-value"></div>
      </div>
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">显示区域</div>
        <div class="${classPrefix}-danmaku-settings-area-slider ${classPrefix}-slider-wrap"></div>
        <div class="${classPrefix}-danmaku-settings-area-value ${classPrefix}-row-value"></div>
      </div>
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">文字大小</div>
        <div class="${classPrefix}-danmaku-settings-size-slider ${classPrefix}-slider-wrap"></div>
        <div class="${classPrefix}-danmaku-settings-size-value ${classPrefix}-row-value"></div>
      </div>
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">弹幕速度</div>
        <div
          class="${classPrefix}-danmaku-settings-speed-slider  ${classPrefix}-slider-wrap"
        ></div>
        <div class="${classPrefix}-danmaku-settings-speed-value ${classPrefix}-row-value"></div>
      </div>
    </div>
  </div>
`;

export default class ButtonDanmakuSettings extends ControlsPlugin {
  static pluginName = "buttonDanmakuSettings";

  $icon: HTMLElement;

  $filterPicker: HTMLElement;
  $opacitySlider: HTMLElement;
  $areaSlider: HTMLElement;
  $sizeSlider: HTMLElement;
  $speedSlider: HTMLElement;

  $opacityValue: HTMLElement;
  $areaValue: HTMLElement;
  $sizeValue: HTMLElement;
  $speedValue: HTMLElement;

  pickerFilter!: MultiPicker;
  sliderOpacity!: Slider;
  sliderArea!: Slider;
  sliderSize!: Slider;
  sliderSpeed!: Slider;

  get danmaku() {
    return this.plugins.danmaku!;
  }
  get danmakuEngine() {
    return this.plugins.danmakuEngine!;
  }

  constructor(player: Player) {
    super(
      player,
      createElement(
        "div",
        { class: `${classPrefix}-controls-button ${classPrefix}-button-danmakusettings` },
        templateHTML
      )
    );

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`);

    this.$filterPicker = this.$(`.${classPrefix}-danmaku-settings-filter-picker`);
    this.$opacitySlider = this.$(`.${classPrefix}-danmaku-settings-opacity-slider`);
    this.$areaSlider = this.$(`.${classPrefix}-danmaku-settings-area-slider`);
    this.$sizeSlider = this.$(`.${classPrefix}-danmaku-settings-size-slider`);
    this.$speedSlider = this.$(`.${classPrefix}-danmaku-settings-speed-slider`);

    this.$opacityValue = this.$(`.${classPrefix}-danmaku-settings-opacity-value`);
    this.$areaValue = this.$(`.${classPrefix}-danmaku-settings-area-value`);
    this.$sizeValue = this.$(`.${classPrefix}-danmaku-settings-size-value`);
    this.$speedValue = this.$(`.${classPrefix}-danmaku-settings-speed-value`);
  }

  init() {
    // 弹幕类型屏蔽
    this.pickerFilter = new MultiPicker({
      container: this.$filterPicker,
      value: this.danmakuEngine?.getTypeBlockList() || [],
      list: [
        { value: "roll", label: "滚动" },
        { value: "top", label: "顶部" },
        { value: "bottom", label: "底部" },
        { value: "color", label: "彩色" },
        { value: "special", label: "特殊" },
      ],
      onToggle: (value, flag) => {
        this.danmaku.blockType(value, flag);
        this.player.emit("setValue", "danmaku:blockType", this.pickerFilter.value);
      },
    });
    // 不透明度
    this.sliderOpacity = new Slider({
      container: this.$opacitySlider,
      min: 10,
      max: 100,
      step: 1,
      value: this.danmakuEngine?.opacity * 100 || 100,
      onDrag: (value) => {
        this.danmakuEngine.setOpacity(value / 100);
        this.player.emit("setValue", "danmaku:opacity", value / 100);
      },
      onChange: (value) => {
        this.$opacityValue.innerText = `${value}%`;
      },
    });
    // 显示区域
    this.sliderArea = new Slider({
      container: this.$areaSlider,
      min: 20,
      max: 105,
      step: 5,
      value:
        this.danmakuEngine?.area == null
          ? this.danmakuEngine?.area > 1
            ? 105
            : this.danmakuEngine?.area * 100
          : 25,
      onDrag: (value) => {
        const area = value > 100 ? 20 : value / 100;
        this.danmakuEngine.setArea(area);
        this.player.emit("setValue", "danmaku:area", area);
      },
      onChange: (value) => {
        this.$areaValue.innerText = value < 100 ? `${value}%` : value == 100 ? "不重叠" : "无限";
      },
    });
    this.sliderArea.drag(25);
    // 文字大小
    this.sliderSize = new Slider({
      container: this.$sizeSlider,
      min: 50,
      max: 200,
      step: 1,
      value: this.danmakuEngine?.scale * 100 || 100,
      onDrag: (value) => {
        this.danmakuEngine.setScale(value / 100);
        this.player.emit("setValue", "danmaku:scale", value / 100);
      },
      onChange: (value) => {
        this.$sizeValue.innerText = `${value}%`;
      },
    });
    // 弹幕速度
    this.sliderSpeed = new Slider({
      container: this.$speedSlider,
      min: 20,
      max: 180,
      step: 10,
      value: this.danmakuEngine?.speed * 100 || 100,
      divider: 5,
      onDrag: (value) => {
        this.danmakuEngine.setSpeed(value / 100);
        this.player.emit("setValue", "danmaku:speed", value / 100);
      },
      onChange: (value) => {
        this.$speedValue.innerText = `${value}%`;
      },
    });
  }
}
