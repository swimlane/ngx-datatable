"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableColumnCellDirective = (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    return DataTableColumnCellDirective;
}());
DataTableColumnCellDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngx-datatable-cell-template]' },] },
];
/** @nocollapse */
DataTableColumnCellDirective.ctorParameters = function () { return [
    { type: core_1.TemplateRef, },
]; };
exports.DataTableColumnCellDirective = DataTableColumnCellDirective;
//# sourceMappingURL=column-cell.directive.js.map