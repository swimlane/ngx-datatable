import { Component } from '@angular/core';

import {
  DATATABLE_COMPONENTS,
  TableOptions,
  ColumnMode
} from 'angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>detail template</h3>
      <datatable
        class="material"
        [rows]="rows"
        [options]="options">

        <datatable-column [width]="50" [canAutoResize]="false">
          <template let-row="row">
            <span
              [class.icon-right]="!expanded[row.name]"
              [class.icon-down]="expanded[row.name]"
              (click)="toggle(row)">
            </span>
          </template>
        </datatable-column>

        <datatable-column name="Gender">
          <template let-row="row" let-value="value">
            {{value}}
            <div [hidden]="!expanded[row.name]">
              <h1>FOO</h1>
            </div>
          </template>
        </datatable-column>

        <datatable-column name="Age">
          <template let-value="value">
            {{value}}
          </template>
        </datatable-column>

      </datatable>
    </div>
  `,
  directives: [ DATATABLE_COMPONENTS ]
})
export class App {

  rows = [];
  expanded = {};

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
    let req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggle(row) {
    this.expanded[row.name] = !this.expanded[row.name];
  }

}
