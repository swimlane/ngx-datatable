import { ElementRef, EventEmitter } from '@angular/core';
export declare class Resizeable {
    resizeEnabled: boolean;
    minWidth: number;
    maxWidth: number;
    onResize: EventEmitter<any>;
    private element;
    private subscription;
    private prevScreenX;
    private resizing;
    constructor(element: ElementRef);
    onMouseup(): void;
    onMousedown(event: any): void;
    move(event: any): void;
}
