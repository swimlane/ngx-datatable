import { ElementRef, Renderer, EventEmitter } from '@angular/core';
export declare class DataTableBodyRowComponent {
    columns: any[];
    innerWidth: number;
    row: any;
    offsetX: number;
    rowHeight: number;
    isSelected: boolean;
    readonly isEvenRow: boolean;
    readonly isOddRow: boolean;
    activate: EventEmitter<any>;
    private element;
    private columnGroupWidths;
    private columnsByPin;
    private _columns;
    private _innerWidth;
    constructor(element: ElementRef, renderer: Renderer);
    stylesByGroup(group: any): {
        width: string;
    };
    onActivate(event: any, index: any): void;
    onKeyDown(event: any): void;
    recalculateColumns(val?: any[]): void;
}
