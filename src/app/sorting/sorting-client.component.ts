import { Component } from '@angular/core';
import { ColumnMode, SortType, TableColumn } from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';

@Component({
  selector: 'client-sorting-demo',
  template: `
    <div>
      <h3>
        Client-side Sorting
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-client.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [sortType]="SortType.multi"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
      >
      </ngx-datatable>
    </div>
  `,
  standalone: false
})
export class ClientSortingComponent {
  rows: Employee[] = [];

  columns: TableColumn[] = [{ name: 'Company' }, { name: 'Name' }, { name: 'Gender' }];

  ColumnMode = ColumnMode;
  SortType = SortType;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }
}
