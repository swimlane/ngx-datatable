import {
  Directive, Output, EventEmitter, ContentChildren,
  QueryList, KeyValueDiffers
} from '@angular/core';

import { DraggableDirective } from './draggable.directive';

@Directive({ selector: '[orderable]' })
export class OrderableDirective {

  @Output() reorder: EventEmitter<any> = new EventEmitter();

  @ContentChildren(DraggableDirective, { descendants: true })
  private draggables: QueryList<DraggableDirective>;

  private positions: any;
  private differ: any;

  constructor(differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
  }

  ngAfterContentInit() {
    // HACK: Investigate Better Way
    this.updateSubscriptions();
    this.draggables.changes.subscribe(
        this.updateSubscriptions.bind(this));
  }

  ngOnDestroy() {
    this.draggables.forEach(d => {
      d.dragStart.unsubscribe();
      d.dragEnd.unsubscribe();
    });
  }
  
  updateSubscriptions() {
    const diffs = this.differ.diff(this.draggables.toArray());

    if(diffs) {
      const subscribe = ({ currentValue, previousValue }) => {
        unsubscribe({ previousValue });

        if(currentValue) {
          currentValue.dragStart.subscribe(this.onDragStart.bind(this));
          currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
        }
      };

      const unsubscribe = ({ previousValue }) => {
        if(previousValue) {
          previousValue.dragStart.unsubscribe();
          previousValue.dragEnd.unsubscribe();
        }
      };

      diffs.forEachAddedItem(subscribe.bind(this));
      diffs.forEachChangedItem(subscribe.bind(this));
      diffs.forEachRemovedItem(unsubscribe.bind(this));
    }
  }

  onDragStart() {
    this.positions = {};

    let i = 0;
    for(let dragger of this.draggables.toArray()) {
      let elm = dragger.element;
      this.positions[dragger.dragModel.prop] =  {
        left: parseInt(elm.offsetLeft.toString(), 0),
        index: i++
      };
    }
  }

  onDragEnd({ element, model }) {
    const newPos = parseInt(element.offsetLeft.toString(), 0);
    const prevPos = this.positions[model.prop];

    let i = 0;
    for(let prop in this.positions) {
      let pos = this.positions[prop];

      let movedLeft = newPos < pos.left && prevPos.left > pos.left;
      let movedRight = newPos > pos.left && prevPos.left < pos.left;

      if(movedLeft || movedRight) {
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

}
