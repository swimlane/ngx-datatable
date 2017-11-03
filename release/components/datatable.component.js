"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../utils");
var services_1 = require("../services");
var types_1 = require("../types");
var body_1 = require("./body");
var body_group_header_directive_1 = require("./body/body-group-header.directive");
var columns_1 = require("./columns");
var row_detail_1 = require("./row-detail");
var footer_1 = require("./footer");
var events_1 = require("../events");
var DatatableComponent = /** @class */ (function () {
    function DatatableComponent(scrollbarHelper, cd, element, differs) {
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         */
        get: /**
           * Gets the rows.
           */
        function () {
            return this._rows;
        },
        set: /**
           * Rows that are displayed in the table.
           */
        function (val) {
            this._rows = val;
            // auto sort on new updates
            if (!this.externalSorting) {
                this._internalRows = utils_1.sortRows(val, this._internalColumns, this.sorts);
            }
            else {
                this._internalRows = val.slice();
            }
            // recalculate sizes/etc
            this.recalculate();
            if (this._rows && this._groupRowsBy) {
                // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
                this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
            }
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "groupRowsBy", {
        get: function () {
            return this._groupRowsBy;
        },
        set: /**
           * This attribute allows the user to set the name of the column to group the data with
           */
        function (val) {
            if (val) {
                this._groupRowsBy = val;
                if (this._rows && this._groupRowsBy) {
                    // cretes a new array with the data grouped
                    this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        /**
         * Get the columns.
         */
        get: /**
           * Get the columns.
           */
        function () {
            return this._columns;
        },
        set: /**
           * Columns to be displayed.
           */
        function (val) {
            if (val) {
                this._internalColumns = val.slice();
                utils_1.setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "limit", {
        /**
         * Gets the limit.
         */
        get: /**
           * Gets the limit.
           */
        function () {
            return this._limit;
        },
        set: /**
           * The page size to be shown.
           * Default value: `undefined`
           */
        function (val) {
            this._limit = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "count", {
        /**
         * Gets the count.
         */
        get: /**
           * Gets the count.
           */
        function () {
            return this._count;
        },
        set: /**
           * The total count of all rows.
           * Default value: `0`
           */
        function (val) {
            this._count = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "offset", {
        get: function () {
            return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
        },
        set: /**
           * The current offset ( page - 1 ) shown.
           * Default value: `0`
           */
        function (val) {
            this._offset = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        get: /**
           * CSS class applied if the header height if fixed height.
           */
        function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        get: /**
           * CSS class applied to the root element if
           * the row heights are fixed heights.
           */
        function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        get: /**
           * CSS class applied to root element if
           * vertical scrolling is enabled.
           */
        function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        get: /**
           * CSS class applied to the root element
           * if the horziontal scrolling is enabled.
           */
        function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        get: /**
           * CSS class applied to root element is selectable.
           */
        function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCheckboxSelection", {
        get: /**
           * CSS class applied to root is checkbox selection.
           */
        function () {
            return this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        get: /**
           * CSS class applied to root if cell selection.
           */
        function () {
            return this.selectionType === types_1.SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        get: /**
           * CSS class applied to root if single select.
           */
        function () {
            return this.selectionType === types_1.SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        get: /**
           * CSS class added to root element if mulit select
           */
        function () {
            return this.selectionType === types_1.SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        get: /**
           * CSS class added to root element if mulit click select
           */
        function () {
            return this.selectionType === types_1.SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         */
        get: /**
           * Returns the column templates.
           */
        function () {
            return this._columnTemplates;
        },
        set: /**
           * Column templates gathered from `ContentChildren`
           * if described in your markup.
           */
        function (val) {
            this._columnTemplates = val;
            if (val) {
                // only set this if results were brought back
                var arr = val.toArray();
                if (arr.length) {
                    // translate them to normal objects
                    this._internalColumns = utils_1.translateTemplates(arr);
                    utils_1.setColumnDefaults(this._internalColumns);
                    this.recalculateColumns();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         */
        get: /**
           * Returns if all rows are selected.
           */
        function () {
            return this.selected &&
                this.rows &&
                this.rows.length !== 0 &&
                this.selected.length === this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    /**
       * Lifecycle hook that is called after data-bound
       * properties of a directive are initialized.
       */
    DatatableComponent.prototype.ngOnInit = /**
       * Lifecycle hook that is called after data-bound
       * properties of a directive are initialized.
       */
    function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     */
    /**
       * Lifecycle hook that is called after a component's
       * view has been fully initialized.
       */
    DatatableComponent.prototype.ngAfterViewInit = /**
       * Lifecycle hook that is called after a component's
       * view has been fully initialized.
       */
    function () {
        var _this = this;
        if (!this.externalSorting) {
            this._internalRows = utils_1.sortRows(this._rows, this._internalColumns, this.sorts);
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        requestAnimationFrame(function () {
            _this.recalculate();
            // emit page for virtual server-side kickoff
            if (_this.externalPaging && _this.scrollbarV) {
                _this.page.emit({
                    count: _this.count,
                    pageSize: _this.pageSize,
                    limit: _this.limit,
                    offset: 0
                });
            }
        });
    };
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    /**
       * Creates a map with the data grouped by the user choice of grouping index
       *
       * @param originalArray the original array passed via parameter
       * @param groupByIndex  the index of the column to group the data by
       */
    DatatableComponent.prototype.groupArrayBy = /**
       * Creates a map with the data grouped by the user choice of grouping index
       *
       * @param originalArray the original array passed via parameter
       * @param groupByIndex  the index of the column to group the data by
       */
    function (originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        var map = new Map();
        var i = 0;
        originalArray.forEach(function (item) {
            var key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            i++;
        });
        var addGroup = function (key, value) {
            return { key: key, value: value };
        };
        // convert map back to a simple array of objects
        return Array.from(map, function (x) { return addGroup(x[0], x[1]); });
    };
    /*
    * Lifecycle hook that is called when Angular dirty checks a directive.
    */
    /*
       * Lifecycle hook that is called when Angular dirty checks a directive.
       */
    DatatableComponent.prototype.ngDoCheck = /*
       * Lifecycle hook that is called when Angular dirty checks a directive.
       */
    function () {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this._internalRows = utils_1.sortRows(this._rows, this._internalColumns, this.sorts);
            }
            else {
                this._internalRows = this.rows.slice();
            }
            this.recalculatePages();
            this.cd.markForCheck();
        }
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
     */
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
       */
    DatatableComponent.prototype.recalculate = /**
       * Recalc's the sizes of the grid.
       *
       * Updated automatically on changes to:
       *
       *  - Columns
       *  - Rows
       *  - Paging related
       *
       * Also can be manually invoked or upon window resize.
       */
    function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
       * Window resize handler to update sizes.
       */
    DatatableComponent.prototype.onWindowResize = /**
       * Window resize handler to update sizes.
       */
    function () {
        this.recalculate();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    /**
       * Recalulcates the column widths based on column width
       * distribution mode and scrollbar offsets.
       */
    DatatableComponent.prototype.recalculateColumns = /**
       * Recalulcates the column widths based on column width
       * distribution mode and scrollbar offsets.
       */
    function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this._internalColumns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
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
     */
    /**
       * Recalculates the dimensions of the table size.
       * Internally calls the page size and row count calcs too.
       *
       */
    DatatableComponent.prototype.recalculateDims = /**
       * Recalculates the dimensions of the table size.
       * Internally calls the page size and row count calcs too.
       *
       */
    function () {
        var dims = this.element.getBoundingClientRect();
        this.innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            var height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    };
    /**
     * Recalculates the pages after a update.
     */
    /**
       * Recalculates the pages after a update.
       */
    DatatableComponent.prototype.recalculatePages = /**
       * Recalculates the pages after a update.
       */
    function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    /**
     * Body triggered a page event.
     */
    /**
       * Body triggered a page event.
       */
    DatatableComponent.prototype.onBodyPage = /**
       * Body triggered a page event.
       */
    function (_a) {
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
     */
    /**
       * The body triggered a scroll event.
       */
    DatatableComponent.prototype.onBodyScroll = /**
       * The body triggered a scroll event.
       */
    function (event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    };
    /**
     * The footer triggered a page event.
     */
    /**
       * The footer triggered a page event.
       */
    DatatableComponent.prototype.onFooterPage = /**
       * The footer triggered a page event.
       */
    function (event) {
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
     */
    /**
       * Recalculates the sizes of the page
       */
    DatatableComponent.prototype.calcPageSize = /**
       * Recalculates the sizes of the page
       */
    function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV) {
            var size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined) {
            return this.limit;
        }
        // otherwise use row length
        if (val) {
            return val.length;
        }
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     */
    /**
       * Calculates the row count.
       */
    DatatableComponent.prototype.calcRowCount = /**
       * Calculates the row count.
       */
    function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            if (this.groupedRows) {
                return this.groupedRows.length;
            }
            else {
                return val.length;
            }
        }
        return this.count;
    };
    /**
     * The header triggered a contextmenu event.
     */
    /**
       * The header triggered a contextmenu event.
       */
    DatatableComponent.prototype.onColumnContextmenu = /**
       * The header triggered a contextmenu event.
       */
    function (_a) {
        var event = _a.event, column = _a.column;
        this.tableContextmenu.emit({ event: event, type: types_1.ContextmenuType.header, content: column });
    };
    /**
     * The body triggered a contextmenu event.
     */
    /**
       * The body triggered a contextmenu event.
       */
    DatatableComponent.prototype.onRowContextmenu = /**
       * The body triggered a contextmenu event.
       */
    function (_a) {
        var event = _a.event, row = _a.row;
        this.tableContextmenu.emit({ event: event, type: types_1.ContextmenuType.body, content: row });
    };
    /**
     * The header triggered a column resize event.
     */
    /**
       * The header triggered a column resize event.
       */
    DatatableComponent.prototype.onColumnResize = /**
       * The header triggered a column resize event.
       */
    function (_a) {
        var column = _a.column, newValue = _a.newValue;
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        var idx;
        var cols = this._internalColumns.map(function (c, i) {
            c = __assign({}, c);
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
        this._internalColumns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     */
    /**
       * The header triggered a column re-order event.
       */
    DatatableComponent.prototype.onColumnReorder = /**
       * The header triggered a column re-order event.
       */
    function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this._internalColumns.map(function (c) {
            return __assign({}, c);
        });
        var prevCol = cols[newValue];
        cols[newValue] = column;
        cols[prevValue] = prevCol;
        this._internalColumns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * The header triggered a column sort event.
     */
    /**
       * The header triggered a column sort event.
       */
    DatatableComponent.prototype.onColumnSort = /**
       * The header triggered a column sort event.
       */
    function (event) {
        var sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this._internalRows = utils_1.sortRows(this.rows, this._internalColumns, sorts);
        }
        this.sorts = sorts;
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    };
    /**
     * Toggle all row selection
     */
    /**
       * Toggle all row selection
       */
    DatatableComponent.prototype.onHeaderSelect = /**
       * Toggle all row selection
       */
    function (event) {
        // before we splice, chk if we currently have all selected
        var allSelected = this.selected.length === this.rows.length;
        // remove all existing either way
        this.selected = [];
        // do the opposite here
        if (!allSelected) {
            (_a = this.selected).push.apply(_a, this.rows);
        }
        this.select.emit({
            selected: this.selected
        });
        var _a;
    };
    /**
     * A row was selected from body
     */
    /**
       * A row was selected from body
       */
    DatatableComponent.prototype.onBodySelect = /**
       * A row was selected from body
       */
    function (event) {
        this.select.emit(event);
    };
    __decorate([
        utils_1.throttleable(5),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onWindowResize", null);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;
//# sourceMappingURL=datatable.component.js.map