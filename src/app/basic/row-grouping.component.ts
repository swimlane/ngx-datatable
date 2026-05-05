import { Component, inject, ViewChild } from '@angular/core';
import {
  DataTableColumnCellDirective,
  DataTableColumnDirective,
  DatatableComponent,
  DatatableGroupHeaderDirective,
  DatatableGroupHeaderTemplateDirective,
  Group,
  GroupToggleEvents
} from 'projects/swimlane/ngx-datatable/src/public-api';

import { GroupedEmployee } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'row-grouping-demo',
  imports: [
    DatatableComponent,
    DatatableGroupHeaderDirective,
    DatatableGroupHeaderTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnCellDirective
  ],
  template: `
    <div>
      <h3>
        Row Grouping
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/row-grouping.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        #myTable
        class="material expandable"
        groupRowsBy="age"
        columnMode="force"
        selectionType="checkbox"
        [rows]="rows"
        [scrollbarH]="true"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="40"
        [limit]="4"
        [groupExpansionDefault]="true"
      >
        <!-- Group Header Template -->
        <ngx-datatable-group-header
          #myGroupHeader
          [rowHeight]="34"
          [checkboxable]="true"
          (toggle)="onDetailToggle($event)"
        >
          <ng-template
            let-group="group"
            let-expanded="expanded"
            ngx-datatable-group-header-template
          >
            <div style="padding-left:5px;height: 100%; display:flex;align-items: center;">
              <a
                href="javascript:void(0)"
                title="Expand/Collapse Group"
                [class.datatable-icon-right]="!expanded"
                [class.datatable-icon-down]="expanded"
                (click)="toggleExpandGroup(group)"
              >
                <b>Age: {{ group ? group.value[0].age : '' }}</b>
              </a>
            </div>
          </ng-template>
        </ngx-datatable-group-header>

        <!-- Row Column Template -->
        <ngx-datatable-column
          name="Exp. Pay."
          prop=""
          editable="true"
          [headerCheckboxable]="true"
          [checkboxable]="true"
          [frozenLeft]="true"
          [sortable]="false"
        >
          <ng-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-row="row"
            let-group="group"
            ngx-datatable-cell-template
          >
            <label class="datatable-checkbox" [attr.for]="'ep1' + rowIndex">
              <input
                type="checkbox"
                value="0"
                class="expectedpayment"
                [id]="'ep1' + rowIndex"
                [name]="rowIndex"
                [attr.aria-label]="'ex pay1' + rowIndex"
                [checked]="row.exppayyes === 1"
                (change)="checkGroup($event, row, rowIndex, group!)"
              />
            </label>
            <label class="datatable-checkbox" [attr.for]="'ep2' + rowIndex">
              <input
                type="checkbox"
                value="1"
                class="expectedpayment2"
                [id]="'ep2' + rowIndex"
                [name]="rowIndex"
                [attr.aria-label]="'ex pay2' + rowIndex"
                [checked]="row.exppayno === 1"
                (change)="checkGroup($event, row, rowIndex, group!)"
              />
            </label>
            <label class="datatable-checkbox" [attr.for]="'ep3' + rowIndex">
              <input
                type="checkbox"
                value="2"
                class="expectedpayment3"
                [id]="'ep3' + rowIndex"
                [name]="rowIndex"
                [attr.aria-label]="'ex pay3' + rowIndex"
                [checked]="row.exppaypending === 1"
                (change)="checkGroup($event, row, rowIndex, group!)"
              />
            </label>
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Source" prop="source" editable="false" [frozenLeft]="true" />
        <ngx-datatable-column name="Name" prop="name" editable="true" />
        <ngx-datatable-column name="Gender" prop="gender" />
        <ngx-datatable-column name="Age" prop="age" />
        <ngx-datatable-column name="Comment" prop="comment">
          <ng-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-row="row"
            let-group="group"
            let-rowHeight="rowHeight"
            ngx-datatable-cell-template
          >
            <input
              type="text"
              name="comment"
              aria-label="comment"
              [value]="value"
              (blur)="updateValue($event, 'comment', rowIndex)"
            />
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class RowGroupingComponent {
  @ViewChild('myTable') table!: DatatableComponent<GroupedEmployee>;

  editing: Record<string, boolean> = {};
  rows: GroupedEmployee[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.load('forRowGrouping.json').subscribe(data => {
      this.rows = data;
    });
  }

  checkGroup(event: Event, row: GroupedEmployee, rowIndex: number, group: GroupedEmployee[]) {
    let groupStatus = 'Pending';
    let expectedPaymentDealtWith = true;
    const target = event.target as HTMLInputElement;

    row.exppayyes = 0;
    row.exppayno = 0;
    row.exppaypending = 0;

    if (target.checked) {
      if (target.value === '0') {
        // expected payment yes selected
        row.exppayyes = 1;
      } else if (target.value === '1') {
        // expected payment yes selected
        row.exppayno = 1;
      } else if (target.value === '2') {
        // expected payment yes selected
        row.exppaypending = 1;
      }
    }

    if (group.length === 2) {
      // There are only 2 lines in a group
      if (
        ['Calculated', 'Funder'].includes(group[0].source!) &&
        ['Calculated', 'Funder'].includes(group[1].source!)
      ) {
        // Sources are funder and calculated
        if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate) {
          // Start dates and end dates match
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let index = 0; index < group.length; index++) {
            if (group[index].source !== row.source) {
              if (target.value === '0') {
                // expected payment yes selected
                group[index].exppayyes = 0;
                group[index].exppaypending = 0;
                group[index].exppayno = 1;
              }
            }

            if (
              group[index].exppayyes === 0 &&
              group[index].exppayno === 0 &&
              group[index].exppaypending === 0
            ) {
              expectedPaymentDealtWith = false;
            }
          }
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let index = 0; index < group.length; index++) {
        if (
          group[index].exppayyes === 0 &&
          group[index].exppayno === 0 &&
          group[index].exppaypending === 0
        ) {
          expectedPaymentDealtWith = false;
        }
      }
    }

    // check if there is a pending selected payment or a row that does not have any expected payment selected
    if (
      group.filter(rowFilter => rowFilter.exppaypending === 1).length === 0 &&
      group.filter(
        rowFilter =>
          rowFilter.exppaypending === 0 && rowFilter.exppayyes === 0 && rowFilter.exppayno === 0
      ).length === 0
    ) {
      // check if can set the group status
      const numberOfExpPayYes = group.filter(rowFilter => rowFilter.exppayyes === 1).length;
      const numberOfSourceFunder = group.filter(
        rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Funder'
      ).length;
      const numberOfSourceCalculated = group.filter(
        rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated'
      ).length;
      const numberOfSourceManual = group.filter(
        rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Manual'
      ).length;

      if (numberOfExpPayYes > 0) {
        if (numberOfExpPayYes === numberOfSourceFunder) {
          groupStatus = 'Funder Selected';
        } else if (numberOfExpPayYes === numberOfSourceCalculated) {
          groupStatus = 'Calculated Selected';
        } else if (numberOfExpPayYes === numberOfSourceManual) {
          groupStatus = 'Manual Selected';
        } else {
          groupStatus = 'Hybrid Selected';
        }
      }
    }

    group[0].groupstatus = groupStatus;
    // eslint-disable-next-line no-console
    console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
  }

  updateValue(event: Event, cell: 'comment', rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = (event.target as HTMLInputElement).value;
    this.rows = [...this.rows];
  }

  toggleExpandGroup(group: Group<GroupedEmployee>) {
    this.table.groupHeader!.toggleExpandGroup(group);
  }

  onDetailToggle(event: GroupToggleEvents<GroupedEmployee>) {
    // eslint-disable-next-line no-console
    console.log('Detail Toggled', event);
  }
}
