import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Codes, selectRows, selectRowsBetween } from '../../utils';
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
  @Input() selectEnabled: boolean;
  @Input() selectionType: SelectionType;
  @Input() rowIdentity: any;
  @Input() selectCheck: any;

  @Input() set activated(val: { row?: any, column?: number}) {
    this._activated = val;
    this.activateCell.emit(val);
  }
  get activated() {
    return this._activated;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() activateCell: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  prevIndex: number;
  _activated: { row?: string, column?: number };

  constructor() {
    this.getCellActive = this.getCellActive.bind(this);
    this.getRowActive  = this.getRowActive.bind(this);
  }

  getNextRow(rows: any[], index: number, direction: number) {
    return rows[Math.min(Math.max(index + direction, 0), rows.length - 1)];
  }

  activateRow(row: any, columnIndex: number, event?: KeyboardEvent) {
    let upRow = row;
    let newRow = row;
    let downRow = row;
    let nextColumn = columnIndex;

    const filteredRows = this.rows.filter(t =>
      !t.$$isSectionHeader || (t.$isSectionHeader && t.$$sectionIndex === row.$$sectionIndex));
    const rowId = !row.$$isSectionHeader ? this.rowIdentity(row) : row.$$sectionIndex;
    const rowIndex = !row.$$isSectionHeader ?
    filteredRows.findIndex((t) => this.rowIdentity(t) === rowId) :
    filteredRows.findIndex(t => t.$$sectionIndex === rowId);

    if (event) {
      const code = event.key || event.code;
      if (code === Codes.up) {
        newRow = this.getNextRow(filteredRows, rowIndex, -1);
      } else if (code === Codes.down) {
        newRow = this.getNextRow(filteredRows, rowIndex, 1);
      } else if (code === Codes.left || (event.shiftKey && code === Codes.tab)) {
        nextColumn = Math.max(columnIndex - 1, 0);
      } else if (code === Codes.right || code === Codes.tab || code === Codes.return) {
        nextColumn = Math.min(columnIndex + 1, this.columns.length - 1);
      }
    }

    const newRowId = this.rowIdentity(newRow);
    const newIndex = filteredRows.findIndex((t) => this.rowIdentity(t) === newRowId);
    upRow = this.getNextRow(filteredRows, newIndex, -1);
    downRow = this.getNextRow(filteredRows, newIndex, 1);

    if ((this.activated as any).$$isDefault) {
      this.activated.row = this.rowIdentity(newRow);
      this.activated.column = nextColumn;
      this.activateCell.emit(this.activated);
    }

    return { newRow, upRow, downRow, nextColumn };
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

    let activated = { upRow: row, newRow: row, downRow: row, nextColumn: model.cellIndex };
    if (select) {
      this.selectRow(event, index, row);
      activated = this.activateRow(row, model.cellIndex);
    } else if (type === 'keydown') {
      const code = (<KeyboardEvent>event).key || (<KeyboardEvent>event).code;
      activated = this.activateRow(row, model.cellIndex, event as KeyboardEvent);
      this.onKeyboardFocus(model);
    }

    this.activate.emit({
      ...model,
      row: activated.newRow,
      upRow: activated.upRow,
      downRow: activated.downRow,
      column: this.columns[activated.nextColumn],
      cellIndex: activated.nextColumn
    });
  }

  onKeyboardFocus(model: Model): void {
    const code = (<KeyboardEvent>model.event).key || (<KeyboardEvent>model.event).code;
    const shouldFocus =
      code === Codes.up ||
      code === Codes.down ||
      code === Codes.right ||
      code === Codes.left ||
      code === Codes.tab ||
      code === Codes.return;

    if (shouldFocus) {
      const isCellSelection =
        this.selectionType === SelectionType.cell;

      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, code);
      } else if (isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, code, model.cellIndex);
      }
    }
  }

  focusRow(rowElement: any, code: string): void {
    const nextRowElement = this.getPrevNextRow(rowElement, code);
    if (nextRowElement) nextRowElement.focus();
  }

  getPrevNextRow(rowElement: any, code: string): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: HTMLElement;
      if (code === Codes.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (code === Codes.down) {
        focusElement = parentElement.nextElementSibling;
      }

      if (focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(cellElement: any, rowElement: any, code: string, cellIndex: number): void {
    let nextCellElement: HTMLElement;

    if (code === Codes.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (code === Codes.right || code === Codes.tab || code === Codes.return) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (code === Codes.up || code === Codes.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, code);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName('datatable-body-cell');
        if (children.length) nextCellElement = children[cellIndex];
      }
    }

    if (nextCellElement) nextCellElement.focus();
  }

  getRowSelected(row: any): boolean {
    if (this.selectionType == SelectionType.cell) {
      return this.activated.row === this.rowIdentity(row);
    }
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
