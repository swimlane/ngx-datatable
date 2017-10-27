import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, Input, KeyValueDiffers, NgModule, NgZone, Output, QueryList, Renderer, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/fromEvent';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';

var ColumnMode;
(function (ColumnMode) {
    ColumnMode["standard"] = "standard";
    ColumnMode["flex"] = "flex";
    ColumnMode["force"] = "force";
})(ColumnMode || (ColumnMode = {}));

var SortType;
(function (SortType) {
    SortType["single"] = "single";
    SortType["multi"] = "multi";
})(SortType || (SortType = {}));

var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "asc";
    SortDirection["desc"] = "desc";
})(SortDirection || (SortDirection = {}));

var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));

var ClickType;
(function (ClickType) {
    ClickType["single"] = "single";
    ClickType["double"] = "double";
})(ClickType || (ClickType = {}));

var ContextmenuType;
(function (ContextmenuType) {
    ContextmenuType["header"] = "header";
    ContextmenuType["body"] = "body";
})(ContextmenuType || (ContextmenuType = {}));

/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}

/**
 * Returns the columns by pin.
 */
function columnsByPin(cols) {
    const ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (const col of cols) {
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
 */
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: Math.floor(columnTotalWidth(all))
    };
}
/**
 * Calculates the total width of all columns and their groups
 */
function columnTotalWidth(columns, prop) {
    let totalWidth = 0;
    if (columns) {
        for (const c of columns) {
            const has = prop && c[prop];
            const width = has ? c[prop] : c.width;
            totalWidth = totalWidth + parseFloat(width);
        }
    }
    return totalWidth;
}
/**
 * Calculates the total width of all columns and their groups
 */
function columnsTotalWidth(columns, prop) {
    let totalWidth = 0;
    for (const column of columns) {
        const has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
function columnsByPinArr(val) {
    const colsByPinArr = [];
    const colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}
function allColumnsByPinArr(val) {
    const colsByPinArr = [];
    const colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}

// maybe rename this file to prop-getters.ts
/**
 * Always returns the empty string ''
 * @returns {string}
 */
function emptyStringGetter() {
    return '';
}
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
function getterForProp(prop) {
    if (prop == null)
        return emptyStringGetter;
    if (typeof prop === 'number') {
        return numericIndexGetter;
    }
    else {
        // deep or simple
        if (prop.indexOf('.') !== -1) {
            return deepValueGetter;
        }
        else {
            return shallowValueGetter;
        }
    }
}
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
function numericIndexGetter(row, index) {
    if (row == null)
        return '';
    // mimic behavior of deepValueGetter
    if (!row || index == null)
        return row;
    const value = row[index];
    if (value == null)
        return '';
    return value;
}
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {any}
 */
function shallowValueGetter(obj, fieldName) {
    if (obj == null)
        return '';
    if (!obj || !fieldName)
        return obj;
    const value = obj[fieldName];
    if (value == null)
        return '';
    return value;
}
/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (obj == null)
        return '';
    if (!obj || !path)
        return obj;
    // check if path matches a root-level field
    // { "a.b.c": 123 }
    let current = obj[path];
    if (current !== undefined)
        return current;
    current = obj;
    const split = path.split('.');
    if (split.length) {
        for (let i = 0; i < split.length; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null)
                return '';
        }
    }
    return current;
}

/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
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
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 */
function deCamelCase(str) {
    return str
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase());
}

var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
})(Keys || (Keys = {}));

/**
 * Calculates the Total Flex Grow
 */
function getTotalFlexGrow(columns) {
    let totalFlexGrow = 0;
    for (const c of columns) {
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    const columnsWidth = columnsTotalWidth(allColumns);
    const totalFlexGrow = getTotalFlexGrow(allColumns);
    const colsByGroup = columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (const attr in colsByGroup) {
        for (const column of colsByGroup[attr]) {
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow;
            }
            else {
                column.width = 0;
            }
        }
    }
    const hasMinWidth = {};
    let remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        const widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (const attr in colsByGroup) {
            for (const column of colsByGroup[attr]) {
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    const newWidth = column.width + column.flexGrow * widthPerFlexPoint;
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
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth = 300) {
    const columnsToResize = allColumns
        .slice(startIdx + 1, allColumns.length)
        .filter((c) => {
        return c.canAutoResize !== false;
    });
    for (const column of columnsToResize) {
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
    }
    let additionWidthPerColumn = 0;
    let exceedsWindow = false;
    let contentWidth = getContentWidth(allColumns, defaultColWidth);
    let remainingWidth = expectedWidth - contentWidth;
    const columnsProcessed = [];
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        for (const column of columnsToResize) {
            if (exceedsWindow && allowBleed) {
                column.width = column.$$oldWidth || column.width || defaultColWidth;
            }
            else {
                const newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                if (column.minWidth && newSize < column.minWidth) {
                    column.width = column.minWidth;
                    columnsProcessed.push(column);
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                    columnsProcessed.push(column);
                }
                else {
                    column.width = newSize;
                }
            }
            column.width = Math.max(0, column.width);
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > 0 && columnsToResize.length !== 0);
}
/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    for (const column of columnsProcessed) {
        const index = columnsToResize.indexOf(column);
        columnsToResize.splice(index, 1);
    }
}
/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns, defaultColWidth = 300) {
    let contentWidth = 0;
    for (const column of allColumns) {
        contentWidth += (column.width || defaultColWidth);
    }
    return contentWidth;
}

const cache = {};
const testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
const prefix = function () {
    const styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    const pre = typeof styles !== 'undefined'
        ? (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1] : undefined;
    const dom = typeof pre !== 'undefined' ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom ? {
        dom,
        lowercase: pre,
        css: `-${pre}-`,
        js: pre[0].toUpperCase() + pre.substr(1)
    } : undefined;
}();
function getVendorPrefixedName(property) {
    const name = camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}

function selectRows(selected, row, comparefn) {
    const selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    const reverse = index < prevIndex;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const greater = i >= prevIndex && i <= index;
        const lesser = i <= prevIndex && i >= index;
        let range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}

// browser detection and prefixing tools
const transform = typeof window !== 'undefined' ? getVendorPrefixedName('transform') : undefined;
const backfaceVisibility = typeof window !== 'undefined' ? getVendorPrefixedName('backfaceVisibility') : undefined;
const hasCSSTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('transform') : undefined;
const hasCSS3DTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('perspective') : undefined;
const ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
const isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (typeof transform !== 'undefined' && hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camelCase(transform)] = `translate(${x}px, ${y}px)`;
        }
    }
    else {
        styles.top = `${y}px`;
        styles.left = `${x}px`;
    }
}

/**
 * Throttle a function
 */
function throttle(func, wait, options) {
    options = options || {};
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        const now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}

/**
 * Gets the next sort direction
 */
function nextSortDir(sortType, current) {
    if (sortType === SortType.single) {
        if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else {
            return SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return SortDirection.asc;
        }
        else if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else if (current === SortDirection.desc) {
            return undefined;
        }
    }
}
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
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
 */
