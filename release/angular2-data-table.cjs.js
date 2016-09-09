/**
 * angular2-data-table v0.3.8 (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _angular_core = require('@angular/core');
var _angular_common = require('@angular/common');
var _ = require('lodash');
var rxjs_Rx = require('rxjs/Rx');

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

/**
 * Returns the columns by pin.
 * @param {array} cols
 */
function columnsByPin(cols) {
    var ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (col.frozenLeft) {
                ret.left.push(col);
            }
            else if (col.frozenRight) {
                ret.right.push(col);
            }
            else {
                ret.center.push(col);
            }
        }
    }
    return ret;
}
/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth$1(groups.left),
        center: columnTotalWidth$1(groups.center),
        right: columnTotalWidth$1(groups.right),
        total: columnTotalWidth$1(all)
    };
}
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} prop width to get
 */
function columnTotalWidth$1(columns, prop) {
    var totalWidth = 0;
    if (columns) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var c = columns_1[_i];
            var has = prop && c[prop];
            totalWidth = totalWidth + (has ? c[prop] : c.width);
        }
    }
    return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} property width to get
 */
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var c = columns_2[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = columnTotalWidth(allColumns);
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    var colsByGroup = columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {array} colsByGroup
 * @param {int} maxWidth
 * @param {int} totalFlexGrow
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow;
            }
            else {
                column.width = 0;
            }
        }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                var column = _c[_b];
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when nesc.
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proporation the widths given the min / max / noraml widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proporational widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the orginial width; not the newly proporatied widths.
 *
 * @param {array} allColumns
 * @param {int} expectedWidth
 */
function forceFillColumnWidths(allColumns, expectedWidth, startIdx) {
    var contentWidth = 0;
    var columnsToResize = startIdx > -1 ?
        allColumns.slice(startIdx, allColumns.length).filter(function (c) { return c.canAutoResize; }) :
        allColumns.filter(function (c) { return c.canAutoResize; });
    for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
        var column = allColumns_1[_i];
        if (!column.canAutoResize) {
            contentWidth += column.width;
        }
        else {
            contentWidth += (column.$$oldWidth || column.width);
        }
    }
    var remainingWidth = expectedWidth - contentWidth;
    var additionWidthPerColumn = remainingWidth / columnsToResize.length;
    var exceedsWindow = contentWidth > expectedWidth;
    for (var _a = 0, columnsToResize_1 = columnsToResize; _a < columnsToResize_1.length; _a++) {
        var column = columnsToResize_1[_a];
        if (exceedsWindow) {
            column.width = column.$$oldWidth || column.width;
        }
        else {
            if (!column.$$oldWidth) {
                column.$$oldWidth = column.width;
            }
            var newSize = column.$$oldWidth + additionWidthPerColumn;
            if (column.minWith && newSize < column.minWidth) {
                column.width = column.minWidth;
            }
            else if (column.maxWidth && newSize > column.maxWidth) {
                column.width = column.maxWidth;
            }
            else {
                column.width = newSize;
            }
        }
    }
}

(function (ColumnMode) {
    ColumnMode[ColumnMode["standard"] = 'standard'] = "standard";
    ColumnMode[ColumnMode["flex"] = 'flex'] = "flex";
    ColumnMode[ColumnMode["force"] = 'force'] = "force";
})(exports.ColumnMode || (exports.ColumnMode = {}));

(function (SortType) {
    SortType[SortType["single"] = 'single'] = "single";
    SortType[SortType["multi"] = 'multi'] = "multi";
})(exports.SortType || (exports.SortType = {}));

var TableOptions = (function () {
    function TableOptions(props) {
        // Columns
        this.columns = [];
        // Enable vertical scrollbars
        this.scrollbarV = false;
        // Enable horz scrollbars
        this.scrollbarH = false;
        // The row height; which is necessary
        // to calculate the height for the lazy rendering.
        this.rowHeight = 30;
        // flex
        // force
        // standard
        this.columnMode = exports.ColumnMode.standard;
        // Loading message presented when the array is undefined
        this.loadingMessage = 'Loading...';
        // Message to show when array is presented
        // but contains no values
        this.emptyMessage = 'No data to display';
        // The minimum header height in pixels.
        // pass falsey for no header
        // note: number|string does not work right
        this.headerHeight = 30;
        // The minimum footer height in pixels.
        // pass falsey for no footer
        this.footerHeight = 0;
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
        this.sortType = exports.SortType.single;
        // sorts
        this.sorts = [];
        Object.assign(this, props);
    }
    return TableOptions;
}());

/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}

/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 * @param  {string} str
 * @return {string} camel case string
 */
function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}

/**
 * Default Column Options
 * @type {object}
 */
var TableColumn = (function () {
    function TableColumn(props) {
        // unique id
        this.$$id = id();
        // defines if its expressive
        this.isExpressive = false;
        // pinned to the left
        this.frozenLeft = false;
        // pinned to the right
        this.frozenRight = false;
        // The grow factor relative to other columns. Same as the flex-grow
        // API from http =//www.w3.org/TR/css3-flexbox/. Basically;
        // take any available extra width and distribute it proportionally
        // according to all columns' flexGrow values.
        this.flexGrow = 0;
        // Minimum width of the column.
        this.minWidth = 0;
        // Maximum width of the column.
        this.maxWidth = undefined;
        // The width of the column; by default (in pixels).
        this.width = 150;
        // If yes then the column can be resized; otherwise it cannot.
        this.resizeable = true;
        // Custom sort comparator
        this.comparator = undefined;
        // Custom pipe
        this.pipe = null;
        // If yes then the column can be sorted.
        this.sortable = true;
        // can column be dragged
        this.draggable = true;
        // Whether the column can automatically resize to fill space in the table.
        this.canAutoResize = true;
        Object.assign(this, props);
        if (!this.prop && this.name) {
            this.prop = camelCase(this.name);
        }
    }
    TableColumn.getProps = function () {
        var props = ['name', 'prop'];
        var col = new TableColumn();
        for (var prop in col) {
            props.push(prop);
        }
        return props;
    };
    return TableColumn;
}());

var DataTableColumn = (function () {
    function DataTableColumn() {
    }
    __decorate([
        _angular_core.ContentChild(_angular_core.TemplateRef), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.QueryList !== 'undefined' && _angular_core.QueryList) === 'function' && _a) || Object)
    ], DataTableColumn.prototype, "template", void 0);
    DataTableColumn = __decorate([
        _angular_core.Directive({
            selector: 'datatable-column',
            inputs: TableColumn.getProps()
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumn);
    return DataTableColumn;
    var _a;
}());

/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 * @return {int} width
 */
function scrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}
;

