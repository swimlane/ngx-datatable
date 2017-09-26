"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableRowWrapperComponent = /** @class */ (function () {
    function DataTableRowWrapperComponent() {
        this.expanded = false;
        this.isSelected = false;
        this.isActive = true;
        this.rowContextmenu = new core_1.EventEmitter(false);
    }
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "cssClass", {
        get: function () {
            var classes = 'datatable-row-wrapper';
            if (this.isSelected) {
                classes += ' selected';
            }
            if (this.isActive) {
                classes += ' active';
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    DataTableRowWrapperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-row-wrapper',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-content></ng-content>\n    <div\n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\"\n      class=\"datatable-row-detail\">\n      <ng-template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngOutletContext]=\"{\n          row: row,\n          expanded: expanded,\n          rowIndex: rowIndex\n        }\">\n      </ng-template>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    DataTableRowWrapperComponent.ctorParameters = function () { return []; };
    DataTableRowWrapperComponent.propDecorators = {
        'rowDetail': [{ type: core_1.Input },],
        'detailRowHeight': [{ type: core_1.Input },],
        'expanded': [{ type: core_1.Input },],
        'row': [{ type: core_1.Input },],
        'rowIndex': [{ type: core_1.Input },],
        'isSelected': [{ type: core_1.Input },],
        'isActive': [{ type: core_1.Input },],
        'rowContextmenu': [{ type: core_1.Output },],
        'onContextmenu': [{ type: core_1.HostListener, args: ['contextmenu', ['$event'],] },],
        'cssClass': [{ type: core_1.HostBinding, args: ['class',] },],
    };
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;
//# sourceMappingURL=body-row-wrapper.component.js.map