import { Keys } from './../../utils/keys';
import {
  Component, Input, EventEmitter, Output, HostBinding, ElementRef,
  HostListener, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { SortDirection, SortType, SelectionType, TableColumn } from '../../types';
import { nextSortDir } from '../../utils';
import { MouseEvent } from '../../events';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div
      [class]="containerClass"
      (click)="onSort()"
      (keypress)="onKeyPress($event)"
      (focus)="onSortExpected($event)"
      (blur)="onSortExpected($event)"
      (mouseenter)="onSortExpected($event)"
      (mouseleave)="onSortExpected($event)"
      [tabindex]="(tabFocusable ? '0' : '-1')"
      role="columnheader"
      [attr.aria-sort]="ariaSort">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext">
      </ng-template>
      <label
        *ngIf="isCheckboxable"
        class="datatable-checkbox">
        <input
          type="checkbox"
          [checked]="allRowsSelected"
          (change)="select.emit(!allRowsSelected)"
        />
      </label>
      <span
        *ngIf="!column.headerTemplate"
        class="datatable-header-cell-wrapper">
        <span
          class="datatable-header-cell-label draggable"
          (click)="onSort()"
          [innerHTML]="name">
        </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext">
      </ng-template>
      <span [class]="sortClass"></span>
    </div>
  `,
  host: {
    class: 'datatable-header-cell'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableHeaderCellComponent {

  @Input() sortType: SortType;
  @Input() sortAscendingIcon: string;
  @Input() sortDescendingIcon: string;

  @Input() isTarget: boolean;
  @Input() targetMarkerTemplate: any;
  @Input() targetMarkerContext: any;

  _allRowsSelected: boolean;
  _tabIndex: number;
  _containerClass: string;
  
  @Input() set allRowsSelected(value) {
    this._allRowsSelected = value;
    this.cellContext.allRowsSelected = value;
  }
  get allRowsSelected() {
    return this._allRowsSelected;
  }
  
  @Input() selectionType: SelectionType;
  @Input() offsetX: number;
  @Input() tabFocusable: boolean;

  @Input() set column(column: TableColumn) {
    this._column = column;
    this.cellContext.column = column;
    this.cd.markForCheck();
    this.containerClass = 'datatable-header-cell-template-wrap' + (this.column.sortable ? ' header-sort-btn' : '');
  }

  get column(): TableColumn {
    return this._column;
  }

  @HostBinding('style.height.px')
  @Input() headerHeight: number;

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.cellContext.sortDir = this.sortDir;
    this.sortClass = this.calcSortClass(this.sortDir);
    this.ariaSort = this.calcAriaSort(this.sortDir);
    this.cd.markForCheck();
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);
  @Output() scroll: EventEmitter<any> = new EventEmitter();

  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-header-cell';

    if (this.column.sortable) cls += ' sortable';
    if (this.column.resizeable) cls += ' resizeable';
    if (this.column.headerClass) {
      if (typeof this.column.headerClass === 'string') {
        cls += ' ' + this.column.headerClass;
      } else if (typeof this.column.headerClass === 'function') {
        const res = this.column.headerClass({
          column: this.column
        });

        if (typeof res === 'string') {
          cls += res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) cls += ` ${k}`;
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

  get isCheckboxable(): boolean {
    return this.column.checkboxable &&
      this.column.headerCheckboxable &&
      this.selectionType === SelectionType.checkbox;
  }

  containerClass: string;
  sortFn = this.onSort.bind(this);
  sortClass: string;
  sortDir: SortDirection;
  ariaSort: string;
  selectFn = this.select.emit.bind(this.select);

  cellContext: any = {
    column: this.column,
    sortDir: this.sortDir,
    sortFn: this.sortFn,
    allRowsSelected: this.allRowsSelected,
    selectFn: this.selectFn
  };

  private _column: TableColumn;
  private _sorts: any[];

  constructor(private cd: ChangeDetectorRef, public elementRef: ElementRef) { }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.columnContextmenu.emit({ event: $event, column: this.column });
  }

  calcSortDir(sorts: any[]): any {
    if (sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if (sort) return sort.dir;
    }
  }

  onSort(): void {
    if (!this.column.sortable) return;

    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.keyCode === Keys.return || event.keyCode === Keys.space) {
      this.onSort();
    }
  }

  /**
   * Handles focus, blur, mouseenter, and mouseleave events in header cells to
   * show a sort expectation indicator (mainly for accessibility purposes).
   */
  onSortExpected(event: Event): void {
    if (!this.column.sortable) return;
    
    // On focus change, ensure that we generate a scroll event if we focus header cell out of bounds.
    if (event.type === 'focus') {
      const offsetX: number = this.calcOffsetX();

      if (offsetX !== null) {
        this.scroll.emit({offsetX});
      }
    }

    const sortExpected = event.type === 'focus' || event.type === 'mouseenter';
    this.sortClass = this.calcSortClass(this.sortDir, sortExpected);
  }

  /**
   * Calculate the (horizontal table scroll) x-offset so that a scroll output event can be generated.
   */
  calcOffsetX(): number {
    const target = (<HTMLElement>event.target).parentElement;
    let headerElement: HTMLElement = target.parentElement;
    while (!headerElement.classList.contains('datatable-header')) {
      headerElement = headerElement.parentElement;
    }

    const targetRect: ClientRect = target.getBoundingClientRect();
    const targetParentRect: ClientRect = target.parentElement.getBoundingClientRect();
    const headerRect: ClientRect = headerElement.getBoundingClientRect();

    if (targetRect.left < headerRect.left || targetRect.width > headerRect.width) {
      return targetRect.left - targetParentRect.left;
    } else if (targetRect.right > headerRect.right) {
      return targetRect.right - headerRect.right + this.offsetX;
    }
    
    return null;
  }

  calcSortClass(sortDir: SortDirection, sortExpected: boolean = false): string {
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else if (sortExpected) {
      return `sort-btn sort-asc sort-faint ${this.sortAscendingIcon}`;
    }
    return `sort-btn`;
  }

  calcAriaSort(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc) {
      return 'ascending';
    } else if (sortDir === SortDirection.desc) {
      return 'descending';
    } else if (this.column.sortable) {
      return 'none';
    }
    return undefined;
  }

}