(function (SortDirection) {
    SortDirection[SortDirection["asc"] = 'asc'] = "asc";
    SortDirection[SortDirection["desc"] = 'desc'] = "desc";
})(exports.SortDirection || (exports.SortDirection = {}));

/**
 * Gets the next sort direction
 * @param  {SortType}      sortType
 * @param  {SortDirection} currentSort
 * @return {SortDirection}
 */
function nextSortDir(sortType, current) {
    if (sortType === exports.SortType.single) {
        if (current === exports.SortDirection.asc) {
            return exports.SortDirection.desc;
        }
        else {
            return exports.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return exports.SortDirection.asc;
        }
        else if (current === exports.SortDirection.asc) {
            return exports.SortDirection.desc;
        }
        else if (current === exports.SortDirection.desc) {
            return undefined;
        }
    }
}
;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 * @param  {any}    a
 * @param  {any}    b
 * @return {number} position
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
/**
 * Sorts the rows
 * @param  {Array<any>}  rows
 * @param  {Array<Sort>} dirs
 * @return {Array<any>} results
 */
function sortRows(rows, dirs) {
    var temp = rows.slice();
    return temp.sort(function (a, b) {
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var _a = dirs_1[_i], prop = _a.prop, dir = _a.dir;
            var comparison = dir !== exports.SortDirection.desc ?
                orderByComparator(a[prop], b[prop]) :
                -orderByComparator(a[prop], b[prop]);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        // equal each other
        return 0;
    });
}

var Sort = (function () {
    function Sort(props) {
        Object.assign(this, props);
    }
    return Sort;
}());

