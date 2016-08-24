import { EventEmitter, ElementRef } from '@angular/core';
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(onVisibilityChange)="doSomething($event)">
 * 		</div>
 *
 */
export declare class Visibility {
    visible: boolean;
    onVisibilityChange: EventEmitter<any>;
    constructor(element: ElementRef);
    visbilityChange(): void;
}
