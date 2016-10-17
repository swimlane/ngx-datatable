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
var utils_1 = require('../utils');
var models_1 = require('../models');
var types_1 = require('../types');
var row_height_cache_1 = require('../utils/row-height-cache');
var StateService = (function () {
    function StateService() {
        this.rows = [];
        this.selected = [];
        /**
         * Cache the row heights for calculation during virtual scroll.
         * @type {RowHeightCache}
         */
        this.rowHeightsCache = new row_height_cache_1.RowHeightCache();
        this.onSortChange = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
        /**
         * Event emitted whenever there is a change in row expansion state.
         * @type {EventEmitter}
         */
        this.onExpandChange = new core_1.EventEmitter();
        this.scrollbarWidth = utils_1.scrollbarWidth();
        this.offsetX = 0;
        this.offsetY = 0;
        this.innerWidth = 0;
        // this body height is a placeholder
        // its only used internally, if you
        // need to set the tables element style height
        this.bodyHeight = 300;
    }
    Object.defineProperty(StateService.prototype, "columnsByPin", {
        get: function () {
            return utils_1.columnsByPin(this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "columnGroupWidths", {
        get: function () {
            return utils_1.columnGroupWidths(this.columnsByPin, this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "rowCount", {
        get: function () {
            if (!this.options.externalPaging) {
                return this.rows.length;
            }
            else {
                return this.options.count;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache.
         */
        get: function () {
            return this.rowHeightsCache.query(this.rowCount - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "pageSize", {
        get: function () {
            if (this.options.scrollbarV) {
                // Keep the page size constant even if the row has been expanded.
                // This is because an expanded row is still considered to be a child of
                // the original row.  Hence calculation would use rowHeight only.
                return Math.ceil(this.bodyHeight / this.options.rowHeight);
            }
            else if (this.options.limit) {
                return this.options.limit;
            }
            else {
                return this.rows.length;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "indexes", {
        get: function () {
            var first = 0;
            var last = 0;
            if (this.options.scrollbarV) {
                // const floor = Math.floor((this.offsetY || 0) / this.options.rowHeight);
                // first = Math.max(floor, 0);
                // last = Math.min(first + this.pageSize, this.rowCount);
                //
                // console.log('first ==> ' + first + ' last ==> ' + last);
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                first = this.rowHeightsCache.getRowIndex(this.offsetY);
                last = this.rowHeightsCache.getRowIndex(this.bodyHeight + this.offsetY) + 1;
            }
            else {
                first = Math.max(this.options.offset * this.pageSize, 0);
                last = Math.min(first + this.pageSize, this.rowCount);
            }
            return { first: first, last: last };
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.setSelected = function (selected) {
        if (!this.selected) {
            this.selected = selected || [];
        }
        else {
            this.selected.splice(0, this.selected.length);
            (_a = this.selected).push.apply(_a, selected);
        }
        this.onSelectionChange.emit(this.selected);
        return this;
        var _a;
    };
    /**
     *  Refreshes the full Row Height cache.  Should be used
     *  when the entire row array state has changed.
     */
    StateService.prototype.refreshRowHeightCache = function () {
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows.length > 0) {
            this.rowHeightsCache.initCache(this.rows, this.options.rowHeight, this.options.detailRowHeight);
        }
    };
    StateService.prototype.setRows = function (rows) {
        if (rows) {
            this.rows = rows.slice();
            if (this.options) {
                this.refreshRowHeightCache();
            }
            this.onRowsUpdate.emit(rows);
        }
        return this;
    };
    StateService.prototype.setOptions = function (options) {
        this.options = options;
        return this;
    };
    StateService.prototype.setPage = function (_a) {
        var type = _a.type, value = _a.value;
        this.options.offset = value - 1;
        this.onPageChange.emit({
            type: type,
            offset: this.options.offset,
            limit: this.pageSize,
            count: this.rowCount
        });
    };
    StateService.prototype.nextSort = function (column) {
        var idx = this.options.sorts.findIndex(function (s) {
            return s.prop === column.prop;
        });
        var curSort = this.options.sorts[idx];
        var curDir = undefined;
        if (curSort)
            curDir = curSort.dir;
        var dir = utils_1.nextSortDir(this.options.sortType, curDir);
        if (dir === undefined) {
            this.options.sorts.splice(idx, 1);
        }
        else if (curSort) {
            this.options.sorts[idx].dir = dir;
        }
        else {
            if (this.options.sortType === types_1.SortType.single) {
                this.options.sorts.splice(0, this.options.sorts.length);
            }
            this.options.sorts.push(new models_1.Sort({ dir: dir, prop: column.prop }));
        }
        if (!column.comparator) {
            this.setRows(utils_1.sortRows(this.rows, this.options.sorts));
        }
        else {
            column.comparator(this.rows, this.options.sorts);
        }
        this.onSortChange.emit({ column: column });
    };
    StateService.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
        return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param row The row for which the expansion needs to be toggled.
     */
    StateService.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        var detailRowHeight = this.options.detailRowHeight * (row.$$expanded ? -1 : 1);
        // Update the toggled row and update the heights in the cache.
        row.$$expanded ^= 1;
        this.rowHeightsCache.update(row.$$index, detailRowHeight);
        this.onExpandChange.emit({ rows: [row], currentIndex: viewPortFirstRowIndex });
        // Broadcast the event to let know that the rows array has been updated.
        this.onRowsUpdate.emit(this.rows);
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     *
     * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
     */
    StateService.prototype.toggleAllRows = function (expanded) {
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        this.rows.forEach(function (row) {
            row.$$expanded = rowExpanded;
        });
        // Refresh the full row heights cache since every row was affected.
        this.refreshRowHeightCache();
        // Emit all rows that have been expanded.
        this.onExpandChange.emit({ rows: this.rows, currentIndex: viewPortFirstRowIndex });
        // Broadcast the event to let know that the rows array has been updated.
        this.onRowsUpdate.emit(this.rows);
    };
    StateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map