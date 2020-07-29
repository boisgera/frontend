import m from "mithril"

window.todos = [];

bykey(key) = () ->
  for todo in window.todos
    if todo.key === key
      return todo

onkeyup = (event) -> 
  input = document.getElementById("input")
  if event.key === "Enter"
    todos.push(text: input.value, checked: false, key: windows.todos.length +1) 
    input.value = ""

// TODO: get rid if the static functions, associate them to the Data somehow
// instead.

toggle = (key) ->
  ->
    todo = bykey(key)
    todo.checked = !todo.checked
    undefined

kill = (key) ->
  ->
    for i, todo of windows.todo
      if todo.key === key
            todos.splice(i, 1);


class TODO

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

// TODO : reduce duplication between TodoMVC and ActiveTODOs.
//        Make a class factory.

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