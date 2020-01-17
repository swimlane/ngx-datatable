import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'single-selection-demo',
  template: `
    <div>
      <h3>
        Single Row Selection
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-single.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        <div class="info">
          <p>This demonstrates a simple single selection table with the 3rd row selected by default.</p>
        </div>

        <ngx-datatable
          class="material"
          [rows]="rows"
          [columnMode]="ColumnMode.force"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          rowHeight="auto"
          [limit]="5"
          [selected]="selected"
          [selectionType]="SelectionType.single"
          (activate)="onActivate($event)"
          (select)="onSelect($event)"
        >
        </ngx-datatable>
      </div>

      <div class="selected-column">
        <h4>Selections</h4>
        <ul>
          <li *ngFor="let sel of selected">
            {{ sel.name }}
          </li>
          <li *ngIf="!selected.length">No Selections</li>
        </ul>
      </div>
    </div>
  `
})
export class SingleSelectionComponent {
  rows = [];

  selected = [];

  columns: any[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor() {
    this.fetch(data => {
      this.selected = [data[2]];
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

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
