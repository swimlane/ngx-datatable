import { Component, Input, HostBinding } from '@angular/core';
import { ProgressBar } from './ProgressBar';
import { DataTableBodyRow } from './BodyRow';
import { DataTableScroll } from './Scroll';

@Component({
  selector: 'datatable-body',
  template: `
    <datatable-progress
      [hidden]="showProgress">
    </datatable-progress>
    <datatable-scroll
      [rowHeight]="state.options.rowHeight"
      [count]="state.rowCount"
      [scrollWidth]="state.columnGroupWidths.total">
      <datatable-body-row
        *ngFor="let row of state.rows"
        [row]="row"
        [state]="state">
      </datatable-body-row>
    </datatable-scroll>
  `,
  directives: [
    ProgressBar,
    DataTableBodyRow,
    DataTableScroll
  ],
  host: {
    '[style.width]':'state.innerWidth',
    '[style.height]':'bodyHeight',
    '[class.datatable-body]': 'true'
  }
})
export class DataTableBody {

  @Input() state: Object;

  private showProgress = false;

  get bodyHeight() {
    if(this.state.options.scrollbarV)
      return this.state.bodyHeight;
    return 'auto';
  }

}
