import { Component, Output, EventEmitter, OnInit, HostBinding, OnDestroy, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
import { SelectionType } from '../../enums/SelectionType';
import { Keys } from '../../utils/keys';
import { selectRows, selectRowsBetween } from '../../utils/selection';
import { ProgressBar } from './ProgressBar';
import { DataTableBodyRow } from './BodyRow';
import { Scroller } from '../../directives/Scroller';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'datatable-body',
  template: `
    <div>
      <datatable-progress *ngIf="!state.options.loadingIndicator">
      </datatable-progress>
      <div
        scroller
        *ngIf="state.rows.length"
        [rowHeight]="state.options.rowHeight"
        [count]="state.rowCount"
        [scrollWidth]="state.columnGroupWidths.total">
        <datatable-body-row
          *ngFor="let row of rows; let i = index;"
          [attr.tabindex]="i"
          (click)="rowClicked($event, i, row)"
          (keydown)="rowKeydown($event, i, row)"
          [row]="row">
        </datatable-body-row>
      </div>
      <div
        class="empty-row"
        *ngIf="!rows.length"
        [innerHTML]="state.options.emptyMessage">
      </div>
    </div>
  `,
  directives: [
    ProgressBar,
    DataTableBodyRow,
    Scroller
  ]
})
export class DataTableBody implements OnInit, OnDestroy {

  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

  rows: any;

  private prevIndex: number;
  private sub: Subscription;

  get selectEnabled() {
    return !!this.state.options.selectionType;
  }

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body');
  }

  @HostBinding('style.height') get bodyHeight() {
    if (this.state.options.scrollbarV) {
      return this.state.bodyHeight + 'px';
    } else {
      return 'auto';
    }
  }

  @HostBinding('style.width') get bodyWidth() {
    if (this.state.options.scrollbarH) {
      return this.state.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  ngOnInit(): void {
    this.rows = [...this.state.rows];

    this.sub = this.state.onPageChange.subscribe(() => {
      const {first, last} = this.state.indexes;
      this.rows = this.state.rows.slice(first, last);
      this.hideIndicator();
    });

    this.sub.add(this.state.onRowsUpdate.subscribe(rows => {
      const {first, last} = this.state.indexes;
      this.rows = rows.slice(first, last);
      this.hideIndicator();
    }));
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
