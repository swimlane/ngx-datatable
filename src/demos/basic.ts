import { Component } from '@angular/core';

import {
  DATATABLE_COMPONENTS,
  TableOptions,
  TableColumn,
  ColumnMode
} from '../main';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
    	<h3>basic</h3>
    	<datatable
        class="material"
    		[rows]="rows"
    		[options]="options">
    	</datatable>
    </div>
  `,
  directives: [ DATATABLE_COMPONENTS ]
})
export class App {

	rows = [];

	options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    })
  }

  fetch(cb) {
    var req = new XMLHttpRequest();
    req.open('GET', `src/demos/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
