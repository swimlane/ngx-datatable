import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    HostBinding,
    OnDestroy,
    ViewChild,
    ElementRef,
    Input
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
        *ngIf="state.getOption(key,'loadingIndicator')">
      </datatable-progress>
      <div
        scroller
        (onScroll)="onBodyScroll($event)"
        *ngIf="state.getRows(key).length"
        [rowHeight]="state.getOption(key,'rowHeight')"
        [scrollbarV]="state.getOption(key,'scrollbarV')"
        [count]="state.rowCount(key)"
        [scrollWidth]="state.columnGroupWidths(key).total">
        <datatable-body-row
          [key]="key"
          [ngStyle]="getRowsStyles(row)"
          [style.height]="state.getOption(key,'rowHeight') + 'px'"
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
        [innerHTML]="state.getOption(key,'emptyMessage')">
      </div>
    </div>
  `
})
export class DataTableBody implements OnInit, OnDestroy {

  @Input() key: string;
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild(Scroller) scroller: Scroller;

  public rows: any;
  private prevIndex: number;
  private sub: Subscription;

  get selectEnabled() {
    return !!this.state.getOption(this.key, 'selectionType');
  }

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body');
  }

  @HostBinding('style.height')
  get bodyHeight() {
    if (this.state.getOption(this.key, 'scrollbarV')) {
      return this.state.getBodyHeight(this.key) + 'px';
    } else {
      return 'auto';
    }
  }

  @HostBinding('style.width')
  get bodyWidth() {
    if (this.state.getOption(this.key, 'scrollbarH')) {
      return this.state.getInnerWidth(this.key) + 'px';
    } else {
      return '100%';
    }
  }

  ngOnInit(): void {
    this.rows = [...this.state.getRows(this.key)];

    this.sub = this.state.onPageChange.subscribe((action) => {
      this.updateRows();
      this.hideIndicator();

      if(this.state.getOption(this.key, 'scrollbarV') && action.type === 'pager-event') {
        const offset = (this.state.getOption(this.key, 'rowHeight') * action.limit) * action.offset;
        this.scroller.setOffset(offset);
      }
    });

    this.sub.add(this.state.onRowsUpdate.subscribe(rows => {
      this.updateRows();
      this.hideIndicator();
    }));
  }

  onBodyScroll(props) {
    this.state.setOffsetY(this.key, props.scrollYPos);
    this.state.setOffsetX(this.key, props.scrollXPos);

    this.updatePage(props.direction);
    this.updateRows();
  }

  updatePage(direction) {
    const idxs = this.state.indexes(this.key);
    let page = idxs.first / this.state.pageSize(this.key);

    if(direction === 'up') {
      page = Math.floor(page);
    } else if(direction === 'down') {
      page = Math.ceil(page);
    }

    if(direction !== undefined && !isNaN(page)) {
      // pages are offset + 1 ;)
      this.state.setPage(this.key, {
        type: 'body-event',
        value: page + 1
      });
    }
  }

  updateRows(refresh?: boolean) {
    const idxs = this.state.indexes(this.key);
    let idx = 0;
    let rowIndex = idxs.first;

    let endSpliceIdx = refresh ? this.state.rowCount(this.key) : idxs.last - idxs.first;
    this.rows.splice(0, endSpliceIdx);

    while (rowIndex < idxs.last && rowIndex < this.state.rowCount(this.key)) {
      let row = this.state.getRows(this.key)[rowIndex];

      if(row) {
        row.$$index = rowIndex;
        this.rows[idx] = row;
      }

      idx++;
      rowIndex++;
    }
  }

  getRowsStyles(row) {
    const rowHeight = this.state.getOption(this.key, 'rowHeight');

    let styles = {
      height: rowHeight + 'px'
    };

    if(this.state.getOption(this.key, 'scrollbarV')) {
      const idx = row ? row.$$index : 0;
      const pos = idx * rowHeight;
      translateXY(styles, 0, pos);
    }

    return styles;
  }

  hideIndicator(): void {
    setTimeout(() => this.state.updateOption(this.key, 'loadingIndicator', false), 500);
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

    const multiShift = this.state.getOption(this.key, 'selectionType') === SelectionType.multiShift;
    const multiClick = this.state.getOption(this.key, 'selectionType') === SelectionType.multi;

    let selections = [];
    if (multiShift || multiClick) {
      if (multiShift && event.shiftKey) {
        const selected = [...this.state.getSelected(this.key)];
        selections = selectRowsBetween(selected, this.rows, index, this.prevIndex);
      } else if (multiShift && !event.shiftKey) {
        selections.push(row);
      } else {
        const selected = [...this.state.getSelected(this.key)];
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
