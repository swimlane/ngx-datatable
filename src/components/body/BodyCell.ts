import { Component, Input, PipeTransform, HostBinding, Renderer, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
import { deepValueGetter } from '../../utils/deepGetter';

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyCell {
  @Input() column: TableColumn;
  @Input() row: any;

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-body-cell', true);
  }

  get value() {
    if (!this.row) return '';
    const prop: any = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;
    return userPipe ? userPipe.transform(prop) : prop;
  }

  @HostBinding('style.width') get width() {
    return this.column.width + 'px';
  }

}
