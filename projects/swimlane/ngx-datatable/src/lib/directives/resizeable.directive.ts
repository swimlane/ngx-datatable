import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[resizeable]',
  standalone: true
})
export class ResizeableDirective implements OnDestroy, AfterViewInit {
  private renderer = inject(Renderer2);

  @HostBinding('class.resizeable') @Input({ transform: booleanAttribute }) resizeEnabled = true;
  @Input({ transform: numberAttribute }) minWidth: number;
  @Input({ transform: numberAttribute }) maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() resizing: EventEmitter<any> = new EventEmitter();

  element = inject(ElementRef).nativeElement;
  subscription: Subscription;
  private resizeHandle: HTMLElement;

  ngAfterViewInit(): void {
    const renderer2 = this.renderer;
    this.resizeHandle = renderer2.createElement('span');
    if (this.resizeEnabled) {
      renderer2.addClass(this.resizeHandle, 'resize-handle');
    } else {
      renderer2.addClass(this.resizeHandle, 'resize-handle--not-resizable');
    }
    renderer2.appendChild(this.element, this.resizeHandle);
  }

  ngOnDestroy(): void {
    this._destroySubscription();
    if (this.renderer.destroyNode) {
      this.renderer.destroyNode(this.resizeHandle);
    } else if (this.resizeHandle) {
      this.renderer.removeChild(this.renderer.parentNode(this.resizeHandle), this.resizeHandle);
    }
  }

  onMouseup(): void {
    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    const isHandle = (event.target as HTMLElement).classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;

    if (isHandle) {
      event.stopPropagation();

      const mouseup = fromEvent(document, 'mouseup');
      this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup());

      const mouseMoveSub = fromEvent(document, 'mousemove')
        .pipe(takeUntil(mouseup))
        .subscribe((e: MouseEvent) => this.move(e, initialWidth, mouseDownScreenX));

      this.subscription.add(mouseMoveSub);
    }
  }

  move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    this.resizing.emit(newWidth);
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
