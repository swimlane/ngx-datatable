import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  SelectionType,
  ColumnMode
} from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>selection</h3>
      <div style='float:left;width:75%'>
        <datatable
          class='material'
          [rows]='rows'
          [selected]='selections'
          [options]='options'
          (onSelectionChange)='onSelectionChange($event)'>
        </datatable>
      </div>

      <div class='selected-column' style='float:right;width:25%;'>
        <h4>Selections</h4>
        <ul>
          <li *ngFor='let sel of selections'>
            {{sel.name}}
          </li>
        </ul>
      </div>
    </div>
  `
})
export class App {

  rows = [];
  selections = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    limit: 5,
    rowHeight: 'auto',
    selectionType: SelectionType.multi,
    columns: [
      new TableColumn({ name: 'Name' }),
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

  onSelectionChange(selected) {
    console.log('Selection!', selected);
  }

}
