import { Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent,
  PageEvent
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { FullEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'ten-k-rows-demo',
  imports: [
    DatatableComponent,
    DataTableColumnDirective,
    DataTableColumnCellDirective,
    FormsModule
  ],
  template: `
    <div>
      <h3>
        10k Rows
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/10k-rows.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>

      <form class="info" (ngSubmit)="scroll()">
        <label for="target-index">Target Index</label>
        <input
          type="number"
          id="target-index"
          [ngModelOptions]="{ standalone: true }"
          [(ngModel)]="scrollTarget"
        />
        <label for="target-block">Block</label>
        <select id="target-block" [ngModelOptions]="{ standalone: true }" [(ngModel)]="scrollBlock">
          <option value="start">start</option>
          <option value="center">center</option>
          <option value="end">end</option>
          <option value="nearest">nearest</option>
        </select>
        <button type="submit">Scroll</button>
      </form>

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
export class TenKRowsComponent {
  readonly rows = signal<(FullEmployee & { height: number })[]>([]);
  readonly scrollTarget = signal(0);
  readonly scrollBlock = signal<ScrollLogicalPosition>('start');
  expanded = {};
  timeout: any;

  private dataService = inject(DataService);
  private readonly datatable = viewChild.required(DatatableComponent);

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

  protected scroll(): void {
    const row = this.rows()[this.scrollTarget()];
    if (row) {
      this.datatable().scrollToRow(row, { behavior: 'smooth', block: this.scrollBlock() });
    }
  }
}
