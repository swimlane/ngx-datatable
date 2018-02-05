import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';

@Directive({ selector: 'ngx-datatable-group-header' })
export class DatatableGroupHeaderDirective {

  /**
   * Row height is required when virtual scroll is enabled.
   */
  @Input() rowHeight: (number | ((group?: any, index?: number) => number)) = 0;

  @Input()
  @ContentChild(DatatableGroupHeaderTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;

  /**
   * Track toggling of group visibility
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
   * Expand all groups
   */
  expandAllGroups(): void {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }

  /**
   * Collapse all groups
   */
  collapseAllGroups(): void {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }

}
