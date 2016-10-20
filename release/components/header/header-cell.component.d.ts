
import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { StateService } from '../../services';
import { TableColumn } from '../../models';
import { SortDirection } from '../../types';
export declare class DataTableHeaderCell {
    element: ElementRef;
    private state;
    column: TableColumn;
    onColumnChange: EventEmitter<any>;
    readonly width: number;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly height: any;
    readonly colTitle: string;
    readonly cssClasses: string;
    sort: Function;
    readonly sortDir: SortDirection;
    readonly name: string;
    constructor(element: ElementRef, state: StateService, renderer: Renderer);
    sortClasses(sort: any): {
        'sort-asc icon-down': boolean;
        'sort-desc icon-up': boolean;
    };
    onSort(): void;
}
