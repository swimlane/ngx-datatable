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
    onFocus(event: any): void;
    onBlur(event: any): void;
    onClick(event: any): void;
    onDblClick(event: any): void;
    onKeyDown(event: any): void;
    calcSortDir(sorts: any): any;
}
