import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({ selector: '[long-press]' })
export class LongPress {

  @Input() duration: number = 500;

  @Output() onLongPress: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

  private _pressing: boolean;
  private _longPressing: boolean;
  private _timeout: any;
  private _interval: any;

  @HostBinding('class.press')
  get press() { return this._pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this._longPressing; }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    // don't do right/middle clicks
    if(event.which !== 1) return;

    this._pressing = true;
    this._longPressing = false;

    this._timeout = setTimeout(() => {
      this._longPressing = true;
      this.onLongPress.emit(event);

      this._interval = setInterval(() => {
        this.onLongPressing.emit(event);
      }, 50);
    }, this.duration);
  }

  @HostListener('mouseup')
  endPress() {
    clearTimeout(this._timeout);
    clearInterval(this._interval);

    this._longPressing = false;
    this._pressing = false;
    this.onLongPressEnd.emit();
  }

}
