import { ElementRef, EventEmitter } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableHeader {
    private state;
    key: string;
    onColumnChange: EventEmitter<any>;
    readonly headerWidth: string;
    readonly headerHeight: any;
    constructor(state: StateService, elm: ElementRef);
    columnResized(width: any, column: any): void;
    columnReordered({prevIndex, newIndex, model}: {
        prevIndex: any;
        newIndex: any;
        model: any;
    }): void;
    stylesByGroup(group: any): {
        width: string;
    };
}
