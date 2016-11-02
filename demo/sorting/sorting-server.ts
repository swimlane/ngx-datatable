import { Component } from '@angular/core';

@Component({
  selector: 'server-sorting-demo',
  template: `
    <div>
      <h3>Server-side Sorting</h3>
      <datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        (sort)="onSort($event)">
      </datatable>
    </div>
  `
})
export class ServerSortingComponent {

  rows = [];

  columns = [
    // we pass false to bypass the default
    // comparator function and use the event to sort
    { name: 'Company', comparator: false },
    { name: 'Name', sortable: false },
    { name: 'Gender', sortable: false }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      let data = JSON.parse(req.response);
      cb(data.splice(0, 20));
    };

    req.send();
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);

    // emulate a server request with a timeout
    setTimeout(() => {
      let rows = [...this.rows];

      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      rows.sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });

      this.rows = rows;
    }, 300);
  }

}
