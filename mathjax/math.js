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
    return this.onupdate(vnode);
  }

  onupdate(vnode) {
    if (Math.ready) {
      console.log("dom:", vnode.dom);
      console.log("HTML:", vnode.dom.innerHTML);
      // MathJax.typeset(vnode.dom); // not iterable ? WTF ?
      MathJax.typeset(); // doesn't work after the first time. Why ?
      console.log("*");
    }
  }

  view(vnode) {
    let {attrs, children} = vnode;
    let {display = "inline", content} = attrs;
    if (display === "inline") {
        return m("span", "\\(" + content + "\\)");      
    }
  }
}

Math.ready = false;

export default {Math};