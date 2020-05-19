import m from "mithril";

import {Button} from "./button.js";
import {Sandbox} from "./sandbox.js";
import {Icon} from "./icon.js";
import typography from "./typography.js";

function main() {
  Button.install();
  Icon.install();
  typography.install();

  let root = document.getElementById("main");
  m.mount(root, {
    view: () => m("div", {style: {padding: "20px"}},
      m(Sandbox,   
        m(Button, m(Icon, {name: "settings", height: "16px", width: "16px"})),
        m(Button, {fluid: true, align: "right"},
          m(Icon, {name: "settings", height: "16px", width: "16px"}), 
          m("span","Button"),
          m(Icon, {name: "chevron-down", height: "16px", width: "16px"}),
          m("span", "Moar text"),
          m(Icon, {name: "chevron-down", height: "16px", width: "16px"}), 
          "jlkjskdljs",
          "DSLJHSLJHD",
          m("span", "IN DA SPAN")
        )
      )
    )
  });
}

document.addEventListener("DOMContentLoaded", main);