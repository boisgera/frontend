import m from "mithril";
import { MathJax } from "./mathjax";

let content = String.raw`\frac{1}{2} \int`;

function main() {
  let body = document.body;
  m.mount(body, {
    view: () => [
      m("p", m(MathJax, { content: "a=1" })),
      "jdskdslkdj",
      m("p", content),
      m("p", "text before ", m(MathJax, { content }), " text after."),
      m(
        "p",
        "text before ",
        m(MathJax, { display: "block", content }),
        " text after."
      ),
      m(
        "button",
        {
          onclick: () => {
            console.log("content:", content);
            content = content + String.raw` \blacksquare`;
          },
        },
        "CLICK"
      ),
    ],
  });
}

document.addEventListener("DOMContentLoaded", main);