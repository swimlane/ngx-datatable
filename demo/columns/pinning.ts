import { Component } from '@angular/core';

@Component({
  selector: 'column-pinning-demo',
  template: `
    <div>
      <h3>Column Pinning</h3>
      <swui-data-table
        class="material"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows">
        <swui-data-table-column
          name="Name"
          [width]="300"
          [frozenLeft]="true">
        </swui-data-table-column>
        <swui-data-table-column
          name="Gender">
        </swui-data-table-column>
        <swui-data-table-column
          name="Age">
        </swui-data-table-column>
        <swui-data-table-column
          name="City"
          [width]="150"
          prop="address.city">
        </swui-data-table-column>
        <swui-data-table-column
          name="State"
          [width]="300"
          prop="address.state"
          [frozenRight]="true">
        </swui-data-table-column>
      </swui-data-table>
    </div>
  `
})
export class ColumnPinningComponent {

  rows = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    let req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
