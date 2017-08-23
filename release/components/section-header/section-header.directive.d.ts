import { EventEmitter, TemplateRef } from '@angular/core';
export declare class DatatableSectionHeaderDirective {
    /**
     * Height of the header.
     * This is required especially when virtual scroll is enabled.
     *
     * @type {number|function(row?:any,index?:number): number}
     * @memberOf DatatableSectionHeaderDirective
     */
    height: (number | ((row?: any, index?: number) => number));
    template: TemplateRef<any>;
    /**
     * Section visbility was toggled.
     *
     * @type {EventEmitter<any>}
     * @memberOf DatatableSectionDirective
     */
    toggle: EventEmitter<any>;
    /**
     * Toggle the expansion of the section
     *
     * @param section
     * @memberOf DatatableSectionDirective
     */
    toggleExpandSection(section: any): void;
    /**
     * API method to expand all the sections.
     *
     * @memberOf DatatableSectionDirective
     */
    expandAllSections(): void;
    /**
     * API method to collapse all the sections.
     *
     * @memberOf DatatableSectionDirective
     */
    collapseAllSections(): void;
}
