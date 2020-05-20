import j2c from "j2c";
import {CSS, HTML} from "./utils.js"

const fontFamily = "Arial, sans-serif";
const fontSize = "16px";
const lineHeight = 1.5;

// TODO : prepare "size" variables xd, sm, me, lg, xl (xxl ?), (xxxl ?) that would
//        correspond to an object of CSS styles (inc. fontSize and 
//        lineHeight) that could be used by the client in j2c or inline styles.
//        Maybe stored in text and ui namespaces ?
//        Arf that still sucks since the stuff does not behave as numbers in CSS :
//        Think : how can I do arithmetic with "16px", but if I store the number 16,
//        then i need a bridge to use this stuff in CSS :(

const ratio = Math.sqrt(2.0);

const me = {
  fontSize: "16px",
  lineHeight: 1.5,
}

const sm = {}



let sheet = j2c.sheet({
  "@global": {
    body: {
      fontFamily,
      fontSize,
      lineHeight,
      // color: "#607d8b",
    }
  }
});

export {fontFamily, fontSize, lineHeight}

HTML.ready(() => CSS.install(sheet))