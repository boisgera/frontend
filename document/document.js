import m from "mithril";

import frPatterns from 'hyphenation.fr';
import { createHyphenator, justifyContent } from 'tex-linebreak';

/*  Question 
    ----------------------------------------------------------------------------
    Who's gonna be responsible for spacing the headers & paragraphs ?
    The section that holds them ? Themselves ?
 */

/* Bug
   -----------------------------------------------------------------------------
   Tex-linebreak doesn't work with run-ins so far.
   It's probably the "display : online issue ?"
 */

/* Test / TODO
   -----------------------------------------------------------------------------
   Does tex-linebreak break with inline math or displaymath ?
 */


export class Paragraph {
  oncreate(vnode) {
    this.onupdate(vnode);
  }
  onupdate(vnode) {
    const hyphenate = createHyphenator(frPatterns);
    justifyContent([vnode.dom], hyphenate);
  }

  view(vnode) {
    let {attrs, children} = vnode;

    attrs.style = {
      fontSize: "1em",
      marginTop: "0px",
      marginBottom: "1.5em",
      ...(attrs.style || {})
    }

    return m("p", attrs, children);
  }
}

export class Section {
  view(vnode) {
    let {attrs, children} = vnode;
    let {title, level, runIn, style, ...htmlAttrs} = attrs;
    style = style | {};
    let headerStyle;
    if (level == 1) {
      headerStyle = {
        fontSize: "2em",
        lineHeight: "1.5",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem",
      }
    } else if (level == 2) {
      headerStyle = {
        fontSize: Math.sqrt(2) + "em",
        lineHeight: "1.5rem",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem",
      } 
    } else if (level == 3) { // TODO (optionally ? "Run-in") // can I EMULATE display: run-in ?
      headerStyle = {
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "bold",
        //marginTop: "0px",
        marginBottom: "0em"
      }
      if (runIn) {
        headerStyle.display = "inline";
        headerStyle.marginRight = "1em";
        //console.log(children[0]);
        // check that the first child tag is Paragraph.
        let inpara = children[0].children;
        //attrs.style = para.attrs.style || {};
        //para.attrs.style = {...(para.attrs.style || {}), ...{display: "inline"}};
        children[0] = m(Paragraph, m("h1", {style: headerStyle}, title), inpara)
        return m("section", {style}, children)
      }
    }
    return m("section", {style}, m("h1", {style: headerStyle}, title), children);
  }
}

export class Header {
  view(vnode) {
    let {attrs, children} = vnode;
    let {level, ...htmlAttrs} = attrs;
    level = level || 1;

    let style;
    if (level == 1) {
      style = {
        fontSize: "2em",
        lineHeight: "1.5",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem"
      }
    } else if (level == 2) {
      style = {
        fontSize: Math.sqrt(2) + "em",
        lineHeight: "1.5rem",
        fontWeight: "bold",
        marginTop: "0px",
        marginBottom: "1.5rem"
      } 
    } else if (level == 3) { // TODO (optionally ? "Run-in") // can I EMULATE display: run-in ?
      style = {
        fontSize: "1em",
        lineHeight: "1.5em",
        fontWeight: "bold",
        //marginTop: "0px",
        //marginBottom: "1.5rem"
      }
    }
    htmlAttrs.style = {
      ...style,
      ...(htmlAttrs.style || {})
    }
    return m("h"+level, htmlAttrs, children);
  }
}

export default {Header, Paragraph};