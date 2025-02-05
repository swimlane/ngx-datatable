import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { TableColumn } from '../../types/table-column.type';
import { nextSortDir } from '../../utils/sort';
import {
  HeaderCellContext,
  InnerSortEvent,
  SelectionType,
  SortDirection,
  SortPropDir,
  SortType
} from '../../types/public.types';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div class="datatable-header-cell-template-wrap">
      @if (isTarget) {
      <ng-template
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      } @if (isCheckboxable) {
      <label class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit()" />
      </label>
      } @if (column.headerTemplate) {
      <ng-template
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      } @else {
      <span class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()">
          {{ name }}
        </span>
      </span>
      }
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `,
  host: {
    class: 'datatable-header-cell'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class DataTableHeaderCellComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);

  @Input() sortType: SortType;
  @Input() sortAscendingIcon: string;
  @Input() sortDescendingIcon: string;
  @Input() sortUnsetIcon: string;

  @Input() isTarget: boolean;
  @Input() targetMarkerTemplate: TemplateRef<any>;
  @Input() targetMarkerContext: any;
  @Input() enableClearingSortState = false;

  _allRowsSelected: boolean;

  @Input() set allRowsSelected(value) {
    this._allRowsSelected = value;
    this.cellContext.allRowsSelected = value;
  }
  get allRowsSelected() {
    return this._allRowsSelected;
  }

  @Input() selectionType: SelectionType;

  @Input() set column(column: TableColumn) {
    this._column = column;
    this.cellContext.column = column;
    this.cd.markForCheck();
  }

  get column(): TableColumn {
    return this._column;
  }

  @HostBinding('style.height.px')
  @Input()
  headerHeight: number;

  @Input() set sorts(val: SortPropDir[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.cellContext.sortDir = this.sortDir;
    this.sortClass = this.calcSortClass(this.sortDir);
    this.cd.markForCheck();
  }

  get sorts(): SortPropDir[] {
    return this._sorts;
  }

  @Output() sort: EventEmitter<InnerSortEvent> = new EventEmitter();
  @Output() select: EventEmitter<void> = new EventEmitter();
  @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent; column: TableColumn }>(false);

  @HostBinding('class')
  get columnCssClasses(): string {
    let cls = 'datatable-header-cell';

    if (this.column.sortable) {
      cls += ' sortable';
    }
    if (this.column.resizeable) {
      cls += ' resizeable';
    }
    if (this.column.headerClass) {
      if (typeof this.column.headerClass === 'string') {
        cls += ' ' + this.column.headerClass;
      } else if (typeof this.column.headerClass === 'function') {
        const res = this.column.headerClass({
          column: this.column
        });

        if (typeof res === 'string') {
          cls += ' ' + res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              cls += ` ${k}`;
            }
          }
        }
      }
    }

    const sortDir = this.sortDir;
    if (sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

  @HostBinding('attr.title')
  get name(): string {
    // guaranteed to have a value by setColumnDefaults() in column-helper.ts
    return this.column.headerTemplate === undefined ? this.column.name : undefined;
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

  @HostBinding('tabindex') get tabindex(): number {
    return this.column.sortable ? 0 : -1;
  }

  get isCheckboxable(): boolean {
    return this.column.headerCheckboxable;
  }

  sortClass: string;
  sortDir: SortDirection;

  cellContext: HeaderCellContext;

  private _column: TableColumn;
  private _sorts: SortPropDir[];

  constructor() {
    this.cellContext = {
      column: this.column,
      sortDir: this.sortDir,
      sortFn: () => this.onSort(),
      allRowsSelected: this.allRowsSelected,
      selectFn: () => this.select.emit()
    };
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.columnContextmenu.emit({ event: $event, column: this.column });
  }

  @HostListener('keydown.enter')
  enter(): void {
    this.onSort();
  }

  ngOnInit() {
    this.sortClass = this.calcSortClass(this.sortDir);
    // If there is already a default sort then start the counter with 1.
    if (this.sortDir) {
      this.totalSortStatesApplied = 1;
    }
  }

  calcSortDir(sorts: SortPropDir[]): any {
    if (sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if (sort) {
        return sort.dir;
      }
    }
  }
  // Counter to reset sort once user sort asc and desc.
  private totalSortStatesApplied = 0;
  onSort(): void {
    if (!this.column.sortable) {
      return;
    }

    this.totalSortStatesApplied++;
    let newValue = nextSortDir(this.sortType, this.sortDir);
    // User has done both direction sort so we reset the next sort.
    if (this.enableClearingSortState && this.totalSortStatesApplied === 3) {
      newValue = undefined;
      this.totalSortStatesApplied = 0;
    }
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

  calcSortClass(sortDir: SortDirection): string {
    if (!this.cellContext.column.sortable) {
      return;
    }
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn ${this.sortUnsetIcon}`;
    }
  }
}
