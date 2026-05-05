import { DOCUMENT } from '@angular/common';
import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  output,
  signal
} from '@angular/core';

import { TableColumnInternal } from '../types/internal.types';

export interface DragEvent {
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number;
}

@Directive({
  selector: '[datatableDraggable]',
  host: {
    '[class.draggable]': 'enabled()',
    '[class.dragging]': 'isDragging()',
    '[class.longpress]': 'isLongPressing()',
    '(mousedown)': 'mousedown($event)',
    '(touchstart)': 'touchstart($event)'
  }
})
export class DatatableDraggableDirective implements OnDestroy {
  private document = inject(DOCUMENT);
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly dragModel = input<TableColumnInternal>();
  readonly dragStartDelay = input(0, { transform: numberAttribute });
  readonly enabled = input(true, { transform: booleanAttribute, alias: 'datatableDraggable' });
  readonly dragMove = output<DragEvent>();
  readonly dragEnd = output<void>();
  readonly dragStart = output<void>();

  private timeoutId?: number;
  private touchId?: number;
  private readonly startX = signal<number | undefined>(undefined);
  private readonly startY = signal<number | undefined>(undefined);
  protected readonly isLongPressing = computed(
    () => this.dragStartDelay() !== 0 && this.isDragging()
  );
  protected readonly isDragging = computed(() => this.startX() !== undefined);

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  protected mousedown(event: MouseEvent): void {
    if (!this.enabled()) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    this.document.addEventListener('mouseup', this.ending);
    this.delay(this.dragStartDelay()).then(() => {
      this.document.addEventListener('mousemove', this.mousemove);
      this.starting(event.clientX, event.clientY);
    });
  }

  private mousemove = (event: MouseEvent): void => this.moving(event.clientX, event.clientY);

  protected touchstart(event: TouchEvent): void {
    if (!this.enabled()) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const touch = event.touches.item(0)!;
    this.touchId = touch.identifier;

    this.document.addEventListener('touchend', this.ending);
    this.delay(this.dragStartDelay()).then(() => {
      this.document.addEventListener('touchmove', this.touchmove);
      this.starting(touch.clientX, touch.clientY);
    });
  }

  private touchmove = (event: TouchEvent): void => {
    const touchMove = this.findTouch(event)!;
    if (touchMove) {
      this.moving(touchMove.clientX, touchMove.clientY);
    }
  };

  private starting(clientX: number, clientY: number): void {
    this.startX.set(clientX);
    this.startY.set(clientY);
    this.dragStart.emit();
  }

  private moving(clientX: number, clientY: number): void {
    this.dragMove.emit({
      initialX: this.startX()!,
      initialY: this.startY()!,
      currentX: clientX,
      currentY: clientY
    });
  }

  private ending = (): void => {
    const dragged = this.isDragging();
    this.document.removeEventListener('mousemove', this.mousemove);
    this.document.removeEventListener('touchmove', this.touchmove);
    this.document.removeEventListener('mouseup', this.ending);
    this.document.removeEventListener('touchend', this.ending);
    this.touchId = undefined;
    this.startX.set(undefined);
    this.startY.set(undefined);
    clearTimeout(this.timeoutId);
    // This function is also called if the long press was aborted before the delay.
    // In that case, we don't want to emit dragEnd.
    if (dragged) {
      this.dragEnd.emit();
    }
  };

  private findTouch(event: TouchEvent): Touch | undefined {
    return Array.from(event.touches).find(touch => touch.identifier === this.touchId);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => (this.timeoutId = window.setTimeout(() => resolve(), ms)));
  }
}
