import "reflect-metadata";
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { DataTable } from './components/DataTable';

@Component({
  selector: 'app',
  template: `
  	<h3>Basic</h3>
  	<datatable
      class="material"
  		[rows]="rows"
  		[options]="options"
      [selected]="selected">
  	</datatable>
  `,
  directives: [ DataTable ]
})
class AppComponent {

	options = {
    headerHeight: 50,
    columns: [
      { name: "Name", width: 300 },
      { name: "Gender" },
      { name: "Company" }
    ]
  };

  selected = [];

	rows = [];

  constructor() {
    var req = new XMLHttpRequest();
    req.open('GET', `demos/company.json`);

    req.onload = () => {
      let json = JSON.parse(req.response);
      this.rows.push(...json);
    };

    req.send();
  }

}

bootstrap(AppComponent, []);
