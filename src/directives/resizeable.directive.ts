import {
  Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[resizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class ResizeableDirective implements OnDestroy {

  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  subscription: Subscription;
  resizing: boolean = false;

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

  @HostListener('document:mouseup')
  onMouseup(): void {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;

      this.subscription = Observable.fromEvent(document, 'mousemove')
        .subscribe((e: MouseEvent) => this.move(e, initialWidth, mouseDownScreenX));
    }
  }

  move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

}
