"use strict";
var core_1 = require('@angular/core');
var DataTableColumnCellDirective = (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    ;
    DataTableColumnCellDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[swui-data-table-cell-template]' },] },
    ];
    /** @nocollapse */
    DataTableColumnCellDirective.ctorParameters = [
        { type: core_1.TemplateRef, },
    ];
    return DataTableColumnCellDirective;
}());
exports.DataTableColumnCellDirective = DataTableColumnCellDirective;
//# sourceMappingURL=column-cell.directive.js.map