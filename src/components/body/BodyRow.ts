import { Component, Input, HostBinding } from '@angular/core';
import { DataTableBodyCell } from './BodyCell';

@Component({
  selector: 'datatable-body-row',
  template: `
  	<div>
      <div class="datatable-row-left">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.left"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>

      <div class="datatable-row-center">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.center"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>

      <div class="datatable-row-right">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.right"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
    </div>
  `,
  directives: [ DataTableBodyCell ]
})
export class DataTableBodyRow {

  @Input() state: Object;
  @Input() row: Object;

  @HostBinding('class.datatable-body-row')
  private isRow = true;

}
