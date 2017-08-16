import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'datatable-footer',
  template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{'selected-count': selectedMessage}"
      [style.height.px]="footerHeight">
      <ng-template
        *ngIf="footerTemplate"
        [ngTemplateOutlet]="footerTemplate.template"
        [ngOutletContext]="{ 
          rowCount: rowCount, 
          pageSize: pageSize, 
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }">
      </ng-template>
      <div class="page-count" *ngIf="!footerTemplate">
        <span *ngIf="selectedMessage">
          {{selectedCount.toLocaleString()}} {{selectedMessage}} / 
        </span>
        {{rowCount.toLocaleString()}} {{totalMessage}}
      </div>
      <datatable-pager *ngIf="!footerTemplate"
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)">
      </datatable-pager>
    </div>
  `,
  host: {
    class: 'datatable-footer'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFooterComponent {

  @Input() footerHeight: number;
  @Input() rowCount: number;
  @Input() pageSize: number;
  @Input() offset: number;
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;
  @Input() totalMessage: string;
  @Input() footerTemplate: TemplateRef<any>;

  @Input() selectedCount: number = 0;
  @Input() selectedMessage: string | boolean;

  @Output() page: EventEmitter<any> = new EventEmitter();

  get isVisible(): boolean {
    return (this.rowCount / this.pageSize) > 1;
  }

  get curPage(): number {
    return this.offset + 1;
  }

}
