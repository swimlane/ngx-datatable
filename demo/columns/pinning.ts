import { Component } from '@angular/core';

@Component({
  selector: 'column-pinning-demo',
  template: `
    <div>
      <h3>Column Pinning</h3>
      <swui-datatable
        class="material"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows">
        <swui-datatable-column
          name="Name"
          [width]="300"
          [frozenLeft]="true">
        </swui-datatable-column>
        <swui-datatable-column
          name="Gender">
        </swui-datatable-column>
        <swui-datatable-column
          name="Age">
        </swui-datatable-column>
        <swui-datatable-column
          name="City"
          [width]="150"
          prop="address.city">
        </swui-datatable-column>
        <swui-datatable-column
          name="State"
          [width]="300"
          prop="address.state"
          [frozenRight]="true">
        </swui-datatable-column>
      </swui-datatable>
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
