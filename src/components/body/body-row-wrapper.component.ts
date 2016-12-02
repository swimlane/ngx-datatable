import { 
  Component, Input, Output, EventEmitter, HostListener 
} from '@angular/core';

@Component({
  selector: 'data-table-row-wrapper',
  template: `
    <ng-content></ng-content>
    <div 
      *ngIf="expanded"
      [style.height.px]="detailRowHeight" 
      class="data-table-row-detail">
      <template
        *ngIf="rowDetailTemplate"
        [ngTemplateOutlet]="rowDetailTemplate"
        [ngOutletContext]="{ row: row }">
      </template>
    </div>
  `,
  host: {
    class: 'data-table-row-wrapper'
  }
})
export class DataTableRowWrapperComponent {

  @Input() rowDetailTemplate: any;
  @Input() detailRowHeight: any;
  @Input() expanded: boolean = false;
  @Input() row: any;
  @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);

  @HostListener('contextmenu', ['$event'])
  public onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row });
  }
}
