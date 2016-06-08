# Server-side sorting

Below is a basic example of server-side sorting.

```js
import { Component } from '@angular/core';
import { DataTable, TableOptions, TableColumn } from 'angular2-data-table';

@Component({
  selector: 'app',
  template: `
    <div>
    	<datatable
          class="material"
    	  [rows]="rows"
    	  [options]="options">
    	</datatable>
    </div>
  `,
  directives: [ DataTable ]
})
class AppComponent {

  rows = [];

  options = new TableOptions({
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ 
        name: "Company", 
        
        // we are passing a custom sorter here
        // this gives us flexibility
        comparator: this.sorter.bind(this) 
      })
    ]
  });
  
  constructor() {
    this.fetch((results) => {
      this.rows.push(...results);
    });
  }
  
  sorter(rows, dirs) {
    this.fetch((results) => {
    
      // for demo purposes I'm just going
      // to reverse the results
      this.rows = results.reverse();
      
    });
  }

  fetch(cb) {
    var req = new XMLHttpRequest();
    
    // just a dumby json file
    req.open('GET', `demos/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
```