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

@Component({
  selector: 'datatable-body-cell',
  template: `
  	<div class="datatable-body-cell-label">
      <span
        #cell
        *ngIf="!column.isExpressive"
        [innerHTML]="rowValue">
      </span>
      <span
        #cell
        *ngIf="column.isExpressive">
      </span>
    </div>
  `,
  host: {
    '[style.width]':'column.width + "px"',
    '[style.height]':'column.height + "px"'
  }
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;

  @ViewChild('cell', { read: ViewContainerRef })
  cell: ViewContainerRef;

  get rowValue() {
    if(!this.row) return '';
    return deepValueGetter(this.row, this.column.prop);
  }

  constructor(
    private elm: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentResolver: ComponentResolver) {

    elm.nativeElement.classList.add('datatable-body-cell');
  }

  ngOnInit() {
    if (this.componentRef) this.componentRef.destroy();

    this.componentResolver.resolveComponent(DataTableColumn)
      .then((factory: ComponentFactory) => {
        this.componentRef = this.cell.createComponent(
          factory, 0, this.viewContainerRef.injector);

        this.componentRef.instance.row = this.row;
        this.componentRef.instance.column = this.column;
      });
  }

}
