import { EventEmitter, ElementRef, Renderer } from '@angular/core';
export declare class DataTableBodyCellComponent {
    row: any;
    column: any;
    rowHeight: number;
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
    constructor(element: ElementRef, renderer: Renderer);
    onFocus(): void;
    onBlur(): void;
    onClick(event: MouseEvent): void;
    onDblClick(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    calcSortDir(sorts: any[]): any;
}
