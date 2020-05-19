import j2c from "j2c";

export class Component {
  static install() {
    if (this.css !== undefined) {
      let style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(this.css));
      let head = document.getElementsByTagName("head")[0];
      head.appendChild(style);
    }
  }
}

export default {Component};