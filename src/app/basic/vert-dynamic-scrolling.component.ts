import { Component, inject } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'vert-dynamic-scrolling-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellDirective],
  template: `
    <div>
      <h3>
        Vert Dynamic Scrolling
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/vert-dynamic-scrolling.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        #mydatatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [headerHeight]="50"
        [limit]="5"
        [virtualization]="false"
        [scrollbarV]="true"
        [scrollbarVDynamic]="true"
        [footerHeight]="50"
        [rows]="rows"
      >
        <ngx-datatable-column name="Name">
          <ng-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-row="row"
            ngx-datatable-cell-template
          >
            @if (editing[rowIndex + '-name']) {
              <input type="text" [value]="value" (blur)="updateValue($event, 'name', rowIndex)" />
            } @else {
              <span title="Double click to edit" (dblclick)="editing[rowIndex + '-name'] = true">
                {{ value }}
              </span>
            }
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <ng-template
            let-rowIndex="rowIndex"
            let-row="row"
            let-value="value"
            ngx-datatable-cell-template
          >
            @if (!editing[rowIndex + '-gender']) {
              <span title="Double click to edit" (dblclick)="editing[rowIndex + '-gender'] = true">
                {{ value }}
              </span>
            } @else {
              <select
                [value]="value"
                (blur)="editing[rowIndex + '-gender'] = false"
                (change)="updateValue($event, 'gender', rowIndex)"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            }
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class VertDynamicScrollingComponent {
  editing: Record<string, boolean> = {};
  rows: Employee[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data.slice(0, 5);
    });
  }

  updateValue(event: Event, cell: 'gender' | 'name', rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = (event.target as HTMLInputElement | HTMLSelectElement).value;
    this.rows = [...this.rows];
  }
}
