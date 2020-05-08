import m from "mithril";
import j2c from "j2c";
import {CSS} from "./utils.js"

/*
Issues :

  - text children are not properly spaced (need to get spanned),

  - we cannot ensure that all children have the proper height, can we ?

  - we cannot safely change the size & style of all sub-components,

All of this pleads for more attrs and no children (what construct ui is doing) ?

 */

// TODO: hover, disabled, active
// TODO: controlled active ?
// TODO: colors in :hover, :focus, :active (in this order)
//
// backgrounds
// active color: #e7e8e9
// hover color: #eff0f1
// disabled font color: #607d8b

export class Button {
  static install() {
    CSS.install(css);
  }
  view(vnode) {
    let {attrs, children} = vnode;
    let {fluid, align, ...htmlAttrs} = attrs;

    let class_ = attrs.class || "";
    class_ += " " + css.button;

    // Dunno if it's better to use CSS or inline styles here.
    let style = {}
    if (fluid) {
      style.width = "100%";
    }
    if (align === "left") {
      style.justifyContent = "flex-start";
    } else if (align === "right") {
      style.justifyContent = "flex-end";
    } else {
      style.justifyContent = "center"; 
    }

    return m("button", {class: class_, style, ...htmlAttrs}, children);
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

let css = j2c.sheet({
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
    },
    ".fluid" : {
      width: "100%",
    }


  }
});

