import {
  Input,
  Output,
  EventEmitter,
  Directive,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';

@Directive({ selector: 'ngx-datatable-footer' })
export class DatatableFooterDirective {
  @Input() footerHeight: number;
  @Input() totalMessage: string;
  @Input() selectedMessage: string | boolean;
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;

  @Input()
  @ContentChild(DataTableFooterTemplateDirective, {
    read: TemplateRef,
    static: false
  })
  template: TemplateRef<any>;
}
