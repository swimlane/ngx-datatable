import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  Output,
  Renderer
} from '@angular/core';

import { StateService } from 'services';
import { TableColumn } from 'models';
import { SortDirection } from 'types';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div>
      <span
        class="datatable-header-cell-label draggable"
        *ngIf="!model.headerTemplate"
        (click)="onSort()"
        [innerHTML]="name">
      </span>
      <template
        *ngIf="model.headerTemplate"
        [column]="model"
        [sort]="sort"
        [templateWrapper]="model.headerTemplate">
      </template>
      <span
        class="sort-btn"
        [ngClass]="sortClasses()">
      </span>
    </div>
  `,
  host: {
    '[class.sortable]': 'model.sortable',
    '[class.resizable]': 'model.resizable',
    '[style.width]': 'model.width + "px"',
    '[style.minWidth]': 'model.minWidth + "px"',
    '[style.maxWidth]': 'model.maxWidth + "px"',
    '[style.height]': 'model.height + "px"',
    '[attr.title]': 'name'
  }
})
export class DataTableHeaderCell {

  @Input() model: TableColumn;

  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  sort: Function = this.onSort.bind(this);

  get sortDir() {
    let sort = this.state.options.sorts.find(s => {
      return s.prop === this.model.prop;
    });

    if(sort) return sort.dir;
  }

  get name() {
    return this.model.name || this.model.prop;
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
    if(this.model.sortable) {
      this.state.nextSort(this.model);

      this.onColumnChange.emit({
        type: 'sort',
        value: this.model
      });
    }
  }

}
