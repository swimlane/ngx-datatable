import { EventEmitter, ElementRef } from '@angular/core';
import { SelectionType } from '../../types';
export interface Model {
    type: string;
    event: MouseEvent | KeyboardEvent;
    row: any;
    rowElement: any;
    cellElement: any;
    cellIndex: number;
    cellName: string;
}
export declare class DataTableSelectionComponent {
    private elementRef;
    rows: any[];
    selected: any[];
    selectedCellName: string;
    selectEnabled: boolean;
    selectionType: SelectionType;
    rowIdentity: any;
    selectCheck: any;
    activate: EventEmitter<any>;
    select: EventEmitter<any>;
    cellSelect: EventEmitter<any>;
    prevIndex: number;
    tabFocusCellElement: HTMLElement;
    private _focusResetTimeout;
    constructor(elementRef: ElementRef);
    selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any, cellName: string): void;
    onActivate(model: Model, index: number): void;
    onKeyboardFocus(model: Model): void;
    getPrevNextRow(rowElement: HTMLElement, keyCode: number): any;
    getPrevRow(rowElement: HTMLElement): any;
    getNextRow(rowElement: HTMLElement): any;
    /**
     * If it is found that the 2nd last element has been focused (either at top or bottom of table body viewport),
     * then scroll the table viewport so that more elements will be visible and available for focus.
     */
    scrollTableBody(lastRow: HTMLElement, keyCode: number): void;
    /**
     * Resets the tab focus for body cells if paging or scrolling occured that caused focus cell to fall out
     * of bounds. Will automatically set a timeout period that acts like a debunce time to prevent useless
     * operations from occuring while scrolling.
     */
    resetTabFocusIfLost(): void;
    transferCellTabFocus(to: HTMLElement): void;
    focusCell(cellElement: HTMLElement, rowElement: any, keyCode: number, cellIndex: number): void;
    getRowSelected(row: any): boolean;
    getRowSelectedIdx(row: any, selected: any[]): number;
}
