# Selection

Below is a basic single select example. There is also `multi` and `shiftMulti` selection modes.

```js
import { Component } from '@angular/core';
import { DataTable, TableOptions, TableColumn, SelectionType } from 'angular2-data-table';

@Component({
  selector: 'app',
  template: `
    <div>
      <datatable
        class="material"
        [selected]="selected"
        [rows]="rows"
        [options]="options">
      </datatable>

      <div>
        <h2>Selections</h2>
        <ul>
          <li *ngFor="let sel of selected">
            {{sel.name}}
          </li>
        </ul>
      </div>
      
    </div>
  `,
  directives: [ DataTable ]
})
class AppComponent {

  selected = [];

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
    selectionMode: SelectionType.single,
    columns: [
      new TableColumn({ name: "Name" }),
      new TableColumn({ name: "Gender" }),
      new TableColumn({ name: "Company" })
    ]
  });
}
```