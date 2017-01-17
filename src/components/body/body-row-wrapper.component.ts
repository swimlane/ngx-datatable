import { 
  Component, Input, Output, EventEmitter, HostListener 
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
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngOutletContext]="{ row: row }">
      </template>
    </div>
  `,
  host: {
    class: 'datatable-row-wrapper'
  }
})
export class DataTableRowWrapperComponent {

  @Input() rowDetail: any;
  @Input() detailRowHeight: any;
  @Input() expanded: boolean = false;
  @Input() row: any;
  
  @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row });
  }
}
