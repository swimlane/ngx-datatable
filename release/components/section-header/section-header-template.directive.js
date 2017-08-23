"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatatableSectionHeaderTemplateDirective = /** @class */ (function () {
    function DatatableSectionHeaderTemplateDirective(template) {
        this.template = template;
    }
    DatatableSectionHeaderTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngx-datatable-section-header-template]'
                },] },
    ];
    /** @nocollapse */
    DatatableSectionHeaderTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return DatatableSectionHeaderTemplateDirective;
}());
exports.DatatableSectionHeaderTemplateDirective = DatatableSectionHeaderTemplateDirective;
//# sourceMappingURL=section-header-template.directive.js.map