import m from "mithril"
import j2c from "j2c"
import {HTML, CSS} from "./utils.js"
import feather from "feather-icons"

// TODO : Static classes, vs factory vs generic Icon.
//        Would need to generate once and for all all Icons as classes
//        and remove "name" from the attributes.
//        We should NOT make a function that regenerate a new class
//        since that would fuck up the way mithril works.
//        Unless we cache the class that is returned that is ;
//        then there would be no issue wrt mithril AFAICT.
//        Except merely wrt "style" issues.
//        The best would probably be : generic Icon + dynamic generation
//        and export (need a list of icon names for that).

// TODO : if height is not given, post-process given the fontSize of the DOM at
//        this place ?

export class Icon {
  view(vnode) {
    let {attrs: {name, ...otherAttrs}} = vnode;
    if (otherAttrs.height === undefined) {
      this.readSizeFromDOM = true
    } 
    let icon = feather.icons[name].toSvg(otherAttrs);
      return m("span", {class: "icon"}, m.trust(icon));
  }
  oncreate(vnode) {
    this.onupdate(vnode);
  }
  onupdate(vnode) {
    if (this.readSizeFromDOM) {
      let svg = vnode.dom.children[0];
      let fontSize = window.getComputedStyle(vnode.dom, null).getPropertyValue("font-size"); 
      svg.setAttribute("height", fontSize);
      svg.setAttribute("width", fontSize);
    }
  }
}

// The margin-right should probably not be here ; the container should
// decide what the proper margin is.
Icon.css = j2c.sheet({
  "@global": {
    ".icon" : {
      lineHeight: "1em",
      "&:not(:last-child)": {
        marginRight: "0.5em",
      }
    }
  }
});

export default {Icon};

HTML.ready(() => CSS.install(Icon.css))