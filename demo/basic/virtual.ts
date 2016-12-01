import { Component } from '@angular/core';

@Component({
  selector: 'virtual-scroll-demo',
  template: `
    <div>
      <h3>Virtual Scrolling with 10k Rows</h3>
      <swui-datatable
        class='material'
        [rows]='rows'
        [columnMode]="'standard'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        (page)="onPage($event)">
        <swui-datatable-column name="Name" width="200">
          <template let-value="value">
            <strong>{{value}}</strong>
          </template>
        </swui-datatable-column>
        <swui-datatable-column name="Gender" width="300">
          <template let-row="row" let-value="value">
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </template>
        </swui-datatable-column>
        <swui-datatable-column name="Age" width="80">
        </swui-datatable-column>
      </swui-datatable>
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
