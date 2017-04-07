import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent() {
        this.expanded = false;
        this.rowContextmenu = new EventEmitter(false);
    }
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    return DataTableRowWrapperComponent;
}());
export { DataTableRowWrapperComponent };
DataTableRowWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-row-wrapper',
                template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"datatable-row-detail\">\n      <ng-template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngOutletContext]=\"{ row: row }\">\n      </ng-template>\n    </div>\n  ",
                host: {
                    class: 'datatable-row-wrapper'
                }
            },] },
];
/** @nocollapse */
DataTableRowWrapperComponent.ctorParameters = function () { return []; };
DataTableRowWrapperComponent.propDecorators = {
    'rowDetail': [{ type: Input },],
    'detailRowHeight': [{ type: Input },],
    'expanded': [{ type: Input },],
    'row': [{ type: Input },],
    'rowContextmenu': [{ type: Output },],
    'onContextmenu': [{ type: HostListener, args: ['contextmenu', ['$event'],] },],
};
//# sourceMappingURL=body-row-wrapper.component.js.map