import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener
} from '@angular/core';

import { StateService } from '../services/State';
import { VisibilityDirective } from '../utils/visibility';
import { forceFillColumnWidths, adjustColumnWidths } from '../utils/math';

import { DataTableHeader } from './header/Header';
import { DataTableBody } from './body/Body';
import { DataTableFooter } from './footer/Footer';

@Component({
  selector: 'datatable',
  template: `
  	<div
      visibility-observer
      (onVisibilityChange)="resize()">
      <datatable-header
        [state]="state">
      </datatable-header>

      <datatable-body
        [state]="state">
      </datatable-body>

      <datatable-footer
        *ngIf="state.options.footerHeight"
        [style.height]="state.options.footerHeight"
        [offset]="state.options.offset"
        [size]="state.pageSize"
        [count]="state.pageCount"
        (onPaged)="state.setPage($event)">
      </datatable-footer>
    </div>
  `,
  directives: [
    DataTableHeader,
    DataTableBody,
    DataTableFooter,
    VisibilityDirective
  ],
  host: {
    '[class.datatable]': 'true',
    '[class.vertical-scroll]': 'options.scrollbarV',
    '[class.selectable]': 'options.selectable',
    '[class.checkboxable]': 'options.checkboxable'
  },
  providers: [ StateService ]
})
export class DataTable {

	@Input() options: Object;
  @Input() rows: Array<Object>;
	@Input() selected: Array<Object>;

  @Output() onChange = new EventEmitter();

  public state: StateService;
  private element: ElementRef;

  constructor(element: ElementRef, public state: StateService) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    let { options, rows, selected } = this;
    this.state
      .setOptions(options)
      .setRows(rows)
      .setSelected(selected);
  }

  @HostListener('window:resize')
  resize() {
    let { height, width } = this.element.getBoundingClientRect();
    this.state.innerWidth = Math.floor(width);

    if (this.options.scrollbarV) {
      if (this.options.headerHeight) {
        height = height - this.options.headerHeight;
      }

      if (this.options.footerHeight) {
        height = height - this.options.footerHeight;
      }

      this.state.bodyHeight = height;
    }

    this.adjustColumns();
  }

  /**
   * Adjusts the column widths to handle greed/etc.
   * @param  {int} forceIdx
   */
  adjustColumns(forceIdx) {
    let width = this.state.innerWidth;
    if(this.options.scrollbarV) {
      width =- this.state.scrollbarWidth;
    }

    if(this.options.columnMode === 'force'){
      forceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if(this.options.columnMode === 'flex') {
      adjustColumnWidths(this.options.columns, width);
    }
  }

}
