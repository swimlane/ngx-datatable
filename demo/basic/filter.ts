import { Component } from '@angular/core';

@Component({
  selector: 'filter-demo',
  template: `
    <div>
      <h3>Client-side Search and Filtering</h3>
      <input
        type='text'
        style='padding:8px;margin:15px auto;width:30%;'
        placeholder='Type to filter the name column...'
        (keyup)='updateFilter($event)'
      />
      <datatable
        class='material'
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [limit]="10"
        [rows]='rows'>
        </datatable>
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
    let val = event.target.value;

    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
  }

}
