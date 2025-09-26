import type { TrustedHTML } from "trusted-types/lib";
import { getTemplateHTML } from "./parser";
import {
  marker,
  boundAttributeSuffix,
  rawTextElement,
  markerMatch,
  DEV_MODE,
  NODE_MODE,
  trustedTypes,
} from "./config";

const templateCache = new WeakMap();

// Allows minifiers to rename references to globalThis
const global = globalThis;

const d =
  NODE_MODE && global.document === undefined
    ? ({
        createTreeWalker() {
          return {};
        },
      } as unknown as Document)
    : document;

const walker = d.createTreeWalker(
  d,
  129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */
);

const createElement = (html: TrustedHTML) => {
  const el = d.createElement("template");
  el.innerHTML = html as unknown as string;
  return el;
};

interface Template extends HTMLTemplateElement {
  parts?: any[];
}

interface TemplateResult {
  template: Template;
  values?: any[];
}

/** 生成模板 */
export const html = (
  strings: TemplateStringsArray,
  ...values: any[]
): TemplateResult => {
  // 获取缓存模板，若没有则生成新模板
  const template =
    templateCache.get(strings) || generateTemplate(strings, true);
  return { template, values };
};

/** 生成模板 */
function generateTemplate(strings: TemplateStringsArray, cache?: boolean) {
  // 获取HTML模板
  const [templateHTML, attrNames] = getTemplateHTML(strings);

  // 创建HTML模板元素
  const el: Template = createElement(templateHTML);

  let node: Node | null;
  let nodeIndex = 0;
  let attrNameIndex = 0;
  const partCount = strings.length - 1;
  const parts: any[] = [];
  el.parts = parts;
  walker.currentNode = el.content;

  while ((node = walker.nextNode()) !== null && parts.length < partCount) {
    if (node.nodeType === 1) {
      if (DEV_MODE) {
        const tag = (node as Element).localName;
        // Warn if `textarea` includes an expression and throw if `template`
        // does since these are not supported. We do this by checking
        // innerHTML for anything that looks like a marker. This catches
        // cases like bindings in textarea there markers turn into text nodes.
        if (
          /^(?:textarea|template)$/i!.test(tag) &&
          (node as Element).innerHTML.includes(marker)
        ) {
          const m =
            `Expressions are not supported inside \`${tag}\` ` +
            `elements. See https://lit.dev/msg/expression-in-${tag} for more ` +
            `information.`;
          if (tag === "template") {
            throw new Error(m);
          }
        }
      }
      // TODO (justinfagnani): for attempted dynamic tag names, we don't
      // increment the bindingIndex, and it'll be off by 1 in the element
      // and off by two after it.
      if ((node as Element).hasAttributes()) {
        for (const name of (node as Element).getAttributeNames()) {
          if (name.endsWith(boundAttributeSuffix)) {
            // 绑定属性
            const realName = attrNames[attrNameIndex++];
            const value = (node as Element).getAttribute(name)!;
            const statics = value.split(marker);
            const m = /([.?@])?(.*)/.exec(realName)!;
            parts.push({
              type:
                m[1] === "."
                  ? PartType.PROPERTY
                  : m[1] === "?"
                  ? PartType.BOOLEAN_ATTRIBUTE
                  : m[1] === "@"
                  ? PartType.EVENT
                  : PartType.ATTRIBUTE,
              index: nodeIndex,
              name: m[2],
              strings: statics,
            });
            (node as Element).removeAttribute(name);
          } else if (name.startsWith(marker)) {
            parts.push({
              type: PartType.ELEMENT,
              index: nodeIndex,
            });
            (node as Element).removeAttribute(name);
          }
        }
      }
      // TODO (justinfagnani): benchmark the regex against testing for each
      // of the 3 raw text element names.
      if (rawTextElement.test((node as Element).tagName)) {
        // For raw text elements we need to split the text content on
        // markers, create a Text node for each segment, and create
        // a TemplatePart for each marker.
        const strings = (node as Element).textContent!.split(marker);
        const lastIndex = strings.length - 1;
        if (lastIndex > 0) {
          (node as Element).textContent = trustedTypes
            ? (trustedTypes.emptyScript as unknown as "")
            : "";
          // Generate a new text node for each literal section
          // These nodes are also used as the markers for node parts
          // We can't use empty text nodes as markers because they're
          // normalized when cloning in IE (could simplify when
          // IE is no longer supported)
          for (let i = 0; i < lastIndex; i++) {
            (node as Element).append(strings[i], createMarker());
            // Walk past the marker node we just added
            walker.nextNode();
            parts.push({ type: PartType.CHILD, index: ++nodeIndex });
          }
          // Note because this marker is added after the walker's current
          // node, it will be walked to in the outer loop (and ignored), so
          // we don't need to adjust nodeIndex here
          (node as Element).append(strings[lastIndex], createMarker());
        }
      }
    } else if (node.nodeType === 8) {
      const data = (node as Comment).data;
      if (data === markerMatch) {
        parts.push({ type: PartType.CHILD, index: nodeIndex });
      } else {
        let i = -1;
        while ((i = (node as Comment).data.indexOf(marker, i + 1)) !== -1) {
          // Comment node has a binding marker inside, make an inactive part
          // The binding won't work, but subsequent bindings will
          parts.push({ type: PartType.COMMENT, index: nodeIndex });
          // Move to the end of the match
          i += marker.length - 1;
        }
      }
    }
    nodeIndex++;
  }

  if (DEV_MODE) {
    // If there was a duplicate attribute on a tag, then when the tag is
    // parsed into an element the attribute gets de-duplicated. We can detect
    // this mismatch if we haven't precisely consumed every attribute name
    // when preparing the template. This works because `attrNames` is built
    // from the template string and `attrNameIndex` comes from processing the
    // resulting DOM.
    if (attrNames.length !== attrNameIndex) {
      throw new Error(
        `Detected duplicate attribute bindings. This occurs if your template ` +
          `has duplicate attributes on an element tag. For example ` +
          `"<input ?disabled=\${true} ?disabled=\${false}>" contains a ` +
          `duplicate "disabled" attribute. The error was detected in ` +
          `the following template: \n` +
          "`" +
          strings.join("${...}") +
          "`"
      );
    }
  }

  cache && templateCache.set(strings, el);

  return el;
}

