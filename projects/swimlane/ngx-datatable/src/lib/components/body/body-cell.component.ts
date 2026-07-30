import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DoCheck,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  signal
} from '@angular/core';

import { NgxDatatableConfig } from '../../ngx-datatable.config';
import { CellActiveEvent, RowIndex, TableColumnInternal } from '../../types/internal.types';
import { ActivateEvent, CellContext, Row, RowOrGroup, TreeStatus } from '../../types/public.types';
import { TableColumn } from '../../types/table-column.type';
import { toPublicColumn } from '../../utils/column-helper';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ENTER } from '../../utils/keys';

@Component({
  selector: 'datatable-body-cell',
  imports: [NgTemplateOutlet],
  template: `
    @let column = this.column();
    @let row = this.row();
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      @let displayCheck = this.displayCheck();
      @if (column.checkboxable && (!displayCheck || displayCheck(row, publicColumn(), value()))) {
        <label class="datatable-checkbox">
          <input
            type="checkbox"
            [attr.aria-label]="ariaRowCheckboxMessage()"
            [disabled]="disabled()"
            [checked]="isSelected()"
            (click)="onCheckboxChange($event)"
          />
        </label>
      }
      @if (column.isTreeColumn) {
        @if (!column.treeToggleTemplate) {
          @let treeStatus = this.treeStatus() ?? 'collapsed';
          <button
            class="datatable-tree-button"
            type="button"
            [disabled]="treeStatus === 'disabled'"
            [attr.aria-label]="treeStatus"
            (click)="onTreeAction()"
          >
            <span>
              @if (treeStatus === 'loading') {
                <i [class]="cssClasses().treeStatusLoading ?? 'icon datatable-icon-collapse'"></i>
              }
              @if (treeStatus === 'collapsed') {
                <i [class]="cssClasses().treeStatusCollapsed ?? 'icon datatable-icon-up'"></i>
              }
              @if (treeStatus === 'expanded' || treeStatus === 'disabled') {
                <i [class]="cssClasses().treeStatusExpanded ?? 'icon datatable-icon-down'"></i>
              }
            </span>
          </button>
        } @else {
          <ng-template
            [ngTemplateOutlet]="column.treeToggleTemplate"
            [ngTemplateOutletContext]="{ cellContext: cellContext() }"
          />
        }
      }
      @if (!column.cellTemplate) {
        @if (column.bindAsUnsafeHtml) {
          <span [title]="sanitizedValue()" [innerHTML]="value()"> </span>
        } @else {
          <span [title]="sanitizedValue()">{{ value() }}</span>
        }
      } @else {
        <ng-template
          [ngTemplateOutlet]="column.cellTemplate"
          [ngTemplateOutletContext]="cellContext()"
        />
      }
    </div>
  `,
  styleUrl: './body-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'datatable-body-cell',
    '[class]': 'columnCssClasses()',
    '[class.active]': 'isFocused() && !disabled()',
    '[class.row-disabled]': 'disabled()',
    '[style.width.px]': 'column().width()',
    '[style.minWidth.px]': 'column().minWidth',
    '[style.maxWidth.px]': 'column().maxWidth',
    '[style.height]': 'height()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(click)': 'onClick($event)',
    '(dblclick)': 'onDblClick($event)',
    '(keydown)': 'onKeyDown($event)'
  }
})
export class DataTableBodyCellComponent<TRow extends Row = any> implements DoCheck {
  readonly displayCheck = input<(row: TRow, column: TableColumn, value: any) => boolean>();

  readonly disabled = input(false, { transform: booleanAttribute });

  readonly group = input<TRow[]>();

  readonly rowHeight = input<number>(0);

  readonly isSelected = input(false, { transform: booleanAttribute });

  readonly rowIndex = input<RowIndex>();

  readonly column = input.required<TableColumnInternal>();

  readonly row = input.required<TRow>();

  readonly treeStatus = input<TreeStatus | undefined>('collapsed');

  readonly ariaRowCheckboxMessage = input.required<string>();

