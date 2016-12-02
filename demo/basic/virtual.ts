import { Component } from '@angular/core';

@Component({
  selector: 'virtual-scroll-demo',
  template: `
    <div>
      <h3>Virtual Scrolling with 10k Rows</h3>
      <swui-data-table
        class='material'
        [rows]='rows'
        [columnMode]="'standard'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        (page)="onPage($event)">
        <swui-data-table-column name="Name" width="200">
          <template let-value="value" swui-data-table-cell-template>
            <strong>{{value}}</strong>
          </template>
        </swui-data-table-column>
        <swui-data-table-column name="Gender" width="300">
          <template let-row="row" let-value="value" swui-data-table-cell-template>
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </template>
        </swui-data-table-column>
        <swui-data-table-column name="Age" width="80">
        </swui-data-table-column>
      </swui-data-table>
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
    let req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
