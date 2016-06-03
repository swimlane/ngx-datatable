import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';


/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 * 	 https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 * 	 http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
@Directive({ selector: '[draggable]' })
export class Draggable {

  @Input() dragX = true;
  @Input() dragY = true;

  @Output() onDragStart = new EventEmitter();
  @Output() onDragging = new EventEmitter();
  @Output() onDragEnd = new EventEmitter();

  private dragging: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    this.dragging = false;

    if(this.subcription) {
      this.subcription.unsubscribe();
      this.onDragEnd.emit({ event, element: this.element });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    const draggable = event.target.classList.contains('datatable-header-cell-label');

    if(draggable) {
      event.preventDefault();
      this.dragging = true;

      const mouseDownPos = { x: event.clientX, y: event.clientY };
      this.subcription = Observable.fromEvent(document, 'mousemove')
        .subscribe((event) => this.move(event, mouseDownPos));

      this.onDragStart.emit({ event, element: this.element });
    }
  }

  move(event, mouseDownPos) {
    if(!this.dragging) return;

    const x = event.clientX - mouseDownPos.x;
    const y = event.clientY - mouseDownPos.y;

    if(this.dragX) this.element.style.left = `${x}px`;
    if(this.dragY) this.element.style.top = `${y}px`;

    this.onDragging.emit({ event, element: this.element });
  }

}
