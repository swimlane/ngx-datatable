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
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  CellActiveEvent,
  ColumnGroupWidth,
  PinnedColumns,
  RowIndex,
  TableColumnInternal
} from '../../types/internal.types';
import { ActivateEvent, Row, RowOrGroup, TreeStatus } from '../../types/public.types';
import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { DataTableBodyCellComponent } from './body-cell.component';

@Component({
  selector: 'datatable-body-row',
  imports: [DataTableBodyCellComponent],
  template: `
    @for (colGroup of _columnsByPin; track colGroup.type) {
      @if (colGroup.columns.length) {
        <div
          class="datatable-row-{{ colGroup.type }} datatable-row-group"
          [style.width.px]="_columnGroupWidths[colGroup.type]"
          [class.row-disabled]="disabled"
        >
          @for (column of colGroup.columns; track column.$$id; let ii = $index) {
            <datatable-body-cell
              role="cell"
              tabindex="-1"
              [row]="row"
              [group]="group"
              [expanded]="expanded"
              [isSelected]="isSelected"
              [rowIndex]="rowIndex"
              [column]="column"
              [rowHeight]="rowHeight"
              [displayCheck]="displayCheck"
              [disabled]="disabled"
              [treeStatus]="treeStatus"
              [ariaRowCheckboxMessage]="ariaRowCheckboxMessage"
              (activate)="onActivate($event, ii)"
              (treeAction)="onTreeAction()"
            />
          }
        </div>
      }
    }
  `,
  styleUrl: './body-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyRowComponent<TRow extends Row = any> implements DoCheck, OnChanges {
  private cd = inject(ChangeDetectorRef);

  @Input() set columns(val: TableColumnInternal[]) {
    this._columns = val;
    this.recalculateColumns(val);
  }

  get columns(): TableColumnInternal[] {
    return this._columns;
  }

  @Input() set innerWidth(val: number) {
    if (this._columns) {
      const colByPin = columnsByPin(this._columns);
      this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
    }

    this._innerWidth = val;
    this.recalculateColumns();
  }

  get innerWidth(): number {
    return this._innerWidth;
  }

  @Input() expanded?: boolean;
  @Input() rowClass?: (row: TRow) => string | Record<string, boolean>;
  @Input() row!: TRow;
  @Input() group?: TRow[];
  @Input() isSelected?: boolean;
  @Input() rowIndex!: RowIndex;
  @Input() displayCheck?: (row: TRow, column: TableColumnInternal, value?: any) => boolean;
  @Input() treeStatus?: TreeStatus = 'collapsed';
  @Input() verticalScrollVisible = false;
  @Input() ariaRowCheckboxMessage!: string;

  @Input() disabled?: boolean;

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if (this.isSelected) {
      cls += ' active';
    }
    if (this.innerRowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    }
    if (this.innerRowIndex % 2 === 0) {
      cls += ' datatable-row-even';
    }
    if (this.disabled) {
      cls += ' row-disabled';
    }

    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) {
            cls += ` ${k}`;
          }
        }
      }
    }

    return cls;
  }

  @HostBinding('style.height.px')
  @Input()
  rowHeight!: number;

  @HostBinding('style.width.px')
  get columnsTotalWidths(): number {
    return this._columnGroupWidths.total;
  }

  @Output() readonly activate = new EventEmitter<ActivateEvent<TRow>>();
  @Output() readonly treeAction = new EventEmitter<any>();

  _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  _columnGroupWidths!: ColumnGroupWidth;
  _columnsByPin!: PinnedColumns[];
  _columns!: TableColumnInternal[];
  _innerWidth!: number;

  private _rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any> = inject(KeyValueDiffers)
    .find({})
    .create();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.verticalScrollVisible) {
      this.recalculateColumns();
    }
  }

  ngDoCheck(): void {
    if (this._rowDiffer.diff(this.row)) {
      this.cd.markForCheck();
    }
  }

  onActivate(event: CellActiveEvent<TRow>, index: number): void {
    this.activate.emit({ ...event, rowElement: this._element, cellIndex: index });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    const isTargetRow = event.target === this._element;

    const isAction =
      key === Keys.return ||
      key === Keys.down ||
      key === Keys.up ||
      key === Keys.left ||
      key === Keys.right;

    const isCtrlA = event.key === 'a' && (event.ctrlKey || event.metaKey);

    if ((isAction && isTargetRow) || isCtrlA) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        rowElement: this._element
      });
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: MouseEvent): void {
    this.activate.emit({
      type: 'mouseenter',
      event,
      row: this.row,
      rowElement: this._element
    });
  }

  recalculateColumns(val: TableColumnInternal<TRow>[] = this.columns): void {
    this._columns = val;
    const colsByPin = columnsByPin(this._columns);
    this._columnsByPin = columnsByPinArr(this._columns);
    this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }

  onTreeAction() {
    this.treeAction.emit();
  }

  /** Returns the row index, or if in a group, the index within a group. */
  private get innerRowIndex(): number {
    return this.rowIndex?.indexInGroup ?? this.rowIndex?.index ?? 0;
  }
}
