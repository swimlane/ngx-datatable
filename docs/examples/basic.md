# Basic
Below is a basic example that renders the rows in with a fluid height. View on [Plunkr](http://embed.plnkr.co/9LydEkpjKu2VY4r0fDZX/).

{% gistrun id="77f5ecf1d08bdd993189db7684f86c11" %}
{% endgistrun %}

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

  rows = [
    {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud"
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity"
    }
  ];

  options = new TableOptions({
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
    ]
  });
}
```