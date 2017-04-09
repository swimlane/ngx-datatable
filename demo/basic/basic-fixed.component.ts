import { Component } from '@angular/core';

@Component({
  selector: 'basic-fixed-demo',
  template: `
    <div>
      <h3>
        Fix Row Height
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/basic-fixed.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material striped"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50">
      </ngx-datatable>
    </div>
  `
})
export class BasicFixedComponent {

  rows = [];
  columns = [
    { prop: 'name' },
    { name: 'Company' },
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
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
