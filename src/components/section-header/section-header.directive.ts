import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableSectionHeaderTemplateDirective } from './section-header-template.directive';

@Directive({ selector: 'ngx-datatable-section-header' })
export class DatatableSectionHeaderDirective {

  /**
   * Height of the header.
   * This is required especially when virtual scroll is enabled.
   *
   * @type {number|function(row?:any,index?:number): number}
   * @memberOf DatatableSectionHeaderDirective
   */
  @Input() height: (number | ((row?: any, index?: number) => number)) = 0;

  @Input()
  @ContentChild(DatatableSectionHeaderTemplateDirective, { read: TemplateRef })
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
