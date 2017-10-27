var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/fromEvent';
import { DatatableComponent, DataTableColumnDirective, DataTableHeaderComponent, DataTableBodyComponent, DataTableFooterComponent, DataTableHeaderCellComponent, DataTablePagerComponent, DataTableBodyRowComponent, DataTableRowWrapperComponent, ProgressBarComponent, DataTableBodyCellComponent, DatatableRowDetailDirective, DatatableGroupHeaderDirective, ScrollerComponent, DataTableSelectionComponent, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DatatableRowDetailTemplateDirective, DataTableFooterTemplateDirective, DatatableFooterDirective, DatatableGroupHeaderTemplateDirective } from './components/index';
import { VisibilityDirective, LongPressDirective, ResizeableDirective, OrderableDirective, DraggableDirective } from './directives/index';
import { ScrollbarHelper } from './services/index';
var NgxDatatableModule = /** @class */ (function () {
    function NgxDatatableModule() {
    }
    NgxDatatableModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            providers: [
                ScrollbarHelper
            ],
            declarations: [
                DataTableFooterTemplateDirective,
                VisibilityDirective,
                DraggableDirective,
                ResizeableDirective,
                OrderableDirective,
                LongPressDirective,
                ScrollerComponent,
                DatatableComponent,
                DataTableColumnDirective,
                DataTableHeaderComponent,
                DataTableHeaderCellComponent,
                DataTableBodyComponent,
                DataTableFooterComponent,
                DataTablePagerComponent,
                ProgressBarComponent,
                DataTableBodyRowComponent,
                DataTableRowWrapperComponent,
                DatatableRowDetailDirective,
                DatatableGroupHeaderDirective,
                DatatableRowDetailTemplateDirective,
                DataTableBodyCellComponent,
                DataTableSelectionComponent,
                DataTableColumnHeaderDirective,
                DataTableColumnCellDirective,
                DatatableFooterDirective,
                DatatableGroupHeaderTemplateDirective
            ],
            exports: [
                DatatableComponent,
                DatatableRowDetailDirective,
                DatatableGroupHeaderDirective,
                DatatableRowDetailTemplateDirective,
                DataTableColumnDirective,
                DataTableColumnHeaderDirective,
                DataTableColumnCellDirective,
                DataTableFooterTemplateDirective,
                DatatableFooterDirective,
                DataTablePagerComponent,
                DatatableGroupHeaderTemplateDirective
            ]
        })
    ], NgxDatatableModule);
    return NgxDatatableModule;
}());
export { NgxDatatableModule };
//# sourceMappingURL=datatable.module.js.map