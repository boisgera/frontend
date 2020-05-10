import m from "mithril";

// Who's gonna be responsible for spacing the headers & paragraphs ?
// The section that holds them ? Themselves ?

export class Paragraph {
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
        console.log(children[0]);
        // check that the first child tag is Paragraph.
        let para = children[0];
        attrs.style = para.attrs.style || {};
        para.attrs.style = {...(para.attrs.style || {}), ...{display: "inline"}};
        children[0] = m(Paragraph, m("h1", {style: headerStyle}, title), para)
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