import { TableColumn } from '../../models';
import { StateService } from '../../services';
import { SortDirection } from '../../types';
export declare class DataTableBodyCell {
    private state;
    column: TableColumn;
    row: any;
    readonly cssClasses: string;
    readonly width: any;
    readonly height: any;
    readonly sortDir: SortDirection;
    readonly value: any;
    constructor(state: StateService);
}
