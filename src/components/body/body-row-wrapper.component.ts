import { 
  Component, Input, Renderer, ElementRef,
  Output, EventEmitter, HostListener 
} from '@angular/core';

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
  `
})
export class DataTableRowWrapperComponent {

  @Input() rowDetailTemplate: any;
  @Input() detailRowHeight: any;
  @Input() expanded: boolean = false;
  @Input() row: any;
  @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-row-wrapper', true);
  }

  @HostListener('contextmenu', ['$event'])
  public onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row });
  }
}
