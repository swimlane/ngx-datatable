import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener,
  KeyValueDiffers,
  ContentChildren,
  OnInit,
  QueryList,
  DoCheck,
  AfterViewInit,
  IterableDiffer,
  HostBinding,
  Host
} from '@angular/core';

import { forceFillColumnWidths, adjustColumnWidths } from '../utils/math';
import { ColumnMode } from '../enums/ColumnMode';
import { TableOptions } from '../models/TableOptions';
import { TableColumn } from '../models/TableColumn';
import { DataTableColumn } from './DataTableColumn';
import { StateService } from '../services/State';

@Component({
  selector: 'datatable',
  providers: [StateService],
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
  `
})
export class DataTable implements OnInit, DoCheck, AfterViewInit {

  @Input() options: TableOptions;
  @Input() rows: any[];
  @Input() selected: any[];

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowsUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  @ContentChildren(DataTableColumn) columns: QueryList<DataTableColumn>;

  private element: HTMLElement;
  private rowDiffer: IterableDiffer;
  private colDiffer: IterableDiffer;

  constructor(
    @Host() public state: StateService,
    element: ElementRef,
    differs: KeyValueDiffers) {

    this.element = element.nativeElement;
    this.element.classList.add('datatable');

    this.rowDiffer = differs.find({}).create(null);
    this.colDiffer = differs.find({}).create(null);
  }

  ngOnInit(): void {
    const {options, rows, selected} = this;

    this.state
      .setOptions(options)
      .setRows(rows)
      .setSelected(selected);
  }

  ngAfterViewInit() {
    this.adjustColumns();

    if (this.columns.length) {
      setTimeout(() => {
        for (let col of this.columns.toArray()) {
          this.options.columns.push(new TableColumn(col));
        }
      });
    }
  }

  ngDoCheck() {
    if (this.rowDiffer.diff(this.rows)) {
      this.state.setRows(this.rows);
      this.onRowsUpdate.emit(this.rows);
    }

    this.checkColumnChanges();
  }

  checkColumnChanges() {
    const colDiff = this.colDiffer.diff(this.options.columns);

    if (colDiff) {
      let chngd: boolean = false;
      colDiff.forEachAddedItem(() => {
        chngd = true;
        return false;
      });

      if (!chngd) {
        colDiff.forEachRemovedItem(() => {
          chngd = true;
          return false;
        });
      }

      // if a column was added or removed
      // we need to re-adjust columns
      if (chngd) this.adjustColumns();
    }
  }

  adjustSizes() {
    let { height, width } = this.element.getBoundingClientRect();
    this.state.innerWidth = Math.floor(width);

    if (this.options.scrollbarV) {
      if (this.options.headerHeight) height = height - this.options.headerHeight;
      if (this.options.footerHeight) height = height - this.options.footerHeight;
      this.state.bodyHeight = height;
    }

    this.adjustColumns();
  }

  adjustColumns(forceIdx?: number) {
    if (!this.options.columns) return;

    let width: number = this.state.innerWidth;
    if (this.options.scrollbarV) {
      width = width - this.state.scrollbarWidth;
    }

    if (this.options.columnMode === ColumnMode.force) {
      forceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if (this.options.columnMode === ColumnMode.flex) {
      adjustColumnWidths(this.options.columns, width);
    }
  }

  onPageChanged(action) {
    this.state.setPage(action);

    this.onPageChange.emit({
      page: action.value,
      offset: this.state.options.offset,
      limit: this.state.pageSize,
      count: this.state.rowCount
    });
  }

  onRowSelect(event) {
    this.state.setSelected(event);
    this.onSelectionChange.emit(event);
  }

  @HostListener('window:resize')
  resize() {
    this.adjustSizes();
  }

  @HostBinding('class.fixed-header')
  get isFixedHeader() {
    const headerHeight: number|string = this.options.headerHeight;
    return (typeof headerHeight === 'string') ? (<string>headerHeight) !== 'auto' : true;
  }

  @HostBinding('class.fixed-row')
  get isFixedRow() {
    const rowHeight: number|string = this.options.rowHeight;
    return (typeof rowHeight === 'string') ? (<string>rowHeight) !== 'auto' : true;
  }

  @HostBinding('class.scroll-vertical')
  get isVertScroll() {
    return this.options.scrollbarV;
  }

  @HostBinding('class.scroll-horz')
  get isHorScroll() {
    return this.options.scrollbarH;
  }

  @HostBinding('class.selectable')
  get isSelectable() {
    return this.options.selectionType !== undefined;
  }

}
