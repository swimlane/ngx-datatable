import { Component } from '@angular/core';
import { DatatableComponent, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'multiple-tables-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Multiple Tables
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/main/src/app/basic/multiple-tables.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        columnMode="force"
        [rows]="rows1"
        [columns]="columns1"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="100"
      />
      <br />
      <ngx-datatable
        class="material"
        rowHeight="auto"
        [rows]="rows2"
        [columns]="columns2"
        [headerHeight]="50"
        [footerHeight]="50"
      />
    </div>
  `
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
}