// TemplatePart types
// IMPORTANT: these must match the values in PartType
export enum PartType {
  ATTRIBUTE = 1,
  CHILD = 2,
  PROPERTY = 3,
  BOOLEAN_ATTRIBUTE = 4,
  EVENT = 5,
  ELEMENT = 6,
  COMMENT = 7,
}

class PartAttribute {
  type = PartType.ATTRIBUTE;
  target: HTMLElement;
  name: string;
  value: string;
  constructor(target: HTMLElement, name: string, value: string) {
    this.target = target;
    this.name = name;
    this.value = value;
  }
  render() {
    const { target, name, value } = this;
    target.setAttribute(name, value);
  }
}
class PartBooleanAttribute {
  type = PartType.BOOLEAN_ATTRIBUTE;
  target: HTMLElement;
  name: string;
  value: boolean;
  constructor(target: HTMLElement, name: string, value: boolean) {
    this.target = target;
    this.name = name;
    this.value = value;
  }
  render() {
    const { target, name, value } = this;
    !!value ? target.setAttribute(name, "") : target.removeAttribute(name);
  }
}
class PartProperty {
  type = PartType.PROPERTY;
  target: HTMLElement;
  name: string;
  value: any;
  constructor(target: HTMLElement, name: string, value: any) {
    this.target = target;
    this.name = name;
    this.value = value;
  }
  render() {
    const { target, name, value } = this;
    (target as any)[name] = value;
  }
}
class PartEvent {
  type = PartType.EVENT;
  target: HTMLElement;
  name: string;
  value: (e: Event) => void;
  constructor(target: HTMLElement, name: string, value: (e: Event) => void) {
    this.target = target;
    this.name = name;
    this.value = value;
  }
  render() {
    const { target, name, value } = this;
    target.addEventListener(name, value);
  }
}
class PartElement {
  type = PartType.ELEMENT;
  target: HTMLElement;
  value: string;
  constructor(target: HTMLElement, value: string) {
    this.target = target;
    this.value = value;
  }
  render() {
    const { target, value } = this;
    target.setAttribute(value, "");
  }
}
class PartChild {
  type = PartType.CHILD;
  target: Node;
  value?: ChildValue;
  constructor(target: Node, value?: ChildValue) {
    this.target = target;
    this.value = value;
  }
  render() {
    const { target, value } = this;
    const el = getElement(value);
    console.log(target);
    console.log(el);
    el
      ? target.parentNode?.replaceChild(el, target)
      : target.parentNode?.removeChild(target);
  }
}
class PartComment {
  type = PartType.COMMENT;
  target: Comment;
  value: string;
  constructor(target: Comment, value: string) {
    this.target = target;
    this.value = value;
  }
  render() {
    const { target, value } = this;
    target.data = target.data.replace(marker, value);
  }
}

