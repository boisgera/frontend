import m from "mithril";

// -----------------------------------------------------------------------------

class Timer {
  constructor(vnode) {}
  view(vnode) {
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
          width: "50%",
          "background-color": "lime"}
        }),
        m(
          "span",
          { style: { "grid-row-start": 2, "grid-column-start": 2 } },
          "15s"
        ),
        m(
          "span",
          { style: { "grid-row-start": 3, "grid-column-start": 1 } },
          "Duration:"
        ),
        m("input",
        { style: { "grid-row-start": 3, "grid-column-start": 2 },  
        type: "range", min:"0", max:"30", value:"0", class: "slider"}),
        m("button", {style: {"grid-row-start": 4, "grid-column-start": 1, "grid-column-end": "span 2" }}, 
        "Reset Timer")
      ]
    );
  }
}

// -----------------------------------------------------------------------------

m.mount(document.body, Timer);