function sortRows(rows, columns, dirs) {
    if (!rows)
        return [];
    if (!dirs || !dirs.length || !columns)
        return [...rows];
    const temp = [...rows];
    const cols = columns.reduce((obj, col) => {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    const cachedDirs = dirs.map(dir => {
        const prop = dir.prop;
        return {
            prop,
            dir: dir.dir,
            valueGetter: getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    });
    return temp.sort(function (a, b) {
        for (const cachedDir of cachedDirs) {
            const { prop, valueGetter } = cachedDir;
            const propA = valueGetter(a, prop);
            const propB = valueGetter(b, prop);
            const comparison = cachedDir.dir !== SortDirection.desc ?
                cachedDir.compareFn(propA, propB) :
                -cachedDir.compareFn(propA, propB);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        // equal each other
        return 0;
    });
}

/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
class RowHeightCache {
    constructor() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        this.treeArray = [];
    }
    /**
     * Clear the Tree array.
     */
    clearCache() {
        this.treeArray = [];
    }
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    initCache(details) {
        const { rows, rowHeight, detailRowHeight, externalVirtual, rowCount, rowIndexes, rowExpansions } = details;
        const isFn = typeof rowHeight === 'function';
        const isDetailFn = typeof detailRowHeight === 'function';
        if (!isFn && isNaN(rowHeight)) {
            throw new Error(`Row Height cache initialization failed. Please ensure that 'rowHeight' is a
        valid number or function value: (${rowHeight}) when 'scrollbarV' is enabled.`);
        }
        // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
        if (!isDetailFn && isNaN(detailRowHeight)) {
            throw new Error(`Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a
        valid number or function value: (${detailRowHeight}) when 'scrollbarV' is enabled.`);
        }
        const n = externalVirtual ? rowCount : rows.length;
        this.treeArray = new Array(n);
        for (let i = 0; i < n; ++i) {
            this.treeArray[i] = 0;
        }
        for (let i = 0; i < n; ++i) {
            const row = rows[i];
            let currentRowHeight = rowHeight;
            if (isFn) {
                currentRowHeight = rowHeight(row);
            }
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            const expanded = rowExpansions.get(row);
            if (row && expanded === 1) {
                if (isDetailFn) {
                    const index = rowIndexes.get(row);
                    currentRowHeight += detailRowHeight(row, index);
                }
                else {
                    currentRowHeight += detailRowHeight;
                }
            }
            this.update(i, currentRowHeight);
        }
    }
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    getRowIndex(scrollY) {
        if (scrollY === 0)
            return 0;
        return this.calcRowIndex(scrollY);
    }
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     */
    update(atRowIndex, byRowHeight) {
        if (!this.treeArray.length) {
            throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
        Row Height cache not initialized.`);
        }
        const n = this.treeArray.length;
        atRowIndex |= 0;
        while (atRowIndex < n) {
            this.treeArray[atRowIndex] += byRowHeight;
            atRowIndex |= (atRowIndex + 1);
        }
    }
    /**
     * Range Sum query from 1 to the rowIndex
     */
    query(atIndex) {
        if (!this.treeArray.length) {
            throw new Error(`query at index ${atIndex} failed: Fenwick tree array not initialized.`);
        }
        let sum = 0;
        atIndex |= 0;
        while (atIndex >= 0) {
            sum += this.treeArray[atIndex];
            atIndex = (atIndex & (atIndex + 1)) - 1;
        }
        return sum;
    }
    /**
     * Find the total height between 2 row indexes
     */
    queryBetween(atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    }
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     */
    calcRowIndex(sum) {
        if (!this.treeArray.length)
            return 0;
        let pos = -1;
        const dataLength = this.treeArray.length;
        // Get the highest bit for the block size.
        const highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        for (let blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
            const nextPos = pos + blockSize;
            if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
                sum -= this.treeArray[nextPos];
                pos = nextPos;
            }
        }
        return pos + 1;
    }
}

/**
 * Sets the column defaults
 */
function setColumnDefaults(columns) {
    if (!columns)
        return;
    for (const column of columns) {
        if (!column.$$id) {
            column.$$id = id();
        }
        // prop can be numeric; zero is valid not a missing prop
        // translate name => prop
        if (isNullOrUndefined(column.prop) && column.name) {
            column.prop = camelCase(column.name);
        }
        if (!column.$$valueGetter) {
            column.$$valueGetter = getterForProp(column.prop);
        }
        // format props if no name passed
        if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = deCamelCase(String(column.prop));
        }
        if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = ''; // Fixes IE and Edge displaying `null`
        }
        if (!column.hasOwnProperty('resizeable')) {
            column.resizeable = true;
        }
        if (!column.hasOwnProperty('sortable')) {
            column.sortable = true;
        }
        if (!column.hasOwnProperty('draggable')) {
            column.draggable = true;
        }
        if (!column.hasOwnProperty('canAutoResize')) {
            column.canAutoResize = true;
        }
        if (!column.hasOwnProperty('width')) {
            column.width = 150;
        }
    }
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/**
 * Translates templates definitions to objects
 */
function translateTemplates(templates) {
    const result = [];
    for (const temp of templates) {
        const col = {};
        const props = Object.getOwnPropertyNames(temp);
        for (const prop of props) {
            col[prop] = temp[prop];
        }
        if (temp.headerTemplate) {
            col.headerTemplate = temp.headerTemplate;
        }
        if (temp.cellTemplate) {
            col.cellTemplate = temp.cellTemplate;
        }
        result.push(col);
    }
    return result;
}

if (typeof document !== 'undefined' && !document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
}
/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */
function elementsFromPoint(x, y) {
    const elements = [];
    const previousPointerEvents = [];
    let current; // TODO: window.getComputedStyle should be used with inferred type (Element)
    let i;
    let d;
    //if (document === undefined) return elements;
    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }
    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; d = previousPointerEvents[--i];) {
        elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
    }
    // return our results
    return elements;
}
/*tslint:enable*/

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableHeaderComponent = class DataTableHeaderComponent {
    constructor() {
        this.sort = new EventEmitter();
        this.reorder = new EventEmitter();
        this.resize = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
    }
    set innerWidth(val) {
        this._innerWidth = val;
        if (this._columns) {
            const colByPin = columnsByPin(this._columns);
            this.columnGroupWidths = columnGroupWidths(colByPin, this._columns);
        }
    }
    get innerWidth() {
        return this._innerWidth;
    }
    set headerHeight(val) {
        if (val !== 'auto') {
            this._headerHeight = `${val}px`;
        }
        else {
            this._headerHeight = val;
        }
    }
    get headerHeight() {
        return this._headerHeight;
    }
    set columns(val) {
        this._columns = val;
        const colsByPin = columnsByPin(val);
        this.columnsByPin = columnsByPinArr(val);
        this.columnGroupWidths = columnGroupWidths(colsByPin, val);
    }
    get columns() {
        return this._columns;
    }
    onLongPressStart({ event, model }) {
        model.dragging = true;
        this.dragEventTarget = event;
    }
    onLongPressEnd({ event, model }) {
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout(() => {
            model.dragging = false;
        }, 5);
    }
    get headerWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        return '100%';
    }
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    onColumnResized(width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column,
            prevValue: column.width,
            newValue: width
        });
    }
    onColumnReordered({ prevIndex, newIndex, model }) {
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    }
    onSort({ column, prevValue, newValue }) {
        // if we are dragging don't sort!
        if (column.dragging)
            return;
        const sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts,
            column,
            prevValue,
            newValue
        });
    }
    calcNewSorts(column, prevValue, newValue) {
        let idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        const sorts = this.sorts.map((s, i) => {
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
    }
    stylesByGroup(group) {
        const widths = this.columnGroupWidths;
        const offsetX = this.offsetX;
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            const totalDiff = widths.total - this.innerWidth;
            const offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "dealsWithGroup", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableHeaderComponent.prototype, "innerWidth", null);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableHeaderComponent.prototype, "offsetX", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DataTableHeaderComponent.prototype, "sorts", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DataTableHeaderComponent.prototype, "sortType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DataTableHeaderComponent.prototype, "selectionType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "reorderable", void 0);
__decorate([
    HostBinding('style.height'),
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTableHeaderComponent.prototype, "headerHeight", null);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableHeaderComponent.prototype, "columns", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataTableHeaderComponent.prototype, "sort", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataTableHeaderComponent.prototype, "reorder", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataTableHeaderComponent.prototype, "resize", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataTableHeaderComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DataTableHeaderComponent.prototype, "columnContextmenu", void 0);
__decorate([
    HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DataTableHeaderComponent.prototype, "headerWidth", null);
DataTableHeaderComponent = __decorate([
    Component({
        selector: 'datatable-header',
        template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      [style.width.px]="columnGroupWidths.total"
      class="datatable-header-inner">
     
      <div
        *ngFor="let colGroup of columnsByPin; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="stylesByGroup(colGroup.type)">
        <datatable-header-cell
          *ngFor="let column of colGroup.columns; trackBy: columnTrackingFn"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          [pressModel]="column"
          [pressEnabled]="reorderable && column.draggable"
          (longPressStart)="onLongPressStart($event)"
          (longPressEnd)="onLongPressEnd($event)"
          draggable
          [dragX]="reorderable && column.draggable && column.dragging"
          [dragY]="false"
          [dragModel]="column"
          [dragEventTarget]="dragEventTarget"
          [headerHeight]="headerHeight"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [allRowsSelected]="allRowsSelected"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)">
        </datatable-header-cell>
      </div>
    </div>
  `,
        host: {
            class: 'datatable-header'
        }
    })
], DataTableHeaderComponent);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableHeaderCellComponent = class DataTableHeaderCellComponent {
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    set allRowsSelected(value) {
        this._allRowsSelected = value;
        this.cellContext.allRowsSelected = value;
    }
    get allRowsSelected() {
        return this._allRowsSelected;
    }
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.cd.markForCheck();
    }
    get column() {
        return this._column;
    }
    set sorts(val) {
        this._sorts = val;
        this.sortDir = this.calcSortDir(val);
        this.sortClass = this.calcSortClass(this.sortDir);
        this.cd.markForCheck();
    }
    get sorts() {
        return this._sorts;
    }
    get columnCssClasses() {
        let cls = 'datatable-header-cell';
        if (this.column.sortable)
            cls += ' sortable';
        if (this.column.resizeable)
            cls += ' resizeable';
        if (this.column.headerClass) {
            if (typeof this.column.headerClass === 'string') {
                cls += ' ' + this.column.headerClass;
            }
            else if (typeof this.column.headerClass === 'function') {
                const res = this.column.headerClass({
                    column: this.column
                });
                if (typeof res === 'string') {
                    cls += res;
                }
                else if (typeof res === 'object') {
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true)
                            cls += ` ${k}`;
                    }
                }
            }
        }
        const sortDir = this.sortDir;
        if (sortDir) {
            cls += ` sort-active sort-${sortDir}`;
        }
        return cls;
    }
    get name() {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.headerTemplate === undefined ? this.column.name : undefined;
    }
    get minWidth() {
        return this.column.minWidth;
    }
    get maxWidth() {
        return this.column.maxWidth;
    }
    get width() {
        return this.column.width;
    }
    get isCheckboxable() {
        return this.column.checkboxable &&
            this.column.headerCheckboxable &&
            this.selectionType === SelectionType.checkbox;
    }
    onContextmenu($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    }
    calcSortDir(sorts) {
        if (sorts && this.column) {
            const sort = sorts.find((s) => {
                return s.prop === this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    }
    onSort() {
        if (!this.column.sortable)
            return;
        const newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue
        });
    }
    calcSortClass(sortDir) {
        if (sortDir === SortDirection.asc) {
            return `sort-btn sort-asc ${this.sortAscendingIcon}`;
        }
        else if (sortDir === SortDirection.desc) {
            return `sort-btn sort-desc ${this.sortDescendingIcon}`;
        }
        else {
            return `sort-btn`;
        }
    }
};
__decorate$1([
    Input(),
    __metadata$1("design:type", String)
], DataTableHeaderCellComponent.prototype, "sortType", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", String)
], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", String)
], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [Object])
], DataTableHeaderCellComponent.prototype, "allRowsSelected", null);
__decorate$1([
    Input(),
    __metadata$1("design:type", String)
], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [Object])
], DataTableHeaderCellComponent.prototype, "column", null);
__decorate$1([
    HostBinding('style.height.px'),
    Input(),
    __metadata$1("design:type", Number)
], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Array),
    __metadata$1("design:paramtypes", [Array])
], DataTableHeaderCellComponent.prototype, "sorts", null);
__decorate$1([
    Output(),
    __metadata$1("design:type", EventEmitter)
], DataTableHeaderCellComponent.prototype, "sort", void 0);
__decorate$1([
    Output(),
    __metadata$1("design:type", EventEmitter)
], DataTableHeaderCellComponent.prototype, "select", void 0);
__decorate$1([
    Output(),
    __metadata$1("design:type", Object)
], DataTableHeaderCellComponent.prototype, "columnContextmenu", void 0);
__decorate$1([
    HostBinding('class'),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "columnCssClasses", null);
__decorate$1([
    HostBinding('attr.title'),
    __metadata$1("design:type", String),
    __metadata$1("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "name", null);
__decorate$1([
    HostBinding('style.minWidth.px'),
    __metadata$1("design:type", Number),
    __metadata$1("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "minWidth", null);
__decorate$1([
    HostBinding('style.maxWidth.px'),
    __metadata$1("design:type", Number),
    __metadata$1("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "maxWidth", null);
__decorate$1([
    HostBinding('style.width.px'),
    __metadata$1("design:type", Number),
    __metadata$1("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "width", null);
__decorate$1([
    HostListener('contextmenu', ['$event']),
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [MouseEvent]),
    __metadata$1("design:returntype", void 0)
], DataTableHeaderCellComponent.prototype, "onContextmenu", null);
DataTableHeaderCellComponent = __decorate$1([
    Component({
        selector: 'datatable-header-cell',
        template: `
    <div>
      <label
        *ngIf="isCheckboxable"
        class="datatable-checkbox">
        <input
          type="checkbox"
          [checked]="allRowsSelected"
          (change)="select.emit(!allRowsSelected)"
        />
      </label>
      <span
        *ngIf="!column.headerTemplate"
        class="datatable-header-cell-wrapper">
        <span
          class="datatable-header-cell-label draggable"
          (click)="onSort()"
          [innerHTML]="name">
        </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext">
      </ng-template>
      <span
        (click)="onSort()"
        [class]="sortClass">
      </span>
    </div>
  `,
        host: {
            class: 'datatable-header-cell'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata$1("design:paramtypes", [ChangeDetectorRef])
], DataTableHeaderCellComponent);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let ScrollerComponent = class ScrollerComponent {
    constructor(element, renderer) {
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
    }
    ngOnInit() {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.onScrollListener = this.renderer.listen(this.parentElement, 'scroll', this.onScrolled.bind(this));
        }
    }
    ngOnDestroy() {
        if (this.scrollbarV || this.scrollbarH) {
            this.onScrollListener();
        }
    }
    setOffset(offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    }
    onScrolled(event) {
        const dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    }
    updateOffset() {
        let direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    }
};
__decorate$3([
    Input(),
    __metadata$3("design:type", Boolean)
], ScrollerComponent.prototype, "scrollbarV", void 0);
__decorate$3([
    Input(),
    __metadata$3("design:type", Boolean)
], ScrollerComponent.prototype, "scrollbarH", void 0);
__decorate$3([
    HostBinding('style.height.px'),
    Input(),
    __metadata$3("design:type", Number)
], ScrollerComponent.prototype, "scrollHeight", void 0);
__decorate$3([
    HostBinding('style.width.px'),
    Input(),
    __metadata$3("design:type", Number)
], ScrollerComponent.prototype, "scrollWidth", void 0);
__decorate$3([
    Output(),
    __metadata$3("design:type", EventEmitter)
], ScrollerComponent.prototype, "scroll", void 0);
ScrollerComponent = __decorate$3([
    Component({
        selector: 'datatable-scroller',
        template: `
    <ng-content></ng-content>
  `,
        host: {
            class: 'datatable-scroll'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata$3("design:paramtypes", [ElementRef, Renderer])
], ScrollerComponent);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableBodyComponent = class DataTableBodyComponent {
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    constructor(cd) {
        this.cd = cd;
        this.selected = [];
        this.scroll = new EventEmitter();
        this.page = new EventEmitter();
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
        this.detailToggle = new EventEmitter();
        this.rowContextmenu = new EventEmitter(false);
        this.rowHeightsCache = new RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        this.rowIndexes = new Map();
        this.rowExpansions = new Map();
        /**
         * Get the height of the detail row.
         */
        this.getDetailRowHeight = (row, index) => {
            if (!this.rowDetail)
                return 0;
            const rowHeight = this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
        };
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            const idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return `${idx}-${this.trackByProp}`;
            }
            else {
                return idx;
            }
        }.bind(this);
    }
    set pageSize(val) {
        this._pageSize = val;
        this.recalcLayout();
    }
    get pageSize() {
        return this._pageSize;
    }
    set rows(val) {
        this._rows = val;
        this.rowExpansions.clear();
        this.recalcLayout();
    }
    get rows() {
        return this._rows;
    }
    set columns(val) {
        this._columns = val;
        const colsByPin = columnsByPin(val);
        this.columnGroupWidths = columnGroupWidths(colsByPin, val);
    }
    get columns() {
        return this._columns;
    }
    set offset(val) {
        this._offset = val;
        this.recalcLayout();
    }
    get offset() {
        return this._offset;
    }
    set rowCount(val) {
        this._rowCount = val;
        this.recalcLayout();
    }
    get rowCount() {
        return this._rowCount;
    }
    get bodyWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        else {
            return '100%';
        }
    }
    set bodyHeight(val) {
        if (this.scrollbarV) {
            this._bodyHeight = val + 'px';
        }
        else {
            this._bodyHeight = 'auto';
        }
        this.recalcLayout();
    }
    get bodyHeight() {
        return this._bodyHeight;
    }
    /**
     * Returns if selection is enabled.
     */
    get selectEnabled() {
        return !!this.selectionType;
    }
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     */
    get scrollHeight() {
        if (this.scrollbarV) {
            return this.rowHeightsCache.query(this.rowCount - 1);
        }
    }
    /**
     * Called after the constructor, initializing input properties
     */
    ngOnInit() {
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle
                .subscribe(({ type, value }) => {
                if (type === 'row')
                    this.toggleRowExpansion(value);
                if (type === 'all')
                    this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                this.updateIndexes();
                this.updateRows();
                this.cd.markForCheck();
            });
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle
                .subscribe(({ type, value }) => {
                if (type === 'group')
                    this.toggleRowExpansion(value);
                if (type === 'all')
                    this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                this.updateIndexes();
                this.updateRows();
                this.cd.markForCheck();
            });
        }
    }
    /**
     * Called once, before the instance is destroyed.
     */
    ngOnDestroy() {
        if (this.rowDetail)
            this.listener.unsubscribe();
        if (this.groupHeader)
            this.listener.unsubscribe();
    }
    /**
     * Updates the Y offset given a new offset.
     */
    updateOffsetY(offset) {
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        if (this.scrollbarV && offset) {
            // First get the row Index that we need to move to.
            const rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        this.scroller.setOffset(offset || 0);
    }
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    onBodyScroll(event) {
        const scrollYPos = event.scrollYPos;
        const scrollXPos = event.scrollXPos;
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
    }
    /**
     * Updates the page given a direction.
     */
    updatePage(direction) {
        let offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.ceil(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset });
        }
    }
    /**
     * Updates the rows in the view port
     */
    updateRows() {
        const { first, last } = this.indexes;
        let rowIndex = first;
        let idx = 0;
        const temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging 
        // parameters as group paging parameters ie if limit 10 has been 
        // specified treat it as 10 groups rather than 10 rows    
        if (this.groupedRows) {
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                const group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                const row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    }
    /**
     * Get the row height
     */
    getRowHeight(row) {
        let rowHeight = this.rowHeight;
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            rowHeight = this.rowHeight(row);
        }
        return rowHeight;
    }
    /**
     * @param group the group with all rows
     */
    getGroupHeight(group) {
        let rowHeight = 0;
        if (group.value) {
            for (let index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    }
    /**
     * Calculate row height based on the expanded state of the row.
     */
    getRowAndDetailHeight(row) {
        let rowHeight = this.getRowHeight(row);
        const expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    }
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
    getRowsStyles(rows) {
        const styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles['width'] = this.columnGroupWidths.total;
        }
        if (this.scrollbarV) {
            let idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                const row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            const pos = this.rowHeightsCache.query(idx - 1);
            translateXY(styles, 0, pos);
        }
        return styles;
    }
    /**
     * Hides the loading indicator
     */
    hideIndicator() {
        setTimeout(() => this.loadingIndicator = false, 500);
    }
    /**
     * Updates the index of the rows in the viewport
     */
    updateIndexes() {
        let first = 0;
        let last = 0;
        if (this.scrollbarV) {
            // Calculation of the first and last indexes will be based on where the
            // scrollY position would be at.  The last index would be the one
            // that shows up inside the view port the last.
            const height = parseInt(this.bodyHeight, 0);
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
        this.indexes = { first, last };
    }
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    refreshRowHeightCache() {
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
    }
    /**
     * Gets the index for the view port
     */
    getAdjustedViewPortIndex() {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        const viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV) {
            const offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    }
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    toggleRowExpansion(row) {
        // Capture the row index of the first row that is visible on the viewport.
        const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        let expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV) {
            const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            const idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    }
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    toggleAllRows(expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        const rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (const row of this.rows) {
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
    }
    /**
     * Recalculates the table
     */
    recalcLayout() {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    }
    /**
     * Tracks the column
     */
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    /**
     * Gets the row pinning group styles
     */
    stylesByGroup(group) {
        const widths = this.columnGroupWidths;
        const offsetX = this.offsetX;
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            const totalDiff = widths.total - bodyWidth;
            const offsetDiff = totalDiff - offsetX;
            const offset = offsetDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    getRowExpanded(row) {
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            for (const group of this.groupedRows) {
                this.rowExpansions.set(group, 1);
            }
        }
        const expanded = this.rowExpansions.get(row);
        return expanded === 1;
    }
    /**
     * Gets the row index given a row
     */
    getRowIndex(row) {
        return this.rowIndexes.get(row) || 0;
    }
};
__decorate$2([
    Input(),
    __metadata$2("design:type", Boolean)
], DataTableBodyComponent.prototype, "scrollbarV", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Boolean)
], DataTableBodyComponent.prototype, "scrollbarH", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Boolean)
], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Boolean)
], DataTableBodyComponent.prototype, "externalPaging", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number)
], DataTableBodyComponent.prototype, "rowHeight", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number)
], DataTableBodyComponent.prototype, "offsetX", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", String)
], DataTableBodyComponent.prototype, "emptyMessage", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", String)
], DataTableBodyComponent.prototype, "selectionType", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Array)
], DataTableBodyComponent.prototype, "selected", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "rowIdentity", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "rowDetail", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "groupHeader", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "selectCheck", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "displayCheck", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", String)
], DataTableBodyComponent.prototype, "trackByProp", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "rowClass", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "groupedRows", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Boolean)
], DataTableBodyComponent.prototype, "groupExpansionDefault", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number)
], DataTableBodyComponent.prototype, "innerWidth", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", String)
], DataTableBodyComponent.prototype, "groupRowsBy", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number),
    __metadata$2("design:paramtypes", [Number])
], DataTableBodyComponent.prototype, "pageSize", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Array),
    __metadata$2("design:paramtypes", [Array])
], DataTableBodyComponent.prototype, "rows", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Array),
    __metadata$2("design:paramtypes", [Array])
], DataTableBodyComponent.prototype, "columns", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number),
    __metadata$2("design:paramtypes", [Number])
], DataTableBodyComponent.prototype, "offset", null);
__decorate$2([
    Input(),
    __metadata$2("design:type", Number),
    __metadata$2("design:paramtypes", [Number])
], DataTableBodyComponent.prototype, "rowCount", null);
__decorate$2([
    HostBinding('style.width'),
    __metadata$2("design:type", String),
    __metadata$2("design:paramtypes", [])
], DataTableBodyComponent.prototype, "bodyWidth", null);
__decorate$2([
    Input(),
    HostBinding('style.height'),
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [Object])
], DataTableBodyComponent.prototype, "bodyHeight", null);
__decorate$2([
    Output(),
    __metadata$2("design:type", EventEmitter)
], DataTableBodyComponent.prototype, "scroll", void 0);
__decorate$2([
    Output(),
    __metadata$2("design:type", EventEmitter)
], DataTableBodyComponent.prototype, "page", void 0);
__decorate$2([
    Output(),
    __metadata$2("design:type", EventEmitter)
], DataTableBodyComponent.prototype, "activate", void 0);
__decorate$2([
    Output(),
    __metadata$2("design:type", EventEmitter)
], DataTableBodyComponent.prototype, "select", void 0);
__decorate$2([
    Output(),
    __metadata$2("design:type", EventEmitter)
], DataTableBodyComponent.prototype, "detailToggle", void 0);
__decorate$2([
    Output(),
    __metadata$2("design:type", Object)
], DataTableBodyComponent.prototype, "rowContextmenu", void 0);
__decorate$2([
    ViewChild(ScrollerComponent),
    __metadata$2("design:type", ScrollerComponent)
], DataTableBodyComponent.prototype, "scroller", void 0);
DataTableBodyComponent = __decorate$2([
    Component({
        selector: 'datatable-body',
        template: `
    <datatable-selection
      #selector
      [selected]="selected"
      [rows]="rows"
      [selectCheck]="selectCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)">
      <datatable-progress
        *ngIf="loadingIndicator">
      </datatable-progress>
      <datatable-scroller
        *ngIf="rows?.length"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight"
        [scrollWidth]="columnGroupWidths.total"
        (scroll)="onBodyScroll($event)">
        <datatable-row-wrapper
          [groupedRows]="groupedRows"
          *ngFor="let group of temp; let i = index; trackBy: rowTrackingFn;"
          [innerWidth]="innerWidth"
          [ngStyle]="getRowsStyles(group)"
          [rowDetail]="rowDetail"
          [groupHeader]="groupHeader"
          [offsetX]="offsetX"
          [detailRowHeight]="getDetailRowHeight(group[i],i)"
          [row]="group"
          [expanded]="getRowExpanded(group)"
          [rowIndex]="getRowIndex(group[i])"
          (rowContextmenu)="rowContextmenu.emit($event)">
          <datatable-body-row 
            *ngIf="!groupedRows; else groupedRowsTemplate"        
            tabindex="-1"
            [isSelected]="selector.getRowSelected(group)"
            [innerWidth]="innerWidth"
            [offsetX]="offsetX"
            [columns]="columns"
            [rowHeight]="getRowHeight(group)"
            [row]="group"
            [rowIndex]="getRowIndex(group)"
            [expanded]="getRowExpanded(group)"            
            [rowClass]="rowClass"
            [displayCheck]="displayCheck"
            (activate)="selector.onActivate($event, indexes.first + i)">
          </datatable-body-row>
          <ng-template #groupedRowsTemplate>
            <datatable-body-row
              *ngFor="let row of group.value; let i = index; trackBy: rowTrackingFn;"
              tabindex="-1"
              [isSelected]="selector.getRowSelected(row)"
              [innerWidth]="innerWidth"
              [offsetX]="offsetX"
              [columns]="columns"
              [rowHeight]="getRowHeight(row)"
              [row]="row"
              [group]="group.value"
              [rowIndex]="getRowIndex(row)"
              [expanded]="getRowExpanded(row)"
              [rowClass]="rowClass"
              (activate)="selector.onActivate($event, i)">
            </datatable-body-row>
          </ng-template>
        </datatable-row-wrapper>
      </datatable-scroller>
      <div
        class="empty-row"
        *ngIf="!rows?.length"
        [innerHTML]="emptyMessage">
      </div>
    </datatable-selection>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: {
            class: 'datatable-body'
        }
    }),
    __metadata$2("design:paramtypes", [ChangeDetectorRef])
], DataTableBodyComponent);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableBodyCellComponent = class DataTableBodyCellComponent {
    constructor(element, cd) {
        this.cd = cd;
        this.activate = new EventEmitter();
        this.isFocused = false;
        this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
        this.activateFn = this.activate.emit.bind(this.activate);
        this.cellContext = {
            onCheckboxChangeFn: this.onCheckboxChangeFn,
            activateFn: this.activateFn,
            row: this.row,
            group: this.group,
            value: this.value,
            column: this.column,
            rowHeight: this.rowHeight,
            isSelected: this.isSelected,
            rowIndex: this.rowIndex
        };
        this._element = element.nativeElement;
    }
    set group(group) {
        this._group = group;
        this.cellContext.group = group;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get group() {
        return this._group;
    }
    set rowHeight(val) {
        this._rowHeight = val;
        this.cellContext.rowHeight = val;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get rowHeight() {
        return this._rowHeight;
    }
    set isSelected(val) {
        this._isSelected = val;
        this.cellContext.isSelected = val;
        this.cd.markForCheck();
    }
    get isSelected() {
        return this._isSelected;
    }
    set expanded(val) {
        this._expanded = val;
        this.cellContext.expanded = val;
        this.cd.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    set rowIndex(val) {
        this._rowIndex = val;
        this.cellContext.rowIndex = val;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get column() {
        return this._column;
    }
    set row(row) {
        this._row = row;
        this.cellContext.row = row;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get row() {
        return this._row;
    }
    set sorts(val) {
        this._sorts = val;
        this.calcSortDir = this.calcSortDir(val);
    }
    get sorts() {
        return this._sorts;
    }
    get columnCssClasses() {
        let cls = 'datatable-body-cell';
        if (this.column.cellClass) {
            if (typeof this.column.cellClass === 'string') {
                cls += ' ' + this.column.cellClass;
            }
            else if (typeof this.column.cellClass === 'function') {
                const res = this.column.cellClass({
                    row: this.row,
                    group: this.group,
                    column: this.column,
                    value: this.value,
                    rowHeight: this.rowHeight
                });
                if (typeof res === 'string') {
                    cls += res;
                }
                else if (typeof res === 'object') {
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true)
                            cls += ` ${k}`;
                    }
                }
            }
        }
        if (!this.sortDir)
            cls += ' sort-active';
        if (this.isFocused)
            cls += ' active';
        if (this.sortDir === SortDirection.asc)
            cls += ' sort-asc';
        if (this.sortDir === SortDirection.desc)
            cls += ' sort-desc';
        return cls;
    }
    get width() {
        return this.column.width;
    }
    get height() {
        const height = this.rowHeight;
        if (isNaN(height))
            return height;
        return height + 'px';
    }
    ngDoCheck() {
        this.checkValueUpdates();
    }
    ngOnDestroy() {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    }
    checkValueUpdates() {
        let value = '';
        if (!this.row || !this.column) {
            value = '';
        }
        else {
            const val = this.column.$$valueGetter(this.row, this.column.prop);
            const userPipe = this.column.pipe;
            if (userPipe) {
                value = userPipe.transform(val);
            }
            else if (value !== undefined) {
                value = val;
            }
        }
        if (this.value !== value) {
            this.value = value;
            this.cellContext.value = value;
            this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
            this.cd.markForCheck();
        }
    }
    onFocus() {
        this.isFocused = true;
    }
    onBlur() {
        this.isFocused = false;
    }
    onClick(event) {
        this.activate.emit({
            type: 'click',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    onDblClick(event) {
        this.activate.emit({
            type: 'dblclick',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;
        const isTargetCell = event.target === this._element;
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    }
    onCheckboxChange(event) {
        this.activate.emit({
            type: 'checkbox',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    calcSortDir(sorts) {
        if (!sorts)
            return;
        const sort = sorts.find((s) => {
            return s.prop === this.column.prop;
        });
        if (sort)
            return sort.dir;
    }
    stripHtml(html) {
        if (!html.replace)
            return html;
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    }
};
__decorate$4([
    Input(),
    __metadata$4("design:type", Object)
], DataTableBodyCellComponent.prototype, "displayCheck", void 0);
__decorate$4([
    Input(),
    __metadata$4("design:type", Object),
    __metadata$4("design:paramtypes", [Object])
], DataTableBodyCellComponent.prototype, "group", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Number),
    __metadata$4("design:paramtypes", [Number])
], DataTableBodyCellComponent.prototype, "rowHeight", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Boolean),
    __metadata$4("design:paramtypes", [Boolean])
], DataTableBodyCellComponent.prototype, "isSelected", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Boolean),
    __metadata$4("design:paramtypes", [Boolean])
], DataTableBodyCellComponent.prototype, "expanded", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Number),
    __metadata$4("design:paramtypes", [Number])
], DataTableBodyCellComponent.prototype, "rowIndex", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Object),
    __metadata$4("design:paramtypes", [Object])
], DataTableBodyCellComponent.prototype, "column", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Object),
    __metadata$4("design:paramtypes", [Object])
], DataTableBodyCellComponent.prototype, "row", null);
__decorate$4([
    Input(),
    __metadata$4("design:type", Array),
    __metadata$4("design:paramtypes", [Array])
], DataTableBodyCellComponent.prototype, "sorts", null);
__decorate$4([
    Output(),
    __metadata$4("design:type", EventEmitter)
], DataTableBodyCellComponent.prototype, "activate", void 0);
__decorate$4([
    ViewChild('cellTemplate', { read: ViewContainerRef }),
    __metadata$4("design:type", ViewContainerRef)
], DataTableBodyCellComponent.prototype, "cellTemplate", void 0);
__decorate$4([
    HostBinding('class'),
    __metadata$4("design:type", Object),
    __metadata$4("design:paramtypes", [])
], DataTableBodyCellComponent.prototype, "columnCssClasses", null);
__decorate$4([
    HostBinding('style.width.px'),
    __metadata$4("design:type", Number),
    __metadata$4("design:paramtypes", [])
], DataTableBodyCellComponent.prototype, "width", null);
__decorate$4([
    HostBinding('style.height'),
    __metadata$4("design:type", Object),
    __metadata$4("design:paramtypes", [])
], DataTableBodyCellComponent.prototype, "height", null);
__decorate$4([
    HostListener('focus'),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", []),
    __metadata$4("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onFocus", null);
__decorate$4([
    HostListener('blur'),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", []),
    __metadata$4("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onBlur", null);
__decorate$4([
    HostListener('click', ['$event']),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", [MouseEvent]),
    __metadata$4("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onClick", null);
__decorate$4([
    HostListener('dblclick', ['$event']),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", [MouseEvent]),
    __metadata$4("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onDblClick", null);
__decorate$4([
    HostListener('keydown', ['$event']),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", [KeyboardEvent]),
    __metadata$4("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onKeyDown", null);
DataTableBodyCellComponent = __decorate$4([
    Component({
        selector: 'datatable-body-cell',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="datatable-body-cell-label">
      <label
        *ngIf="column.checkboxable && (!displayCheck || displayCheck(row, column, value))"
        class="datatable-checkbox">
        <input
          type="checkbox"
          [checked]="isSelected"
          (click)="onCheckboxChange($event)"
        />
      </label>
      <span
        *ngIf="!column.cellTemplate"
        [title]="sanitizedValue"
        [innerHTML]="value">
      </span>
      <ng-template #cellTemplate
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext">
      </ng-template>
    </div>
  `
    }),
    __metadata$4("design:paramtypes", [ElementRef, ChangeDetectorRef])
], DataTableBodyCellComponent);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
let ScrollbarHelper = class ScrollbarHelper {
    constructor(document) {
        this.document = document;
        this.width = this.getWidth();
    }
    getWidth() {
        const outer = this.document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';
        this.document.body.appendChild(outer);
        const widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        const inner = this.document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        const widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }
};
ScrollbarHelper = __decorate$6([
    Injectable(),
    __param(0, Inject(DOCUMENT)),
    __metadata$6("design:paramtypes", [Object])
], ScrollbarHelper);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableBodyRowComponent = class DataTableBodyRowComponent {
    constructor(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.activate = new EventEmitter();
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
    }
    set columns(val) {
        this._columns = val;
        this.recalculateColumns(val);
    }
    get columns() {
        return this._columns;
    }
    set innerWidth(val) {
        if (this._columns) {
            const colByPin = columnsByPin(this._columns);
            this.columnGroupWidths = columnGroupWidths(colByPin, colByPin);
        }
        this._innerWidth = val;
        this.recalculateColumns();
    }
    get innerWidth() {
        return this._innerWidth;
    }
    get cssClass() {
        let cls = 'datatable-body-row';
        if (this.isSelected)
            cls += ' active';
        if (this.rowIndex % 2 !== 0)
            cls += ' datatable-row-odd';
        if (this.rowIndex % 2 === 0)
            cls += ' datatable-row-even';
        if (this.rowClass) {
            const res = this.rowClass(this.row);
            if (typeof res === 'string') {
                cls += ` ${res}`;
            }
            else if (typeof res === 'object') {
                const keys = Object.keys(res);
                for (const k of keys) {
                    if (res[k] === true)
                        cls += ` ${k}`;
                }
            }
        }
        return cls;
    }
    get columnsTotalWidths() {
        return this.columnGroupWidths.total;
    }
    ngDoCheck() {
        if (this.rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    }
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    stylesByGroup(group) {
        const widths = this.columnGroupWidths;
        const offsetX = this.offsetX;
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            const totalDiff = widths.total - bodyWidth;
            const offsetDiff = totalDiff - offsetX;
            const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    onActivate(event, index) {
        event.cellIndex = index;
        event.rowElement = this.element;
        this.activate.emit(event);
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;
        const isTargetRow = event.target === this.element;
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                rowElement: this.element
            });
        }
    }
    onMouseenter(event) {
        this.activate.emit({
            type: 'mouseenter',
            event,
            row: this.row,
            rowElement: this.element
        });
    }
    recalculateColumns(val = this.columns) {
        this._columns = val;
        const colsByPin = columnsByPin(this._columns);
        this.columnsByPin = allColumnsByPinArr(this._columns);
        this.columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    }
};
__decorate$5([
    Input(),
    __metadata$5("design:type", Array),
    __metadata$5("design:paramtypes", [Array])
], DataTableBodyRowComponent.prototype, "columns", null);
__decorate$5([
    Input(),
    __metadata$5("design:type", Number),
    __metadata$5("design:paramtypes", [Number])
], DataTableBodyRowComponent.prototype, "innerWidth", null);
__decorate$5([
    Input(),
    __metadata$5("design:type", Boolean)
], DataTableBodyRowComponent.prototype, "expanded", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Object)
], DataTableBodyRowComponent.prototype, "rowClass", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Object)
], DataTableBodyRowComponent.prototype, "row", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Object)
], DataTableBodyRowComponent.prototype, "group", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Number)
], DataTableBodyRowComponent.prototype, "offsetX", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Boolean)
], DataTableBodyRowComponent.prototype, "isSelected", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Number)
], DataTableBodyRowComponent.prototype, "rowIndex", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Object)
], DataTableBodyRowComponent.prototype, "displayCheck", void 0);
__decorate$5([
    HostBinding('class'),
    __metadata$5("design:type", Object),
    __metadata$5("design:paramtypes", [])
], DataTableBodyRowComponent.prototype, "cssClass", null);
__decorate$5([
    HostBinding('style.height.px'),
    Input(),
    __metadata$5("design:type", Number)
], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
__decorate$5([
    HostBinding('style.width.px'),
    __metadata$5("design:type", String),
    __metadata$5("design:paramtypes", [])
], DataTableBodyRowComponent.prototype, "columnsTotalWidths", null);
__decorate$5([
    Output(),
    __metadata$5("design:type", EventEmitter)
], DataTableBodyRowComponent.prototype, "activate", void 0);
__decorate$5([
    HostListener('keydown', ['$event']),
    __metadata$5("design:type", Function),
    __metadata$5("design:paramtypes", [KeyboardEvent]),
    __metadata$5("design:returntype", void 0)
], DataTableBodyRowComponent.prototype, "onKeyDown", null);
__decorate$5([
    HostListener('mouseenter', ['$event']),
    __metadata$5("design:type", Function),
    __metadata$5("design:paramtypes", [Event]),
    __metadata$5("design:returntype", void 0)
], DataTableBodyRowComponent.prototype, "onMouseenter", null);
DataTableBodyRowComponent = __decorate$5([
    Component({
        selector: 'datatable-body-row',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div
      *ngFor="let colGroup of columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{colGroup.type}} datatable-row-group"
      [ngStyle]="stylesByGroup(colGroup.type)">
      <datatable-body-cell
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        (activate)="onActivate($event, ii)">
      </datatable-body-cell>
    </div>      
  `
    }),
    __metadata$5("design:paramtypes", [KeyValueDiffers,
        ScrollbarHelper,
        ChangeDetectorRef,
        ElementRef])
], DataTableBodyRowComponent);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ProgressBarComponent = class ProgressBarComponent {
};
ProgressBarComponent = __decorate$7([
    Component({
        selector: 'datatable-progress',
        template: `
    <div class="progress-linear" role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ProgressBarComponent);

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableRowWrapperComponent = class DataTableRowWrapperComponent {
    constructor(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new EventEmitter(false);
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this._expanded = false;
        this.rowDiffer = differs.find({}).create();
    }
    set rowIndex(val) {
        this._rowIndex = val;
        this.rowContext.rowIndex = val;
        this.groupContext.rowIndex = val;
        this.cd.markForCheck();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    set expanded(val) {
        this._expanded = val;
        this.groupContext.expanded = val;
        this.rowContext.expanded = val;
        this.cd.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    ngDoCheck() {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    }
    onContextmenu($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    }
    getGroupHeaderStyle(group) {
        const styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    }
};
__decorate$8([
    Input(),
    __metadata$7("design:type", Number)
], DataTableRowWrapperComponent.prototype, "innerWidth", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Object)
], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Object)
], DataTableRowWrapperComponent.prototype, "groupHeader", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Number)
], DataTableRowWrapperComponent.prototype, "offsetX", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Object)
], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Object)
], DataTableRowWrapperComponent.prototype, "row", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Object)
], DataTableRowWrapperComponent.prototype, "groupedRows", void 0);
__decorate$8([
    Output(),
    __metadata$7("design:type", Object)
], DataTableRowWrapperComponent.prototype, "rowContextmenu", void 0);
__decorate$8([
    Input(),
    __metadata$7("design:type", Number),
    __metadata$7("design:paramtypes", [Number])
], DataTableRowWrapperComponent.prototype, "rowIndex", null);
__decorate$8([
    Input(),
    __metadata$7("design:type", Boolean),
    __metadata$7("design:paramtypes", [Boolean])
], DataTableRowWrapperComponent.prototype, "expanded", null);
__decorate$8([
    HostListener('contextmenu', ['$event']),
    __metadata$7("design:type", Function),
    __metadata$7("design:paramtypes", [MouseEvent]),
    __metadata$7("design:returntype", void 0)
], DataTableRowWrapperComponent.prototype, "onContextmenu", null);
DataTableRowWrapperComponent = __decorate$8([
    Component({
        selector: 'datatable-row-wrapper',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div 
      *ngIf="groupHeader && groupHeader.template"
      class="datatable-group-header"
      [ngStyle]="getGroupHeaderStyle()">
      <ng-template
        *ngIf="groupHeader && groupHeader.template"
        [ngTemplateOutlet]="groupHeader.template"
        [ngTemplateOutletContext]="groupContext">
      </ng-template>
    </div>
    <ng-content 
      *ngIf="(groupHeader && groupHeader.template && expanded) || 
             (!groupHeader || !groupHeader.template)">
    </ng-content>
    <div
      *ngIf="rowDetail && rowDetail.template && expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail">
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="rowContext">
      </ng-template>
    </div>
  `,
        host: {
            class: 'datatable-row-wrapper'
        }
    }),
    __metadata$7("design:paramtypes", [ChangeDetectorRef, KeyValueDiffers])
], DataTableRowWrapperComponent);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableSelectionComponent = class DataTableSelectionComponent {
    constructor() {
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
    }
    selectRow(event, index, row) {
        if (!this.selectEnabled)
            return;
        const chkbox = this.selectionType === SelectionType.checkbox;
        const multi = this.selectionType === SelectionType.multi;
        const multiClick = this.selectionType === SelectionType.multiClick;
        let selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        this.prevIndex = index;
        this.select.emit({
            selected
        });
    }
    onActivate(model, index) {
        const { type, event, row } = model;
        const chkbox = this.selectionType === SelectionType.checkbox;
        const select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    }
    onKeyboardFocus(model) {
        const { keyCode } = model.event;
        const shouldFocus = keyCode === Keys.up ||
            keyCode === Keys.down ||
            keyCode === Keys.right ||
            keyCode === Keys.left;
        if (shouldFocus) {
            const isCellSelection = this.selectionType === SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    }
    focusRow(rowElement, keyCode) {
        const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    }
    getPrevNextRow(rowElement, keyCode) {
        const parentElement = rowElement.parentElement;
        if (parentElement) {
            let focusElement;
            if (keyCode === Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    }
    focusCell(cellElement, rowElement, keyCode, cellIndex) {
        let nextCellElement;
        if (keyCode === Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === Keys.up || keyCode === Keys.down) {
            const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                const children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    }
    getRowSelected(row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    }
    getRowSelectedIdx(row, selected) {
        if (!selected || !selected.length)
            return -1;
        const rowId = this.rowIdentity(row);
        return selected.findIndex((r) => {
            const id = this.rowIdentity(r);
            return id === rowId;
        });
    }
};
__decorate$9([
    Input(),
    __metadata$8("design:type", Array)
], DataTableSelectionComponent.prototype, "rows", void 0);
__decorate$9([
    Input(),
    __metadata$8("design:type", Array)
], DataTableSelectionComponent.prototype, "selected", void 0);
__decorate$9([
    Input(),
    __metadata$8("design:type", Boolean)
], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
__decorate$9([
    Input(),
    __metadata$8("design:type", String)
], DataTableSelectionComponent.prototype, "selectionType", void 0);
__decorate$9([
    Input(),
    __metadata$8("design:type", Object)
], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
__decorate$9([
    Input(),
    __metadata$8("design:type", Object)
], DataTableSelectionComponent.prototype, "selectCheck", void 0);
__decorate$9([
    Output(),
    __metadata$8("design:type", EventEmitter)
], DataTableSelectionComponent.prototype, "activate", void 0);
__decorate$9([
    Output(),
    __metadata$8("design:type", EventEmitter)
], DataTableSelectionComponent.prototype, "select", void 0);
DataTableSelectionComponent = __decorate$9([
    Component({
        selector: 'datatable-selection',
        template: `
    <ng-content></ng-content>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], DataTableSelectionComponent);

var __decorate$11 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DatatableGroupHeaderTemplateDirective = class DatatableGroupHeaderTemplateDirective {
    constructor(template) {
        this.template = template;
    }
};
DatatableGroupHeaderTemplateDirective = __decorate$11([
    Directive({
        selector: '[ngx-datatable-group-header-template]'
    }),
    __metadata$10("design:paramtypes", [TemplateRef])
], DatatableGroupHeaderTemplateDirective);

var __decorate$10 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DatatableGroupHeaderDirective = class DatatableGroupHeaderDirective {
    constructor() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Group visbility was toggled.
         */
        this.toggle = new EventEmitter();
    }
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    }
    /**
     * API method to expand all groups.
     */
    expandAllGroups() {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    }
    /**
     * API method to collapse all groups.
     */
    collapseAllGroups() {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    }
};
__decorate$10([
    Input(),
    __metadata$9("design:type", Object)
], DatatableGroupHeaderDirective.prototype, "rowHeight", void 0);
__decorate$10([
    Input(),
    ContentChild(DatatableGroupHeaderTemplateDirective, { read: TemplateRef }),
    __metadata$9("design:type", TemplateRef)
], DatatableGroupHeaderDirective.prototype, "template", void 0);
__decorate$10([
    Output(),
    __metadata$9("design:type", EventEmitter)
], DatatableGroupHeaderDirective.prototype, "toggle", void 0);
DatatableGroupHeaderDirective = __decorate$10([
    Directive({ selector: 'ngx-datatable-group-header' })
], DatatableGroupHeaderDirective);

