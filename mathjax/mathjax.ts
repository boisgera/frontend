import m from "mithril";
import { HTML, assert, AssertionError } from "./utils";
const r = String.raw;

// MathJax Type Definitions
// -----------------------------------------------------------------------------

// Source: <http://docs.mathjax.org/en/latest/options/startup/startup.html>
interface Startup {
  elements?: any; // The elements to typeset (default is document body)
  typeset?: boolean; // Perform initial typeset?
  ready?: () => void; // Called when components are loaded
  pageReady?: () => void; // Called when MathJax and page are ready
  document?: any; // The document (or fragment or string) to work in
  input?: any; // The names of the input jax to use from among those loaded
  output?: any; // The name for the output jax to use from among those loaded
  handler?: any; // The name of the handler to register from among those loaded
  adaptor?: any; // The name for the DOM adaptor to use from among those loaded
}

// Source: <http://docs.mathjax.org/en/latest/web/typeset.html>
interface Typesetter {
  (elements_or_selectors?: (Element | string)[]): void;
}

interface MathJaxObject {
  startup?: Startup;
  typeset?: Typesetter;
  [_: string]: any;
}

interface MathJaxObjectLoaded extends MathJaxObject {
  typeset: Typesetter;
}

declare global {
  interface Window {
    MathJax: MathJaxObject;
  }
}

function assert_MathJax_is_loaded(
  mathjax: MathJaxObject
): asserts mathjax is MathJaxObjectLoaded {
  if (window.MathJax.typeset === undefined) {
    throw new AssertionError("MathJax window object not loaded yet");
  }
}

// -----------------------------------------------------------------------------
HTML.ready(() => {
  window.MathJax = {};
  /*
  window.MathJax = {
    startup: {
      pageReady: () => {
        // schedule a global typeset to begin with
        assert_MathJax_is_loaded(window.MathJax);
        window.MathJax.typeset();
        // schedule a typeset when a MathJax (mithril) component is updated
        MathJax.prototype.onupdate = function (vnode) {
          assert_MathJax_is_loaded(window.MathJax);
          window.MathJax.typeset([vnode.dom]);
        };
      },
    },
  };*/
  let script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script.async = true;
  document.head.appendChild(script);
});


export interface Attrs {
  content: string;
  display?: "inline" | "block";
}

type Component = m.ClassComponent<Attrs>;
type VNode = m.CVnode<Attrs>;
type VNodeDOM = m.CVnodeDOM<Attrs>;

export class MathJax implements Component {
  content: string | undefined; 

  oncreate(vnode: VNodeDOM) {
    this.onupdate(vnode);
  }

  onupdate(vnode: VNodeDOM) {
    if (window.MathJax.typeset) {
      let content = vnode.attrs.content;
      if (content !== this.content) {
        this.content = content;
        window.MathJax.typeset([vnode.dom]);
        console.log("content:", content);
      }
    }
  }

  view(vnode: VNode) {
    let { attrs } = vnode;
    let { display = "inline", content } = attrs;
    if (display === "inline") {
      content = r`\(${content}\)`;
    } else {
      // display === "block"
      content = r`\[${content}\]`;
    }
    return [
      m(
        "span",
        {
          /*key: content*/
        },
        content
      ),
    ];
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
