import { ElementRef, Renderer, EventEmitter } from '@angular/core';
import { StateService } from '../../services';
export declare class DataTableHeader {
    private state;
    onColumnChange: EventEmitter<any>;
    readonly headerWidth: string;
    readonly headerHeight: any;
    constructor(state: StateService, element: ElementRef, renderer: Renderer);
    trackColBy(index: number, obj: any): any;
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