type Part =
  | PartAttribute
  | PartBooleanAttribute
  | PartProperty
  | PartEvent
  | PartElement
  | PartChild
  | PartComment;

const createMarker = () => d.createComment("");

export function render(tpl: TemplateResult) {
  const { template, values } = tpl;
  const parts = template.parts;
  const fragment = d.importNode(template.content, true);
  walker.currentNode = fragment;

  let node = walker.nextNode()!;
  let nodeIndex = 0;
  let partIndex = 0;
  let valueIndex = 0;
  if (parts && values) {
    let templatePart = parts[0];
    const resultParts: Part[] = [];
    while (templatePart !== undefined) {
      if (nodeIndex === templatePart.index) {
        if (templatePart.type === PartType.ATTRIBUTE) {
          resultParts.push(
            new PartAttribute(
              node as HTMLElement,
              templatePart.name,
              getString(
                templatePart.strings,
                values.slice(
                  valueIndex,
                  valueIndex + templatePart.strings.length - 1
                )
              )
            )
          );
          valueIndex += templatePart.strings.length - 2;
        } else if (templatePart.type === PartType.BOOLEAN_ATTRIBUTE) {
          resultParts.push(
            new PartBooleanAttribute(
              node as HTMLElement,
              templatePart.name,
              !!templatePart.value
            )
          );
          valueIndex += templatePart.strings.length - 2;
        } else if (templatePart.type === PartType.PROPERTY) {
          resultParts.push(
            new PartProperty(
              node as HTMLElement,
              templatePart.name,
              getValue(
                templatePart.strings,
                values.slice(
                  valueIndex,
                  valueIndex + templatePart.strings.length - 1
                )
              )
            )
          );
          valueIndex += templatePart.strings.length - 2;
        } else if (templatePart.type === PartType.EVENT) {
          resultParts.push(
            new PartEvent(
              node as HTMLElement,
              templatePart.name,
              templatePart.value
            )
          );
          valueIndex += templatePart.strings.length - 2;
        } else if (templatePart.type === PartType.ELEMENT) {
          resultParts.push(
            new PartElement(node as HTMLElement, values[valueIndex])
          );
        } else if (templatePart.type === PartType.CHILD) {
          resultParts.push(new PartChild(node, values[valueIndex]));
        } else if (templatePart.type === PartType.COMMENT) {
          resultParts.push(
            new PartComment(node as Comment, values[valueIndex])
          );
        }
        templatePart = parts[++partIndex];
        valueIndex++;
      }
      if (nodeIndex !== templatePart?.index) {
        node = walker.nextNode()!;
        nodeIndex++;
      }
    }
    resultParts.forEach((p) => p.render());
  }
  // We need to set the currentNode away from the cloned tree so that we
  // don't hold onto the tree even if the tree is detached and should be
  // freed.
  walker.currentNode = d;

  return fragment;
}

function getValue(strings: string[], values: any[]) {
  if (strings.length == 2 && !strings[0] && !strings[1]) {
    return values[0];
  } else {
    return getString(strings, values);
  }
}

function getString(strings: string[], values: any[]) {
  let i = 0;
  let str = strings[0];
  while (i < strings.length - 1) {
    str += `${values[i]}`;
    str += `${strings[++i]}`;
  }
  return str;
}

function getElement(value: ChildValue): Node | undefined {
  if (value == null || value === false) {
    return undefined;
  } else if (Array.isArray(value)) {
    const fragment = document.createDocumentFragment();
    value.forEach((i) => {
      const el = getElement(i);
      el && fragment.appendChild(el);
    });
    return fragment;
  } else if (typeof value == "function") {
    return getElement(value());
  } else if (
    (value as TemplateResult).template instanceof HTMLTemplateElement
  ) {
    return render(value as TemplateResult);
  } else if (value instanceof Node) {
    return value;
  } else {
    return new Text(`${value}`);
  }
}

type ChildValue =
  | TemplateResult
  | Node
  | string
  | number
  | boolean
  | null
  | undefined
  | (() => ChildValue)
  | ChildValue[];
