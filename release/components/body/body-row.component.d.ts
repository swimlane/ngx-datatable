import { ElementRef, ChangeDetectorRef, Renderer, OnDestroy } from '@angular/core';
import { SelectionDirective } from '../../directives/selection.directive';
export declare class DataTableBodyRowComponent implements OnDestroy {
    private cdr;
    private selection;
    columns: any[];
    innerWidth: number;
    row: any;
    offsetX: number;
    rowHeight: number;
    isSelected: boolean;
    readonly isEvenRow: boolean;
    readonly isOddRow: boolean;
    private element;
    private columnGroupWidths;
    private columnsByPin;
    private _columns;
    private _innerWidth;
    private unlistens;
    private unsub;
    constructor(element: ElementRef, renderer: Renderer, cdr: ChangeDetectorRef, selection: SelectionDirective);
    stylesByGroup(group: any): {
        width: string;
    };
    recalculateColumns(val?: any[]): void;
    ngOnDestroy(): void;
}
