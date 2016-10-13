import {
  Component, Input, Renderer,
  ElementRef
} from '@angular/core';
import { StateService } from '../../services';

@Component({
  selector: 'datatable-row-wrapper',
  template: `
        <ng-content></ng-content>
        <div *ngIf="row.$$expanded === 1 && state.options.rowDetailTemplate"
              [style.height]="state.options.detailRowHeight +  'px'" 
              class="datatable-row-detail">
          <template
            [ngTemplateOutlet]="state.options.rowDetailTemplate"
            [ngOutletContext]="{ row: row}">
          </template>
        </div>
    `,
})
export class DataTableRowWrapper {

  /**
   * The row for which the detail needs to be shown.
   */
  @Input() row: any;

  constructor(public element: ElementRef, private state: StateService, renderer: Renderer) {
    renderer.setElementClass(this.element.nativeElement, 'datatable-row-wrapper', true);
  }
}
