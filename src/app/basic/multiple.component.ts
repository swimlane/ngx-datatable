import { Component } from '@angular/core';
import { ColumnMode, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'multiple-tables-demo',
  template: `
    <div>
      <h3>
        Multiple Tables
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/multiple.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows1"
        [columns]="columns1"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="100"
      >
      </ngx-datatable>
      <br />
      <ngx-datatable
        class="material"
        [rows]="rows2"
        [columns]="columns2"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
      >
      </ngx-datatable>
    </div>
  `,
  standalone: false
})
export class MultipleTablesComponent {
  columns1: TableColumn[] = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  columns2: TableColumn[] = [{ prop: 'name', name: 'Name' }, { name: 'Gender' }];

  rows1 = [
    { name: 'Larry', gender: 'Male', company: 'Cisco' },
    { name: 'Lauren', gender: 'Female', company: 'HP' }
  ];

  rows2 = [
    { name: 'Callie', gender: 'Female' },
    { name: 'Maggie', gender: 'Female' }
  ];

  ColumnMode = ColumnMode;
}
