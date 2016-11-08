import { EventEmitter } from '@angular/core';
import { SelectionType } from '../../types';
export declare class DataTableSelectionComponent {
    rows: any[];
    selected: any[];
    selectEnabled: boolean;
    selectionType: SelectionType;
    rowIdentity: any;
    selectCheck: any;
    activate: EventEmitter<any>;
    select: EventEmitter<any>;
    private prevIndex;
    selectRow(event: any, index: any, row: any): void;
    onActivate(model: any, index: any): void;
    onKeyboardFocus(model: any): void;
    focusRow(rowElement: any, keyCode: number): void;
    getPrevNextRow(rowElement: any, keyCode: number): any;
    focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void;
    getRowSelected(row: any): boolean;
    getRowSelectedIdx(row: any, selected: any[]): number;
}
