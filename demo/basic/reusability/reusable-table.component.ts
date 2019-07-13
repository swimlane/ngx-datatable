import { Component, ContentChildren, QueryList, Input } from '@angular/core';
import { DataTableColumnDirective } from '../../../src';

@Component({
  selector: 'reusable-table',
  template: `
    <div>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [limit]="5"
        [rowHeight]="'auto'"
        (page)="onPage($event)"
        [extraColumns]="extraColumns"
      >
        <ng-content></ng-content>
        <ngx-datatable-column name="Name"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class ReusableTableComponent {
  @Input() columns: any;
  @Input() rows: any;

  @ContentChildren(DataTableColumnDirective) extraColumns: QueryList<
    DataTableColumnDirective
  >;
}
