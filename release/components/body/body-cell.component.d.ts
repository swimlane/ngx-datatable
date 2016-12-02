import { EventEmitter, ElementRef } from '@angular/core';
export declare class DataTableBodyCellComponent {
    row: any;
    column: any;
    rowHeight: number;
    isSelected: boolean;
    sorts: any[];
    activate: EventEmitter<any>;
    isFocused: boolean;
    readonly isSortActive: boolean;
    readonly isSortAscending: boolean;
    readonly isSortDescending: boolean;
    readonly width: number;
    readonly height: string | number;
    readonly value: any;
    private sortDir;
    private element;
    private _sorts;
    constructor(element: ElementRef);
    onFocus(): void;
    onBlur(): void;
    onClick(event: MouseEvent): void;
    onDblClick(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    onCheckboxChange(event: any): void;
    calcSortDir(sorts: any[]): any;
}
