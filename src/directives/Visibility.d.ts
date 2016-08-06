import { EventEmitter, ElementRef } from '@angular/core';
export declare class Visibility {
    visible: boolean;
    onVisibilityChange: EventEmitter<any>;
    constructor(element: ElementRef);
    visbilityChange(): void;
}
