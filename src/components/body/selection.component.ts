import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Keys, selectRows, selectRowsBetween } from '../../utils';
import { SelectionType } from '../../types';
import { mouseEvent, keyboardEvent } from '../../events';

export interface Model {
  type: string;
  event: MouseEvent | KeyboardEvent;
  row: any;
  rowElement: any;
  cellElement: any;
  cellIndex: number;
}

@Component({
  selector: 'datatable-selection',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableSelectionComponent {

  @Input() rows: any[];
  @Input() columns: any[];
  @Input() selected: any[];
  @Input() activated: { row?: any, column?: number};
  @Input() selectEnabled: boolean;
  @Input() selectionType: SelectionType;
  @Input() rowIdentity: any;
  @Input() selectCheck: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() activateCell: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  prevIndex: number;

  constructor() {
    this.getCellActive = this.getCellActive.bind(this);
    this.getRowActive  = this.getRowActive.bind(this);
  }

  activateRow(row: any, columnIndex: number, event?: KeyboardEvent) {
    if ((this.activated as any).$$isDefault && !row.$$isSectionHeader) {
      let nextRow = row;
      let nextColumn = columnIndex;
      if (event) {
        const filteredRows = this.rows.filter(t => !t.$$isSectionHeader);
        const rowIndex = filteredRows.findIndex((t) => this.rowIdentity(t) === row);
        if (event.keyCode === Keys.up) {
          nextRow = filteredRows[Math.max(rowIndex - 1, 0)];
        } else if (event.keyCode === Keys.down) {
          nextRow = filteredRows[Math.min(rowIndex + 1, filteredRows.length - 1)];
        } else if (event.keyCode === Keys.left) {
          nextColumn = Math.max(columnIndex - 1, 0);
        } else if (event.keyCode === Keys.right) {
          nextColumn = Math.min(columnIndex + 1, this.columns.length - 1);
        }
        console.log('RowLength: ', filteredRows.length, ', Index:', rowIndex);
      }

      console.log('Row:', nextRow.itemTitle, ', Column:', nextColumn);
      this.activated.row = this.rowIdentity(nextRow);
      this.activated.column = nextColumn;
      this.activateCell.emit(this.activated);
    }
  }

  selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void {
    if (!this.selectEnabled || row.$$isSectionHeader) return;

    const chkbox = this.selectionType === SelectionType.checkbox;
    const multi = this.selectionType === SelectionType.multi;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected: any[] = [];

    if (multi || chkbox || multiClick) {
      if (event.shiftKey) {
        selected = selectRowsBetween(
          [],
          this.rows,
          index,
          this.prevIndex,
          this.getRowSelectedIdx.bind(this));
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

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.prevIndex = index;

    this.select.emit({
      selected
    });
  }

  onActivate(model: Model, index: number): void {
    const { type, event, row } = model;
    const chkbox = this.selectionType === SelectionType.checkbox;
    const select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
      (chkbox && type === 'checkbox');

    if (select) {
      this.selectRow(event, index, row);
      this.activateRow(row, model.cellIndex);
    } else if (type === 'keydown') {
      this.activateRow(row, model.cellIndex, event as KeyboardEvent);
      if ((<KeyboardEvent>event).keyCode === Keys.return) {
        this.selectRow(event, index, row);
      } else {
        this.onKeyboardFocus(model);
      }
    }
    this.activate.emit(model);
  }

  onKeyboardFocus(model: Model): void {
    const { keyCode } = <KeyboardEvent>model.event;
    const shouldFocus =
      keyCode === Keys.up ||
      keyCode === Keys.down ||
      keyCode === Keys.right ||
      keyCode === Keys.left;

    if (shouldFocus) {
      const isCellSelection =
        this.selectionType === SelectionType.cell;

      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, keyCode);
      } else if (isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
      }
    }
  }

  focusRow(rowElement: any, keyCode: number): void {
    const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
    if (nextRowElement) nextRowElement.focus();
  }

  getPrevNextRow(rowElement: any, keyCode: number): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: HTMLElement;
      if (keyCode === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (keyCode === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }

      if (focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void {
    let nextCellElement: HTMLElement;

    if (keyCode === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (keyCode === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (keyCode === Keys.up || keyCode === Keys.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName('datatable-body-cell');
        if (children.length) nextCellElement = children[cellIndex];
      }
    }

    if (nextCellElement) nextCellElement.focus();
  }

  getRowSelected(row: any): boolean {
    return this.getRowSelectedIdx(row, this.selected) > -1;
  }

  getRowActive(row: any): boolean {
    return this.activated.row === this.rowIdentity(row)
      && this.selectionType !== SelectionType.cell;
  }

  getCellActive(row: any, columnIndex: number): boolean {
    return this.activated.row === this.rowIdentity(row)
      && columnIndex === this.activated.column
      && this.selectionType === SelectionType.cell;
  }

  getRowSelectedIdx(row: any, selected: any[]): number {
    if (!selected || !selected.length) return -1;

    const rowId = this.rowIdentity(row);
    return selected.findIndex((r) => {
      const id = this.rowIdentity(r);
      return id === rowId;
    });
  }

}
