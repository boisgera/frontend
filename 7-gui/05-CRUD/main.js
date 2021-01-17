import m from "mithril";

// -----------------------------------------------------------------------------

function makeFilter(substring) {
  function _filter(fullname) {
    let { name, surname } = fullname;
    if (name.includes(substring) || surname.includes(substring)) {
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
    this.selected = undefined;
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
    // So if we need to add the selected stuff, etc., the global filter to get the
    // list becomes not so smart, we would be better with a classic for loop and
    // an item-by-item substring test.
    let keep = makeFilter(this.substring);
    console.log("----------");
    for (let i=0; i < this.fullnames.length; i++) {
      let fullname = this.fullnames[i];
      console.log("o", fullname);
      let {name, surname} = fullname;
      if (keep(fullname)) {
          options.push(m("option", {key: i}, `${surname}, ${name}`));
      }
    }

    // TODO : selected index.

    // TODO: think of the selected and filter interaction ... We probably need keys here,
    // to preserve the items identities in the filtering.

    return m(
      "div",
      { style: { display: "flex", "flex-direction": "column" } },
      [
        m("span", [
          "Filter prefix:", 
          m("input", { // TODO: force all elements to be visible (how ? 
            // The reference implementation does it with a select element but how ?)
            type: "text",
            value: this.substring,
          oninput: (input) => {
            this.substring = input.target.value;
          } })]),
        m("div", { style: { display: "flex", "flex-direction": "row" } }, [
          m("select", { 
            style: { height: "2em" },
            onchange: (event) => {
              this.selected = event.target.selectedIndex; // probably not what we want :
              // we would end up with the index IN THE FILTERED LIST when we probably
              // want to deal with the index in the total list. Dunno. We need some 
              // double accounting anyway, whatever the strategy is.
            } 
          }, 
            options),
          m("div", { style: { display: "flex", "flex-direction": "column" } }, [
            m("span", ["Name:", m("input", { type: "text" })]),
            m("span", ["Surname:", m("input", { type: "text" })]),
          ]),
        ]),
        m("span", [
          m("button", {}, "Create"),
          m("button", {}, "Update"),
          m("button", {}, "Delete"),
        ]),
      ]
    );
  }
}

// -----------------------------------------------------------------------------

m.mount(document.body, CRUD);
