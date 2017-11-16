import { EventEmitter, TemplateRef } from '@angular/core';
export declare class DatatableGroupHeaderDirective {
    /**
     * The detail row height is required especially
     * when virtual scroll is enabled.
     */
    rowHeight: (number | ((group?: any, index?: number) => number));
    template: TemplateRef<any>;
    /**
     * Group visbility was toggled.
     */
    toggle: EventEmitter<any>;
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(group: any): void;
    /**
     * API method to expand all groups.
     */
    expandAllGroups(): void;
    /**
     * API method to collapse all groups.
     */
    collapseAllGroups(): void;
}
