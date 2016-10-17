"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// import 'ts-helpers';
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var components_1 = require('./components');
var directives_1 = require('./directives');
__export(require('./types'));
__export(require('./models'));
__export(require('./components'));
var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    Angular2DataTableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                directives_1.Visibility,
                directives_1.Draggable,
                directives_1.Resizeable,
                directives_1.Orderable,
                directives_1.LongPress,
                directives_1.Scroller,
                components_1.DataTable,
                components_1.DataTableColumn,
                components_1.DataTableHeader,
                components_1.DataTableHeaderCell,
                components_1.DataTableBody,
                components_1.DataTableFooter,
                components_1.DataTablePager,
                components_1.ProgressBar,
                components_1.DataTableBodyRow,
                components_1.DataTableRowWrapper,
                components_1.DatatableRowDetailTemplate,
                components_1.DataTableBodyCell
            ],
            exports: [
                components_1.DataTable,
                components_1.DatatableRowDetailTemplate,
                components_1.DataTableColumn
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2DataTableModule);
    return Angular2DataTableModule;
}());
exports.Angular2DataTableModule = Angular2DataTableModule;
//# sourceMappingURL=index.js.map