# Server-side paging

Below is a basic example of server-side paging.

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
    	  [options]="options"
          (onPageChange)="onPage($event)">
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
    
    // paging attributes
    offset: 0,
    limit: 10,
    count: 0,
    externalPaging: true,
    loadingIndicator: true,
    
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
    ]
  });
  
  constructor() {
    this.onPage({ 
      offset: this.options.offset,
      count: this.options.count,
      count: 0
    });
  }
  
  onPage({ offset, limit, count }) {
    this.fetch((results) => {
      // need to set our count
      this.options.count = results.length;
      
      // lets get the start/end
      const start = offset * limit;
      const end = start + limit;
      
      // usually you don't need this, but my
      // results are fully loaded vs just
      // the paginated results...
      let paged = results.slice(start, end);

      // splice doesn't let u insert at
      // a new out of bounds index :(
      for (let i = start; i < end; i++) {
        this.rows[i] = results[i];
      }
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