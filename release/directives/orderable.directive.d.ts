import { EventEmitter, QueryList, KeyValueDiffers, AfterContentInit, OnDestroy } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
export declare class OrderableDirective implements AfterContentInit, OnDestroy {
    reorder: EventEmitter<any>;
    targetChanged: EventEmitter<any>;
    draggables: QueryList<DraggableDirective>;
    positions: any;
    differ: any;
    lastDraggingIndex: number;
    constructor(differs: KeyValueDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    updateSubscriptions(): void;
    onDragStart(): void;
    onDragging({element, model, event}: any): void;
    onDragEnd({element, model, event}: any): void;
    isTarget(model: any, event: any): any;
    private createMapDiffs();
}
