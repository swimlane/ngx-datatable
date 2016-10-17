/**
 * angular2-data-table v0.10.1 (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Rx')) :
    typeof define === 'function' && define.amd ? define('angular2-data-table', ['exports', '@angular/core', '@angular/common', 'rxjs/Rx'], factory) :
    (factory((global.angular2DataTable = global.angular2DataTable || {}),global.ng.core,global.ng.common,global.Rx));
}(this, (function (exports,_angular_core,_angular_common,rxjs_Rx) { 'use strict';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
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
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: columnTotalWidth(all)
    };
}
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} prop width to get
 */
function columnTotalWidth(columns, prop) {
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
function columnsTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var column = columns_2[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}

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

var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
})(Keys || (Keys = {}));

/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var c = columns_1[_i];
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
    var columnsWidth = columnsTotalWidth(allColumns);
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

(function (ColumnMode) {
    ColumnMode[ColumnMode["standard"] = 'standard'] = "standard";
    ColumnMode[ColumnMode["flex"] = 'flex'] = "flex";
    ColumnMode[ColumnMode["force"] = 'force'] = "force";
})(exports.ColumnMode || (exports.ColumnMode = {}));

(function (SortType) {
    SortType[SortType["single"] = 'single'] = "single";
    SortType[SortType["multi"] = 'multi'] = "multi";
})(exports.SortType || (exports.SortType = {}));

(function (SortDirection) {
    SortDirection[SortDirection["asc"] = 'asc'] = "asc";
    SortDirection[SortDirection["desc"] = 'desc'] = "desc";
})(exports.SortDirection || (exports.SortDirection = {}));

(function (SelectionType) {
    SelectionType[SelectionType["single"] = 'single'] = "single";
    SelectionType[SelectionType["multi"] = 'multi'] = "multi";
    SelectionType[SelectionType["multiShift"] = 'multiShift'] = "multiShift";
})(exports.SelectionType || (exports.SelectionType = {}));

(function (ClickType) {
    ClickType[ClickType["single"] = 'single'] = "single";
    ClickType[ClickType["double"] = 'double'] = "double";
})(exports.ClickType || (exports.ClickType = {}));

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
            var propA = deepValueGetter(a, prop);
            var propB = deepValueGetter(b, prop);
            var comparison = dir !== exports.SortDirection.desc ?
                orderByComparator(propA, propB) :
                -orderByComparator(propA, propB);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        // equal each other
        return 0;
    });
}

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
        // The detail row height is required especially when virtual scroll is enabled.
        this.detailRowHeight = 0;
        // flex
        // force
        // standard
        this.columnMode = exports.ColumnMode.standard;
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
        this.sortType = exports.SortType.single;
        // sorts
        this.sorts = [];
        Object.assign(this, props);
        this.validate();
    }
    TableOptions.prototype.validate = function () {
        if (this.scrollbarV === true && isNaN(this.rowHeight)) {
            throw new Error('Vertical scrolling and auto row height is not support!');
        }
    };
    return TableOptions;
}());

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
        // Maximum width of the column.
        this.maxWidth = undefined;
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
        this._width = 150;
        this._minWidth = 0;
        Object.assign(this, props);
        if (!this.prop && this.name) {
            this.prop = camelCase(this.name);
        }
        // for some reason these are not getting set
        if (props && props.templates) {
            this.headerTemplate = props.headerTemplate;
            this.cellTemplate = props.cellTemplate;
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
    Object.defineProperty(TableColumn.prototype, "minWidth", {
        // Minimum width of the column.
        get: function () {
            return this._minWidth;
        },
        set: function (value) {
            this._minWidth = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableColumn.prototype, "width", {
        // The width of the column; by default (in pixels).
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = +value;
        },
        enumerable: true,
        configurable: true
    });
    return TableColumn;
}());

var Sort = (function () {
    function Sort(props) {
        Object.assign(this, props);
    }
    return Sort;
}());

