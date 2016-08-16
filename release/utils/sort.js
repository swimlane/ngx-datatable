"use strict";
var SortType_1 = require('../enums/SortType');
var SortDirection_1 = require('../enums/SortDirection');
function nextSortDir(sortType, current) {
    if (sortType === SortType_1.SortType.single) {
        if (current === SortDirection_1.SortDirection.asc) {
            return SortDirection_1.SortDirection.desc;
        }
        else {
            return SortDirection_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return SortDirection_1.SortDirection.asc;
        }
        else if (current === SortDirection_1.SortDirection.asc) {
            return SortDirection_1.SortDirection.desc;
        }
        else if (current === SortDirection_1.SortDirection.desc) {
            return undefined;
        }
    }
}
exports.nextSortDir = nextSortDir;
;
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    return 0;
}
exports.orderByComparator = orderByComparator;
function sortRows(rows, dirs) {
    var temp = rows.slice();
    return temp.sort(function (a, b) {
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var _a = dirs_1[_i], prop = _a.prop, dir = _a.dir;
            var comparison = dir !== SortDirection_1.SortDirection.desc ?
                orderByComparator(a[prop], b[prop]) :
                -orderByComparator(a[prop], b[prop]);
            if (comparison !== 0)
                return comparison;
        }
        return 0;
    });
}
exports.sortRows = sortRows;
//# sourceMappingURL=sort.js.map