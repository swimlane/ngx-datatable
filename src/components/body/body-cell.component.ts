import { Component, Input, PipeTransform, HostBinding, Renderer, ElementRef } from '@angular/core';

import { TableColumn } from 'models';
import { deepValueGetter } from 'utils';
import { StateService } from 'services';

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
        [ngTemplateOutlet]="column.template"
        [ngOutletContext]="{ value: value, row: row, column: column }">
      </template>
    </div>
  `
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;

  constructor(element: ElementRef, renderer: Renderer, private state: StateService) {
    renderer.setElementClass(element.nativeElement, 'datatable-body-cell', true);
  }

  get value() {
    if (!this.row) return '';
    const prop: any = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;
    return userPipe ? userPipe.transform(prop) : prop;
  }

  @HostBinding('style.width.px') get width(): any {
    return this.column.width;
  }

  @HostBinding('style.height') get height(): any {
    const height = this.state.options.rowHeight;
    if(isNaN(height)) return height;
    return height + 'px';
  }

}