var DataTableColumn = (function () {
    function DataTableColumn() {
    }
    Object.defineProperty(DataTableColumn.prototype, "hasHeaderTemplate", {
        get: function () {
            // this is a tad nasty but can't think of a better way
            // to differate if the prop is header vs cell
            return this.templates.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumn.prototype, "headerTemplate", {
        get: function () {
            if (!this.hasHeaderTemplate)
                return undefined;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumn.prototype, "cellTemplate", {
        get: function () {
            if (this.hasHeaderTemplate)
                return this.templates.last;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "name", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "prop", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "isExpressive", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "frozenLeft", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "frozenRight", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "flexGrow", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "resizeable", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "comparator", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "pipe", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "sortable", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "draggable", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "canAutoResize", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "minWidth", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "width", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "maxWidth", void 0);
    __decorate([
        _angular_core.ContentChildren(_angular_core.TemplateRef), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.QueryList !== 'undefined' && _angular_core.QueryList) === 'function' && _a) || Object)
    ], DataTableColumn.prototype, "templates", void 0);
    DataTableColumn = __decorate([
        _angular_core.Directive({
            selector: 'datatable-column',
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumn);
    return DataTableColumn;
    var _a;
}());

/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var RowHeightCache = (function () {
    function RowHeightCache() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        this._treeArray = [];
    }
    /**
     * Clear the Tree array.
     */
    RowHeightCache.prototype.clearCache = function () {
        this._treeArray = [];
    };
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    RowHeightCache.prototype.initCache = function (rows, rowHeight, detailRowHeight) {
        var n = rows.length;
        this._treeArray = new Array(n);
        for (var i = 0; i < n; ++i) {
            this._treeArray[i] = 0;
        }
        for (var i = 0; i < n; ++i) {
            var currentRowHeight = rowHeight;
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            var row = rows[i];
            if (row && row.$$expanded === 1) {
                currentRowHeight += detailRowHeight;
            }
            this.update(i, currentRowHeight);
        }
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     *
     * @param scrollY - The scrollY position.
     * @returns {number} - Index representing the first row visible in the viewport
     */
    RowHeightCache.prototype.getRowIndex = function (scrollY) {
        if (scrollY === 0) {
            return 0;
        }
        else {
            return this._getRowIndex(scrollY);
        }
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     *
     *
     * @param atRowIndex Update the data at this index row in the grid.
     * @param byRowHeight Update by the rowHeight provided.
     */
    RowHeightCache.prototype.update = function (atRowIndex, byRowHeight) {
        if (this._treeArray.length === 0) {
            throw new Error("Update at index " + atRowIndex + " with value " + byRowHeight + " failed:\n        Row Height cache not initialized.");
        }
        var n = this._treeArray.length;
        atRowIndex |= 0;
        while (atRowIndex < n) {
            this._treeArray[atRowIndex] += byRowHeight;
            atRowIndex |= (atRowIndex + 1);
        }
    };
    /**
     * Range Sum query from 1 to the rowIndex
     *
     * @param atIndex The row index until which the total height needs to be obtained.
     * @returns {number} The total height from row 1 to the rowIndex.
     */
    RowHeightCache.prototype.query = function (atIndex) {
        if (this._treeArray.length === 0) {
            throw new Error("query at index " + atIndex + " failed: Fenwick tree array not initialized. ");
        }
        var sum = 0;
        atIndex |= 0;
        while (atIndex >= 0) {
            sum += this._treeArray[atIndex];
            atIndex = (atIndex & (atIndex + 1)) - 1;
        }
        return sum;
    };
    /**
     * Find the total height between 2 row indexes
     * @param atIndexA The row index from
     * @param atIndexB The row index to
     * @returns {number} total pixel height between 2 row indexes.
     */
    RowHeightCache.prototype.queryBetween = function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     *
     * @param sum - The scrollY position.
     * @returns {number} - Index representing the first row visible in the viewport
     */
    RowHeightCache.prototype._getRowIndex = function (sum) {
        if (this._treeArray.length === 0) {
            return 0;
        }
        var pos = -1;
        var dataLength = this._treeArray.length;
        // Get the highest bit for the block size.
        var highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        for (var blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
            var nextPos = pos + blockSize;
            if (nextPos < dataLength && sum >= this._treeArray[nextPos]) {
                sum -= this._treeArray[nextPos];
                pos = nextPos;
            }
        }
        return pos + 1;
    };
    return RowHeightCache;
}());

var StateService = (function () {
    function StateService() {
        this.rows = [];
        this.selected = [];
        /**
         * Cache the row heights for calculation during virtual scroll.
         * @type {RowHeightCache}
         */
        this.rowHeightsCache = new RowHeightCache();
        this.onSortChange = new _angular_core.EventEmitter();
        this.onSelectionChange = new _angular_core.EventEmitter();
        this.onRowsUpdate = new _angular_core.EventEmitter();
        this.onPageChange = new _angular_core.EventEmitter();
        /**
         * Event emitted whenever there is a change in row expansion state.
         * @type {EventEmitter}
         */
        this.onExpandChange = new _angular_core.EventEmitter();
        this.scrollbarWidth = scrollbarWidth();
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
            return columnsByPin(this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "columnGroupWidths", {
        get: function () {
            return columnGroupWidths(this.columnsByPin, this.options.columns);
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
        var dir = nextSortDir(this.options.sortType, curDir);
        if (dir === undefined) {
            this.options.sorts.splice(idx, 1);
        }
        else if (curSort) {
            this.options.sorts[idx].dir = dir;
        }
        else {
            if (this.options.sortType === exports.SortType.single) {
                this.options.sorts.splice(0, this.options.sorts.length);
            }
            this.options.sorts.push(new Sort({ dir: dir, prop: column.prop }));
        }
        if (!column.comparator) {
            this.setRows(sortRows(this.rows, this.options.sorts));
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
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());

var DatatableRowDetailTemplate = (function () {
    function DatatableRowDetailTemplate() {
    }
    Object.defineProperty(DatatableRowDetailTemplate.prototype, "rowDetailTemplate", {
        get: function () {
            return this.template;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.ContentChild(_angular_core.TemplateRef), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.TemplateRef !== 'undefined' && _angular_core.TemplateRef) === 'function' && _a) || Object)
    ], DatatableRowDetailTemplate.prototype, "template", void 0);
    DatatableRowDetailTemplate = __decorate([
        _angular_core.Directive({
            selector: 'datatable-row-detail-template'
        }), 
        __metadata('design:paramtypes', [])
    ], DatatableRowDetailTemplate);
    return DatatableRowDetailTemplate;
    var _a;
}());

var DataTable = (function () {
    function DataTable(state, renderer, element, differs) {
        this.state = state;
        this.onPageChange = new _angular_core.EventEmitter();
        this.onRowsUpdate = new _angular_core.EventEmitter();
        this.onRowClick = new _angular_core.EventEmitter();
        this.onSelectionChange = new _angular_core.EventEmitter();
        this.onColumnChange = new _angular_core.EventEmitter();
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable', true);
        this.rowDiffer = differs.find({}).create(null);
        this.colDiffer = differs.find({}).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSubscriber = this.state.onPageChange.subscribe(function (action) {
            _this.onPageChange.emit({
                page: action.value,
                offset: _this.state.options.offset,
                limit: _this.state.pageSize,
                count: _this.state.rowCount
            });
        });
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.adjustSizes();
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.rowDetailTemplateChild) {
            this.state.options.rowDetailTemplate = this.rowDetailTemplateChild.rowDetailTemplate;
        }
        this.adjustColumns();
        if (this.columns.length) {
            // changing the columns without a timeout
            // causes a interesting timing bug
            setTimeout(function () {
                // this translates the expressive columns
                // that are defined into the markup to
                // column objects
                for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.options.columns.push(new TableColumn(col));
                }
            });
        }
    };
    DataTable.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('options')) {
            this.state.setOptions(changes.options.currentValue);
        }
        if (changes.hasOwnProperty('rows')) {
            this.state.setRows(changes.rows.currentValue);
        }
        if (changes.hasOwnProperty('selected')) {
            this.state.setSelected(changes.selected.currentValue);
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.state.setRows(this.rows);
            this.onRowsUpdate.emit(this.rows);
        }
        this.checkColumnChanges();
    };
    DataTable.prototype.ngOnDestroy = function () {
        this.pageSubscriber.unsubscribe();
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
        this.state.innerWidth = Math.floor(width);
        if (this.options.scrollbarV) {
            if (this.options.headerHeight)
                height = height - this.options.headerHeight;
            if (this.options.footerHeight)
                height = height - this.options.footerHeight;
            this.state.bodyHeight = height;
        }
        this.adjustColumns();
    };
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DataTable.prototype.toggleExpandRow = function (row) {
        // Should we write a guard here??
        this.state.toggleRowExpansion(row);
    };
    /**
     * API method to expand all the rows.
     */
    DataTable.prototype.expandAllRows = function () {
        this.state.toggleAllRows(true);
    };
    /**
     * API method to collapse all the rows.
     */
    DataTable.prototype.collapseAllRows = function () {
        this.state.toggleAllRows(false);
    };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.options.columns)
            return;
        var width = this.state.innerWidth;
        if (this.options.scrollbarV) {
            width = width - this.state.scrollbarWidth;
        }
        if (this.options.columnMode === exports.ColumnMode.force) {
            forceFillColumnWidths(this.options.columns, width, forceIdx);
        }
        else if (this.options.columnMode === exports.ColumnMode.flex) {
            adjustColumnWidths(this.options.columns, width);
        }
    };
    DataTable.prototype.onRowSelect = function (event) {
        this.state.setSelected(event);
        this.onSelectionChange.emit(event);
    };
    DataTable.prototype.resize = function () {
        this.adjustSizes();
    };
    Object.defineProperty(DataTable.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.options.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.options.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
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
        _angular_core.ContentChild(DatatableRowDetailTemplate), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "rowDetailTemplateChild", void 0);
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
            providers: [StateService],
            template: "\n    <div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header\n        *ngIf=\"state.options.headerHeight\"\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </datatable-header>\n      <datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </datatable-body>\n      <datatable-footer\n         *ngIf=\"state.options.footerHeight\"\n        (onPageChange)=\"state.setPage($event)\">\n      </datatable-footer>\n    </div>\n  "
        }),
        __param(0, _angular_core.Host()), 
        __metadata('design:paramtypes', [(typeof (_h = typeof StateService !== 'undefined' && StateService) === 'function' && _h) || Object, (typeof (_j = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _j) || Object, (typeof (_k = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _k) || Object, (typeof (_l = typeof _angular_core.KeyValueDiffers !== 'undefined' && _angular_core.KeyValueDiffers) === 'function' && _l) || Object])
    ], DataTable);
    return DataTable;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

var DataTableHeader = (function () {
    function DataTableHeader(state, element, renderer) {
        this.state = state;
        this.onColumnChange = new _angular_core.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-header', true);
    }
    Object.defineProperty(DataTableHeader.prototype, "headerWidth", {
        get: function () {
            if (this.state.options.scrollbarH)
                return this.state.innerWidth + 'px';
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeader.prototype, "headerHeight", {
        get: function () {
            var height = this.state.options.headerHeight;
            if (height !== 'auto')
                return height + "px";
            return height;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeader.prototype.trackColBy = function (index, obj) {
        return obj.$$id;
    };
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
        this.state.options.columns.splice(prevIndex, 1);
        this.state.options.columns.splice(newIndex, 0, model);
        this.onColumnChange.emit({
            type: 'reorder',
            value: model
        });
    };
    DataTableHeader.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths;
        var offsetX = this.state.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.innerWidth;
            var offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], DataTableHeader.prototype, "onColumnChange", void 0);
    DataTableHeader = __decorate([
        _angular_core.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      [style.width]=\"state.columnGroupWidths.total + 'px'\"\n      class=\"datatable-header-inner\"\n      orderable\n      (onReorder)=\"columnReordered($event)\">\n      <div\n        class=\"datatable-row-left\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        *ngIf=\"state.columnsByPin.left.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.left; trackBy: trackColBy\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [column]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin.center.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.center; trackBy: trackColBy\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [column]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        *ngIf=\"state.columnsByPin.right.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.right; trackBy: trackColBy\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [column]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            host: {
                '[style.width]': 'headerWidth',
                '[style.height]': 'headerHeight'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof StateService !== 'undefined' && StateService) === 'function' && _b) || Object, (typeof (_c = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _d) || Object])
    ], DataTableHeader);
    return DataTableHeader;
    var _a, _b, _c, _d;
}());

var DataTableHeaderCell = (function () {
    function DataTableHeaderCell(element, state, renderer) {
        this.element = element;
        this.state = state;
        this.onColumnChange = new _angular_core.EventEmitter();
        this.sort = this.onSort.bind(this);
    }
    Object.defineProperty(DataTableHeaderCell.prototype, "width", {
        get: function () { return this.column.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "minWidth", {
        get: function () { return this.column.minWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "maxWidth", {
        get: function () { return this.column.maxWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "height", {
        get: function () { return this.state.options.headerHeight; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "colTitle", {
        get: function () { return this.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "cssClasses", {
        get: function () {
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "sortDir", {
        get: function () {
            var _this = this;
            var sort = this.state.options.sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCell.prototype, "name", {
        get: function () {
            return this.column.name || this.column.prop;
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
        if (this.column.sortable) {
            this.state.nextSort(this.column);
            this.onColumnChange.emit({
                type: 'sort',
                value: this.column
            });
        }
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', (typeof (_a = typeof TableColumn !== 'undefined' && TableColumn) === 'function' && _a) || Object)
    ], DataTableHeaderCell.prototype, "column", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_b = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _b) || Object)
    ], DataTableHeaderCell.prototype, "onColumnChange", void 0);
    __decorate([
        _angular_core.HostBinding('style.width.px'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCell.prototype, "width", null);
    __decorate([
        _angular_core.HostBinding('style.minWidth.px'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCell.prototype, "minWidth", null);
    __decorate([
        _angular_core.HostBinding('style.maxWidth.px'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCell.prototype, "maxWidth", null);
    __decorate([
        _angular_core.HostBinding('style.height.px'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCell.prototype, "height", null);
    __decorate([
        _angular_core.HostBinding('attr.title'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCell.prototype, "colTitle", null);
    __decorate([
        _angular_core.HostBinding('class'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCell.prototype, "cssClasses", null);
    DataTableHeaderCell = __decorate([
        _angular_core.Component({
            selector: 'datatable-header-cell',
            template: "\n    <div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        *ngIf=\"!column.headerTemplate\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"name\">\n      </span>\n      <template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ column: column, sort: sort }\">\n      </template>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses()\">\n      </span>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof StateService !== 'undefined' && StateService) === 'function' && _d) || Object, (typeof (_e = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _e) || Object])
    ], DataTableHeaderCell);
    return DataTableHeaderCell;
    var _a, _b, _c, _d, _e;
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
    Draggable.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
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

var Resizeable = (function () {
    function Resizeable(element) {
        this.resizeEnabled = true;
        this.onResize = new _angular_core.EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    Resizeable.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Resizeable.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
            this.onResize.emit(this.element.clientWidth);
        }
    };
    Resizeable.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = event.target.classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subscription = rxjs_Rx.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
        }
    };
    Resizeable.prototype.move = function (event, initialWidth, mouseDownScreenX) {
        var movementX = event.screenX - mouseDownScreenX;
        var newWidth = initialWidth + movementX;
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

var Scroller = (function () {
    function Scroller(element) {
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.onScroll = new _angular_core.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
        this.element.classList.add('datatable-scroll');
    }
    Scroller.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    Scroller.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement.removeEventListener('scroll');
        }
    };
    Scroller.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
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
    ], Scroller.prototype, "limit", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollWidth", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], Scroller.prototype, "scrollbarV", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], Scroller.prototype, "scrollbarH", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], Scroller.prototype, "onScroll", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollHeight", void 0);
    Scroller = __decorate([
        _angular_core.Directive({
            selector: '[scroller]',
            host: {
                '[style.height]': 'scrollHeight + "px"',
                '[style.width]': 'scrollWidth + "px"'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object])
    ], Scroller);
    return Scroller;
    var _a, _b;
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

var DataTableBody = (function () {
    function DataTableBody(state, element, renderer) {
        this.state = state;
        this.onRowClick = new _angular_core.EventEmitter();
        this.onRowSelect = new _angular_core.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-body', true);
    }
    Object.defineProperty(DataTableBody.prototype, "selectEnabled", {
        get: function () {
            return !!this.state.options.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyHeight", {
        get: function () {
            if (this.state.options.scrollbarV) {
                return this.state.bodyHeight + 'px';
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
            if (this.state.options.scrollbarH) {
                return this.state.innerWidth + 'px';
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
        this.rows = this.state.rows.slice();
        this.updateRows();
        this.sub = this.state.onPageChange.subscribe(function (action) {
            _this.updateRows();
            _this.hideIndicator();
            if (_this.state.options.scrollbarV && action.type === 'pager-event') {
                // First get the row Index that we need to move to.
                var rowIndex = action.limit * action.offset;
                // const offset = (this.state.options.rowHeight * action.limit) * action.offset;
                _this.scroller.setOffset(_this.state.rowHeightsCache.query(rowIndex - 1));
            }
        });
        this.sub.add(this.state.onExpandChange.subscribe(function (expandedState) {
            // If there was more than one row expanded then there was a mass change
            // in the data set hence adjust the scroll position.
            if (expandedState.rows.length > 1) {
                // -1 is added to the scrollOffset as we want to move the scroller to the offset position
                // where the entire row is visible. What about the small offset e.g. if the scroll
                // position is between rows?  Do we need to take care of it?
                var scrollOffset_1 = _this.state.rowHeightsCache.query(expandedState.currentIndex);
                // Set the offset only after the scroll bar has been updated on the screen.
                setTimeout(function () { return _this.scroller.setOffset(scrollOffset_1); });
            }
        }));
        this.sub.add(this.state.onRowsUpdate.subscribe(function (rows) {
            _this.updateRows();
            _this.hideIndicator();
        }));
        this.sub.add(this.state.onSortChange.subscribe(function () {
            _this.scroller.setOffset(0);
        }));
    };
    DataTableBody.prototype.trackRowBy = function (index, obj) {
        return obj.$$index;
    };
    DataTableBody.prototype.onBodyScroll = function (props) {
        this.state.offsetY = props.scrollYPos;
        this.state.offsetX = props.scrollXPos;
        this.updatePage(props.direction);
        this.updateRows();
    };
    DataTableBody.prototype.updatePage = function (direction) {
        var idxs = this.state.indexes;
        var page = idxs.first / this.state.pageSize;
        if (direction === 'up') {
            page = Math.floor(page);
        }
        else if (direction === 'down') {
            page = Math.ceil(page);
        }
        if (direction !== undefined && !isNaN(page)) {
            // pages are offset + 1 ;)
            this.state.setPage({
                type: 'body-event',
                value: page + 1
            });
        }
    };
    DataTableBody.prototype.updateRows = function (refresh) {
        var idxs = this.state.indexes;
        var idx = 0;
        var rowIndex = idxs.first;
        var endSpliceIdx = refresh ? this.state.rowCount : idxs.last - idxs.first;
        this.rows = this.rows.slice(0, endSpliceIdx);
        while (rowIndex < idxs.last && rowIndex < this.state.rowCount) {
            var row = this.state.rows[rowIndex];
            if (row) {
                row.$$index = rowIndex;
                this.rows[idx] = row;
            }
            idx++;
            rowIndex++;
        }
    };
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param row  the row for which the height need to be calculated.
     * @returns {number}  height of the row.
     */
    DataTableBody.prototype.getRowHeight = function (row) {
        // Adding detail row height if its expanded.
        return this.state.options.rowHeight +
            (row.$$expanded === 1 ? this.state.options.detailRowHeight : 0);
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
    DataTableBody.prototype.getRowsStyles = function (row) {
        var rowHeight = this.getRowHeight(row);
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.state.options.scrollbarV) {
            var idx = row ? row.$$index : 0;
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.state.rowHeightsCache.query(idx - 1);
            translateXY(styles, 0, pos);
        }
        return styles;
    };
    DataTableBody.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.state.options.loadingIndicator = false; }, 500);
    };
    DataTableBody.prototype.rowClicked = function (event, index, row) {
        var clickType = event.type === 'dblclick' ? exports.ClickType.double : exports.ClickType.single;
        this.onRowClick.emit({ type: clickType, event: event, row: row });
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
        var multiShift = this.state.options.selectionType === exports.SelectionType.multiShift;
        var multiClick = this.state.options.selectionType === exports.SelectionType.multi;
        var selections = [];
        if (multiShift || multiClick) {
            if (multiShift && event.shiftKey) {
                var selected = this.state.selected.slice();
                selections = selectRowsBetween(selected, this.rows, index, this.prevIndex);
            }
            else if (multiShift && !event.shiftKey) {
                selections.push(row);
            }
            else {
                var selected = this.state.selected.slice();
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
            template: "\n    <div>\n      <datatable-progress\n        *ngIf=\"state.options.loadingIndicator\">\n      </datatable-progress>\n      <div\n        scroller\n        (onScroll)=\"onBodyScroll($event)\"\n        *ngIf=\"state.rows.length\"\n        [rowHeight]=\"state.options.rowHeight\"\n        [scrollbarV]=\"state.options.scrollbarV\"\n        [scrollbarH]=\"state.options.scrollbarH\"\n        [count]=\"state.rowCount\"\n        [scrollHeight]=\"state.scrollHeight\"\n        [limit]=\"state.options.limit\"\n        [scrollWidth]=\"state.columnGroupWidths.total\">\n        <datatable-row-wrapper \n          *ngFor=\"let row of rows; let i = index; trackBy: trackRowBy\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [style.height]=\"getRowHeight(row) + 'px'\"\n          [row]=\"row\">\n          <datatable-body-row\n            [attr.tabindex]=\"i\"\n            [style.height]=\"state.options.rowHeight +  'px'\"\n            (click)=\"rowClicked($event, i, row)\"\n            (dblclick)=\"rowClicked($event, i, row)\"\n            (keydown)=\"rowKeydown($event, i, row)\"\n            [row]=\"row\"\n            [class.datatable-row-even]=\"row.$$index % 2 === 0\"\n            [class.datatable-row-odd]=\"row.$$index % 2 !== 0\">\n          </datatable-body-row>\n        </datatable-row-wrapper>\n      </div>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"state.options.emptyMessage\">\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof StateService !== 'undefined' && StateService) === 'function' && _d) || Object, (typeof (_e = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _e) || Object, (typeof (_f = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _f) || Object])
    ], DataTableBody);
    return DataTableBody;
    var _a, _b, _c, _d, _e, _f;
}());

var DataTableBodyCell = (function () {
    function DataTableBodyCell(state) {
        this.state = state;
    }
    Object.defineProperty(DataTableBodyCell.prototype, "cssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "height", {
        get: function () {
            var height = this.state.options.rowHeight;
            if (isNaN(height))
                return height;
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "sortDir", {
        get: function () {
            var _this = this;
            var sort = this.state.options.sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        },
        enumerable: true,
        configurable: true
    });
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
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', (typeof (_a = typeof TableColumn !== 'undefined' && TableColumn) === 'function' && _a) || Object)
    ], DataTableBodyCell.prototype, "column", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "row", void 0);
    __decorate([
        _angular_core.HostBinding('class'), 
        __metadata('design:type', String)
    ], DataTableBodyCell.prototype, "cssClasses", null);
    __decorate([
        _angular_core.HostBinding('style.width.px'), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "width", null);
    __decorate([
        _angular_core.HostBinding('style.height'), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "height", null);
    DataTableBodyCell = __decorate([
        _angular_core.Component({
            selector: 'datatable-body-cell',
            template: "\n    <div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{ value: value, row: row, column: column }\">\n      </template>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof StateService !== 'undefined' && StateService) === 'function' && _b) || Object])
    ], DataTableBodyCell);
    return DataTableBodyCell;
    var _a, _b;
}());

var DataTableBodyRow = (function () {
    function DataTableBodyRow(state, element, renderer) {
        this.state = state;
        renderer.setElementClass(element.nativeElement, 'datatable-body-row', true);
    }
    Object.defineProperty(DataTableBodyRow.prototype, "isSelected", {
        get: function () {
            return this.state.selected &&
                this.state.selected.indexOf(this.row) > -1;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRow.prototype.trackColBy = function (index, obj) {
        return obj.$$id;
    };
    DataTableBodyRow.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths;
        var offsetX = this.state.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.innerWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.state.scrollbarWidth) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
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
            template: "\n    <div>\n      <div\n        class=\"datatable-row-left datatable-row-group\"\n        *ngIf=\"state.columnsByPin.left.length\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        [style.width]=\"state.columnGroupWidths.left + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.left; trackBy: trackColBy\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-center datatable-row-group\"\n        [style.width]=\"state.columnGroupWidths.center + 'px'\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin.center.length\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.center; trackBy: trackColBy\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-right datatable-row-group\"\n        *ngIf=\"state.columnsByPin.right.length\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        [style.width]=\"state.columnGroupWidths.right + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.right; trackBy: trackColBy\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof StateService !== 'undefined' && StateService) === 'function' && _a) || Object, (typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _c) || Object])
    ], DataTableBodyRow);
    return DataTableBodyRow;
    var _a, _b, _c;
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

var DataTableFooter = (function () {
    function DataTableFooter(element, state, renderer) {
        this.state = state;
        this.onPageChange = new _angular_core.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-footer', true);
    }
    Object.defineProperty(DataTableFooter.prototype, "visible", {
        get: function () {
            return (this.state.rowCount / this.state.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooter.prototype, "curPage", {
        get: function () {
            return this.state.options.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.EventEmitter !== 'undefined' && _angular_core.EventEmitter) === 'function' && _a) || Object)
    ], DataTableFooter.prototype, "onPageChange", void 0);
    DataTableFooter = __decorate([
        _angular_core.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      [style.height]=\"state.options.footerHeight\">\n      <div class=\"page-count\">{{state.rowCount}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.rowCount\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof StateService !== 'undefined' && StateService) === 'function' && _c) || Object, (typeof (_d = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _d) || Object])
    ], DataTableFooter);
    return DataTableFooter;
    var _a, _b, _c, _d;
}());

var DataTablePager = (function () {
    function DataTablePager(element, renderer) {
        this.size = 0;
        this.onPaged = new _angular_core.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-pager', true);
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
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\"\n          class=\"icon-prev\">\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\"\n          class=\"icon-left\">\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\"\n          class=\"icon-right\">\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\"\n          class=\"icon-skip\">\n        </a>\n      </li>\n    </ul>\n  ",
            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _c) || Object])
    ], DataTablePager);
    return DataTablePager;
    var _a, _b, _c;
}());

var DataTableRowWrapper = (function () {
    function DataTableRowWrapper(element, state, renderer) {
        this.element = element;
        this.state = state;
        renderer.setElementClass(this.element.nativeElement, 'datatable-row-wrapper', true);
    }
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapper.prototype, "row", void 0);
    DataTableRowWrapper = __decorate([
        _angular_core.Component({
            selector: 'datatable-row-wrapper',
            template: "\n        <ng-content></ng-content>\n        <div *ngIf=\"row.$$expanded === 1 && state.options.rowDetailTemplate\"\n              [style.height]=\"state.options.detailRowHeight +  'px'\" \n              class=\"datatable-row-detail\">\n          <template\n            [ngTemplateOutlet]=\"state.options.rowDetailTemplate\"\n            [ngOutletContext]=\"{ row: row}\">\n          </template>\n        </div>\n    ",
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof StateService !== 'undefined' && StateService) === 'function' && _b) || Object, (typeof (_c = typeof _angular_core.Renderer !== 'undefined' && _angular_core.Renderer) === 'function' && _c) || Object])
    ], DataTableRowWrapper);
    return DataTableRowWrapper;
    var _a, _b, _c;
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
                DataTableRowWrapper,
                DatatableRowDetailTemplate,
                DataTableBodyCell
            ],
            exports: [
                DataTable,
                DatatableRowDetailTemplate,
                DataTableColumn
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2DataTableModule);
    return Angular2DataTableModule;
}());

exports.Angular2DataTableModule = Angular2DataTableModule;
exports.TableOptions = TableOptions;
exports.TableColumn = TableColumn;
exports.Sort = Sort;
exports.DataTable = DataTable;
exports.DataTableColumn = DataTableColumn;
exports.DataTableHeader = DataTableHeader;
exports.DataTableHeaderCell = DataTableHeaderCell;
exports.DataTableBody = DataTableBody;
exports.DataTableBodyCell = DataTableBodyCell;
exports.DataTableBodyRow = DataTableBodyRow;
exports.ProgressBar = ProgressBar;
exports.DataTableFooter = DataTableFooter;
exports.DataTablePager = DataTablePager;
exports.DataTableRowWrapper = DataTableRowWrapper;
exports.DatatableRowDetailTemplate = DatatableRowDetailTemplate;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
