import { EventEmitter } from '@angular/core';
import { SortDirection, SortType, SelectionType, TableColumn } from '../../types';
export declare class DataTableHeaderCellComponent {
    sortType: SortType;
    column: TableColumn;
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    allRowsSelected: boolean;
    selectionType: SelectionType;
    headerHeight: number;
    sorts: any[];
    sort: EventEmitter<any>;
    select: EventEmitter<any>;
    columnContextmenu: EventEmitter<{
        event: MouseEvent;
        column: any;
    }>;
    readonly columnCssClasses: any;
    readonly name: string;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly width: number;
    readonly isCheckboxable: boolean;
    sortFn: any;
    sortClass: string;
    sortDir: SortDirection;
    _sorts: any[];
    selectFn: any;
    onContextmenu($event: MouseEvent): void;
    calcSortDir(sorts: any[]): any;
    onSort(): void;
    calcSortClass(sortDir: SortDirection): string;
}
