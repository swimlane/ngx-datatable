import { Component } from '@angular/core';

@Component({
  selector: 'horz-buttons-scroll-demo',
  template: `
    <div>
      <h3>
        Horizontal Buttons Scroll
        <small>
          <a 
            href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/scrolling.component.ts" 
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <ngx-datatable
          class="material"
          [rows]="rows"
          columnMode="force"
          [headerHeight]="50"
          [footerHeight]="0"
          [rowHeight]="50"
          [scrollbarV]="true"
          [scrollbarH]="true">
            <ngx-datatable-column *ngFor="let col of columns" [name]="col.name" [prop]="col.prop">
            </ngx-datatable-column>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Available Columns</h4>
        <ul>
          <li *ngFor='let col of allColumns'>
            <input
              type='checkbox'
              [id]="col.name"
              (click)='toggle(col)'
              [checked]='isChecked(col)'
            />
            <label [attr.for]="col.name">{{col.name}}</label>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class HorzButtonsScroll {
  rows = [];

  allColumns = [
    { name: 'Name', prop: 'name' },
    { name: 'Gender', prop: 'gender' },
    { name: 'Age', prop: 'age' },
    { name: 'City', prop: 'address.city' },
    { name: 'State', prop: 'address.state' },
  ];

  columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Gender', prop: 'gender' },
    { name: 'Age', prop: 'age' },
    { name: 'City', prop: 'address.city' },
    { name: 'State', prop: 'address.state' },
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  toggle(col) {
    const isChecked = this.isChecked(col);

    if(isChecked) {
      this.columns = this.columns.filter(c => { 
        return c.name !== col.name; 
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }
}
