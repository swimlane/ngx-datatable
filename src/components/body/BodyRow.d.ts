import { ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableBodyRow {
    state: StateService;
    row: any;
    readonly isSelected: boolean;
    constructor(state: StateService, element: ElementRef);
}
