import { ElementRef, EventEmitter, Renderer2, OnInit, OnDestroy } from '@angular/core';
export declare class ScrollerComponent implements OnInit, OnDestroy {
    private renderer;
    scrollbarV: boolean;
    scrollbarH: boolean;
    scrollHeight: number;
    scrollWidth: number;
    scroll: EventEmitter<any>;
    scrollYPos: number;
    scrollXPos: number;
    prevScrollYPos: number;
    prevScrollXPos: number;
    element: any;
    parentElement: any;
    onScrollListener: any;
    constructor(element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOffset(offsetX: number, offsetY: number): void;
    onScrolled(event: MouseEvent): void;
    updateOffset(): void;
}
