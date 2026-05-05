import { Component, inject, signal } from '@angular/core';
import {
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'column-pinning-demo',
  imports: [DatatableComponent, DataTableColumnDirective],
  template: `
    <div>
      <h3>
        Column Pinning
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-pinning.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        columnMode="force"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows()"
      >
        <ngx-datatable-column name="Name" [width]="300" [frozenLeft]="true" />
        <ngx-datatable-column name="Gender" />
        <ngx-datatable-column name="Age" />
        <ngx-datatable-column name="City" prop="address.city" [width]="150" />
        <ngx-datatable-column
          name="State"
          prop="address.state"
          [width]="300"
          [frozenRight]="true"
        />
      </ngx-datatable>
    </div>
  `
})
export class ColumnPinningComponent {
  readonly rows = signal<FullEmployee[]>([]);

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('100k.json').subscribe(data => this.rows.set(data));
  }
}
