import type { TrustedTypesWindow } from "trusted-types/lib";

// Allows minifiers to rename references to globalThis
export const global = globalThis;

export const trustedTypes = (global as unknown as TrustedTypesWindow)
  .trustedTypes;

export const policy = trustedTypes
  ? trustedTypes.createPolicy("lit-html", {
      createHTML: (s) => s,
    })
  : undefined;

/** 绑定属性标记 */
export const boundAttributeSuffix = "$";

/** 占位符标记 */
export const marker = "${}";

/** 占位符注释内容 */
export const markerMatch = "?" + marker;

/** 占位符注释标记 */
export const nodeMarker = `<${markerMatch}>`;

export const SPACE_CHAR = `[ \t\n\f\r]`;
export const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
export const NAME_CHAR = `[^\\s"'>=/]`;

// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.

/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */
export const textEndRegex =
  /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
export const COMMENT_START = 1;
export const TAG_NAME = 2;
export const DYNAMIC_TAG_NAME = 3;

export const commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */
export const comment2EndRegex = />/g;

/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
export const tagEndRegex = new RegExp(
  `>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`,
  "g"
);
export const ENTIRE_MATCH = 0;
export const ATTRIBUTE_NAME = 1;
export const SPACES_AND_EQUALS = 2;
export const QUOTE_CHAR = 3;

export const singleQuoteAttrEndRegex = /'/g;
export const doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */
export const rawTextElement = /^(?:script|style|textarea|title)$/i;

export const NODE_MODE = false;

export const DEV_MODE = true;
