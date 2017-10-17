"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableFooterTemplateDirective = (function () {
    function DataTableFooterTemplateDirective(template) {
        this.template = template;
    }
    DataTableFooterTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngx-datatable-footer-template]' },] },
    ];
    /** @nocollapse */
    DataTableFooterTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return DataTableFooterTemplateDirective;
}());
exports.DataTableFooterTemplateDirective = DataTableFooterTemplateDirective;
//# sourceMappingURL=footer-template.directive.js.map