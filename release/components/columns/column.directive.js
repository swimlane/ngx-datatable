import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    return DataTableColumnDirective;
}());
export { DataTableColumnDirective };
DataTableColumnDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-column' },] },
];
/** @nocollapse */
DataTableColumnDirective.ctorParameters = function () { return []; };
DataTableColumnDirective.propDecorators = {
    'name': [{ type: Input },],
    'prop': [{ type: Input },],
    'frozenLeft': [{ type: Input },],
    'frozenRight': [{ type: Input },],
    'flexGrow': [{ type: Input },],
    'resizeable': [{ type: Input },],
    'comparator': [{ type: Input },],
    'pipe': [{ type: Input },],
    'sortable': [{ type: Input },],
    'draggable': [{ type: Input },],
    'canAutoResize': [{ type: Input },],
    'minWidth': [{ type: Input },],
    'width': [{ type: Input },],
    'maxWidth': [{ type: Input },],
    'checkboxable': [{ type: Input },],
    'headerCheckboxable': [{ type: Input },],
    'cellTemplate': [{ type: Input }, { type: ContentChild, args: [DataTableColumnCellDirective, { read: TemplateRef },] },],
    'headerTemplate': [{ type: Input }, { type: ContentChild, args: [DataTableColumnHeaderDirective, { read: TemplateRef },] },],
};
//# sourceMappingURL=column.directive.js.map