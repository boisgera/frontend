import j2c from "j2c";
import { HTML, CSS } from "./utils.ts";

let sheet = j2c.sheet({
  "@global": {
    body: {
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      // color: "#607d8b",
    },
  },
});

// This module is imported for its side-effects only:
HTML.ready(() => CSS.install(sheet));
