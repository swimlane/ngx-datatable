import { EventEmitter, ElementRef, NgZone } from '@angular/core';
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
export declare class VisibilityDirective {
    isVisible: boolean;
    visible: EventEmitter<any>;
    constructor(element: ElementRef, zone: NgZone);
    visbilityChange(): void;
}
