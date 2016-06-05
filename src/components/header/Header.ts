import { Component, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { StateService } from '../../services/State';

import { DataTableHeaderCell } from './HeaderCell';
import { Draggable } from './Draggable';
import { Resizable } from './Resizable';
import { Orderable } from './Orderable';

@Component({
  selector: 'datatable-header',
  template: `
  	<div
      [style.width]="state.columnGroupWidths.total"
      class="datatable-header-inner"
      orderable
      (onReorder)="columnReordered($event)">

      <div class="datatable-row-left">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left"
          resizable
          [resizeEnabled]="column.resizable"
          (onResize)="columnResized($event, column)"
          draggable
          [dragX]="column.draggable"
          [dragY]="false"
          [model]="column">
        </datatable-header-cell>
      </div>

      <div class="datatable-row-center">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center"
          resizable
          [resizeEnabled]="column.resizable"
          (onResize)="columnResized($event, column)"
          draggable
          [dragX]="column.draggable"
          [dragY]="false"
          [model]="column">
        </datatable-header-cell>
      </div>

      <div class="datatable-row-right">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right"
          resizable
          [resizeEnabled]="column.resizable"
          [minWidth]="column.minWidth"
          [maxWidth]="column.maxWidth"
          (onResize)="columnResized($event, column)"
          draggable
          [dragX]="column.draggable"
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
    Orderable
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
