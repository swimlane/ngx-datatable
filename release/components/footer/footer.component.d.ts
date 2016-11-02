import { EventEmitter, ElementRef, Renderer } from '@angular/core';
export declare class DataTableFooterComponent {
    footerHeight: number;
    rowCount: number;
    pageSize: number;
    offset: number;
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    totalMessage: string;
    page: EventEmitter<any>;
    readonly isVisible: boolean;
    readonly curPage: number;
    constructor(element: ElementRef, renderer: Renderer);
}
