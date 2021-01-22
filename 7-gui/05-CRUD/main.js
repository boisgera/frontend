import m from "mithril";

// -----------------------------------------------------------------------------

function makeFilter(substring) {
  function _filter(fullname) {
    let pattern = substring.toLowerCase();
    let { name, surname } = fullname;
    if (
      name.toLowerCase().includes(pattern) ||
      surname.toLowerCase().includes(pattern)
    ) {
      return true;
    } else {
      return false;
    }
  }
  return _filter;
}

// -----------------------------------------------------------------------------

class CRUD {
  constructor(vnode) {
    this.selected = 0;
    this.substring = "";
    this.name = "";
    this.surname = "";
    this.fullnames = [
      { name: "Hans", surname: "Emil" },
      { name: "Max", surname: "Mustermann" },
      { name: "Roman", surname: "Tisch" },
    ];
  }
  view(vnode) {
    let options = [];
    let keep = makeFilter(this.substring);
    for (let i = 0; i < this.fullnames.length; i++) {
      let fullname = this.fullnames[i];
      let { name, surname } = fullname;
      if (keep(fullname)) {
        let selected = i === this.selected;
        options.push(
          m(
            "option",
            { key: i, "data-key": i, selected },
            `${surname}, ${name}`
          )
        );
      }
    }

    // "BUG" : there is an issue when we filter stuff ; some item may appear
    //         to be selected, but it's not really. If unfilter, we'll see that.
    //         Or if we delete during the filter, it is the previously selected
    //         stuff that will be deleted. 
    //         I am not even sure what the proper behavior should be ...

    return m(
      "div",
      { style: { display: "flex", "flex-direction": "column" } },
      [
        m("span", [
          "Filter prefix:",
          m("input", {
            // TODO: force all elements to be visible (how ?
            // The reference implementation does it with a select element but how ?)
            type: "text",
            value: this.substring,
            oninput: (input) => {
              this.substring = input.target.value;
            },
          }),
        ]),
        m("div", { style: { display: "flex", "flex-direction": "row" } }, [
          m(
            "select",
            {
              style: { height: "2em" },
              onchange: (event) => {
                let select = event.target;
                let index = select.selectedIndex;
                let key = parseInt(
                  select.children[index].getAttribute("data-key")
                );
                this.selected = key;
              },
            },
            options
          ),
          m("div", { style: { display: "flex", "flex-direction": "column" } }, [
            m("span", [
              "Name:",
              m("input", {
                type: "text",
                oninput: (input) => {
                  this.name = input.target.value;
                },
              }),
            ]),
            m("span", [
              "Surname:",
              m("input", {
                type: "text",
                oninput: (input) => {
                  this.surname = input.target.value;
                },
              }),
            ]),
          ]),
        ]),
        m("span", [
          m(
            "button",
            {
              onclick: () => {
                this.fullnames.push({ name: this.name, surname: this.surname });
              },
            },
            "Create"
          ),
          m("button", {}, "Update"), // Doing nothing, right ?
          m("button", {"onclick": () => {
            console.log(this.selected, this.fullnames.length);
            if (0 <= this.selected && this.selected < this.fullnames.length) {
                this.fullnames.splice(this.selected, 1);
                this.selected = Math.min(this.selected, this.fullnames.length-1);    
                console.log(this.selected, this.fullnames.length);
            }
          }}, "Delete"),
        ]),
      ]
    );
  }
}

// -----------------------------------------------------------------------------

m.mount(document.body, CRUD);
