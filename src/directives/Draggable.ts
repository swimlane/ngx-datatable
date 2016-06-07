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

  // this kinda a hack to get
  // the model in the orderable
  @Input() model: any;

  @Input() dragX: boolean = true;
  @Input() dragY: boolean = true;

  @Output() onDragStart: EventEmitter = new EventEmitter();
  @Output() onDragging: EventEmitter = new EventEmitter();
  @Output() onDragEnd: EventEmitter = new EventEmitter();

  private dragging: boolean = false;
  private subscription: any;
  element: HTMLElement;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    this.dragging = false;

    if(this.subscription) {
      this.subscription.unsubscribe();
      this.onDragEnd.emit({
        event,
        element: this.element,
        model: this.model
      });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    if(event.target.classList.contains('draggable')) {
      event.preventDefault();
      this.dragging = true;

      const mouseDownPos = { x: event.clientX, y: event.clientY };
      this.subscription = Observable.fromEvent(document, 'mousemove')
        .subscribe((event) => this.move(event, mouseDownPos));

      this.onDragStart.emit({
        event,
        element: this.element,
        model: this.model
      });
    }
  }

  move(event, mouseDownPos) {
    if(!this.dragging) return;

    const x = event.clientX - mouseDownPos.x;
    const y = event.clientY - mouseDownPos.y;

    if(this.dragX) this.element.style.left = `${x}px`;
    if(this.dragY) this.element.style.top = `${y}px`;

    if(this.dragX || this.dragY) {
      this.onDragging.emit({
        event,
        element: this.element,
        model: this.model
      });
    }
  }

}
