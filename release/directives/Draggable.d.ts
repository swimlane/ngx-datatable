import { ElementRef, EventEmitter } from '@angular/core';
export declare class Draggable {
    element: HTMLElement;
    model: any;
    dragX: boolean;
    dragY: boolean;
    onDragStart: EventEmitter<any>;
    onDragging: EventEmitter<any>;
    onDragEnd: EventEmitter<any>;
    private dragging;
    private subscription;
    constructor(element: ElementRef);
    onMouseup(event: any): void;
    onMousedown(event: any): void;
    move(event: any, mouseDownPos: any): void;
}
