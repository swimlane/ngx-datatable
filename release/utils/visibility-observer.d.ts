import { NgZone } from '@angular/core';
/**
 * Observes changes to an elements visibility.
 * https://medium.com/@amcdnl/javascript-s-new-intersectionobserver-cdce8a73bef8#.evn5twug3
 *
 * Example:
 *
 * 		var elm = document.getElementById("panda");
 * 	 	new VisibilityObserver(elm, function() {
 * 			alert('PAndas rock!');
 * 	  });
 *
 */
export declare class VisibilityObserver {
    observer: IntersectionObserver;
    callback: any;
    timeout: any;
    constructor(element: any, callback: any, zone: NgZone);
    runPolyfill(element: any, zone: NgZone): void;
    isVisible(boundingClientRect: any, intersectionRect: any): boolean;
    visibleTimerCallback(element: any, observer: any): void;
    processChanges(changes: any): void;
}
