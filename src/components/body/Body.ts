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

      <datatable-scroll>
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
  ]
})
export class DataTableBody {

  @Input() state;

  @HostBinding('class.datatable-body')
  private isBody = true;

  private showProgress = false;

}
