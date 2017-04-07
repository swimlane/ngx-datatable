import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
var DatatableRowDetailDirective = (function () {
    function DatatableRowDetailDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         *
         * @type {number|function(row?:any,index?:any): number}
         * @memberOf DatatableComponent
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.toggle = new EventEmitter();
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
export { DatatableRowDetailDirective };
DatatableRowDetailDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-row-detail' },] },
];
/** @nocollapse */
DatatableRowDetailDirective.ctorParameters = function () { return []; };
DatatableRowDetailDirective.propDecorators = {
    'rowHeight': [{ type: Input },],
    'template': [{ type: Input }, { type: ContentChild, args: [DatatableRowDetailTemplateDirective, { read: TemplateRef },] },],
    'toggle': [{ type: Output },],
};
//# sourceMappingURL=row-detail.directive.js.map