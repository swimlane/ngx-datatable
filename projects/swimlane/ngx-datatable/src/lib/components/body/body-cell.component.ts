import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  PipeTransform,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { TableColumn } from '../../types/table-column.type';
import { Keys } from '../../utils/keys';
import { BehaviorSubject } from 'rxjs';
import {
  ActivateEvent,
  CellContext,
  RowOrGroup,
  SortDirection,
  SortPropDir,
  TreeStatus
} from '../../types/public.types';
import { DataTableGhostLoaderComponent } from './ghost-loader/ghost-loader.component';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'datatable-body-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (row) {
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      @if (column.checkboxable && (!displayCheck || displayCheck(row, column, value))) {
      <label class="datatable-checkbox">
        <input
          type="checkbox"
          [disabled]="disable$ | async"
          [checked]="isSelected"
          (click)="onCheckboxChange($event)"
        />
      </label>
      } @if (column.isTreeColumn) { @if (!column.treeToggleTemplate) {
      <button
        class="datatable-tree-button"
        [disabled]="treeStatus === 'disabled'"
        (click)="onTreeAction()"
        [attr.aria-label]="treeStatus"
      >
        <span>
          @if (treeStatus === 'loading') {
          <i class="icon datatable-icon-collapse"></i>
          } @if (treeStatus === 'collapsed') {
          <i class="icon datatable-icon-up"></i>
          } @if (treeStatus === 'expanded' || treeStatus === 'disabled') {
          <i class="icon datatable-icon-down"></i>
          }
        </span>
      </button>
      } @else {
      <ng-template
        [ngTemplateOutlet]="column.treeToggleTemplate"
        [ngTemplateOutletContext]="{ cellContext: cellContext }"
      >
      </ng-template>
      } } @if (!column.cellTemplate) { @if (column.bindAsUnsafeHtml) {
      <span [title]="sanitizedValue" [innerHTML]="value"> </span>
      } @else {
      <span [title]="sanitizedValue">{{ value }}</span>
      } } @else {
      <ng-template
        #cellTemplate
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      }
    </div>
    } @else { @if (ghostLoadingIndicator) {
    <ghost-loader [columns]="[column]" [pageSize]="1"></ghost-loader>
    } }
  `,
  imports: [NgTemplateOutlet, DataTableGhostLoaderComponent, AsyncPipe]
})
export class DataTableBodyCellComponent<TRow extends { level?: number } = any>
  implements DoCheck, OnDestroy
{
  private cd = inject(ChangeDetectorRef);

  @Input() displayCheck: (row: RowOrGroup<TRow>, column: TableColumn, value: any) => boolean;

  _disable$: BehaviorSubject<boolean>;
  @Input() set disable$(val: BehaviorSubject<boolean>) {
    this._disable$ = val;
    this.cellContext.disable$ = val;
  }
  get disable$() {
    return this._disable$;
  }

  @Input() set group(group: TRow[]) {
    this._group = group;
    this.cellContext.group = group;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get group() {
    return this._group;
  }

  @Input() set rowHeight(val: number) {
    this._rowHeight = val;
    this.cellContext.rowHeight = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowHeight() {
    return this._rowHeight;
  }

  @Input() set isSelected(val: boolean) {
    this._isSelected = val;
    this.cellContext.isSelected = val;
    this.cd.markForCheck();
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  @Input() set expanded(val: boolean) {
    this._expanded = val;
    this.cellContext.expanded = val;
    this.cd.markForCheck();
  }

  get expanded(): boolean {
    return this._expanded;
  }

  @Input() set rowIndex(val: number) {
    this._rowIndex = val;
    this.cellContext.rowIndex = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowIndex(): number {
    return this._rowIndex;
  }

  @Input() set column(column: TableColumn) {
    this._column = column;
    this.cellContext.column = column;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get column(): TableColumn {
    return this._column;
  }

  @Input() set row(row: TRow) {
    this._row = row;
    this.cellContext.row = row;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get row(): TRow {
    return this._row;
  }

  @Input() set sorts(val: SortPropDir[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
  }

  get sorts(): SortPropDir[] {
    return this._sorts;
  }

  @Input() set treeStatus(status: TreeStatus) {
    if (
      status !== 'collapsed' &&
      status !== 'expanded' &&
      status !== 'loading' &&
      status !== 'disabled'
    ) {
      this._treeStatus = 'collapsed';
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get treeStatus(): TreeStatus {
    return this._treeStatus;
  }

  @Input() ghostLoadingIndicator = false;

  @Output() activate: EventEmitter<ActivateEvent<TRow>> = new EventEmitter();

  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  @ViewChild('cellTemplate', { read: ViewContainerRef, static: true })
  cellTemplate: ViewContainerRef;

  @ViewChild('ghostLoaderTemplate', { read: ViewContainerRef, static: true })
  ghostLoaderTemplate: ViewContainerRef;

  @HostBinding('class')
  get columnCssClasses(): string {
    let cls = 'datatable-body-cell';
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        cls += ' ' + this.column.cellClass;
      } else if (typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value,
          rowHeight: this.rowHeight
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
    if (!this.sortDir) {
      cls += ' sort-active';
    }
    if (this.isFocused && !this.disable$?.value) {
      cls += ' active';
    }
    if (this.sortDir === SortDirection.asc) {
      cls += ' sort-asc';
    }
    if (this.sortDir === SortDirection.desc) {
      cls += ' sort-desc';
    }
    if (this.disable$?.value) {
      cls += ' row-disabled';
    }

    return cls;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    return this.column.maxWidth;
  }

  @HostBinding('style.height')
  get height(): string | number {
    const height = this.rowHeight;
    if (isNaN(height)) {
      return height;
    }
    return height + 'px';
  }

  sanitizedValue: string;
  value: any;
  sortDir: SortDirection;
  isFocused = false;

  cellContext: CellContext<TRow>;

  private _isSelected: boolean;
  private _sorts: SortPropDir[];
  private _column: TableColumn;
  private _row: TRow;
  private _group: TRow[];
  private _rowHeight: number;
  private _rowIndex: number;
  private _expanded: boolean;
  private _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private _treeStatus: TreeStatus;

  constructor() {
    this.cellContext = {
      onCheckboxChangeFn: (event: MouseEvent | KeyboardEvent) => this.onCheckboxChange(event),
      activateFn: (event: ActivateEvent<TRow>) => this.activate.emit(event),
      row: this.row,
      group: this.group,
      value: this.value,
      column: this.column,
      rowHeight: this.rowHeight,
      isSelected: this.isSelected,
      rowIndex: this.rowIndex,
      treeStatus: this.treeStatus,
      disable$: this.disable$,
      onTreeAction: () => this.onTreeAction()
    };
  }

  ngDoCheck(): void {
    this.checkValueUpdates();
  }

  ngOnDestroy(): void {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
    if (this.ghostLoaderTemplate) {
      this.ghostLoaderTemplate.clear();
    }
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column) {
      value = '';
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.prop);
      const userPipe: PipeTransform = this.column.pipe;

      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
        value = val;
      }
    }

    if (this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.cellContext.disable$ = this.disable$;
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
      this.cd.markForCheck();
    }
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'click',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'dblclick',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    const isTargetCell = event.target === this._element;

    const isAction =
      key === Keys.return ||
      key === Keys.down ||
      key === Keys.up ||
      key === Keys.left ||
      key === Keys.right;

    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        group: this.group,
        rowHeight: this.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this._element
      });
    }
  }

  onCheckboxChange(event: MouseEvent | KeyboardEvent): void {
    this.activate.emit({
      type: 'checkbox',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element,
      treeStatus: 'collapsed'
    });
  }

  calcSortDir(sorts: SortPropDir[]): SortDirection {
    if (!sorts) {
      return;
    }

    const sort = sorts.find(s => s.prop === this.column.prop);

    if (sort) {
      return sort.dir as SortDirection;
    }
  }

  stripHtml(html: string): string {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onTreeAction() {
    this.treeAction.emit(this.row);
  }

  calcLeftMargin(column: TableColumn, row: RowOrGroup<TRow>): number {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? (row as TRow).level * levelIndent : 0;
  }
}
