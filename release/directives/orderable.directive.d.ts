import { EventEmitter, KeyValueDiffers } from '@angular/core';
export declare class OrderableDirective {
    reorder: EventEmitter<any>;
    private draggables;
    private positions;
    private differ;
    constructor(differs: KeyValueDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    updateSubscriptions(): void;
    onDragStart(): void;
    onDragEnd({element, model}: {
        element: any;
        model: any;
    }): void;
}
