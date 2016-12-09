import { EventEmitter } from '@angular/core';
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
    allRowsSelected: boolean;
    headerHeight: any;
    columns: any[];
    sort: EventEmitter<any>;
    reorder: EventEmitter<any>;
    resize: EventEmitter<any>;
    select: EventEmitter<any>;
    columnsByPin: any;
    columnGroupWidths: any;
    _columns: any[];
    _headerHeight: string;
    readonly headerWidth: string;
    onColumnResized(width: number, column: DataTableColumnDirective): void;
    onColumnReordered({prevIndex, newIndex, model}: any): void;
    onSort({column, prevValue, newValue}: any): void;
    calcNewSorts(column: any, prevValue: number, newValue: number): any[];
    stylesByGroup(group: string): any;
}