var __decorate$12 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableFooterComponent = class DataTableFooterComponent {
    constructor() {
        this.selectedCount = 0;
        this.page = new EventEmitter();
    }
    get isVisible() {
        return (this.rowCount / this.pageSize) > 1;
    }
    get curPage() {
        return this.offset + 1;
    }
};
__decorate$12([
    Input(),
    __metadata$11("design:type", Number)
], DataTableFooterComponent.prototype, "footerHeight", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", Number)
], DataTableFooterComponent.prototype, "rowCount", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", Number)
], DataTableFooterComponent.prototype, "pageSize", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", Number)
], DataTableFooterComponent.prototype, "offset", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", String)
], DataTableFooterComponent.prototype, "pagerLeftArrowIcon", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", String)
], DataTableFooterComponent.prototype, "pagerRightArrowIcon", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", String)
], DataTableFooterComponent.prototype, "pagerPreviousIcon", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", String)
], DataTableFooterComponent.prototype, "pagerNextIcon", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", String)
], DataTableFooterComponent.prototype, "totalMessage", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", TemplateRef)
], DataTableFooterComponent.prototype, "footerTemplate", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", Number)
], DataTableFooterComponent.prototype, "selectedCount", void 0);
__decorate$12([
    Input(),
    __metadata$11("design:type", Object)
], DataTableFooterComponent.prototype, "selectedMessage", void 0);
__decorate$12([
    Output(),
    __metadata$11("design:type", EventEmitter)
], DataTableFooterComponent.prototype, "page", void 0);
DataTableFooterComponent = __decorate$12([
    Component({
        selector: 'datatable-footer',
        template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{'selected-count': selectedMessage}"
      [style.height.px]="footerHeight">
      <ng-template
        *ngIf="footerTemplate"
        [ngTemplateOutlet]="footerTemplate.template"
        [ngTemplateOutletContext]="{ 
          rowCount: rowCount, 
          pageSize: pageSize, 
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }">
      </ng-template>
      <div class="page-count" *ngIf="!footerTemplate">
        <span *ngIf="selectedMessage">
          {{selectedCount.toLocaleString()}} {{selectedMessage}} / 
        </span>
        {{rowCount.toLocaleString()}} {{totalMessage}}
      </div>
      <datatable-pager *ngIf="!footerTemplate"
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)">
      </datatable-pager>
    </div>
  `,
        host: {
            class: 'datatable-footer'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], DataTableFooterComponent);

var __decorate$13 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTablePagerComponent = class DataTablePagerComponent {
    constructor() {
        this.change = new EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    set size(val) {
        this._size = val;
        this.pages = this.calcPages();
    }
    get size() {
        return this._size;
    }
    set count(val) {
        this._count = val;
        this.pages = this.calcPages();
    }
    get count() {
        return this._count;
    }
    set page(val) {
        this._page = val;
        this.pages = this.calcPages();
    }
    get page() {
        return this._page;
    }
    get totalPages() {
        const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
        return Math.max(count || 0, 1);
    }
    canPrevious() {
        return this.page > 1;
    }
    canNext() {
        return this.page < this.totalPages;
    }
    prevPage() {
        this.selectPage(this.page - 1);
    }
    nextPage() {
        this.selectPage(this.page + 1);
    }
    selectPage(page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page
            });
        }
    }
    calcPages(page) {
        const pages = [];
        let startPage = 1;
        let endPage = this.totalPages;
        const maxSize = 5;
        const isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (let num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    }
};
__decorate$13([
    Input(),
    __metadata$12("design:type", String)
], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
__decorate$13([
    Input(),
    __metadata$12("design:type", String)
], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
__decorate$13([
    Input(),
    __metadata$12("design:type", String)
], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
__decorate$13([
    Input(),
    __metadata$12("design:type", String)
], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
__decorate$13([
    Input(),
    __metadata$12("design:type", Number),
    __metadata$12("design:paramtypes", [Number])
], DataTablePagerComponent.prototype, "size", null);
__decorate$13([
    Input(),
    __metadata$12("design:type", Number),
    __metadata$12("design:paramtypes", [Number])
], DataTablePagerComponent.prototype, "count", null);
__decorate$13([
    Input(),
    __metadata$12("design:type", Number),
    __metadata$12("design:paramtypes", [Number])
], DataTablePagerComponent.prototype, "page", null);
__decorate$13([
    Output(),
    __metadata$12("design:type", EventEmitter)
], DataTablePagerComponent.prototype, "change", void 0);
DataTablePagerComponent = __decorate$13([
    Component({
        selector: 'datatable-pager',
        template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a
          href="javascript:void(0)"
          (click)="selectPage(1)">
          <i class="{{pagerPreviousIcon}}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a
          href="javascript:void(0)"
          (click)="prevPage()">
          <i class="{{pagerLeftArrowIcon}}"></i>
        </a>
      </li>
      <li
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page">
        <a
          href="javascript:void(0)"
          (click)="selectPage(pg.number)">
          {{pg.text}}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          href="javascript:void(0)"
          (click)="nextPage()">
          <i class="{{pagerRightArrowIcon}}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          href="javascript:void(0)"
          (click)="selectPage(totalPages)">
          <i class="{{pagerNextIcon}}"></i>
        </a>
      </li>
    </ul>
  `,
        host: {
            class: 'datatable-pager'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], DataTablePagerComponent);

var __decorate$15 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableFooterTemplateDirective = class DataTableFooterTemplateDirective {
    constructor(template) {
        this.template = template;
    }
};
DataTableFooterTemplateDirective = __decorate$15([
    Directive({ selector: '[ngx-datatable-footer-template]' }),
    __metadata$14("design:paramtypes", [TemplateRef])
], DataTableFooterTemplateDirective);

var __decorate$14 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DatatableFooterDirective = class DatatableFooterDirective {
};
__decorate$14([
    Input(),
    __metadata$13("design:type", Number)
], DatatableFooterDirective.prototype, "footerHeight", void 0);
__decorate$14([
    Input(),
    __metadata$13("design:type", String)
], DatatableFooterDirective.prototype, "totalMessage", void 0);
__decorate$14([
    Input(),
    __metadata$13("design:type", Object)
], DatatableFooterDirective.prototype, "selectedMessage", void 0);
__decorate$14([
    Input(),
    __metadata$13("design:type", String)
], DatatableFooterDirective.prototype, "pagerLeftArrowIcon", void 0);
__decorate$14([
    Input(),
    __metadata$13("design:type", String)
], DatatableFooterDirective.prototype, "pagerRightArrowIcon", void 0);
__decorate$14([
    Input(),
    __metadata$13("design:type", String)
], DatatableFooterDirective.prototype, "pagerPreviousIcon", void 0);
__decorate$14([
    Input(),
    __metadata$13("design:type", String)
], DatatableFooterDirective.prototype, "pagerNextIcon", void 0);
__decorate$14([
    Input(),
    ContentChild(DataTableFooterTemplateDirective, { read: TemplateRef }),
    __metadata$13("design:type", TemplateRef)
], DatatableFooterDirective.prototype, "template", void 0);
DatatableFooterDirective = __decorate$14([
    Directive({ selector: 'ngx-datatable-footer' })
], DatatableFooterDirective);

var __decorate$17 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$16 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableColumnHeaderDirective = class DataTableColumnHeaderDirective {
    constructor(template) {
        this.template = template;
    }
};
DataTableColumnHeaderDirective = __decorate$17([
    Directive({ selector: '[ngx-datatable-header-template]' }),
    __metadata$16("design:paramtypes", [TemplateRef])
], DataTableColumnHeaderDirective);

var __decorate$18 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableColumnCellDirective = class DataTableColumnCellDirective {
    constructor(template) {
        this.template = template;
    }
};
DataTableColumnCellDirective = __decorate$18([
    Directive({ selector: '[ngx-datatable-cell-template]' }),
    __metadata$17("design:paramtypes", [TemplateRef])
], DataTableColumnCellDirective);

var __decorate$16 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DataTableColumnDirective = class DataTableColumnDirective {
};
__decorate$16([
    Input(),
    __metadata$15("design:type", String)
], DataTableColumnDirective.prototype, "name", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "prop", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "frozenLeft", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "frozenRight", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Number)
], DataTableColumnDirective.prototype, "flexGrow", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Boolean)
], DataTableColumnDirective.prototype, "resizeable", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "comparator", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "pipe", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Boolean)
], DataTableColumnDirective.prototype, "sortable", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Boolean)
], DataTableColumnDirective.prototype, "draggable", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Boolean)
], DataTableColumnDirective.prototype, "canAutoResize", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Number)
], DataTableColumnDirective.prototype, "minWidth", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Number)
], DataTableColumnDirective.prototype, "width", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Number)
], DataTableColumnDirective.prototype, "maxWidth", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Boolean)
], DataTableColumnDirective.prototype, "checkboxable", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Boolean)
], DataTableColumnDirective.prototype, "headerCheckboxable", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "headerClass", void 0);
__decorate$16([
    Input(),
    __metadata$15("design:type", Object)
], DataTableColumnDirective.prototype, "cellClass", void 0);
__decorate$16([
    Input(),
    ContentChild(DataTableColumnCellDirective, { read: TemplateRef }),
    __metadata$15("design:type", TemplateRef)
], DataTableColumnDirective.prototype, "cellTemplate", void 0);
__decorate$16([
    Input(),
    ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef }),
    __metadata$15("design:type", TemplateRef)
], DataTableColumnDirective.prototype, "headerTemplate", void 0);
DataTableColumnDirective = __decorate$16([
    Directive({ selector: 'ngx-datatable-column' })
], DataTableColumnDirective);

