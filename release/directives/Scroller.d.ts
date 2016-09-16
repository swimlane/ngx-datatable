import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
export declare class Scroller implements OnInit, OnDestroy {
    rowHeight: number;
    count: number;
    scrollWidth: number;
    scrollbarV: boolean;
    scrollbarH: boolean;
    onScroll: EventEmitter<any>;
    private scrollYPos;
    private scrollXPos;
    private prevScrollYPos;
    private prevScrollXPos;
    private element;
    private parentElement;
    readonly scrollHeight: string;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOffset(offsetY: number): void;
    onScrolled(event: any): void;
    updateOffset(): void;
}
