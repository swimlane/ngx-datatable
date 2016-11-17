"use strict";
var core_1 = require('@angular/core');
var utils_1 = require('../utils');
var types_1 = require('../types');
var body_1 = require('./body');
var column_directive_1 = require('./column.directive');
var row_detail_directive_1 = require('./row-detail.directive');
var utils_2 = require('../utils');
var DatatableComponent = (function () {
    function DatatableComponent(renderer, element) {
        // Enable vertical scrollbars
        this.scrollbarV = false;
        // Enable horz scrollbars
        this.scrollbarH = false;
        // The row height; which is necessary
        // to calculate the height for the lazy rendering.
        this.rowHeight = 30;
        // The detail row height is required especially when virtual scroll is enabled.
        this.detailRowHeight = 0;
        // Type of column width distribution.
        // Example: flex, force, standard
        this.columnMode = types_1.ColumnMode.standard;
        // The minimum header height in pixels.
        // pass falsey for no header
        // note: number|string does not work right
        this.headerHeight = 30;
        // The minimum footer height in pixels.
        // pass falsey for no footer
        this.footerHeight = 0;
        // if external paging is turned on
        this.externalPaging = false;
        // if external sorting is turned on
        this.externalSorting = false;
        // Page size
        this.limit = undefined;
        // Total count
        this.count = 0;
        // Page offset
        this.offset = 0;
        // Loading indicator
        this.loadingIndicator = false;
        // if you can reorder columns
        this.reorderable = true;
        // type of sorting
        this.sortType = types_1.SortType.single;
        // sorts
        this.sorts = [];
        // css class overrides
        this.cssClasses = {
            sortAscending: 'icon-down',
            sortDescending: 'icon-up',
            pagerLeftArrow: 'icon-left',
            pagerRightArrow: 'icon-right',
            pagerPrevious: 'icon-prev',
            pagerNext: 'icon-skip'
        };
        // message overrides for localization
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total'
        };
        // This will be used when displaying or selecting rows:
        // when tracking/comparing them, we'll use the value of this fn,
        // (`fn(x) === fn(y)` instead of `x === y`)
        this.rowIdentity = (function (x) { return x; });
        this.scroll = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.sort = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        this.offsetX = 0;
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable', true);
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        // Rows
        set: function (val) {
            if (!this.externalSorting) {
                val = utils_1.sortRows(val, this.columns, this.sorts);
            }
            this._rows = val;
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        // Columns
        set: function (val) {
            if (val) {
                utils_2.setColumnDefaults(val);
                this.recalculateColumns(val);
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        get: function () {
            return this._columnTemplates;
        },
        set: function (val) {
            this._columnTemplates = val;
            if (val) {
                // only set this if results were brought back
                var arr = val.toArray();
                if (arr.length) {
                    // translate them to normal objects
                    this.columns = utils_2.translateTemplates(arr);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "rowDetailTemplateChild", {
        get: function () {
            return this._rowDetailTemplateChild;
        },
        set: function (val) {
            this._rowDetailTemplateChild = val;
            if (val)
                this.rowDetailTemplate = val.rowDetailTemplate;
        },
        enumerable: true,
        configurable: true
    });
    DatatableComponent.prototype.ngOnInit = function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    DatatableComponent.prototype.ngAfterViewInit = function () {
        this.recalculate();
    };
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DatatableComponent.prototype.toggleExpandRow = function (row) {
        // Should we write a guard here??
        this.bodyComponent.toggleRowExpansion(row);
    };
    /**
     * API method to expand all the rows.
     */
    DatatableComponent.prototype.expandAllRows = function () {
        this.bodyComponent.toggleAllRows(true);
    };
    /**
     * API method to collapse all the rows.
     */
    DatatableComponent.prototype.collapseAllRows = function () {
        this.bodyComponent.toggleAllRows(false);
    };
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx) {
        if (columns === void 0) { columns = this.columns; }
        if (!columns)
            return;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - utils_2.scrollbarWidth;
        }
        if (this.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx);
        }
        else if (this.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        return columns;
    };
    DatatableComponent.prototype.recalculateDims = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.innerWidth = Math.floor(width);
        if (this.scrollbarV) {
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    DatatableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    };
    DatatableComponent.prototype.onFooterPage = function (event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV)
            return Math.ceil(this.bodyHeight / this.rowHeight);
        // if limit is passed, we are paging
        if (this.limit !== undefined)
            return this.limit;
        // otherwise use row length
        if (val)
            return val.length;
        // other empty :(
        return 0;
    };
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            return val.length;
        }
        return this.count;
    };
    DatatableComponent.prototype.onColumnResize = function (_a) {
        var column = _a.column, newValue = _a.newValue;
        var idx;
        var cols = this.columns.map(function (c, i) {
            c = Object.assign({}, c);
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        });
        this.recalculateColumns(cols, idx);
        this.columns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this.columns.map(function (c) {
            return Object.assign({}, c);
        });
        cols.splice(prevValue, 1);
        cols.splice(newValue, 0, column);
        this.columns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    DatatableComponent.prototype.onColumnSort = function (event) {
        var sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            this.rows = utils_1.sortRows(this.rows, this.columns, sorts);
        }
        this.sorts = sorts;
        this.bodyComponent.updateOffsetY(0);
        this.sort.emit(event);
    };
    DatatableComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable',
                    template: "\n    <div\n      visibility-observer\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"innerWidth\"\n        [offsetX]=\"offsetX\"\n        [columns]=\"columns\"\n        [headerHeight]=\"headerHeight\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\">\n      </datatable-header>\n      <datatable-body\n        [rows]=\"rows\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"columns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"offsetX\"\n        [rowDetailTemplate]=\"rowDetailTemplate\"\n        [detailRowHeight]=\"detailRowHeight\"\n        [selected]=\"selected\"\n        [innerWidth]=\"innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [selectCheck]=\"selectCheck\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (select)=\"select.emit($event)\"\n        (detailToggle)=\"detailToggle.emit($event)\"\n        (scroll)=\"onBodyScroll($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DatatableComponent.ctorParameters = [
        { type: core_1.Renderer, },
        { type: core_1.ElementRef, },
    ];
    DatatableComponent.propDecorators = {
        'rows': [{ type: core_1.Input },],
        'columns': [{ type: core_1.Input },],
        'selected': [{ type: core_1.Input },],
        'scrollbarV': [{ type: core_1.Input },],
        'scrollbarH': [{ type: core_1.Input },],
        'rowHeight': [{ type: core_1.Input },],
        'detailRowHeight': [{ type: core_1.Input },],
        'columnMode': [{ type: core_1.Input },],
        'headerHeight': [{ type: core_1.Input },],
        'footerHeight': [{ type: core_1.Input },],
        'externalPaging': [{ type: core_1.Input },],
        'externalSorting': [{ type: core_1.Input },],
        'limit': [{ type: core_1.Input },],
        'count': [{ type: core_1.Input },],
        'offset': [{ type: core_1.Input },],
        'loadingIndicator': [{ type: core_1.Input },],
        'selectionType': [{ type: core_1.Input },],
        'reorderable': [{ type: core_1.Input },],
        'sortType': [{ type: core_1.Input },],
        'sorts': [{ type: core_1.Input },],
        'rowDetailTemplate': [{ type: core_1.Input },],
        'cssClasses': [{ type: core_1.Input },],
        'messages': [{ type: core_1.Input },],
        'rowIdentity': [{ type: core_1.Input },],
        'selectCheck': [{ type: core_1.Input },],
        'trackByProp': [{ type: core_1.Input },],
        'scroll': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'select': [{ type: core_1.Output },],
        'sort': [{ type: core_1.Output },],
        'page': [{ type: core_1.Output },],
        'detailToggle': [{ type: core_1.Output },],
        'reorder': [{ type: core_1.Output },],
        'resize': [{ type: core_1.Output },],
        'isFixedHeader': [{ type: core_1.HostBinding, args: ['class.fixed-header',] },],
        'isFixedRow': [{ type: core_1.HostBinding, args: ['class.fixed-row',] },],
        'isVertScroll': [{ type: core_1.HostBinding, args: ['class.scroll-vertical',] },],
        'isHorScroll': [{ type: core_1.HostBinding, args: ['class.scroll-horz',] },],
        'isSelectable': [{ type: core_1.HostBinding, args: ['class.selectable',] },],
        'columnTemplates': [{ type: core_1.ContentChildren, args: [column_directive_1.DataTableColumnDirective,] },],
        'rowDetailTemplateChild': [{ type: core_1.ContentChild, args: [row_detail_directive_1.DatatableRowDetailDirective,] },],
        'bodyComponent': [{ type: core_1.ViewChild, args: [body_1.DataTableBodyComponent,] },],
        'recalculate': [{ type: core_1.HostListener, args: ['window:resize',] },],
    };
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;
//# sourceMappingURL=datatable.component.js.map