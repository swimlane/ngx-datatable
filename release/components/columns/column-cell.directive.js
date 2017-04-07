import { Directive, TemplateRef } from '@angular/core';
var DataTableColumnCellDirective = (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    ;
    return DataTableColumnCellDirective;
}());
export { DataTableColumnCellDirective };
DataTableColumnCellDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-datatable-cell-template]' },] },
];
/** @nocollapse */
DataTableColumnCellDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
//# sourceMappingURL=column-cell.directive.js.map