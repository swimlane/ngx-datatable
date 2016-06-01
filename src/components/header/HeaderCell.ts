import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'datatable-header-cell',
  template: `
  	<div
      draggable="true">
      <span
        class="datatable-header-cell-label"
        (click)="onSort()"
        [innerHTML]="column.name">
      </span>
      <span
        class="sort-btn"
        [class.sort-asc]="column.sort === 'asc'"
        [class.icon-up]="column.sort === 'asc'"
        [class.sort-desc]="column.sort === 'desc'"
        [class.icon-down]="column.sort === 'desc'">
      </span>
    </div>
  `,
  directives: [],
  host: {
    '[class.sortable]': 'column.sortable',
    '[class.resizable]': 'column.resizable',
    '[style.width]':'column.width',
    '[style.minWidth]':'column.minWidth',
    '[style.maxWidth]':'column.maxWidth',
    '[style.height]':'column.height',
    '[attr.title]': 'column.name'
  }
})
export class DataTableHeaderCell {

  @Input() column: Object;

  @HostBinding('class.datatable-header-cell')
  private isHeader = true;

  onSort() {

  }

}
