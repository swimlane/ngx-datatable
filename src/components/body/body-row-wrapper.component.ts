import {
  Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy
} from '@angular/core';
import { mouseEvent } from '../../events';

@Component({
  selector: 'datatable-row-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      *ngIf="groupHeader && groupHeader.template"
      [ngStyle]="getGroupHeaderStyle()">
      <ng-template
        *ngIf="groupHeader && groupHeader.template"
        [ngTemplateOutlet]="groupHeader.template"
        [ngTemplateOutletContext]="{ 
          group: row, 
          expanded: expanded,
          rowIndex: rowIndex
        }">
      </ng-template>
    </div>
    <ng-content></ng-content>
    <div
      *ngIf="expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail">
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="{ 
          row: row, 
          expanded: expanded,
          rowIndex: rowIndex
        }">
      </ng-template>
    </div>
  `,
  host: {
    class: 'datatable-row-wrapper'
  }
})
export class DataTableRowWrapperComponent {

  @Input() innerWidth: number;
  @Input() rowDetail: any;
  @Input() groupHeader: any;
  @Input() offsetX: number;
  @Input() detailRowHeight: any;
  @Input() expanded: boolean = false;
  @Input() row: any;
  @Input() groupedRows: any;  
  @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);
  @Input() rowIndex: number;

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row });
  }

  getGroupHeaderStyle(group: any): any {
    const styles = {};

    styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
    styles['backface-visibility'] = 'hidden';
    styles['width'] = this.innerWidth;

    return styles; 
  }
}
