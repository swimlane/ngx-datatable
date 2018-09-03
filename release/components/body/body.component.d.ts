import { EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { RowHeightCache } from '../../utils';
import { SelectionType } from '../../types';
import { ScrollerComponent } from './scroller.component';
export declare class DataTableBodyComponent implements OnInit, OnDestroy {
    private cd;
    scrollbarV: boolean;
    scrollbarH: boolean;
    loadingIndicator: boolean;
    externalPaging: boolean;
    rowHeight: number | ((row?: any) => number);
    offsetX: number;
    emptyMessage: string;
    selectionType: SelectionType;
    selected: any[];
    rowIdentity: any;
    rowDetail: any;
    groupHeader: any;
    selectCheck: any;
    displayCheck: any;
    trackByProp: string;
    rowClass: any;
    groupedRows: any;
    groupExpansionDefault: boolean;
    innerWidth: number;
    groupRowsBy: string;
    virtualization: boolean;
    summaryRow: boolean;
    summaryPosition: string;
    summaryHeight: number;
    pageSize: number;
    rows: any[];
    columns: any[];
    offset: number;
    rowCount: number;
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
    treeAction: EventEmitter<any>;
    scroller: ScrollerComponent;
    /**
     * Returns if selection is enabled.
     */
    readonly selectEnabled: boolean;
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll and virtualization. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     */
    readonly scrollHeight: number | undefined;
    rowHeightsCache: RowHeightCache;
    temp: any[];
    offsetY: number;
    indexes: any;
    columnGroupWidths: any;
    columnGroupWidthsWithoutGroup: any;
    rowTrackingFn: any;
    listener: any;
    rowIndexes: any;
    rowExpansions: any;
    _rows: any[];
    _bodyHeight: any;
    _columns: any[];
    _rowCount: number;
    _offset: number;
    _pageSize: number;
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    constructor(cd: ChangeDetectorRef);
    /**
     * Called after the constructor, initializing input properties
     */
    ngOnInit(): void;
    /**
     * Called once, before the instance is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * Updates the Y offset given a new offset.
     */
    updateOffsetY(offset?: number): void;
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    onBodyScroll(event: any): void;
    /**
     * Updates the page given a direction.
     */
    updatePage(direction: string): void;
    /**
     * Updates the rows in the view port
     */
    updateRows(): void;
    /**
     * Get the row height
     */
    getRowHeight(row: any): number;
    /**
     * @param group the group with all rows
     */
    getGroupHeight(group: any): number;
    /**
     * Calculate row height based on the expanded state of the row.
     */
    getRowAndDetailHeight(row: any): number;
    /**
     * Get the height of the detail row.
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
     * @param {*} rows The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getRowsStyles(rows: any): any;
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getBottomSummaryRowStyles(): any;
    /**
     * Hides the loading indicator
     */
    hideIndicator(): void;
    /**
     * Updates the index of the rows in the viewport
     */
    updateIndexes(): void;
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    refreshRowHeightCache(): void;
    /**
     * Gets the index for the view port
     */
    getAdjustedViewPortIndex(): number;
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    toggleRowExpansion(row: any): void;
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    toggleAllRows(expanded: boolean): void;
    /**
     * Recalculates the table
     */
    recalcLayout(): void;
    /**
     * Tracks the column
     */
    columnTrackingFn(index: number, column: any): any;
    /**
     * Gets the row pinning group styles
     */
    stylesByGroup(group: string): {
        width: string;
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    getRowExpanded(row: any): boolean;
    /**
     * Gets the row index given a row
     */
    getRowIndex(row: any): number;
    onTreeAction(row: any): void;
}