var StateService = (function () {
    function StateService() {
        this.options = new Map();
        this.rows = new Map();
        this.selected = new Map();
        this.onSelectionChange = new _angular_core.EventEmitter();
        this.onRowsUpdate = new _angular_core.EventEmitter();
        this.onPageChange = new _angular_core.EventEmitter();
        this.scrollbarWidth = new Map();
        this.offsetX = new Map();
        this.offsetY = new Map();
        this.innerWidth = new Map();
        this.bodyHeight = new Map();
    }
    StateService.prototype.newInstance = function () {
        var key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        this.bodyHeight.set(key, 300);
        this.offsetX.set(key, 0);
        this.offsetY.set(key, 0);
        this.innerWidth.set(key, 0);
        this.scrollbarWidth.set(key, scrollbarWidth());
        return key;
    };
    StateService.prototype.getScrollbarWidth = function (key) {
        return this.scrollbarWidth.get(key);
    };
    StateService.prototype.setScollbarWidth = function (key, value) {
        this.scrollbarWidth.set(key, value);
        return this;
    };
    StateService.prototype.getOffsetX = function (key) {
        return this.offsetX.get(key);
    };
    StateService.prototype.setOffsetX = function (key, value) {
        this.offsetX.set(key, value);
        return this;
    };
    StateService.prototype.getOffsetY = function (key) {
        return this.offsetY.get(key);
    };
    StateService.prototype.setOffsetY = function (key, value) {
        this.offsetY.set(key, value);
        return this;
    };
    StateService.prototype.getInnerWidth = function (key) {
        return this.innerWidth.get(key);
    };
    StateService.prototype.setInnerWidth = function (key, value) {
        this.innerWidth.set(key, value);
        return this;
    };
    StateService.prototype.getBodyHeight = function (key) {
        return this.bodyHeight.get(key);
    };
    StateService.prototype.setBodyHeight = function (key, value) {
        this.bodyHeight.set(key, value);
        return this;
    };
    StateService.prototype.columnsByPin = function (key) {
        return columnsByPin(this.getOption(key, 'columns'));
    };
    StateService.prototype.columnGroupWidths = function (key) {
        return columnGroupWidths(this.columnsByPin(key), this.getOption(key, 'columns'));
    };
    StateService.prototype.rowCount = function (key) {
        if (!this.getOption(key, 'externalPaging')) {
            return this.rows.get(key).length;
        }
        else {
            return this.getOption(key, 'count');
        }
    };
    StateService.prototype.getRows = function (key) {
        return this.rows.get(key);
    };
    StateService.prototype.pageSize = function (key) {
        if (this.getOption(key, 'scrollbarV')) {
            return Math.ceil(this.getBodyHeight(key) / this.getOption(key, 'rowHeight')) + 1;
        }
        else if (this.getOption(key, 'limit')) {
            return this.getOption(key, 'limit');
        }
        else {
            return this.rows.get(key).length;
        }
    };
    StateService.prototype.indexes = function (key) {
        var first = 0;
        var last = 0;
        if (this.getOption(key, 'scrollbarV')) {
            var floor = Math.floor((this.getOffsetY(key) || 0) / this.getOption(key, 'rowHeight'));
            first = Math.max(floor, 0);
            last = Math.min(first + this.pageSize(key), this.rowCount(key));
        }
        else {
            first = Math.max(this.getOption(key, 'offset') * this.pageSize(key), 0);
            last = Math.min(first + this.pageSize(key), this.rowCount(key));
        }
        return { first: first, last: last };
    };
    StateService.prototype.setSelected = function (key, selected) {
        if (!this.selected.get(key)) {
            this.selected.set(key, selected || []);
        }
        else {
            var selected_1 = this.selected.get(key);
            selected_1.splice(0, selected_1.length);
            selected_1.push.apply(selected_1, selected_1);
            this.selected.set(key, selected_1);
        }
        this.onSelectionChange.emit(this.selected);
        return this;
    };
    StateService.prototype.getSelected = function (key) {
        return this.selected.get(key);
    };
    StateService.prototype.setRows = function (key, rows) {
        if (rows) {
            this.rows.set(key, rows.slice());
            this.onRowsUpdate.emit(rows);
        }
        return this;
    };
    StateService.prototype.setOptions = function (key, options) {
        this.options.set(key, options);
        return this;
    };
    StateService.prototype.addOption = function (key, option) {
        var options = this.options.get(key);
        _.extend(options, option);
        this.options.set(key, options);
        return this;
    };
    StateService.prototype.getOption = function (key, option) {
        var options = this.options.get(key);
        return options[option];
    };
    StateService.prototype.updateOption = function (key, option, value) {
        var options = this.options.get(key);
        var obj = { option: value };
        _.merge(options, obj);
        this.options.set(key, options);
        return this;
    };
    StateService.prototype.deleteOption = function (key, option) {
    };
    StateService.prototype.getOptions = function (key) {
        return this.options.get(key);
    };
    StateService.prototype.setPage = function (key, _a) {
        var type = _a.type, value = _a.value;
        this.updateOption(key, 'offset', value - 1);
        this.onPageChange.emit({
            type: type,
            offset: this.getOption(key, 'offset'),
            limit: this.pageSize(key),
            count: this.rowCount(key)
        });
    };
    StateService.prototype.nextSort = function (key, column) {
        var idx = this.getOption(key, 'sorts').findIndex(function (s) {
            return s.prop === column.prop;
        });
        var currentSort = this.getOption(key, 'sorts');
        var curSort = currentSort[idx];
        var curDir = undefined;
        if (curSort)
            curDir = curSort.dir;
        var dir = nextSortDir(this.getOption(key, 'sortType'), curDir);
        if (dir === undefined) {
            currentSort.splice(idx, 1);
        }
        else if (curSort) {
            currentSort[idx].dir = dir;
        }
        else {
            if (this.getOption(key, 'sortType') === exports.SortType.single) {
                currentSort.splice(0, currentSort.length);
            }
            currentSort.push(new Sort({ dir: dir, prop: column.prop }));
        }
        console.debug('Current Sort', currentSort);
        this.updateOption(key, 'sorts', currentSort);
        if (!column.comparator) {
            var rows = this.rows.get(key);
            this.setRows(key, sortRows(rows, currentSort));
        }
        else {
            column.comparator(this.rows, currentSort);
        }
    };
    StateService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());

var DataTable = (function () {
    function DataTable(state, element, differs) {
        this.state = state;
        this.onPageChange = new _angular_core.EventEmitter();
        this.onRowsUpdate = new _angular_core.EventEmitter();
        this.onRowClick = new _angular_core.EventEmitter();
        this.onSelectionChange = new _angular_core.EventEmitter();
        this.onColumnChange = new _angular_core.EventEmitter();
        this.key = state.newInstance();
        this.element = element.nativeElement;
        this.element.classList.add('datatable');
        this.rowDiffer = differs.find({}).create(null);
        this.colDiffer = differs.find({}).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        var _a = this, options = _a.options, rows = _a.rows, selected = _a.selected;
        this.state
            .setOptions(this.key, options)
            .setRows(this.key, rows)
            .setSelected(this.key, selected);
        console.debug('State', this.state);
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.adjustColumns();
        if (this.columns.length) {
            setTimeout(function () {
                for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.options.columns.push(new TableColumn(col));
                }
            });
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.state.setRows(this.key, this.rows);
            this.onRowsUpdate.emit(this.rows);
        }
        this.checkColumnChanges();
    };
    DataTable.prototype.checkColumnChanges = function () {
        var colDiff = this.colDiffer.diff(this.options.columns);
        if (colDiff) {
            var chngd_1 = false;
            colDiff.forEachAddedItem(function () {
                chngd_1 = true;
                return false;
            });
            if (!chngd_1) {
                colDiff.forEachRemovedItem(function () {
                    chngd_1 = true;
                    return false;
                });
            }
            // if a column was added or removed
            // we need to re-adjust columns
            if (chngd_1)
                this.adjustColumns();
        }
    };
    DataTable.prototype.adjustSizes = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.state.setInnerWidth(this.key, Math.floor(width));
        if (this.options.scrollbarV) {
            if (this.options.headerHeight)
                height = height - this.options.headerHeight;
            if (this.options.footerHeight)
                height = height - this.options.footerHeight;
            this.state.setBodyHeight(this.key, height);
        }
        this.adjustColumns();
    };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.options.columns)
            return;
        var width = this.state.getInnerWidth(this.key);
        if (this.options.scrollbarV) {
            width = width - this.state.getScrollbarWidth(this.key);
        }
        if (this.options.columnMode === exports.ColumnMode.force) {
            forceFillColumnWidths(this.options.columns, width, forceIdx);
        }
        else if (this.options.columnMode === exports.ColumnMode.flex) {
            adjustColumnWidths(this.options.columns, width);
        }
    };
    DataTable.prototype.onPageChanged = function (action) {
        this.state.setPage(this.key, action);
        this.onPageChange.emit(action.page);
    };
    DataTable.prototype.onRowSelect = function (event) {
        this.state.setSelected(this.key, event);
        this.onSelectionChange.emit(event);
    };
    DataTable.prototype.resize = function () {
        this.adjustSizes();
    };
    Object.defineProperty(DataTable.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.options.headerHeight;
            return (typeof headerHeight === 'string') ? headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.options.rowHeight;
            return (typeof rowHeight === 'string') ? rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isVertScroll", {
        get: function () {
            return this.options.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isHorScroll", {
        get: function () {
            return this.options.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isSelectable", {
        get: function () {
            return this.options.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', (typeof (_a = typeof TableOptions !== 'undefined' && TableOptions) === 'function' && _a) || Object)
    ], DataTable.prototype, "options", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "selected", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _b) || Object)
    ], DataTable.prototype, "onPageChange", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_c = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _c) || Object)
    ], DataTable.prototype, "onRowsUpdate", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_d = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _d) || Object)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_e = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _e) || Object)
    ], DataTable.prototype, "onSelectionChange", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_f = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _f) || Object)
    ], DataTable.prototype, "onColumnChange", void 0);
    __decorate([
        _angular_core.ContentChildren(DataTableColumn), 
        __metadata('design:type', (typeof (_g = typeof _angular_core.QueryList !== 'undefined' && _angular_core.QueryList) === 'function' && _g) || Object)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        _angular_core.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTable.prototype, "resize", null);
    __decorate([
        _angular_core.HostBinding('class.fixed-header'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedHeader", null);
    __decorate([
        _angular_core.HostBinding('class.fixed-row'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedRow", null);
    __decorate([
        _angular_core.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isVertScroll", null);
    __decorate([
        _angular_core.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isHorScroll", null);
    __decorate([
        _angular_core.HostBinding('class.selectable'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isSelectable", null);
    DataTable = __decorate([
        _angular_core.Component({
            selector: 'datatable',
            template: "\n    <div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header\n        [key]=\"key\"\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </datatable-header>\n      <datatable-body\n        [key]=\"key\"\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </datatable-body>\n      <datatable-footer\n        [key]=\"key\"\n        (onPageChange)=\"onPageChanged($event)\">\n      </datatable-footer>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_h = typeof StateService !== 'undefined' && StateService) === 'function' && _h) || Object, (typeof (_j = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _j) || Object, (typeof (_k = typeof _angular_core.KeyValueDiffers !== 'undefined' && _angular_core.KeyValueDiffers) === 'function' && _k) || Object])
    ], DataTable);
    return DataTable;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

var cache = {};
var testStyle = document.createElement('div').style;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1];
    var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    };
})();
function getVendorPrefixedName(property) {
    var name = camelCase(property);
    if (!cache[name]) {
        if (testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}

// browser detection and prefixing tools
var transform = getVendorPrefixedName('transform');
var backfaceVisibility = getVendorPrefixedName('backfaceVisibility');
var hasCSSTransforms = !!getVendorPrefixedName('transform');
var hasCSS3DTransforms = !!getVendorPrefixedName('perspective');
var ua = window.navigator.userAgent;
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}

var DataTableHeader = (function () {
    function DataTableHeader(state, elm) {
        this.state = state;
        this.onColumnChange = new _angular_core.EventEmitter();
        elm.nativeElement.classList.add('datatable-header');
    }
    Object.defineProperty(DataTableHeader.prototype, "headerWidth", {
        get: function () {
            if (this.state.getOption(this.key, 'scrollbarH'))
                return this.state.getInnerWidth(this.key) + 'px';
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeader.prototype, "headerHeight", {
        get: function () {
            var height = this.state.getOption(this.key, 'headerHeight');
            if (height !== 'auto')
                return height + "px";
            return height;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeader.prototype.columnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        column.width = width;
        this.onColumnChange.emit({
            type: 'resize',
            value: column
        });
    };
    DataTableHeader.prototype.columnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        var options = this.state.getOptions(this.key);
        options.columns.splice(prevIndex, 1);
        options.columns.splice(newIndex, 0, model);
        this.state.setOptions(this.key, options);
        this.onColumnChange.emit({
            type: 'reorder',
            value: model
        });
    };
    DataTableHeader.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths(this.key);
        var offsetX = this.state.getOffsetX(this.key);
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.getInnerWidth(this.key);
            var offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], DataTableHeader.prototype, "key", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], DataTableHeader.prototype, "onColumnChange", void 0);
    DataTableHeader = __decorate([
        _angular_core.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      [style.width]=\"state.columnGroupWidths(key).total + 'px'\"\n      class=\"datatable-header-inner\"\n      orderable\n      (onReorder)=\"columnReordered($event)\">\n      <div\n        class=\"datatable-row-left\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        *ngIf=\"state.columnsByPin(key).left.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin(key).left\"\n          resizeable\n          [key]=\"key\"\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [model]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin(key).center.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin(key).center\"\n          resizeable\n          [key]=\"key\"\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [model]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        *ngIf=\"state.columnsByPin(key).right.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin(key).right\"\n          resizeable\n          [key]=\"key\"\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [model]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            host: {
                '[style.width]': 'headerWidth',
                '[style.height]': 'headerHeight'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof StateService !== 'undefined' && StateService) === 'function' && _b) || Object, (typeof (_c = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _c) || Object])
    ], DataTableHeader);
    return DataTableHeader;
    var _a, _b, _c;
}());

var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
})(Keys || (Keys = {}));

function selectRows(selected, row) {
    var selectedIndex = selected.indexOf(row);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
function selectRowsBetween(selected, rows, index, prevIndex) {
    var reverse = index < prevIndex;
    for (var i = 0, len = rows.length; i < len; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: (prevIndex - index)
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            var idx = selected.indexOf(row);
            // if reverse shift selection (unselect) and the
            // row is already selected, remove it from selected
            if (reverse && idx > -1) {
                selected.splice(idx, 1);
                continue;
            }
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i < range.end) {
                if (idx === -1) {
                    selected.push(row);
                }
            }
        }
    }
    return selected;
}

(function (SelectionType) {
    SelectionType[SelectionType["single"] = 'single'] = "single";
    SelectionType[SelectionType["multi"] = 'multi'] = "multi";
    SelectionType[SelectionType["multiShift"] = 'multiShift'] = "multiShift";
})(exports.SelectionType || (exports.SelectionType = {}));

var Scroller = (function () {
    function Scroller(element) {
        this.scrollbarV = false;
        this.onScroll = new _angular_core.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
        this.element.classList.add('datatable-scroll');
    }
    Object.defineProperty(Scroller.prototype, "scrollHeight", {
        get: function () {
            return (this.count * this.rowHeight) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Scroller.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV) {
            this.parentElement = this.element.parentElement.parentElement;
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    Scroller.prototype.ngOnDestroy = function () {
        if (this.scrollbarV) {
            this.parentElement.removeEventListener('scroll');
        }
    };
    Scroller.prototype.setOffset = function (offsetY) {
        this.parentElement.scrollTop = offsetY;
    };
    Scroller.prototype.onScrolled = function (event) {
        var dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    };
    Scroller.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.onScroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "rowHeight", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "count", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollWidth", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], Scroller.prototype, "scrollbarV", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], Scroller.prototype, "onScroll", void 0);
    Scroller = __decorate([
        _angular_core.Directive({
            selector: '[scroller]',
            host: {
                '[style.height]': 'scrollHeight',
                '[style.width]': 'scrollWidth + "px"'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], Scroller);
    return Scroller;
    var _a, _b;
}());

var DataTableBody = (function () {
    function DataTableBody(state, element) {
        this.state = state;
        this.onRowClick = new _angular_core.EventEmitter();
        this.onRowSelect = new _angular_core.EventEmitter();
        element.nativeElement.classList.add('datatable-body');
    }
    Object.defineProperty(DataTableBody.prototype, "selectEnabled", {
        get: function () {
            return !!this.state.getOption(this.key, 'selectionType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyHeight", {
        get: function () {
            if (this.state.getOption(this.key, 'scrollbarV')) {
                return this.state.getBodyHeight(this.key) + 'px';
            }
            else {
                return 'auto';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyWidth", {
        get: function () {
            if (this.state.getOption(this.key, 'scrollbarH')) {
                return this.state.getInnerWidth(this.key) + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableBody.prototype.ngOnInit = function () {
        var _this = this;
        this.rows = this.state.getRows(this.key).slice();
        this.sub = this.state.onPageChange.subscribe(function (action) {
            _this.updateRows();
            _this.hideIndicator();
            if (_this.state.getOption(_this.key, 'scrollbarV') && action.type === 'pager-event') {
                var offset = (_this.state.getOption(_this.key, 'rowHeight') * action.limit) * action.offset;
                _this.scroller.setOffset(offset);
            }
        });
        this.sub.add(this.state.onRowsUpdate.subscribe(function (rows) {
            _this.updateRows();
            _this.hideIndicator();
        }));
    };
    DataTableBody.prototype.onBodyScroll = function (props) {
        this.state.setOffsetY(this.key, props.scrollYPos);
        this.state.setOffsetX(this.key, props.scrollXPos);
        this.updatePage(props.direction);
        this.updateRows();
    };
    DataTableBody.prototype.updatePage = function (direction) {
        var idxs = this.state.indexes(this.key);
        var page = idxs.first / this.state.pageSize(this.key);
        if (direction === 'up') {
            page = Math.floor(page);
        }
        else if (direction === 'down') {
            page = Math.ceil(page);
        }
        if (direction !== undefined && !isNaN(page)) {
            // pages are offset + 1 ;)
            this.state.setPage(this.key, {
                type: 'body-event',
                value: page + 1
            });
        }
    };
    DataTableBody.prototype.updateRows = function (refresh) {
        var idxs = this.state.indexes(this.key);
        var idx = 0;
        var rowIndex = idxs.first;
        var endSpliceIdx = refresh ? this.state.rowCount(this.key) : idxs.last - idxs.first;
        this.rows.splice(0, endSpliceIdx);
        while (rowIndex < idxs.last && rowIndex < this.state.rowCount(this.key)) {
            var row = this.state.getRows(this.key)[rowIndex];
            if (row) {
                row.$$index = rowIndex;
                this.rows[idx] = row;
            }
            idx++;
            rowIndex++;
        }
    };
    DataTableBody.prototype.getRowsStyles = function (row) {
        var rowHeight = this.state.getOption(this.key, 'rowHeight');
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.state.getOption(this.key, 'scrollbarV')) {
            var idx = row ? row.$$index : 0;
            var pos = idx * rowHeight;
            translateXY(styles, 0, pos);
        }
        return styles;
    };
    DataTableBody.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.state.updateOption(_this.key, 'loadingIndicator', false); }, 500);
    };
    DataTableBody.prototype.rowClicked = function (event, index, row) {
        this.onRowClick.emit({ event: event, row: row });
        this.selectRow(event, index, row);
    };
    DataTableBody.prototype.rowKeydown = function (event, index, row) {
        if (event.keyCode === Keys.return && this.selectEnabled) {
            this.selectRow(event, index, row);
        }
        else if (event.keyCode === Keys.up || event.keyCode === Keys.down) {
            var dom = event.keyCode === Keys.up ?
                event.target.previousElementSibling :
                event.target.nextElementSibling;
            if (dom)
                dom.focus();
        }
    };
    DataTableBody.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var multiShift = this.state.getOption(this.key, 'selectionType') === exports.SelectionType.multiShift;
        var multiClick = this.state.getOption(this.key, 'selectionType') === exports.SelectionType.multi;
        var selections = [];
        if (multiShift || multiClick) {
            if (multiShift && event.shiftKey) {
                var selected = this.state.getSelected(this.key).slice();
                selections = selectRowsBetween(selected, this.rows, index, this.prevIndex);
            }
            else if (multiShift && !event.shiftKey) {
                selections.push(row);
            }
            else {
                var selected = this.state.getSelected(this.key).slice();
                selections = selectRows(selected, row);
            }
        }
        else {
            selections.push(row);
        }
        this.prevIndex = index;
        this.onRowSelect.emit(selections);
    };
    DataTableBody.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], DataTableBody.prototype, "key", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], DataTableBody.prototype, "onRowClick", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _b) || Object)
    ], DataTableBody.prototype, "onRowSelect", void 0);
    __decorate([
        _angular_core.ViewChild(Scroller), 
        __metadata('design:type', (typeof (_c = typeof Scroller !== 'undefined' && Scroller) === 'function' && _c) || Object)
    ], DataTableBody.prototype, "scroller", void 0);
    __decorate([
        _angular_core.HostBinding('style.height'), 
        __metadata('design:type', Object)
    ], DataTableBody.prototype, "bodyHeight", null);
    __decorate([
        _angular_core.HostBinding('style.width'), 
        __metadata('design:type', Object)
    ], DataTableBody.prototype, "bodyWidth", null);
    DataTableBody = __decorate([
        _angular_core.Component({
            selector: 'datatable-body',
            template: "\n    <div>\n      <datatable-progress\n        *ngIf=\"state.getOption(key,'loadingIndicator')\">\n      </datatable-progress>\n      <div\n        scroller\n        (onScroll)=\"onBodyScroll($event)\"\n        *ngIf=\"state.getRows(key).length\"\n        [rowHeight]=\"state.getOption(key,'rowHeight')\"\n        [scrollbarV]=\"state.getOption(key,'scrollbarV')\"\n        [count]=\"state.rowCount(key)\"\n        [scrollWidth]=\"state.columnGroupWidths(key).total\">\n        <datatable-body-row\n          [key]=\"key\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [style.height]=\"state.getOption(key,'rowHeight') + 'px'\"\n          *ngFor=\"let row of rows; let i = index;\"\n          [attr.tabindex]=\"i\"\n          (click)=\"rowClicked($event, i, row)\"\n          (keydown)=\"rowKeydown($event, i, row)\"\n          [row]=\"row\"\n          [class.datatable-row-even]=\"row.$$index % 2 === 0\"\n          [class.datatable-row-odd]=\"row.$$index % 2 !== 0\">\n        </datatable-body-row>\n      </div>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"state.getOption(key,'emptyMessage')\">\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof StateService !== 'undefined' && StateService) === 'function' && _d) || Object, (typeof (_e = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _e) || Object])
    ], DataTableBody);
    return DataTableBody;
    var _a, _b, _c, _d, _e;
}());

var DataTableFooter = (function () {
    function DataTableFooter(elm, state) {
        this.state = state;
        this.onPageChange = new _angular_core.EventEmitter();
        elm.nativeElement.classList.add('datatable-footer');
    }
    Object.defineProperty(DataTableFooter.prototype, "visible", {
        get: function () {
            return (this.state.rowCount(this.key) / this.state.pageSize(this.key)) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooter.prototype, "curPage", {
        get: function () {
            return this.state.getOption(this.key, 'offset') + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], DataTableFooter.prototype, "key", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], DataTableFooter.prototype, "onPageChange", void 0);
    DataTableFooter = __decorate([
        _angular_core.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      *ngIf=\"state.getOption(key,'footerHeight')\"\n      [style.height]=\"state.getOption(key,'footerHeight')\">\n      <div class=\"page-count\">{{state.rowCount(key)}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize(key)\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.rowCount(key)\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof StateService !== 'undefined' && StateService) === 'function' && _c) || Object])
    ], DataTableFooter);
    return DataTableFooter;
    var _a, _b, _c;
}());

var DataTableHeaderCell = (function () {
    function DataTableHeaderCell(element, state) {
        this.element = element;
        this.state = state;
        this.onColumnChange = new _angular_core.EventEmitter();
        this.sort = this.onSort.bind(this);
        element.nativeElement.classList.add('datatable-header-cell');
    }
    Object.defineProperty(DataTableHeaderCell.prototype, "sortDir", {
        get: function () {
            var _this = this;
            var optionSorts = this.state.getOption(this.key, 'sorts');
            var sort = optionSorts.find(function (s) {
                return s.prop === _this.model.prop;
            });
            if (sort)
                return sort.dir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "name", {
        get: function () {
            return this.model.name || this.model.prop;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCell.prototype.sortClasses = function (sort) {
        var dir = this.sortDir;
        return {
            'sort-asc icon-down': dir === exports.SortDirection.asc,
            'sort-desc icon-up': dir === exports.SortDirection.desc
        };
    };
    DataTableHeaderCell.prototype.onSort = function () {
        if (this.model.sortable) {
            this.state.nextSort(this.key, this.model);
            this.onColumnChange.emit({
                type: 'sort',
                value: this.model
            });
        }
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', (typeof (_a = typeof TableColumn !== 'undefined' && TableColumn) === 'function' && _a) || Object)
    ], DataTableHeaderCell.prototype, "model", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], DataTableHeaderCell.prototype, "key", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _b) || Object)
    ], DataTableHeaderCell.prototype, "onColumnChange", void 0);
    DataTableHeaderCell = __decorate([
        _angular_core.Component({
            selector: 'datatable-header-cell',
            template: "\n    <div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        *ngIf=\"!model.headerTemplate\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"name\">\n      </span>\n      <template\n        *ngIf=\"model.headerTemplate\"\n        [column]=\"model\"\n        [sort]=\"sort\"\n        [templateWrapper]=\"model.headerTemplate\">\n      </template>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses()\">\n      </span>\n    </div>\n  ",
            host: {
                '[class.sortable]': 'model.sortable',
                '[class.resizable]': 'model.resizable',
                '[style.width]': 'model.width + "px"',
                '[style.minWidth]': 'model.minWidth + "px"',
                '[style.maxWidth]': 'model.maxWidth + "px"',
                '[style.height]': 'model.height + "px"',
                '[attr.title]': 'name'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof StateService !== 'undefined' && StateService) === 'function' && _d) || Object])
    ], DataTableHeaderCell);
    return DataTableHeaderCell;
    var _a, _b, _c, _d;
}());

var DataTablePager = (function () {
    function DataTablePager(elm) {
        this.size = 0;
        this.onPaged = new _angular_core.EventEmitter();
        elm.nativeElement.classList.add('datatable-pager');
    }
    Object.defineProperty(DataTablePager.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePager.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePager.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    DataTablePager.prototype.canPrevious = function () {
        return this.page > 1;
    };
    DataTablePager.prototype.canNext = function () {
        return this.page < this.totalPages;
    };
    DataTablePager.prototype.prevPage = function () {
        if (this.page > 1) {
            this.selectPage(--this.page);
        }
    };
    DataTablePager.prototype.nextPage = function () {
        this.selectPage(++this.page);
    };
    DataTablePager.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages) {
            this.page = page;
            this.onPaged.emit({
                type: 'pager-event',
                value: page
            });
        }
    };
    DataTablePager.prototype.calcPages = function (page) {
        var pages = [];
        var startPage = 1;
        var endPage = this.totalPages;
        var maxSize = 5;
        var isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
            endPage = Math.min(startPage + maxSize - 1, this.totalPages);
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], DataTablePager.prototype, "size", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], DataTablePager.prototype, "onPaged", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTablePager.prototype, "count", null);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTablePager.prototype, "page", null);
    DataTablePager = __decorate([
        _angular_core.Component({
            selector: 'datatable-pager',
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\"\n          class=\"icon-prev\">\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\"\n          class=\"icon-left\">\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\"\n          class=\"icon-right\">\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\"\n          class=\"icon-skip\">\n        </a>\n      </li>\n    </ul>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], DataTablePager);
    return DataTablePager;
    var _a, _b;
}());

var DataTableBodyRow = (function () {
    function DataTableBodyRow(state, element) {
        this.state = state;
        element.nativeElement.classList.add('datatable-body-row');
    }
    Object.defineProperty(DataTableBodyRow.prototype, "isSelected", {
        get: function () {
            return this.state.getSelected(this.key) &&
                this.state.getSelected(this.key).indexOf(this.row) > -1;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRow.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths(this.key);
        var offsetX = this.state.getOffsetX(this.key);
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.getInnerWidth(this.key);
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.state.getScrollbarWidth(this.key)) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], DataTableBodyRow.prototype, "key", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "row", void 0);
    __decorate([
        _angular_core.HostBinding('class.active'), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "isSelected", null);
    DataTableBodyRow = __decorate([
        _angular_core.Component({
            selector: 'datatable-body-row',
            template: "\n    <div>\n      <div\n        class=\"datatable-row-left datatable-row-group\"\n        *ngIf=\"state.columnsByPin(key).left.length\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        [style.width]=\"state.columnGroupWidths(key).left + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin(key).left\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-center datatable-row-group\"\n        [style.width]=\"state.columnGroupWidths(key).center + 'px'\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin(key).center.length\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin(key).center\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-right datatable-row-group\"\n        *ngIf=\"state.columnsByPin(key).right.length\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        [style.width]=\"state.columnGroupWidths(key).right + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin(key).right\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof StateService !== 'undefined' && StateService) === 'function' && _a) || Object, (typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], DataTableBodyRow);
    return DataTableBodyRow;
    var _a, _b;
}());

var ProgressBar = (function () {
    function ProgressBar() {
    }
    ProgressBar = __decorate([
        _angular_core.Component({
            selector: 'datatable-progress',
            template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBar);
    return ProgressBar;
}());

/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (!obj || !path)
        return obj;
    var current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0, len = split.length; i < len; i++) {
            current = current[split[i]];
        }
    }
    return current;
}

var DataTableBodyCell = (function () {
    function DataTableBodyCell(element) {
        element.nativeElement.classList.add('datatable-body-cell');
    }
    Object.defineProperty(DataTableBodyCell.prototype, "value", {
        get: function () {
            if (!this.row)
                return '';
            var prop = deepValueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            return userPipe ? userPipe.transform(prop) : prop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "width", {
        get: function () {
            return this.column.width + 'px';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', (typeof (_a = typeof TableColumn !== 'undefined' && TableColumn) === 'function' && _a) || Object)
    ], DataTableBodyCell.prototype, "column", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "row", void 0);
    __decorate([
        _angular_core.HostBinding('style.width'), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "width", null);
    DataTableBodyCell = __decorate([
        _angular_core.Component({
            selector: 'datatable-body-cell',
            template: "\n    <div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.template\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.template\"\n        [value]=\"value\"\n        [row]=\"row\"\n        [column]=\"column\"\n        [templateWrapper]=\"column.template\">\n      </template>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], DataTableBodyCell);
    return DataTableBodyCell;
    var _a, _b;
}());

/**
 * Observes changes to an elements visibility.
 * https://medium.com/@amcdnl/javascript-s-new-intersectionobserver-cdce8a73bef8#.evn5twug3
 *
 * Example:
 *
 * 		var elm = document.getElementById("panda");
 * 	 	new VisibilityObserver(elm, function() {
 * 			alert('PAndas rock!');
 * 	  });
 *
 */
var VisibilityObserver = (function () {
    function VisibilityObserver(element, callback) {
        this.callback = callback;
        /*
        // this is not working...
        if(window.IntersectionObserver) {
          this.observer = new IntersectionObserver(
            this.processChanges.bind(this), { threshold: [0.5] });
    
          this.observer.observe(element);
        } else { this.runPolyfill(element); }
        */
        this.runPolyfill(element);
    }
    VisibilityObserver.prototype.runPolyfill = function (element) {
        var _this = this;
        var checkVisibility = function () {
            var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width && height) {
                if (_this.callback)
                    _this.callback();
            }
            else {
                setTimeout(function () { return checkVisibility(); }, 10);
            }
        };
        checkVisibility();
    };
    VisibilityObserver.prototype.isVisible = function (boundingClientRect, intersectionRect) {
        return ((intersectionRect.width * intersectionRect.height) /
            (boundingClientRect.width * boundingClientRect.height) >= 0.5);
    };
    VisibilityObserver.prototype.visibleTimerCallback = function (element, observer) {
        delete element.visibleTimeout;
        // Process any pending observations
        this.processChanges(observer.takeRecords());
        if ('isVisible' in element) {
            delete element.isVisible;
            if (this.callback)
                this.callback();
            observer.unobserve(element);
        }
    };
    VisibilityObserver.prototype.processChanges = function (changes) {
        var _this = this;
        changes.forEach(function (changeRecord) {
            var element = changeRecord.target;
            element.isVisible = _this.isVisible(changeRecord.boundingClientRect, changeRecord.intersectionRect);
            if ('isVisible' in element) {
                // Transitioned from hidden to visible
                element.visibleTimeout = setTimeout(_this.visibleTimerCallback.bind(_this), 1000, element, _this.observer);
            }
            else {
                // Transitioned from visible to hidden
                if ('visibleTimeout' in element) {
                    clearTimeout(element.visibleTimeout);
                    delete element.visibleTimeout;
                }
            }
        });
    };
    return VisibilityObserver;
}());

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(onVisibilityChange)="doSomething($event)">
 * 		</div>
 *
 */
var Visibility = (function () {
    function Visibility(element) {
        this.visible = false;
        this.onVisibilityChange = new _angular_core.EventEmitter();
        new VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
    }
    Visibility.prototype.visbilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        setTimeout(function () {
            _this.visible = true;
            _this.onVisibilityChange.emit(true);
        });
    };
    __decorate([
        _angular_core.HostBinding('class.visible'), 
        __metadata('design:type', Boolean)
    ], Visibility.prototype, "visible", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], Visibility.prototype, "onVisibilityChange", void 0);
    Visibility = __decorate([
        _angular_core.Directive({ selector: '[visibility-observer]' }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], Visibility);
    return Visibility;
    var _a, _b;
}());

var LongPress = (function () {
    function LongPress() {
        this.duration = 500;
        this.onLongPress = new _angular_core.EventEmitter();
        this.onLongPressing = new _angular_core.EventEmitter();
        this.onLongPressEnd = new _angular_core.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPress.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPress.prototype, "longPress", {
        get: function () { return this.longPressing; },
        enumerable: true,
        configurable: true
    });
    LongPress.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1)
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.longPressing = false;
        this.timeout = setTimeout(function () {
            _this.longPressing = true;
            _this.onLongPress.emit(event);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPress.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.longPressing) {
            var xThres = (event.clientX - this.mouseX) > 10;
            var yThres = (event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPress.prototype.loop = function (event) {
        var _this = this;
        if (this.longPressing) {
            this.timeout = setTimeout(function () {
                _this.onLongPressing.emit(event);
                _this.loop(event);
            }, 50);
        }
    };
    LongPress.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    };
    LongPress.prototype.onMouseUp = function () { this.endPress(); };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], LongPress.prototype, "duration", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], LongPress.prototype, "onLongPress", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _b) || Object)
    ], LongPress.prototype, "onLongPressing", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_c = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _c) || Object)
    ], LongPress.prototype, "onLongPressEnd", void 0);
    __decorate([
        _angular_core.HostBinding('class.press'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "press", null);
    __decorate([
        _angular_core.HostBinding('class.longpress'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "longPress", null);
    __decorate([
        _angular_core.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseDown", null);
    __decorate([
        _angular_core.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseMove", null);
    __decorate([
        _angular_core.HostListener('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseUp", null);
    LongPress = __decorate([
        _angular_core.Directive({ selector: '[long-press]' }), 
        __metadata('design:paramtypes', [])
    ], LongPress);
    return LongPress;
    var _a, _b, _c;
}());

var Resizeable = (function () {
    function Resizeable(element) {
        this.resizeEnabled = true;
        this.onResize = new _angular_core.EventEmitter();
        this.prevScreenX = 0;
        this.resizing = false;
        this.element = element.nativeElement;
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    Resizeable.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.onResize.emit(this.element.clientWidth);
        }
    };
    Resizeable.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = event.target.classList.contains('resize-handle');
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subscription = rxjs_Rx.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (e) { return _this.move(e); });
        }
    };
    Resizeable.prototype.move = function (event) {
        var movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
        var width = this.element.clientWidth;
        var newWidth = width + (movementX || 0);
        this.prevScreenX = event.screenX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], Resizeable.prototype, "resizeEnabled", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Resizeable.prototype, "minWidth", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Resizeable.prototype, "maxWidth", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], Resizeable.prototype, "onResize", void 0);
    __decorate([
        _angular_core.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Resizeable.prototype, "onMouseup", null);
    __decorate([
        _angular_core.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Resizeable.prototype, "onMousedown", null);
    Resizeable = __decorate([
        _angular_core.Directive({
            selector: '[resizeable]',
            host: {
                '[class.resizeable]': 'resizeEnabled'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], Resizeable);
    return Resizeable;
    var _a, _b;
}());

/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
var Draggable = (function () {
    function Draggable(element) {
        this.dragX = true;
        this.dragY = true;
        this.onDragStart = new _angular_core.EventEmitter();
        this.onDragging = new _angular_core.EventEmitter();
        this.onDragEnd = new _angular_core.EventEmitter();
        this.dragging = false;
        this.element = element.nativeElement;
    }
    Draggable.prototype.onMouseup = function (event) {
        this.dragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.onDragEnd.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    Draggable.prototype.onMousedown = function (event) {
        var _this = this;
        if (event.target.classList.contains('draggable')) {
            event.preventDefault();
            this.dragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            this.subscription = rxjs_Rx.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.onDragStart.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    Draggable.prototype.move = function (event, mouseDownPos) {
        if (!this.dragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        if (this.dragX || this.dragY) {
            this.element.classList.add('dragging');
            this.onDragging.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], Draggable.prototype, "model", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], Draggable.prototype, "dragX", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], Draggable.prototype, "dragY", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _b) || Object)
    ], Draggable.prototype, "onDragging", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_c = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _c) || Object)
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        _angular_core.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMouseup", null);
    __decorate([
        _angular_core.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousedown", null);
    Draggable = __decorate([
        _angular_core.Directive({ selector: '[draggable]' }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _d) || Object])
    ], Draggable);
    return Draggable;
    var _a, _b, _c, _d;
}());

var Orderable = (function () {
    function Orderable() {
        this.onReorder = new _angular_core.EventEmitter();
    }
    Orderable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.drags.forEach(function (d) {
            return d.onDragStart.subscribe(_this.onDragStart.bind(_this)) &&
                d.onDragEnd.subscribe(_this.onDragEnd.bind(_this));
        });
    };
    Orderable.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.drags.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            this.positions[dragger.model.prop] = {
                left: parseInt(elm.offsetLeft.toString(), 0),
                index: i++
            };
        }
    };
    Orderable.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model;
        var newPos = parseInt(element.offsetLeft.toString(), 0);
        var prevPos = this.positions[model.prop];
        var i = 0;
        for (var prop in this.positions) {
            var pos = this.positions[prop];
            var movedLeft = newPos < pos.left && prevPos.left > pos.left;
            var movedRight = newPos > pos.left && prevPos.left < pos.left;
            if (movedLeft || movedRight) {
                this.onReorder.emit({
                    prevIndex: prevPos.index,
                    newIndex: i,
                    model: model
                });
            }
            i++;
        }
        element.style.left = 'auto';
    };
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], Orderable.prototype, "onReorder", void 0);
    __decorate([
        _angular_core.ContentChildren(Draggable), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.QueryList !== 'undefined' && _angular_core.QueryList) === 'function' && _b) || Object)
    ], Orderable.prototype, "drags", void 0);
    Orderable = __decorate([
        _angular_core.Directive({ selector: '[orderable]' }), 
        __metadata('design:paramtypes', [])
    ], Orderable);
    return Orderable;
    var _a, _b;
}());

var TemplateWrapper = (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnChanges = function (changes) {
        if (changes['templateWrapper']) {
            if (this.embeddedViewRef) {
                this.embeddedViewRef.destroy();
            }
            this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateWrapper, {
                value: this.value,
                row: this.row,
                column: this.column,
                sort: this.sort
            });
        }
        if (this.embeddedViewRef) {
            this.embeddedViewRef.context.value = this.value;
            this.embeddedViewRef.context.row = this.row;
            this.embeddedViewRef.context.column = this.column;
            this.embeddedViewRef.context.sort = this.sort;
        }
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.TemplateRef !== 'undefined' && _angular_core.TemplateRef) === 'function' && _a) || Object)
    ], TemplateWrapper.prototype, "templateWrapper", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "value", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "row", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "column", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "sort", void 0);
    TemplateWrapper = __decorate([
        _angular_core.Directive({ selector: '[templateWrapper]' }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ViewContainerRef !== 'undefined' && _angular_core.ViewContainerRef) === 'function' && _b) || Object])
    ], TemplateWrapper);
    return TemplateWrapper;
    var _a, _b;
}());

var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    Angular2DataTableModule = __decorate([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule
            ],
            declarations: [
                Visibility,
                Draggable,
                Resizeable,
                Orderable,
                LongPress,
                TemplateWrapper,
                Scroller,
                DataTable,
                DataTableColumn,
                DataTableHeader,
                DataTableHeaderCell,
                DataTableBody,
                DataTableFooter,
                DataTablePager,
                ProgressBar,
                DataTableBodyRow,
                DataTableBodyCell
            ],
            providers: [
                StateService
            ],
            exports: [
                DataTable,
                DataTableColumn
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2DataTableModule);
    return Angular2DataTableModule;
}());

exports.TableOptions = TableOptions;
exports.TableColumn = TableColumn;
exports.Sort = Sort;
exports.Angular2DataTableModule = Angular2DataTableModule;
//# sourceMappingURL=angular2-data-table.cjs.js.map
