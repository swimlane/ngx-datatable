import { EventEmitter } from '@angular/core';
import { SortType } from '../../types';
export declare class DataTableHeaderCellComponent {
    sortType: SortType;
    column: any;
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    headerHeight: number;
    sorts: any[];
    sort: EventEmitter<any>;
    readonly columnCssClasses: any;
    private readonly name;
    private readonly minWidth;
    private readonly maxWidth;
    private readonly width;
    private sortDir;
    private _sorts;
    sortClasses(dir: any): any;
    calcSortDir(sorts: any): any;
    onSort(): void;
}
