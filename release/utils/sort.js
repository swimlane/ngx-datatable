"use strict";
var types_1 = require('../types');
var deep_getter_1 = require('./deep-getter');
/**
 * Gets the next sort direction
 * @param  {SortType}      sortType
 * @param  {SortDirection} currentSort
 * @return {SortDirection}
 */
function nextSortDir(sortType, current) {
    if (sortType === types_1.SortType.single) {
        if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else {
            return types_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return types_1.SortDirection.asc;
        }
        else if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else if (current === types_1.SortDirection.desc) {
            return undefined;
        }
    }
}
exports.nextSortDir = nextSortDir;
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
exports.orderByComparator = orderByComparator;
/**
 * Sorts the rows
 *
 * @export
 * @param {any[]} rows
 * @param {any[]} columns
 * @param {any[]} dirs
 * @returns
 */
function sortRows(rows, columns, dirs) {
    if (!rows || !dirs || !columns)
        return rows;
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    return rows.slice().sort(function (a, b) {
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var _a = dirs_1[_i], prop = _a.prop, dir = _a.dir;
            var propA = deep_getter_1.deepValueGetter(a, prop);
            var propB = deep_getter_1.deepValueGetter(b, prop);
            var compareFn = cols[prop] || orderByComparator;
            var comparison = dir !== types_1.SortDirection.desc ?
                compareFn(propA, propB) :
                -compareFn(propA, propB);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        // equal each other
        return 0;
    });
}
exports.sortRows = sortRows;
//# sourceMappingURL=sort.js.map