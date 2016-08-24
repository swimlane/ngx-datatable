/// <reference types="core-js" />
import { ElementRef, EventEmitter } from '@angular/core';
import { StateService } from '../../services/State';
import { TableColumn } from '../../models/TableColumn';
import { SortDirection } from '../../enums/SortDirection';
export declare class DataTableHeaderCell {
    element: ElementRef;
    private state;
    model: TableColumn;
    onColumnChange: EventEmitter<any>;
    sort: Function;
    readonly sortDir: SortDirection;
    readonly name: string;
    constructor(element: ElementRef, state: StateService);
    sortClasses(sort: any): {
        'sort-asc icon-down': boolean;
        'sort-desc icon-up': boolean;
    };
    onSort(): void;
}
