import m from "mithril";

function C2F(C) {
    return C * (9 / 5) + 32;
}

function F2C(F) {
    return (F - 32) * (5 / 9);
}

class TemperatureConverter {
    constructor(vnode) {
        this.C = null;
        this.C_color = undefined;
        this.F = null;
        this.C_color = undefined;
    }
    view(vnode) {
        return m("span", 
                   m("input", {
                       type: "text", 
                       value: this.C, 
                       style: { 
                           "margin-right": "0.5em",
                           "background-color": this.C_color,
                       },
                       oninput: (input) => {
                           this.C = input.target.value;
                           if (isNaN(Number(this.C))) {
                               this.C_color = "coral";
                               this.F_color = "lightgray";
                           } else {
                               this.C_color = undefined;
                               this.F_color = undefined;
                               this.F = C2F(Number(this.C));
                           }
                       }
                     }
                   ), 
                   m("span", {style: {"margin-right": "1em"}}, "Celsius ="),
                   m("input", {
                       type: "text", 
                       value: this.F, 
                       style: {
                           "margin-right": "0.5em",
                           "background-color": this.F_color,
                       },
                       oninput: (input) => {
                           this.F = input.target.value;
                           if (isNaN(Number(this.F))) {
                               this.F_color = "coral";
                               this.C_color = "lightgray"
                           } else {
                               this.F_color = undefined;
                               this.C_color = undefined;
                               this.C = F2C(Number(this.F));
                           }
                       }
                     }
                   ),
                   m("span", "Fahrenheit"),
                   m("div", {style: "background:red;"}),
                   m("div", {style: {background: "red", "margin-right": "0.5em"}})
                )
    }
}

m.mount(document.body, TemperatureConverter);
