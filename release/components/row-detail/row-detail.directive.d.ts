import { EventEmitter, TemplateRef } from '@angular/core';
export declare class DatatableRowDetailDirective {
    /**
     * The detail row height is required especially
     * when virtual scroll is enabled.
     *
     * @type {number|function(row?:any,index?:number): number}
     * @memberOf DatatableComponent
     */
    rowHeight: (number | ((row?: any, index?: number) => number));
    template: TemplateRef<any>;
    /**
     * Row detail row visbility was toggled.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableComponent
     */
    toggle: EventEmitter<any>;
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    toggleExpandRow(row: any): void;
    /**
     * API method to expand all the rows.
     *
     * @memberOf DatatableComponent
     */
    expandAllRows(): void;
    /**
     * API method to collapse all the rows.
     *
     * @memberOf DatatableComponent
     */
    collapseAllRows(): void;
}
