import {
  Component,
  Output,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { StateService } from '../../services/State';

import { LongPress } from '../../directives/LongPress';
import { Draggable } from '../../directives/Draggable';
import { Resizeable } from '../../directives/Resizeable';
import { Orderable } from '../../directives/Orderable';

import { DataTableHeaderCell } from './HeaderCell';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      [style.width]="state.columnGroupWidths.total"
      class="datatable-header-inner"
      orderable
      (onReorder)="columnReordered($event)">
      <div
        class="datatable-row-left"
        [style.width]="state.columnGroupWidths.left + 'px'"
        *ngIf="state.columnsByPin.left.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [model]="column"
          (onColumnChange)="onColumnChange.emit($event)">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-center"
        [style.width]="state.columnGroupWidths.center + 'px'"
        *ngIf="state.columnsByPin.center.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [model]="column"
          (onColumnChange)="onColumnChange.emit($event)">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-right"
        [style.width]="state.columnGroupWidths.right + 'px'"
        *ngIf="state.columnsByPin.right.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [model]="column"
          (onColumnChange)="onColumnChange.emit($event)">
        </datatable-header-cell>
      </div>
    </div>
  `,
  directives: [
    DataTableHeaderCell,
    Draggable,
    Resizeable,
    Orderable,
    LongPress
  ],
  host: {
    '[style.width]': 'headerWidth',
    '[style.height]': 'headerHeight'
  }
})
export class DataTableHeader {

  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  get headerWidth() {
    if(this.state.options.scrollbarH)
      return this.state.innerWidth + 'px';

    return '100%';
  }

  get headerHeight() {
    let height = this.state.options.headerHeight;
    if(height !== 'auto') return `${height}px`;
    return height;
  }

  constructor(private state: StateService, elm: ElementRef) {
    elm.nativeElement.classList.add('datatable-header');
  }

  columnResized(width, column) {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if(width >= column.maxWidth) {
      width = column.maxWidth;
    }

    column.width = width;

    this.onColumnChange.emit({
      type: 'resize',
      value: column
    });
  }

  columnReordered({ prevIndex, newIndex, model }) {
    this.state.options.columns.splice(prevIndex, 1);
    this.state.options.columns.splice(newIndex, 0, model);

    this.onColumnChange.emit({
      type: 'reorder',
      value: model
    });
  }

}
