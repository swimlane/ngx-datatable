import { EventEmitter } from '@angular/core';
import { Row } from '../types/row.type';
import { SelectionType } from '../types/selection.type';
export declare class SelectionDirective {
    rows: Row[];
    selectionType: SelectionType;
    selectCheck: any;
    rowIdentity: any;
    selectionChange: EventEmitter<Row[]>;
    readonly selection: Row[];
    private selected;
    private prevRow;
    /**
     * Public API for selecting a row.
     * @param {Row}    row        Row to be selected.
     * @param {[type]} selectBool true or false to select or unselect the row.
     * If not specified this will act lke a toggle : true if row is unselected and false if it's selected.
     */
    select(row: Row, selectState?: boolean): void;
    /**
     * Public API to select multiple adjacent rows.
     * @param {Row} firstRow [description]
     * @param {Row} lastRow  [description]
     */
    selectRowsBetween(firstRow: Row, lastRow: Row): void;
    toggleSelect(row: Row, range?: boolean): void;
    /**
     * Public API
     * @param {[type]} selectState = true
     */
    selectAll(selectState?: boolean): void;
    isSelected(row: Row): boolean;
    private setSelection(row, selected);
    private getSelectedIdx(row);
}
