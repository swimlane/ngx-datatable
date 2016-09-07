import { EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
import { Scroller } from '../../directives/Scroller';
export declare class DataTableBody implements OnInit, OnDestroy {
    state: StateService;
    key: string;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    scroller: Scroller;
    rows: any;
    private prevIndex;
    private sub;
    readonly selectEnabled: boolean;
    constructor(state: StateService, element: ElementRef);
    readonly bodyHeight: string;
    readonly bodyWidth: string;
    ngOnInit(): void;
    onBodyScroll(props: any): void;
    updatePage(direction: any): void;
    updateRows(refresh?: boolean): void;
    getRowsStyles(row: any): {
        height: string;
    };
    hideIndicator(): void;
    rowClicked(event: any, index: any, row: any): void;
    rowKeydown(event: any, index: any, row: any): void;
    selectRow(event: any, index: any, row: any): void;
    ngOnDestroy(): void;
}
