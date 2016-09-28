
import { EventEmitter } from '@angular/core';
import { TableOptions, TableColumn } from 'models';
export declare class StateService {
    options: TableOptions;
    rows: Array<any>;
    selected: Array<any>;
    onSelectionChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    scrollbarWidth: number;
    offsetX: number;
    offsetY: number;
    innerWidth: number;
    private bodyheight;
    bodyHeight: number;
    readonly columnsByPin: {
        left: any[];
        center: any[];
        right: any[];
    };
    readonly columnGroupWidths: {
        left: number;
        center: number;
        right: number;
        total: number;
    };
    readonly rowCount: number;
    readonly pageSize: number;
    readonly indexes: {
        first: number;
        last: number;
    };
    setSelected(selected: any[]): StateService;
    setRows(rows: Array<any>): StateService;
    setOptions(options: TableOptions): StateService;
    setPage({type, value}: {
        type: any;
        value: any;
    }): void;
    nextSort(column: TableColumn): void;
}
