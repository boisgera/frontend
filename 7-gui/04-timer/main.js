import m from "mithril";

// -----------------------------------------------------------------------------

class Timer {
  constructor(vnode) {
    this.elapsedTime = 0.0;
    this.duration = 15.0;
    setInterval(() => { 
      this.elapsedTime = Math.min(this.duration, this.elapsedTime + 0.1);
      m.redraw();
    }, 100);
  }
  view(vnode) {
    let width = this.elapsedTime / this.duration * 100.0;
    return m(
      "div",
      {
        style: {
          display: "grid",
          "grid-template-columns": "30% 70%",
          "grid-template-rows": "2em 2em 2em 2em",
        },
      },
      [
        m(
          "span",
          { style: { "grid-row-start": 1, "grid-column-start": 1 } },
          "Elapsed Time:"
        ),
        m("span", {
          style: { "grid-row-start": 1, "grid-column-start": 2,
          width: `${width}%`,
          "background-color": "lime"}
        }),
        m(
          "span",
          { style: { "grid-row-start": 2, "grid-column-start": 2 } },
          `${this.elapsedTime.toFixed(1)}s`
        ),
        m(
          "span",
          { style: { "grid-row-start": 3, "grid-column-start": 1 } },
          "Duration:"
        ),
        m("input",
        { style: { "grid-row-start": 3, "grid-column-start": 2 },  
        type: "range", min:"0", max:"30", value: this.duration, class: "slider",
        oninput: (input)=> {this.duration = input.target.value;} }),
        m("button", 
        {style: {"grid-row-start": 4, "grid-column-start": 1, "grid-column-end": "span 2" }, 
        onclick: () => {this.elapsedTime=0.0;}}, 
        "Reset Timer" )
      ]
    );
  }
}

// -----------------------------------------------------------------------------

m.mount(document.body, Timer);

