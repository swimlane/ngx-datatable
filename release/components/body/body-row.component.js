"use strict";
var core_1 = require('@angular/core');
var utils_1 = require('../../utils');
var DataTableBodyRowComponent = (function () {
    function DataTableBodyRowComponent(element, renderer) {
        this.activate = new core_1.EventEmitter();
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable-body-row', true);
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            this.recalculateColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            this._innerWidth = val;
            this.recalculateColumns();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "isEvenRow", {
        get: function () {
            return this.row.$$index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "isOddRow", {
        get: function () {
            return this.row.$$index % 2 !== 0;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRowComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + utils_1.scrollbarWidth) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this.element;
        this.activate.emit(event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this.element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this.element
            });
        }
    };
    DataTableBodyRowComponent.prototype.recalculateColumns = function (val) {
        if (val === void 0) { val = this.columns; }
        var colsByPin = utils_1.columnsByPin(val);
        this.columnsByPin = utils_1.columnsByPinArr(val);
        this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
    };
    DataTableBodyRowComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-body-row',
                    template: "\n    <div\n      *ngFor=\"let colGroup of columnsByPin; let i = index; trackBy: $colGroup?.type\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"stylesByGroup(colGroup.type)\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: column?.$$id\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        (activate)=\"onActivate($event, ii)\">\n      </datatable-body-cell>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableBodyRowComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    DataTableBodyRowComponent.propDecorators = {
        'columns': [{ type: core_1.Input },],
        'innerWidth': [{ type: core_1.Input },],
        'row': [{ type: core_1.Input },],
        'offsetX': [{ type: core_1.Input },],
        'rowHeight': [{ type: core_1.HostBinding, args: ['style.height.px',] }, { type: core_1.Input },],
        'isSelected': [{ type: core_1.HostBinding, args: ['class.active',] }, { type: core_1.Input },],
        'isEvenRow': [{ type: core_1.HostBinding, args: ['class.datatable-row-even',] },],
        'isOddRow': [{ type: core_1.HostBinding, args: ['class.datatable-row-odd',] },],
        'activate': [{ type: core_1.Output },],
        'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return DataTableBodyRowComponent;
}());
exports.DataTableBodyRowComponent = DataTableBodyRowComponent;
//# sourceMappingURL=body-row.component.js.map