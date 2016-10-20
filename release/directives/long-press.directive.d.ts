import { EventEmitter } from '@angular/core';
export declare class LongPress {
    duration: number;
    onLongPress: EventEmitter<any>;
    onLongPressing: EventEmitter<any>;
    onLongPressEnd: EventEmitter<any>;
    private pressing;
    private longPressing;
    private timeout;
    private mouseX;
    private mouseY;
    readonly press: boolean;
    readonly longPress: boolean;
    onMouseDown(event: any): void;
    onMouseMove(event: any): void;
    loop(event: any): void;
    endPress(): void;
    onMouseUp(): void;
}
