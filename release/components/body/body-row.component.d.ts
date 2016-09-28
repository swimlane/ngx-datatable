import { ElementRef, Renderer } from '@angular/core';
import { StateService } from 'services';
export declare class DataTableBodyRow {
    state: StateService;
    row: any;
    readonly isSelected: boolean;
    constructor(state: StateService, element: ElementRef, renderer: Renderer);
    stylesByGroup(group: any): {
        width: string;
    };
}
