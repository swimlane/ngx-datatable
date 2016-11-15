import { EventEmitter, ElementRef, Renderer } from '@angular/core';
import { SelectionType } from '../../types';
import { ScrollerComponent } from './scroller.component';
export declare class DataTableBodyComponent {
    scrollbarV: boolean;
    scrollbarH: boolean;
    loadingIndicator: boolean;
    rowHeight: number;
    offsetX: number;
    detailRowHeight: any;
    emptyMessage: string;
    selectionType: SelectionType;
    selected: any[];
    rowIdentity: any;
    rowDetailTemplate: any;
    selectCheck: any;
    trackByProp: string;
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
    scroller: ScrollerComponent;
    readonly selectEnabled: boolean;
    private rowHeightsCache;
    private temp;
    private offsetY;
    private indexes;
    private columnGroupWidths;
    private rowTrackingFn;
    private _rows;
    private _bodyHeight;
    private _columns;
    private _rowCount;
    private _offset;
    private _pageSize;
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     */
    readonly scrollHeight: number;
    constructor(element: ElementRef, renderer: Renderer);
    updateOffsetY(offset?: number): void;
    onBodyScroll({scrollYPos, scrollXPos, direction}: {
        scrollYPos: any;
        scrollXPos: any;
        direction: any;
    }): void;
    updatePage(direction: any): void;
    updateRows(): void;
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param row  the row for which the height need to be calculated.
     * @returns {number}  height of the row.
     */
    getRowHeight(row: any): number;
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
     * @param row The row that needs to be placed in the 2D space.
     * @returns {{styles: string}}  Returns the CSS3 style to be applied
     */
    getRowsStyles(row: any): any;
    hideIndicator(): void;
    updateIndexes(): void;
    /**
     *  Refreshes the full Row Height cache.  Should be used
     *  when the entire row array state has changed.
     */
    refreshRowHeightCache(): void;
    getAdjustedViewPortIndex(): number;
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param row The row for which the expansion needs to be toggled.
     */
    toggleRowExpansion(row: any): void;
    /**
     * Expand/Collapse all the rows no matter what their state is.
     * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
     */
    toggleAllRows(expanded: boolean): void;
    recalcLayout(): void;
}
