import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/ngx-datatable/src/public-api';
import { Observable } from 'rxjs';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'rx-demo',
  template: `
    <div>
      <h3>
        RXjs Data
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/basic/rx.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material striped"
        [rows]="rows | async"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
      >
      </ngx-datatable>
    </div>
  `,
  imports: [DatatableComponent, AsyncPipe]
})
export class RxDemoComponent {
  rows: Observable<Employee[]>;

  columns: TableColumn[] = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];

  private dataService = inject(DataService);

  constructor() {
    this.rows = this.dataService.load('company.json');
  }
}
