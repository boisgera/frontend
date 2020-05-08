import m from "mithril";
import j2c from "j2c";
import {CSS} from "./utils.js"

/*
Issues :

  - text children are not properly spaced (need to get spanned),

  - we cannot ensure that all children have the proper height,

  - we cannot safely change the size of all sub-components,

All of this pleads for more attrs and no children (what construct ui is doing) ?

 */

export class Button {
  static install() {
    CSS.install(sheet);
  }
  view(vnode) {
    let {attrs, children} = vnode;
    attrs.class = attrs.class || "", 
    attrs.class += " " + sheet.button;
    return m("button", attrs, children);
  }
}

let reset = {
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

let sheet = j2c.sheet({
  ".button": {
    ...reset,
    cursor: "pointer",
    height: "3em",
    padding: "0 1em",
    color: "#607d8b",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: "0.5em",
    }
  }
});

// TODO: style :hover, :focus, :active (in this order)