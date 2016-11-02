import { ElementRef, EventEmitter } from '@angular/core';
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
export declare class DraggableDirective {
    dragModel: any;
    dragX: boolean;
    dragY: boolean;
    dragStart: EventEmitter<any>;
    dragging: EventEmitter<any>;
    dragEnd: EventEmitter<any>;
    element: HTMLElement;
    private isDragging;
    private subscription;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    onMouseup(event: any): void;
    onMousedown(event: any): void;
    move(event: any, mouseDownPos: any): void;
}
