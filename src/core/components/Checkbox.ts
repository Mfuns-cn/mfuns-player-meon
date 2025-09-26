import { createElement } from "@/utils";

interface CheckboxOptions {
  /** 挂载容器 */
  container: HTMLElement;
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
export class Checkbox implements CheckboxOptions {
  get container() {
    return (this.$el.parentNode as HTMLElement) || undefined;
  }

  onChange?: (value: boolean) => void;

  onToggle?: (value: boolean) => void;

  readonly label?: string;

  /** 当前值 */
  get value() {
    return this.$input.checked;
  }
  /** 不可用 */
  get disabled() {
    return this.$input.disabled;
  }

  $el: HTMLElement;
  $input: HTMLInputElement;
  $label: HTMLElement;

  constructor({
    container,
    value = false,
    disabled = false,
    onChange,
    onToggle,
    label,
  }: CheckboxOptions) {
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onToggle = onToggle;
    this.label = label;

    this.$el = createElement(
      "label",
      { class: "mpui-checkbox" },
      /*html*/ `
          <input type="checkbox" class="mpui-checkbox-input" />
          <span class="mpui-checkbox-label">${label}</span>
        `
    );
    this.$input = this.$el.querySelector("input")!;
    this.$input.disabled = disabled;
    this.$label = this.$el.querySelector(".mpui-checkbox-label")!;
    container?.appendChild(this.$el);

    // 用户点按复选框事件
    this.$input.onchange = (e) => {
      const checked = (e.target as HTMLInputElement).checked;
      this.onToggle?.(checked);
      this.onChange?.(value);
    };

    // 初始化
    this.setValue(value);
    this.setDisabled(disabled);
  }

  /** 设置复选框状态 */
  public setValue(value: boolean) {
    this.$input.checked = value;
    this.onChange?.(value);
  }

  /** 设置复选框失效状态 */
  public setDisabled(value: boolean) {
    this.$input.disabled = value;
  }

  /** 选中复选框 */
  public toggle(value = !this.value) {
    this.$input.checked = value;
    this.onToggle?.(value);
    this.onChange?.(value);
  }
}
