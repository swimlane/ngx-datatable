import { EventEmitter, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableFooter {
    private state;
    key: string;
    onPageChange: EventEmitter<any>;
    readonly visible: boolean;
    readonly curPage: any;
    constructor(elm: ElementRef, state: StateService);
}
