import { Component } from '@angular/core';

@Component({
  selector: 'full-screen-demo',
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/fullscreen.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows">
        <ngx-datatable-column name="Id" [width]="80"></ngx-datatable-column>
        <ngx-datatable-column name="Name" [width]="300"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" [width]="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column name="State" [width]="300" prop="address.state"></ngx-datatable-column>
      </ngx-datatable>
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
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
