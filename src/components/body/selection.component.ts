import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Keys, selectRows, selectRowsBetween, camelCase } from '../../utils';
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
  tabFocusCellElement: HTMLElement;

  private _focusResetTimeout: any;

  constructor(private elementRef: ElementRef) {}

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
        selectedCellName = camelCase(cellName);
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
      this.transferCellTabFocus(<HTMLElement>model.cellElement);
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
      this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
    }
  }

  getPrevNextRow(rowElement: HTMLElement, keyCode: number): any {
    let prevNextRow: any = null;

    if (keyCode === Keys.up) {
      prevNextRow = this.getPrevRow(rowElement);
      if (!prevNextRow) {
        this.scrollTableBody(rowElement, keyCode);
      } else if (!this.getPrevRow(prevNextRow)) {
        this.scrollTableBody(prevNextRow, keyCode);
      }
    } else if (keyCode === Keys.down) {
      prevNextRow = this.getNextRow(rowElement);
      if (!prevNextRow) {
        this.scrollTableBody(rowElement, keyCode);
      } else if (!this.getNextRow(prevNextRow)) {
        this.scrollTableBody(prevNextRow, keyCode);
      }
    }

    return prevNextRow;
  }

  getPrevRow(rowElement: HTMLElement): any {
    const prevRow = <HTMLElement>rowElement.previousElementSibling;
    const parentElement = rowElement.parentElement;

    if (prevRow && prevRow.tagName.toLowerCase() === 'datatable-body-row') {
      return prevRow;
    } else if (parentElement) {
      // Cannot find next row in current row wrapper, so look at each prev row wrapper to find one with row contents.
      let prevRowWrapper = <HTMLElement>parentElement;

      while (prevRowWrapper) {
        prevRowWrapper = <HTMLElement>prevRowWrapper.previousElementSibling;
        if (prevRowWrapper) {
          for (let i = prevRowWrapper.children.length - 1; i >= 0; i--) {
            if (prevRowWrapper.children[i].tagName.toLowerCase() === 'datatable-body-row') {
              return prevRowWrapper.children[i];
            }
          }
        }
      }
    }

    return null;
  }

  getNextRow(rowElement: HTMLElement): any {
    const nextRow = <HTMLElement>rowElement.nextElementSibling;
    const parentElement = rowElement.parentElement;

    if (nextRow && nextRow.tagName.toLowerCase() === 'datatable-body-row') {
      return nextRow;
    } else if (parentElement) {
      // Cannot find next row in current row wrapper, so look at each next row wrapper to find one with row contents.
      let nextRowWrapper = <HTMLElement>parentElement;
      while (nextRowWrapper) {
        nextRowWrapper = <HTMLElement>nextRowWrapper.nextElementSibling;

        if (nextRowWrapper) {
          for (let i = 0; i < nextRowWrapper.children.length; i++) {
            if (nextRowWrapper.children[i].tagName.toLowerCase() === 'datatable-body-row') {
              return nextRowWrapper.children[i];
            }
          }
        }
      }
    }

    return null;
  }

  /**
   * If it is found that the 2nd last element has been focused (either at top or bottom of table body viewport),
   * then scroll the table viewport so that more elements will be visible and available for focus.
   */
  scrollTableBody(lastRow: HTMLElement, keyCode: number): void {
    let lastRowWrap: HTMLElement = lastRow.parentElement;
    while (lastRowWrap && lastRowWrap.tagName.toLowerCase() !== 'datatable-row-wrapper') {
      lastRowWrap = lastRowWrap.parentElement;
    }

    if (lastRowWrap) {
      let tableBodyElem: HTMLElement = lastRowWrap.parentElement;
      while (tableBodyElem && tableBodyElem.tagName.toLowerCase() !== 'datatable-body') {
        tableBodyElem = tableBodyElem.parentElement;
      }

      if (tableBodyElem) {
        const lastWrapRect: ClientRect = lastRowWrap.getBoundingClientRect();
        const directionMult: number = (keyCode === Keys.down ? 1 : -1);
        tableBodyElem.scrollBy(0, directionMult * lastWrapRect.height);
      }
    }
  }

  /**
   * Resets the tab focus for body cells if paging or scrolling occured that caused focus cell to fall out
   * of bounds. Will automatically set a timeout period that acts like a debunce time to prevent useless
   * operations from occuring while scrolling.
   */
  resetTabFocusIfLost(): void {
    clearTimeout(this._focusResetTimeout);
    this._focusResetTimeout = setTimeout(() => {
      let curTabFocusCellRect: ClientRect;
      let tableBodyRect: ClientRect;

      // Get bounding rectangles of both table body and current tab focus cell.
      if (this.tabFocusCellElement) {
        curTabFocusCellRect = this.tabFocusCellElement.getBoundingClientRect();
        let tableBodyElem: HTMLElement = this.tabFocusCellElement.parentElement;
        while(tableBodyElem && tableBodyElem.tagName.toLowerCase() !== 'datatable-body') {
          tableBodyElem = tableBodyElem.parentElement;
        }
        if (tableBodyElem) {
          tableBodyRect = tableBodyElem.getBoundingClientRect();
        }
      }

      // Check to see if tab focus cell is outside the boundary of the body.
      if (!this.tabFocusCellElement || !tableBodyRect
      || curTabFocusCellRect.top >= tableBodyRect.bottom
      || curTabFocusCellRect.bottom <= tableBodyRect.top) {
        const selectionElem: HTMLElement = this.elementRef.nativeElement;
        const firstCell = <HTMLElement>selectionElem.getElementsByClassName('datatable-body-cell').item(0);
        if (firstCell) {
          this.transferCellTabFocus(firstCell);
        }
      }
    }, 100);
  }

  transferCellTabFocus(to: HTMLElement): void {
    if (this.tabFocusCellElement) {
      this.tabFocusCellElement.tabIndex = -1;
    }
    this.tabFocusCellElement = to;
    to.tabIndex = 0;
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
      this.transferCellTabFocus(nextCellElement);
      nextCellElement.focus();
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
