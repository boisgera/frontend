import j2c from "j2c";
import m from "mithril";
import feather from "feather-icons";
import utils from "./utils.js"

// TODO : Would need to generate once and for all all Icons as classes.
//        We should NOT make a function that regenerate a new class
//        since that would fuck up the way mithril works.
//        Unless we cache the class that is returned that is ;
//        then there would be no issue wrt mithril AFAICT.
//        Except merely wrt "style" issues.

export class Icon {
  view({attrs}) {
    let {name, ...otherAttrs} = attrs;
    console.log("name:", name)
    let icon = feather.icons[name].toSvg(otherAttrs);
      return m("span", {class: "icon"}, m.trust(icon));
  }
}

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