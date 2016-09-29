import { Renderer, ElementRef } from '@angular/core';
import { TableColumn } from '../../models';
import { StateService } from '../../services';
export declare class DataTableBodyCell {
    private state;
    column: TableColumn;
    row: any;
    constructor(element: ElementRef, renderer: Renderer, state: StateService);
    readonly value: any;
    readonly width: any;
    readonly height: any;
}
