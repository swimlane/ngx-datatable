import { Component } from '@angular/core';

@Component({
  selector: 'footer-position-demo',
  template: `
    <div>
      <h3>
        Custom Footer
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/footer-position.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [footerHeight]="50"
        [limit]="10"
        [headerHeight]="50"
        [footerPosition]="'both'"
        [rowHeight]="'auto'">
      </ngx-datatable>
    </div>
  `
})
export class FooterPositionDemoComponent {

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 50);
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

}
