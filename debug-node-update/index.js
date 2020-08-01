import m from "mithril"

let text = "Hello world!";

class P {
  view() {
    console.log("P.view");
    return m("p", text)
  }
  oncreate(vnode) {
    console.log("P.oncreate");
  }
  onupdate(vnode) {
    console.log("P.onupdate");
    console.log(vnode.dom);
    vnode.dom.innerHTML = "<b>" + Date.now() + "</b>" + vnode.dom.innerHTML;
  }
}

class App {
  view() {
    return [
      m(P),
      m("button", {onclick: () => text += "Z"}, "Append Z")
    ]    
  }
}

m.mount(document.body, App)