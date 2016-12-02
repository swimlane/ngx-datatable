import { Component } from '@angular/core';

@Component({
  selector: 'column-force-demo',
  template: `
    <div>
      <h3>Force Fill Column Width Distribution</h3>
      <swui-data-table
        class="material"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
        <swui-data-table-column name="Name" [width]="100">
          <template let-value="value" swui-data-table-cell-template>
            {{value}}
          </template>
        </swui-data-table-column>
        <swui-data-table-column name="Gender" [width]="100">
          <template let-row="row" let-value="value" swui-data-table-cell-template>
            {{value}}
          </template>
        </swui-data-table-column>
        <swui-data-table-column name="Age" [width]="300">
          <template let-value="value" swui-data-table-cell-template>
            {{value}}
          </template>
        </swui-data-table-column>
      </swui-data-table>
    </div>
  `
})
export class ColumnForceComponent {

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
