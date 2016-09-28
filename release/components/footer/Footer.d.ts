import { EventEmitter, ElementRef, Renderer } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableFooter {
    private state;
    onPageChange: EventEmitter<any>;
    readonly visible: boolean;
    readonly curPage: number;
    constructor(element: ElementRef, state: StateService, renderer: Renderer);
}
