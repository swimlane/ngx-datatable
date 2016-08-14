import { Component, NgModule } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  ColumnMode
} from '../angular2-data-table';

import { AppModule } from './module';
import '../themes/material.scss';

@NgModule({
  imports: [ AppModule ]
})
@Component({
  selector: 'app',
  template: `
    <div>
      <h3>client filter / search</h3>
      <input
        type='text'
        style='padding:8px;margin:15px;width:30%;'
        placeholder='Type to filter the name column...'
        [ngModel]='val'
        (ngModelChange)='updateFilter($event)'
      />
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
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

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

  updateFilter(val) {
    // remove existing
    this.rows.splice(0, this.rows.length);

    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows.push(...temp);
  }

}
