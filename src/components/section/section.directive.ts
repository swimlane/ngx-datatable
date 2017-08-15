import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableSectionTemplateDirective } from './section-template.directive';

@Directive({ selector: 'ngx-datatable-section' })
export class DatatableSectionDirective {

  /**
   * The section row height is the height of the collapsed header.
   * This is required especially when virtual scroll is enabled.
   *
   * @type {number|function(row?:any,index?:number): number}
   * @memberOf DatatableSectionDirective
   */
  @Input() rowHeight: (number | ((row?: any, index?: number) => number)) = 0;

  @Input()
  @ContentChild(DatatableSectionTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;

  /**
   * Section visbility was toggled.
   *
   * @type {EventEmitter<any>}
   * @memberOf DatatableSectionDirective
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  /**
   * Toggle the expansion of the section
   *
   * @param section
   * @memberOf DatatableSectionDirective
   */
  toggleExpandSection(section: any): void {
    this.toggle.emit({
      type: 'section',
      value: section
    });
  }

  /**
   * API method to expand all the sections.
   *
   * @memberOf DatatableSectionDirective
   */
  expandAllSections(): void {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }

  /**
   * API method to collapse all the sections.
   *
   * @memberOf DatatableSectionDirective
   */
  collapseAllSections(): void {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }

}
