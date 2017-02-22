import {
  Directive, Output, EventEmitter, ContentChildren,
  QueryList, KeyValueDiffers, AfterContentInit, OnDestroy
} from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({selector: '[orderable]'})
export class OrderableDirective implements AfterContentInit, OnDestroy {

  @Output() reorder: EventEmitter<any> = new EventEmitter();

  @ContentChildren(DraggableDirective, {descendants: true})
  draggables: QueryList<DraggableDirective>;

  positions: any;
  differ: any;

  constructor(differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
  }

  ngAfterContentInit(): void {
    // HACK: Investigate Better Way
    this.updateSubscriptions();
    this.draggables.changes.subscribe(
      this.updateSubscriptions.bind(this));
  }

  ngOnDestroy(): void {
    this.draggables.forEach(d => {
      d.dragStart.unsubscribe();
      d.dragEnd.unsubscribe();
    });
  }

  updateSubscriptions(): void {
    const diffs = this.differ.diff(this.createMapDiffs());

    if (diffs) {
      const subscribe = ({currentValue, previousValue}: any) => {
        unsubscribe({previousValue});

        if (currentValue) {
          currentValue.dragStart.subscribe(this.onDragStart.bind(this));
          currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
        }
      };

      const unsubscribe = ({previousValue}: any) => {
        if (previousValue) {
          previousValue.dragStart.unsubscribe();
          previousValue.dragEnd.unsubscribe();
        }
      };

      diffs.forEachAddedItem(subscribe.bind(this));
      // diffs.forEachChangedItem(subscribe.bind(this));
      diffs.forEachRemovedItem(unsubscribe.bind(this));
    }
  }

  onDragStart(): void {
    this.positions = {};

    let i = 0;
    for (const dragger of this.draggables.toArray()) {
      const elm = dragger.element;
      this.positions[dragger.dragModel.prop] = {
        left: parseInt(elm.offsetLeft.toString(), 0),
        index: i++
      };
    }
  }

  onDragEnd({element, model}: any) {
    const newPos = parseInt(element.offsetLeft.toString(), 0);
    const prevPos = this.positions[model.prop];

    let i = 0;
    for (const prop in this.positions) {
      const pos = this.positions[prop];

      const movedLeft = newPos < pos.left && prevPos.left > pos.left;
      const movedRight = newPos > pos.left && prevPos.left < pos.left;

      if (movedLeft || movedRight) {
        this.reorder.emit({
          prevIndex: prevPos.index,
          newIndex: i,
          model
        });
      }

      i++;
    }

    element.style.left = 'auto';
  }

  private createMapDiffs(): { [key: string]: DraggableDirective } {
    return this.draggables.toArray()
      .reduce((acc, curr) => {
        acc[curr.dragModel.$$id] = curr;
        return acc;
      }, {});
  }

}
