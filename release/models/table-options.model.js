"use strict";
var types_1 = require('../types');
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
        this.columnMode = types_1.ColumnMode.standard;
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
        this.sortType = types_1.SortType.single;
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
exports.TableOptions = TableOptions;
//# sourceMappingURL=table-options.model.js.map