import { EventEmitter, QueryList, KeyValueDiffers, AfterContentInit, OnDestroy } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
export declare class OrderableDirective implements AfterContentInit, OnDestroy {
    reorder: EventEmitter<any>;
    draggables: QueryList<DraggableDirective>;
    positions: any;
    differ: any;
    constructor(differs: KeyValueDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    updateSubscriptions(): void;
    onDragStart(): void;
    onDragEnd({element, model}: any): void;
}
