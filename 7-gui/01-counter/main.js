
class Counter {
    constructor(vnode) {
        this.count = 0;
    }
    view(vnode) {
        return m("span", 
                 m("span", {style: "margin-right: 1em;"}, this.count), 
                 m("button", 
                   {onclick: () => {this.count += 1}}, 
                   "counter"
                  )
                )
    }
}

m.mount(document.body, Counter);
