import { Component, NgModule } from '@angular/core';
import { ColumnMode, TableOptions } from '../angular2-data-table';

import { AppModule } from './module';
import '../themes/material.scss';

@NgModule({
  imports: [ AppModule ]
})
@Component({
  selector: 'app',
  template: `
    <div>
      <h3>scrolling horz/vertical</h3>

      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>
        <datatable-column name="Name" [width]="300"></datatable-column>
        <datatable-column name="Gender"></datatable-column>
        <datatable-column name="Age"></datatable-column>
        <datatable-column name="City" [width]="300" prop="address.city"></datatable-column>
        <datatable-column name="State" [width]="300" prop="address.state"></datatable-column>
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
