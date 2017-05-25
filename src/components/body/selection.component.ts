/*
 * VERITAS: Copyright (c) 2017 Veritas Technologies LLC. All rights reserved.
 *
 * THIS SOFTWARE CONTAINS CONFIDENTIAL INFORMATION AND TRADE SECRETS OF VERITAS
 * TECHNOLOGIES LLC. USE, DISCLOSURE OR REPRODUCTION IS PROHIBITED WITHOUT THE PRIOR
 * EXPRESS WRITTEN PERMISSION OF VERITAS TECHNOLOGIES LLC.
 *
 * The Licensed Software and Documentation are deemed to be commercial computer
 * software as defined in FAR 12.212 and subject to restricted rights as defined
 * in FAR Section 52.227-19 "Commercial Computer Software - Restricted Rights"
 * and DFARS 227.7202, Rights in "Commercial Computer Software or Commercial
 * Computer Software Documentation," as applicable, and any successor regulations,
 * whether delivered by Veritas as on premises or hosted services. Any use,
 * modification, reproduction release, performance, display or disclosure of
 * the Licensed Software and Documentation by the U.S. Government shall be
 * solely in accordance with the terms of this Agreement.

 * SS45-8248-1773-66-15-0
 */
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SelectionType } from "../../types/selection.type";
import { Keys } from "../../utils/keys";

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
  template: '<ng-content></ng-content>'
})
export class DataTableSelectionComponent {

  @Input() rowIdentity: (row: any) => any = ((row: any) => row);
  @Input() rows: any[];
  @Input() selectCheck: (row: any, index?: number, rows?: any[]) => boolean = ((row: any) => true);
  @Input() selected: any[];
  @Input() selectionType: SelectionType;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  private prevIndex: number;

  isRowSelected(row: any): boolean {
    return this._getRowSelectedIdx(row, this.selected) > -1;
  }

  onActivate(model: Model, index: number): void {
    const {type, event, row} = model;
    const checkbox = this.selectionType === SelectionType.checkbox;
    const select = (!checkbox && (type === 'click' || type === 'dblclick')) || (checkbox && type === 'checkbox');

    if (select) {
      this.selectRow(event, index, row);
    } else if (type === 'keydown') {
      if ((<KeyboardEvent>event).keyCode === Keys.return) {
        this.selectRow(event, index, row);
      } else {
        this.onKeyboardFocus(model);
      }
    }
    this.activate.emit(model);
  }

  onKeyboardFocus(model: Model): void {
    const {keyCode} = <KeyboardEvent>model.event;
    const shouldFocus = [Keys.up, Keys.down, Keys.right, Keys.left].indexOf(keyCode) !== -1;

    if (shouldFocus) {
      const isCellSelection = this.selectionType === SelectionType.cell;

      if (!model.cellElement || !isCellSelection) {
        this._focusRow(model.rowElement, keyCode);
      } else {
        this._focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
      }
    }
  }

  selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void {
    if (!this.selectionType) return;

    const checkbox = this.selectionType === SelectionType.checkbox;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected: any[] = [];

    if (SelectionType.single === this.selectionType) {
      selected = [row];
    } else if (event.shiftKey) {
      selected = this._selectRowsBetween(this.rows, this.prevIndex || 0, index);
    } else if (event.ctrlKey || event.metaKey || multiClick || checkbox) {
      // if SelectionType === multi, must hold ctrl or meta key to select multiple
      selected = this._selectRows((this.selected || []), row);
    } else {
      // SelectionType === multi without ctrl key or meta key
      selected = [row];
    }

    if (typeof this.selectCheck === 'function') {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    this.selected = selected;

    if (!event.shiftKey) {
      this.prevIndex = index;
    }

    this.select.emit({
      selected
    });
  }

  _focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void {
    let nextCellElement: HTMLElement;

    if (keyCode === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (keyCode === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (keyCode === Keys.up || keyCode === Keys.down) {
      const nextRowElement = this._getPrevNextRow(rowElement, keyCode);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName('data-table-body-cell');
        if (children.length) nextCellElement = children[cellIndex];
      }
    }

    if (nextCellElement) nextCellElement.focus();
  }

  _focusRow(rowElement: any, keyCode: number): void {
    const nextRowElement = this._getPrevNextRow(rowElement, keyCode);
    if (nextRowElement) {
      nextRowElement.focus();
    }
  }

  _getPrevNextRow(rowElement: Element, keyCode: number): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: Element;
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

  _getRowSelectedIdx(row: any, selected: any[]): number {
    if (!selected || !selected.length) return -1;

    const rowId = this.rowIdentity(row);
    return selected.findIndex(selectedRow => rowId === this.rowIdentity(selectedRow));
  }

  private _selectRows(selected: any[], row: any) {
    const selectedIndex = this._getRowSelectedIdx(row, selected);

    if (selectedIndex === -1) {
      return selected.concat(row);
    }

    return selected.filter((selectedRow, index) => selectedIndex !== index);
  }

  private _selectRowsBetween(rows: any[], prevIndex: number, currentIndex: number): any[] {
    const [lower, upper] = [prevIndex, currentIndex].sort();
    return rows.filter((row: any, index: number) => index >= lower && index <= upper);
  }
}
