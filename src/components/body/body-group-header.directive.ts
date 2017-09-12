import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';

@Directive({ selector: 'ngx-datatable-group-header' })
export class DatatableGroupHeaderDirective {

  /**
   * The detail row height is required especially 
   * when virtual scroll is enabled.
   */
  @Input() rowHeight: (number | ((group?: any, index?: number) => number)) = 0;

  @Input()
  @ContentChild(DatatableGroupHeaderTemplateDirective, { read: TemplateRef }) 
  template: TemplateRef<any>;

  /**
   * Group visbility was toggled.
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  /**
   * Toggle the expansion of a group
   */
  toggleExpandGroup(group: any): void {
    this.toggle.emit({
      type: 'group',
      value: group
    });
  }

  /**
   * API method to expand all groups.
   */
  expandAllGroups(): void {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }

  /**
   * API method to collapse all groups.
   */
  collapseAllGroups(): void {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }

}
