import m from "mithril";

// Todos
// -----------------------------------------------------------------------------
namespace Data {
  export interface TODO {
    key: number;
    text: string;
    checked: boolean;
  }
}

const todos: Data.TODO[] = [];

declare global {
  interface Window { todos: Data.TODO[]; }
}

window.todos = todos;

function bykey(key: number): Data.TODO | undefined {
  for (let todo of todos) {
    if (todo.key === key) {
      return todo;
    }
  }    
}

// -----------------------------------------------------------------------------
function onkeyup(event: KeyboardEvent) {
  let input = document.getElementById("input") as any;

  if (event.key === "Enter") {
    todos.push({ text: input.value, checked: false, key: todos.length +1 });
    input.value = "";
  }
}

class TODO implements m.ClassComponent<Data.TODO> {
  static toggle(key: number) {
    return () => {
      let todo = bykey(key) as Data.TODO;
      todo.checked = !todo.checked;
    }
  }

  static kill(key: number) {
    return () => {
      for (let i=0; i < todos.length; i++) {
        if (todos[i].key === key) {
            todos.splice(i, 1);
        }
      }
    }
  }

  view(vnode: m.CVnode<Data.TODO>){
    let {attrs} = vnode;
    let {key, text, checked} = attrs;
    return m("li", [
      m("input", 
        {type: "checkbox", checked, style: {marginRight: "1em"}, onchange: TODO.toggle(key)}
      ), 
      !checked ? text : m("s", text),
      m("button", // TODO: display on TODO hover only.
        {style: {marginLeft: "1em"}, onclick: TODO.kill(key)},
        "X"
      ), 
    ])
  }    
}

class TodoMVC {
  view() {  
    return [
      m("p", m("label", {"for": "TODO"}, "Add TODO")),
      m("input", {id: "input", type: "text", placeholder: "Add TODO", onkeyup}),
      m("ul",
        todos.map((todo) => m(TODO, todo))
      ),
      m("p", 
        todos.filter((todo) => (!todo.checked)).length.toString() + " items left.",
        " ",
        m("a", {href: "#!/all"}, "All"), 
        " ", 
        m("a", {href: "#!/active"}, "Active")
      )
    ]
  }
}

class ActiveTodos {
  view() {  
    return [
      m("p", m("label", {"for": "TODO"}, "Add TODO")),
      m("input", {id: "input", type: "text", placeholder: "Add TODO", onkeyup}),
      m("ul",
        todos
          .filter((todo) => (!todo.checked))
          .map((todo) => m(TODO, todo))
      ),
      m("p", 
        todos.filter((todo) => (!todo.checked)).length.toString() + " items.",
        " ",
        m("a", {href: "#!/all"}, "All"), 
        " ", 
        m("a", {href: "#!/active"}, "Active")
      )
    ]
  }
}

function main() {
  m.route(document.body, "/all", {
    "/all": TodoMVC,
    "/active": ActiveTodos,
  });
}

main();