import { Component, Input, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
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

  @Input() row: Object;

  private state: StateService;

  constructor(private state: StateService, elm: ElementRef){
    elm.nativeElement.classList.add('datatable-body-row');
  }

}
