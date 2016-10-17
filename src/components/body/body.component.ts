import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostBinding,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Keys, selectRows, selectRowsBetween, translateXY } from '../../utils';
import { StateService } from '../../services';
import { SelectionType, ClickType } from '../../types';
import { Scroller } from '../../directives';

@Component({
  selector: 'datatable-body',
  template: `
    <div>
      <datatable-progress
        *ngIf="state.options.loadingIndicator">
      </datatable-progress>
      <div
        scroller
        (onScroll)="onBodyScroll($event)"
        *ngIf="state.rows.length"
        [rowHeight]="state.options.rowHeight"
        [scrollbarV]="state.options.scrollbarV"
        [scrollbarH]="state.options.scrollbarH"
        [count]="state.rowCount"
        [scrollHeight]="state.scrollHeight"
        [limit]="state.options.limit"
        [scrollWidth]="state.columnGroupWidths.total">
        <datatable-row-wrapper 
          *ngFor="let row of rows; let i = index; trackBy: trackRowBy"
          [ngStyle]="getRowsStyles(row)"
          [style.height]="getRowHeight(row) + 'px'"
          [row]="row">
          <datatable-body-row
            [attr.tabindex]="i"
            [style.height]="state.options.rowHeight +  'px'"
            (click)="rowClicked($event, i, row)"
            (dblclick)="rowClicked($event, i, row)"
            (keydown)="rowKeydown($event, i, row)"
            [row]="row"
            [class.datatable-row-even]="row.$$index % 2 === 0"
            [class.datatable-row-odd]="row.$$index % 2 !== 0">
          </datatable-body-row>
        </datatable-row-wrapper>
      </div>
      <div
        class="empty-row"
        *ngIf="!rows.length"
        [innerHTML]="state.options.emptyMessage">
      </div>
    </div>
  `
})
export class DataTableBody implements OnInit, OnDestroy {

  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild(Scroller) scroller: Scroller;

  public rows: any;
  private prevIndex: number;
  private sub: Subscription;

  get selectEnabled() {
    return !!this.state.options.selectionType;
  }

  @HostBinding('style.height')
  get bodyHeight() {
    if (this.state.options.scrollbarV) {
      return this.state.bodyHeight + 'px';
    } else {
      return 'auto';
    }
  }

