import { EventEmitter } from '@angular/core';
import { Row } from '../types/row.type';
import { SelectionType } from '../types/selection.type';
import { ConfigDirective } from './config.directive';
export interface SelectionEvent {
    type: string;
    e: Event;
    row: {
        [a: string]: any;
    };
    column: any;
    value: any;
    cellElement: HTMLElement;
}
export declare class SelectionDirective {
    private config;
    rows: Row[];
    selectionType: SelectionType;
    selectCheck: any;
    selected: Row[];
    private prevIndex;
    selectionChange: EventEmitter<Row[]>;
    constructor(config: ConfigDirective);
    select(row: Row, range?: boolean): void;
    selectRowsBetween(row: Row): Row[];
    private getSelectedIdx(row);
    isSelected(row: Row): boolean;
}
