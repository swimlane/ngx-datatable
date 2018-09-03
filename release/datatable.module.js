"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var components_1 = require("./components");
var directives_1 = require("./directives");
var services_1 = require("./services");
var NgxDatatableModule = /** @class */ (function () {
    function NgxDatatableModule() {
    }
    NgxDatatableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            providers: [
                services_1.ScrollbarHelper,
                services_1.DimensionsHelper,
                services_1.ColumnChangesService
            ],
            declarations: [
                components_1.DataTableFooterTemplateDirective,
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
                components_1.DatatableGroupHeaderDirective,
                components_1.DatatableRowDetailTemplateDirective,
                components_1.DataTableBodyCellComponent,
                components_1.DataTableSelectionComponent,
                components_1.DataTableColumnHeaderDirective,
                components_1.DataTableColumnCellDirective,
                components_1.DataTableColumnCellTreeToggle,
                components_1.DatatableFooterDirective,
                components_1.DatatableGroupHeaderTemplateDirective,
                components_1.DataTableSummaryRowComponent,
            ],
            exports: [
                components_1.DatatableComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DatatableGroupHeaderDirective,
                components_1.DatatableRowDetailTemplateDirective,
                components_1.DataTableColumnDirective,
                components_1.DataTableColumnHeaderDirective,
                components_1.DataTableColumnCellDirective,
                components_1.DataTableColumnCellTreeToggle,
                components_1.DataTableFooterTemplateDirective,
                components_1.DatatableFooterDirective,
                components_1.DataTablePagerComponent,
                components_1.DatatableGroupHeaderTemplateDirective
            ]
        })
    ], NgxDatatableModule);
    return NgxDatatableModule;
}());
exports.NgxDatatableModule = NgxDatatableModule;
//# sourceMappingURL=datatable.module.js.map