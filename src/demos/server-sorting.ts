import { Component } from '@angular/core';

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
      <h3>server-sorting</h3>
      <datatable
        class='material'
        [rows]='rows'
        [options]='options'>
      </datatable>
    </div>
  `
})
export class App {

  rows = [
    {
      'name': 'Claudine Neal',
      'gender': 'female',
      'company': 'Sealoud'
    },
    {
      'name': 'Beryl Rice',
      'gender': 'female',
      'company': 'Velity'
    }
  ];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company', comparator: this.sorter.bind(this) })
    ]
  });

  sorter(rows, dirs) {
    console.log('sorting started!');
    setTimeout(() => {
      this.rows.reverse();
      console.log('sorted!');
    }, 500);
  }

}
