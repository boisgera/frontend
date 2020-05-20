import m from "mithril";

import {HTML} from "./utils.js"

import {Button} from "./button.js"
import {Sandbox} from "./sandbox.js"
import {Icon} from "./icon.js"
import typography from "./typography.js"; // import needed to install the css

function main() {
  let root = document.getElementById("main");
  m.mount(root, {
    view: () => m("div", {style: {padding: "20px"}},
      m(Sandbox,
        m(Button, "Click me", m(Icon, {name: "cpu"}), "please!"),   
        m(Button, m(Icon, {name: "settings"})),
        m(Button, {fluid: true},
          m(Icon, {name: "settings"}), 
          "Button"
        ),
        m(Button, {fluid: true, align: "right"},
          m(Icon, {name: "settings", height: "16px", width: "16px"}), 
          "Button",
          m(Icon, {name: "chevron-down", height: "16px", width: "16px"}),
          "Moar text",
          m(Icon, {name: "chevron-down", height: "16px", width: "16px"}), 
          "jlkjskdljs",
          "DSLJHSLJHD",
          m("span", "IN DA SPAN")
        ),
        m(Button, {fluid: true, align: "left"},
          m(Icon, {name: "settings"}), 
          "Button"
        ),
        m(Button),
        m(Button, m("span", {style: {fontSize: "48px"}}, "LARGE"))
      )
    )
  });
}

HTML.ready(main);