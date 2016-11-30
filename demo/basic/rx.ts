import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'rx-demo',
  template: `
    <div>
      <h3>RXjs Data</h3>
      <datatable
        class="material striped"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50">
      </datatable>
    </div>
  `
})
export class RxDemoComponent {

  rows: Observable<any[]>;
  
  columns = [
    { prop: 'Organization' },
    { prop: 'DateAdded' },
    { prop: 'Tags' }
  ];

  constructor() {
    this.rows = Observable.create((subscriber) => {
      this.fetch((data) => {
        subscriber.next(data.splice(0, 15));
        subscriber.next(data.splice(15, 30));
        subscriber.complete();
      });
    });

    // Rx.DOM.ajax({ url: '/products', responseType: 'json'}).subscribe()
    // this.rows = Observable.from(rows);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/security.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
