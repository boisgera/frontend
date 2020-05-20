
// String/Array Join & Split
export function split(string) {
  return string.split(/(\s+)/).filter(word => word.trim().length > 0);
}

export function join(classes) {
    let expanded = [];
    for (let cls of classes) {
        expanded = expanded.concat(split(cls));
    }
    return expanded.join(" ");
}

// DOM Helper

export class HTML {
  static ready(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }
}

export class CSS {
  static install(css) {
    let style = document.createElement("style");
    style.type = "text/css";
      style.appendChild(document.createTextNode(css));
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  }
}

class ValueError extends Error {
}

export default {split, join, HTML, CSS, ValueError}