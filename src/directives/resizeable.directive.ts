import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[resizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class Resizeable {

  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;
  @Output() onResize: EventEmitter<any> = new EventEmitter();

  private element: HTMLElement;
  private subscription: Subscription;
  private prevScreenX: number;
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

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.onResize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    const isHandle = event.target.classList.contains('resize-handle');

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;

      this.subscription = Observable.fromEvent(document, 'mousemove')
        .subscribe((e) => this.move(e));
    }
  }

  move(event): void {
    if (this.prevScreenX == null && (event.movementX || event.mozMovementX) == null) {
      this.prevScreenX = event.screenX;
      return;
    }

    const movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
    const width = this.element.clientWidth;
    const newWidth = width + (movementX || 0);

    this.prevScreenX = event.screenX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

}
