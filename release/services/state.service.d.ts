
import { EventEmitter } from '@angular/core';
import { TableOptions, TableColumn } from '../models';
import { RowHeightCache } from '../utils/row-height-cache';
export declare class StateService {
    options: TableOptions;
    rows: Array<any>;
    selected: Array<any>;
    /**
     * Cache the row heights for calculation during virtual scroll.
     * @type {RowHeightCache}
     */
    rowHeightsCache: RowHeightCache;
    onSortChange: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    /**
     * Event emitted whenever there is a change in row expansion state.
     * @type {EventEmitter}
     */
    onExpandChange: EventEmitter<any>;
    scrollbarWidth: number;
    offsetX: number;
    offsetY: number;
    innerWidth: number;
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
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache.
     */
    readonly scrollHeight: number;
    readonly pageSize: number;
    readonly indexes: {
        first: number;
        last: number;
    };
    setSelected(selected: any[]): StateService;
    /**
     *  Refreshes the full Row Height cache.  Should be used
     *  when the entire row array state has changed.
     */
    refreshRowHeightCache(): void;
    setRows(rows: Array<any>): StateService;
    setOptions(options: TableOptions): StateService;
    setPage({type, value}: {
        type: any;
        value: any;
    }): void;
    nextSort(column: TableColumn): void;
    getAdjustedViewPortIndex(): number;
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param row The row for which the expansion needs to be toggled.
     */
    toggleRowExpansion(row: any): void;
    /**
     * Expand/Collapse all the rows no matter what their state is.
     *
     * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
     */
    toggleAllRows(expanded: boolean): void;
}
