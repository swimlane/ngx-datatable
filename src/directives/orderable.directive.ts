import {
  Directive, Output, EventEmitter, ContentChildren,
  QueryList, KeyValueDiffers, AfterContentInit, OnDestroy
} from '@angular/core';
import {DraggableDirective} from './draggable.directive';

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
      let left = parseInt(elm.offsetLeft.toString(), 0);
      this.positions[dragger.dragModel.prop] = {
        left: left,
        right: left + parseInt(elm.offsetWidth.toString(), 0),
        index: i++
      };
    }
  }

  onDragEnd({element, model}: any) {
    const newPos = Math.abs(parseInt(element.offsetLeft.toString(), 0));
    const prevPos = this.positions[model.prop];

    let target = this.isTarget(newPos, model);
    if (target) {
      this.reorder.emit({
        prevIndex: prevPos.index,
        newIndex: target.i,
        model
      });
    }

    element.style.left = 'auto';
  }

  isTarget(newPos, model) {
    let i = 0;
    for (const prop in this.positions) {
      // current column position which throws event.
      const pos = this.positions[prop];

      // current column is not the dragging model
      // && newPos in bounds
      if (model.prop != prop && (newPos >= pos.left && newPos <= pos.right)) {
        return {
          pos: pos,
          i: i
        };
      }

      i++;
    }
  }

  private createMapDiffs(): { [key: string]: DraggableDirective } {
    return this.draggables.toArray()
      .reduce((acc, curr) => {
        acc[curr.dragModel.$$id] = curr;
        return acc;
      }, {});
  }

}
