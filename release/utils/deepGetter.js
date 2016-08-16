"use strict";
function deepValueGetter(obj, path) {
    if (!obj || !path)
        return obj;
    var current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0, len = split.length; i < len; i++) {
            current = current[split[i]];
        }
    }
    return current;
}
exports.deepValueGetter = deepValueGetter;
//# sourceMappingURL=deepGetter.js.map