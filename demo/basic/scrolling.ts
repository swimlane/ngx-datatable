import { Component } from '@angular/core';

@Component({
  selector: 'horz-vert-scrolling-demo',
  template: `
    <div>
      <h3>Horizontal and Vertical Scrolling</h3>
      <swui-datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true">
        <swui-datatable-column name="Name" [width]="300"></swui-datatable-column>
        <swui-datatable-column name="Gender"></swui-datatable-column>
        <swui-datatable-column name="Age"></swui-datatable-column>
        <swui-datatable-column name="City" [width]="300" prop="address.city"></swui-datatable-column>
        <swui-datatable-column name="State" [width]="300" prop="address.state"></swui-datatable-column>
      </swui-datatable>
    </div>
  `
})
export class HorzVertScrolling {

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
