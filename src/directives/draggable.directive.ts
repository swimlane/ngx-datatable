import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
@Directive({ selector: '[draggable]' })
export class DraggableDirective {

  @Input() dragModel: any;
  @Input() dragX: boolean = true;
  @Input() dragY: boolean = true;

  @Output() dragStart: EventEmitter<any> = new EventEmitter();
  @Output() dragging: EventEmitter<any> = new EventEmitter();
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  private isDragging: boolean = false;
  private subscription: Subscription;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    this.isDragging = false;
    this.element.classList.remove('dragging');

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.dragEnd.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    if (event.target.classList.contains('draggable')) {
      event.preventDefault();
      this.isDragging = true;

      const mouseDownPos = { x: event.clientX, y: event.clientY };
      this.subscription = Observable.fromEvent(document, 'mousemove')
        .subscribe((ev) => this.move(ev, mouseDownPos));

      this.dragStart.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }

  move(event, mouseDownPos): void {
    if (!this.dragging) return;

    const x = event.clientX - mouseDownPos.x;
    const y = event.clientY - mouseDownPos.y;

    if (this.dragX) this.element.style.left = `${x}px`;
    if (this.dragY) this.element.style.top = `${y}px`;

    if (this.dragX || this.dragY) {
      this.element.classList.add('dragging');

      this.dragging.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }

}
