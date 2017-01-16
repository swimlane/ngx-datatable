import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
export declare class ResizeableDirective implements OnDestroy {
    resizeEnabled: boolean;
    minWidth: number;
    maxWidth: number;
    resize: EventEmitter<any>;
    element: HTMLElement;
    subscription: Subscription;
    resizing: boolean;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    onMouseup(): void;
    onMousedown(event: MouseEvent): void;
    move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void;
}
