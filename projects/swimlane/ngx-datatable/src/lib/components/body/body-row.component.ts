import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  KeyValueDiffer,
  KeyValueDiffers,
  input,
  computed,
  output
} from '@angular/core';

import { NgxDatatableConfig } from '../../ngx-datatable.config';
import { CellActiveEvent, RowIndex, TableColumnInternal } from '../../types/internal.types';
import { ActivateEvent, Row, RowOrGroup, TreeStatus } from '../../types/public.types';
import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ENTER } from '../../utils/keys';
import { DataTableBodyCellComponent } from './body-cell.component';

@Component({
  selector: 'datatable-body-row',
  imports: [DataTableBodyCellComponent],
  template: `
    @for (colGroup of _columnsByPin(); track colGroup.type) {
      @if (colGroup.columns.length) {
        <div
          [class]="'datatable-row-' + colGroup.type + ' datatable-row-group'"
          [style.width.px]="_columnGroupWidths()[colGroup.type]"
          [class.row-disabled]="disabled()"
        >
          @for (column of colGroup.columns; track column.$$id; let ii = $index) {
            <datatable-body-cell
              role="cell"
              tabindex="-1"
              [row]="row()"
              [group]="group()"
              [expanded]="expanded()"
              [isSelected]="isSelected()"
              [rowIndex]="rowIndex()"
              [column]="column"
              [rowHeight]="rowHeight()"
              [displayCheck]="displayCheck()"
              [disabled]="disabled()"
              [treeStatus]="treeStatus()"
              [ariaRowCheckboxMessage]="ariaRowCheckboxMessage()"
              [cssClasses]="cssClasses()"
              (activate)="onActivate($event, ii)"
              (treeAction)="onTreeAction()"
            />
          }
        </div>
      }
    }
  `,
  styleUrl: './body-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'cssClass()',
    '[class.active]': 'isSelected()',
    '[class.datatable-row-odd]': 'innerRowIndex() % 2 !== 0',
    '[class.datatable-row-even]': 'innerRowIndex() % 2 === 0',
    '[class.row-disabled]': 'disabled()',
    '[style.height.px]': 'rowHeight()'
  }
})
export class DataTableBodyRowComponent<TRow extends Row = any> implements DoCheck {
  private cd = inject(ChangeDetectorRef);

  readonly columns = input.required<TableColumnInternal[]>();
  readonly expanded = input<boolean>();
  readonly rowClass = input<(row: TRow) => string | Record<string, boolean>>();
  readonly row = input.required<TRow>();
  readonly group = input<TRow[]>();
  readonly isSelected = input<boolean>();
  readonly rowIndex = input.required<RowIndex>();
  readonly displayCheck = input<(row: TRow, column: TableColumnInternal, value?: any) => boolean>();
  readonly treeStatus = input<TreeStatus | undefined>('collapsed');
  readonly ariaRowCheckboxMessage = input.required<string>();

  readonly disabled = input<boolean>();
  readonly cssClasses = input.required<Partial<Required<NgxDatatableConfig>['cssClasses']>>();

  protected readonly cssClass = computed(() => {
    let cls = 'datatable-body-row';

    const rowClass = this.rowClass();
    if (rowClass) {
      const res = rowClass(this.row());
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
  });

  readonly rowHeight = input.required<number>();

  @HostBinding('style.width.px')
  get columnsTotalWidths(): number {
    return this._columnGroupWidths().total;
  }

  readonly activate = output<ActivateEvent<TRow>>();
  readonly treeAction = output<void>();

  _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly _columnGroupWidths = computed(() => {
    const colsByPin = columnsByPin(this.columns());
    return columnGroupWidths(colsByPin, this.columns());
  });
  readonly _columnsByPin = computed(() => {
    return columnsByPinArr(this.columns());
  });

  private _rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any> = inject(KeyValueDiffers)
    .find({})
    .create();

  ngDoCheck(): void {
    if (this._rowDiffer.diff(this.row())) {
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
      key === ENTER ||
      key === ARROW_DOWN ||
      key === ARROW_UP ||
      key === ARROW_LEFT ||
      key === ARROW_RIGHT;

    const isCtrlA = event.key === 'a' && (event.ctrlKey || event.metaKey);

    if ((isAction && isTargetRow) || isCtrlA) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row(),
        rowElement: this._element
      });
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: MouseEvent): void {
    this.activate.emit({
      type: 'mouseenter',
      event,
      row: this.row(),
      rowElement: this._element
    });
  }

  onTreeAction() {
    this.treeAction.emit();
  }

  /** Returns the row index, or if in a group, the index within a group. */
  protected readonly innerRowIndex = computed(() => {
    const rowIndex = this.rowIndex();
    return rowIndex?.indexInGroup ?? rowIndex?.index ?? 0;
  });
}
