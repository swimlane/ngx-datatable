import {
  booleanAttribute,
  Directive,
  EventEmitter,
  Input,
  numberAttribute,
  OnDestroy,
  Output,
  signal
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TableColumnInternal } from '../types/internal.types';

@Directive({
  selector: '[long-press]',
  host: {
    '(touchstart)': 'onMouseDown($event)',
    '(mousedown)': 'onMouseDown($event)',
    '[class.press]': 'pressing()',
    '[class.longpress]': 'isLongPressing()'
  }
})
export class LongPressDirective implements OnDestroy {
  @Input({ transform: booleanAttribute }) pressEnabled = true;
  @Input() pressModel!: TableColumnInternal;
  @Input({ transform: numberAttribute }) duration = 500;

  @Output() longPressStart = new EventEmitter<{
    event: MouseEvent | TouchEvent;
    model: TableColumnInternal;
  }>();
  @Output() longPressEnd = new EventEmitter<{ model: TableColumnInternal }>();

  pressing = signal(false);
  isLongPressing = signal(false);
  timeout: any;

  subscription?: Subscription;

  onMouseDown(event: MouseEvent | TouchEvent): void {
    const isMouse = event instanceof MouseEvent;

    // don't do right/middle clicks
    if (!this.pressEnabled || (isMouse && event.button !== 0)) {
      return;
    }

    // don't start drag if its on resize handle
    const target = event.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      return;
    }

    this.pressing.set(true);
    this.isLongPressing.set(false);

    const mouseup = fromEvent(document, isMouse ? 'mouseup' : 'touchend');
    this.subscription = mouseup.subscribe(() => this.endPress());

    this.timeout = setTimeout(() => {
      this.isLongPressing.set(true);
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });
    }, this.duration);
  }

  endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing.set(false);
    this.pressing.set(false);
    this._destroySubscription();

    this.longPressEnd.emit({
      model: this.pressModel
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    this._destroySubscription();
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
