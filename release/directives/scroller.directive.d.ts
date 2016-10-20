import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
export declare class Scroller implements OnInit, OnDestroy {
    rowHeight: number;
    count: number;
    limit: number;
    scrollWidth: number;
    scrollbarV: boolean;
    scrollbarH: boolean;
    onScroll: EventEmitter<any>;
    /**
     * The height of the scroll bar.
     */
    scrollHeight: number;
    private scrollYPos;
    private scrollXPos;
    private prevScrollYPos;
    private prevScrollXPos;
    private element;
    private parentElement;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOffset(offsetY: number): void;
    onScrolled(event: any): void;
    updateOffset(): void;
}
