"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this._expanded = false;
        this.rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (val) {
            this._rowIndex = val;
            this.rowContext.rowIndex = val;
            this.groupContext.rowIndex = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (val) {
            this._expanded = val;
            this.groupContext.expanded = val;
            this.rowContext.expanded = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    DataTableRowWrapperComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    };
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    DataTableRowWrapperComponent.prototype.getGroupHeaderStyle = function (group) {
        var styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    };
    DataTableRowWrapperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-row-wrapper',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div \n      *ngIf=\"groupHeader && groupHeader.template\"\n      class=\"datatable-group-header\"\n      [ngStyle]=\"getGroupHeaderStyle()\">\n      <ng-template\n        *ngIf=\"groupHeader && groupHeader.template\"\n        [ngTemplateOutlet]=\"groupHeader.template\"\n        [ngTemplateOutletContext]=\"groupContext\">\n      </ng-template>\n    </div>\n    <ng-content \n      *ngIf=\"(groupHeader && groupHeader.template && expanded) || \n             (!groupHeader || !groupHeader.template)\">\n    </ng-content>\n    <div\n      *ngIf=\"rowDetail && rowDetail.template && expanded\"\n      [style.height.px]=\"detailRowHeight\"\n      class=\"datatable-row-detail\">\n      <ng-template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngTemplateOutletContext]=\"rowContext\">\n      </ng-template>\n    </div>\n  ",
                    host: {
                        class: 'datatable-row-wrapper'
                    }
                },] },
    ];
    /** @nocollapse */
    DataTableRowWrapperComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.KeyValueDiffers, },
    ]; };
    DataTableRowWrapperComponent.propDecorators = {
        'innerWidth': [{ type: core_1.Input },],
        'rowDetail': [{ type: core_1.Input },],
        'groupHeader': [{ type: core_1.Input },],
        'offsetX': [{ type: core_1.Input },],
        'detailRowHeight': [{ type: core_1.Input },],
        'row': [{ type: core_1.Input },],
        'groupedRows': [{ type: core_1.Input },],
        'rowContextmenu': [{ type: core_1.Output },],
        'rowIndex': [{ type: core_1.Input },],
        'expanded': [{ type: core_1.Input },],
        'onContextmenu': [{ type: core_1.HostListener, args: ['contextmenu', ['$event'],] },],
    };
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;
//# sourceMappingURL=body-row-wrapper.component.js.map