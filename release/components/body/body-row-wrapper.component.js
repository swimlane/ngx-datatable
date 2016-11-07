"use strict";
var core_1 = require('@angular/core');
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent(element, renderer) {
        this.expanded = false;
        renderer.setElementClass(element.nativeElement, 'datatable-row-wrapper', true);
    }
    DataTableRowWrapperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-row-wrapper',
                    template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"datatable-row-detail\">\n      <template\n        *ngIf=\"rowDetailTemplate\"\n        [ngTemplateOutlet]=\"rowDetailTemplate\"\n        [ngOutletContext]=\"{ row: row }\">\n      </template>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableRowWrapperComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    DataTableRowWrapperComponent.propDecorators = {
        'rowDetailTemplate': [{ type: core_1.Input },],
        'detailRowHeight': [{ type: core_1.Input },],
        'expanded': [{ type: core_1.Input },],
        'row': [{ type: core_1.Input },],
    };
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;
//# sourceMappingURL=body-row-wrapper.component.js.map