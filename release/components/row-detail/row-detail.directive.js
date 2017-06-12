"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var row_detail_template_directive_1 = require("./row-detail-template.directive");
var DatatableRowDetailDirective = (function () {
    function DatatableRowDetailDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         *
         * @type {number|function(row?:any,index?:number): number}
         * @memberOf DatatableComponent
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.toggle = new core_1.EventEmitter();
    }
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DatatableRowDetailDirective.prototype.toggleExpandRow = function (row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    };
    /**
     * API method to expand all the rows.
     *
     * @memberOf DatatableComponent
     */
    DatatableRowDetailDirective.prototype.expandAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the rows.
     *
     * @memberOf DatatableComponent
     */
    DatatableRowDetailDirective.prototype.collapseAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    return DatatableRowDetailDirective;
}());
DatatableRowDetailDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: 'ngx-datatable-row-detail' },] },
];
/** @nocollapse */
DatatableRowDetailDirective.ctorParameters = function () { return []; };
DatatableRowDetailDirective.propDecorators = {
    'rowHeight': [{ type: core_1.Input },],
    'template': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [row_detail_template_directive_1.DatatableRowDetailTemplateDirective, { read: core_1.TemplateRef },] },],
    'toggle': [{ type: core_1.Output },],
};
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;
//# sourceMappingURL=row-detail.directive.js.map