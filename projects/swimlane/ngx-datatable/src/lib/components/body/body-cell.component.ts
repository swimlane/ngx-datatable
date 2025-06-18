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
  Output
} from '@angular/core';

import { Keys } from '../../utils/keys';
import {
  ActivateEvent,
  CellContext,
  Row,
  RowOrGroup,
  SortDirection,
  SortPropDir,
  TreeStatus
} from '../../types/public.types';
import { NgTemplateOutlet } from '@angular/common';
import { CellActiveEvent, RowIndex, TableColumnInternal } from '../../types/internal.types';

@Component({
  selector: 'datatable-body-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      @if (column.checkboxable && (!displayCheck || displayCheck(row, column, value))) {
      <label class="datatable-checkbox">
        <input
          type="checkbox"
          [disabled]="disabled"
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
      <ng-template [ngTemplateOutlet]="column.cellTemplate" [ngTemplateOutletContext]="cellContext">
      </ng-template>
      }
    </div>
  `,
  styleUrl: './body-cell.component.scss',
  imports: [NgTemplateOutlet]
})
export class DataTableBodyCellComponent<TRow extends Row = any> implements DoCheck {
  private cd = inject(ChangeDetectorRef);

  @Input() displayCheck?: (row: TRow, column: TableColumnInternal, value: any) => boolean;

  @Input() set disabled(value: boolean | undefined) {
    this.cellContext.disabled = value;
    this._disabled = value;
  }

  get disabled(): boolean | undefined {
    return this._disabled;
  }

  @Input() set group(group: TRow[] | undefined) {
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

  @Input() set isSelected(val: boolean | undefined) {
    this._isSelected = val;
    this.cellContext.isSelected = val;
    this.cd.markForCheck();
  }

  get isSelected(): boolean | undefined {
    return this._isSelected;
  }

  @Input() set expanded(val: boolean | undefined) {
    this._expanded = val;
    this.cellContext.expanded = val;
    this.cd.markForCheck();
  }

  get expanded(): boolean | undefined {
    return this._expanded;
  }

  @Input() set rowIndex(val: RowIndex) {
    this._rowIndex = val;
    this.cellContext.rowIndex = val?.index;
    this.cellContext.rowInGroupIndex = val?.indexInGroup;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowIndex(): RowIndex {
    return this._rowIndex;
  }

  @Input() set column(column: TableColumnInternal) {
    this._column = column;
    this.cellContext.column = column;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get column(): TableColumnInternal {
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

  @Input() set treeStatus(status: TreeStatus | undefined) {
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

  get treeStatus(): TreeStatus | undefined {
    return this._treeStatus;
  }

  @Output() activate = new EventEmitter<CellActiveEvent<TRow>>();

  @Output() treeAction: EventEmitter<any> = new EventEmitter();

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
    if (this.isFocused && !this._disabled) {
      cls += ' active';
    }
    if (this.sortDir === SortDirection.asc) {
      cls += ' sort-asc';
    }
    if (this.sortDir === SortDirection.desc) {
      cls += ' sort-desc';
    }
    if (this._disabled) {
      cls += ' row-disabled';
    }

    return cls;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number | undefined {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number | undefined {
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

  sanitizedValue!: string;
  value: any;
  sortDir?: SortDirection;
  isFocused = false;

  cellContext: CellContext<TRow>;

  private _isSelected?: boolean;
  private _sorts!: SortPropDir[];
  private _column!: TableColumnInternal;
  private _row!: TRow;
  private _group?: TRow[];
  private _rowHeight!: number;
  private _rowIndex!: RowIndex;
  private _expanded?: boolean;
  private _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private _treeStatus?: TreeStatus;
  private _disabled?: boolean;

  constructor() {
    this.cellContext = {
      onCheckboxChangeFn: (event: Event) => this.onCheckboxChange(event),
      activateFn: (event: ActivateEvent<TRow>) => this.activate.emit(event),
      row: this.row,
      group: this.group,
      value: this.value,
      column: this.column,
      rowHeight: this.rowHeight,
      isSelected: this.isSelected,
      rowIndex: this.rowIndex?.index,
      rowInGroupIndex: this.rowIndex?.indexInGroup,
      treeStatus: this.treeStatus,
      disabled: this._disabled,
      onTreeAction: () => this.onTreeAction()
    };
  }

  ngDoCheck(): void {
    this.checkValueUpdates();
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column || this.column.prop == undefined) {
      value = '';
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.prop);
      const userPipe = this.column.pipe;

      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
        value = val;
      }
    }

    if (this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.cellContext.disabled = this._disabled;
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

  onCheckboxChange(event: Event): void {
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

  calcSortDir(sorts: SortPropDir[]): SortDirection | undefined {
    if (!sorts) {
      return undefined;
    }

    const sort = sorts.find(s => s.prop === this.column.prop);

    return sort?.dir as SortDirection;
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

  calcLeftMargin(column: TableColumnInternal, row: RowOrGroup<TRow>): number {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? (row as TRow).level! * levelIndent : 0;
  }
}
