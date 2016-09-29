import { Component } from '@angular/core';

import {
  TableOptions,
  ColumnMode
} from '../index';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>column mode: forced</h3>
      <datatable
        class="material"
        [rows]="rows"
        [options]="options">
        <datatable-column name="Name" [width]="100">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Gender" [width]="100">
          <template let-row="row" let-value="value">
            {{value}}
          </template>
        </datatable-column>
        <datatable-column name="Age" [width]="300">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>
      </datatable>
    </div>
  `
})
export class App {

  rows = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto'
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data.splice(0, 5));
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
