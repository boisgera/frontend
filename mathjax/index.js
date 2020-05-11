import m from "mithril";
import {Math as M} from "./math.js";

// OK, I guess that mithril cannot see this state change ?
let content = "\\frac{1}{2} \\int"

function main() {
  M.install();
  let body = document.getElementById("body");
  m.mount(body, {"view": () => [
    m("p", content),
    m("p", "text before ", m(M, {content}), " text after."),
    m("button", {onclick: () => {
      console.log("content:", content);
      content = content + " \\blacksquare";}
    }, "CLICK")
  ]});
}

document.addEventListener("DOMContentLoaded", main);