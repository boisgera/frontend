import m from "mithril";
import j2c from "j2c";
import {CSS} from "./utils.js"

export class Button {
  static install() {
    CSS.install(Button.sheet);
  }
  view(vnode) {
    let {attrs, children} = vnode;
    attrs.class = attrs.class || "", 
    attrs.class += " " + Button.sheet.button;
    return m("button", attrs, children);
  }
}

Button.sheet = j2c.sheet({
  ".button": {
    color: "red"
  }
});