import { Directive, TemplateRef, input, output, contentChild, computed } from '@angular/core';

import { Group, GroupContext, GroupToggleEvents, Row } from '../../types/public.types';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';

@Directive({
  selector: 'ngx-datatable-group-header'
})
export class DatatableGroupHeaderDirective<TRow extends Row = any> {
  /**
   * Row height is required when virtual scroll is enabled.
   */
  readonly rowHeight = input<number | ((group?: Group<TRow>, index?: number) => number)>(0);

  /**
   * Show checkbox at group header to select all rows of the group.
   */
  readonly checkboxable = input(false);

  readonly _templateInput = input<TemplateRef<GroupContext<TRow>>>(undefined, {
    alias: 'template'
  });

  readonly _templateQuery = contentChild(DatatableGroupHeaderTemplateDirective, {
    read: TemplateRef
  });

  readonly template = computed(() => this._templateInput() ?? this._templateQuery() ?? null);

  /**
   * Track toggling of group visibility
   */
  readonly toggle = output<GroupToggleEvents<TRow>>();

  /**
   * Toggle the expansion of a group
   */
  toggleExpandGroup(group: Group<TRow>): void {
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
