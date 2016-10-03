import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  Output,
  Renderer
} from '@angular/core';

import { StateService } from '../../services';
import { TableColumn } from '../../models';
import { SortDirection } from '../../types';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div>
      <span
        class="datatable-header-cell-label draggable"
        *ngIf="!column.headerTemplate"
        (click)="onSort()"
        [innerHTML]="name">
      </span>
      <template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngOutletContext]="{ column: column, sort: sort }">
      </template>
      <span
        class="sort-btn"
        [ngClass]="sortClasses()">
      </span>
    </div>
  `,
  host: {
    '[class.sortable]': 'column.sortable',
    '[class.resizable]': 'column.resizable',
    '[style.width]': 'column.width + "px"',
    '[style.minWidth]': 'column.minWidth + "px"',
    '[style.maxWidth]': 'column.maxWidth + "px"',
    '[style.height]': 'column.height + "px"',
    '[attr.title]': 'name'
  }
})
export class DataTableHeaderCell {

  @Input() column: TableColumn;

  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  sort: Function = this.onSort.bind(this);

  get sortDir() {
    let sort = this.state.options.sorts.find(s => {
      return s.prop === this.column.prop;
    });

    if(sort) return sort.dir;
  }

  get name() {
    return this.column.name || this.column.prop;
  }

  constructor(public element: ElementRef, private state: StateService, renderer: Renderer) {
    renderer.setElementClass(this.element.nativeElement, 'datatable-header-cell', true);
  }

  sortClasses(sort) {
    let dir = this.sortDir;
    return {
      'sort-asc icon-down': dir === SortDirection.asc,
      'sort-desc icon-up': dir === SortDirection.desc
    };
  }

  onSort() {
    if(this.column.sortable) {
      this.state.nextSort(this.column);

      this.onColumnChange.emit({
        type: 'sort',
        value: this.column
      });
    }
  }

}
