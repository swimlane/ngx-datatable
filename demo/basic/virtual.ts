import { Component } from '@angular/core';

@Component({
  selector: 'virtual-scroll-demo',
  template: `
    <div>
      <h3>Virtual Scrolling with 100k Rows</h3>
      <datatable
        class='material'
        [rows]='rows'
        [columnMode]="'standard'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        (page)="onPage($event)">
        <datatable-column name="Name" width="200">
          <template let-value="value">
            <strong>{{value}}</strong>
          </template>
        </datatable-column>
        <datatable-column name="Gender" width="300">
          <template let-row="row" let-value="value">
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </template>
        </datatable-column>
        <datatable-column name="Age" width="80">
        </datatable-column>
      </datatable>
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
