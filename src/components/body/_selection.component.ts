import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Keys } from '../../utils';
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

  @Input() selectionType: SelectionType;

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

}
