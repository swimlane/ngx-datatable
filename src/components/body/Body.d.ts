import { EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableBody implements OnInit, OnDestroy {
    state: StateService;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    rows: any;
    private prevIndex;
    private sub;
    readonly selectEnabled: boolean;
    constructor(state: StateService, element: ElementRef);
    readonly bodyHeight: string;
    readonly bodyWidth: string;
    ngOnInit(): void;
    hideIndicator(): void;
    rowClicked(event: any, index: any, row: any): void;
    rowKeydown(event: any, index: any, row: any): void;
    selectRow(event: any, index: any, row: any): void;
    ngOnDestroy(): void;
}
