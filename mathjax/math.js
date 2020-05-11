import m from "mithril";

export class Math {

  static install() {
    window.MathJax = {
      startup: {
        pageReady: () => {
          Math.ready = true;
        }
      }
    };
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    script.async = true;
    document.head.appendChild(script);
  }

  oncreate(vnode) {
    //this.onupdate(vnode);
  }

  onupdate(vnode) {
    if (Math.ready) {
      console.log("dom:", vnode.dom);
      console.log("HTML:", vnode.dom.innerHTML);
      console.log(MathJax.typeset);
      MathJax.typeset([vnode.dom]); // doesn't work after the first time. Why ?
      // note that this elt is the PROCESSED mathjax node, the result, so that
      // makes sense that mathjax doesn't reprocessed. Why has mithril not
      // replaced this node by a new string ?

      // try to replace this dom stuff manually (instead of typeset.Mathjax) 
      // to see if the same issue happens.
      console.log("*");
    }
  }

  view(vnode) {
    let {attrs, children} = vnode;
    let {display = "inline", content} = attrs;
    console.log("view() content:", content);
    if (display === "inline") {
        return m("span", "\\(" + content + "\\)");      
    }
  }
}

Math.ready = false;

export default {Math};