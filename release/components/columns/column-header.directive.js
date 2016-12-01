"use strict";
var core_1 = require('@angular/core');
var DataTableColumnHeaderDirective = (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    ;
    DataTableColumnHeaderDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[swui-datatable-header-template]' },] },
    ];
    /** @nocollapse */
    DataTableColumnHeaderDirective.ctorParameters = [
        { type: core_1.TemplateRef, },
    ];
    return DataTableColumnHeaderDirective;
}());
exports.DataTableColumnHeaderDirective = DataTableColumnHeaderDirective;
//# sourceMappingURL=column-header.directive.js.map