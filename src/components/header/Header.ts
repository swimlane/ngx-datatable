import { Component, Input, HostBinding } from '@angular/core';
import { DataTableHeaderCell } from './HeaderCell';

@Component({
  selector: 'datatable-header',
  template: `
  	<div
      [style.width]="state.columnGroupWidths.all"
      class="datatable-header-inner">

      <div class="datatable-row-left">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left"
          [column]="column">
        </datatable-header-cell>
      </div>

      <div class="datatable-row-center">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center"
          [column]="column">
        </datatable-header-cell>
      </div>

      <div class="datatable-row-right">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right"
          [column]="column">
        </datatable-header-cell>
      </div>

    </div>
  `,
  directives: [ DataTableHeaderCell ],
  host: {
    '[style.width]':'state.internal.innerWidth',
    '[style.height]':'state.options.headerHeight'
  }
})
export class DataTableHeader {

  @Input() state;

  @HostBinding('class.datatable-header')
  private isHeader = true;

}
