import { Component, Input, PipeTransform, HostBinding, ElementRef } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
import { deepValueGetter } from '../../utils/deepGetter';
import { StateService } from '../../services/State';

@Component({
  selector: 'datatable-body-cell',
  template: `
    <div class="datatable-body-cell-label">
      <span
        *ngIf="!column.template"
        [innerHTML]="value">
      </span>
      <template
        *ngIf="column.template"
        [value]="value"
        [row]="row"
        [column]="column"
        [templateWrapper]="column.template">
      </template>
    </div>
  `
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;

  constructor(private state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body-cell');
  }

  get value() {
    if (!this.row) return '';
    const prop: any = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;
    return userPipe ? userPipe.transform(prop) : prop;
  }

  @HostBinding('style.width.px') get width() {
    return this.column.width;
  }

  @HostBinding('style.height.px') get height() {
    return this.state.options.rowHeight;
  }

}
