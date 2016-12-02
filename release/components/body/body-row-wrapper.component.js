"use strict";
var core_1 = require('@angular/core');
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent() {
        this.expanded = false;
        this.rowContextmenu = new core_1.EventEmitter(false);
    }
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    DataTableRowWrapperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'data-table-row-wrapper',
                    template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"data-table-row-detail\">\n      <template\n        *ngIf=\"rowDetailTemplate\"\n        [ngTemplateOutlet]=\"rowDetailTemplate\"\n        [ngOutletContext]=\"{ row: row }\">\n      </template>\n    </div>\n  ",
                    host: {
                        class: 'data-table-row-wrapper'
                    }
                },] },
    ];
    /** @nocollapse */
    DataTableRowWrapperComponent.ctorParameters = [];
    DataTableRowWrapperComponent.propDecorators = {
        'rowDetailTemplate': [{ type: core_1.Input },],
        'detailRowHeight': [{ type: core_1.Input },],
        'expanded': [{ type: core_1.Input },],
        'row': [{ type: core_1.Input },],
        'rowContextmenu': [{ type: core_1.Output },],
        'onContextmenu': [{ type: core_1.HostListener, args: ['contextmenu', ['$event'],] },],
    };
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;
//# sourceMappingURL=body-row-wrapper.component.js.map