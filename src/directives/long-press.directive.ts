import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({ selector: '[long-press]' })
export class LongPressDirective {

  @Input() duration: number = 500;

  @Output() longPress: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  private pressing: boolean;
  private isLongPressing: boolean;
  private timeout: any;
  private mouseX: number = 0;
  private mouseY: number = 0;

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get isLongPress() { return this.longPressing; }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    // don't do right/middle clicks
    if(event.which !== 1) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPress.emit(event);
      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if(this.pressing && !this.longPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if(xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event) {
    if(this.longPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  endPress() {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this.longPressEnd.emit(true);
  }

  @HostListener('mouseup')
  onMouseUp() { this.endPress(); }

}
