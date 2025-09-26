import { createElement } from "@/utils";

interface PickerOptionsItem<T extends string | number> {
  value: T;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
}

interface PickerOptions<T extends string | number> {
  /** 挂载容器 */
  container?: HTMLElement;
  /** 选择列表 */
  list: PickerOptionsItem<T>[];
  /** 选择项标签模板 */
  itemLabel?: (item: PickerOptionsItem<T>, index: number) => string | HTMLElement;
  /** 默认值(不填的情况下默认值为undefined) */
  value?: T;
  /** 值更改时触发 */
  onChange?: (value: T) => void;
  /** 选择某一项时触发 */
  onPick?: (value: T) => void;
  /** 相等条件 */
  equal?: (itemValue: T, value?: T) => boolean;
}

abstract class BasePicker<T extends string | number> implements PickerOptions<T> {
  private _value: T;

  /** 已选值 */
  get value() {
    return this._value;
  }

  list: PickerOptionsItem<T>[];
  readonly itemLabel?: (item: PickerOptionsItem<T>, index: number) => string | HTMLElement;
  onChange?: (value: T) => void;
  onPick?: (value: T) => void;

  equal?: ((itemValue: T, value?: T) => boolean) | undefined;

  protected abstract form(value: any): T;

  $el: HTMLElement;
  $inputs: HTMLCollectionOf<HTMLInputElement>;

  get container() {
    return (this.$el.parentNode as HTMLElement) || undefined;
  }
  constructor({ container, onChange, onPick, list, itemLabel, value }: PickerOptions<T>) {
    this.$el = createElement("div", { class: "mpui-picker mpui-singlepicker" });
    this.$inputs = this.$el.getElementsByTagName("input");
    container?.appendChild(this.$el);
    this.list = list;
    this.onChange = onChange;
    this.onPick = onPick;
    this.itemLabel = itemLabel;
    this._value = value || this.form("");
    this.setList(list, value);
  }

  /** 设置列表项 */
  public setList(list: PickerOptionsItem<T>[], value?: T) {
    const currentValue = value ?? this.value;
    this.$el.innerHTML = "";
    const fragment = new DocumentFragment();
    list.forEach((item, index) => {
      const $item = createElement("label", {
        class: "mpui-picker-item",
      });
      const $input = $item.appendChild(
        createElement("input", {
          type: "radio",
          class: "mpui-picker-item-input",
          value: String(item.value),
        })
      );
      $input.disabled = !!item.disabled;

      const $label = $item.appendChild(
        createElement(
          "span",
          { class: "mpui-picker-item-label" },
          this.itemLabel?.(item, index) || item.label || String(item.value)
        )
      );

      $input.checked = this.equal
        ? this.equal(this.form($input.value), currentValue)
        : this.form($input.value) == currentValue;
      $input.onchange = (e) => {
        const $target = e.target as HTMLInputElement;
        $target.checked && this.pick(this.form($target.value));
      };

      fragment.appendChild($item);
    });
    this.$el.appendChild(fragment);

    if (value) this.onChange?.(currentValue);
  }
  /** 设置值 */
  public setValue(value: T) {
    [...this.$inputs].forEach((n, i) => {
      n.checked = this.equal ? this.equal(this.form(n.value), value) : this.form(n.value) == value;
    });
    this._value = value;
    this.onChange?.(value);
  }

  /** 点选一个选项 */
  public pick(value: T) {
    [...this.$inputs].forEach((n, i) => {
      n.checked = this.equal ? this.equal(this.form(n.value), value) : this.form(n.value) == value;
    });
    this._value = value;
    this.onPick?.(value);
    this.onChange?.(value);
  }
}

/** 单选选择器 */
export class Picker extends BasePicker<string> {
  form(val: any) {
    return String(val);
  }
}

/** 数值选择器 */
export class NumberPicker extends BasePicker<number> {
  form(val: any) {
    return Number(val);
  }
}
