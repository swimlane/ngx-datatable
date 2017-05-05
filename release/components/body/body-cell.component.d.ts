import { EventEmitter, ElementRef, ViewContainerRef, OnDestroy, OnChanges } from '@angular/core';
import { SortDirection } from '../../types';
import { TableColumn } from '../../types/table-column.type';
export interface RowContext {
    row: any;
    column: any;
    value: () => any;
}
export declare class DataTableBodyCellComponent implements OnDestroy, OnChanges {
    row: any;
    column: TableColumn;
    rowHeight: number;
    isSelected: boolean;
    sorts: any[];
    activate: EventEmitter<any>;
    cellTemplate: ViewContainerRef;
    readonly columnCssClasses: any;
    readonly width: number;
    readonly height: string | number;
    readonly value: any;
    sortDir: SortDirection;
    element: any;
    _sorts: any[];
    isFocused: boolean;
    _rowContext: RowContext;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    onFocus(): void;
    onBlur(): void;
    onClick(event: MouseEvent): void;
    onDblClick(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    onCheckboxChange(event: any): void;
    calcSortDir(sorts: any[]): any;
}
