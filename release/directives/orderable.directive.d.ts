import { EventEmitter } from '@angular/core';
export declare class Orderable {
    onReorder: EventEmitter<any>;
    private drags;
    private positions;
    ngAfterContentInit(): void;
    onDragStart(): void;
    onDragEnd({element, model}: {
        element: any;
        model: any;
    }): void;
}
