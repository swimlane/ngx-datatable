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
    	<h3>client filter / search</h3>
      <input
        type="text"
        style="padding:8px;margin:15px;width:30%;"
        placeholder="Type to filter the name column..."
        [ngModel]="val"
        (ngModelChange)="updateFilter($event)"
      />
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

  val: string = '';

	options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 10,
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
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
    var req = new XMLHttpRequest();
    req.open('GET', `src/demos/company.json`);

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
