import { ElementRef, Renderer, EventEmitter } from '@angular/core';
export declare class DataTableBodyRowComponent {
    columns: any[];
    row: any;
    bodyWidth: number;
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
    constructor(element: ElementRef, renderer: Renderer);
    stylesByGroup(group: any): {
        width: string;
    };
    onActivate(event: any, index: any): void;
    onKeyDown(event: any): void;
}
