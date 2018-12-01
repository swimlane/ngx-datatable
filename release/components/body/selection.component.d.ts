import { EventEmitter } from '@angular/core';
import { SelectionType } from '../../types';
export interface Model {
    type: string;
    event: MouseEvent | KeyboardEvent;
    row: any;
    rowElement: any;
    cellElement: any;
    cellIndex: number;
}
export declare class DataTableSelectionComponent {
    rows: any[];
    selected: any[];
    selectEnabled: boolean;
    selectionType: SelectionType;
    rowIdentity: any;
    selectCheck: any;
    activate: EventEmitter<any>;
    select: EventEmitter<any>;
    prevIndex: number;
    selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void;
    onActivate(model: Model, index: number): void;
    onKeyboardFocus(model: Model): void;
    focusRow(rowElement: any, keyCode: number): void;
    getPrevNextRow(rowElement: any, keyCode: number): any;
    focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void;
    getRowSelected(row: any): boolean;
    getRowSelectedIdx(row: any, selected: any[]): number;
}
