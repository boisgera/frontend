
export function installSheet(css) {
  let style = document.createElement("style");
  style.type = "text/css";
    style.appendChild(document.createTextNode(css));
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}
