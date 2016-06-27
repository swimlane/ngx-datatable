import { Component } from '@angular/core';

import {
  DATATABLE_COMPONENTS,
  TableOptions,
  TableColumn,
  ColumnMode
} from 'angular2-data-table';

@Component({
  selector: 'app',
  template: `
    <div>
    	<h3>basic</h3>
    	<datatable
        class="material"
    		[rows]="rows"
    		[options]="options">
        <datatable-column name="Name">
          <span>Meow</span>
        </datatable-column>
        <datatable-column name="Gender">
          Blah
        </datatable-column>
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
    rowHeight: 'auto'
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data.splice(0, 5));
    });
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
