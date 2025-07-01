import { Component, inject, OnInit } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'default-sorting-demo',
  template: `
    <div>
      <h3>
        Client-side Sorting
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/sorting/sorting-default.component.ts"
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
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [enableClearingSortState]="true"
        [sorts]="[{ prop: 'name', dir: 'desc' }]"
      >
        <ngx-datatable-column name="Company">
          <ng-template let-row="row" ngx-datatable-cell-template>
            {{ row.company }}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Name">
          <ng-template let-row="row" ngx-datatable-cell-template>
            {{ row.name }}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Gender"> </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellDirective]
})
export class DefaultSortingComponent implements OnInit {
  rows: Employee[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }
}
