import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostBinding,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Keys } from '../../utils/keys';
import { selectRows, selectRowsBetween } from '../../utils/selection';
import { translateXY } from '../../utils/translate';

import { StateService } from '../../services/State';
import { SelectionType } from '../../enums/SelectionType';
import { Scroller } from '../../directives/Scroller';

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
        [count]="state.rowCount"
        [scrollWidth]="state.columnGroupWidths.total">
        <datatable-body-row
          [ngStyle]="getRowsStyles(row)"
          [style.height]="state.options.rowHeight + 'px'"
          *ngFor="let row of rows; let i = index;"
          [attr.tabindex]="i"
          (click)="rowClicked($event, i, row)"
          (keydown)="rowKeydown($event, i, row)"
          [row]="row"
          [class.datatable-row-even]="row.$$index % 2 === 0"
          [class.datatable-row-odd]="row.$$index % 2 !== 0">
        </datatable-body-row>
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

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body');
  }

  ngOnInit(): void {
    this.rows = [...this.state.rows];

    this.sub = this.state.onPageChange.subscribe((action) => {
      this.updateRows();
      this.hideIndicator();

      if(this.state.options.scrollbarV && action.type === 'pager-event') {
        const offset = (this.state.options.rowHeight * action.limit) * action.offset;
        this.scroller.setOffset(offset);
      }
    });

    this.sub.add(this.state.onRowsUpdate.subscribe(rows => {
      this.updateRows();
      this.hideIndicator();
    }));
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
    this.rows.splice(0, endSpliceIdx);

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

  getRowsStyles(row) {
    const rowHeight = this.state.options.rowHeight;

    let styles = {
      height: rowHeight + 'px'
    };

    if(this.state.options.scrollbarV) {
      const idx = row ? row.$$index : 0;
      const pos = idx * rowHeight;
      translateXY(styles, 0, pos);
    }

    return styles;
  }

  hideIndicator(): void {
    setTimeout(() => this.state.options.loadingIndicator = false, 500);
  }

  rowClicked(event, index, row): void {
    this.onRowClick.emit({event, row});
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
