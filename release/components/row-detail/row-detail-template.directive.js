"use strict";
var core_1 = require('@angular/core');
var DataTableRowDetailTemplateDirective = (function () {
    function DataTableRowDetailTemplateDirective(template) {
        this.template = template;
    }
    ;
    DataTableRowDetailTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[swui-data-table-row-detail-template]'
                },] },
    ];
    /** @nocollapse */
    DataTableRowDetailTemplateDirective.ctorParameters = [
        { type: core_1.TemplateRef, },
    ];
    return DataTableRowDetailTemplateDirective;
}());
exports.DataTableRowDetailTemplateDirective = DataTableRowDetailTemplateDirective;
//# sourceMappingURL=row-detail-template.directive.js.map