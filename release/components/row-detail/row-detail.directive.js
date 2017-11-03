"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var row_detail_template_directive_1 = require("./row-detail-template.directive");
var DatatableRowDetailDirective = /** @class */ (function () {
    function DatatableRowDetailDirective() {
    }
    /**
     * Toggle the expansion of the row
     */
    /**
       * Toggle the expansion of the row
       */
    DatatableRowDetailDirective.prototype.toggleExpandRow = /**
       * Toggle the expansion of the row
       */
    function (row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    };
    /**
     * API method to expand all the rows.
     */
    /**
       * API method to expand all the rows.
       */
    DatatableRowDetailDirective.prototype.expandAllRows = /**
       * API method to expand all the rows.
       */
    function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the rows.
     */
    /**
       * API method to collapse all the rows.
       */
    DatatableRowDetailDirective.prototype.collapseAllRows = /**
       * API method to collapse all the rows.
       */
    function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    return DatatableRowDetailDirective;
}());
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;
//# sourceMappingURL=row-detail.directive.js.map