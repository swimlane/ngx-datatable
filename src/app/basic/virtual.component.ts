import { Component, inject, signal } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent,
  PageEvent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'virtual-scroll-demo',
  imports: [DatatableComponent, DataTableColumnDirective, DataTableColumnCellDirective],
  template: `
    <div>
      <h3>
        Virtual Scrolling with 10k Rows
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/basic/virtual.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      @let rows = this.rows();
      <ngx-datatable
        class="material"
        columnMode="force"
        [rows]="rows"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="getRowHeight"
        [scrollbarV]="true"
        (page)="onPage($event)"
      >
        <ngx-datatable-column name="Name" [width]="300">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <strong>{{ value }}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" [width]="300">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            <i [innerHTML]="row['name']"></i> and <i>{{ value }}</i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Row Height" prop="height" [width]="80" />
      </ngx-datatable>
    </div>
  `
})
export class VirtualScrollComponent {
  readonly rows = signal<(FullEmployee & { height: number })[]>([]);
  expanded = {};
  timeout: any;

  private dataService = inject(DataService);

  constructor() {
    this.dataService
      .load('100k.json')
      .subscribe(data =>
        this.rows.set(data.map(row => ({ ...row, height: Math.floor(Math.random() * 80) + 50 })))
      );
  }

  onPage(event: PageEvent) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('paged!', event);
    }, 100);
  }

  getRowHeight(row: FullEmployee & { height: number }) {
    return row.height;
  }
}
