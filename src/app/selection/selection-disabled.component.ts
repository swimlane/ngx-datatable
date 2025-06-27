import { Component, inject } from '@angular/core';
import {
  ActivateEvent,
  ColumnMode,
  DatatableComponent,
  SelectEvent,
  SelectionType,
  TableColumn
} from 'projects/swimlane/ngx-datatable/src/public-api';
import { Employee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'multidisable-selection-demo',
  template: `
    <div>
      <h3>
        Selection Callback to Disable Selections
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-disabled.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        <ngx-datatable
          class="material"
          [rows]="rows"
          [columnMode]="ColumnMode.force"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          rowHeight="auto"
          [limit]="5"
          [selectCheck]="checkSelectable"
          [selected]="selected"
          [selectionType]="SelectionType.multi"
          (activate)="onActivate($event)"
          (select)="onSelect($event)"
        >
        </ngx-datatable>
      </div>

      <div class="selected-column">
        <h4>Selections</h4>
        <ul>
          @for (sel of selected; track sel) {
          <li>
            {{ sel.name }}
          </li>
          } @if (!selected.length) {
          <li>No Selections</li>
          }
        </ul>
      </div>
    </div>
  `,
  imports: [DatatableComponent]
})
export class MultiDisableSelectionComponent {
  rows: Employee[] = [];

  selected: Employee[] = [];

  columns: TableColumn[] = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('company.json').subscribe(data => {
      this.rows = data;
    });
  }

  onSelect({ selected }: SelectEvent<Employee>) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: ActivateEvent<Employee>) {
    console.log('Activate Event', event);
  }

  checkSelectable(event: Employee) {
    console.log('Checking if selectable', event);
    return event.name !== 'Ethel Price';
  }
}
