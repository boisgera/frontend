import m from "mithril";
import "./hyphenation.fr";
import frPatterns from "hyphenation.fr";
import "./tex_linebreak";
import { createHyphenator, justifyContent } from "tex-linebreak";

/*  Question 
    ----------------------------------------------------------------------------
    Who's gonna be responsible for spacing the headers & paragraphs ?
    The section that holds them ? Themselves ?
 */

/* TODO
   -----------------------------------------------------------------------------
   Mettre la justification 'knuth-plass' en option, avec les autres options
   classiques en parallèle et comparer comment ça se comporte.

   Evaluer en particulier l'hyphenation, même si je réussis à en avoir avec
   un seul mot répété, le fait qu'il n'y en ai AUCUNE dans un bloc de lorem 
   ipsum en français assez long est tout de même suspect ...
 */

/* TODO
   -----------------------------------------------------------------------------
   Check Knuth-plass en temps-réel avec un layout fluide et un resize hook ?
 */

/* TODO
   -----------------------------------------------------------------------------
   See how to declare vnode to be of the appropriate type (link to stuff given
   in the mithril types definition)
 */

interface ParagraphAttrs {
  [htmlAttr: string]: any;
}

type ParagraphVNode = m.CVnode<ParagraphAttrs>;
type ParagraphVNodeDOM = m.CVnodeDOM<ParagraphAttrs>;

export class Paragraph implements m.ClassComponent<ParagraphAttrs> {
  oncreate(vnode: ParagraphVNodeDOM) {
    this.onupdate(vnode);
  }
  onupdate(vnode: ParagraphVNodeDOM) {
    const hyphenate = createHyphenator(frPatterns);
    justifyContent([vnode.dom], hyphenate);
  }

  // the same annotation but in the ABOVE methods breaks the use of `Paragraph`
  // below (far) ... whoot ?
  view(vnode: ParagraphVNode): m.Children | null | void {
    let { attrs, children } = vnode;

    // Using the official mithril bindings, style is any (if defined) ?
    // This is a bit weird ; even for "native" components its structured
    // is not defined AFAICT.
    attrs.style = {
      fontSize: "1em",
      marginTop: "0px",
      marginBottom: "1.5em",
      ...(attrs.style || {}),
    };

    return m("p", attrs, children);
  }
}

// There is an issue here, since in the constructor mithril accept data under
// several forms (say style as a string or an object), but when it gives it
// back, thats under a normalized form (always the object AFAICT). So the
// constructor and the other methods do not have the same "Attrs" type.
// Erf, so we need TWO Attrs classes ; at least the derivation scheme allows
// the strict one to be a variant of the lose one.

// Mmm is the normalisation of styles also true for custom components ?
// Or only for native ones ? Anyway this is probably the habits that
// programmers take.

// The two-layer definition is not strictly required here since we have no
// constructor.
interface SectionLoseAttrs {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  runIn?: boolean;
  style?: string | { [_: string]: string };
  [htmlAttr: string]: any;
}

interface SectionAttrs extends SectionLoseAttrs {
  style?: { [_: string]: string };
}

interface SectionVNode extends m.CVnode<SectionAttrs> {}

export class Section implements m.ClassComponent<SectionAttrs> {
  view(vnode: SectionVNode) {
    let { attrs, children } = vnode;
    let { title, level = 1, runIn = false, style = {}, ...htmlAttrs } = attrs;
    let headerStyle: { [key: string]: string };
    if (level == 1) {
      headerStyle = {
        fontSize: "2em",
        lineHeight: "1.5",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem",
      };
    } else if (level == 2) {
      headerStyle = {
        fontSize: Math.sqrt(2) + "em",
        lineHeight: "1.5rem",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem",
      };
    } else if (level == 3) {
      // TODO (optionally ? "Run-in") // can I EMULATE display: run-in ?
      headerStyle = {
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "bold",
        //marginTop: "0px",
        marginBottom: "0em",
      };
      if (runIn) {
        headerStyle.display = "inline";
        headerStyle.marginRight = "1em";
        //console.log(children[0]);
        // check that the first child tag is Paragraph.
        let inpara = children[0].children;
        //attrs.style = para.attrs.style || {};
        //para.attrs.style = {...(para.attrs.style || {}), ...{display: "inline"}};
        children[0] = m(
          Paragraph,
          m("h1", { style: headerStyle }, title),
          inpara
        );
        return m("section", { style }, children);
      }
    }
    return m(
      "section",
      { style },
      m("h1", { style: headerStyle }, title),
      children
    );
  }
}

interface HeaderAttrs {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export class Header implements m.ClassComponent<HeaderAttrs> {
  view(vnode: m.CVnode<HeaderAttrs>) {
    let { attrs, children } = vnode;
    let { level = 1, ...htmlAttrs } = attrs;

    let style: object;
    if (level == 1) {
      style = {
        fontSize: "2em",
        lineHeight: "1.5",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem",
      };
    } else if (level == 2) {
      style = {
        fontSize: Math.sqrt(2) + "em",
        lineHeight: "1.5rem",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem",
      };
    } else if (level == 3) {
      // TODO (optionally ? "Run-in") // can I EMULATE display: run-in ?
      style = {
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "bold",
        //marginTop: "0px",
        //marginBottom: "1.5rem"
      };
    }
    htmlAttrs.style = {
      ...style,
      ...(htmlAttrs.style || {}),
    };
    return m("h" + level, htmlAttrs, children);
  }
}
