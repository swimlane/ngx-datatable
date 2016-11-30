import { ElementRef, EventEmitter } from '@angular/core';
import { SelectionDirective } from '../../directives/selection.directive';
export declare class DataTableBodyRowComponent {
    private selection;
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
    constructor(element: ElementRef, selection: SelectionDirective);
    stylesByGroup(group: any): {
        width: string;
    };
    onActivate(event: any, index: any): void;
    onKeyDown(event: KeyboardEvent): void;
    recalculateColumns(val?: any[]): void;
}
