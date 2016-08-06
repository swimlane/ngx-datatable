import { EventEmitter, ElementRef } from '@angular/core';
export declare class DataTablePager {
    size: number;
    onPaged: EventEmitter<any>;
    private _count;
    private _page;
    private pages;
    readonly totalPages: number;
    count: number;
    page: number;
    constructor(elm: ElementRef);
    canPrevious(): boolean;
    canNext(): boolean;
    prevPage(): void;
    nextPage(): void;
    selectPage(page: number): void;
    calcPages(page?: number): any[];
}
