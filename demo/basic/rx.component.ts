import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'rx-demo',
  template: `
    <div>
      <h3>
        RXjs Data
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/rx.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material striped"
        [rows]="rows | async"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50">
      </ngx-datatable>
    </div>
  `
})
export class RxDemoComponent {

  rows: Observable<any[]>;
  
  columns = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Company' }
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
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
