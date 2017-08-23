import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';
export declare class DataTableBodySectionHeaderComponent {
    columns: any[];
    expanded: boolean;
    rowClass: any;
    row: any;
    isSelected: boolean;
    rowIndex: number;
    sectionCount: number;
    sectionHeaderTemplate: TemplateRef<any>;
    readonly cssClass: string;
    sectionHeaderHeight: number;
    activate: EventEmitter<any>;
    element: any;
    _columns: any[];
    _calculatedWidth: number;
    constructor(element: ElementRef);
    onClick(event: MouseEvent): void;
    onDblClick(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
}
