import { Component } from '@angular/core';

@Component({
  selector: 'virtual-scroll-demo',
  template: `
    <div>
      <h3>
        Virtual Scrolling with 10k Rows
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/virtual.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class='material'
        [rows]='rows'
        [columnMode]="'standard'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [rowClass]="getRowClass"
        [scrollbarV]="true"
        (page)="onPage($event)">
        <ngx-datatable-column name="Name" width="300">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <strong>{{value}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" width="300">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            <i [innerHTML]="row.row['name']"></i> and <i>{{value}}</i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" width="80">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class VirtualScrollComponent {

  rows = [];
  expanded = {};
  timeout: any;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  getRowClass(row) {
    return {
      'age-is-ten': (row.age % 10) === 0
    };
  }

}
