import "reflect-metadata";
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { A2DT_DIRECTIVES, TableOptions, TableColumn } from './main';

@Component({
  selector: 'app',
  template: `
    <div>
    	<h3>Basic</h3>
    	<datatable
        class="material"
    		[rows]="rows"
    		[options]="options"
        [selected]="selected"
        (onChange)="changed($event)">
    	</datatable>
    </div>
  `,
  directives: [ A2DT_DIRECTIVES ]
})
class AppComponent {

  selected = [];
	rows = [];

	options = new TableOptions({
    columnMode: 'force',
    scrollbarV: false,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 10,
    columns: [
      new TableColumn({ name: "Name", width: 300 }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company", comparator: this.sorter.bind(this) })
    ]
  });

  constructor() {
    this.fetch((results) => {
      this.rows.push(...results);
      setTimeout(() => {
        this.rows.push(...results);
      }, 500);
    });
  }

  fetch(cb) {
    var req = new XMLHttpRequest();
    req.open('GET', `demos/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  sorter(rows, dirs) {
    setTimeout(() => {
      this.fetch((results) => {
        this.rows = results;
      });
    }, 500);
  }

  changed(args) {
    console.log('changed', args)
  }

}

bootstrap(AppComponent, []);
