import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';
import { GroupContext } from '../../types/public.types';

@Directive({ selector: 'ngx-datatable-group-header' })
export class DatatableGroupHeaderDirective<TRow = any> {
  /**
   * Row height is required when virtual scroll is enabled.
   */
  @Input() rowHeight: number | ((group?: any, index?: number) => number) = 0;

  /**
   * Show checkbox at group header to select all rows of the group.
   */
  @Input() checkboxable = false;

  @Input('template')
  _templateInput: TemplateRef<GroupContext<TRow>>;

  @ContentChild(DatatableGroupHeaderTemplateDirective, { read: TemplateRef, static: true })
  _templateQuery: TemplateRef<GroupContext<TRow>>;

  get template(): TemplateRef<GroupContext<TRow>> {
    return this._templateInput || this._templateQuery;
  }

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
