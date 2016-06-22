import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener,
  KeyValueDiffers
} from '@angular/core';

import { StateService } from '../services/State';
import { Visibility } from '../directives/Visibility';
import { forceFillColumnWidths, adjustColumnWidths } from '../utils/math';
import { ColumnMode } from '../models/ColumnMode';
import { TableOptions } from '../models/TableOptions';

import { DataTableHeader } from './header/Header';
import { DataTableBody } from './body/Body';
import { DataTableFooter } from './footer/Footer';

@Component({
  selector: 'datatable',
  template: `
  	<div
      visibility-observer
      (onVisibilityChange)="adjustSizes()">
      <datatable-header
        (onColumnChange)="onColumnChange.emit($event)">
      </datatable-header>
      <datatable-body
        (onRowClick)="onRowClick.emit($event)"
        (onRowSelect)="onRowSelect($event)">
      </datatable-body>
      <datatable-footer
        (onPageChange)="onPageChanged($event)">
      </datatable-footer>
    </div>
  `,
  directives: [
    DataTableHeader,
    DataTableBody,
    DataTableFooter,
    Visibility
  ],
  host: {
    '[class.fixed-header]': 'options.headerHeight !== "auto"',
    '[class.fixed-row]': 'options.rowHeight !== "auto"',
    '[class.scroll-vertical]': 'options.scrollbarV',
    '[class.scroll-horz]': 'options.scrollbarH',
    '[class.selectable]': 'options.selectable',
    '[class.checkboxable]': 'options.checkboxable'
  },
  providers: [ StateService ]
})
export class DataTable {

	@Input() options: TableOptions;
  @Input() rows: Array<any>;
	@Input() selected: Array<any>;

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowsUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  private element: HTMLElement;
  private rowDiffer: any;
  private colDiffer: any;

  constructor(element: ElementRef, private state: StateService, differs: KeyValueDiffers) {
    this.element = element.nativeElement;
    this.element.classList.add('datatable');
    this.rowDiffer = differs.find({}).create(null);
    this.colDiffer = differs.find({}).create(null);
  }

  ngOnInit() {
    let { options, rows, selected } = this;

    this.state
      .setOptions(options)
      .setRows(rows)
      .setSelected(selected);
  }

  ngAfterViewInit() {
    this.adjustColumns();
  }

  ngDoCheck() {
    if(this.rowDiffer.diff(this.rows)) {
      this.state.setRows(this.rows);
      this.onRowsUpdate.emit(this.rows);
    }

    this.checkColumnToggles();
  }

  checkColumnToggles() {
    let colDiff = this.colDiffer.diff(this.options.columns);
    if(colDiff) {
      let chngd = false;

      colDiff.forEachAddedItem(c => {
        chngd = true;
        return false;
      });

      if(!chngd) {
        colDiff.forEachRemovedItem(c => {
          chngd = true;
          return false;
        });
      }

      if(chngd) {
        // if a column was added or removed
        // we need to re-adjust columns
        this.adjustColumns();
      }
    }
  }

  adjustSizes() {
    let { height, width } = this.element.getBoundingClientRect();
    this.state.innerWidth = Math.floor(width);

    if (this.options.scrollbarV) {
      if (this.options.headerHeight) height =- this.options.headerHeight;
      if (this.options.footerHeight) height =- this.options.footerHeight;
      this.state.bodyHeight = height;
    }

    this.adjustColumns();
  }

  @HostListener('window:resize')
  resize() { this.adjustSizes(); }

  adjustColumns(forceIdx: any) {
    if(!this.options.columns) return;

    let width = this.state.innerWidth;
    if(this.options.scrollbarV) {
      width =- this.state.scrollbarWidth;
    }

    if(this.options.columnMode === ColumnMode.force){
      forceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if(this.options.columnMode === ColumnMode.flex) {
      adjustColumnWidths(this.options.columns, width);
    }
  }

  onPageChanged(event) {
    this.state.setPage(event);
    this.onPageChange.emit(event);
  }

  onRowSelect(event) {
    this.state.setSelected(event);
    this.onSelectionChange.emit(event);
  }

}
