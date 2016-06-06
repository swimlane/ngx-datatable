import { Component, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { StateService } from '../../services/State';

import { LongPress } from '../../directives/LongPress';
import { Draggable } from '../../directives/Draggable';
import { Resizable } from '../../directives/Resizable';
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
        class="datatable-row-left">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left"
          resizable
          [resizeEnabled]="column.resizable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="draggable = true"
          (onLongPressEnd)="draggable = false"
          draggable
          [dragX]="column.draggable && draggable"
          [dragY]="false"
          [model]="column">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-center">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center"
          resizable
          [resizeEnabled]="column.resizable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="draggable = true"
          (onLongPressEnd)="draggable = false"
          draggable
          [dragX]="column.draggable && draggable"
          [dragY]="false"
          [model]="column">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-right">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right"
          resizable
          [resizeEnabled]="column.resizable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="draggable = true"
          (onLongPressEnd)="draggable = false"
          draggable
          [dragX]="column.draggable && draggable"
          [dragY]="false"
          [model]="column">
        </datatable-header-cell>
      </div>
    </div>
  `,
  directives: [
    DataTableHeaderCell,
    Draggable,
    Resizable,
    Orderable,
    LongPress
  ],
  host: {
    '[style.width]':'state.innerWidth',
    '[style.height]':'state.options.headerHeight'
  }
})
export class DataTableHeader {

  constructor(private state: StateService, elm: ElementRef){
    elm.nativeElement.classList.add('datatable-header');
  }

  columnResized(width, column) {
    column.width = width;
  }

  columnReordered({ prevIndex, newIndex, model }) {
    this.state.options.columns.splice(prevIndex, 1);
    this.state.options.columns.splice(newIndex, 0, model);
  }

}
