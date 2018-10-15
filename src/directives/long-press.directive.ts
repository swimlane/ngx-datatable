import {
  Directive, Input, Output, EventEmitter, HostBinding,
  HostListener, OnDestroy
} from '@angular/core';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MouseEvent, TouchEvent } from '../events';

@Directive({ selector: '[long-press]' })
export class LongPressDirective implements OnDestroy {

  @Input() pressEnabled: boolean = true;
  @Input() pressModel: any;
  @Input() duration: number = 500;

  @Output() longPressStart: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  pressing: boolean;
  isLongPressing: boolean;
  timeout: any;
  mouseX: number = 0;
  mouseY: number = 0;

  subscription: Subscription;

  @HostBinding('class.press')
  get press(): boolean { return this.pressing; }

  @HostBinding('class.longpress')
  get isLongPress(): boolean {
    return this.isLongPressing;
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: MouseEvent | TouchEvent): void {
    // don't do right/middle clicks
    if ((event.which !== 1 || !this.pressEnabled) && event.type !== 'touchstart') return;

    // don't start drag if its on resize handle
    const target = (<HTMLElement>event.target);
    const clientX = (<MouseEvent>event).clientX ||
      ((<TouchEvent>event).targetTouches && (<TouchEvent>event).targetTouches[0].clientX);
    const clientY = (<MouseEvent>event).clientY ||
      ((<TouchEvent>event).targetTouches && (<TouchEvent>event).targetTouches[0].clientY);
    if (target.classList.contains('resize-handle')) return;

    this.mouseX = clientX;
    this.mouseY = clientY;

    this.pressing = true;
    this.isLongPressing = false;

    const mouseup = merge(
      fromEvent(document, 'mouseup'),
      fromEvent(document, 'touchend'));
    this.subscription = mouseup.subscribe((ev: MouseEvent | TouchEvent) => this.onMouseup());

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });

      this.subscription.add(
        fromEvent(document, 'mousemove')
          .pipe(takeUntil(mouseup))
          .subscribe((mouseEvent: MouseEvent | TouchEvent) => this.onMouseMove(mouseEvent))
      );

      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  onMouseMove(event: MouseEvent | TouchEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const clientX = (<MouseEvent>event).clientX ||
        ((<TouchEvent>event).targetTouches && (<TouchEvent>event).targetTouches[0].clientX);
      const clientY = (<MouseEvent>event).clientY ||
        ((<TouchEvent>event).targetTouches && (<TouchEvent>event).targetTouches[0].clientY);
      const xThres = Math.abs(clientX - this.mouseX) > 10;
      const yThres = Math.abs(clientY - this.mouseY) > 10;

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event: MouseEvent | TouchEvent): void {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit({
          event,
          model: this.pressModel
        });
        this.loop(event);
      }, 50);
    }
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

  onMouseup(): void {
    this.endPress();
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
