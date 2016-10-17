import {
  Component, Input, ElementRef, EventEmitter,
  Output, Renderer, HostBinding
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
  `
})
export class DataTableHeaderCell {

  @Input() column: TableColumn;
  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.width.px')
  get width() { return this.column.width; }

  @HostBinding('style.minWidth.px')
  get minWidth() { return this.column.minWidth; }

  @HostBinding('style.maxWidth.px')
  get maxWidth() { return this.column.maxWidth; }

  @HostBinding('style.height.px')
  get height() { return this.state.options.headerHeight; }

  @HostBinding('attr.title')
  get colTitle() { return this.name; }

  @HostBinding('class')
  get cssClasses() {
    let cls = 'datatable-header-cell';

    if(this.column.sortable) cls += ' sortable';
    if(this.column.resizeable) cls += ' resizeable';

    const sortDir = this.sortDir;
    if(sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

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

  constructor(
    public element: ElementRef,
    private state: StateService,
    renderer: Renderer) {
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
