"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableColumnHeaderDirective = (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    DataTableColumnHeaderDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngx-datatable-header-template]' },] },
    ];
    /** @nocollapse */
    DataTableColumnHeaderDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return DataTableColumnHeaderDirective;
}());
exports.DataTableColumnHeaderDirective = DataTableColumnHeaderDirective;
//# sourceMappingURL=column-header.directive.js.map