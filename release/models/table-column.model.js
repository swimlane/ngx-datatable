"use strict";
var utils_1 = require('../utils');
/**
 * Default Column Options
 * @type {object}
 */
var TableColumn = (function () {
    function TableColumn(props) {
        // unique id
        this.$$id = utils_1.id();
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
            this.prop = utils_1.camelCase(this.name);
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
exports.TableColumn = TableColumn;
//# sourceMappingURL=table-column.model.js.map