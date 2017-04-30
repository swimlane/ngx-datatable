import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RowHeightCache } from '../../utils';
import { SelectionType } from '../../types';
import { ScrollerComponent } from './scroller.component';
export declare class DataTableBodyComponent implements OnInit, OnDestroy {
    scrollbarV: boolean;
    scrollbarH: boolean;
    loadingIndicator: boolean;
    externalPaging: boolean;
    rowHeight: number;
    offsetX: number;
    emptyMessage: string;
    selectionType: SelectionType;
    selected: any[];
    rowIdentity: any;
    rowDetail: any;
    selectCheck: any;
    trackByProp: string;
    rowClass: any;
    pageSize: number;
    rows: any[];
    columns: any[];
    offset: number;
    rowCount: number;
    innerWidth: number;
    readonly bodyWidth: string;
    bodyHeight: any;
    scroll: EventEmitter<any>;
    page: EventEmitter<any>;
    activate: EventEmitter<any>;
    select: EventEmitter<any>;
    detailToggle: EventEmitter<any>;
    rowContextmenu: EventEmitter<{
        event: MouseEvent;
        row: any;
    }>;
    scroller: ScrollerComponent;
    /**
     * Returns if selection is enabled.
     *
     * @readonly
     * @type {boolean}
     * @memberOf DataTableBodyComponent
     */
    readonly selectEnabled: boolean;
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     *
     * @readonly
     * @type {number}
     * @memberOf DataTableBodyComponent
     */
    readonly scrollHeight: number;
    rowHeightsCache: RowHeightCache;
    temp: any[];
    offsetY: number;
    indexes: any;
    columnGroupWidths: any;
    rowTrackingFn: any;
    listener: any;
    _rows: any[];
    _bodyHeight: any;
    _columns: any[];
    _rowCount: number;
    _offset: number;
    _pageSize: number;
    /**
     * Creates an instance of DataTableBodyComponent.
     *
     * @memberOf DataTableBodyComponent
     */
    constructor();
    /**
     * Called after the constructor, initializing input properties
     *
     * @memberOf DataTableBodyComponent
     */
    ngOnInit(): void;
    /**
     * Called once, before the instance is destroyed.
     *
     * @memberOf DataTableBodyComponent
     */
    ngOnDestroy(): void;
    /**
     * Updates the Y offset given a new offset.
     *
     * @param {number} [offset]
     *
     * @memberOf DataTableBodyComponent
     */
    updateOffsetY(offset?: number): void;
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     *
     * @param {*} event
     *
     * @memberOf DataTableBodyComponent
     */
    onBodyScroll(event: any): void;
    /**
     * Updates the page given a direction.
     *
     * @param {string} direction
     *
     * @memberOf DataTableBodyComponent
     */
    updatePage(direction: string): void;
    /**
     * Updates the rows in the view port
     *
     * @memberOf DataTableBodyComponent
     */
    updateRows(): void;
    /**
     * Get the row height
     *
     * @param {*} row
     * @returns {number}
     *
     * @memberOf DataTableBodyComponent
     */
    getRowHeight(row: any): number;
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param {*} row the row for which the height need to be calculated.
     * @returns {number} height of the row.
     *
     * @memberOf DataTableBodyComponent
     */
    getRowAndDetailHeight(row: any): number;
    /**
     * Get the height of the detail row.
     *
     * @param {*} [row]
     * @param {*} [index]
     * @returns {number}
     *
     * @memberOf DataTableBodyComponent
     */
    getDetailRowHeight: (row?: any, index?: any) => number;
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param {*} row The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getRowsStyles(row: any): any;
    /**
     * Hides the loading indicator
     *
     *
     * @memberOf DataTableBodyComponent
     */
    hideIndicator(): void;
    /**
     * Updates the index of the rows in the viewport
     *
     * @memberOf DataTableBodyComponent
     */
    updateIndexes(): void;
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     *
     * @returns {void}
     *
     * @memberOf DataTableBodyComponent
     */
    refreshRowHeightCache(): void;
    /**
     * Gets the index for the view port
     *
     * @returns {number}
     *
     * @memberOf DataTableBodyComponent
     */
    getAdjustedViewPortIndex(): number;
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param {*} row The row for which the expansion needs to be toggled.
     *
     * @memberOf DataTableBodyComponent
     */
    toggleRowExpansion(row: any): void;
    /**
     * Expand/Collapse all the rows no matter what their state is.
     *
     * @param {boolean} expanded When true, all rows are expanded and when false, all rows will be collapsed.
     *
     * @memberOf DataTableBodyComponent
     */
    toggleAllRows(expanded: boolean): void;
    /**
     * Recalculates the table
     *
     * @memberOf DataTableBodyComponent
     */
    recalcLayout(): void;
}
