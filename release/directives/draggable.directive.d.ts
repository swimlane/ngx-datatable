import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
export declare class DraggableDirective implements OnDestroy {
    dragModel: any;
    dragX: boolean;
    dragY: boolean;
    dragStart: EventEmitter<any>;
    dragging: EventEmitter<any>;
    dragEnd: EventEmitter<any>;
    element: HTMLElement;
    isDragging: boolean;
    subscription: Subscription;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    onMouseup(event: MouseEvent): void;
    onMousedown(event: MouseEvent): void;
    move(event: MouseEvent, mouseDownPos: {
        x: number;
        y: number;
    }): void;
}
