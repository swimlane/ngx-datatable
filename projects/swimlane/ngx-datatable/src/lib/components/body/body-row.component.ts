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

import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { BehaviorSubject } from 'rxjs';
import { ActivateEvent, RowOrGroup, TreeStatus } from '../../types/public.types';
import { AsyncPipe } from '@angular/common';
import { TableColumn } from '../../types/table-column.type';
import { ColumnGroupWidth, PinnedColumns } from '../../types/internal.types';
import { DataTableBodyCellComponent } from './body-cell.component';

@Component({
  selector: 'datatable-body-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (colGroup of _columnsByPin; track colGroup.type; let i = $index) {
    <div
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [style.width.px]="_columnGroupWidths[colGroup.type]"
      [class.row-disabled]="disable$ ? (disable$ | async) : false"
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
        [disable$]="disable$"
        [treeStatus]="treeStatus"
        [ghostLoadingIndicator]="ghostLoadingIndicator"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
      }
    </div>
    }
  `,
  imports: [DataTableBodyCellComponent, AsyncPipe]
})
export class DataTableBodyRowComponent<TRow = any> implements DoCheck, OnChanges {
  private cd = inject(ChangeDetectorRef);

  @Input() set columns(val: TableColumn[]) {
    this._columns = val;
    this.recalculateColumns(val);
  }

  get columns(): TableColumn[] {
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

  @Input() expanded: boolean;
  @Input() rowClass?: (row: RowOrGroup<TRow>) => string | Record<string, boolean>;
  @Input() row: TRow;
  @Input() group: TRow[];
  @Input() isSelected: boolean;
  @Input() rowIndex: number;
  @Input() displayCheck: (row: TRow, column: TableColumn, value?: any) => boolean;
  @Input() treeStatus?: TreeStatus = 'collapsed';
  @Input() ghostLoadingIndicator = false;
  @Input() verticalScrollVisible = false;

  @Input() disable$: BehaviorSubject<boolean>;
  @Input()
  set offsetX(val: number) {
    this._offsetX = val;
  }
  get offsetX() {
    return this._offsetX;
  }

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if (this.isSelected) {
      cls += ' active';
    }
    if (this.rowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    }
    if (this.rowIndex % 2 === 0) {
      cls += ' datatable-row-even';
    }
    if (this.disable$ && this.disable$.value) {
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
  rowHeight: number;

  @HostBinding('style.width.px')
  get columnsTotalWidths(): number {
    return this._columnGroupWidths.total;
  }

  @Output() activate: EventEmitter<ActivateEvent<TRow>> = new EventEmitter();
  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  _columnGroupWidths: ColumnGroupWidth;
  _columnsByPin: PinnedColumns[];
  _offsetX: number;
  _columns: TableColumn[];
  _innerWidth: number;

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

  onActivate(event: ActivateEvent<TRow>, index: number): void {
    event.cellIndex = index;
    event.rowElement = this._element;
    this.activate.emit(event);
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

  recalculateColumns(val: TableColumn<TRow>[] = this.columns): void {
    this._columns = val;
    const colsByPin = columnsByPin(this._columns);
    this._columnsByPin = columnsByPinArr(this._columns);
    this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }

  onTreeAction() {
    this.treeAction.emit();
  }
}
