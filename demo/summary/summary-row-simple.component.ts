import { Component } from '@angular/core';

@Component({
  selector: 'summary-row-simple-demo',
  template: `
    <div>
      <h3>Simple Summary Row
        <small>
        <a href="https://github.com/sirwojtek/ngx-datatable/blob/summary-row/demo/summary/summary-row-simple.ts">
          Source
        </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
      </ngx-datatable>
    </div>
  `
})

export class SummaryRowSimpleComponent {
  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { prop: 'age' },
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
