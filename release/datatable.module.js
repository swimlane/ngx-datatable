import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/fromEvent';
import { DatatableComponent, DataTableColumnDirective, DataTableHeaderComponent, DataTableBodyComponent, DataTableFooterComponent, DataTableHeaderCellComponent, DataTablePagerComponent, DataTableBodyRowComponent, DataTableRowWrapperComponent, ProgressBarComponent, DataTableBodyCellComponent, DatatableRowDetailDirective, ScrollerComponent, DataTableSelectionComponent, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DatatableRowDetailTemplateDirective } from './components';
import { VisibilityDirective, LongPressDirective, ResizeableDirective, OrderableDirective, DraggableDirective } from './directives';
import { ScrollbarHelper } from './services';
var NgxDatatableModule = (function () {
    function NgxDatatableModule() {
    }
    return NgxDatatableModule;
}());
export { NgxDatatableModule };
NgxDatatableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                providers: [
                    ScrollbarHelper
                ],
                declarations: [
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
                    DatatableRowDetailTemplateDirective,
                    DataTableBodyCellComponent,
                    DataTableSelectionComponent,
                    DataTableColumnHeaderDirective,
                    DataTableColumnCellDirective
                ],
                exports: [
                    DatatableComponent,
                    DatatableRowDetailDirective,
                    DatatableRowDetailTemplateDirective,
                    DataTableColumnDirective,
                    DataTableColumnHeaderDirective,
                    DataTableColumnCellDirective
                ]
            },] },
];
/** @nocollapse */
NgxDatatableModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datatable.module.js.map