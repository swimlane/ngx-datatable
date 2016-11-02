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
        // Message to show when array is presented
        // but contains no values
        this.emptyMessage = 'No data to display';
        // Footer total message
        this.totalMessage = 'total';
        // The minimum header height in pixels.
        // pass falsey for no header
        // note: number|string does not work right
        this.headerHeight = 30;
        // The minimum footer height in pixels.
        // pass falsey for no footer
        this.footerHeight = 0;
        // The minimum table height in pixels.
        this.tableHeight = 300;
        // if external paging is turned on
        this.externalPaging = false;
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
            val = val || [];
            utils_2.setColumnDefaults(val);
            this._columns = val;
            this.adjustColumns();
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
                var arr = val.toArray();
                // only set this if results were brought back
                if (arr.length)
                    this.columns = arr;
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
    DatatableComponent.prototype.recalculate = function () {
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
        this.adjustColumns();
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
    DatatableComponent.prototype.adjustColumns = function (columns, forceIdx) {
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
        var cols = this.columns.map(function (c) {
            c = Object.assign({}, c);
            if (c.$$id === column.$$id)
                c.width = newValue;
            return c;
        });
        this.adjustColumns(cols, newValue);
        this.columns = cols;
    };
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this.columns.map(function (c) {
            return Object.assign({}, c);
        });
        cols.splice(prevValue, 1);
        cols.splice(newValue, 0, column);
        this.columns = cols;
    };
    DatatableComponent.prototype.onColumnSort = function (event) {
        var column = event.column, sorts = event.sorts;
        if (column.comparator !== undefined) {
            if (typeof column.comparator === 'function') {
                column.comparator(this.rows, this.sorts);
            }
        }
        else {
            this.rows = utils_1.sortRows(this.rows, this.sorts);
        }
        this.sorts = sorts;
        this.bodyComponent.updateOffsetY(0);
        this.sort.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DatatableComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DatatableComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DatatableComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "detailRowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "columnMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatatableComponent.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatatableComponent.prototype, "totalMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "headerHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "footerHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "tableHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "externalPaging", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "limit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "count", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "reorderable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DatatableComponent.prototype, "sorts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], DatatableComponent.prototype, "rowDetailTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "cssClasses", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "detailToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "resize", void 0);
    __decorate([
        core_1.HostBinding('class.fixed-header'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isSelectable", null);
    __decorate([
        core_1.ContentChildren(column_directive_1.DataTableColumnDirective), 
        __metadata('design:type', core_1.QueryList), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], DatatableComponent.prototype, "columnTemplates", null);
    __decorate([
        core_1.ContentChild(row_detail_directive_1.DatatableRowDetailDirective), 
        __metadata('design:type', row_detail_directive_1.DatatableRowDetailDirective), 
        __metadata('design:paramtypes', [row_detail_directive_1.DatatableRowDetailDirective])
    ], DatatableComponent.prototype, "rowDetailTemplateChild", null);
    __decorate([
        core_1.ViewChild(body_1.DataTableBodyComponent), 
        __metadata('design:type', body_1.DataTableBodyComponent)
    ], DatatableComponent.prototype, "bodyComponent", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DatatableComponent.prototype, "recalculate", null);
    DatatableComponent = __decorate([
        core_1.Component({
            selector: 'datatable',
            template: "\n    <div\n      visibility-observer\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"innerWidth\"\n        [offsetX]=\"offsetX\"\n        [columns]=\"columns\"\n        [headerHeight]=\"headerHeight\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\">\n      </datatable-header>\n      <datatable-body\n        [rows]=\"rows\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [columns]=\"columns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"offsetX\"\n        [rowDetailTemplate]=\"rowDetailTemplate\"\n        [detailRowHeight]=\"detailRowHeight\"\n        [selected]=\"selected\"\n        [bodyWidth]=\"innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (select)=\"select.emit($event)\"\n        (detailToggle)=\"detailToggle.emit($event)\"\n        (scroll)=\"onBodyScroll($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [totalMessage]=\"totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], DatatableComponent);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;
//# sourceMappingURL=datatable.component.js.map