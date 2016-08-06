import { EventEmitter, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableFooter {
    private state;
    onPageChange: EventEmitter<any>;
    readonly visible: boolean;
    readonly curPage: number;
    constructor(elm: ElementRef, state: StateService);
}
