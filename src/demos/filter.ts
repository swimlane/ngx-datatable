import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  ColumnMode
} from '../index';
import '../themes/material.scss';

import { FilterService } from '../services';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>client filter / search</h3>
      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>
      </datatable>
    </div>
  `
})
export class App {
  rows = [];
  temp = [];

  val: string = '';

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 10,
    filters: ['name'],
    filterPlaceholder: 'type to filter by name column',
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  constructor(private _filterService: FilterService) {
    this.fetch((data) => {
      // push our inital complete list
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
