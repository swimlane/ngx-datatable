import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Keys, selectRows, selectRowsBetween } from '../../utils';
import { SelectionType } from '../../types';

@Component({
  selector: 'datatable-selection',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableSelectionComponent {

  @Input() rows: any[];
  @Input() selected: any[];
  @Input() selectEnabled: boolean;
  @Input() selectionType: SelectionType;
  @Input() rowIdentity: any;
  @Input() selectCheck: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  private prevIndex: number;

  selectRow(event, index, row): void {
    if (!this.selectEnabled) return;

    const multiShift = this.selectionType === SelectionType.multiShift;
    const multiClick = this.selectionType === SelectionType.multi;
    let selected = [];

    if (multiShift || multiClick) {
      if (multiShift && event.shiftKey) {
        const newSelected = [...this.selected];
        selected = selectRowsBetween(
          newSelected, this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
      } else if (multiShift && !event.shiftKey) {
        selected.push(row);
      } else {
        const newSelected = [...this.selected];
        selected = selectRows(newSelected, row, this.getRowSelectedIdx.bind(this));
      }
    } else {
      selected.push(row);
    }

    if(this.selectCheck) {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    this.selected = selected;
    this.prevIndex = index;
    
    this.select.emit({
      selected
    });
  }

  onActivate(model, index): void {
    const { type, event, row } = model;

    if(type === 'click' || type === 'dblclick') {
      this.selectRow(event, index, row);
    } else if(type === 'keydown') {
      if (event.keyCode === Keys.return) {
        this.selectRow(event, index, row);
      } else {
        this.onKeyboardFocus(model);
      }
    }
    
    this.activate.emit(model);
  }

  onKeyboardFocus(model): void {
    const { keyCode } = model.event;
    const shouldFocus = 
      keyCode === Keys.up || 
      keyCode === Keys.down ||
      keyCode === Keys.right ||
      keyCode === Keys.left;

    if(shouldFocus) {
      const isCellSelection = 
        this.selectionType === SelectionType.cell;

      if(!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, keyCode);
      } else if(isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
      }
    }
  }

  focusRow(rowElement: any, keyCode: number): void {
    const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
    if(nextRowElement) nextRowElement.focus();
  }

  getPrevNextRow(rowElement: any, keyCode: number): any {
    const parentElement = rowElement.parentElement;

    if(parentElement) {
      let focusElement;
      if(keyCode === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if(keyCode === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }

      if(focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void {
    let nextCellElement;

    if(keyCode === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if(keyCode === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if(keyCode === Keys.up || keyCode === Keys.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
      if(nextRowElement) {
        const children = nextRowElement.getElementsByClassName('datatable-body-cell');
        if(children.length) nextCellElement = children[cellIndex];
      }
    }

    if(nextCellElement) nextCellElement.focus();
  }

  getRowSelected(row): boolean {
    return this.getRowSelectedIdx(row, this.selected) > -1;
  }

  getRowSelectedIdx(row: any, selected: any[]): number {
    if(!selected || !selected.length) return -1;

    const rowId = this.rowIdentity(row);
    return selected.findIndex((r) => {
      const id = this.rowIdentity(r);
      return id === rowId;
    });
  }

}
