import {
  Component, Output, EventEmitter, Input, HostBinding, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { translateXY, columnsByPin, columnGroupWidths, RowHeightCache } from '../../utils';
import { SelectionType, Section } from '../../types';
import { ScrollerComponent } from './scroller.component';
import { mouseEvent } from '../../events';

@Component({
  selector: 'datatable-body',
  template: `
    <datatable-selection
      #selector
      [selected]="selected"
      [activated]="activated"
      [rows]="temp"
      [selectCheck]="selectCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)">
      <datatable-progress
        *ngIf="loadingIndicator">
      </datatable-progress>
      <datatable-scroller
        *ngIf="rows?.length"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight"
        [scrollWidth]="columnGroupWidths.total"
        (scroll)="onBodyScroll($event)">
        <datatable-row-wrapper
          *ngFor="let row of temp; let i = index; trackBy: rowTrackingFn;"
          [ngStyle]="getRowsStyles(row)"
          [rowDetail]="rowDetail"
          [detailRowHeight]="getDetailRowHeight(row,i)"
          [row]="row"
          [rowIndex]="getRowIndex(row)"
          [expanded]="getRowExpanded(row)"
          (rowContextmenu)="rowContextmenu.emit($event)">
          <datatable-body-section-header
            *ngIf="row.$$isSectionHeader"
            tabindex="-1"
            [isSelected]="selector.getRowSelected(row)"
            [columns]="columns"
            [sectionHeaderTemplate]="sectionHeader"
            [sectionHeaderHeight]="getSectionHeaderHeight(row)"
            [row]="row"
            [rowIndex]="getRowIndex(row)"
            [expanded]="getSectionExpanded(row)"
            [sectionCount]="getSectionCount(row.$$sectionIndex)"
            [rowClass]="rowClass"
            (activate)="selector.onActivate($event, i)">
          </datatable-body-section-header>
          <datatable-body-row
            *ngIf="!row.$$isSectionHeader"
            tabindex="-1"
            [isSelected]="selector.getRowSelected(row)"
            [isActive]="selector.getRowActive(row)"
            [getCellActive]="selector.getCellActive"
            [innerWidth]="innerWidth"
            [offsetX]="offsetX"
            [columns]="columns"
            [rowHeight]="getRowHeight(row)"
            [row]="row"
            [rowIndex]="getRowIndex(row)"
            [expanded]="getRowExpanded(row)"
            [rowClass]="rowClass"
            (activate)="selector.onActivate($event, i)">
          </datatable-body-row>
        </datatable-row-wrapper>
      </datatable-scroller>
      <div
        class="empty-row"
        *ngIf="!rows?.length"
        [innerHTML]="emptyMessage">
      </div>
    </datatable-selection>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-body'
  }
})
export class DataTableBodyComponent implements OnInit, OnDestroy {

  @Input() scrollbarV: boolean;
  @Input() scrollbarH: boolean;
  @Input() loadingIndicator: boolean;
  @Input() externalPaging: boolean;
  @Input() rowHeight: number;
  @Input() sectionHeaderHeight: number;
  @Input() sectionHeader: any;
  @Input() sections: Section[];
  @Input() offsetX: number;
  @Input() emptyMessage: string;
  @Input() selectionType: SelectionType;
  @Input() activated: { row?: any, column?: number };
  @Input() selected: any[] = [];
  @Input() rowIdentity: any;
  @Input() rowDetail: any;
  @Input() selectCheck: any;
  @Input() trackByProp: string;
  @Input() rowClass: any;
  @Input() sectionCounts: number[];

  @Input() set pageSize(val: number) {
    this._pageSize = val;
    this.recalcLayout();
  }

  get pageSize(): number {
    return this._pageSize;
  }

  @Input() set rows(val: any[]) {
    this._rows = val;
    this.rowExpansions.clear();
    this.recalcLayout();
  }

  get rows(): any[] {
    return this._rows;
  }

  @Input() set columns(val: any[]) {
    this._columns = val;

    const colsByPin = columnsByPin(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() set offset(val: number) {
    this._offset = val;
    this.recalcLayout();
  }

  get offset(): number {
    return this._offset;
  }

  @Input() set rowCount(val: number) {
    this._rowCount = val;
    this.recalcLayout();
  }

  get rowCount(): number {
    return this._rowCount;
  }

  @Input() innerWidth: number;

  @HostBinding('style.width')
  get bodyWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  @Input()
  @HostBinding('style.height')
  set bodyHeight(val) {
    if (this.scrollbarV) {
      this._bodyHeight = val + 'px';
    } else {
      this._bodyHeight = 'auto';
    }

    this.recalcLayout();
  }

  get bodyHeight() {
    return this._bodyHeight;
  }

  @Output() scroll: EventEmitter<any> = new EventEmitter();
  @Output() page: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() detailToggle: EventEmitter<any> = new EventEmitter();
  @Output() sectionHeaderToggle: EventEmitter<any> = new EventEmitter();
  @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent, row: any }>(false);

  @ViewChild(ScrollerComponent) scroller: ScrollerComponent;

  /**
   * Returns if selection is enabled.
   *
   * @readonly
   * @type {boolean}
   * @memberOf DataTableBodyComponent
   */
  get selectEnabled(): boolean {
    return !!this.selectionType;
  }

  /**
   * Property that would calculate the height of scroll bar
   * based on the row heights cache for virtual scroll. Other scenarios
   * calculate scroll height automatically (as height will be undefined).
   *
   * @readonly
   * @type {number}
   * @memberOf DataTableBodyComponent
   */
  get scrollHeight(): number {
    if (this.scrollbarV) {
      return this.rowHeightsCache.query(this.rowCount - 1);
    }
  }

  rowHeightsCache: RowHeightCache = new RowHeightCache();
  temp: any[] = [];
  offsetY: number = 0;
  indexes: any = {};
  columnGroupWidths: any;
  rowTrackingFn: any;
  rowDetailListener: any;
  sectionHeaderListener: any;
  rowIndexes: any = new Map();
  rowExpansions: any = new Map();

  _rows: any[];
  _bodyHeight: any;
  _columns: any[];
  _rowCount: number;
  _offset: number;
  _pageSize: number;

  /**
   * Creates an instance of DataTableBodyComponent.
   *
   * @memberOf DataTableBodyComponent
   */
  constructor() {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = function(index: number, row: any): any {
      const idx = this.rowIndexes.get(row);

      if (this.trackByProp) {
        return `${idx}-${this.trackByProp}`;
      } else {
        return idx;
      }
    }.bind(this);
  }

  /**
   * Called after the constructor, initializing input properties
   *
   * @memberOf DataTableBodyComponent
   */
  ngOnInit(): void {
    if (this.rowDetail) {
      this.rowDetailListener = this.rowDetail.toggle
        .subscribe(({ type, value }: { type: string, value: any }) => {
          if (type === 'row') this.toggleRowExpansion(value);
          if (type === 'all') this.toggleAllRows(value);

          // Refresh rows after toggle
          // Fixes #883
          this.updateIndexes();
          this.updateRows();
        });
    }

    if (this.sectionHeader) {
      this.sectionHeaderListener = this.sectionHeader.toggle
        .subscribe(({ type, value }: { type: string, value: any }) => {
          if (type === 'section') this.toggleSectionExpansion(value);
          if (type === 'all') this.toggleAllSections(value);
        });
    }
  }

  /**
   * Called once, before the instance is destroyed.
   *
   * @memberOf DataTableBodyComponent
   */
  ngOnDestroy(): void {
    if (this.rowDetail) this.rowDetailListener.unsubscribe();
    if (this.sectionHeader) this.sectionHeaderListener.unsubscribe();
  }

  /**
   * Updates the Y offset given a new offset.
   *
   * @param {number} [offset]
   *
   * @memberOf DataTableBodyComponent
   */
  updateOffsetY(offset?: number): void {
    // scroller is missing on empty table
    if (!this.scroller) return;

    if (this.scrollbarV && offset) {
      // First get the row Index that we need to move to.
      const rowIndex = this.pageSize * offset;
      offset = this.rowHeightsCache.query(rowIndex - 1);
    }

    this.scroller.setOffset(offset || 0);
  }

  /**
   * Scrolls to the given row id. If the row is in a section the section must already be expanded.
   *
   * @param rowId
   */
  scrollToRow(rowId: any): void {
    if (this.scrollbarV) {
      // find row
      const rowIndex = this.rows.findIndex((r) => {
        return this.rowIdentity(r) === rowId;
      });
      const offset = this.rowHeightsCache.query(rowIndex - 1);
      this.scroller.setOffset(offset);
    }
  }

  /**
   * Scrolls to the section header of the given section.
   *
   * @param sectionId
   */
  scrollToSection(sectionId: any): void {
    if (this.scrollbarV && this.sections) {
      const rowIndex = this.rows.findIndex((r) => {
        return r.$$isSectionHeader && r.$$sectionIndex === sectionId;
      });
      const offset = this.rowHeightsCache.query(rowIndex - 1);
      this.scroller.setOffset(offset);
    }
  }

  /**
   * Body was scrolled, this is mainly useful for
   * when a user is server-side pagination via virtual scroll.
   *
   * @param {*} event
   *
   * @memberOf DataTableBodyComponent
   */
  onBodyScroll(event: any): void {
    const scrollYPos: number = event.scrollYPos;
    const scrollXPos: number = event.scrollXPos;

    // if scroll change, trigger update
    // this is mainly used for header cell positions
    if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
      this.scroll.emit({
        offsetY: scrollYPos,
        offsetX: scrollXPos
      });
    }

    this.offsetY = scrollYPos;
    this.offsetX = scrollXPos;

    this.updateIndexes();
    this.updatePage(event.direction);
    this.updateRows();
  }

  /**
   * Updates the page given a direction.
   *
   * @param {string} direction
   *
   * @memberOf DataTableBodyComponent
   */
  updatePage(direction: string): void {
    let offset = this.indexes.first / this.pageSize;

    if (direction === 'up') {
      offset = Math.ceil(offset);
    } else if (direction === 'down') {
      offset = Math.ceil(offset);
    }

    if (direction !== undefined && !isNaN(offset)) {
      this.page.emit({ offset });
    }
  }

  /**
   * Updates the rows in the view port
   *
   * @memberOf DataTableBodyComponent
   */
  updateRows(): void {
    const { first, last } = this.indexes;
    let rowIndex = first;
    let idx = 0;
    const temp: any[] = [];

    this.rowIndexes.clear();

    while (rowIndex < last && rowIndex < this.rowCount) {
      const row = this.rows[rowIndex];

      if (row) {
        this.rowIndexes.set(row, rowIndex);
        temp[idx] = row;
      }

      idx++;
      rowIndex++;
    }

    this.temp = temp;
  }

  /**
   * Get the row height
   *
   * @param {*} row
   * @returns {number}
   *
   * @memberOf DataTableBodyComponent
   */
  getRowHeight(row: any): number {
    if (row.$$isSectionHeader) {
      return this.getSectionHeaderHeight(row);
    }
    return typeof this.rowHeight === 'function' ? this.rowHeight(row) : this.rowHeight;
  }

  /**
   * Calculate row height based on the expanded state of the row.
   *
   * @param {*} row the row for which the height need to be calculated.
   * @returns {number} height of the row.
   *
   * @memberOf DataTableBodyComponent
   */
  getRowAndDetailHeight(row: any): number {
    let rowHeight = this.getRowHeight(row);
    const expanded = this.rowExpansions.get(row);

    // Adding detail row height if its expanded.
    if (expanded === 1) {
      rowHeight += this.getDetailRowHeight(row);
    }

    return rowHeight;
  }

  /**
   * Get the height of the detail row.
   *
   * @param {*} [row]
   * @param {*} [index]
   * @returns {number}
   *
   * @memberOf DataTableBodyComponent
   */
  getDetailRowHeight = (row?: any, index?: any): number => {
    if (!this.rowDetail) return 0;
    const rowHeight = this.rowDetail.rowHeight;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
  }

  /**
   * Get the height of the section header
   * @param section
   * @returns {number}
   *
   * @memberOf DataTableBodyComponent
   */
  getSectionHeaderHeight = (section?: any): number => {
    const height = this.sectionHeader ? this.sectionHeader.height : this.sectionHeaderHeight;
    return typeof height === 'function' ? height(section) : height;
  }

  /**
   * Calculates the styles for the row so that the rows can be moved in 2D space
   * during virtual scroll inside the DOM.   In the below case the Y position is
   * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
   * 100 px then following styles are generated:
   *
   * transform: translate3d(0px, 0px, 0px);    ->  row0
   * transform: translate3d(0px, 30px, 0px);   ->  row1
   * transform: translate3d(0px, 130px, 0px);  ->  row2
   *
   * Row heights have to be calculated based on the row heights cache as we wont
   * be able to determine which row is of what height before hand.  In the above
   * case the positionY of the translate3d for row2 would be the sum of all the
   * heights of the rows before it (i.e. row0 and row1).
   *
   * @param {*} row The row that needs to be placed in the 2D space.
   * @returns {*} Returns the CSS3 style to be applied
   *
   * @memberOf DataTableBodyComponent
   */
  getRowsStyles(row: any): any {
    const rowHeight = this.getRowAndDetailHeight(row);

    const styles = {
      height: rowHeight + 'px'
    };

    if (this.scrollbarV) {
      const idx = this.rowIndexes.get(row) || 0;

      // const pos = idx * rowHeight;
      // The position of this row would be the sum of all row heights
      // until the previous row position.
      const pos = this.rowHeightsCache.query(idx - 1);

      translateXY(styles, 0, pos);
    }

    return styles;
  }

  /**
   * Hides the loading indicator
   *
   *
   * @memberOf DataTableBodyComponent
   */
  hideIndicator(): void {
    setTimeout(() => this.loadingIndicator = false, 500);
  }

  /**
   * Updates the index of the rows in the viewport
   *
   * @memberOf DataTableBodyComponent
   */
  updateIndexes(): void {
    let first = 0;
    let last = 0;

    if (this.scrollbarV) {
      // Calculation of the first and last indexes will be based on where the
      // scrollY position would be at.  The last index would be the one
      // that shows up inside the view port the last.
      const height = parseInt(this.bodyHeight, 0);
      first = this.rowHeightsCache.getRowIndex(this.offsetY);
      last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
    } else {
      // The server is handling paging and will pass an array that begins with the
      // element at a specified offset.  first should always be 0 with external paging.
      if (!this.externalPaging) {
        first = Math.max(this.offset * this.pageSize, 0);
      }
      last = Math.min((first + this.pageSize), this.rowCount);
    }

    this.indexes = { first, last };
  }

  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   *
   * @returns {void}
   *
   * @memberOf DataTableBodyComponent
   */
  refreshRowHeightCache(): void {
    if (!this.scrollbarV) return;

    // clear the previous row height cache if already present.
    // this is useful during sorts, filters where the state of the
    // rows array is changed.
    this.rowHeightsCache.clearCache();

    // Initialize the tree only if there are rows inside the tree.
    if (this.rows && this.rows.length) {
      this.rowHeightsCache.initCache({
        rows: this.rows,
        rowHeight: this.rowHeight,
        sectionHeaderHeight: this.getSectionHeaderHeight,
        detailRowHeight: this.getDetailRowHeight,
        externalVirtual: this.scrollbarV && this.externalPaging,
        rowCount: this.rowCount,
        rowIndexes: this.rowIndexes,
        rowExpansions: this.rowExpansions
      });
    }
  }

  /**
   * Gets the index for the view port
   *
   * @returns {number}
   *
   * @memberOf DataTableBodyComponent
   */
  getAdjustedViewPortIndex(): number {
    // Capture the row index of the first row that is visible on the viewport.
    // If the scroll bar is just below the row which is highlighted then make that as the
    // first index.
    const viewPortFirstRowIndex = this.indexes.first;

    if (this.scrollbarV) {
      const offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
      return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
    }

    return viewPortFirstRowIndex;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   *
   * @param {*} row The row for which the expansion needs to be toggled.
   *
   * @memberOf DataTableBodyComponent
   */
  toggleRowExpansion(row: any): void {
    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    let expanded = this.rowExpansions.get(row);

    // If the detailRowHeight is auto --> only in case of non-virtualized scroll
    if (this.scrollbarV) {
      const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
      const idx = this.rowIndexes.get(row) || 0;
      this.rowHeightsCache.update(idx, detailRowHeight);
    }

    // Update the toggled row and update thive nevere heights in the cache.
    expanded = expanded ^= 1;
    this.rowExpansions.set(row, expanded);

    this.detailToggle.emit({
      rows: [row],
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   *
   * @param {boolean} expanded When true, all rows are expanded and when false, all rows will be collapsed.
   *
   * @memberOf DataTableBodyComponent
   */
  toggleAllRows(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions.clear();

    const rowExpanded = expanded ? 1 : 0;

    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();

    for (const row of this.rows) {
      this.rowExpansions.set(row, rowExpanded);
    }

    if (this.scrollbarV) {
      // Refresh the full row heights cache since every row was affected.
      this.recalcLayout();
    }

    // Emit all rows that have been expanded.
    this.detailToggle.emit({
      rows: this.rows,
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Toggle the Expansion of the section i.e. if the section is expanded then it will
   * collapse and vice versa.
   *
   * @param {*} row The section header row for which the expansion needs to be toggled.
   *
   * @memberOf DataTableBodyComponent
   */
  toggleSectionExpansion(section: any): void {
    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    let expanded: number = +this.sections[section].expanded;

    // Update the toggled row and update thive nevere heights in the cache.
    expanded = expanded ^= 1;

    this.sectionHeaderToggle.emit({
      sections: [section],
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Expand/Collapse all the row sections no matter what their state is.
   *
   * @param {boolean} expanded When true, all sections are expanded and when false, all sections will be collapsed.
   *
   * @memberOf DataTableBodyComponent
   */
  toggleAllSections(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions.clear();

    const rowExpanded = expanded ? 1 : 0;

    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();

    for (const row of this.rows) {
      this.rowExpansions.set(row, rowExpanded);
    }

    if (this.scrollbarV) {
      // Refresh the full row heights cache since every row was affected.
      this.recalcLayout();
    }

    // Emit all sections that have been expanded.
    // todo - this shouldn't include all rows, just header rows
    this.sectionHeaderToggle.emit({
      rows: this.rows,
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Recalculates the table
   *
   * @memberOf DataTableBodyComponent
   */
  recalcLayout(): void {
    this.refreshRowHeightCache();
    this.updateIndexes();
    this.updateRows();
  }

  /**
   * Returns if the row was expanded
   *
   * @param {*} row
   * @returns {boolean}
   * @memberof DataTableBodyComponent
   */
  getRowExpanded(row: any): boolean {
    if (row.$$isSectionHeader) {
      return false;
    }
    const expanded = this.rowExpansions.get(row);
    return expanded === 1;
  }

  getSectionExpanded(section: any): boolean {
    if (!section.$$isSectionHeader) {
      return false;
    }
    return this.sections[section.$$sectionIndex].expanded;
  }

  getSectionCount(sectionId: number): number {
    return this.sectionCounts ? this.sectionCounts[sectionId] : 0;
  }

  /**
   * Gets the row index of the item
   *
   * @param {*} row
   * @returns {number}
   * @memberof DataTableBodyComponent
   */
  getRowIndex(row: any): number {
    return this.rowIndexes.get(row);
  }

}
