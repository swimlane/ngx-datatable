"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = require("./camel-case");
var cache = {};
var testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
var ɵ0 = function () {
    var styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    var match = typeof styles !== 'undefined' ?
        Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) : null;
    var pre = match !== null ? match[1] : undefined;
    var dom = typeof pre !== 'undefined' ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom ? {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    } : undefined;
};
exports.ɵ0 = ɵ0;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = ɵ0();
function getVendorPrefixedName(property) {
    var name = camel_case_1.camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}
exports.getVendorPrefixedName = getVendorPrefixedName;
//# sourceMappingURL=prefixes.js.map