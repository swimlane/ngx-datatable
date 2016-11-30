import { Directive, Input, Output, EventEmitter } from '@angular/core';

import { Row } from '../types/row.type';
import { SelectionType } from '../types/selection.type';

@Directive({
  selector: '[selection]',
  host: {
    class: 'selectable'
  }
})
export class SelectionDirective {

  @Input() rows: Row[];

  @Input('selection') selectionType = SelectionType.single;

  // A boolean/function you can use to check whether you want
  // to select a particular row based on a criteria. Example:
  // (selection) => { return selection !== 'Ethel Price'; }
  @Input() selectCheck: any;

  // This will be used when displaying or selecting rows:
  // when tracking/comparing them, we'll use the value of this fn,
  // (`fn(x) === fn(y)` instead of `x === y`)
  @Input() rowIdentity: any = ((x) => x);

  @Output() selectionChange = new EventEmitter<Row[]>();

  get selection(): Row[] {
    return this.selected.slice();
  }

  private selected: Row[] = [];
  private prevRow: Row;

  /**
   * Public API for selecting a row.
   * @param {Row}    row        Row to be selected.
   * @param {[type]} selectBool true or false to select or unselect the row.
   * If not specified this will act lke a toggle : true if row is unselected and false if it's selected.
   */
  select(row: Row, selectState = !this.isSelected(row)) {
    let selected: Row[];

    if(this.selectionType === SelectionType.multi || this.selectionType === SelectionType.multiShift) {
      if(!selectState) {
        const selectIdx = this.getSelectedIdx(row);
        selected = [...this.selected.slice(0, selectIdx), ...this.selected.slice(selectIdx + 1)];
      } else {
          if( !this.isSelected(row) ) {
            selected = [...this.selected, row];
          }
      }
    } else {
        if(selectState) {
          selected = [row];
        } else {
          if( this.isSelected(row) ) {
            selected = [];
          }
        }
    }

    if(selected)
      this.setSelection(row, selected);
  }

  /**
   * Public API to select multiple adjacent rows.
   * @param {Row} firstRow [description]
   * @param {Row} lastRow  [description]
   */
  selectRowsBetween(firstRow: Row, lastRow: Row) {
    const prevIndex = firstRow.$$index;
    const index = lastRow.$$index;
    const reverse = index < prevIndex;

    let selected = [...this.selected];

    // Why do we loop through all rows and not just from firstRow to lastRow ?
    for(let i = 0, len = this.rows.length; i < len; i++) {
      const row = this.rows[i];
      const greater = i >= prevIndex && i <= index;
      const lesser = i <= prevIndex && i >= index;

      let range = { start: 0, end: 0 };
      if (reverse) {
        range = {
          start: index,
          end: (prevIndex - index)
        };
      } else {
        range = {
          start: prevIndex,
          end: index + 1
        };
      }

      if((reverse && lesser) || (!reverse && greater)) {
        const idx = this.getSelectedIdx(row);

        // if reverse shift selection (unselect) and the
        // row is already selected, remove it from selected
        if (reverse && idx > -1) {
          selected.splice(idx, 1);
          continue;
        }

        // if in the positive range to be added to `selected`, and
        // not already in the selected array, add it
        if( i >= range.start && i < range.end) {
          if (idx === -1) {
            selected.push(row);
          }
        }
      }
    }

    this.setSelection(lastRow, selected);
  }

  toggleSelect(row: Row, range = false) {
    if (this.selectionType === SelectionType.multiShift && range) {
      this.selectRowsBetween(this.prevRow, row);
    } else {
      this.select(row);
    }
  }

  /**
   * Public API
   * @param {[type]} selectState = true
   */
  selectAll(selectState = true) {
    if( this.selectionType !== SelectionType.multi && this.selectionType !== SelectionType.multiShift) {
      return;
    }

    if(selectState) {
      if(this.selected.length < this.rows.length ) {
        this.setSelection( this.rows[this.rows.length - 1], this.rows.slice() );
      }
    } else {
      if( this.selected.length > 0) {
        this.setSelection( this.rows[this.rows.length - 1], [] );
      }
    }

  }

  isSelected(row: Row): boolean {
    return this.getSelectedIdx(row) >= 0;
  }

  // TODO don't like the row argument and prevRow. Should handle shift select differently
  private setSelection(row: Row, selected: Row[]) {
    this.selected = this.selectCheck ? selected.filter(this.selectCheck.bind(this)) : selected;
    this.prevRow = row;

    this.selectionChange.emit( this.selection );
  }

  private getSelectedIdx(row: Row): number {
    const rowId = this.rowIdentity(row);
    return this.selected.findIndex( s => this.rowIdentity(s) === rowId);
  }
}
