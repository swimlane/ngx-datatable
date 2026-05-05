import { Component, inject } from '@angular/core';
import {
  DataTableColumnDirective,
  DatatableComponent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'css-classes-demo',
  imports: [DatatableComponent, DataTableColumnDirective],
  template: `
    <div>
      <h3>
        CSS Classes
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/css-classes.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        columnMode="force"
        [rows]="rows"
        [headerHeight]="50"
        [rowHeight]="50"
        [rowClass]="getRowClass"
        [scrollbarV]="true"
      >
        <ngx-datatable-column name="Name" />
        <ngx-datatable-column name="Gender" headerClass="is-gender" [cellClass]="getCellClass" />
        <ngx-datatable-column name="Age" />
      </ngx-datatable>
    </div>
  `
})
export class CssClassesComponent {
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
