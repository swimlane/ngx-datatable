import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Keys, selectRows, selectRowsBetween } from '../../utils';
import { SelectionType } from '../../types';

export interface Model {
  type: string; 
  event: MouseEvent | KeyboardEvent;
  row: any;
  rowElement: any;
  cellElement: any;
  cellIndex: number;
  cellName: string;
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
  @Input() selected: any[];
  @Input() selectedCellName: string;
  @Input() selectEnabled: boolean;
  @Input() selectionType: SelectionType;
  @Input() rowIdentity: any;
  @Input() selectCheck: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() cellSelect: EventEmitter<any> = new EventEmitter();

  prevIndex: number;

  selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any, cellName: string): void {
    if (!this.selectEnabled) return;

    const cell = this.selectionType === SelectionType.cell;
    const chkbox = this.selectionType === SelectionType.checkbox;
    const multi = this.selectionType === SelectionType.multi;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected: any[] = [];
    let selectedCellName: string = null;

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
      if (cell) {
        selectedCellName = cellName;
      }
    }

    if (typeof this.selectCheck === 'function') {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.selectedCellName = selectedCellName;

    this.prevIndex = index;

    this.select.emit({
      selected,
      selectedCellName
    });
  }

  onActivate(model: Model, index: number): void {
    const { type, event, row } = model;
    const chkbox = this.selectionType === SelectionType.checkbox;
    const select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
      (chkbox && type === 'checkbox');

    if (select) {
      this.selectRow(event, index, row, model.cellName);
    } else if (type === 'keydown') {
      if ((<KeyboardEvent>event).keyCode === Keys.return) {
        this.selectRow(event, index, row, model.cellName);
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

  getPrevNextRow(rowElement: HTMLElement, keyCode: number): any {
    const parentElement = rowElement.parentElement;
    let focusElement: HTMLElement;

    if (keyCode === Keys.up) {
      const prevElementSibling = <HTMLElement>rowElement.previousElementSibling;
      if (prevElementSibling && prevElementSibling.tagName.toLowerCase() === 'datatable-body-row') {
        return prevElementSibling;
      } else if (parentElement) {
        focusElement = <HTMLElement>parentElement.previousElementSibling;

        if (focusElement) {
          for (let i = focusElement.children.length - 1; i >= 0; i--) {
            if (focusElement.children[i].tagName.toLowerCase() === 'datatable-body-row') {
              return focusElement.children[i];
            }
          }
        }
      }
    } else if (keyCode === Keys.down) {
      const nextElementSibling = <HTMLElement>rowElement.nextElementSibling;
      if (nextElementSibling && nextElementSibling.tagName.toLowerCase() === 'datatable-body-row') {
        return nextElementSibling;
      } else if (parentElement) {
        focusElement = <HTMLElement>parentElement.nextElementSibling;

        if (focusElement) {
          for (let i = 0; i < focusElement.children.length; i++) {
            if (focusElement.children[i].tagName.toLowerCase() === 'datatable-body-row') {
              return focusElement.children[i];
            }
          }
        }
      }
    }

    return null;
  }

  focusCell(cellElement: HTMLElement, rowElement: any, keyCode: number, cellIndex: number): void {
    let nextCellElement: HTMLElement;

    if (keyCode === Keys.left) {
      nextCellElement = <HTMLElement>cellElement.previousElementSibling;
      if (!nextCellElement || nextCellElement.tagName.toLowerCase() !== 'datatable-body-cell') {
        const cellParent: HTMLElement = cellElement.parentElement;
        const prevParent = <HTMLElement>cellParent.previousElementSibling;
        if (prevParent) {
          const children = prevParent.getElementsByClassName('datatable-body-cell');
          if (children.length && children[0].tagName.toLowerCase() === 'datatable-body-cell') {
            nextCellElement = <HTMLElement>children[children.length - 1];
          }
        }
      }
    } else if (keyCode === Keys.right) {
      nextCellElement = <HTMLElement>cellElement.nextElementSibling;
      if (!nextCellElement || nextCellElement.tagName.toLowerCase() !== 'datatable-body-cell') {
        const cellParent: HTMLElement = cellElement.parentElement;
        const nextParent = <HTMLElement>cellParent.nextElementSibling;
        if (nextParent) {
          const children = nextParent.getElementsByClassName('datatable-body-cell');
          if (children.length && children[0].tagName.toLowerCase() === 'datatable-body-cell') {
            nextCellElement = <HTMLElement>children[0];
          }
        }
      }
    } else if (keyCode === Keys.up || keyCode === Keys.down) {
      const nextRowElement: HTMLElement = this.getPrevNextRow(rowElement, keyCode);
      if (nextRowElement) {
        const rowGroup = <HTMLElement>nextRowElement.getElementsByClassName(cellElement.parentElement.className)[0];
        const children = rowGroup.getElementsByClassName('datatable-body-cell');
        if (children.length) nextCellElement = <HTMLElement>children[cellIndex];
      }
    }
    
    if (nextCellElement) {
      nextCellElement.focus();
      cellElement.tabIndex = -1;
      nextCellElement.tabIndex = 0;
    }
  }

  getRowSelected(row: any): boolean {
    return this.getRowSelectedIdx(row, this.selected) > -1;
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
