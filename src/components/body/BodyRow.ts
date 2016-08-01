import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
import { DataTableBodyCell } from './BodyCell';

@Component({
  selector: 'datatable-body-row',
  template: `
  	<div>
      <div
        class="datatable-row-left"
        *ngIf="state.columnsByPin.left.length"
        [style.width]="state.columnGroupWidths.left + 'px'">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.left"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-center"
        [style.width]="state.columnGroupWidths.center + 'px'"
        *ngIf="state.columnsByPin.center.length">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.center"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-right"
        *ngIf="state.columnsByPin.right.length"
        [style.width]="state.columnGroupWidths.right + 'px'">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.right"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
    </div>
  `,
  directives: [DataTableBodyCell]
})
export class DataTableBodyRow {

  @Input() row: any;

  @HostBinding('class.active') get isSelected() {
    return this.state.selected && this.state.selected.indexOf(this.row) > -1;
  }

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.add('datatable-body-row');
  }


}
