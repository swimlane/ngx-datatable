import { ElementRef, EventEmitter, Renderer, OnInit, OnDestroy } from '@angular/core';
export declare class ScrollerComponent implements OnInit, OnDestroy {
    private renderer;
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
    private onScrollListener;
    constructor(element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOffset(offsetY: number): void;
    onScrolled(event: MouseEvent): void;
    updateOffset(): void;
}
