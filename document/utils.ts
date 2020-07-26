// Typescript Helpers
// -----------------------------------------------------------------------------
export class AssertionError extends Error {}

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}

export class TypeError extends Error {}

export class ValueError extends Error {}


// String & Array Helpers
// -----------------------------------------------------------------------------

/**
 * Split a string into words.
 */
export function split(string: string | { [s: string]: boolean }): string[] {
  if (typeof string == "string") {
    const whitespace = /(\s+)/;
    let words = string.split(whitespace);
    words = words.filter((word) => word.trim().length > 0);
    return words;
  } else if (typeof string == "object") {
    const classes: string[] = [];
    for (const [key, value] of Object.entries(string)) {
      if (value) {
        classes.push(key);
      }
    }
    return classes;
  } else {
    throw new TypeError(`invalid argument ${string}`);
  }
}

/**
 * Joins words into a string
 */
export function join(classes: (string | string[])[]) {
  let expanded: string[] = [];
  for (let cls of classes) {
    let newClasses: string[] = [];
    if (typeof cls == "string") {
      newClasses = [cls];
    } else if (Array.isArray(cls)) {
      newClasses = cls;
    }
    expanded = expanded.concat(newClasses);
  }
  return expanded.join(" ");
}

export class HTML {
  /**
   * Execute the callback as soon as the HTML document is ready
   * (or if it already was ready before the call).
   */
  static ready(callback: () => void) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }
}

export class CSS {
  /**
   * Install a stylesheet in the current HTML document.
   */
  static install(css: string) {
    let style = document.createElement("style");
    //style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  }
}


