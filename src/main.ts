import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { DataTable } from './DataTable';

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

	options = { };
  selected = [];
	rows = [
		{ name: 'Henery', company: 'Foobar', age: 22 }
	];

}

bootstrap(AppComponent, []);
