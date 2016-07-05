import {
  Component,
  Input,
  ElementRef,
  ViewContainerRef,
  ViewChild,
  ComponentResolver,
  ComponentFactory,
  ComponentRef,
  DynamicComponentLoader,
  Injector
} from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
import { DataTableColumn } from '../DataTableColumn';
import { deepValueGetter } from '../../utils/deepGetter';
import { DynamicHTMLOutlet } from '../../directives/DynamicHTMLOutlet';


@Component({
  selector: 'datatable-body-cell',
  template: `
  	<div class="datatable-body-cell-label">
      <span
        *ngIf="!column.isExpressive"
        [innerHTML]="cellValue">
      </span>
      <dynamic-html-outlet
        *ngIf="column.isExpressive"
        [column]="column"
        [row]="row"
        [cellValue]="cellValue"
        [src]="column.dom.template">
      </dynamic-html-outlet>
    </div>
  `,
  host: {
    '[style.width]':'column.width + "px"',
    '[style.height]':'column.height + "px"'
  },
  directives: [ DynamicHTMLOutlet ]
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;

  get cellValue() {
    if(!this.row) return '';
    return deepValueGetter(this.row, this.column.prop);
  }

  constructor(
    private elm: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentResolver: ComponentResolver) {

    elm.nativeElement.classList.add('datatable-body-cell');
  }

}
