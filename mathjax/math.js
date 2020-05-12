import m from "mithril";

export class Math {
  static install() {
    window.MathJax = {
      startup: {
        pageReady: () => {
          Math.prototype.onupdate = function(vnode) {
            MathJax.typeset([vnode.dom]); 
          }
          m.redraw(); 
        }
      }
    };
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    script.async = true;
    document.head.appendChild(script);
  }

  oncreate(vnode) {
    this.onupdate(vnode);
  }

  onupdate(vnode) {
  }

  view(vnode) {
    let {attrs} = vnode;
    let {display = "inline", content} = attrs;
    if (display === "inline") {
      content = `\\(${content}\\)`
    } else { // block
      content = `\\[${content}\\]`
    }
    return [m("span", {key: content}, content)];      
  }
}

export default {Math};