var __decorate$20 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$19 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DatatableRowDetailTemplateDirective = class DatatableRowDetailTemplateDirective {
    constructor(template) {
        this.template = template;
    }
};
DatatableRowDetailTemplateDirective = __decorate$20([
    Directive({
        selector: '[ngx-datatable-row-detail-template]'
    }),
    __metadata$19("design:paramtypes", [TemplateRef])
], DatatableRowDetailTemplateDirective);

var __decorate$19 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$18 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DatatableRowDetailDirective = class DatatableRowDetailDirective {
    constructor() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         */
        this.toggle = new EventEmitter();
    }
    /**
     * Toggle the expansion of the row
     */
    toggleExpandRow(row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    }
    /**
     * API method to expand all the rows.
     */
    expandAllRows() {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    }
    /**
     * API method to collapse all the rows.
     */
    collapseAllRows() {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    }
};
__decorate$19([
    Input(),
    __metadata$18("design:type", Object)
], DatatableRowDetailDirective.prototype, "rowHeight", void 0);
__decorate$19([
    Input(),
    ContentChild(DatatableRowDetailTemplateDirective, { read: TemplateRef }),
    __metadata$18("design:type", TemplateRef)
], DatatableRowDetailDirective.prototype, "template", void 0);
__decorate$19([
    Output(),
    __metadata$18("design:type", EventEmitter)
], DatatableRowDetailDirective.prototype, "toggle", void 0);
DatatableRowDetailDirective = __decorate$19([
    Directive({ selector: 'ngx-datatable-row-detail' })
], DatatableRowDetailDirective);

