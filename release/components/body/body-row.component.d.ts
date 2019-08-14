import { ElementRef, KeyValueDiffers, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ScrollbarHelper } from '../../services';
import { TreeStatus } from '../../index';
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
    treeStatus: TreeStatus;
    offsetX: number;
    readonly cssClass: string;
    rowHeight: number;
    readonly columnsTotalWidths: string;
    activate: EventEmitter<any>;
    treeAction: EventEmitter<any>;
    _element: any;
    _columnGroupWidths: any;
    _columnsByPin: any;
    _offsetX: number;
    _columns: any[];
    _innerWidth: number;
    _groupStyles: {
        [prop: string]: {};
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
    onTreeAction(): void;
}
