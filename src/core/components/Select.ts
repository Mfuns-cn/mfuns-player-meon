import { createElement } from "@/utils";

interface SelectOptionsItem {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
}

interface SelectOptions {
  /** 挂载容器 */
  container?: HTMLElement;
  /** 选择列表 */
  list: SelectOptionsItem[];
  /** 占位文本 */
  placeholder?: string;
  /** 默认值(不填的情况下默认值为undefined) */
  value?: string;
  /** 值更改时触发 */
  onChange?: (value: string) => void;
  /** 选择某一项时触发 */
  onSelect?: (value: string) => void;
}

/** 选择框 */
export class Select implements SelectOptions {
  get container() {
    return (this.$el.parentNode as HTMLElement) || undefined;
  }

  list: SelectOptionsItem[];

  private _value: string;

  /** 已选值 */
  get value() {
    return this._value;
  }

  onChange?: (value: string) => void;

  onSelect?: (value: string) => void;

  $el!: HTMLElement;

  $input: HTMLInputElement;
  $list: HTMLElement;
  $items: HTMLCollectionOf<HTMLLIElement>;

  constructor({ container, value, onChange, onSelect, list }: SelectOptions) {
    this.$el = createElement(
      "div",
      { class: "mpui-select" },
      /* html */ `
      <input class="mpui-select-input" readonly />
      <ul class="mpui-select-list"></ul>
    `
    );
    this.$input = this.$el.querySelector("input")!;
    this.$list = this.$el.querySelector(".mpui-select-list")!;
    this.$items = this.$list.getElementsByTagName("li");
    container?.appendChild(this.$el);
    this.list = list;
    this._value = value || "";
    this.onChange = onChange;
    this.onSelect = onSelect;
    this.setList(list, value);
  }

  /** 设置列表项 */
  public setList(list: SelectOptionsItem[], value?: string) {
    const currentValue = value ?? this.value;
    this.$list.innerHTML = "";
    const fragment = new DocumentFragment();
    list.forEach((item, index) => {
      const $item = createElement(
        "li",
        { class: "mpui-select-item", "data-value": item.value },
        new Text(item.label || item.value)
      );
      if (item.disabled) $item.dataset.disabled = "";

      $item.classList.toggle("is-active", $item.dataset.value == currentValue);

      $item.onclick = () => {
        this.select($item.dataset.value!);
      };

      fragment.appendChild($item);
    });
    this.$el.appendChild(fragment);

    if (value) this.onChange?.(currentValue);
  }

  /** 设置值 */
  public setValue(value: string) {
    [...this.$items].forEach((n, i) => {
      n.classList.toggle("is-active", n.dataset.value == value);
    });
    this._value = value;
    this.onChange?.(value);
  }

  /** 选择一个选项 */
  public select(value: string) {
    [...this.$items].forEach((n, i) => {
      n.classList.toggle("is-active", n.dataset.value == value);
    });
    this._value = value;
    this.onSelect?.(value);
    this.onChange?.(value);
  }

  public setPlaceholder(p: string) {
    this.$input.placeholder = p;
  }
}
