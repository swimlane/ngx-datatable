import { EventEmitter, ElementRef, Renderer, OnDestroy } from '@angular/core';
export declare class DataTableBodyCellComponent implements OnDestroy {
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
    private unsub;
    constructor(elementRef: ElementRef, renderer: Renderer);
    onFocus(event: any): void;
    onBlur(event: any): void;
    calcSortDir(sorts: any): any;
    ngOnDestroy(): void;
}
