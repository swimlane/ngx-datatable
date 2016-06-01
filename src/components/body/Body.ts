import { Component, Input, HostBinding } from '@angular/core';
import { ProgressBar } from './ProgressBar';
import { DataTableBodyRow } from './BodyRow';
import { DataTableScroll } from './Scroll';

@Component({
  selector: 'datatable-body',
  template: `
  	<div>
      <datatable-progress
        [hidden]="showProgress">
      </datatable-progress>
      <datatable-scroll
        [rowHeight]="state.options.rowHeight"
        [count]="state.rows.length"
        [scrollWidth]="state.columnGroupWidths.total">
        <datatable-body-row
          *ngFor="let row of state.rows"
          [row]="row"
          [state]="state">
        </datatable-body-row>
      </datatable-scroll>
    </div>
  `,
  directives: [
    ProgressBar,
    DataTableBodyRow,
    DataTableScroll
  ],
  host: {
    '[style.width]':'state.internal.innerWidth',
    '[style.height]':'state.internal.bodyHeight'
  }
})
export class DataTableBody {

  @Input() state: Object;

  @HostBinding('class.datatable-body')
  private isBody = true;

  private showProgress = false;

}
