import { Component, Input, Renderer, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'datatable-row-wrapper',
  template: `
    <ng-content></ng-content>
    <div 
      *ngIf="expanded"
      [style.height.px]="detailRowHeight" 
      class="datatable-row-detail">
      <template
        *ngIf="rowDetailTemplate"
        [ngTemplateOutlet]="rowDetailTemplate"
        [ngOutletContext]="{ row: row }">
      </template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableRowWrapperComponent {

  @Input() rowDetailTemplate: any;
  @Input() detailRowHeight: any;
  @Input() expanded: boolean = false;
  @Input() row: any;

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-row-wrapper', true);
  }

}
