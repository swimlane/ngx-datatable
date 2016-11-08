import { Component } from '@angular/core';

@Component({
  selector: 'single-selection-demo',
  template: `
    <div>
      <h3>Single Row Selection</h3>
      <div style='float:left;width:75%'>
        <datatable
          class="material"
          [rows]="rows"
          [columnMode]="'force'"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          [rowHeight]="'auto'"
          [limit]="5"
          [selected]="selected"
          [selectionType]="'single'"
          (activate)="onActivate($event)"
          (select)='onSelect($event)'>
        </datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections</h4>
        <ul>
          <li *ngFor='let sel of selected'>
            {{sel.name}}
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

  columns: any[] = [
    { prop: 'name'} , 
    { name: 'Company' }, 
    { name: 'Gender' }
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
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
