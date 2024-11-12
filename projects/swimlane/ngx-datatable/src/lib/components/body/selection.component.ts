import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { selectRows, selectRowsBetween } from '../../utils/selection';
import { Keys } from '../../utils/keys';
import { ActivateEvent, SelectionType } from '../../types/public.types';

@Component({
  selector: 'datatable-selection',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DataTableSelectionComponent<TRow = any> {
  @Input() rows: TRow[];
  @Input() selected: TRow[];
  @Input() selectEnabled: boolean;
  @Input() selectionType: SelectionType;
  @Input() rowIdentity: any;
  @Input() selectCheck: (value: TRow, index: number, array: TRow[]) => boolean;
  @Input() disableCheck: (row: TRow) => boolean;

  @Output() activate: EventEmitter<ActivateEvent<TRow>> = new EventEmitter();
  @Output() select: EventEmitter<{ selected: TRow[] }> = new EventEmitter();

  prevIndex: number;

  selectRow(event: KeyboardEvent | MouseEvent, index: number, row: TRow): void {
    if (!this.selectEnabled) {
      return;
    }

    const chkbox = this.selectionType === SelectionType.checkbox;
    const multi = this.selectionType === SelectionType.multi;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected: TRow[] = [];

    if (multi || chkbox || multiClick) {
      if (event.shiftKey) {
        selected = selectRowsBetween([], this.rows, index, this.prevIndex);
      } else if ((event as KeyboardEvent).key === 'a' && (event.ctrlKey || event.metaKey)) {
        // select all rows except dummy rows which are added for ghostloader in case of virtual scroll
        selected = this.rows.filter(rowItem => !!rowItem);
      } else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
        selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
      } else {
        selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
      }
    } else {
      selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
    }

    if (typeof this.selectCheck === 'function') {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    if (typeof this.disableCheck === 'function') {
      selected = selected.filter(rowData => !this.disableCheck(rowData));
    }

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.prevIndex = index;

    this.select.emit({
      selected
    });
  }

  onActivate(model: ActivateEvent<TRow>, index: number): void {
    const { type, event, row } = model;
    const chkbox = this.selectionType === SelectionType.checkbox;
    const select =
      (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');

    if (select) {
      this.selectRow(event, index, row);
    } else if (type === 'keydown') {
      if ((event as KeyboardEvent).key === Keys.return) {
        this.selectRow(event, index, row);
      } else if ((event as KeyboardEvent).key === 'a' && (event.ctrlKey || event.metaKey)) {
        this.selectRow(event, 0, this.rows[this.rows.length - 1]);
      } else {
        this.onKeyboardFocus(model);
      }
    }
    this.activate.emit(model);
  }

  onKeyboardFocus(model: ActivateEvent<TRow>): void {
    const { key } = model.event as KeyboardEvent;
    const shouldFocus =
      key === Keys.up || key === Keys.down || key === Keys.right || key === Keys.left;

    if (shouldFocus) {
      const isCellSelection = this.selectionType === SelectionType.cell;
      if (typeof this.disableCheck === 'function') {
        const isRowDisabled = this.disableCheck(model.row);
        if (isRowDisabled) {
          return;
        }
      }
      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, key);
      } else if (isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, key, model.cellIndex);
      }
    }
  }

  focusRow(rowElement: HTMLElement, key: Keys): void {
    const nextRowElement = this.getPrevNextRow(rowElement, key);
    if (nextRowElement) {
      nextRowElement.focus();
    }
  }

  getPrevNextRow(rowElement: HTMLElement, key: Keys): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: Element;
      if (key === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (key === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }

      if (focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(cellElement: HTMLElement, rowElement: HTMLElement, key: Keys, cellIndex: number): void {
    let nextCellElement: Element;

    if (key === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (key === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (key === Keys.up || key === Keys.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, key);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName('datatable-body-cell');
        if (children.length) {
          nextCellElement = children[cellIndex];
        }
      }
    }

    if (
      nextCellElement &&
      'focus' in nextCellElement &&
      typeof nextCellElement.focus === 'function'
    ) {
      nextCellElement.focus();
    }
  }

  getRowSelected(row: TRow): boolean {
    return this.getRowSelectedIdx(row, this.selected) > -1;
  }

  getRowSelectedIdx(row: TRow, selected: any[]): number {
    if (!selected || !selected.length) {
      return -1;
    }

    const rowId = this.rowIdentity(row);
    return selected.findIndex(r => {
      const id = this.rowIdentity(r);
      return id === rowId;
    });
  }
}
