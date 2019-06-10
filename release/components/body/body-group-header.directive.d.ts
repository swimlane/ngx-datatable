import { EventEmitter, TemplateRef } from '@angular/core';
export declare class DatatableGroupHeaderDirective {
    /**
     * Row height is required when virtual scroll is enabled.
     */
    rowHeight: number | ((group?: any, index?: number) => number);
    template: TemplateRef<any>;
    /**
     * Track toggling of group visibility
     */
    toggle: EventEmitter<any>;
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(group: any): void;
    /**
     * Expand all groups
     */
    expandAllGroups(): void;
    /**
     * Collapse all groups
     */
    collapseAllGroups(): void;
}
