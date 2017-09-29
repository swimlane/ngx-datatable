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
    columns: any[];
    selected: any[];
    selectEnabled: boolean;
    selectionType: SelectionType;
    rowIdentity: any;
    selectCheck: any;
    activated: {
        row?: any;
        column?: number;
    };
    activate: EventEmitter<any>;
    activateCell: EventEmitter<any>;
    select: EventEmitter<any>;
    prevIndex: number;
    _activated: {
        row?: string;
        column?: number;
    };
    constructor();
    getNextRow(rows: any[], index: number, direction: number): any;
    activateRow(row: any, columnIndex: number, event?: KeyboardEvent): {
        newRow: any;
        upRow: any;
        downRow: any;
        nextColumn: number;
    };
    selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void;
    onActivate(model: Model, index: number): void;
    onKeyboardFocus(model: Model): void;
    focusRow(rowElement: any, code: string): void;
    getPrevNextRow(rowElement: any, code: string): any;
    focusCell(cellElement: any, rowElement: any, code: string, cellIndex: number): void;
    getRowSelected(row: any): boolean;
    getRowActive(row: any): boolean;
    getCellActive(row: any, columnIndex: number): boolean;
    getRowSelectedIdx(row: any, selected: any[]): number;
}
