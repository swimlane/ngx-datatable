"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var components_1 = require('./components');
var directives_1 = require('./directives');
var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    Angular2DataTableModule.decorators = [
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
                        components_1.DataTableBodyCellComponent,
                        components_1.DataTableSelectionComponent
                    ],
                    exports: [
                        components_1.DatatableComponent,
                        components_1.DatatableRowDetailDirective,
                        components_1.DataTableColumnDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    Angular2DataTableModule.ctorParameters = [];
    return Angular2DataTableModule;
}());
exports.Angular2DataTableModule = Angular2DataTableModule;
//# sourceMappingURL=datatable.module.js.map