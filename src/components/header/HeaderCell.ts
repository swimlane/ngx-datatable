import { Component, Input, ElementRef } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';

@Component({
  selector: 'datatable-header-cell',
  template: `
  	<div>
      <span
        class="datatable-header-cell-label draggable"
        (click)="onSort()"
        [innerHTML]="model.name">
      </span>
      <span
        class="sort-btn"
        [class.sort-asc]="model.sort === 'asc'"
        [class.icon-up]="model.sort === 'asc'"
        [class.sort-desc]="model.sort === 'desc'"
        [class.icon-down]="model.sort === 'desc'">
      </span>
    </div>
  `,
  directives: [],
  host: {
    '[class.sortable]': 'model.sortable',
    '[class.resizable]': 'model.resizable',
    '[style.width]':'model.width',
    '[style.minWidth]':'model.minWidth',
    '[style.maxWidth]':'model.maxWidth',
    '[style.height]':'model.height',
    '[attr.title]': 'model.name'
  }
})
export class DataTableHeaderCell {

  @Input() model: TableColumn;

  onSort() {

  }

  constructor(public element: ElementRef){
    element.nativeElement.classList.add('datatable-header-cell');
  }

}
