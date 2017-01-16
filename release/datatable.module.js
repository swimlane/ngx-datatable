"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
require('rxjs/add/observable/fromEvent');
var components_1 = require('./components');
var directives_1 = require('./directives');
var NgxDatatableModule = (function () {
    function NgxDatatableModule() {
    }
    NgxDatatableModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                        components_1.DatatableRowDetailTemplateDirective,
                        components_1.DataTableBodyCellComponent,
                        components_1.DataTableSelectionComponent,
                        components_1.DataTableColumnHeaderDirective,
                        components_1.DataTableColumnCellDirective
                    ],
                    exports: [
                        components_1.DatatableComponent,
                        components_1.DatatableRowDetailDirective,
                        components_1.DatatableRowDetailTemplateDirective,
                        components_1.DataTableColumnDirective,
                        components_1.DataTableColumnHeaderDirective,
                        components_1.DataTableColumnCellDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxDatatableModule.ctorParameters = function () { return []; };
    return NgxDatatableModule;
}());
exports.NgxDatatableModule = NgxDatatableModule;
//# sourceMappingURL=datatable.module.js.map