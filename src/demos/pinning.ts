import { Component } from '@angular/core';
import { ColumnMode, TableOptions } from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>column pinning</h3>
      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>
        <datatable-column
          name="Name"
          [width]="300"
          [frozenLeft]="true">
        </datatable-column>
        <datatable-column
          name="Gender">
        </datatable-column>
        <datatable-column
          name="Age">
        </datatable-column>
        <datatable-column
          name="City"
          [width]="150"
          prop="address.city">
        </datatable-column>
        <datatable-column
          name="State"
          [width]="300"
          prop="address.state"
          [frozenRight]="true">
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
    footerHeight: 0,
    rowHeight: 50,
    scrollbarV: true,
    scrollbarH: true
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
