import { EventEmitter, Renderer, ElementRef } from '@angular/core';
export declare class DataTablePagerComponent {
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    size: number;
    count: number;
    page: number;
    readonly totalPages: number;
    change: EventEmitter<any>;
    private _count;
    private _page;
    private _size;
    private pages;
    constructor(element: ElementRef, renderer: Renderer);
    canPrevious(): boolean;
    canNext(): boolean;
    prevPage(): void;
    nextPage(): void;
    selectPage(page: number): void;
    calcPages(page?: number): any[];
}
