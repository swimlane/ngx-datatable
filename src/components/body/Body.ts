import { Component, Input } from '@angular/core';
import { ProgressBar } from './ProgressBar';
import { DataTableBodyRow } from './BodyRow';
import { DataTableScroll } from './Scroll';
import { OrderByPipe } from '../../pipes/OrderBy';
import { StateService } from '../../services/State';

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
        *ngFor="let row of rows"
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
  },
  pipes: [ OrderByPipe ]
})
export class DataTableBody {

  private showProgress: boolean = false;
  private state: StateService;

  constructor(private state: StateService) {}

  get bodyHeight() {
    if(this.state.options.scrollbarV)
      return this.state.bodyHeight;
    return 'auto';
  }

  ngOnInit() {
    this.rows = [...this.state.rows];

    this.state.onPageChange.subscribe(page => {
      const { first, last } = this.state.indexes;
      this.rows = this.state.rows.slice(first, last);
    });

    this.state.onRowsUpdate.subscribe(rows => {
      const { first, last } = this.state.indexes;
      this.rows = rows.slice(first, last);
    });
  }

}
