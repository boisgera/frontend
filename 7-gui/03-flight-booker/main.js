import m from "mithril";

// -----------------------------------------------------------------------------
function toInt(value) {
  if (/^(\d+)$/.test(value)) {
    return Number(value);
  } else {
    throw "not an integer";
  }
}

// a proper, better solution would be to used an external library (e.g. luxon).
function valid(date) {
  let items = date.split(".");
  if (items.length !== 3) {
    return false;
  }
  try {
    for (let item of items) {
      toInt(item);
    }
  } catch (e) {
    return false;
  }
  return true;
}

function before(date1, date2) {
  let items1 = date1.split(".").map((s) => parseInt(s));
  let items2 = date2.split(".").map((s) => parseInt(s));
  console.log(items1, items2);
  let value =
    items1[2] < items2[2] ||
    (items1[2] == items2[2] &&
      (items1[1] < items2[1] ||
        (items1[1] == items2[1] && items1[0] <= items2[0])));
  console.log(value);
  return value;
}

function today() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

// -----------------------------------------------------------------------------

class FlightBooker {
  constructor(vnode) {
    this.option = "one-way";
    this.style1 = { "background-color": "white" };
    this.style2 = { "background-color": "white" };
    this.date1 = this.date2 = today();
  }
  view(vnode) {
    return m(
      "div",
      { style: { display: "inline-flex", "flex-direction": "column" } },
      m(
        "select",
        {
          onchange: (event) => {
            this.option =
              event.target.selectedIndex == 0 ? "one-way" : "return";
          },
        },
        [
          m(
            "option",
            { value: "one-way", selected: this.option === "one-way" },
            "one-way flight"
          ),
          m(
            "option",
            { value: "return", selected: this.option === "return" },
            "return flight"
          ),
        ]
      ),
      m("input", {
        value: this.date1,
        style: this.style1,
        oninput: (input) => {
          this.date1 = input.target.value;
          if (valid(this.date1)) {
            this.style1 = { "background-color": "white" };
          } else {
            this.style1 = { "background-color": "coral" };
          }
        },
      }),
      m("input", {
        value: this.date2,
        style: this.style2,
        disabled: this.option === "one-way",
        oninput: (input) => {
          this.date2 = input.target.value;
          if (valid(this.date2)) {
            this.style2 = { "background-color": "white" };
          } else {
            this.style2 = { "background-color": "coral" };
          }
        },
      }),
      m(
        "button",
        {
          disabled: !(
            valid(this.date1) &&
            valid(this.date2) &&
            before(this.date1, this.date2)
          ),
          onclick: (event) => {
            let message;
            if (this.option === "one-way") {
              message = `You have booked a one-way flight on ${this.date1}`;
            } else {
              message = `You have booked a return flight from ${this.date1} to ${this.date2}`;
            }
            console.log(message);
            alert(message);
          },
        },
        "Book"
      )
    );
  }
}

// -----------------------------------------------------------------------------

m.mount(document.body, FlightBooker);
