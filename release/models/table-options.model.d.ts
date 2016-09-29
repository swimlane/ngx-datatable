
import { TableColumn } from './table-column.model';
import { Sort } from './sort.model';
import { ColumnMode, SortType, SelectionType } from '../types';
export declare class TableOptions {
    columns: TableColumn[];
    scrollbarV: boolean;
    scrollbarH: boolean;
    rowHeight: number;
    columnMode: ColumnMode;
    loadingMessage: string;
    emptyMessage: string;
    headerHeight: any;
    footerHeight: number;
    tableHeight: number;
    externalPaging: boolean;
    limit: number;
    count: number;
    offset: number;
    loadingIndicator: boolean;
    selectionType: SelectionType;
    reorderable: boolean;
    sortType: SortType;
    sorts: Array<Sort>;
    constructor(props: any);
    validate(): void;
}
