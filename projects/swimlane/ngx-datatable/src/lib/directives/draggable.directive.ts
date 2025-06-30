import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DraggableDragEvent, TableColumnInternal } from '../types/internal.types';
import { getPositionFromEvent } from '../utils/events';

/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
@Directive({
  selector: '[draggable]',
  host: {
    '[class.dragging]': 'isDragging()'
  }
})
export class DraggableDirective implements OnDestroy {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly dragModel = input.required<TableColumnInternal>();
  readonly dragEventTarget = input<MouseEvent | TouchEvent>();
  readonly dragX = input(true, { transform: booleanAttribute });
  readonly dragY = input(true, { transform: booleanAttribute });

  readonly dragStart = output<DraggableDragEvent>();
  readonly dragging = output<DraggableDragEvent>();
  readonly dragEnd = output<DraggableDragEvent>();

  readonly isDragging = signal(false);
  subscription?: Subscription;

  constructor() {
    effect(() => {
      const target = this.dragEventTarget();
      const dragModel = this.dragModel();

      if (target && dragModel) {
        this.onMousedown(target);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  onMousedown(event: MouseEvent | TouchEvent): void {
    const isDraggableTarget = (event.target as HTMLElement).classList.contains('draggable');
    if (!isDraggableTarget || (!this.dragX() && !this.dragY())) {
      return;
    }

    event.preventDefault();
    this.isDragging.set(true);

    const mouseDownPos = getPositionFromEvent(event);
    const isMouse = event instanceof MouseEvent;

    const mouseup$ = fromEvent<MouseEvent | TouchEvent>(document, isMouse ? 'mouseup' : 'touchend');
    const mousemove$ = fromEvent<MouseEvent | TouchEvent>(
      document,
      isMouse ? 'mousemove' : 'touchmove'
    ).pipe(takeUntil(mouseup$));

    this._destroySubscription();

    this.subscription = mouseup$.subscribe(mouseUpEvent => this.onMouseup(mouseUpEvent));
    this.subscription.add(mousemove$.subscribe(ev => this.move(ev, mouseDownPos)));

    this.dragStart.emit({
      event,
      element: this.element,
      model: this.dragModel()
    });
  }

  move(event: MouseEvent | TouchEvent, mouseDownPos: { clientX: number; clientY: number }): void {
    if (!this.isDragging()) {
      return;
    }

    const { clientX, clientY } = getPositionFromEvent(event);
    const x = clientX - mouseDownPos.clientX;
    const y = clientY - mouseDownPos.clientY;

    if (this.dragX()) {
      this.element.style.left = `${x}px`;
    }
    if (this.dragY()) {
      this.element.style.top = `${y}px`;
    }

    this.dragging.emit({
      event,
      element: this.element,
      model: this.dragModel()
    });
  }

  onMouseup(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging()) {
      return;
    }

    this.isDragging.set(false);
    this._destroySubscription();
    this.dragEnd.emit({
      event,
      element: this.element,
      model: this.dragModel()
    });
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
