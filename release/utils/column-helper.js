"use strict";
var utils_1 = require('../utils');
function setColumnDefaults(columns) {
    if (!columns)
        return;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        if (!column.$$id) {
            column.$$id = utils_1.id();
        }
        // translate name => prop
        if (!column.prop && column.name) {
            column.prop = utils_1.camelCase(column.name);
        }
        // format props if no name passed
        if (column.prop && !column.name) {
            column.name = utils_1.deCamelCase(column.prop);
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
exports.setColumnDefaults = setColumnDefaults;
//# sourceMappingURL=column-helper.js.map