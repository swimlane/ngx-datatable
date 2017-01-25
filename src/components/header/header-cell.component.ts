import {
  Component, Input, EventEmitter, Output, HostBinding
} from '@angular/core';

import { SortDirection, SortType, SelectionType } from '../../types';
import { nextSortDir } from '../../utils';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div>
      <label
        *ngIf="isCheckboxable" 
        class="datatable-checkbox">
        <input 
          type="checkbox"
          [attr.checked]="allRowsSelected"
          (change)="select.emit(!allRowsSelected)" 
        />
      </label>
      <span class="datatable-header-cell-wrapper">
        <span
          class="datatable-header-cell-label draggable"
          *ngIf="!column.headerTemplate"
          (click)="onSort()"
          [innerHTML]="name">
        </span>
      </span>
      <template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngOutletContext]="{ 
          column: column, 
          sortDir: sortDir,
          sortFn: sortFn
        }">
      </template>
      <span
        [class]="sortClass">
      </span>
    </div>
  `
})
export class DataTableHeaderCellComponent {

  @Input() sortType: SortType;
  @Input() column: any;
  @Input() sortAscendingIcon: string;
  @Input() sortDescendingIcon: string;
  @Input() allRowsSelected: boolean;
  @Input() selectionType: SelectionType;

  @HostBinding('style.height.px')
  @Input() headerHeight: number;

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.sortClass = this.calcSortClass(this.sortDir);
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-header-cell';

    if(this.column.sortable) cls += ' sortable';
    if(this.column.resizeable) cls += ' resizeable';
    if(this.column.cssClasses) cls += ' ' + this.column.cssClasses;

    const sortDir = this.sortDir;
    if(sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

  @HostBinding('attr.title')
  get name(): string {
    return this.column.name || this.column.prop;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    return this.column.maxWidth;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  get isCheckboxable(): boolean {
    return this.column.checkboxable && 
      this.column.headerCheckboxable && 
      this.selectionType === SelectionType.checkbox;
  }

  sortFn = this.onSort.bind(this);
  sortClass: string;
  sortDir: SortDirection;
  _sorts: any[];

  calcSortDir(sorts: any[]): any {
    if(sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if(sort) return sort.dir;
    }
  }

  onSort(): void {
    if(!this.column.sortable) return;

    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

  calcSortClass(sortDir): string {
    if(sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if(sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn`;
    }
  }

}
