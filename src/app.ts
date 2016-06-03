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
    limit: 10,
    columns: [
      new TableColumn({ name: "Name", width: 300 }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
    ]
  });

  constructor() {
    var req = new XMLHttpRequest();
    req.open('GET', `demos/company.json`);

    req.onload = () => {
      let json = JSON.parse(req.response);
      this.rows.push(...json);
      setTimeout(() => {
        this.rows.push(...json);
      }, 500)
    };

    req.send();
  }

  changed(args) {
    console.log('changed', args)
  }

}

bootstrap(AppComponent, []);
