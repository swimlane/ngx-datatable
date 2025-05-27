import {
  booleanAttribute,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  numberAttribute,
  OnDestroy,
  Output
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TableColumnInternal } from '../types/internal.types';

@Directive({
  selector: '[long-press]'
})
export class LongPressDirective implements OnDestroy {
  @Input({ transform: booleanAttribute }) pressEnabled = true;
  @Input() pressModel: TableColumnInternal;
  @Input({ transform: numberAttribute }) duration = 500;

  @Output() longPressStart = new EventEmitter<{ event: MouseEvent; model: TableColumnInternal }>();
  @Output() longPressEnd = new EventEmitter<{ model: TableColumnInternal }>();

  pressing: boolean;
  isLongPressing: boolean;
  timeout: any;

  subscription: Subscription;

  @HostBinding('class.press')
  get press(): boolean {
    return this.pressing;
  }

  @HostBinding('class.longpress')
  get isLongPress(): boolean {
    return this.isLongPressing;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1 || !this.pressEnabled) {
      return;
    }

    // don't start drag if its on resize handle
    const target = event.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      return;
    }

    this.pressing = true;
    this.isLongPressing = false;

    const mouseup = fromEvent(document, 'mouseup');
    this.subscription = mouseup.subscribe(() => this.endPress());

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });
    }, this.duration);
  }

  endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
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
