"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ValueError = exports.TypeError = exports.CSS = exports.HTML = exports.join = exports.split = exports.assert = exports.AssertionError = void 0;
// Typescript Helpers
// -----------------------------------------------------------------------------
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
function assert(condition, msg) {
    if (!condition) {
        throw new AssertionError(msg);
    }
}
exports.assert = assert;
// String & Array Helpers
// -----------------------------------------------------------------------------
/**
 * Split a string into words.
 */
function split(string) {
    if (typeof string == "string") {
        var whitespace = /(\s+)/;
        var words = string.split(whitespace);
        words = words.filter(function (word) { return word.trim().length > 0; });
        return words;
    }
    else if (typeof string == "object") {
        var classes = [];
        for (var _i = 0, _a = Object.entries(string); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value) {
                classes.push(key);
            }
        }
        return classes;
    }
    else {
        throw new TypeError("invalid argument " + string);
    }
}
exports.split = split;
/**
 * Joins words into a string
 */
function join(classes) {
    var expanded = [];
    for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
        var cls = classes_1[_i];
        var newClasses = [];
        if (typeof cls == "string") {
            newClasses = [cls];
        }
        else if (Array.isArray(cls)) {
            newClasses = cls;
        }
        expanded = expanded.concat(newClasses);
    }
    return expanded.join(" ");
}
exports.join = join;
var HTML = /** @class */ (function () {
    function HTML() {
    }
    /**
     * Execute the callback as soon as the HTML document is ready
     * (or if it already was ready before the call).
     */
    HTML.ready = function (callback) {
        if (document.readyState !== "loading") {
            callback();
        }
        else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    };
    return HTML;
}());
exports.HTML = HTML;
var CSS = /** @class */ (function () {
    function CSS() {
    }
    /**
     * Install a stylesheet in the current HTML document.
     */
    CSS.install = function (css) {
        var style = document.createElement("style");
        //style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
    };
    return CSS;
}());
exports.CSS = CSS;
var TypeError = /** @class */ (function (_super) {
    __extends(TypeError, _super);
    function TypeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TypeError;
}(Error));
exports.TypeError = TypeError;
;
var ValueError = /** @class */ (function (_super) {
    __extends(ValueError, _super);
    function ValueError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ValueError;
}(Error));
exports.ValueError = ValueError;
;
