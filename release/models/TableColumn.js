"use strict";
var id_1 = require('../utils/id');
var camelCase_1 = require('../utils/camelCase');
var TableColumn = (function () {
    function TableColumn(props) {
        this.$$id = id_1.id();
        this.isExpressive = false;
        this.frozenLeft = false;
        this.frozenRight = false;
        this.flexGrow = 0;
        this.minWidth = 0;
        this.maxWidth = undefined;
        this.width = 150;
        this.resizeable = true;
        this.comparator = undefined;
        this.pipe = null;
        this.sortable = true;
        this.draggable = true;
        this.canAutoResize = true;
        Object.assign(this, props);
        if (!this.prop && this.name) {
            this.prop = camelCase_1.camelCase(this.name);
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
//# sourceMappingURL=TableColumn.js.map