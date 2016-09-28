import { Renderer, ElementRef } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
export declare class DataTableBodyCell {
    column: TableColumn;
    row: any;
    constructor(element: ElementRef, renderer: Renderer);
    readonly value: any;
    readonly width: string;
}
