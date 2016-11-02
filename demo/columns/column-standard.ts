import { Component } from '@angular/core';

@Component({
  selector: 'column-standard-demo',
  template: `
    <div>
      <h3>Fixed Column Widths</h3>
      <datatable
        class="material"
        [rows]="rows"
        [columnMode]="'standard'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
        <datatable-column name="Name" [width]="300">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Gender" [width]="300">
          <template let-row="row" let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Age" [width]="300">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
      </datatable>
    </div>
  `
})
export class ColumnStandardComponent {

  rows = [];

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
