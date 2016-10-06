import { ElementRef, EventEmitter } from '@angular/core';
export declare class Resizeable {
    resizeEnabled: boolean;
    minWidth: number;
    maxWidth: number;
    onResize: EventEmitter<any>;
    private element;
    private subscription;
    private resizing;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    onMouseup(): void;
    onMousedown(event: any): void;
    move(event: any, initialWidth: any, mouseDownScreenX: any): void;
}
