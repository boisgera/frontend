import m from "mithril";
import {Button} from "./button.js";

function main() {
  Button.install();
  let root = document.getElementById("main");
  m.mount(root, {view: () => m(Button, "Click")});
}

document.addEventListener("DOMContentLoaded", main);