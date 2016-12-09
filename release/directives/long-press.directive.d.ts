import { EventEmitter } from '@angular/core';
export declare class LongPressDirective {
    duration: number;
    longPress: EventEmitter<any>;
    longPressing: EventEmitter<any>;
    longPressEnd: EventEmitter<any>;
    pressing: boolean;
    isLongPressing: boolean;
    timeout: any;
    mouseX: number;
    mouseY: number;
    readonly press: boolean;
    readonly isLongPress: boolean;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    loop(event: Event): void;
    endPress(): void;
    onMouseUp(): void;
}
