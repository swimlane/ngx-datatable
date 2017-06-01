import {
  Directive, ElementRef, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import { MouseEvent } from '../events';

/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
@Directive({ selector: '[draggable]' })
export class DraggableDirective implements OnDestroy, OnChanges {

  @Input() dragEventTarget: any;
  @Input() dragModel: any;
  @Input() dragX: boolean = true;
  @Input() dragY: boolean = true;

  @Output() dragStart: EventEmitter<any> = new EventEmitter();
  @Output() dragging: EventEmitter<any> = new EventEmitter();
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  isDragging: boolean = false;
  subscription: Subscription;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
      this.onMousedown(changes['dragEventTarget'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  onMouseup(event: MouseEvent): void {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.element.classList.remove('dragging');

    if (this.subscription) {
      this._destroySubscription();
      this.dragEnd.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }

  onMousedown(event: MouseEvent): void {
    // we only want to drag the inner header text
    const isDragElm = (<HTMLElement>event.target).classList.contains('draggable');
    
    if(isDragElm && (this.dragX || this.dragY)) {
      event.preventDefault();
      this.isDragging = true;

      const mouseDownPos = { x: event.clientX, y: event.clientY };

      const mouseup = Observable.fromEvent(document, 'mouseup');
      this.subscription = mouseup
        .subscribe((ev: MouseEvent) => this.onMouseup(ev));

      const mouseMoveSub = Observable.fromEvent(document, 'mousemove')
        .takeUntil(mouseup)
        .subscribe((ev: MouseEvent) => this.move(ev, mouseDownPos));

      this.subscription.add(mouseMoveSub);

      this.dragStart.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }

  move(event: MouseEvent, mouseDownPos: { x: number, y: number }): void {
    if (!this.isDragging) return;

    const x = event.clientX - mouseDownPos.x;
    const y = event.clientY - mouseDownPos.y;

    if (this.dragX) this.element.style.left = `${x}px`;
    if (this.dragY) this.element.style.top = `${y}px`;

    this.element.classList.add('dragging');

    this.dragging.emit({
      event,
      element: this.element,
      model: this.dragModel
    });
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
