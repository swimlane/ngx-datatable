import { OnChanges, PipeTransform, TemplateRef } from '@angular/core';
export interface ISummaryColumn {
    summaryFunc?: (cells: any[]) => any;
    summaryTemplate?: TemplateRef<any>;
    prop: string;
    pipe?: PipeTransform;
}
export declare class DataTableSummaryRowComponent implements OnChanges {
    rows: any[];
    columns: ISummaryColumn[];
    rowHeight: number;
    offsetX: number;
    innerWidth: number;
    _internalColumns: ISummaryColumn[];
    summaryRow: {};
    ngOnChanges(): void;
    private updateInternalColumns;
    private updateValues;
    private getSummaryFunction;
}
