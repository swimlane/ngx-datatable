import { Component } from '@angular/core';

@Component({
  selector: 'dynamic-height-demo',
  template: `
    <div>
      <h3>
        Dynamic Height w/ Virtual Scrolling
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/dynamic-height.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class='material'
        [rows]='rows'
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="getRowHeight"
        [scrollbarV]="true"
        (page)="onPage($event)">
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Row Height" prop="height"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class DynamicHeightComponent {

  rows = [];
  expanded = {};
  timeout: any;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response).splice(0, 100);

      for(const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    if(!row) return 50;
    if(row.height === undefined) return 50;
    return row.height;
  }

}
