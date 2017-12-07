"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var column_header_directive_1 = require('./column-header.directive');
var column_cell_directive_1 = require('./column-cell.directive');
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "name");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "prop");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "frozenLeft");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "frozenRight");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "flexGrow");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "resizeable");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "comparator");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "pipe");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "sortable");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "draggable");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "canAutoResize");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "minWidth");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "width");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "maxWidth");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "checkboxable");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "headerCheckboxable");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "headerClass");
    __decorate([
        core_1.Input()
    ], DataTableColumnDirective.prototype, "cellClass");
    __decorate([
        core_1.Input(),
        core_1.ContentChild(column_cell_directive_1.DataTableColumnCellDirective, { read: core_1.TemplateRef })
    ], DataTableColumnDirective.prototype, "cellTemplate");
    __decorate([
        core_1.Input(),
        core_1.ContentChild(column_header_directive_1.DataTableColumnHeaderDirective, { read: core_1.TemplateRef })
    ], DataTableColumnDirective.prototype, "headerTemplate");
    DataTableColumnDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-column' })
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;
//# sourceMappingURL=column.directive.js.map