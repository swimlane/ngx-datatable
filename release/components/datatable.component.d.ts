import { ElementRef, EventEmitter, KeyValueDiffers, OnInit, OnChanges, QueryList, DoCheck, AfterViewInit, Renderer } from '@angular/core';
import { TableOptions } from '../models';
import { DataTableColumn } from './datatable-column.directive';
import { StateService } from '../services';
export declare class DataTable implements OnInit, OnChanges, DoCheck, AfterViewInit {
    state: StateService;
    options: TableOptions;
    rows: any[];
    selected: any[];
    onPageChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onRowClick: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onColumnChange: EventEmitter<any>;
    columns: QueryList<DataTableColumn>;
    rowDetailTemplateChild: any;
    private element;
    private rowDiffer;
    private colDiffer;
    private pageSubscriber;
    constructor(state: StateService, renderer: Renderer, element: ElementRef, differs: KeyValueDiffers);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    checkColumnChanges(): void;
    adjustSizes(): void;
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
    adjustColumns(forceIdx?: number): void;
    onRowSelect(event: any): void;
    resize(): void;
    readonly isFixedHeader: boolean;
    readonly isFixedRow: boolean;
    readonly isVertScroll: boolean;
    readonly isHorScroll: boolean;
    readonly isSelectable: boolean;
}
