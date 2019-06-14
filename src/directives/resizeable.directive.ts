import {
  Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy, AfterViewInit, Renderer2
} from '@angular/core';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { MouseEvent, TouchEvent } from '../events';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[resizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class ResizeableDirective implements OnDestroy, AfterViewInit {

  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  subscription: Subscription;
  resizing: boolean = false;

  constructor(element: ElementRef, private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngAfterViewInit(): void {
    const renderer2 = this.renderer;
    const node = renderer2.createElement('span');
    if (this.resizeEnabled) {
      renderer2.addClass(node, 'resize-handle');
    } else {
      renderer2.addClass(node, 'resize-handle--not-resizable');
    }
    renderer2.appendChild(this.element, node);
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  onMouseup(): void {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMousedown(event: MouseEvent | TouchEvent): void {
    const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = (<MouseEvent>event).screenX ||
      ((<TouchEvent>event).targetTouches && (<TouchEvent>event).targetTouches[0].screenX);

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;

      const mouseup = merge(
        fromEvent(document, 'mouseup'),
        fromEvent(document, 'touchend')
      );
      this.subscription = mouseup
        .subscribe((ev: MouseEvent | TouchEvent) => this.onMouseup());

      const mouseMoveSub = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'touchmove')
      )
        .pipe(takeUntil(mouseup))
        .subscribe((e: MouseEvent | TouchEvent) => this.move(e, initialWidth, mouseDownScreenX));

      this.subscription.add(mouseMoveSub);
    }
  }

  move(event: MouseEvent | TouchEvent, initialWidth: number, mouseDownScreenX: number): void {
    const screenX = (<MouseEvent>event).screenX ||
      ((<TouchEvent>event).targetTouches && (<TouchEvent>event).targetTouches[0].screenX);
    const movementX = screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
