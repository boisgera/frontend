"use strict";
exports.__esModule = true;
var mithril_1 = require("mithril");
var state = {
    count: 0,
    todos: []
};
window.state = state;
// Q: merge data and method here in a "State" class ?
function bykey(key) {
    for (var _i = 0, _a = state.todos; _i < _a.length; _i++) {
        var todo = _a[_i];
        if (todo.key === key) {
            return todo;
        }
    }
}
// -----------------------------------------------------------------------------
var Controller = /** @class */ (function () {
    function Controller() {
    }
    // Create new todo
    Controller.submit = function () {
        var input = document.getElementById("input");
        state.count += 1;
        state.todos.push({
            text: input.value,
            checked: false,
            key: state.count
        });
        input.value = "";
    };
    // Toggle todo checked/unchecked status.
    Controller.toggle = function (key) {
        return function () {
            var todo = bykey(key);
            todo.checked = !todo.checked;
        };
    };
    // Remove a todo from the list
    Controller.kill = function (key) {
        return function () {
            var todos = state.todos;
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].key === key) {
                    todos.splice(i, 1);
                    return;
                }
            }
        };
    };
    return Controller;
}());
var Todo = /** @class */ (function () {
    function Todo() {
    }
    Todo.prototype.view = function (vnode) {
        var attrs = vnode.attrs;
        var key = attrs.key, text = attrs.text, checked = attrs.checked;
        return mithril_1["default"]("li", [
            mithril_1["default"]("input", {
                type: "checkbox",
                checked: checked,
                style: { marginRight: "1em" },
                onchange: Controller.toggle(key)
            }),
            !checked ? text : mithril_1["default"]("s", text),
            // TODO: display on TODO hover only.
            mithril_1["default"]("button", {
                style: { marginLeft: "1em" },
                onclick: Controller.kill(key)
            }, "X"),
        ]);
    };
    return Todo;
}());
var TodoList = /** @class */ (function () {
    function TodoList(filter) {
        if (filter === undefined) {
            filter = function (todo) { return true; };
        }
        this.filter = filter;
    }
    TodoList.prototype.view = function () {
        return [
            mithril_1["default"]("p", mithril_1["default"]("label", { "for": "TODO" }, "Add TODO")),
            mithril_1["default"]("input", {
                id: "input",
                type: "text",
                placeholder: "Add TODO",
                onkeyup: function (event) {
                    if (event.key === "Enter")
                        Controller.submit();
                }
            }),
            mithril_1["default"]("ul", state.todos.map(function (todo) { return mithril_1["default"](Todo, todo); })),
            mithril_1["default"]("p", state.todos.filter(function (todo) { return (!todo.checked); }).length.toString() + " items left.", " ", mithril_1["default"]("a", { href: "#!/all" }, "All"), " ", mithril_1["default"]("a", { href: "#!/active" }, "Active"))
        ];
    };
    return TodoList;
}());
var TodoMVC = /** @class */ (function () {
    function TodoMVC() {
    }
    TodoMVC.prototype.view = function () {
        return [
            mithril_1["default"]("p", mithril_1["default"]("label", { "for": "TODO" }, "Add TODO")),
            mithril_1["default"]("input", {
                id: "input",
                type: "text",
                placeholder: "Add TODO",
                onkeyup: function (event) { if (event.key === "Enter")
                    Controller.submit(); }
            }),
            mithril_1["default"]("ul", state.todos.map(function (todo) { return mithril_1["default"](Todo, todo); })),
            mithril_1["default"]("p", state.todos.filter(function (todo) { return (!todo.checked); }).length.toString() + " items left.", " ", mithril_1["default"]("a", { href: "#!/all" }, "All"), " ", mithril_1["default"]("a", { href: "#!/active" }, "Active"))
        ];
    };
    return TodoMVC;
}());
var ActiveTodos = /** @class */ (function () {
    function ActiveTodos() {
    }
    ActiveTodos.prototype.view = function () {
        return [
            mithril_1["default"]("p", mithril_1["default"]("label", { "for": "TODO" }, "Add TODO")),
            mithril_1["default"]("input", { id: "input", type: "text", placeholder: "Add TODO", onkeyup: onkeyup }),
            mithril_1["default"]("ul", todos
                .filter(function (todo) { return (!todo.checked); })
                .map(function (todo) { return mithril_1["default"](TODO, todo); })),
            mithril_1["default"]("p", todos.filter(function (todo) { return (!todo.checked); }).length.toString() + " items.", " ", mithril_1["default"]("a", { href: "#!/all" }, "All"), " ", mithril_1["default"]("a", { href: "#!/active" }, "Active"))
        ];
    };
    return ActiveTodos;
}());
function main() {
    mithril_1["default"].route(document.body, "/all", {
        "/all": TodoMVC,
        "/active": ActiveTodos
    });
}
main();
