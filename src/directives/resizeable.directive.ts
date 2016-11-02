import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[resizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class ResizeableDirective {

  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  private element: HTMLElement;
  private subscription: Subscription;
  private resizing: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;

    if (this.resizeEnabled) {
      const node = document.createElement('span');
      node.classList.add('resize-handle');
      this.element.appendChild(node);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup() {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    const isHandle = event.target.classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;

      this.subscription = Observable.fromEvent(document, 'mousemove')
        .subscribe((e) => this.move(e, initialWidth, mouseDownScreenX));
    }
  }

  move(event, initialWidth, mouseDownScreenX): void {
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

}
