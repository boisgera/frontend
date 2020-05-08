import j2c from "j2c";
import m from "mithril";
import feather from "feather-icons";
import utils from "./utils.js"

// TODO : generate all classes, programatically ? Easier not to use classes
//        here I guess ...

export function Icon(name) {
  return {
    view: (vnode) => {
      let icon = feather.icons[name].toSvg(vnode.attrs);
      return m("span", {class: "icon"}, m.trust(icon));
    }
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