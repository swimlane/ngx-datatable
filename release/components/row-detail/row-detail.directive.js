"use strict";
var core_1 = require('@angular/core');
var row_detail_template_directive_1 = require('./row-detail-template.directive');
var DataTableRowDetailDirective = (function () {
    function DataTableRowDetailDirective() {
    }
    Object.defineProperty(DataTableRowDetailDirective.prototype, "rowDetailTemplate", {
        get: function () {
            return this.template;
        },
        enumerable: true,
        configurable: true
    });
    DataTableRowDetailDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'swui-data-table-row-detail' },] },
    ];
    /** @nocollapse */
    DataTableRowDetailDirective.ctorParameters = [];
    DataTableRowDetailDirective.propDecorators = {
        'template': [{ type: core_1.ContentChild, args: [row_detail_template_directive_1.DataTableRowDetailTemplateDirective, { read: core_1.TemplateRef },] },],
    };
    return DataTableRowDetailDirective;
}());
exports.DataTableRowDetailDirective = DataTableRowDetailDirective;
//# sourceMappingURL=row-detail.directive.js.map