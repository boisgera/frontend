import m from "mithril";

// TODO:
// Review MVC structure, see what can be done here 
// (several files to begin with ?)

// Exceptions
// -----------------------------------------------------------------------------
class KeyError extends Error {};

// Todos Data Model
// -----------------------------------------------------------------------------
interface TodoAttrs {
  key: number;
  text: string;
  checked: boolean;
}

interface State {
  count: number;
  todos: TodoAttrs[];
}

declare global {
  interface Window { state: State; }
}

const state : State = {
  count: 0,
  todos: []
}
window.state = state;

// Q: merge data and method here in a "State" class (singleton ?) ?

function bykey(key: number): TodoAttrs {
  for (let todo of state.todos) {
    if (todo.key === key) {
      return todo;
    }
  }
  throw new KeyError(`invalid key ${key}`);    
}

// -----------------------------------------------------------------------------
class Controller {

  // Create new todo
  static submit() {
    let input = document.getElementById("input") as HTMLInputElement;
    state.count += 1;
    state.todos.push({
      text: input.value, 
      checked: false, 
      key: state.count, 
    });
    input.value = "";
  }

  // Toggle todo checked/unchecked status.
  static toggle(key: number) {
    return () => {
      let todo = bykey(key);
      todo.checked = !todo.checked;
    }
  }

  // Remove a todo from the list
  static kill(key: number) {
    return () => {
      let todos = state.todos;
      for (let i=0; i < todos.length; i++) {
        if (todos[i].key === key) {
            todos.splice(i, 1);
            return;
        }
      }
    }
  }

  static clearCompleted() {
    return () => {
      state.todos = state.todos.filter(isUnchecked);
    }
  }

  static allCompleted() {
    return state.todos.every(isUnchecked);
  }

}

class Todo implements m.ClassComponent<TodoAttrs> {
  hover: boolean = false;

  view(vnode: m.CVnode<TodoAttrs>){
    let {attrs} = vnode;
    let {key, text, checked} = attrs;
    return m("li", {
        onmouseover: () => this.hover = true, 
        onmouseout: () => this.hover = false
      },
      [
        m("input", {
          type: "checkbox", 
          checked, 
          style: {marginRight: "1em"}, 
          onchange: Controller.toggle(key)
        }), 
        !checked ? text : m("s", text),
        this.hover ?
        m("button", {
            style: {marginLeft: "1em"}, 
            onclick: Controller.kill(key)
          },
          "X"
        ) : false, 
      ]
    )
  }    

}

type TodoPredicate = (todo: TodoAttrs) => boolean;

function isChecked(todo: TodoAttrs) {
  return todo.checked;
}

function isUnchecked(todo: TodoAttrs) {
  return !isChecked(todo);
}

interface TodoListAttrs {}

class TodoList implements m.ClassComponent<TodoListAttrs> {
  static filter: TodoPredicate = (todo: TodoAttrs) => true; 

  constructor(vnode: m.CVnode) {}

  view(vnode: m.CVnode<TodoListAttrs>) {
    return [
      m("p", m("label", {"for": "TODO"}, "Add TODO")),
      m("input", {
        id: "input", 
        type: "text", 
        placeholder: "Add TODO", 
        onkeyup: (event: KeyboardEvent) => { 
          if (event.key === "Enter") Controller.submit(); 
        }
      }),
      m("ul",
        state.todos.filter((this.constructor as any).filter)
          .map((todo) => m(Todo, todo))
      ),
      m("p", 
        state.todos.filter(isUnchecked).length.toString() + " items left.",
        " ",
        m("a", {href: "#!/all"}, "All"), 
        " ", 
        m("a", {href: "#!/active"}, "Active"),
        " ",
        m("a", {href: "#!/completed"}, "Completed"),
        " ",
        Controller.allCompleted() ?
        undefined:
        m("button", {onclick: Controller.clearCompleted()}, "Clear completed")
      )
    ]
  }
}

class AllTodoList extends TodoList {
  // (static) filter inherited from TodoList.
}

class ActiveTodoList extends TodoList {
  static filter: TodoPredicate = isUnchecked;
}

class CompletedTodoList extends TodoList {
  static filter: TodoPredicate = isChecked;
}

function main() {
  m.route(document.body, "/all", {
    "/all": AllTodoList,
    "/active": ActiveTodoList,
    "/completed": CompletedTodoList
  });
}

main();