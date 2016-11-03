import { Component } from '@angular/core';

@Component({
  selector: 'full-screen-demo',
  template: `
    <div>
      <h3>Full Screen</h3>
      <datatable
        class="material fullscreen"
        style="top: 52px"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows">
        <datatable-column name="Id" [width]="80"></datatable-column>
        <datatable-column name="Name" [width]="300"></datatable-column>
        <datatable-column name="Gender"></datatable-column>
        <datatable-column name="Age"></datatable-column>
        <datatable-column name="City" [width]="300" prop="address.city"></datatable-column>
        <datatable-column name="State" [width]="300" prop="address.state"></datatable-column>
      </datatable>
    </div>
  `
})
export class FullScreenComponent {

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
