import { EventEmitter, DoCheck, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
export declare class DataTableRowWrapperComponent implements DoCheck {
    private cd;
    private differs;
    innerWidth: number;
    rowDetail: any;
    groupHeader: any;
    offsetX: number;
    detailRowHeight: any;
    row: any;
    groupedRows: any;
    rowContextmenu: EventEmitter<{
        event: MouseEvent;
        row: any;
    }>;
    rowIndex: number;
    expanded: boolean;
    groupContext: any;
    rowContext: any;
    private rowDiffer;
    private _expanded;
    private _rowIndex;
    constructor(cd: ChangeDetectorRef, differs: KeyValueDiffers);
    ngDoCheck(): void;
    onContextmenu($event: MouseEvent): void;
    getGroupHeaderStyle(group: any): any;
}
