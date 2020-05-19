import j2c from "j2c";
import m from "mithril";
import feather from "feather-icons";
import utils from "./utils.js"

// TODO : Would need to generate once and for all all Icons as classes
//        and remove "name" from the attributes.
//        We should NOT make a function that regenerate a new class
//        since that would fuck up the way mithril works.
//        Unless we cache the class that is returned that is ;
//        then there would be no issue wrt mithril AFAICT.
//        Except merely wrt "style" issues.

export class Icon {
  view(vnode) {
    let {attrs: {name, ...otherAttrs}} = vnode; 
    let icon = feather.icons[name].toSvg(otherAttrs);
      return m("span", {class: "icon"}, m.trust(icon));
  }
}

// The margin-right should probably not be here ; the container should
// decide what the proper margin is.
const sheet = j2c.sheet({
  "@global": {
    ".icon" : {
      lineHeight: "1em",
      "&:not(:last-child)": {
        marginRight: "0.5em",
      }
    }
  }
});

Icon.install = () => utils.CSS.install(sheet);

export default {Icon};