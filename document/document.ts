import m from "mithril";
import "./missing_declarations"; // Typescript stuff

import { v4 as uuid } from 'uuid';

import frPatterns from "hyphenation.fr";
import { createHyphenator, justifyContent } from "tex-linebreak";

import { ValueError } from "./utils";

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

// Hyphenation
// -----------------------------------------------------------------------------
const hyphenate = createHyphenator(frPatterns);

function justify(...nodes: Element[]) {
  justifyContent(nodes, hyphenate);
}

interface ParagraphAttrs {
  justify: boolean; 
  [htmlAttr: string]: any;
}
type ParagraphVnode = m.CVnode<ParagraphAttrs>;
type ParagraphVnodeDOM = m.CVnodeDOM<ParagraphAttrs>;

export class Paragraph implements m.ClassComponent<ParagraphAttrs> {
  justify: boolean = false;

  oncreate(vnode: ParagraphVnodeDOM) {
    this.onupdate(vnode);
  }

  // This stuff will probably go badly with diffs (spans and brs are added); 
  // re-creation should probably be forced.
  // I am not sure since I am using the same text content over and over,
  // but this is a risk. What key should I use ? the text content ? But I
  // don't know what it is ! A uuid ? Since we don't know when NOT to re-justify,
  // I guess that we should always re-run the justification.
  onupdate(vnode: ParagraphVnodeDOM) {
    if (this.justify) { 
      justify(vnode.dom);
    }
  }

  // the same annotation but in the ABOVE methods breaks the use of `Paragraph`
  // below (far) ... whoot ?
  view(vnode: ParagraphVnode): m.Children {
    let { attrs, children } = vnode;
    this.justify = attrs.justify;

    // Using the official mithril bindings, style is any (if defined) ?
    // This is a bit weird ; even for "native" components its structured
    // is not defined AFAICT.
    attrs.style = {
      fontSize: "1em",
      marginTop: "0px",
      marginBottom: "1.5em",
      ...(attrs.style || {}),
    };

    return [m("p", {key: uuid(), ...attrs}, children)];
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
// constructor and only the constructor has to accepted not-yet-normalized
// attributes AFAICT.
interface SectionAttrs {
  title: m.Children;
  //level?: 1 | 2 | 3 | 4 | 5 | 6;
  headerDisplay?: "inline" | "block" | "run-in"
  //style?: string | { [_: string]: string };
  [htmlAttr: string]: any;
}

// interface SectionAttrs extends SectionLoseAttrs {
//   style?: { [_: string]: string };
// }

interface SectionVnode extends m.CVnode<SectionAttrs> {}

interface NonEmptyChildArray extends m.ChildArray {
  0: m.Vnode<any, any>;
}

// TODO : change this for a function that performs the runtime check or throws
//        and otherwise return the same argument with a proper TS type ?

function starts_with_Paragraph(children: m.Children): children is NonEmptyChildArray {
  if (!Array.isArray(children)) {
    return false;
  }
  children = children as m.ChildArray;
  if (children.length == 0) {
    return false;
  }
  let first = children[0];
  if (!(typeof first === "object")) {
    return false;
  }
  first = first as m.Vnode<any, any>;
  if (!(first.tag === Paragraph)) {
    return false;
  }
  return true;
}

// TODO: study the out-factorization of the header component and style here.
//       This component does too much (internally). Yeah, that's almost done
//       already.

window.onresize = () => { console.log("*"); m.redraw() };

// Question: can I MOVE the runIn option to the header ? Would it be wise ?
export class Section implements m.ClassComponent<SectionAttrs> {
  view(vnode: SectionVnode) {
    let { attrs, children } = vnode;
    let { title, level = 1, headerDisplay = "block", ...htmlAttrs } = attrs;

    /*
    let headerStyle = {};
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
      // Make section look at the "display" attribute in style ? and work
      // from here ? Or top-level custom attribute ? Nota : the css prop
      // works on the header, not the section ...
      headerStyle = {
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "bold",
        //marginTop: "0px",
        marginBottom: "0em",
      };
    } */

    let style = htmlAttrs.style || {};
    if (headerDisplay === "block" || headerDisplay === "inline") {
      return m("section", { style }, m(Header, {level}, title), children);
    } else { // "run-in"
      let headerStyle: any = {};
      headerStyle.display = "inline";
      headerStyle.marginRight = "1em";

      if (!starts_with_Paragraph(children)) {
        throw new ValueError();
      }

      let inpara = children[0].children;
      children[0] = m(
        Paragraph,
        m(Header, { level, style: headerStyle }, title),
        inpara
      );
      console.log(children);
      return m("section", { style }, children);
    } 
  }
}

interface HeaderAttrs {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  style?: { [key: string]: string };
  [htmlAttr: string]: any;
}

export class Header implements m.ClassComponent<HeaderAttrs> {
  view(vnode: m.CVnode<HeaderAttrs>) {
    let { attrs, children } = vnode;
    let { level = 1, ...htmlAttrs } = attrs;

    let style = {};
    if (level == 1) {
      style = {
        fontSize: "2em",
        lineHeight: "1.5rem", //"3",//"1.5",
        fontWeight: "bold",
        //marginTop: "0px",
        marginBottom: "1.5rem", // Let the parent container deal with this.
        // Mmm OK, but what about lineheight then ?
      };
    } else if (level == 2) {
      style = {
        fontSize: Math.sqrt(2) + "em",
        lineHeight: "1.5rem",
        fontWeight: "bold",
        //marginTop: "0px",
        marginBottom: "1.5rem",
      };
    } else if (level === 3 || level === 4 || level === 5 || level === 6) {
      style = {
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "bold",
        //marginTop: "0px",
        marginBottom: "1.5rem"
      };
    }
    htmlAttrs.style = {
      ...style,
      ...(htmlAttrs.style || {}),
    };
    return m("h" + level, htmlAttrs, children);
  }
}
