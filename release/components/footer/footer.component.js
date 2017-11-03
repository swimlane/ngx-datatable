"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableFooterComponent = /** @class */ (function () {
    function DataTableFooterComponent() {
    }
    Object.defineProperty(DataTableFooterComponent.prototype, "isVisible", {
        get: function () {
            return (this.rowCount / this.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooterComponent.prototype, "curPage", {
        get: function () {
            return this.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    return DataTableFooterComponent;
}());
exports.DataTableFooterComponent = DataTableFooterComponent;
//# sourceMappingURL=footer.component.js.map