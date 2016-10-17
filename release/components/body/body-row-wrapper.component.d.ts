import { Renderer, ElementRef } from '@angular/core';
import { StateService } from '../../services';
export declare class DataTableRowWrapper {
    element: ElementRef;
    private state;
    /**
     * The row for which the detail needs to be shown.
     */
    row: any;
    constructor(element: ElementRef, state: StateService, renderer: Renderer);
}
