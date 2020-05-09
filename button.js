import m from "mithril";
import j2c from "j2c";
import {split, join} from "./utils.js"
import {Component} from "./component.js"

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

export class Button extends Component {
  view(vnode) {
    let {attrs, children} = vnode;

    //console.log("children:", children);
    // TODO: detect raw text and wrap them in a span automatically.
    children = children.map((node) => {
      if (typeof node === "string") {
        return m("span", node);
      } else {
        return node;
      }
    });

    let {fluid, align, ...htmlAttrs} = attrs;

    let classes = [Button.css.button];

    // Dunno if it's better to use CSS or inline styles here.
    // Well CSS, so that we can override this stuff (cutomize)
    // and if we get rid of it, the default is back to standard settings.
    // Wait, this is the same thing with view called each time ...
    // So dunno. Honnestly, programming with inline style is much more
    // straightforward, the logic is not spread in different places,
    // the code is more compact, no duplication, etc...
    // At this stage, I'd go for styles mostly, and style sheets only
    // when it's required (pseudo-classes, etc.) and maybe for the more
    // "static" part of the styling (?).
    // Even the 'last-child' selector is a piece of shit that would be
    // better codes in js. In a hook ?

    /*
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
    */

    if (fluid) {
      classes.push(Button.css.fluid);
    }
    if (align === "left") {
      classes.push(Button.css["align-left"])
    } else if (align === "right") {
      classes.push(Button.css["align-right"])
    } else {
      classes.push(Button.css["align-center"])
    }

    return m("button", {class: join(classes), ...htmlAttrs}, children);
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

let css = {
  ".button": {
    ...reset,
    cursor: "pointer",
    height: "3em", // min-height would probably be better (think large symbol?)
    // I really still don't know yet how the global settings should be shared ...
    // Here what i want is 2 x lineheight actually. How do I exchange the spacer
    // information ? I CERTAINLY don't want that as an option, it should be a
    // js module, with all relevant constants I guess. Spacing info, lineheight
    // to em ratio, colors, higher-order "styles" (sets of colors, "set of sizes", 
    // etc.)
    padding: "0 0.75em",
    color: "#607d8b",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: "0.5em",
    },
  }
}

css = {...css,
  ".fluid" : { width: "100%"},
}

css = {...css,
  ".align-left" : {
    justifyContent: "left",
  },
  ".align-right" : {
    justifyContent: "right",
  },
  ".align-center": {
    justifyContent: "center",
  }
}


Button.css = j2c.sheet(css);