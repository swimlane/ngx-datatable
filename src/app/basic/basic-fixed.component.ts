import { Component, inject } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/ngx-datatable/src/public-api';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'basic-fixed-demo',
  template: `
    <div>
      <h3>
        Fix Row Height
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/basic/basic-fixed.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material striped"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
      >
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent]
})
export class BasicFixedComponent {
  rows: Employee[] = [];
  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }
}
