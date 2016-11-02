"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var utils_1 = require('../../utils');
var types_1 = require('../../types');
var scroller_component_1 = require('./scroller.component');
var DataTableBodyComponent = (function () {
    function DataTableBodyComponent(element, renderer) {
        this.scroll = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.rowHeightsCache = new utils_1.RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        renderer.setElementClass(element.nativeElement, 'datatable-body', true);
    }
    Object.defineProperty(DataTableBodyComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (val) {
            this._pageSize = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (val) {
            this._offset = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rowCount", {
        get: function () {
            return this._rowCount;
        },
        set: function (val) {
            this._rowCount = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: function () {
            return this._bodyWidth;
        },
        set: function (val) {
            if (this.scrollbarH) {
                this._bodyWidth = val + 'px';
            }
            else {
                this._bodyWidth = '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyHeight", {
        get: function () {
            return this._bodyHeight;
        },
        set: function (val) {
            if (this.scrollbarV) {
                this._bodyHeight = val + 'px';
            }
            else {
                this._bodyHeight = 'auto';
            }
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        get: function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         */
        get: function () {
            if (this.scrollbarV) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        if (this.scrollbarV && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        this.scroller.setOffset(offset || 0);
    };
    DataTableBodyComponent.prototype.onBodyScroll = function (_a) {
        var scrollYPos = _a.scrollYPos, scrollXPos = _a.scrollXPos, direction = _a.direction;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
            this.scroll.emit({
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.offsetX = scrollXPos;
        this.updateIndexes();
        this.updatePage(direction);
        this.updateRows();
    };
    DataTableBodyComponent.prototype.updatePage = function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.floor(offset);
        }
        else if (direction === 'down') {
            offset = Math.ceil(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    DataTableBodyComponent.prototype.updateRows = function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        while (rowIndex < last && rowIndex < this.rowCount) {
            var row = this.rows[rowIndex];
            if (row) {
                row.$$index = rowIndex;
                temp[idx] = row;
            }
            idx++;
            rowIndex++;
        }
        this.temp = temp;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param row  the row for which the height need to be calculated.
     * @returns {number}  height of the row.
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        // Adding detail row height if its expanded.
        return this.rowHeight +
            (row.$$expanded === 1 ? this.detailRowHeight : 0);
    };
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param row The row that needs to be placed in the 2D space.
     * @returns {{styles: string}}  Returns the CSS3 style to be applied
     */
    DataTableBodyComponent.prototype.getRowsStyles = function (row) {
        var rowHeight = this.getRowHeight(row);
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.scrollbarV) {
            var idx = row ? row.$$index : 0;
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    DataTableBodyComponent.prototype.updateIndexes = function () {
        var first = 0;
        var last = 0;
        if (this.scrollbarV) {
            // Calculation of the first and last indexes will be based on where the
            // scrollY position would be at.  The last index would be the one
            // that shows up inside the view port the last.
            var height = parseInt(this.bodyHeight, 0);
            first = this.rowHeightsCache.getRowIndex(this.offsetY);
            last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
        }
        else {
            first = Math.max(this.offset * this.pageSize, 0);
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     *  Refreshes the full Row Height cache.  Should be used
     *  when the entire row array state has changed.
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV)
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache(this.rows, this.rowHeight, this.detailRowHeight);
        }
    };
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV) {
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param row The row for which the expansion needs to be toggled.
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV) {
            var detailRowHeight = this.detailRowHeight * (row.$$expanded ? -1 : 1);
            this.rowHeightsCache.update(row.$$index, detailRowHeight);
        }
        // Update the toggled row and update the heights in the cache.
        row.$$expanded ^= 1;
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.$$expanded = rowExpanded;
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.refreshRowHeightCache();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    DataTableBodyComponent.prototype.recalcLayout = function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "detailRowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableBodyComponent.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableBodyComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "rowDetailTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyComponent.prototype, "pageSize", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyComponent.prototype, "offset", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyComponent.prototype, "rowCount", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('style.width'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTableBodyComponent.prototype, "bodyWidth", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('style.height'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTableBodyComponent.prototype, "bodyHeight", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "detailToggle", void 0);
    __decorate([
        core_1.ViewChild(scroller_component_1.ScrollerComponent), 
        __metadata('design:type', scroller_component_1.ScrollerComponent)
    ], DataTableBodyComponent.prototype, "scroller", void 0);
    DataTableBodyComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <datatable-selection \n      #selector\n      [selected]=\"selected\"\n      [rows]=\"rows\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-row-wrapper \n          *ngFor=\"let row of temp; let i = index; trackBy: row?.$$index\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [rowDetailTemplate]=\"rowDetailTemplate\"\n          [detailRowHeight]=\"detailRowHeight\"\n          [row]=\"row\"\n          [expanded]=\"row.$$expanded === 1\">\n          <datatable-body-row\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(row)\"\n            [bodyWidth]=\"bodyWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"rowHeight\"\n            [row]=\"row\"\n            (activate)=\"selector.onActivate($event, i)\">\n          </datatable-body-row>\n        </datatable-row-wrapper>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}());
exports.DataTableBodyComponent = DataTableBodyComponent;
//# sourceMappingURL=body.component.js.map