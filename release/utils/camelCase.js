"use strict";
function camelCase(str) {
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
exports.camelCase = camelCase;
//# sourceMappingURL=camelCase.js.map