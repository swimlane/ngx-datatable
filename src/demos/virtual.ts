import { Component } from '@angular/core';
import { ColumnMode, TableOptions } from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>virtual scroll</h3>

      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>

        <datatable-column name="Name">
          <template let-value="value">
            <strong>{{value}}</strong>
          </template>
        </datatable-column>

        <datatable-column name="Gender">
          <template let-row="row" let-value="value">
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </template>
        </datatable-column>

        <datatable-column name="Age">
        </datatable-column>

      </datatable>
    </div>
  `
})
export class App {

  rows = [];
  expanded = {};

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 50,
    scrollbarV: true
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });
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
