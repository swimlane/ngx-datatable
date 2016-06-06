import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ProgressBar } from './ProgressBar';
import { DataTableBodyRow } from './BodyRow';
import { DataTableScroll } from './Scroll';
import { StateService } from '../../services/State';
import { SelectionType } from '../../models/SelectionType';
import { Keys } from '../../utils/Keys';
import { selectRows, selectRowsBetween } from '../../utils/selection';

@Component({
  selector: 'datatable-body',
  template: `
    <div>
      <datatable-progress
        [hidden]="showProgress">
      </datatable-progress>
      <datatable-scroll
        [rowHeight]="state.options.rowHeight"
        [count]="state.rowCount"
        [scrollWidth]="state.columnGroupWidths.total">
        <datatable-body-row
          *ngFor="let row of rows; let i = index;"
          [attr.tabindex]="i"
          [class.active]="state.selected.includes(row)"
          (click)="rowClicked($event, i, row)"
          (keydown)="rowKeydown($event, i, row)"
          [row]="row">
        </datatable-body-row>
        <div
          class="empty"
          *ngIf="!rows.length"
          [innerHTML]="state.options.emptyMessage">
        </div>
      </datatable-scroll>
    </div>
  `,
  directives: [
    ProgressBar,
    DataTableBodyRow,
    DataTableScroll
  ],
  host: {
    '[style.width]':'state.innerWidth',
    '[style.height]':'bodyHeight'
  }
})
export class DataTableBody {

  @Output() onRowClick = new EventEmitter();
  @Output() onRowSelect = new EventEmitter();

  private showProgress: boolean = true;
  private state: StateService;
  private prevIndex: number;

  get selectEnabled() {
    return this.state.options.selectionType !== undefined;
  }

  constructor(private state: StateService, elm: ElementRef){
    elm.nativeElement.classList.add('datatable-body');
  }

  get bodyHeight() {
    if(this.state.options.scrollbarV)
      return this.state.bodyHeight;
    return 'auto';
  }

  ngOnInit() {
    this.rows = [...this.state.rows];

    this.state.onPageChange.subscribe(page => {
      const { first, last } = this.state.indexes;
      this.rows = this.state.rows.slice(first, last);
      setTimeout(() => this.showProgress = false, 100);
    });

    this.state.onRowsUpdate.subscribe(rows => {
      const { first, last } = this.state.indexes;
      this.rows = rows.slice(first, last);
      this.showProgress = false;
      setTimeout(() => this.showProgress = false, 100);
    });
  }

  rowClicked(event, index, row) {
    this.onRowClick.emit({ event, row });
    this.selectRow(event, index, row);
  }

  rowKeydown(event, index, row) {
    if(event.keyCode === Keys.return && this.selectEnabled) {
      this.selectRow(event, index, row);
    } else if(event.keyCode === Keys.up || event.keyCode === Keys.down) {
      let dom = event.keyCode === Keys.up ?
        event.target.previousElementSibling :
        event.target.nextElementSibling;
      if(dom) dom.focus();
    }
  }

  selectRow(event, index, row) {
    if(!this.selectEnabled) return;

    const multiShift = this.state.options.selectionType === SelectionType.multiShift;
    const multiClick = this.state.options.selectionType === SelectionType.multi;

    let selections = [];
    if(multiShift || multiClick) {
      if(multiShift && event.shiftKey) {
        let selected = [...this.state.selected];
        selections = selectRowsBetween(selected, this.rows, index, this.prevIndex);
      } else if(multiShift && !event.shiftKey) {
        selections.push(row);
      } else {
        let selected = [...this.state.selected];
        selections = selectRows(selected, row);
      }
    } else {
      selections.push(row);
    }

    this.prevIndex = index;
    this.onRowSelect.emit(selections);
  }

}
