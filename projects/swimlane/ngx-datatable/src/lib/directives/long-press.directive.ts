import {
  booleanAttribute,
  Directive,
  input,
  numberAttribute,
  OnDestroy,
  output,
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
  readonly pressEnabled = input(true, { transform: booleanAttribute });
  readonly pressModel = input.required<TableColumnInternal>();
  readonly duration = input(500, { transform: numberAttribute });

  readonly longPressStart = output<{
    event: MouseEvent | TouchEvent;
    model: TableColumnInternal;
  }>();
  readonly longPressEnd = output<{ model: TableColumnInternal }>();

  readonly pressing = signal(false);
  readonly isLongPressing = signal(false);
  timeout?: number;

  subscription?: Subscription;

  onMouseDown(event: MouseEvent | TouchEvent): void {
    const isMouse = event instanceof MouseEvent;

    // don't do right/middle clicks
    if (!this.pressEnabled() || (isMouse && event.button !== 0)) {
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

    this.timeout = window.setTimeout(() => {
      this.isLongPressing.set(true);
      this.longPressStart.emit({
        event,
        model: this.pressModel()
      });
    }, this.duration());
  }

  endPress(): void {
    this.isLongPressing.set(false);
    this.pressing.set(false);
    this._destroySubscription();

    this.longPressEnd.emit({
      model: this.pressModel()
    });
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  private _destroySubscription(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
