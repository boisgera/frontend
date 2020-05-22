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
        m(Button, {round: true}, "Click me", m(Icon, {name: "cpu"}), "please!"),   
        m(Button, {onclick: () => console.log("clicked.")}, "Click me", m(Icon, {name: "cpu"}), "please!"),   
        m(Button, {disabled: true, onclick: () => console.log("clicked.")}, "Click me", m(Icon, {name: "cpu"}), "please!"),   
        m(Button, m(Icon, {name: "settings"})),
        m(Button, {round: true}, m(Icon, {name: "settings"})),
        m(Button, {fluid: true},
          m(Icon, {name: "settings"}), 
          "Button"
        ),
        m(Button, {fluid: true, align: "right"},
          m(Icon, {name: "settings"}), 
          "Button",
          m(Icon, {name: "chevron-down"}),
          "Moar text",
          m(Icon, {name: "chevron-down"}), 
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