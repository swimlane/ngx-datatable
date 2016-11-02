import { EventEmitter, Renderer, ElementRef } from '@angular/core';
export declare class DataTablePagerComponent {
    size: number;
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    change: EventEmitter<any>;
    count: number;
    page: number;
    readonly totalPages: number;
    private _count;
    private _page;
    private pages;
    constructor(element: ElementRef, renderer: Renderer);
    canPrevious(): boolean;
    canNext(): boolean;
    prevPage(): void;
    nextPage(): void;
    selectPage(page: number): void;
    calcPages(page?: number): any[];
}
