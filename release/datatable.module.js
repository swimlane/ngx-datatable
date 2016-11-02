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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var components_1 = require('./components');
var directives_1 = require('./directives');
var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    Angular2DataTableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                directives_1.VisibilityDirective,
                directives_1.DraggableDirective,
                directives_1.ResizeableDirective,
                directives_1.OrderableDirective,
                directives_1.LongPressDirective,
                components_1.ScrollerComponent,
                components_1.DatatableComponent,
                components_1.DataTableColumnDirective,
                components_1.DataTableHeaderComponent,
                components_1.DataTableHeaderCellComponent,
                components_1.DataTableBodyComponent,
                components_1.DataTableFooterComponent,
                components_1.DataTablePagerComponent,
                components_1.ProgressBarComponent,
                components_1.DataTableBodyRowComponent,
                components_1.DataTableRowWrapperComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DataTableBodyCellComponent,
                components_1.DataTableSelectionComponent
            ],
            exports: [
                components_1.DatatableComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DataTableColumnDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2DataTableModule);
    return Angular2DataTableModule;
}());
exports.Angular2DataTableModule = Angular2DataTableModule;
//# sourceMappingURL=datatable.module.js.map