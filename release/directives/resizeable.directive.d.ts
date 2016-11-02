import { ElementRef, EventEmitter } from '@angular/core';
export declare class ResizeableDirective {
    resizeEnabled: boolean;
    minWidth: number;
    maxWidth: number;
    resize: EventEmitter<any>;
    private element;
    private subscription;
    private resizing;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    onMouseup(): void;
    onMousedown(event: any): void;
    move(event: any, initialWidth: any, mouseDownScreenX: any): void;
}
