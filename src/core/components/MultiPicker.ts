import { createElement } from "@/utils";

interface PickerOptionsItem {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
}

interface MultiPickerOptions {
  /** 绑定的dom对象 */
  container?: HTMLElement;
  /** 选择列表 */
  list: PickerOptionsItem[];
  /** 选择项标签模板 */
  itemLabel?: (item: PickerOptionsItem, index: number) => string | HTMLElement;
  /** 默认值(不填的情况下默认值为[]) */
  value?: string[];
  /** 值更改时触发 */
  onChange?: (value: string[]) => void;
  /** 选择/取消选择某一项时触发 */
  onToggle?: (value: string, flag: boolean, list: string[]) => void;
}

/** 多项选择器 */
export class MultiPicker implements MultiPickerOptions {
  get container() {
    return (this.$el.parentNode as HTMLElement) || undefined;
  }

  list: PickerOptionsItem[];

  readonly itemLabel?: (item: PickerOptionsItem, index: number) => string | HTMLElement;

  /** 已选值 */
  get value() {
    return [...this.$inputs].filter((n) => n.checked).map((n) => n.value);
  }

  onChange?: (value: string[]) => void;

  onToggle?: (value: string, flag: boolean, list: string[]) => void;

  $el!: HTMLElement;

  $inputs: HTMLCollectionOf<HTMLInputElement>;

  constructor({ container, value = [], list, onChange, onToggle, itemLabel }: MultiPickerOptions) {
    this.$el = createElement("div", { class: "mpui-picker mpui-multipicker" });
    this.$inputs = this.$el.getElementsByTagName("input");
    container?.appendChild(this.$el);
    this.list = list;
    this.onChange = onChange;
    this.onToggle = onToggle;
    this.itemLabel = itemLabel;
    this.setList(list, value);
  }

  /** 设置列表项 */
  public setList(list: PickerOptionsItem[], value?: string[]) {
    const currentValue = value ?? this.value;
    this.$el.innerHTML = "";
    const fragment = new DocumentFragment();
    list.forEach((item, index) => {
      const $item = createElement("label", {
        class: "mpui-picker-item",
      });
      const $input = $item.appendChild(
        createElement("input", {
          type: "checkbox",
          class: "mpui-picker-item-input",
          value: item.value,
        })
      );
      $input.disabled = !!item.disabled;
      const $label = $item.appendChild(
        createElement(
          "span",
          { class: "mpui-picker-item-label" },
          this.itemLabel?.(item, index) || item.label || item.value.toString()
        )
      );

      $input.checked = currentValue?.includes($input.value) || false;
      $input.onchange = (e) => {
        const $target = e.target as HTMLInputElement;
        this.toggle($target.value, $target.checked);
      };

      fragment.appendChild($item);
    });
    this.$el.appendChild(fragment);

    if (value) this.onChange?.(this.value);
  }

  /** 设置值 */
  public setValue(value: string[]) {
    [...this.$inputs].forEach((n, i) => {
      n.checked = value.includes(n.value);
    });
    this.onChange?.(this.value);
  }

  /** 切换一个选项的选择状态 */
  public toggle(value: string, flag?: boolean) {
    let f = flag;
    let valid = false;
    [...this.$inputs].forEach((n, i) => {
      if (n.value == value) {
        valid = true;
        if (f == undefined) f = !n.value;
        n.checked = f;
      }
    });
    if (valid) {
      const list = this.value;
      this.onToggle?.(value, f!, [...list]);
      this.onChange?.(list);
    }
  }
}
