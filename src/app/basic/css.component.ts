import { Component, inject } from '@angular/core';
import {
  DataTableColumnDirective,
  DatatableComponent,
  TableColumn
} from 'projects/ngx-datatable/src/public-api';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'row-css-demo',
  template: `
    <div>
      <h3>
        Row/Header/Cell CSS Class Demo
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/basic/css.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [rowHeight]="50"
        [rowClass]="getRowClass"
        [scrollbarV]="true"
      >
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column
          name="Gender"
          headerClass="is-gender"
          [cellClass]="getCellClass"
        ></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent, DataTableColumnDirective]
})
export class RowCssComponent {
  rows: FullEmployee[] = [];
  expanded = {};

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('100k.json').subscribe(data => {
      this.rows = data.splice(0, 50);
    });
  }

  getRowClass(row: FullEmployee) {
    return {
      'age-is-ten': row.age % 10 === 0
    };
  }

  getCellClass: TableColumn['cellClass'] = ({ row, column, value }) => {
    return {
      'is-female': value === 'female'
    };
  };
}
