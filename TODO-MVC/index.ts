import m from "mithril";
import {assert} from "./utils";

// Data
// -----------------------------------------------------------------------------
const data = {
  TODOs: []  
}

window.data = data;

function bykey(key) {
  for (let TODO of data.TODOs) {
    if (TODO.key === key) {
      return TODO;
    }
  }    
}

// -----------------------------------------------------------------------------

function onkeyup(event) {
  let input = document.getElementById("input") as any;

  if (event.key === 'Enter' || event.keyCode === 13) {
    data.TODOs.push({text: input.value, checked: false, key: data.TODOs.length +1 });
    input.value = "";
    console.log(data);
  }
}
0
function onchange(event) {
  console.log("change");
}

class TODO {
  static onchange(key) {
    return () => {
      let todo = bykey(key);
      todo.checked = !todo.checked;
    }
  }

  static kill(key) {
    return () => {
      for (let i=0; i < data.TODOs.length; i++) {
        if (data.TODOs[i].key === key) {
            data.TODOs.splice(i, 1);
        }
      }
    }
  }

  view(vnode) {
    let {attrs} = vnode;
    let {key, text, checked} = attrs;
    return m("li", [
      m("input", 
        {type: "checkbox", style: {marginRight: "1em"}, onchange: TODO.onchange(key)}
      ), 
      !checked ? text : m("s", text),
      m("button", // TODO: display on TODO hover only.
        {style: {marginLeft: "1em"}, onclick: TODO.kill(key)},
        "X"
      ), 
    ])
  }    
}

let TODOMVC = {view: () => 
  [
    m("label", {"for": "TODO"}, "Add TODO"),
    m("input", {id: "input", type: "text", placeholder: "Add TODO", onkeyup}),
    m("ul",
      data.TODOs.map((todo) => m(TODO, todo))
    ),
    m("p", data.TODOs.length.toString() + " items.")
  ]
}

function main() {
  m.mount(document.body, TODOMVC);
}

main();