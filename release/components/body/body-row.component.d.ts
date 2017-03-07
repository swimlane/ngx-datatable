import { ElementRef, EventEmitter } from '@angular/core';
export declare class DataTableBodyRowComponent {
    columns: any[];
    innerWidth: number;
    rowClass: any;
    row: any;
    offsetX: number;
    isSelected: boolean;
    readonly cssClass: string;
    rowHeight: number;
    readonly columnsTotalWidths: string;
    activate: EventEmitter<any>;
    element: any;
    columnGroupWidths: any;
    columnsByPin: any;
    _columns: any[];
    _innerWidth: number;
    constructor(element: ElementRef);
    trackByGroups(index: number, colGroup: any): any;
    columnTrackingFn(index: number, column: any): any;
    stylesByGroup(group: string): {
        width: string;
    };
    onActivate(event: any, index: number): void;
    onKeyDown(event: KeyboardEvent): void;
    recalculateColumns(val?: any[]): void;
}
