import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ContentChildren,
  Directive,
  effect,
  inject,
  KeyValueChangeRecord,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  output,
  OutputRefSubscription,
  QueryList,
  signal
} from '@angular/core';
import { startWith } from 'rxjs';

import {
  DraggableDragEvent,
  ReorderEventInternal,
  TableColumnInternal,
  TargetChangedEvent
} from '../types/internal.types';
import { getPositionFromEvent } from '../utils/events';
import { DraggableDirective } from './draggable.directive';

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

  readonly reorder = output<ReorderEventInternal>();
  readonly targetChanged = output<TargetChangedEvent>();

  // This should be contentChildren() query, but there is an open Angular issue with signal queries (https://github.com/angular/angular/issues/59067)
  // This problem causes the orderable directive to fail because the contentChildren query is resolved too early.
  // At that state, the input is not yet set, resulting in a NG0950 error.
  @ContentChildren(DraggableDirective, { descendants: true })
  draggablesQueryList!: QueryList<DraggableDirective>;

  readonly draggables = signal<DraggableDirective[]>([]);

  readonly subscriptions = new Map<string, OutputRefSubscription[]>();

  positions?: Record<string, OrderPosition>;
  readonly differ: KeyValueDiffer<string, DraggableDirective> = inject(KeyValueDiffers)
    .find({})
    .create();
  lastDraggingIndex?: number;

  constructor() {
    effect(() => {
      const diffMap = this.draggables().reduce(
        (acc, curr) => {
          acc[curr.dragModel().$$id] = curr;
          return acc;
        },
        {} as Record<string, DraggableDirective>
      );

      this.updateSubscriptions(diffMap);
    });
  }

  ngAfterContentInit(): void {
    this.draggablesQueryList.changes.pipe(startWith(this.draggablesQueryList)).subscribe(() => {
      this.draggables.set(this.draggablesQueryList.toArray());
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subList => subList.forEach(sub => sub.unsubscribe()));
  }

  updateSubscriptions(diffMap: Record<string, DraggableDirective>): void {
    const differResult = this.differ.diff(diffMap);
    if (!differResult) {
      return;
    }
    differResult.forEachAddedItem(record => this.subscribeToDraggable(record));
    differResult.forEachRemovedItem(record => this.unsubscribeFromDraggable(record));
  }

  private subscribeToDraggable = (
    record: KeyValueChangeRecord<string, DraggableDirective>
  ): void => {
    this.unsubscribeFromDraggable(record);
    const { key, currentValue } = record;
    if (!currentValue) {
      return;
    }
    const subs = this.subscriptions.get(key) ?? [];
    subs.push(
      currentValue.dragStart.subscribe(() => this.onDragStart()),
      currentValue.dragging.subscribe(e => this.onDragging(e)),
      currentValue.dragEnd.subscribe(e => this.onDragEnd(e))
    );
    this.subscriptions.set(key, subs);
  };

  private unsubscribeFromDraggable = (
    record: KeyValueChangeRecord<string, DraggableDirective>
  ): void => {
    const { key, previousValue } = record;
    if (!previousValue) {
      return;
    }
    const subs = this.subscriptions.get(key);
    if (!subs) {
      return;
    }
    subs.forEach(sub => sub.unsubscribe());
    this.subscriptions.delete(key);
  };

  onDragStart(): void {
    const positions: Record<string, OrderPosition> = {};
    this.draggables().forEach((draggable, idx) => {
      const elm = draggable.element;
      const left = parseInt(elm.offsetLeft.toString(), 10);
      positions[draggable.dragModel().$$id] = {
        left,
        right: left + parseInt(elm.offsetWidth.toString(), 10),
        index: idx,
        element: elm
      };
    });
    this.positions = positions;
  }

  onDragging({ model, event }: DraggableDragEvent): void {
    if (!this.positions) {
      return;
    }
    const prevPos = this.positions[model.$$id];
    const target = this.isTarget(model, event);
    if (target) {
      if (this.lastDraggingIndex !== target.index) {
        this.targetChanged.emit({
          prevIndex: this.lastDraggingIndex!,
          newIndex: target.index,
          initialIndex: prevPos.index
        });
        this.lastDraggingIndex = target.index;
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
    if (!this.positions) {
      return;
    }
    const prevPos = this.positions[model.$$id];
    const target = this.isTarget(model, event);
    if (target) {
      this.reorder.emit({
        prevValue: prevPos.index,
        newValue: target.index,
        column: model
      });
    }
    this.lastDraggingIndex = undefined;
    element.style.left = 'auto';
  }

  isTarget(
    model: TableColumnInternal,
    event: MouseEvent | TouchEvent
  ): { pos: OrderPosition; index: number } | undefined {
    if (!this.positions) {
      return undefined;
    }
    const { clientX, clientY } = getPositionFromEvent(event);
    const elementsAtPoint = this.document.elementsFromPoint(clientX, clientY);
    return Object.entries(this.positions).reduce<{ pos: OrderPosition; index: number } | undefined>(
      (acc, [id, pos], idx) => {
        // since we drag the inner span, we need to find it in the elements at the cursor
        if (!acc && model.$$id !== id && elementsAtPoint.some(el => el === pos.element)) {
          return { pos, index: idx };
        }
        return acc;
      },
      undefined
    );
  }
}
