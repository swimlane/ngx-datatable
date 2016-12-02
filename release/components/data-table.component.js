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
var types_1 = require('../types');
var body_1 = require('./body');
var columns_1 = require('./columns');
var row_detail_1 = require('./row-detail');
var utils_2 = require('../utils');
var DataTableComponent = (function () {
    function DataTableComponent(element) {
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         *
         * @type {any[]}
         * @memberOf DataTableComponent
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         *
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         *
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         *
         * @type {number}
         * @memberOf DataTableComponent
         */
        this.rowHeight = 30;
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         *
         * @type {number}
         * @memberOf DataTableComponent
         */
        this.detailRowHeight = 0;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         *
         * @type {ColumnMode}
         * @memberOf DataTableComponent
         */
        this.columnMode = types_1.ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         *
         * @type {*}
         * @memberOf DataTableComponent
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         *
         * @type {number}
         * @memberOf DataTableComponent
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         *
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         *
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        this.externalSorting = false;
        /**
         * The page size to be shown.
         * Default value: `undefined`
         *
         * @type {number}
         * @memberOf DataTableComponent
         */
        this.limit = undefined;
        /**
         * The total count of all rows.
         * Default value: `0`
         *
         * @type {number}
         * @memberOf DataTableComponent
         */
        this.count = 0;
        /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         *
         * @type {number}
         * @memberOf DataTableComponent
         */
        this.offset = 0;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         *
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         *
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        this.reorderable = true;
        /**
         * The type of sorting
         *
         * @type {SortType}
         * @memberOf DataTableComponent
         */
        this.sortType = types_1.SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         *
         * @type {any[]}
         * @memberOf DataTableComponent
         */
        this.sorts = [];
        /**
         * Css class overrides
         *
         * @type {*}
         * @memberOf DataTableComponent
         */
        this.cssClasses = {
            sortAscending: 'icon-down',
            sortDescending: 'icon-up',
            pagerLeftArrow: 'icon-left',
            pagerRightArrow: 'icon-right',
            pagerPrevious: 'icon-prev',
            pagerNext: 'icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * @type {*}
         * @memberOf DataTableComponent
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total'
        };
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         *
         * @memberOf DataTableComponent
         */
        this.rowIdentity = (function (x) { return x; });
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.scroll = new core_1.EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.activate = new core_1.EventEmitter();
        /**
         * A cell or row was selected.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.select = new core_1.EventEmitter();
        /**
         * Column sort was invoked.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.sort = new core_1.EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.page = new core_1.EventEmitter();
        /**
         * Row detail row visbility was toggled.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.detailToggle = new core_1.EventEmitter();
        /**
         * Columns were re-ordered.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.reorder = new core_1.EventEmitter();
        /**
         * Column was resized.
         *
         * @type {EventEmitter<any>}
         * @memberOf DataTableComponent
         */
        this.resize = new core_1.EventEmitter();
        /**
         * The context menu was invoked on a row.
         *
         * @memberOf DataTableComponent
         */
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.offsetX = 0;
        // get ref to elm for measuring
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         *
         * @readonly
         * @type {*}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this._rows;
        },
        /**
         * Rows that are displayed in the table.
         *
         * @memberOf DataTableComponent
         */
        set: function (val) {
            // auto sort on new updates
            if (!this.externalSorting) {
                val = utils_1.sortRows(val, this.columns, this.sorts);
            }
            this._rows = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "columns", {
        /**
         * Get the columns.
         *
         * @readonly
         * @type {any[]}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this._columns;
        },
        /**
         * Columns to be displayed.
         *
         * @memberOf DataTableComponent
         */
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
    Object.defineProperty(DataTableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isFixedRow", {
        /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isVertScroll", {
        /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         *
         * @readonly
         *
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isSelectable", {
        /**
         * CSS class applied to root element is selectable.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isCheckboxSelection", {
        /**
         * CSS class applied to root is checkbox selection.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multi ||
                this.selectionType === types_1.SelectionType.multiShift;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         *
         * @readonly
         * @type {QueryList<DataTableColumnDirective>}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this._columnTemplates;
        },
        /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         *
         * @memberOf DataTableComponent
         */
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
    Object.defineProperty(DataTableComponent.prototype, "rowDetailTemplateChild", {
        /**
         * Returns the row templates.
         *
         * @readonly
         * @type {DataTableRowDetailDirective}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this._rowDetailTemplateChild;
        },
        /**
         * Row Detail templates gathered from the ContentChild
         *
         * @memberOf DataTableComponent
         */
        set: function (val) {
            this._rowDetailTemplateChild = val;
            if (val)
                this.rowDetailTemplate = val.rowDetailTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         *
         * @readonly
         * @private
         * @type {boolean}
         * @memberOf DataTableComponent
         */
        get: function () {
            return this.selected.length === this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.ngOnInit = function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        setTimeout(function () { return _this.recalculate(); });
    };
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DataTableComponent.prototype.toggleExpandRow = function (row) {
        // Should we write a guard here??
        this.bodyComponent.toggleRowExpansion(row);
    };
    /**
     * API method to expand all the rows.
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.expandAllRows = function () {
        this.bodyComponent.toggleAllRows(true);
    };
    /**
     * API method to collapse all the rows.
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.collapseAllRows = function () {
        this.bodyComponent.toggleAllRows(false);
    };
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     *
     * @param {any[]} [columns=this.columns]
     * @param {number} [forceIdx=false]
     * @param {boolean} [allowBleed=this.scrollH]
     * @returns {any[]}
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.recalculateColumns = function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this.columns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - utils_2.scrollbarWidth;
        }
        if (this.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        return columns;
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.recalculateDims = function () {
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
    /**
     * Body triggered a page event.
     *
     * @param {*} { offset }
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * The body triggered a scroll event.
     *
     * @param {MouseEvent} event
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onBodyScroll = function (event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    };
    /**
     * The footer triggered a page event.
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onFooterPage = function (event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * Recalculates the sizes of the page
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV) {
            var size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined)
            return this.limit;
        // otherwise use row length
        if (val)
            return val.length;
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            return val.length;
        }
        return this.count;
    };
    /**
     * The header triggered a column resize event.
     *
     * @param {*} { column, newValue }
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onColumnResize = function (_a) {
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
        this._columns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     *
     * @param {*} { column, newValue, prevValue }
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onColumnReorder = function (_a) {
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
    /**
     * The header triggered a column sort event.
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onColumnSort = function (event) {
        var sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this._rows = utils_1.sortRows(this.rows, this.columns, sorts);
        }
        this.sorts = sorts;
        this.bodyComponent.updateOffsetY(0);
        this.sort.emit(event);
    };
    /**
     * Toggle all row selection
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onHeaderSelect = function (event) {
        if (this.selected.length === this.rows.length) {
            this.selected = [];
        }
        else {
            this.selected = this.rows.slice();
        }
        this.select.emit({
            selected: this.selected
        });
    };
    /**
     * A row was selected from body
     *
     * @param {*} event
     *
     * @memberOf DataTableComponent
     */
    DataTableComponent.prototype.onBodySelect = function (event) {
        this.select.emit(event);
    };
    DataTableComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'swui-data-table',
                    template: "\n    <div\n      visibility-observer\n      (visible)=\"recalculate()\">\n      <data-table-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"innerWidth\"\n        [offsetX]=\"offsetX\"\n        [columns]=\"columns\"\n        [headerHeight]=\"headerHeight\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        [allRowsSelected]=\"allRowsSelected\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\"\n        (select)=\"onHeaderSelect($event)\">\n      </data-table-header>\n      <data-table-body\n        [rows]=\"rows\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"columns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"offsetX\"\n        [rowDetailTemplate]=\"rowDetailTemplate\"\n        [detailRowHeight]=\"detailRowHeight\"\n        [selected]=\"selected\"\n        [innerWidth]=\"innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [selectCheck]=\"selectCheck\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (rowContextmenu)=\"rowContextmenu.emit($event)\"\n        (select)=\"onBodySelect($event)\"\n        (detailToggle)=\"detailToggle.emit($event)\"\n        (scroll)=\"onBodyScroll($event)\">\n      </data-table-body>\n      <data-table-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </data-table-footer>\n    </div>\n  ",
                    host: {
                        class: 'data-table'
                    }
                },] },
    ];
    /** @nocollapse */
    DataTableComponent.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    DataTableComponent.propDecorators = {
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
        'rowContextmenu': [{ type: core_1.Output },],
        'isFixedHeader': [{ type: core_1.HostBinding, args: ['class.fixed-header',] },],
        'isFixedRow': [{ type: core_1.HostBinding, args: ['class.fixed-row',] },],
        'isVertScroll': [{ type: core_1.HostBinding, args: ['class.scroll-vertical',] },],
        'isHorScroll': [{ type: core_1.HostBinding, args: ['class.scroll-horz',] },],
        'isSelectable': [{ type: core_1.HostBinding, args: ['class.selectable',] },],
        'isCheckboxSelection': [{ type: core_1.HostBinding, args: ['class.checkbox-selection',] },],
        'isCellSelection': [{ type: core_1.HostBinding, args: ['class.cell-selection',] },],
        'isSingleSelection': [{ type: core_1.HostBinding, args: ['class.single-selection',] },],
        'isMultiSelection': [{ type: core_1.HostBinding, args: ['class.multi-selection',] },],
        'columnTemplates': [{ type: core_1.ContentChildren, args: [columns_1.DataTableColumnDirective,] },],
        'rowDetailTemplateChild': [{ type: core_1.ContentChild, args: [row_detail_1.DataTableRowDetailDirective,] },],
        'bodyComponent': [{ type: core_1.ViewChild, args: [body_1.DataTableBodyComponent,] },],
        'recalculate': [{ type: core_1.HostListener, args: ['window:resize',] },],
    };
    __decorate([
        utils_2.throttleable(5), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTableComponent.prototype, "recalculate", null);
    return DataTableComponent;
}());
exports.DataTableComponent = DataTableComponent;
//# sourceMappingURL=data-table.component.js.map