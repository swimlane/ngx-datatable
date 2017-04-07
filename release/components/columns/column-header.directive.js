import { Directive, TemplateRef } from '@angular/core';
var DataTableColumnHeaderDirective = (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    ;
    return DataTableColumnHeaderDirective;
}());
export { DataTableColumnHeaderDirective };
DataTableColumnHeaderDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-datatable-header-template]' },] },
];
/** @nocollapse */
DataTableColumnHeaderDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
//# sourceMappingURL=column-header.directive.js.map