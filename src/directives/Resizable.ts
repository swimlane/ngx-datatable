import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[resizable]',
  host: {
    '[class.resizable]': 'resizeEnabled'
  }
})
export class Resizable {

  @Input() resizeEnabled = true;
  @Input() minWidth;
  @Input() maxWidth;

  @Output() onResize = new EventEmitter();

  private prevScreenX: number = 0;
  private resizing: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;

    if(this.resizeEnabled) {
      var node = document.createElement('span');
      node.classList.add('resize-handle');
      this.element.appendChild(node);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    this.resizing = false;

    if(this.subcription) {
      this.subcription.unsubscribe();
      this.onResize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    const isHandle = event.target.classList.contains('resize-handle');

    if(isHandle) {
      event.stopPropagation();
      this.resizing = true;

      this.subcription = Observable.fromEvent(document, 'mousemove')
        .subscribe((event) => this.move(event));
    }
  }

  move(event) {
    const movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
    const width = this.element.clientWidth;
    const newWidth = width + (movementX || 0);

    this.prevScreenX = event.screenX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if(overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

}
