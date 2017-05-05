import {Component, ViewChild} from '@angular/core';
import {DatatableComponent} from '../../src/components/datatable.component';

@Component({
  selector: 'filter-demo',
  template: `
    <div>
      <h3>
        Client-side Search and Filtering
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/filter.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <input
        type='text'
        style='padding:8px;margin:15px auto;width:30%;'
        placeholder='Type to filter the name column...'
        (keyup)='updateFilter($event)'
      />
      <ngx-datatable
        #table
        class='material'
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [limit]="10"
        [rows]='rows'>
      </ngx-datatable>
    </div>
  `
})
export class FilterBarComponent {

  rows = [];

  temp = [];

  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
