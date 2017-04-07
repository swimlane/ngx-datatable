import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { SortType } from '../../types';
import { columnsByPin, columnGroupWidths, columnsByPinArr, translateXY } from '../../utils';
var DataTableHeaderComponent = (function () {
    function DataTableHeaderComponent() {
        this.sort = new EventEmitter();
        this.reorder = new EventEmitter();
        this.resize = new EventEmitter();
        this.select = new EventEmitter();
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerHeight", {
        get: function () {
            return this._headerHeight;
        },
        set: function (val) {
            if (val !== 'auto') {
                this._headerHeight = val + "px";
            }
            else {
                this._headerHeight = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = columnsByPin(val);
            this.columnsByPin = columnsByPinArr(val);
            this.columnGroupWidths = columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.onLongPressStart = function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = true;
        this.dragEventTarget = event;
    };
    DataTableHeaderComponent.prototype.onLongPressEnd = function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = false;
        this.dragEventTarget = event;
    };
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableHeaderComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableHeaderComponent.prototype.onColumnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    DataTableHeaderComponent.prototype.onColumnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        });
    };
    DataTableHeaderComponent.prototype.calcNewSorts = function (column, prevValue, newValue) {
        var idx = 0;
        var sorts = this.sorts.map(function (s, i) {
            s = Object.assign({}, s);
            if (s.prop === column.prop)
                idx = i;
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    return DataTableHeaderComponent;
}());
export { DataTableHeaderComponent };
DataTableHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-header',
                template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      [style.width.px]=\"columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"stylesByGroup(colGroup.type)\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
                host: {
                    class: 'datatable-header'
                }
            },] },
];
/** @nocollapse */
DataTableHeaderComponent.ctorParameters = function () { return []; };
DataTableHeaderComponent.propDecorators = {
    'sortAscendingIcon': [{ type: Input },],
    'sortDescendingIcon': [{ type: Input },],
    'scrollbarH': [{ type: Input },],
    'innerWidth': [{ type: Input },],
    'offsetX': [{ type: Input },],
    'sorts': [{ type: Input },],
    'sortType': [{ type: Input },],
    'allRowsSelected': [{ type: Input },],
    'selectionType': [{ type: Input },],
    'reorderable': [{ type: Input },],
    'headerHeight': [{ type: HostBinding, args: ['style.height',] }, { type: Input },],
    'columns': [{ type: Input },],
    'sort': [{ type: Output },],
    'reorder': [{ type: Output },],
    'resize': [{ type: Output },],
    'select': [{ type: Output },],
    'headerWidth': [{ type: HostBinding, args: ['style.width',] },],
};
//# sourceMappingURL=header.component.js.map