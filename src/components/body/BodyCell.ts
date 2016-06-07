import { Component, Input, ElementRef } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
import { deepValueGetter } from '../../utils/deepGetter';

@Component({
  selector: 'datatable-body-cell',
  template: `
  	<div class="datatable-body-cell-label">
      <span [innerHTML]="rowValue"></span>
    </div>
  `,
  directives: [],
  host: {
    '[style.width]':'column.width',
    '[style.height]':'column.height'
  }
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;

  get rowValue() {
    if(!this.row) return '';
    return deepValueGetter(this.row, this.column.prop);
  }

  constructor(elm: ElementRef){
    elm.nativeElement.classList.add('datatable-body-cell');
  }

}
