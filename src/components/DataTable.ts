import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener,
  HostBinding
} from '@angular/core';

import { State } from '../State';
import { scrollbarWidth } from '../utils/scrollbarWidth';
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
        [paging]="state.options.paging">
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
    '[class.fixed]':'options.scrollbarV',
    '[class.selectable]':'options.selectable',
    '[class.checkboxable]':'options.checkboxable'
  }
})
export class DataTable {

	@Input() options: Object;
  @Input() rows: Array<Object>;
	@Input() selected: Array<Object>;

  @Output() onSelectionChange = new EventEmitter();

  @HostBinding('class.datatable')
  private isDatatable = true;

  public state: State;
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    let { options, rows, selected } = this;
    this.state = new State(options, rows, selected);
  }

  ngAfterContentInit() {
    this.resize();
    this.state.scrollbarWidth = scrollbarWidth();
  }

  @HostListener('window:resize')
  resize() {
    let { height, width } = this.element.getBoundingClientRect();
    this.state.internal.innerWidth = Math.floor(width);

    if (this.options.scrollbarV) {
      if (this.options.headerHeight) {
        height = height - this.options.headerHeight;
      }

      if (this.options.footerHeight) {
        height = height - this.options.footerHeight;
      }

      this.state.internal.bodyHeight = height;
      this.state.options.paging.size = this.state.calcPageSize();
    }

    this.adjustColumns();
  }

  /**
   * Adjusts the column widths to handle greed/etc.
   * @param  {int} forceIdx
   */
  adjustColumns(forceIdx) {
    const width = this.state.internal.innerWidth - this.state.internal.scrollBarWidth;
    if(this.options.columnMode === 'force'){
      forceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if(this.options.columnMode === 'flex') {
      adjustColumnWidths(this.options.columns, width);
    }
  }

}
