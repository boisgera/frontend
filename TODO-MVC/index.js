import m from "mithril";

// Todos
// -----------------------------------------------------------------------------
const todos = [];
window.todos = todos;

function bykey(key) {
  for (let todo of todos) {
    if (todo.key === key) {
      return todo;
    }
  }    
}

// -----------------------------------------------------------------------------
function onkeyup(event) {
  if (event.key !== "Enter") return;

  let input = document.getElementById("input");
  todos.push({
    text: input.value, 
    checked: false, 
    key: todos.length +1 
  });
  input.value = "";
}

// TODO: get rid if the static functions, associate them to the Data somehow
// instead.

function toggler(key) {
  return () => {
    let todo = bykey(key);
    todo.checked = !todo.checked;
  }
}

function killer(key) {
  return () => {
    for (let i=0; i < todos.length; i++) {
      if (todos[i].key === key) {
          todos.splice(i, 1);
      }
    }
  }
}

class Todo {

  view(vnode) {
    let {attrs} = vnode;
    let {key, text, checked} = attrs;
    return m("li", [
      m("input", {
        type: "checkbox", 
        checked, style: {marginRight: "1em"}, 
        onchange: toggler(key)}
      ), 
      !checked ? text : m("s", text),
      // TODO: display on TODO hover only.
      m("button", {
          style: {marginLeft: "1em"}, 
          onclick: killer(key)
        },
        "X"
      ), 
    ])
  }

}

// TODO : reduce duplication between TodoMVC and ActiveTODOs.
//        Make a class factory.

function isChecked(todo) {
  return todo.checked;
}

class TodoList {
  view() {
    let visibleTodos; 
    if (this.filter) {
      visibleTodos = todos.filter(this.filter)
    } else {
      visibleTodos = todos;
    }
    return [
      // Header
      m("p", m("label", {"for": "TODO"}, "Add TODO")),
      m("input", {id: "input", type: "text", placeholder: "Add TODO", onkeyup}),
      // List
      m("ul", visibleTodos.map((todo) => m(Todo, todo))),
      // Footer
      m("p", 
        todos.filter(_ => !isChecked(_)).length.toString() + " items left.",
        " ",
        m("a", {href: "#!/all"}, "All"), 
        " ", 
        m("a", {href: "#!/active"}, "Active")
      )
    ]
  }  
}

class AllTodoList extends TodoList {
  constructor() {
    this.filter = (todo) => true;
  }
}

class ActiveTodoList extends TodoList {
  constructor() {
    this.filter = (todo) => !isChecked(todo);
  }
}

function main() {
  m.route(document.body, "/all", {
    "/all": AllTodoList,
    "/active": ActiveTodoList,
  });
}

main();