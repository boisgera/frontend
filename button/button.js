import m from "mithril";
import j2c from "j2c";
import {HTML, CSS, join, ValueError} from "./utils.js"


/* Remark :
   There is a general question that should be asked wrt the different
   implementations options. It is : do I want the client to be able to
   override this style / option ? And how ?

   If this is a consequence of a choice by the user, say saying fluid=true
   which sets the style width, then it's fine, I have no issue with overriding
   the user choice of style width since its input is inconsistent.

   The situation is different when a style that I apply is a default,
   or rather a default that cannot be overriden. Then it would be nicer
   to use something like a class style, since it can be overriden by the
   user with an inline style. Of course the other option is to provide
   attributes to disable the automatic styling.

 */

/* TODO
   wrt spacing of elements : put some margin-right on them once the DOM
   has been updated (instead of the CSS) ? The (only) good thing about the 
   CSS way is that it can be overriden by the user if need be, by setting
   0 margins on the items in style. BAH, I can still had a high-level
   styling option "compact" that removed the margin post-processing if
   need be. I can also compute the css margin at runtime and act only
   if it's needed.
 */

/*
Issues :

  - text children are not properly spaced (need to get spanned),
    SOLVED. Wrap them in spans at view-time.

  - we cannot ensure that all children have the proper height, can we ?

  - we cannot safely change the size & style of all sub-components,

All of this pleads for more attrs and no children ? 
(which is exactly what construct ui is doing ?) 

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
  view(vnode) {
    let {attrs, children} = vnode;

    // wrap text nodes in spans so that CSS last-child detection works.
    children = children.map((node) => {
      if (typeof node === "string") {
        return m("span", node);
      } else {
        return node;
      }
    });

    let {
      fluid = false, 
      align = "center", 
      class: classes = "", 
      style = {}, 
      ...otherAttrs // native HTML stuff
    } = attrs;

    // Scoped CSS sheet
    classes = join([classes, Button.css.button]);

    // Inline styles
    style.width = fluid ? "100%" : "auto";
    if (align == "left") {
      style.justifyContent = "flex-start";
    } else if (align == "right") {
      style.justifyContent = "flex-end";
    } else if (align == "center") {
      style.justifyContent = "center"; 
    } else {
        throw new ValueError(`invalid alignment ${align}.`)
    }

    //
    return m("button", {class: classes, style, ...otherAttrs}, children);
  }
}

// CSS 
// -----------------------------------------------------------------------------
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

let css = {
  ".button": {
    ...reset,
    cursor: "pointer",
    minWidth: "3em",
    minHeight: "3em", // min-height would probably be better (think large symbol?)

    // I really still don't know yet how the global settings should be shared ...
    // Here what i want is 2 x lineheight actually. How do I exchange the spacer
    // information ? I CERTAINLY don't want that as an option, it should be a
    // js module, with all relevant constants I guess. Spacing info, lineheight
    // to em ratio, colors, higher-order "styles" (sets of colors, "set of sizes", 
    // etc.)
    // You know, in this respect em is not that bad.
    // I just wish i could use a "line-height" unit.
    // Well, I can if I declare a CSS variable `--lw` everytime the
    // line-weight changes ! Ah fuck, that sucks. Or use line-height in calc ?
    // Can't do. All this sucks big time.
    padding: "0 1em",
    color: "#607d8b",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    "> *:not(:last-child)": {
      marginRight: "0.5em",
    },
  }
}

Button.css = j2c.sheet(css);
HTML.ready(() => CSS.install(Button.css))