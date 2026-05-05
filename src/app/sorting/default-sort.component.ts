import { Component, inject, OnInit } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'default-sort-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellDirective],
  template: `
    <div>
      <h3>
        Default Sort
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/default-sort.component.ts"
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

        <ngx-datatable-column name="Gender" />
      </ngx-datatable>
    </div>
  `
})
export class DefaultSortComponent implements OnInit {
  rows: Employee[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }
}
