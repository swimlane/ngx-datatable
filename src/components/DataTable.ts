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

import { DataTableHeader } from './header/Header';
import { DataTableBody } from './body/Body';
import { DataTableFooter } from './footer/Footer';

@Component({
  selector: 'datatable',
  template: `
  	<div>
      <datatable-header
        [state]="state">
      </datatable-header>
      <datatable-body
        [state]="state">
      </datatable-body>
      <datatable-footer
        [state]="state">
      </datatable-footer>
    </div>
  `,
  directives: [
    DataTableHeader,
    DataTableBody,
    DataTableFooter
  ],
  host: {
    '[class.fixed]':'options.scrollbarV',
    '[class.selectable]':'options.selectable',
    '[class.checkboxable]':'options.checkboxable'
  }
})
export class DataTable {

	@Input() options: {};
  @Input() rows: [];
	@Input() selected: [];

  @Output() onSelectionChange = new EventEmitter();

  @HostBinding('class.datatable')
  private isDatatable = true;

  state: State;
  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    let { options, rows, selected } = this;
    this.state = new State(options, rows, selected);
  }

  ngAfterContentInit() {
    setTimeout(() => this.resize(), 10);
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
      // this.calculatePageSize();
    }

    // this.adjustColumns();
  }

}
