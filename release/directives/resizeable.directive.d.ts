import { ElementRef, EventEmitter, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
export declare class ResizeableDirective implements OnDestroy, AfterViewInit {
    private renderer;
    resizeEnabled: boolean;
    minWidth: number;
    maxWidth: number;
    resize: EventEmitter<any>;
    element: HTMLElement;
    subscription: Subscription;
    resizing: boolean;
    constructor(element: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onMouseup(): void;
    onMousedown(event: MouseEvent): void;
    move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void;
    private _destroySubscription;
}
