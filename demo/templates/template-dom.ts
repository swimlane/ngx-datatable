import { Component } from '@angular/core';

@Component({
  selector: 'inline-templates-demo',
  template: `
    <div>
      <h3>Expressive Templates</h3>
      <swui-datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
        <swui-datatable-column name="Name">
          <template let-column="column" swui-datatable-header-template>
            Holla! {{column.name}}
          </template>
          <template let-value="value" swui-datatable-cell-template>
            Hi: <strong>{{value}}</strong>
          </template>
        </swui-datatable-column>
        <swui-datatable-column name="Gender">
          <template let-row="row" let-value="value" swui-datatable-cell-template>
            My name is: <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
            <div>{{joke}}</div>
          </template>
        </swui-datatable-column>
        <swui-datatable-column name="Age">
          <template let-value="value" swui-datatable-cell-template>
            <div style="border:solid 1px #ddd;margin:5px;padding:3px">
              <div style="background:#999;height:10px" [style.width]="value + '%'"></div>
            </div>
          </template>
        </swui-datatable-column>
      </swui-datatable>
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
