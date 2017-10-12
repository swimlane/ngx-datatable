"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var DimensionsHelper = /** @class */ (function () {
    function DimensionsHelper() {
    }
    DimensionsHelper.prototype.getDimensions = function (element) {
        return element.getBoundingClientRect();
    };
    DimensionsHelper.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DimensionsHelper.ctorParameters = function () { return []; };
    return DimensionsHelper;
}());
exports.DimensionsHelper = DimensionsHelper;
//# sourceMappingURL=dimensions-helper.service.js.map