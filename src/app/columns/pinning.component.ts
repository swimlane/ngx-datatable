import { Component, inject } from '@angular/core';
import {
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/ngx-datatable/src/public-api';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'column-pinning-demo',
  template: `
    <div>
      <h3>
        Column Pinning
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/columns/pinning.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows"
      >
        <ngx-datatable-column name="Name" [width]="300" [frozenLeft]="true"> </ngx-datatable-column>
        <ngx-datatable-column name="Gender"> </ngx-datatable-column>
        <ngx-datatable-column name="Age"> </ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="150" prop="address.city"> </ngx-datatable-column>
        <ngx-datatable-column name="State" [width]="300" prop="address.state" [frozenRight]="true">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent, DataTableColumnDirective]
})
export class ColumnPinningComponent {
  rows: FullEmployee[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('100k.json').subscribe(data => {
      this.rows = data;
    });
  }
}
