"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var footer_template_directive_1 = require("./footer-template.directive");
var DatatableFooterDirective = /** @class */ (function () {
    function DatatableFooterDirective() {
    }
    DatatableFooterDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'ngx-datatable-footer' },] },
    ];
    /** @nocollapse */
    DatatableFooterDirective.ctorParameters = function () { return []; };
    DatatableFooterDirective.propDecorators = {
        'footerHeight': [{ type: core_1.Input },],
        'totalMessage': [{ type: core_1.Input },],
        'selectedMessage': [{ type: core_1.Input },],
        'pagerLeftArrowIcon': [{ type: core_1.Input },],
        'pagerRightArrowIcon': [{ type: core_1.Input },],
        'pagerPreviousIcon': [{ type: core_1.Input },],
        'pagerNextIcon': [{ type: core_1.Input },],
        'template': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [footer_template_directive_1.DataTableFooterTemplateDirective, { read: core_1.TemplateRef },] },],
    };
    return DatatableFooterDirective;
}());
exports.DatatableFooterDirective = DatatableFooterDirective;
//# sourceMappingURL=footer.directive.js.map