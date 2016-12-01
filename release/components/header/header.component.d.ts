import { ElementRef, Renderer, EventEmitter } from '@angular/core';
import { SortType } from '../../types';
import { DataTableColumnDirective } from '../columns';
export declare class DataTableHeaderComponent {
    sortAscendingIcon: any;
    sortDescendingIcon: any;
    scrollbarH: boolean;
    innerWidth: number;
    offsetX: number;
    sorts: any[];
    sortType: SortType;
    headerHeight: any;
    columns: any[];
    sort: EventEmitter<any>;
    reorder: EventEmitter<any>;
    resize: EventEmitter<any>;
    private columnsByPin;
    private columnGroupWidths;
    private _columns;
    private _headerHeight;
    private readonly headerWidth;
    constructor(element: ElementRef, renderer: Renderer);
    onColumnResized(width: number, column: DataTableColumnDirective): void;
    onColumnReordered({prevIndex, newIndex, model}: any): void;
    onSort({column, prevValue, newValue}: any): void;
    calcNewSorts(column: any, prevValue: number, newValue: number): any[];
    stylesByGroup(group: string): {
        width: string;
    };
}
