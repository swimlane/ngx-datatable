import { Component, ViewChild } from '@angular/core';
import { DatatableSectionHeaderDirective } from '../../src';

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
        #myTable
        class='material'
        [rows]='rows'
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="getRowHeight"
        [scrollbarV]="true"
        [sections]="sections"
        [sectionProp]="'height'"
        (page)="onPage($event)"
        (activate)="onActivate($event)">
        
        <ngx-datatable-section-header
          #sectionHeader
          [height]="getRowHeight">
          <ng-template
            let-section="section"
            let-expanded="expanded"
            let-sectionCount="sectionCount"
            ngx-datatable-section-header-template>
            <div>{{section.title}} {{expanded ? 'expanded' : 'not expanded'}} ({{sectionCount}})</div>
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

  @ViewChild('myTable') table: any;

  constructor() {
    for (let height = 50; height < 130; height++) {
      this.sections.push({
        propValue: height,
        title: `Section with height ${height}:`,
        height: height,
        expanded: height % 2
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

  onActivate(event) {
    if (event.row.$$isSectionHeader) {
      if ((event.type === 'keydown' && event.event.key === 'Enter') ||
           event.type === 'click') {
        this.sections[event.row.$$sectionIndex].expanded ^= 1;
        this.sections = [...this.sections];
      }
      else {
//        console.log('scrolling to row', this.rows[5]);
//        this.table.scrollToRow(this.rows[5]);
        this.table.sectionProp = 'gender';
        this.sections = [{
          propValue: 'male',
          title: 'Male',
          height: 50,
          expanded: 0
        },
        {
          propValue: 'female',
          title: 'Female',
          height: 50,
          expanded: 0
        }];
        for (let count = 0; count < 25; count++) {
          this.rows.pop();
        }
      }
    }
  }

  getRowHeight(row) {
    return row.height;
  }

  toggleExpandSection(section) {
    console.log('Toggle expand section!', section);

  }
}
