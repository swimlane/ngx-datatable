import { EventEmitter, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { StateService } from '../../services';
import { Scroller } from '../../directives';
export declare class DataTableBody implements OnInit, OnDestroy {
    state: StateService;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    scroller: Scroller;
    rows: any;
    private prevIndex;
    private sub;
    readonly selectEnabled: boolean;
    readonly bodyHeight: string;
    readonly bodyWidth: string;
    constructor(state: StateService, element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    trackRowBy(index: number, obj: any): any;
    onBodyScroll(props: any): void;
    updatePage(direction: any): void;
    updateRows(refresh?: boolean): void;
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
    getRowsStyles(row: any): {
        height: string;
    };
    hideIndicator(): void;
    rowClicked(event: any, index: any, row: any): void;
    rowKeydown(event: any, index: any, row: any): void;
    selectRow(event: any, index: any, row: any): void;
    ngOnDestroy(): void;
}
