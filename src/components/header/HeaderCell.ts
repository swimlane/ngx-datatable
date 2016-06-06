import { Component, Input, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
import { TableColumn } from '../../models/TableColumn';
import { SortDirection } from '../../models/SortDirection';

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
        [ngClass]="sortClasses()">
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
  
  private state: StateService;

  get sortDir() {
    let sort = this.state.options.sorts.find(s => {
      return s.prop === this.model.prop
    });

    if(sort) return sort.dir;
  }

  sortClasses(sort) {
    let dir = this.sortDir;
    return {
      'sort-asc icon-down': dir === SortDirection.asc,
      'sort-desc icon-up': dir === SortDirection.desc
    };
  }

  onSort() {
    if(this.model.sortable) {
      this.state.nextSort(this.model);
    }
  }

  constructor(public element: ElementRef, private state: StateService){
    element.nativeElement.classList.add('datatable-header-cell');
  }

}
