import { Directive, TemplateRef } from '@angular/core';
var DatatableRowDetailTemplateDirective = (function () {
    function DatatableRowDetailTemplateDirective(template) {
        this.template = template;
    }
    ;
    return DatatableRowDetailTemplateDirective;
}());
export { DatatableRowDetailTemplateDirective };
DatatableRowDetailTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngx-datatable-row-detail-template]'
            },] },
];
/** @nocollapse */
DatatableRowDetailTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
//# sourceMappingURL=row-detail-template.directive.js.map