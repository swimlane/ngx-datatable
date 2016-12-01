import { ElementRef, EventEmitter, OnInit, QueryList, AfterViewInit, Renderer, TemplateRef } from '@angular/core';
import { ColumnMode, SortType, SelectionType } from '../types';
import { DataTableColumnDirective } from './columns';
import { DatatableRowDetailDirective } from './row-detail';
export declare class DatatableComponent implements OnInit, AfterViewInit {
    rows: any;
    columns: any[];
    selected: any[];
    scrollbarV: boolean;
    scrollbarH: boolean;
    rowHeight: number;
    detailRowHeight: number;
    columnMode: ColumnMode;
    headerHeight: any;
    footerHeight: number;
    externalPaging: boolean;
    externalSorting: boolean;
    limit: number;
    count: number;
    offset: number;
    loadingIndicator: boolean;
    selectionType: SelectionType;
    reorderable: boolean;
    sortType: SortType;
    sorts: any[];
    rowDetailTemplate: TemplateRef<any>;
    cssClasses: any;
    messages: any;
    rowIdentity: (x: any) => any;
    selectCheck: any;
    trackByProp: string;
    scroll: EventEmitter<any>;
    activate: EventEmitter<any>;
    select: EventEmitter<any>;
    sort: EventEmitter<any>;
    page: EventEmitter<any>;
    detailToggle: EventEmitter<any>;
    reorder: EventEmitter<any>;
    resize: EventEmitter<any>;
    rowContextmenu: EventEmitter<{
        event: MouseEvent;
        row: any;
    }>;
    readonly isFixedHeader: boolean;
    readonly isFixedRow: boolean;
    readonly isVertScroll: boolean;
    readonly isHorScroll: boolean;
    readonly isSelectable: boolean;
    columnTemplates: QueryList<DataTableColumnDirective>;
    rowDetailTemplateChild: DatatableRowDetailDirective;
    offsetX: number;
    private bodyComponent;
    private element;
    private innerWidth;
    private pageSize;
    private bodyHeight;
    private rowCount;
    private _rows;
    private _columns;
    private _columnTemplates;
    private _rowDetailTemplateChild;
    constructor(renderer: Renderer, element: ElementRef);
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     *
     * @memberOf DatatableComponent
     */
    ngOnInit(): void;
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     *
     * @memberOf DatatableComponent
     */
    ngAfterViewInit(): void;
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
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     *
     * @memberOf DatatableComponent
     */
    recalculate(): void;
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     *
     * @param {any[]} [columns=this.columns]
     * @param {number} [forceIdx]
     * @returns {any[]}
     *
     * @memberOf DatatableComponent
     */
    recalculateColumns(columns?: any[], forceIdx?: number): any[];
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @memberOf DatatableComponent
     */
    recalculateDims(): void;
    /**
     * Body triggered a page event.
     *
     * @param {*} { offset }
     *
     * @memberOf DatatableComponent
     */
    onBodyPage({offset}: any): void;
    /**
     * The body triggered a scroll event.
     *
     * @param {MouseEvent} event
     *
     * @memberOf DatatableComponent
     */
    onBodyScroll(event: MouseEvent): void;
    /**
     * The footer triggered a page event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    onFooterPage(event: any): void;
    /**
     * Recalculates the sizes of the page
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    calcPageSize(val?: any[]): number;
    /**
     * Calculates the row count.
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    calcRowCount(val?: any[]): number;
    /**
     * The header triggered a column resize event.
     *
     * @param {*} { column, newValue }
     *
     * @memberOf DatatableComponent
     */
    onColumnResize({column, newValue}: any): void;
    /**
     * The header triggered a column re-order event.
     *
     * @param {*} { column, newValue, prevValue }
     *
     * @memberOf DatatableComponent
     */
    onColumnReorder({column, newValue, prevValue}: any): void;
    /**
     * The header triggered a column sort event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    onColumnSort(event: any): void;
}
