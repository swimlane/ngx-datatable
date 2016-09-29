import { Component } from '@angular/core';
import { ColumnMode, TableOptions } from '../index';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <datatable
        class='material'
        style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;"
        [rows]='rows'
        [options]='options'>
        <datatable-column name="Id" [width]="80"></datatable-column>
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
