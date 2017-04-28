import { Component } from '@angular/core';

@Component({
  selector: 'chkbox-selection-template-demo',
  template: `
    <div>
      <h3>
        Custom Checkbox Selection
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/selection/selection-chkbox.component.ts" target="_blank">
            Source
          </a>
        </small>
        <small>
          <a href="#" (click)="add()">Add</a> |
          <a href="#" (click)="update()">Update</a> |
          <a href="#" (click)="remove()">Remove</a> 
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <ngx-datatable
          style="width: 90%"
          class="material"
          [rows]="rows"
          [columnMode]="'force'"
          [headerHeight]="50"
          [footerHeight]="50"
          [rowHeight]="'auto'"
          [limit]="5"
          [selected]="selected"
          [selectionType]="'checkbox'"
          (activate)="onActivate($event)"
          (select)='onSelect($event)'>
          <ngx-datatable-column [width]="30" [sortable]="false" [canAutoResize]="false" [draggable]="false" [resizeable]="false">
              <ng-template ngx-datatable-header-template let-value="value" let-allRowsSelected="allRowsSelected" let-selectFn="selectFn">
                <input type="checkbox" [attr.checked]="allRowsSelected" (change)="selectFn(!allRowsSelected)"/>
              </ng-template>
              <ng-template ngx-datatable-cell-template let-value="value" let-isSelected="isSelected" let-onCheckboxChangeFn="onCheckboxChangeFn">
                <input type="checkbox" [checked]="isSelected" (change)="onCheckboxChangeFn($event)"/>
              </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Name"></ngx-datatable-column>
          <ngx-datatable-column name="Gender"></ngx-datatable-column>
          <ngx-datatable-column name="Company"></ngx-datatable-column>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections <small>({{selected?.length}})</small></h4>
        <ul>
          <li *ngFor='let sel of selected'>
            {{sel.name}}
          </li>
          <li *ngIf="!selected?.length">No Selections</li>
        </ul>
      </div>
    </div>
  `
})
export class CustomCheckboxSelectionComponent {

  rows = [];
  selected = [];

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

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

}
