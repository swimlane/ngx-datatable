import { EventEmitter, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
export declare class VisibilityDirective implements OnInit, OnDestroy {
    private element;
    private zone;
    isVisible: boolean;
    visible: EventEmitter<any>;
    timeout: any;
    constructor(element: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onVisibilityChange(): void;
    runCheck(): void;
}