  @HostBinding('style.width')
  get bodyWidth() {
    if (this.state.options.scrollbarH) {
      return this.state.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  constructor(
    public state: StateService,
    element: ElementRef,
    renderer: Renderer) {

    renderer.setElementClass(element.nativeElement, 'datatable-body', true);
  }

  ngOnInit(): void {
    this.rows = [...this.state.rows];
    this.updateRows();

    this.sub = this.state.onPageChange.subscribe((action) => {
      this.updateRows();
      this.hideIndicator();

      if(this.state.options.scrollbarV && action.type === 'pager-event') {
        // First get the row Index that we need to move to.
        const rowIndex = action.limit * action.offset;
        // const offset = (this.state.options.rowHeight * action.limit) * action.offset;
        this.scroller.setOffset(this.state.rowHeightsCache.query(rowIndex - 1));
      }
    });

    this.sub.add(this.state.onExpandChange.subscribe( (expandedState) => {
      // If there was more than one row expanded then there was a mass change
      // in the data set hence adjust the scroll position.
      if (expandedState.rows.length > 1) {
        // -1 is added to the scrollOffset as we want to move the scroller to the offset position
        // where the entire row is visible. What about the small offset e.g. if the scroll
        // position is between rows?  Do we need to take care of it?
        let scrollOffset = this.state.rowHeightsCache.query(expandedState.currentIndex);
        // Set the offset only after the scroll bar has been updated on the screen.
        setTimeout(() => this.scroller.setOffset(scrollOffset));
      }

    }));

    this.sub.add(this.state.onRowsUpdate.subscribe(rows => {
      this.updateRows();
      this.hideIndicator();
    }));

    this.sub.add(this.state.onSortChange.subscribe(() => {
      this.scroller.setOffset(0);
    }));
  }

  trackRowBy(index: number, obj: any) {
    return obj.$$index;
  }

  onBodyScroll(props) {
    this.state.offsetY = props.scrollYPos;
    this.state.offsetX = props.scrollXPos;

    this.updatePage(props.direction);
    this.updateRows();
  }

  updatePage(direction) {
    const idxs = this.state.indexes;
    let page = idxs.first / this.state.pageSize;

    if(direction === 'up') {
      page = Math.floor(page);
    } else if(direction === 'down') {
      page = Math.ceil(page);
    }

    if(direction !== undefined && !isNaN(page)) {
      // pages are offset + 1 ;)
      this.state.setPage({
        type: 'body-event',
        value: page + 1
      });
    }
  }

  updateRows(refresh?: boolean) {
    const idxs = this.state.indexes;
    let idx = 0;
    let rowIndex = idxs.first;

    let endSpliceIdx = refresh ? this.state.rowCount : idxs.last - idxs.first;
    this.rows = this.rows.slice(0, endSpliceIdx);

    while (rowIndex < idxs.last && rowIndex < this.state.rowCount) {
      let row = this.state.rows[rowIndex];

      if(row) {
        row.$$index = rowIndex;
        this.rows[idx] = row;
      }

      idx++;
      rowIndex++;
    }
  }

  /**
   * Calculate row height based on the expanded state of the row.
   *
   * @param row  the row for which the height need to be calculated.
   * @returns {number}  height of the row.
   */
  getRowHeight(row: any): number {
    // Adding detail row height if its expanded.
    return this.state.options.rowHeight +
      (row.$$expanded === 1 ? this.state.options.detailRowHeight : 0 );
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
   * @param row The row that needs to be placed in the 2D space.
   * @returns {{styles: string}}  Returns the CSS3 style to be applied
   */
  getRowsStyles(row) {
    const rowHeight = this.getRowHeight(row);

    let styles = {
      height: rowHeight + 'px'
    };

    if(this.state.options.scrollbarV) {
      const idx = row ? row.$$index : 0;
      // const pos = idx * rowHeight;
      // The position of this row would be the sum of all row heights
      // until the previous row position.
      const pos = this.state.rowHeightsCache.query(idx - 1);
      translateXY(styles, 0, pos);
    }

    return styles;
  }

  hideIndicator(): void {
    setTimeout(() => this.state.options.loadingIndicator = false, 500);
  }

  rowClicked(event, index, row): void {
    let clickType = event.type === 'dblclick' ? ClickType.double : ClickType.single;
    this.onRowClick.emit({ type: clickType, event, row });
    this.selectRow(event, index, row);
  }

  rowKeydown(event, index, row) {
    if (event.keyCode === Keys.return && this.selectEnabled) {
      this.selectRow(event, index, row);
    } else if (event.keyCode === Keys.up || event.keyCode === Keys.down) {
      const dom = event.keyCode === Keys.up ?
        event.target.previousElementSibling :
        event.target.nextElementSibling;
      if (dom) dom.focus();
    }
  }

  selectRow(event, index, row) {
    if (!this.selectEnabled) return;

    const multiShift = this.state.options.selectionType === SelectionType.multiShift;
    const multiClick = this.state.options.selectionType === SelectionType.multi;

    let selections = [];
    if (multiShift || multiClick) {
      if (multiShift && event.shiftKey) {
        const selected = [...this.state.selected];
        selections = selectRowsBetween(selected, this.rows, index, this.prevIndex);
      } else if (multiShift && !event.shiftKey) {
        selections.push(row);
      } else {
        const selected = [...this.state.selected];
        selections = selectRows(selected, row);
      }
    } else {
      selections.push(row);
    }

    this.prevIndex = index;
    this.onRowSelect.emit(selections);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
