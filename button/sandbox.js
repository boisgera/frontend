import m from "mithril";

export class Sandbox {
  oncreate(vnode) {
    this.onupdate(vnode);
  }
  onupdate(vnode) {
    let children = [...vnode.dom.children].slice(0, -1);
    for (let child of children) {
        child.style.marginBottom = "0.75em";
    }
  }
  view(vnode) {
    let {children, attrs} = vnode;
    let style = {
      padding: "1.5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "300px",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      border: "1px dashed #cfd8dc",
    };
    attrs.style = attrs.style || {};
    attrs.style = {...attrs.style, ...style};
    return m("div", attrs, children); 
  }

};

export default {Sandbox};