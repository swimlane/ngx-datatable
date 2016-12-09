import { EventEmitter } from '@angular/core';
import { SortDirection, SortType } from '../../types';
export declare class DataTableHeaderCellComponent {
    sortType: SortType;
    column: any;
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    allRowsSelected: boolean;
    headerHeight: number;
    sorts: any[];
    sort: EventEmitter<any>;
    select: EventEmitter<any>;
    readonly columnCssClasses: any;
    readonly name: string;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly width: number;
    sortDir: SortDirection;
    _sorts: any[];
    sortClasses(dir: SortDirection): any;
    calcSortDir(sorts: any[]): any;
    onSort(): void;
}
