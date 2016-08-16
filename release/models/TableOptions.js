"use strict";
var ColumnMode_1 = require('../enums/ColumnMode');
var SortType_1 = require('../enums/SortType');
var TableOptions = (function () {
    function TableOptions(props) {
        this.columns = [];
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.rowHeight = 30;
        this.columnMode = ColumnMode_1.ColumnMode.standard;
        this.loadingMessage = 'Loading...';
        this.emptyMessage = 'No data to display';
        this.headerHeight = 30;
        this.footerHeight = 0;
        this.externalPaging = false;
        this.limit = undefined;
        this.count = 0;
        this.offset = 0;
        this.loadingIndicator = false;
        this.reorderable = true;
        this.sortType = SortType_1.SortType.single;
        this.sorts = [];
        Object.assign(this, props);
    }
    return TableOptions;
}());
exports.TableOptions = TableOptions;
//# sourceMappingURL=TableOptions.js.map