import { ElementRef, EventEmitter, OnInit, QueryList, AfterViewInit, Renderer, TemplateRef } from '@angular/core';
import { ColumnMode, SortType, SelectionType } from '../types';
import { DataTableColumnDirective } from './column.directive';
import { DatatableRowDetailDirective } from './row-detail.directive';
export declare class DatatableComponent implements OnInit, AfterViewInit {
    rows: any[];
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
    rowIdentity: any;
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
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    toggleExpandRow(row: any): void;
    /**
     * API method to expand all the rows.
     */
    expandAllRows(): void;
    /**
     * API method to collapse all the rows.
     */
    collapseAllRows(): void;
    recalculate(): void;
    recalculateColumns(columns?: any[], forceIdx?: number): any[];
    recalculateDims(): void;
    onBodyPage({offset}: {
        offset: any;
    }): void;
    onBodyScroll(event: any): void;
    onFooterPage(event: any): void;
    calcPageSize(val?: any[]): number;
    calcRowCount(val?: any[]): number;
    onColumnResize({column, newValue}: {
        column: any;
        newValue: any;
    }): void;
    onColumnReorder({column, newValue, prevValue}: {
        column: any;
        newValue: any;
        prevValue: any;
    }): void;
    onColumnSort(event: any): void;
}
