import { ElementRef, EventEmitter, Renderer, OnInit, OnDestroy, NgZone } from '@angular/core';
export declare class ScrollerComponent implements OnInit, OnDestroy {
    private renderer;
    private zone;
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
    constructor(element: ElementRef, renderer: Renderer, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOffset(offsetY: number): void;
    onScrolled(event: MouseEvent): void;
    updateOffset(): void;
}
