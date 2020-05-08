import m from "mithril";
import j2c from "j2c";
import {Button} from "./button.js";
import button from "./button.js";
import {Icon} from "./icon.js";
import {CSS} from "./utils";
import typography from "./typography.js";

function main() {
  CSS.install(j2c.sheet({
    "@global": { 
      "body": {
        lineHeight: "24px",
      }
    }
  }))

  Button.install();
  Icon.install();
  let root = document.getElementById("main");
  typography.install();
  m.mount(root, {
    view: () => m("div", {style: {padding: "20px"}},
      m(Button, {fluid: true, align: "right"},
        m(Icon("settings"), {height: "16px", width: "16px"}), 
        m("span","Button"),
        m(Icon("chevron-down"), {height: "16px", width: "16px"}),
        m("span", "Moar text"),
        m(Icon("chevron-down"), {height: "16px", width: "16px"}), 
      )
    )
  });
}
// TODO: try flex in buttons for alignment. cf <https://stackoverflow.com/questions/22545325/how-to-vertically-align-text-with-icon-font>

document.addEventListener("DOMContentLoaded", main);