"use strict";
var core_1 = require('@angular/core');
var row_detail_template_directive_1 = require('./row-detail-template.directive');
var DatatableRowDetailDirective = (function () {
    function DatatableRowDetailDirective() {
    }
    Object.defineProperty(DatatableRowDetailDirective.prototype, "rowDetailTemplate", {
        get: function () {
            return this.template;
        },
        enumerable: true,
        configurable: true
    });
    DatatableRowDetailDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'swui-datatable-row-detail' },] },
    ];
    /** @nocollapse */
    DatatableRowDetailDirective.ctorParameters = [];
    DatatableRowDetailDirective.propDecorators = {
        'template': [{ type: core_1.ContentChild, args: [row_detail_template_directive_1.DatatableRowDetailTemplateDirective, { read: core_1.TemplateRef },] },],
    };
    return DatatableRowDetailDirective;
}());
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;
//# sourceMappingURL=row-detail.directive.js.map