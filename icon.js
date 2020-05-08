import m from "mithril";
import feather from "feather-icons";

// TODO : generate all classes, programatically ? Easier not to use classes
//        here I guess ...

export function Icon(name) {
  return {
    view: (vnode) => {
      let icon = feather.icons[name].toSvg(vnode.attrs);
      return m.trust(icon);
    }
  }
}