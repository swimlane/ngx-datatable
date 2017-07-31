import { 
  Component, Input, Output, EventEmitter, HostListener 
} from '@angular/core';
import { MouseEvent } from '../../events';

@Component({
  selector: 'datatable-group-wrapper',
  template: `    
    <div style="border:2px solid black; width: 100%; height: 100%">      
      <ng-content></ng-content>
    </div>
  `,
  host: {
    class: 'datatable-group-wrapper'
  }

  /*

  
   *ngIf="expanded"
      [style.height.px]="detailRowHeight" 
      class="datatable-row-detail">
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngOutletContext]="{ row: row }">
      </ng-template>

      */
})
export class DataTableGroupWrapperComponent {
  
  @Input() groupByIndex: number=2;
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
