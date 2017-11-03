"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var scroller_component_1 = require("./scroller.component");
var events_1 = require("../../events");
var DataTableBodyComponent = /** @class */ (function () {
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    function DataTableBodyComponent(cd) {
        this.cd = cd;
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            var idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return idx + "-" + this.trackByProp;
            }
            else {
                return idx;
            }
        }.bind(this);
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
            this.rowExpansions.clear();
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
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
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
        /**
         * Returns if selection is enabled.
         */
        get: /**
           * Returns if selection is enabled.
           */
        function () {
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
        get: /**
           * Property that would calculate the height of scroll bar
           * based on the row heights cache for virtual scroll. Other scenarios
           * calculate scroll height automatically (as height will be undefined).
           */
        function () {
            if (this.scrollbarV) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after the constructor, initializing input properties
     */
    /**
       * Called after the constructor, initializing input properties
       */
    DataTableBodyComponent.prototype.ngOnInit = /**
       * Called after the constructor, initializing input properties
       */
    function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'group')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
    };
    /**
     * Called once, before the instance is destroyed.
     */
    /**
       * Called once, before the instance is destroyed.
       */
    DataTableBodyComponent.prototype.ngOnDestroy = /**
       * Called once, before the instance is destroyed.
       */
    function () {
        if (this.rowDetail)
            this.listener.unsubscribe();
        if (this.groupHeader)
            this.listener.unsubscribe();
    };
    /**
     * Updates the Y offset given a new offset.
     */
    /**
       * Updates the Y offset given a new offset.
       */
    DataTableBodyComponent.prototype.updateOffsetY = /**
       * Updates the Y offset given a new offset.
       */
    function (offset) {
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        if (this.scrollbarV && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    /**
       * Body was scrolled, this is mainly useful for
       * when a user is server-side pagination via virtual scroll.
       */
    DataTableBodyComponent.prototype.onBodyScroll = /**
       * Body was scrolled, this is mainly useful for
       * when a user is server-side pagination via virtual scroll.
       */
    function (event) {
        var scrollYPos = event.scrollYPos;
        var scrollXPos = event.scrollXPos;
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
        this.updatePage(event.direction);
        this.updateRows();
    };
    /**
     * Updates the page given a direction.
     */
    /**
       * Updates the page given a direction.
       */
    DataTableBodyComponent.prototype.updatePage = /**
       * Updates the page given a direction.
       */
    function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.ceil(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     */
    /**
       * Updates the rows in the view port
       */
    DataTableBodyComponent.prototype.updateRows = /**
       * Updates the rows in the view port
       */
    function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            var maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                var group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                var row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    };
    /**
     * Get the row height
     */
    /**
       * Get the row height
       */
    DataTableBodyComponent.prototype.getRowHeight = /**
       * Get the row height
       */
    function (row) {
        var rowHeight = this.rowHeight;
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            rowHeight = this.rowHeight(row);
        }
        return rowHeight;
    };
    /**
     * @param group the group with all rows
     */
    /**
       * @param group the group with all rows
       */
    DataTableBodyComponent.prototype.getGroupHeight = /**
       * @param group the group with all rows
       */
    function (group) {
        var rowHeight = 0;
        if (group.value) {
            for (var index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     */
    /**
       * Calculate row height based on the expanded state of the row.
       */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = /**
       * Calculate row height based on the expanded state of the row.
       */
    function (row) {
        var rowHeight = this.getRowHeight(row);
        var expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
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
     * @param {*} rows The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
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
       * @param {*} rows The row that needs to be placed in the 2D space.
       * @returns {*} Returns the CSS3 style to be applied
       *
       * @memberOf DataTableBodyComponent
       */
    DataTableBodyComponent.prototype.getRowsStyles = /**
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
       * @param {*} rows The row that needs to be placed in the 2D space.
       * @returns {*} Returns the CSS3 style to be applied
       *
       * @memberOf DataTableBodyComponent
       */
    function (rows) {
        var styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles['width'] = this.columnGroupWidths.total;
        }
        if (this.scrollbarV) {
            var idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                var row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Hides the loading indicator
     */
    /**
       * Hides the loading indicator
       */
    DataTableBodyComponent.prototype.hideIndicator = /**
       * Hides the loading indicator
       */
    function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    /**
     * Updates the index of the rows in the viewport
     */
    /**
       * Updates the index of the rows in the viewport
       */
    DataTableBodyComponent.prototype.updateIndexes = /**
       * Updates the index of the rows in the viewport
       */
    function () {
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
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    /**
       * Refreshes the full Row Height cache.  Should be used
       * when the entire row array state has changed.
       */
    DataTableBodyComponent.prototype.refreshRowHeightCache = /**
       * Refreshes the full Row Height cache.  Should be used
       * when the entire row array state has changed.
       */
    function () {
        if (!this.scrollbarV)
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions: this.rowExpansions
            });
        }
    };
    /**
     * Gets the index for the view port
     */
    /**
       * Gets the index for the view port
       */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = /**
       * Gets the index for the view port
       */
    function () {
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
     */
    /**
       * Toggle the Expansion of the row i.e. if the row is expanded then it will
       * collapse and vice versa.   Note that the expanded status is stored as
       * a part of the row object itself as we have to preserve the expanded row
       * status in case of sorting and filtering of the row set.
       */
    DataTableBodyComponent.prototype.toggleRowExpansion = /**
       * Toggle the Expansion of the row i.e. if the row is expanded then it will
       * collapse and vice versa.   Note that the expanded status is stored as
       * a part of the row object itself as we have to preserve the expanded row
       * status in case of sorting and filtering of the row set.
       */
    function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        var expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV) {
            var detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            var idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    /**
       * Expand/Collapse all the rows no matter what their state is.
       */
    DataTableBodyComponent.prototype.toggleAllRows = /**
       * Expand/Collapse all the rows no matter what their state is.
       */
    function (expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            this.rowExpansions.set(row, rowExpanded);
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Recalculates the table
     */
    /**
       * Recalculates the table
       */
    DataTableBodyComponent.prototype.recalcLayout = /**
       * Recalculates the table
       */
    function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    /**
     * Tracks the column
     */
    /**
       * Tracks the column
       */
    DataTableBodyComponent.prototype.columnTrackingFn = /**
       * Tracks the column
       */
    function (index, column) {
        return column.$$id;
    };
    /**
     * Gets the row pinning group styles
     */
    /**
       * Gets the row pinning group styles
       */
    DataTableBodyComponent.prototype.stylesByGroup = /**
       * Gets the row pinning group styles
       */
    function (group) {
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
            var offset = offsetDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    /**
       * Returns if the row was expanded and set default row expansion when row expansion is empty
       */
    DataTableBodyComponent.prototype.getRowExpanded = /**
       * Returns if the row was expanded and set default row expansion when row expansion is empty
       */
    function (row) {
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            for (var _i = 0, _a = this.groupedRows; _i < _a.length; _i++) {
                var group = _a[_i];
                this.rowExpansions.set(group, 1);
            }
        }
        var expanded = this.rowExpansions.get(row);
        return expanded === 1;
    };
    /**
     * Gets the row index given a row
     */
    /**
       * Gets the row index given a row
       */
    DataTableBodyComponent.prototype.getRowIndex = /**
       * Gets the row index given a row
       */
    function (row) {
        return this.rowIndexes.get(row) || 0;
    };
    return DataTableBodyComponent;
}());
exports.DataTableBodyComponent = DataTableBodyComponent;
//# sourceMappingURL=body.component.js.map