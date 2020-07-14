import m from "mithril";
import { HTML } from "./utils.ts";

HTML.ready(() => {
  window.MathJax = {
    startup: {
      pageReady: () => {
        // schedule a global typeset to begin with
        window.MathJax.typeset(); 
        // schedule a typeset when a MathJax component is updated
        MathJax.prototype.onupdate = function (vnode) {
            window.MathJax.typeset([vnode.dom]);
            m.redraw();
        }
      },
    },
  };
  let script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.async = true;
  document.head.appendChild(script);
});

export class MathJax {
  oncreate(vnode) {
    this.onupdate(vnode);
  }

  onupdate(vnode) {} // will be overriden in MathJax startup.

  view(vnode) {
    let { attrs } = vnode;
    let { display = "inline", content } = attrs;
    if (display === "inline") {
      content = `\\(${content}\\)`;
    } else {
      // block
      content = `\\[${content}\\]`;
    }
    return [m("span", { key: content }, content)];
  }
}

// I don't remember what the justification for the key is ... 
// think about it then explain it here. Related to the use of a fragment
// above (won't work otherwise).

export default { MathJax };
