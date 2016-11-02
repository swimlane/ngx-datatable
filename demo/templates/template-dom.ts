import { Component } from '@angular/core';

@Component({
  selector: 'inline-templates-demo',
  template: `
    <div>
      <h3>Expressive Templates</h3>
      <datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
        <datatable-column name="Name">
          <template let-column="column">
            Holla! {{column.name}}
          </template>
          <template let-value="value">
            Hi: <strong>{{value}}</strong>
          </template>
        </datatable-column>
        <datatable-column name="Gender">
          <template let-row="row" let-value="value">
            My name is: <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
            <div>{{joke}}</div>
          </template>
        </datatable-column>
        <datatable-column name="Age">
          <template let-value="value">
            <div style="border:solid 1px #ddd;margin:5px;padding:3px">
              <div style="background:#999;height:10px" [style.width]="value + '%'"></div>
            </div>
          </template>
        </datatable-column>
      </datatable>
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
