
import { ElementRef, EventEmitter } from '@angular/core';
import { StateService } from '../../services/State';
import { TableColumn } from '../../models/TableColumn';
export declare class DataTableHeaderCell {
    element: ElementRef;
    private state;
    model: TableColumn;
    key: string;
    onColumnChange: EventEmitter<any>;
    sort: Function;
    readonly sortDir: any;
    readonly name: string;
    constructor(element: ElementRef, state: StateService);
    sortClasses(sort: any): {
        'sort-asc icon-down': boolean;
        'sort-desc icon-up': boolean;
    };
    onSort(): void;
}
