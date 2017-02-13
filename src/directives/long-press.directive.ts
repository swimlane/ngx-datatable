import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import "rxjs/add/operator/takeUntil"

@Directive({ selector: '[long-press]' })
export class LongPressDirective {

  @Input() duration: number = 500;

  @Output() longPress: EventEmitter<any> = new EventEmitter();
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
  onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    let mouseup = Observable.fromEvent(document, 'mouseup');
    this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup());

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPress.emit(event);

      this.subscription.add(
        Observable.fromEvent(document, 'mousemove')
          .takeUntil(mouseup)
          .subscribe((mouseEvent: MouseEvent) => this.onMouseMove(mouseEvent))
      );

      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event: Event): void {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this.subscription.unsubscribe();

    this.longPressEnd.emit(true);
  }


  onMouseup(): void {
    this.endPress()
  }

}
