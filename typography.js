import j2c from "j2c";
import utils from "./utils.js"

let sheet = j2c.sheet({
  "@global": {
    body: {
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#607d8b",
    }
  }
});

export function install() {
  utils.CSS.install(sheet);
}

export default {install}