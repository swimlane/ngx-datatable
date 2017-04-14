"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_header_directive_1 = require("./column-header.directive");
var column_cell_directive_1 = require("./column-cell.directive");
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    return DataTableColumnDirective;
}());
DataTableColumnDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: 'ngx-datatable-column' },] },
];
/** @nocollapse */
DataTableColumnDirective.ctorParameters = function () { return []; };
DataTableColumnDirective.propDecorators = {
    'name': [{ type: core_1.Input },],
    'prop': [{ type: core_1.Input },],
    'frozenLeft': [{ type: core_1.Input },],
    'frozenRight': [{ type: core_1.Input },],
    'flexGrow': [{ type: core_1.Input },],
    'resizeable': [{ type: core_1.Input },],
    'comparator': [{ type: core_1.Input },],
    'pipe': [{ type: core_1.Input },],
    'sortable': [{ type: core_1.Input },],
    'draggable': [{ type: core_1.Input },],
    'canAutoResize': [{ type: core_1.Input },],
    'minWidth': [{ type: core_1.Input },],
    'width': [{ type: core_1.Input },],
    'maxWidth': [{ type: core_1.Input },],
    'checkboxable': [{ type: core_1.Input },],
    'headerCheckboxable': [{ type: core_1.Input },],
    'headerClass': [{ type: core_1.Input },],
    'cellClass': [{ type: core_1.Input },],
    'cellTemplate': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [column_cell_directive_1.DataTableColumnCellDirective, { read: core_1.TemplateRef },] },],
    'headerTemplate': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [column_header_directive_1.DataTableColumnHeaderDirective, { read: core_1.TemplateRef },] },],
};
exports.DataTableColumnDirective = DataTableColumnDirective;
//# sourceMappingURL=column.directive.js.map