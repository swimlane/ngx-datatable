import { Component, inject } from '@angular/core';
import { ActivateEvent, DatatableComponent, TableColumn } from '@siemens/ngx-datatable';

import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'single-selection-demo',
  imports: [DatatableComponent],
  template: `
    <div>
      <h3>
        Single Row Selection
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/main/src/app/selection/selection-single.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        <div class="info">
          <p
            >This demonstrates a simple single selection table with the 3rd row selected by
            default.</p
          >
        </div>

        <ngx-datatable
          class="material selection-row"
          rowHeight="auto"
          columnMode="force"
          selectionType="single"
          [rows]="rows"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          [limit]="5"
          [(selected)]="selected"
          (activate)="onActivate($event)"
          (selectedChange)="onSelect($event)"
        />
      </div>

      <div class="selected-column">
        <h4>Selections</h4>
        <ul>
          @for (sel of selected; track sel) {
            <li>
              {{ sel.name }}
            </li>
          } @empty {
            <li>No Selections</li>
          }
        </ul>
      </div>
    </div>
  `
})
export class SingleSelectionComponent {
  rows: Employee[] = [];

  selected: Employee[] = [];

  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.selected = [data[2]];
      this.rows = data;
    });
  }

  onSelect(employees: Employee[]) {
    // eslint-disable-next-line no-console
    console.log('Select Event', employees);
  }

  onActivate(event: ActivateEvent<Employee>) {
    // eslint-disable-next-line no-console
    console.log('Activate Event', event);
  }
}
