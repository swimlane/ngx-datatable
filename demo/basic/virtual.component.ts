import { Component } from '@angular/core';

@Component({
  selector: 'virtual-scroll-demo',
  template: `
    <div>
      <h3>
        Virtual Scrolling with 10k Rows
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/virtual.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class='material'
        [rows]='rows'
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="getRowHeight"
        [scrollbarV]="true"
        [sections]="sections"
        [sectionProp]="'height'"
        (page)="onPage($event)">
        
        <ngx-datatable-section-header>
          <ng-template
            let-section="section"
            let-expanded="expanded"
            ngx-datatable-section-template>
            <div (click)="toggleExpandSection(section)">{{section.title}}</div>
          </ng-template>
        </ngx-datatable-section-header>

        <ngx-datatable-column name="Name" width="300">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <strong>{{value}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" width="300">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Row Height" prop="height" width="80">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class VirtualScrollComponent {

  rows = [];
  expanded = {};
  timeout: any;
  sections = [];

  constructor() {
    for (let height = 50; height < 130; height++) {
      this.sections.push({
        propValue: height,
        title: `Section with height ${height}:`
      });
    }

    this.fetch((data) => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for(const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    return row.height;
  }

  toggleExpandSection(section) {
    console.log('Toggle expand section!', section);

  }
}
