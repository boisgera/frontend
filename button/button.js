import m from "mithril";
import j2c from "j2c";
import {HTML, CSS, join, split, ValueError} from "./utils.js"


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

/* Question wrt disabled : have it like an argument in the button view or as
   an internal state ? The idiomatic answer here is probably make it a view
   argument and store the state elsewhere, in the business logic.

 */

// TODO : round the corners,
// TODO : modern vs outlined vs basic styles,
// TODO : active (external) state parameter. Merge with disabled into "status" ?
//        Dunno. Can't be "on" and "disabled" ? Yes it can ...

/* Issue with scoped CSS -- what happens when I try to combine state ?
   To have a set of properties that are set only when several "state variable"
   are set ?

 */

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
      color = false, 
      round = false,
      disabled = false,
      active = false,
      onclick = undefined,
      class: classes = "", 
      style = {}, 
      ...otherAttrs // native HTML stuff
    } = attrs;

    // Scoped CSS sheet
    console.log("classes:", classes);
    classes = split(classes);
    classes.push(Button.css.button);
    if (disabled) {
      console.log("DISABLED");
      classes.push(Button.css["button-disabled"]); // or just "disabled ?"
      onclick = undefined;
    }
    if (active) { // TODO : interaction between disabled and the rest of stats
      classes.push(Button.css.active);
    }
    if (color) {
      classes.push(Button.css.indigo); 
      // it would probably be better to have the structure only in the CSS
      // depending on CSS variables, and to set those in JS, in an inline
      // style. The logic would be cleaner AFAICT. And we could do some
      // dynamic styling if we wanted.
    }
    classes = join([classes])

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

    style.borderRadius = round ? "1.5em" : "3px";


    // the box-shadow would need a common enclosing div and it fucks up 
    // left right alignment as well as fluid modes ...
    return m("button", {class: classes, style, onclick, ...otherAttrs}, children);
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
    borderRadius: "3px",
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
    display: "flex",
    alignItems: "center",
    "> *:not(:last-child)": {
      marginRight: "0.5em",
    },

    transition: "background-color 0.3s cubic-bezier(.4,1,.75,.9), transform .2s cubic-bezier(.4,1,.75,.9)",

    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "#f0f0f0",
      //boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
      //transition: "0.3s ease-in-out",
      //transform: "translateY(-2px)"
    },
    ":focus": {
      //backgroundColor: "#e7e8e9"
    },
    ":active": {
      backgroundColor: "#e7e8e9"
    },
    ".active": {
      backgroundColor: "#e7e8e9"
    },

    ".button-disabled" : {
      backgroundColor: "transparent",
      opacity: 0.65,
      cursor: "not-allowed", 
    },
    ".indigo": {
      ":hover": {
        backgroundColor: "rgb(237, 242, 255)",
        //boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        //transition: "0.3s ease-in-out",
        //transform: "translateY(-2px)"
      },
      ":focus": {
        //backgroundColor: "rgb(219, 228, 255)"
      },
      ":active": {
        backgroundColor: "rgb(219, 228, 255)"
      },
      ".active" :{
        backgroundColor: "rgb(219, 228, 255)"
      },
    }
  }
}

Button.css = j2c.sheet(css);
HTML.ready(() => CSS.install(Button.css))