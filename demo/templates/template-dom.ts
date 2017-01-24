import { Component } from '@angular/core';

@Component({
  selector: 'inline-templates-demo',
  template: `
    <div>
      <h3>Expressive Templates</h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
        <ngx-datatable-column name="Name">
          <template let-column="column" ngx-datatable-header-template>
            Holla! {{column.name}}
          </template>
          <template let-value="value" ngx-datatable-cell-template>
            Hi: <strong>{{value}}</strong>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
        <template let-column="column" let-sort="sortFn" ngx-datatable-header-template>
            <span (click)="sort()">{{column.name}}</span>
          </template>
          <template let-row="row" let-value="value" ngx-datatable-cell-template>
            My name is: <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
            <div>{{joke}}</div>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <template let-value="value" ngx-datatable-cell-template>
            <div style="border:solid 1px #ddd;margin:5px;padding:3px">
              <div style="background:#999;height:10px" [style.width]="value + '%'"></div>
            </div>
          </template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class InlineTemplatesComponent {

  rows = [];
  joke = 'knock knock';

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
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
