import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'server-sorting-demo',
  template: `
    <div>
      <h3>
        Server-side Sorting
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-server.component.ts"
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
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [externalSorting]="true"
        [loadingIndicator]="loading"
        (sort)="onSort($event)"
      >
      </ngx-datatable>
    </div>
  `
})
export class ServerSortingComponent {
  loading = false;

  rows = [];

  columns = [
    { name: 'Company', sortable: true },
    { name: 'Name', sortable: true },
    { name: 'Gender', sortable: true }
  ];

  ColumnMode = ColumnMode;

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
      cb(data.splice(0, 20));
    };

    req.send();
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }
}
