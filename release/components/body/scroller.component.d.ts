import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
export declare class ScrollerComponent implements OnInit, OnDestroy {
    scrollbarV: boolean;
    scrollbarH: boolean;
    scrollHeight: number;
    scrollWidth: number;
    scroll: EventEmitter<any>;
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
