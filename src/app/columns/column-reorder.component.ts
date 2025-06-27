import { Component, inject } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';
import { DataService } from '../data.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'column-reorder-demo',
  styles: [
    `
      .icon {
        position: absolute;
      }
      .datatable-icon-down {
        top: 0px;
      }
      .datatable-icon-up {
        top: 40px;
      }
      .dragFromLeft .icon {
        left: -13px;
      }
    `
  ],
  template: `
    <div>
      <h3>
        Reorder Column
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-reorder.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [reorderable]="reorderable"
        [swapColumns]="swapColumns"
        [targetMarkerTemplate]="targetMarkerTemplate"
      >
      </ngx-datatable>
      <ng-template #targetMarkerTemplate let-class="class">
        <div [ngClass]="class">
          <div class="icon datatable-icon-down"></div>
          <div class="icon datatable-icon-up"></div>
        </div>
      </ng-template>
    </div>
  `,
  imports: [DatatableComponent, NgClass]
})
export class ColumnReorderComponent {
  rows: Employee[] = [];
  loadingIndicator = true;
  reorderable = true;
  swapColumns = false;

  columns: TableColumn[] = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company', sortable: false }
  ];

  ColumnMode = ColumnMode;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }
}
