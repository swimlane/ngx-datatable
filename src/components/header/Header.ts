import { Component, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { StateService } from '../../services/State';
import { DataTableHeaderCell } from './HeaderCell';
import { Draggable } from './Draggable';

@Component({
  selector: 'datatable-header',
  template: `
  	<div
      [style.width]="state.columnGroupWidths.total"
      class="datatable-header-inner">

      <div class="datatable-row-left">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left"
          draggable
          [dragX]="column.draggable"
          [dragY]="false"
          (onDragStart)="onDragStart()"
          (onDragEnd)="onDragEnd($event, column)"
          [column]="column">
        </datatable-header-cell>
      </div>

      <div class="datatable-row-center">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center"
          draggable
          [dragX]="column.draggable"
          [dragY]="false"
          (onDragStart)="onDragStart()"
          (onDragEnd)="onDragEnd($event, column)"
          [column]="column">
        </datatable-header-cell>
      </div>

      <div class="datatable-row-right">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right"
          draggable
          [dragX]="column.draggable"
          [dragY]="false"
          (onDragStart)="onDragStart()"
          (onDragEnd)="onDragEnd($event, column)"
          [column]="column">
        </datatable-header-cell>
      </div>

    </div>
  `,
  directives: [
    DataTableHeaderCell,
    Draggable
  ],
  host: {
    '[style.width]':'state.innerWidth',
    '[style.height]':'state.options.headerHeight'
  }
})
export class DataTableHeader {

  @ViewChildren(DataTableHeaderCell)
  private cells: QueryList<DataTableHeaderCell>;

  private positions: Object;

  constructor(private state: StateService, elm: ElementRef){
    elm.nativeElement.classList.add('datatable-header');
  }

  onDragStart() {
    this.positions = {};

    let i = 0;
    for(let cell of this.cells.toArray()) {
      let elm = cell.element.nativeElement;
      this.positions[cell.column.prop] =  {
        left: parseInt(elm.offsetLeft),
        index: i++
      };
    }
  }

  onDragEnd({ element }, column) {
    const newPos = parseInt(element.offsetLeft);
    const prevPos = this.positions[column.prop];

    let i = 0;
    for(let prop in this.positions) {
      let pos = this.positions[prop];

      let movedLeft = newPos < pos.left && prevPos.left > pos.left;
      let movedRight = newPos > pos.left && prevPos.left < pos.left;

      if(movedLeft || movedRight) {
        this.state.options.columns.splice(prevPos.index, 1);
        this.state.options.columns.splice(i, 0, column);
      }

      i++;
    }

    element.style.left = 'auto';
  }

}
