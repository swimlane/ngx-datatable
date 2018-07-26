import { ElementRef, KeyValueDiffers, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ScrollbarHelper } from '../../services';
export declare class DataTableBodyRowComponent implements DoCheck {
    private differs;
    private scrollbarHelper;
    private cd;
    columns: any[];
    innerWidth: number;
    expanded: boolean;
    rowClass: any;
    row: any;
    group: any;
    isSelected: boolean;
    rowIndex: number;
    displayCheck: any;
    offsetX: number;
    readonly cssClass: string;
    rowHeight: number;
    readonly columnsTotalWidths: string;
    activate: EventEmitter<any>;
    _element: any;
    _columnGroupWidths: any;
    _columnsByPin: any;
    _offsetX: number;
    _columns: any[];
    _innerWidth: number;
    _groupStyles: {
        left: {};
        center: {};
        right: {};
    };
    private _rowDiffer;
    constructor(differs: KeyValueDiffers, scrollbarHelper: ScrollbarHelper, cd: ChangeDetectorRef, element: ElementRef);
    ngDoCheck(): void;
    trackByGroups(index: number, colGroup: any): any;
    columnTrackingFn(index: number, column: any): any;
    buildStylesByGroup(): void;
    calcStylesByGroup(group: string): {
        width: string;
    };
    onActivate(event: any, index: number): void;
    onKeyDown(event: KeyboardEvent): void;
    onMouseenter(event: any): void;
    recalculateColumns(val?: any[]): void;
}
