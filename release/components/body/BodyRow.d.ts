import { ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableBodyRow {
    state: StateService;
    key: string;
    row: any;
    readonly isSelected: boolean;
    constructor(state: StateService, element: ElementRef);
    stylesByGroup(group: any): {
        width: string;
    };
}
