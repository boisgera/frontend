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

let buttonReset = {
  border: "none",
  background: "none",
  font: "inherit",
  color: "inherit",
  padding: "0",
  "&:focus": {
    outline: "none"
  },
  "&::-moz-focus-inner": {
    border: "0"
  },
}

Button.sheet = j2c.sheet({
  ".button": {
    ...buttonReset,
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
  }
});

// TODO: style :hover, :focus, :active (in this order)