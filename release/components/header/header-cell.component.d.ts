import { EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SortDirection, SortType, SelectionType, TableColumn } from '../../types';
export declare class DataTableHeaderCellComponent {
    private cd;
    elementRef: ElementRef;
    sortType: SortType;
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    isTarget: boolean;
    targetMarkerTemplate: any;
    targetMarkerContext: any;
    _allRowsSelected: boolean;
    allRowsSelected: any;
    selectionType: SelectionType;
    offsetX: number;
    tabFocusable: boolean;
    column: TableColumn;
    headerHeight: number;
    sorts: any[];
    sort: EventEmitter<any>;
    select: EventEmitter<any>;
    columnContextmenu: EventEmitter<{
        event: MouseEvent;
        column: any;
    }>;
    scroll: EventEmitter<any>;
    readonly columnCssClasses: any;
    readonly name: string;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly width: number;
    readonly isCheckboxable: boolean;
    containerClass: string;
    sortFn: any;
    sortClass: string;
    sortDir: SortDirection;
    ariaSort: string;
    selectFn: any;
    cellContext: any;
    private _column;
    private _sorts;
    constructor(cd: ChangeDetectorRef, elementRef: ElementRef);
    onContextmenu($event: MouseEvent): void;
    calcSortDir(sorts: any[]): any;
    onSort(): void;
    onKeyPress(event: KeyboardEvent): void;
    /**
     * Handles focus, blur, mouseenter, and mouseleave events in header cells to
     * show a sort expectation indicator (mainly for accessibility purposes).
     */
    onSortExpected(event: Event): void;
    /**
     * Calculate the (horizontal table scroll) x-offset so that a scroll output event can be generated.
     */
    calcOffsetX(): number;
    calcSortClass(sortDir: SortDirection, sortExpected?: boolean): string;
    calcAriaSort(sortDir: SortDirection): string;
}
