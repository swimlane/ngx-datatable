import { Component } from '@angular/core';

@Component({
  selector: 'column-flex-demo',
  template: `
    <div>
      <h3>Flex Column Width Distribution</h3>
      <datatable
        class="material"
        [columnMode]="'flex'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
        <datatable-column name="Name" [flexGrow]="3">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Gender" [flexGrow]="1">
          <template let-row="row" let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Age" [flexGrow]="1">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
      </datatable>
    </div>
  `
})
export class ColumnFlexComponent {

  rows = [];

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
