import { Component, inject, signal } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'basic-auto-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Fluid Row Heights
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/basic-auto.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        rowHeight="auto"
        columnMode="force"
        [rowDraggable]="true"
        [rows]="rows()"
        [loadingIndicator]="loadingIndicator()"
        [columns]="columns"
        [headerHeight]="50"
        [footerHeight]="50"
        [reorderable]="reorderable"
      />
    </div>
  `
})
export class BasicAutoComponent {
  readonly rows = signal<Employee[]>([]);
  readonly loadingIndicator = signal(true);
  reorderable = true;

  columns: TableColumn[] = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company', sortable: false }
  ];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows.set(data);
      setTimeout(() => this.loadingIndicator.set(false), 1500);
    });
  }
}
