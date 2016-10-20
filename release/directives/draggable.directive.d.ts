import { ElementRef, EventEmitter } from '@angular/core';
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
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
    ngOnDestroy(): void;
    onMouseup(event: any): void;
    onMousedown(event: any): void;
    move(event: any, mouseDownPos: any): void;
}
