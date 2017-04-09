import { Component } from '@angular/core';

@Component({
  selector: 'client-sorting-demo',
  template: `
    <div>
      <h3>
        Client-side Sorting
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/sorting/sorting-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [sortType]="'multi'"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true">
      </ngx-datatable>
    </div>
  `
})
export class ClientSortingComponent {

  rows = [];

  columns = [
    { name: 'Company' },
    { name: 'Name' },
    { name: 'Gender' }
  ];

  constructor() {
    this.fetch((data) => {
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
