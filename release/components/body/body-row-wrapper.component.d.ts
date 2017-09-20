import { EventEmitter } from '@angular/core';
export declare class DataTableRowWrapperComponent {
    rowDetail: any;
    detailRowHeight: any;
    expanded: boolean;
    row: any;
    rowIndex: number;
    isSelected: boolean;
    rowContextmenu: EventEmitter<{
        event: MouseEvent;
        row: any;
    }>;
    onContextmenu($event: MouseEvent): void;
    readonly cssClass: string;
}
