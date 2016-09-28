import { EventEmitter, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { StateService } from 'services';
import { Scroller } from 'directives';
export declare class DataTableBody implements OnInit, OnDestroy {
    state: StateService;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    scroller: Scroller;
    rows: any;
    private prevIndex;
    private sub;
    readonly selectEnabled: boolean;
    readonly bodyHeight: string;
    readonly bodyWidth: string;
    constructor(state: StateService, element: ElementRef, renderer: Renderer);
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
