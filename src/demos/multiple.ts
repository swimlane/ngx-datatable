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
      <h3>table 1</h3>
      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>
      </datatable>

      <h3>table 2</h3>
      <datatable
        class='material'
        [rows]='rows2'
        [options]='options2'>
      </datatable>
    </div>
  `
})
export class App {

  rows = [
    { name: 'Larry', gender: 'Male', company: 'Cisco' },
    { name: 'Lauren', gender: 'Female', company: 'HP' }
  ];

  rows2 = [
    { name: 'Callie', gender: 'Female' },
    { name: 'Maggie', gender: 'Female' }
  ];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 100,
    columns: [
      new TableColumn({ prop: 'name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  options2 = new TableOptions({
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ prop: 'name', Name: '^^NAME^^' }),
      new TableColumn({ name: 'Gender' })
    ]
  });

}
