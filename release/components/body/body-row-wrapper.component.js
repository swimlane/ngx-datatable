"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent() {
        this.expanded = false;
        this.rowContextmenu = new core_1.EventEmitter(false);
    }
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    return DataTableRowWrapperComponent;
}());
DataTableRowWrapperComponent.decorators = [
    { type: core_1.Component, args: [{
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
    'rowDetail': [{ type: core_1.Input },],
    'detailRowHeight': [{ type: core_1.Input },],
    'expanded': [{ type: core_1.Input },],
    'row': [{ type: core_1.Input },],
    'rowContextmenu': [{ type: core_1.Output },],
    'onContextmenu': [{ type: core_1.HostListener, args: ['contextmenu', ['$event'],] },],
};
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;
//# sourceMappingURL=body-row-wrapper.component.js.map