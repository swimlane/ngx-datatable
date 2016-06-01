import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'datatable-body-cell',
  template: `
  	<div>
      <span
        class="datatable-body-cell-label"
        [innerHTML]="rowValue">
      </span>
    </div>
  `,
  directives: [],
  host: {
    '[style.width]':'column.width',
    '[style.height]':'column.height'
  }
})
export class DataTableBodyCell {

  @Input() column: {};
  @Input() row: {};

  @HostBinding('class.datatable-body-cell')
  private isCell = true;

  get rowValue() {
    return this.row[this.column.prop];
  }

}
