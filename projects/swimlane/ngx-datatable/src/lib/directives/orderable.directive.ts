import {
  AfterContentInit,
  ContentChildren,
  Directive,
  DOCUMENT,
  EventEmitter,
  inject,
  KeyValueChangeRecord,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { DraggableDirective } from './draggable.directive';

import {
  DraggableDragEvent,
  ReorderEventInternal,
  TableColumnInternal,
  TargetChangedEvent
} from '../types/internal.types';
import { getPositionFromEvent } from '../utils/events';

interface OrderPosition {
  left: number;
  right: number;
  index: number;
  element: HTMLElement;
}

@Directive({
  selector: '[orderable]'
})
export class OrderableDirective implements AfterContentInit, OnDestroy {
  private document = inject(DOCUMENT);

  @Output() reorder = new EventEmitter<ReorderEventInternal>();
  @Output() targetChanged = new EventEmitter<TargetChangedEvent>();

  @ContentChildren(DraggableDirective, { descendants: true })
  draggables!: QueryList<DraggableDirective>;

  positions?: Record<string, OrderPosition>;
  differ: KeyValueDiffer<string, DraggableDirective> = inject(KeyValueDiffers).find({}).create();
  lastDraggingIndex?: number;

  ngAfterContentInit(): void {
    // HACK: Investigate Better Way
    this.updateSubscriptions();
    this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
  }

  ngOnDestroy(): void {
    this.draggables.forEach(d => {
      d.dragStart.unsubscribe();
      d.dragging.unsubscribe();
      d.dragEnd.unsubscribe();
    });
  }

  updateSubscriptions(): void {
    const diffs = this.differ.diff(this.createMapDiffs());

    if (diffs) {
      const subscribe = (record: KeyValueChangeRecord<string, DraggableDirective>) => {
        unsubscribe(record);
        const { currentValue } = record;

        if (currentValue) {
          currentValue.dragStart.subscribe(this.onDragStart.bind(this));
          currentValue.dragging.subscribe(this.onDragging.bind(this));
          currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
        }
      };

      const unsubscribe = ({ previousValue }: KeyValueChangeRecord<string, DraggableDirective>) => {
        if (previousValue) {
          previousValue.dragStart.unsubscribe();
          previousValue.dragging.unsubscribe();
          previousValue.dragEnd.unsubscribe();
        }
      };

      diffs.forEachAddedItem(subscribe);
      // diffs.forEachChangedItem(subscribe.bind(this));
      diffs.forEachRemovedItem(unsubscribe);
    }
  }

  onDragStart(): void {
    this.positions = {};

    let i = 0;
    for (const dragger of this.draggables.toArray()) {
      const elm = dragger.element;
      const left = parseInt(elm.offsetLeft.toString(), 0);
      this.positions[dragger.dragModel.$$id] = {
        left,
        right: left + parseInt(elm.offsetWidth.toString(), 0),
        index: i++,
        element: elm
      };
    }
  }

  onDragging({ element, model, event }: DraggableDragEvent): void {
    const prevPos = this.positions![model.$$id];
    const target = this.isTarget(model, event);

    if (target) {
      if (this.lastDraggingIndex !== target.i) {
        this.targetChanged.emit({
          prevIndex: this.lastDraggingIndex!,
          newIndex: target.i,
          initialIndex: prevPos.index
        });
        this.lastDraggingIndex = target.i;
      }
    } else if (this.lastDraggingIndex !== prevPos.index) {
      this.targetChanged.emit({
        prevIndex: this.lastDraggingIndex!,
        initialIndex: prevPos.index
      });
      this.lastDraggingIndex = prevPos.index;
    }
  }

  onDragEnd({ element, model, event }: DraggableDragEvent): void {
    const prevPos = this.positions![model.$$id];

    const target = this.isTarget(model, event);
    if (target) {
      this.reorder.emit({
        prevValue: prevPos.index,
        newValue: target.i,
        column: model
      });
    }

    this.lastDraggingIndex = undefined;
    element.style.left = 'auto';
  }

  isTarget(model: TableColumnInternal, event: MouseEvent | TouchEvent) {
    let i = 0;
    const { clientX, clientY } = getPositionFromEvent(event);
    const targets = this.document.elementsFromPoint(clientX, clientY);

    for (const id in this.positions) {
      // current column position which throws event.
      const pos = this.positions[id];

      // since we drag the inner span, we need to find it in the elements at the cursor
      if (model.$$id !== id && targets.find((el: any) => el === pos.element)) {
        return {
          pos,
          i
        };
      }

      i++;
    }
  }

  private createMapDiffs(): Record<string, DraggableDirective> {
    return this.draggables.toArray().reduce((acc, curr) => {
      acc[curr.dragModel.$$id] = curr;
      return acc;
    }, {} as Record<string, DraggableDirective>);
  }
}
