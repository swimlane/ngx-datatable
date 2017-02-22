import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'default-sorting-demo',
  template: `
    <div>
      <h3>Client-side Sorting</h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="true"
        [sorts]="[{prop: 'name', dir: 'desc'}]">

        <ngx-datatable-column name="Company">
          <template let-row="row" ngx-datatable-cell-template>
            {{row.company}}
          </template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Name">
          <template let-row="row" ngx-datatable-cell-template>
            {{row.name}}
          </template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Gender">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class DefaultSortingComponent implements OnInit {

  rows = [];

  ngOnInit() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

}
