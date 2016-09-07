import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  ColumnMode
} from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>basic</h3>
      <datatable
        class='material striped'
        [rows]='rows'
        [options]='options'>
      </datatable>
      <br>
      <datatable
        class='material striped'
        [rows]='rows'
        [options]='optionsTwo'>
      </datatable>
    </div>
  `
})
export class App {

  rows = [];
  rows2 = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ prop: 'name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  optionsTwo = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 25,
    footerHeight: 25,
    limit: 10,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ prop: 'name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
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
