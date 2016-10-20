
import { TableColumn } from './table-column.model';
import { Sort } from './sort.model';
import { ColumnMode, SortType, SelectionType } from '../types';
import { TemplateRef } from '@angular/core';
export declare class TableOptions {
    columns: TableColumn[];
    scrollbarV: boolean;
    scrollbarH: boolean;
    rowHeight: number;
    detailRowHeight: number;
    columnMode: ColumnMode;
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
    rowDetailTemplate: TemplateRef<any>;
    constructor(props: any);
    validate(): void;
}
