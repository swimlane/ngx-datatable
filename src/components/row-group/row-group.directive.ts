import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowGroupTemplateDirective } from './row-group-template.directive';

@Directive({ selector: 'ngx-datatable-row-group' })
export class DatatableRowGroupDirective {

  /**
   * The group row height is the height of the collapsed header.
   * This is required especially when virtual scroll is enabled.
   *
   * @type {number|function(row?:any,index?:number): number}
   * @memberOf DatatableRowGroupDirective
   */
  @Input() rowHeight: (number | ((row?: any, index?: number) => number)) = 0;

  @Input()
  @ContentChild(DatatableRowGroupTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;

  /**
   * Row group visbility was toggled.
   *
   * @type {EventEmitter<any>}
   * @memberOf DatatableRowGroupDirective
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  /**
   * Toggle the expansion of the row group
   *
   * @param rowIndex
   */
  toggleExpandGroup(group: any): void {
    this.toggle.emit({
      type: 'group',
      value: group
    });
  }

  /**
   * API method to expand all the groups.
   *
   * @memberOf DatatableRowGroupDirective
   */
  expandAllGroups(): void {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }

  /**
   * API method to collapse all the groups.
   *
   * @memberOf DatatableRowGroupDirective
   */
  collapseAllGroups(): void {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }

}
