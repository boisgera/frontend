import m from "mithril";
import j2c from "j2c";
import {installSheet} from "./utils.js"

export class Button {
  static install() {
    installSheet(Button.sheet);
  }
  view(vnode) {
    let attrs = vnode.attrs;
    if (attrs.class === undefined) {
      attrs.class = ""; 
    } 
    attrs.class += " " + Button.sheet.button;
    return m("button", vnode.attrs, vnode.children);
  }
}

Button.sheet = j2c.sheet({
  ".button": {
    color: "red"
  }
});