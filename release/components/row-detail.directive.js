"use strict";
var core_1 = require('@angular/core');
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
        { type: core_1.Directive, args: [{
                    selector: 'datatable-row-detail-template'
                },] },
    ];
    /** @nocollapse */
    DatatableRowDetailDirective.ctorParameters = [];
    DatatableRowDetailDirective.propDecorators = {
        'template': [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
    };
    return DatatableRowDetailDirective;
}());
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;
//# sourceMappingURL=row-detail.directive.js.map