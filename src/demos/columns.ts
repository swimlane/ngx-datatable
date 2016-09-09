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
      <h3>column add/remove</h3>
      <div style='width:60%;display:inline-block;'>
        <datatable
          style='width:100%'
          class='material'
          [rows]='rows'
          [options]='options'>
          </datatable>
      </div>
      <div style='width:20%;display:inline-block;vertical-align:top;text-align:left;padding:20px;'>
        <div *ngFor='let col of columns'>
          <input
            type='checkbox'
            (click)='toggle(col)'
            [checked]='isChecked(col)'>
            {{col.name}}
        </div>
      </div>
    </div>
  `
})
export class App {

  rows = [
    {
      name: 'Claudine Neal',
      gender: 'female',
      company: 'Sealoud'
    },
    {
      name: 'Beryl Rice',
      gender: 'female',
      company: 'Velity'
    }
  ];

  columns = [
    new TableColumn({ name: 'Name' }),
    new TableColumn({ name: 'Gender' }),
    new TableColumn({ name: 'Company' })
  ];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: []
  });

  toggle(col) {
    const idx = this.options.columns.findIndex(c => {
      return c.name === col.name;
    });

    if(idx > -1) {
      this.options.columns.splice(idx, 1);
    } else {
      this.options.columns.push(col);
    }
  }

  isChecked(col) {
    const idx = this.options.columns.findIndex(c => {
      return c.name === col.name;
    });

    return idx > -1;
  }

}