  readonly cssClasses = input.required<Partial<Required<NgxDatatableConfig>['cssClasses']>>();

  readonly expanded = input(false, { transform: booleanAttribute });

  readonly activate = output<CellActiveEvent<TRow>>();

  readonly treeAction = output<TRow>();

  protected readonly publicColumn = computed(() => toPublicColumn(this.column()));

  protected readonly columnCssClasses = computed(() => {
    const column = this.column();
    if (!column.cellClass) {
      return [];
    }
    if (typeof column.cellClass === 'string') {
      return column.cellClass;
    }
    return column.cellClass({
      row: this.row(),
      group: this.group(),
      column: this.publicColumn(),
      value: this.value(),
      rowHeight: this.rowHeight()
    });
  });

  protected readonly height = computed(() => {
    const height = this.rowHeight();
    if (isNaN(height)) {
      return height;
    }
    return height + 'px';
  });

  protected readonly sanitizedValue = computed(() => {
    const value = this.value();
    return value !== null && value !== undefined ? this.stripHtml(value) : value;
  });
  readonly value = linkedSignal(() => this.getComputedValue());
  protected readonly cellContext = computed<CellContext<TRow>>(() => {
    return {
      onCheckboxChangeFn: (event: Event) => this.onCheckboxChange(event),
      activateFn: (event: ActivateEvent<TRow>) => this.activate.emit(event),
      row: this.row(),
      group: this.group(),
      value: this.value(),
      column: this.publicColumn(),
      rowHeight: this.rowHeight(),
      isSelected: this.isSelected(),
      rowIndex: this.rowIndex()?.index ?? 0,
      rowInGroupIndex: this.rowIndex()?.indexInGroup,
      treeStatus: this.treeStatus() ?? 'collapsed',
      disabled: this.disabled(),
      expanded: this.expanded(),
      onTreeAction: () => this.onTreeAction()
    };
  });

  protected readonly isFocused = signal(false);
  private _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngDoCheck(): void {
    const value = this.getComputedValue();
    if (value !== this.value()) {
      this.value.set(value);
    }
  }

  private getComputedValue(): any {
    let value = '';
    const column = this.column();
    const row = this.row();
    if (!row || column.prop == undefined) {
      value = '';
    } else {
      const val = column.$$valueGetter(row, column.prop);
      const userPipe = column.pipe;

      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
        value = val;
      }
    }
    return value;
  }

  protected onFocus(): void {
    this.isFocused.set(true);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
  }

  protected onClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'click',
      event,
      row: this.row(),
      group: this.group(),
      rowHeight: this.rowHeight(),
      column: this.publicColumn(),
      value: this.value(),
      cellElement: this._element
    });
  }

  protected onDblClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'dblclick',
      event,
      row: this.row(),
      group: this.group(),
      rowHeight: this.rowHeight(),
      column: this.publicColumn(),
      value: this.value(),
      cellElement: this._element
    });
  }

  protected onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    const isTargetCell = event.target === this._element;

    const isAction =
      key === ENTER ||
      key === ARROW_DOWN ||
      key === ARROW_UP ||
      key === ARROW_LEFT ||
      key === ARROW_RIGHT;

    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row(),
        group: this.group(),
        rowHeight: this.rowHeight(),
        column: this.publicColumn(),
        value: this.value(),
        cellElement: this._element
      });
    }
  }

  onCheckboxChange(event: Event): void {
    this.activate.emit({
      type: 'checkbox',
      event,
      row: this.row(),
      group: this.group(),
      rowHeight: this.rowHeight(),
      column: this.publicColumn(),
      value: this.value(),
      cellElement: this._element,
      treeStatus: 'collapsed'
    });
  }

  stripHtml(html: string): string {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  protected onTreeAction() {
    this.treeAction.emit(this.row());
  }

  calcLeftMargin(column: TableColumnInternal, row: RowOrGroup<TRow>): number {
    const levelIndent = column.treeLevelIndent ?? 50;
    return column.isTreeColumn ? (row as TRow).level! * levelIndent : 0;
  }
}
