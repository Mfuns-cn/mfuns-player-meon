import { createElement } from "@/utils";

interface SwitchOptions {
  /** 挂载容器 */
  container?: HTMLElement;
  /** 标签 */
  label?: string;
  /** 不可点选 */
  disabled?: boolean;
  /** 默认值(不填的情况下默认值为false) */
  value?: boolean;
  /** 值更改时触发 */
  onChange?: (value: boolean) => void;
  /** 切换状态时触发 */
  onToggle?: (value: boolean) => void;
}

/** 开关 */
export class Switch implements SwitchOptions {
  get container() {
    return (this.$el.parentNode as HTMLElement) || undefined;
  }

  onChange?: (value: boolean) => void;

  onToggle?: (value: boolean) => void;

  readonly label?: string;

  /** 当前值 */
  get value() {
    return this.$el.checked;
  }
  /** 不可用 */
  get disabled() {
    return this.$el.disabled;
  }

  $el: HTMLInputElement;

  constructor({ container, value = false, disabled = false, onChange, onToggle }: SwitchOptions) {
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onToggle = onToggle;

    this.$el = createElement("input", { class: `mpui-switch`, type: "checkbox" });
    this.$el.disabled = disabled;
    container?.appendChild(this.$el);

    // 用户点按开关事件
    this.$el.onchange = (e) => {
      const checked = (e.target as HTMLInputElement).checked;
      this.onToggle?.(checked);
    };

    // 初始化
    this.setValue(value);
    this.setDisabled(disabled);
  }

  /** 设置开关状态 */
  public setValue(value: boolean) {
    this.$el.checked = value;
    this.onChange?.(value);
  }

  /** 设置开关失效状态 */
  public setDisabled(value: boolean) {
    this.$el.disabled = value;
  }

  /** 点按开关 */
  public toggle(value = !this.value) {
    this.$el.checked = value;
    this.onToggle?.(value);
    this.onChange?.(value);
  }
}