var __decorate$21 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$20 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DatatableComponent = class DatatableComponent {
    constructor(scrollbarHelper, cd, element, differs) {
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         */
        this.columnMode = ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         */
        this.externalSorting = false;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         */
        this.reorderable = true;
        /**
         * The type of sorting
         */
        this.sortType = SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         */
        this.sorts = [];
        /**
         * Css class overrides
         */
        this.cssClasses = {
            sortAscending: 'datatable-icon-up',
            sortDescending: 'datatable-icon-down',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * emptyMessage     [default] = 'No data to display'
         * totalMessage     [default] = 'total'
         * selectedMessage  [default] = 'selected'
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        };
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         */
        this.rowIdentity = ((x) => x);
        /**
         * A boolean you can use to set the detault behaviour of rows and groups
         * whether they will start expanded or not. If ommited the default is NOT expanded.
         *
         */
        this.groupExpansionDefault = false;
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         */
        this.scroll = new EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         */
        this.activate = new EventEmitter();
        /**
         * A cell or row was selected.
         */
        this.select = new EventEmitter();
        /**
         * Column sort was invoked.
         */
        this.sort = new EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         */
        this.page = new EventEmitter();
        /**
         * Columns were re-ordered.
         */
        this.reorder = new EventEmitter();
        /**
         * Column was resized.
         */
        this.resize = new EventEmitter();
        /**
         * The context menu was invoked on the table.
         * type indicates whether the header or the body was clicked.
         * content contains either the column or the row that was clicked.
         */
        this.tableContextmenu = new EventEmitter(false);
        this.rowCount = 0;
        this.offsetX = 0;
        this._count = 0;
        this._offset = 0;
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
    }
    /**
     * Rows that are displayed in the table.
     */
    set rows(val) {
        this._rows = val;
        // auto sort on new updates
        if (!this.externalSorting) {
            this._internalRows = sortRows(val, this._internalColumns, this.sorts);
        }
        else {
            this._internalRows = [...val];
        }
        // recalculate sizes/etc
        this.recalculate();
        if (this._rows && this._groupRowsBy) {
            // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
            this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
        }
        this.cd.markForCheck();
    }
    /**
     * Gets the rows.
     */
    get rows() {
        return this._rows;
    }
    /**
     * This attribute allows the user to set the name of the column to group the data with
     */
    set groupRowsBy(val) {
        if (val) {
            this._groupRowsBy = val;
            if (this._rows && this._groupRowsBy) {
                // cretes a new array with the data grouped
                this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
            }
        }
    }
    get groupRowsBy() {
        return this._groupRowsBy;
    }
    /**
     * Columns to be displayed.
     */
    set columns(val) {
        if (val) {
            this._internalColumns = [...val];
            setColumnDefaults(this._internalColumns);
            this.recalculateColumns();
        }
        this._columns = val;
    }
    /**
     * Get the columns.
     */
    get columns() {
        return this._columns;
    }
    /**
     * The page size to be shown.
     * Default value: `undefined`
     */
    set limit(val) {
        this._limit = val;
        // recalculate sizes/etc
        this.recalculate();
    }
    /**
     * Gets the limit.
     */
    get limit() {
        return this._limit;
    }
    /**
     * The total count of all rows.
     * Default value: `0`
     */
    set count(val) {
        this._count = val;
        // recalculate sizes/etc
        this.recalculate();
    }
    /**
     * Gets the count.
     */
    get count() {
        return this._count;
    }
    /**
     * The current offset ( page - 1 ) shown.
     * Default value: `0`
     */
    set offset(val) {
        this._offset = val;
    }
    get offset() {
        return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
    }
    /**
     * CSS class applied if the header height if fixed height.
     */
    get isFixedHeader() {
        const headerHeight = this.headerHeight;
        return (typeof headerHeight === 'string') ?
            headerHeight !== 'auto' : true;
    }
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     */
    get isFixedRow() {
        const rowHeight = this.rowHeight;
        return (typeof rowHeight === 'string') ?
            rowHeight !== 'auto' : true;
    }
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     */
    get isVertScroll() {
        return this.scrollbarV;
    }
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     */
    get isHorScroll() {
        return this.scrollbarH;
    }
    /**
     * CSS class applied to root element is selectable.
     */
    get isSelectable() {
        return this.selectionType !== undefined;
    }
    /**
     * CSS class applied to root is checkbox selection.
     */
    get isCheckboxSelection() {
        return this.selectionType === SelectionType.checkbox;
    }
    /**
     * CSS class applied to root if cell selection.
     */
    get isCellSelection() {
        return this.selectionType === SelectionType.cell;
    }
    /**
     * CSS class applied to root if single select.
     */
    get isSingleSelection() {
        return this.selectionType === SelectionType.single;
    }
    /**
     * CSS class added to root element if mulit select
     */
    get isMultiSelection() {
        return this.selectionType === SelectionType.multi;
    }
    /**
     * CSS class added to root element if mulit click select
     */
    get isMultiClickSelection() {
        return this.selectionType === SelectionType.multiClick;
    }
    /**
     * Column templates gathered from `ContentChildren`
     * if described in your markup.
     */
    set columnTemplates(val) {
        this._columnTemplates = val;
        if (val) {
            // only set this if results were brought back
            const arr = val.toArray();
            if (arr.length) {
                // translate them to normal objects
                this._internalColumns = translateTemplates(arr);
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
            }
        }
    }
    /**
     * Returns the column templates.
     */
    get columnTemplates() {
        return this._columnTemplates;
    }
    /**
     * Returns if all rows are selected.
     */
    get allRowsSelected() {
        return this.selected &&
            this.rows &&
            this.rows.length !== 0 &&
            this.selected.length === this.rows.length;
    }
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    ngOnInit() {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    }
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     */
    ngAfterViewInit() {
        if (!this.externalSorting) {
            this._internalRows = sortRows(this._rows, this._internalColumns, this.sorts);
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        requestAnimationFrame(() => {
            this.recalculate();
            // emit page for virtual server-side kickoff
            if (this.externalPaging && this.scrollbarV) {
                this.page.emit({
                    count: this.count,
                    pageSize: this.pageSize,
                    limit: this.limit,
                    offset: 0
                });
            }
        });
    }
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    groupArrayBy(originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        const map = new Map();
        originalArray.forEach((item) => {
            const key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            
        });
        const addGroup = (key, value) => {
            return { key, value };
        };
        // convert map back to a simple array of objects
        return Array.from(map, x => addGroup(x[0], x[1]));
    }
    /*
    * Lifecycle hook that is called when Angular dirty checks a directive.
    */
    ngDoCheck() {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this._internalRows = sortRows(this._rows, this._internalColumns, this.sorts);
            }
            else {
                this._internalRows = [...this.rows];
            }
            this.recalculatePages();
            this.cd.markForCheck();
        }
    }
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
    recalculate() {
        this.recalculateDims();
        this.recalculateColumns();
    }
    /**
     * Window resize handler to update sizes.
     */
    onWindowResize() {
        this.recalculate();
    }
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    recalculateColumns(columns = this._internalColumns, forceIdx = -1, allowBleed = this.scrollbarH) {
        if (!columns)
            return;
        let width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.columnMode === ColumnMode.force) {
            forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === ColumnMode.flex) {
            adjustColumnWidths(columns, width);
        }
        return columns;
    }
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    recalculateDims() {
        const dims = this.element.getBoundingClientRect();
        this.innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            let height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    }
    /**
     * Recalculates the pages after a update.
     */
    recalculatePages() {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    }
    /**
     * Body triggered a page event.
     */
    onBodyPage({ offset }) {
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    }
    /**
     * The body triggered a scroll event.
     */
    onBodyScroll(event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    }
    /**
     * The footer triggered a page event.
     */
    onFooterPage(event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    }
    /**
     * Recalculates the sizes of the page
     */
    calcPageSize(val = this.rows) {
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV) {
            const size = Math.ceil(this.bodyHeight / this.rowHeight);
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
    }
    /**
     * Calculates the row count.
     */
    calcRowCount(val = this.rows) {
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
    }
    /**
     * The header triggered a contextmenu event.
     */
    onColumnContextmenu({ event, column }) {
        this.tableContextmenu.emit({ event, type: ContextmenuType.header, content: column });
    }
    /**
     * The body triggered a contextmenu event.
     */
    onRowContextmenu({ event, row }) {
        this.tableContextmenu.emit({ event, type: ContextmenuType.body, content: row });
    }
    /**
     * The header triggered a column resize event.
     */
    onColumnResize({ column, newValue }) {
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        let idx;
        const cols = this._internalColumns.map((c, i) => {
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
        this._internalColumns = cols;
        this.resize.emit({
            column,
            newValue
        });
    }
    /**
     * The header triggered a column re-order event.
     */
    onColumnReorder({ column, newValue, prevValue }) {
        const cols = this._internalColumns.map(c => {
            return Object.assign({}, c);
        });
        const prevCol = cols[newValue];
        cols[newValue] = column;
        cols[prevValue] = prevCol;
        this._internalColumns = cols;
        this.reorder.emit({
            column,
            newValue,
            prevValue
        });
    }
    /**
     * The header triggered a column sort event.
     */
    onColumnSort(event) {
        const { sorts } = event;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this._internalRows = sortRows(this.rows, this._internalColumns, sorts);
        }
        this.sorts = sorts;
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    }
    /**
     * Toggle all row selection
     */
    onHeaderSelect(event) {
        // before we splice, chk if we currently have all selected
        const allSelected = this.selected.length === this.rows.length;
        // remove all existing either way
        this.selected = [];
        // do the opposite here
        if (!allSelected) {
            this.selected.push(...this.rows);
        }
        this.select.emit({
            selected: this.selected
        });
    }
    /**
     * A row was selected from body
     */
    onBodySelect(event) {
        this.select.emit(event);
    }
};
__decorate$21([
    Input(),
    __metadata$20("design:type", Object),
    __metadata$20("design:paramtypes", [Object])
], DatatableComponent.prototype, "rows", null);
__decorate$21([
    Input(),
    __metadata$20("design:type", String),
    __metadata$20("design:paramtypes", [String])
], DatatableComponent.prototype, "groupRowsBy", null);
__decorate$21([
    Input(),
    __metadata$20("design:type", Array)
], DatatableComponent.prototype, "groupedRows", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Array),
    __metadata$20("design:paramtypes", [Array])
], DatatableComponent.prototype, "columns", null);
__decorate$21([
    Input(),
    __metadata$20("design:type", Array)
], DatatableComponent.prototype, "selected", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "scrollbarV", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "scrollbarH", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Number)
], DatatableComponent.prototype, "rowHeight", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", String)
], DatatableComponent.prototype, "columnMode", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Object)
], DatatableComponent.prototype, "headerHeight", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Number)
], DatatableComponent.prototype, "footerHeight", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "externalPaging", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "externalSorting", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Object),
    __metadata$20("design:paramtypes", [Object])
], DatatableComponent.prototype, "limit", null);
__decorate$21([
    Input(),
    __metadata$20("design:type", Number),
    __metadata$20("design:paramtypes", [Number])
], DatatableComponent.prototype, "count", null);
__decorate$21([
    Input(),
    __metadata$20("design:type", Number),
    __metadata$20("design:paramtypes", [Number])
], DatatableComponent.prototype, "offset", null);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "loadingIndicator", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", String)
], DatatableComponent.prototype, "selectionType", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "reorderable", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", String)
], DatatableComponent.prototype, "sortType", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Array)
], DatatableComponent.prototype, "sorts", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Object)
], DatatableComponent.prototype, "cssClasses", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Object)
], DatatableComponent.prototype, "messages", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Function)
], DatatableComponent.prototype, "rowIdentity", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Object)
], DatatableComponent.prototype, "rowClass", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Object)
], DatatableComponent.prototype, "selectCheck", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Function)
], DatatableComponent.prototype, "displayCheck", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", Boolean)
], DatatableComponent.prototype, "groupExpansionDefault", void 0);
__decorate$21([
    Input(),
    __metadata$20("design:type", String)
], DatatableComponent.prototype, "trackByProp", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "scroll", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "activate", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "select", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "sort", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "page", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "reorder", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", EventEmitter)
], DatatableComponent.prototype, "resize", void 0);
__decorate$21([
    Output(),
    __metadata$20("design:type", Object)
], DatatableComponent.prototype, "tableContextmenu", void 0);
__decorate$21([
    HostBinding('class.fixed-header'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isFixedHeader", null);
__decorate$21([
    HostBinding('class.fixed-row'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isFixedRow", null);
__decorate$21([
    HostBinding('class.scroll-vertical'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isVertScroll", null);
__decorate$21([
    HostBinding('class.scroll-horz'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isHorScroll", null);
__decorate$21([
    HostBinding('class.selectable'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isSelectable", null);
__decorate$21([
    HostBinding('class.checkbox-selection'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isCheckboxSelection", null);
__decorate$21([
    HostBinding('class.cell-selection'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isCellSelection", null);
__decorate$21([
    HostBinding('class.single-selection'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isSingleSelection", null);
__decorate$21([
    HostBinding('class.multi-selection'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isMultiSelection", null);
__decorate$21([
    HostBinding('class.multi-click-selection'),
    __metadata$20("design:type", Boolean),
    __metadata$20("design:paramtypes", [])
], DatatableComponent.prototype, "isMultiClickSelection", null);
__decorate$21([
    ContentChildren(DataTableColumnDirective),
    __metadata$20("design:type", QueryList),
    __metadata$20("design:paramtypes", [QueryList])
], DatatableComponent.prototype, "columnTemplates", null);
__decorate$21([
    ContentChild(DatatableRowDetailDirective),
    __metadata$20("design:type", DatatableRowDetailDirective)
], DatatableComponent.prototype, "rowDetail", void 0);
__decorate$21([
    ContentChild(DatatableGroupHeaderDirective),
    __metadata$20("design:type", DatatableGroupHeaderDirective)
], DatatableComponent.prototype, "groupHeader", void 0);
__decorate$21([
    ContentChild(DatatableFooterDirective),
    __metadata$20("design:type", DatatableFooterDirective)
], DatatableComponent.prototype, "footer", void 0);
__decorate$21([
    ViewChild(DataTableBodyComponent),
    __metadata$20("design:type", DataTableBodyComponent)
], DatatableComponent.prototype, "bodyComponent", void 0);
__decorate$21([
    HostListener('window:resize'),
    throttleable(5),
    __metadata$20("design:type", Function),
    __metadata$20("design:paramtypes", []),
    __metadata$20("design:returntype", void 0)
], DatatableComponent.prototype, "onWindowResize", null);
DatatableComponent = __decorate$21([
    Component({
        selector: 'ngx-datatable',
        template: `
    <div
      visibilityObserver
      (visible)="recalculate()">
      <datatable-header
        *ngIf="headerHeight"
        [sorts]="sorts"
        [sortType]="sortType"
        [scrollbarH]="scrollbarH"
        [innerWidth]="innerWidth"
        [offsetX]="offsetX"
        [dealsWithGroup]="groupedRows"
        [columns]="_internalColumns"
        [headerHeight]="headerHeight"
        [reorderable]="reorderable"
        [sortAscendingIcon]="cssClasses.sortAscending"
        [sortDescendingIcon]="cssClasses.sortDescending"
        [allRowsSelected]="allRowsSelected"
        [selectionType]="selectionType"
        (sort)="onColumnSort($event)"
        (resize)="onColumnResize($event)"
        (reorder)="onColumnReorder($event)"
        (select)="onHeaderSelect($event)"
        (columnContextmenu)="onColumnContextmenu($event)">
      </datatable-header>
      <datatable-body
        [groupRowsBy]="groupRowsBy"
        [groupedRows]="groupedRows"
        [rows]="_internalRows"
        [groupExpansionDefault]="groupExpansionDefault"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [loadingIndicator]="loadingIndicator"
        [externalPaging]="externalPaging"
        [rowHeight]="rowHeight"
        [rowCount]="rowCount"
        [offset]="offset"
        [trackByProp]="trackByProp"
        [columns]="_internalColumns"
        [pageSize]="pageSize"
        [offsetX]="offsetX"
        [rowDetail]="rowDetail"
        [groupHeader]="groupHeader"
        [selected]="selected"
        [innerWidth]="innerWidth"
        [bodyHeight]="bodyHeight"
        [selectionType]="selectionType"
        [emptyMessage]="messages.emptyMessage"
        [rowIdentity]="rowIdentity"
        [rowClass]="rowClass"
        [selectCheck]="selectCheck"
        [displayCheck]="displayCheck"
        (page)="onBodyPage($event)"
        (activate)="activate.emit($event)"
        (rowContextmenu)="onRowContextmenu($event)"
        (select)="onBodySelect($event)"
        (scroll)="onBodyScroll($event)">
      </datatable-body>
      <datatable-footer
        *ngIf="footerHeight"
        [rowCount]="rowCount"
        [pageSize]="pageSize"
        [offset]="offset"
        [footerHeight]="footerHeight"
        [footerTemplate]="footer"
        [totalMessage]="messages.totalMessage"
        [pagerLeftArrowIcon]="cssClasses.pagerLeftArrow"
        [pagerRightArrowIcon]="cssClasses.pagerRightArrow"
        [pagerPreviousIcon]="cssClasses.pagerPrevious"
        [selectedCount]="selected.length"
        [selectedMessage]="!!selectionType && messages.selectedMessage"
        [pagerNextIcon]="cssClasses.pagerNext"
        (page)="onFooterPage($event)">
      </datatable-footer>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styleUrls: ['./datatable.component.scss'],
        host: {
            class: 'ngx-datatable'
        }
    }),
    __metadata$20("design:paramtypes", [ScrollbarHelper,
        ChangeDetectorRef,
        ElementRef,
        KeyValueDiffers])
], DatatableComponent);

var __decorate$23 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$21 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
let DraggableDirective = class DraggableDirective {
    constructor(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new EventEmitter();
        this.dragging = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    }
    ngOnDestroy() {
        this._destroySubscription();
    }
    onMouseup(event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    onMousedown(event) {
        // we only want to drag the inner header text
        const isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            const mouseDownPos = { x: event.clientX, y: event.clientY };
            const mouseup = Observable$1.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe((ev) => this.onMouseup(ev));
            const mouseMoveSub = Observable$1.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe((ev) => this.move(ev, mouseDownPos));
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    move(event, mouseDownPos) {
        if (!this.isDragging)
            return;
        const x = event.clientX - mouseDownPos.x;
        const y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = `${x}px`;
        if (this.dragY)
            this.element.style.top = `${y}px`;
        this.element.classList.add('dragging');
        this.dragging.emit({
            event,
            element: this.element,
            model: this.dragModel
        });
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
};
__decorate$23([
    Input(),
    __metadata$21("design:type", Object)
], DraggableDirective.prototype, "dragEventTarget", void 0);
__decorate$23([
    Input(),
    __metadata$21("design:type", Object)
], DraggableDirective.prototype, "dragModel", void 0);
__decorate$23([
    Input(),
    __metadata$21("design:type", Boolean)
], DraggableDirective.prototype, "dragX", void 0);
__decorate$23([
    Input(),
    __metadata$21("design:type", Boolean)
], DraggableDirective.prototype, "dragY", void 0);
__decorate$23([
    Output(),
    __metadata$21("design:type", EventEmitter)
], DraggableDirective.prototype, "dragStart", void 0);
__decorate$23([
    Output(),
    __metadata$21("design:type", EventEmitter)
], DraggableDirective.prototype, "dragging", void 0);
__decorate$23([
    Output(),
    __metadata$21("design:type", EventEmitter)
], DraggableDirective.prototype, "dragEnd", void 0);
DraggableDirective = __decorate$23([
    Directive({ selector: '[draggable]' }),
    __metadata$21("design:paramtypes", [ElementRef])
], DraggableDirective);

var __decorate$24 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$22 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let LongPressDirective = class LongPressDirective {
    constructor() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new EventEmitter();
        this.longPressing = new EventEmitter();
        this.longPressEnd = new EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    get press() { return this.pressing; }
    get isLongPress() {
        return this.isLongPressing;
    }
    onMouseDown(event) {
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        const target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        const mouseup = Observable$1.fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe((ev) => this.onMouseup());
        this.timeout = setTimeout(() => {
            this.isLongPressing = true;
            this.longPressStart.emit({
                event,
                model: this.pressModel
            });
            this.subscription.add(Observable$1.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe((mouseEvent) => this.onMouseMove(mouseEvent)));
            this.loop(event);
        }, this.duration);
        this.loop(event);
    }
    onMouseMove(event) {
        if (this.pressing && !this.isLongPressing) {
            const xThres = Math.abs(event.clientX - this.mouseX) > 10;
            const yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    }
    loop(event) {
        if (this.isLongPressing) {
            this.timeout = setTimeout(() => {
                this.longPressing.emit({
                    event,
                    model: this.pressModel
                });
                this.loop(event);
            }, 50);
        }
    }
    endPress() {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    }
    onMouseup() {
        this.endPress();
    }
    ngOnDestroy() {
        this._destroySubscription();
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
};
__decorate$24([
    Input(),
    __metadata$22("design:type", Boolean)
], LongPressDirective.prototype, "pressEnabled", void 0);
__decorate$24([
    Input(),
    __metadata$22("design:type", Object)
], LongPressDirective.prototype, "pressModel", void 0);
__decorate$24([
    Input(),
    __metadata$22("design:type", Number)
], LongPressDirective.prototype, "duration", void 0);
__decorate$24([
    Output(),
    __metadata$22("design:type", EventEmitter)
], LongPressDirective.prototype, "longPressStart", void 0);
__decorate$24([
    Output(),
    __metadata$22("design:type", EventEmitter)
], LongPressDirective.prototype, "longPressing", void 0);
__decorate$24([
    Output(),
    __metadata$22("design:type", EventEmitter)
], LongPressDirective.prototype, "longPressEnd", void 0);
__decorate$24([
    HostBinding('class.press'),
    __metadata$22("design:type", Boolean),
    __metadata$22("design:paramtypes", [])
], LongPressDirective.prototype, "press", null);
__decorate$24([
    HostBinding('class.longpress'),
    __metadata$22("design:type", Boolean),
    __metadata$22("design:paramtypes", [])
], LongPressDirective.prototype, "isLongPress", null);
__decorate$24([
    HostListener('mousedown', ['$event']),
    __metadata$22("design:type", Function),
    __metadata$22("design:paramtypes", [MouseEvent]),
    __metadata$22("design:returntype", void 0)
], LongPressDirective.prototype, "onMouseDown", null);
LongPressDirective = __decorate$24([
    Directive({ selector: '[long-press]' })
], LongPressDirective);

var __decorate$25 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$23 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
let OrderableDirective = class OrderableDirective {
    constructor(differs, document) {
        this.document = document;
        this.reorder = new EventEmitter();
        this.differ = differs.find({}).create();
    }
    ngAfterContentInit() {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    }
    ngOnDestroy() {
        this.draggables.forEach(d => {
            d.dragStart.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    }
    updateSubscriptions() {
        const diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            const subscribe = ({ currentValue, previousValue }) => {
                unsubscribe({ previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(this.onDragStart.bind(this));
                    currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
                }
            };
            const unsubscribe = ({ previousValue }) => {
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            };
            diffs.forEachAddedItem(subscribe.bind(this));
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe.bind(this));
        }
    }
    onDragStart() {
        this.positions = {};
        let i = 0;
        for (const dragger of this.draggables.toArray()) {
            const elm = dragger.element;
            const left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    }
    onDragEnd({ element, model, event }) {
        const prevPos = this.positions[model.prop];
        const target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model
            });
        }
        element.style.left = 'auto';
    }
    isTarget(model, event) {
        let i = 0;
        const x = event.x || event.clientX;
        const y = event.y || event.clientY;
        const targets = this.document.elementsFromPoint(x, y);
        for (const prop in this.positions) {
            // current column position which throws event.
            const pos = this.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find((el) => el === pos.element)) {
                return {
                    pos,
                    i
                };
            }
            i++;
        }
    }
    createMapDiffs() {
        return this.draggables.toArray()
            .reduce((acc, curr) => {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }, {});
    }
};
__decorate$25([
    Output(),
    __metadata$23("design:type", EventEmitter)
], OrderableDirective.prototype, "reorder", void 0);
__decorate$25([
    ContentChildren(DraggableDirective, { descendants: true }),
    __metadata$23("design:type", QueryList)
], OrderableDirective.prototype, "draggables", void 0);
OrderableDirective = __decorate$25([
    Directive({ selector: '[orderable]' }),
    __param$1(1, Inject(DOCUMENT)),
    __metadata$23("design:paramtypes", [KeyValueDiffers, Object])
], OrderableDirective);

var __decorate$26 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$24 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let ResizeableDirective = class ResizeableDirective {
    constructor(element) {
        this.resizeEnabled = true;
        this.resize = new EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ngAfterViewInit() {
        if (this.resizeEnabled) {
            const node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    ngOnDestroy() {
        this._destroySubscription();
    }
    onMouseup() {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    }
    onMousedown(event) {
        const isHandle = (event.target).classList.contains('resize-handle');
        const initialWidth = this.element.clientWidth;
        const mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            const mouseup = Observable$1.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe((ev) => this.onMouseup());
            const mouseMoveSub = Observable$1.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe((e) => this.move(e, initialWidth, mouseDownScreenX));
            this.subscription.add(mouseMoveSub);
        }
    }
    move(event, initialWidth, mouseDownScreenX) {
        const movementX = event.screenX - mouseDownScreenX;
        const newWidth = initialWidth + movementX;
        const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = `${newWidth}px`;
        }
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
};
__decorate$26([
    Input(),
    __metadata$24("design:type", Boolean)
], ResizeableDirective.prototype, "resizeEnabled", void 0);
__decorate$26([
    Input(),
    __metadata$24("design:type", Number)
], ResizeableDirective.prototype, "minWidth", void 0);
__decorate$26([
    Input(),
    __metadata$24("design:type", Number)
], ResizeableDirective.prototype, "maxWidth", void 0);
__decorate$26([
    Output(),
    __metadata$24("design:type", EventEmitter)
], ResizeableDirective.prototype, "resize", void 0);
__decorate$26([
    HostListener('mousedown', ['$event']),
    __metadata$24("design:type", Function),
    __metadata$24("design:paramtypes", [MouseEvent]),
    __metadata$24("design:returntype", void 0)
], ResizeableDirective.prototype, "onMousedown", null);
ResizeableDirective = __decorate$26([
    Directive({
        selector: '[resizeable]',
        host: {
            '[class.resizeable]': 'resizeEnabled'
        }
    }),
    __metadata$24("design:paramtypes", [ElementRef])
], ResizeableDirective);

var __decorate$27 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$25 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
let VisibilityDirective = class VisibilityDirective {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new EventEmitter();
    }
    ngOnInit() {
        this.runCheck();
    }
    ngOnDestroy() {
        clearTimeout(this.timeout);
    }
    onVisibilityChange() {
        // trigger zone recalc for columns
        this.zone.run(() => {
            this.isVisible = true;
            this.visible.emit(true);
        });
    }
    runCheck() {
        const check = () => {
            // https://davidwalsh.name/offsetheight-visibility
            const { offsetHeight, offsetWidth } = this.element.nativeElement;
            if (offsetHeight && offsetWidth) {
                clearTimeout(this.timeout);
                this.onVisibilityChange();
            }
            else {
                clearTimeout(this.timeout);
                this.zone.runOutsideAngular(() => {
                    this.timeout = setTimeout(() => check(), 50);
                });
            }
        };
        this.timeout = setTimeout(() => check());
    }
};
__decorate$27([
    HostBinding('class.visible'),
    __metadata$25("design:type", Boolean)
], VisibilityDirective.prototype, "isVisible", void 0);
__decorate$27([
    Output(),
    __metadata$25("design:type", EventEmitter)
], VisibilityDirective.prototype, "visible", void 0);
VisibilityDirective = __decorate$27([
    Directive({ selector: '[visibilityObserver]' }),
    __metadata$25("design:paramtypes", [ElementRef, NgZone])
], VisibilityDirective);

var __decorate$22 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let NgxDatatableModule = class NgxDatatableModule {
};
NgxDatatableModule = __decorate$22([
    NgModule({
        imports: [
            CommonModule
        ],
        providers: [
            ScrollbarHelper
        ],
        declarations: [
            DataTableFooterTemplateDirective,
            VisibilityDirective,
            DraggableDirective,
            ResizeableDirective,
            OrderableDirective,
            LongPressDirective,
            ScrollerComponent,
            DatatableComponent,
            DataTableColumnDirective,
            DataTableHeaderComponent,
            DataTableHeaderCellComponent,
            DataTableBodyComponent,
            DataTableFooterComponent,
            DataTablePagerComponent,
            ProgressBarComponent,
            DataTableBodyRowComponent,
            DataTableRowWrapperComponent,
            DatatableRowDetailDirective,
            DatatableGroupHeaderDirective,
            DatatableRowDetailTemplateDirective,
            DataTableBodyCellComponent,
            DataTableSelectionComponent,
            DataTableColumnHeaderDirective,
            DataTableColumnCellDirective,
            DatatableFooterDirective,
            DatatableGroupHeaderTemplateDirective
        ],
        exports: [
            DatatableComponent,
            DatatableRowDetailDirective,
            DatatableGroupHeaderDirective,
            DatatableRowDetailTemplateDirective,
            DataTableColumnDirective,
            DataTableColumnHeaderDirective,
            DataTableColumnCellDirective,
            DataTableFooterTemplateDirective,
            DatatableFooterDirective,
            DataTablePagerComponent,
            DatatableGroupHeaderTemplateDirective
        ]
    })
], NgxDatatableModule);

export { ColumnMode, SortType, SortDirection, SelectionType, ClickType, ContextmenuType, DataTableHeaderComponent, DataTableHeaderCellComponent, DataTableBodyComponent, DataTableBodyCellComponent, DataTableBodyRowComponent, ProgressBarComponent, ScrollerComponent, DataTableRowWrapperComponent, DataTableSelectionComponent, DatatableGroupHeaderDirective, DatatableGroupHeaderTemplateDirective, DataTableFooterComponent, DataTablePagerComponent, DatatableFooterDirective, DataTableFooterTemplateDirective, DataTableColumnDirective, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DatatableRowDetailDirective, DatatableRowDetailTemplateDirective, DatatableComponent, NgxDatatableModule };
