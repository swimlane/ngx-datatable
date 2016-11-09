"use strict";
function checkVisibility(element, callback, zone) {
    var timeout;
    function check() {
        // https://davidwalsh.name/offsetheight-visibility
        var offsetHeight = element.offsetHeight, offsetWidth = element.offsetWidth;
        if (offsetHeight && offsetWidth) {
            clearTimeout(timeout);
            if (callback)
                zone.run(function () { return callback(); });
        }
        else {
            clearTimeout(timeout);
            zone.runOutsideAngular(function () {
                timeout = setTimeout(function () { return check(); }, 50);
            });
        }
    }
    check();
}
exports.checkVisibility = checkVisibility;
//# sourceMappingURL=visibility-observer.js.map