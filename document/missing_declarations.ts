
declare module "tex-linebreak" {
    interface Hyphenator {
      (patterns: any): any;
    }
    let createHyphenator: Hyphenator;
    function justifyContent(elts: Element[], hyphenator: Hyphenator): void;
  }