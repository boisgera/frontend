import m from "mithril";

// -----------------------------------------------------------------------------
// borrowed from https://github.com/eugenkiss/7guis-React-TypeScript-MobX/blob/master/src/app/guis/flight.tsx
const dateFormat = "dd.MM.yyyy";

function getTimestamp(date) {
  const parsed = DateTime.fromFormat(date, dateFormat);
  if (parsed.invalid != null) return null;
  return parsed.valueOf();
}

function isValidDate(date) {
  return getTimestamp(date) != null;
}

// -----------------------------------------------------------------------------

class FlightBooker {
  constructor(vnode) {
    this.option = 0;
  }
  view(vnode) {
    return m(
      "div",
      { style: { display: "inline-flex", "flex-direction": "column" } },
      m("select", [
        m("option", { value: "one-way", selected: this.option == 0 }, "one-way flight"),
        m("option", { value: "return", selected: this.option == 1 }, "return flight"),
      ]), // TODO: add onchange event handler
      m("input", { value: "13.01.2021" }),
      m("input", { value: "13.01.2021", disabled: true }),
      m("button", "Book")
    );
  }
}

// -----------------------------------------------------------------------------

m.mount(document.body, FlightBooker);
