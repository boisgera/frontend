declare module "j2c" {
  interface PseudoString extends String {
    [key: string]: any; // error with "string" instead of "any" ? :(
    // Could I declare here "any other key not already in String ?"
    // To avoid the issue ?
  }
  function sheet(s: object): PseudoString;
}

declare module "hyphenation.fr" {}

declare module "tex-linebreak" {
  interface Hyphenator {
    (patterns: any): any;
  }
  let createHyphenator: Hyphenator;
  function justifyContent(elts: Element[], hyphenator: Hyphenator): void;
}
