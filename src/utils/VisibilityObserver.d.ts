export declare class VisibilityObserver {
    observer: IntersectionObserver;
    callback: any;
    constructor(element: any, callback: any);
    runPolyfill(element: any): void;
    isVisible(boundingClientRect: any, intersectionRect: any): boolean;
    visibleTimerCallback(element: any, observer: any): void;
    processChanges(changes: any): void;
}
