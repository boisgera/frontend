import m from "mithril";
import { HTML } from "./utils";

interface MathJaxObject {
  startup?: {
    pageReady? : () => void;
    [_: string]: any;
  }
  // see <http://docs.mathjax.org/en/latest/web/typeset.html>
  typeset?: (elements_or_selectors?: (Element | string)[]) => void;
}

declare global {
  interface Window { MathJax: MathJaxObject; }
}

HTML.ready(() => {
  window.MathJax = {
    startup: {
      pageReady: () => {
        // schedule a global typeset to begin with
        window.MathJax.typeset(); 
        // schedule a typeset when a MathJax component is updated
        MathJax.prototype.onupdate = function (vnode) {
            console.log("*")
            window.MathJax.typeset([vnode.dom]);
        }
      },
    },
  };
  let script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.async = true;
  document.head.appendChild(script);
});

interface Attrs {
  content: string;
  display?: "inline" | "block";
}

export class MathJax implements m.ClassComponent<Attrs> {
  oncreate(vnode: m.CVnodeDOM<Attrs>) {
    this.onupdate(vnode);
  }

  onupdate(vnode: m.CVnodeDOM<Attrs>) { } // will be overriden in MathJax startup.

  view(vnode: m.CVnode<Attrs>) {
    let { attrs } = vnode; 
    let { display = "inline", content } = attrs;
    if (display === "inline") {
      content = `\\(${content}\\)`;
    } else { // display === "block"
      content = String.raw`\[${content}\]`;
    }
  return [m("span", { /*key: content*/ }, content)];
  }
}

// I don't remember what the justification for the key is ... 
// think about it then explain it here. Related to the use of a fragment
// above (won't work otherwise, the mathjax won't update).
// The stuff forces the recreation of a new node if the content changes
// but why would it matter ? Otherwise we reuse the old one and so what ?
// Why is there no change ?
// Ah, OK, I think I see : mithril is diffing the data and applying 
// what he believes to be the (minimal) right change to the DOM node ;
// But in the meantime, Mathjax has totally change the node, there is no
// reason that what mithril does is appropriate (that it can change something
// given the structural change or that the change would be interpretable by
// mathjax typeset after the fact). --> the safe way is to recreate the DOM
// node from the data from scratch.
//
// TODO: have a look at mithril render.js to see what the diffing is doing ?
//       This is quite complex :(

export default { MathJax };
