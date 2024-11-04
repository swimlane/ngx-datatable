import { ContentChild, Directive, Input, numberAttribute, TemplateRef } from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';
import { FooterContext } from '../../types/public.types';

@Directive({
  selector: 'ngx-datatable-footer',
  standalone: true
})
export class DatatableFooterDirective {
  @Input({ transform: numberAttribute }) footerHeight: number;
  @Input() totalMessage: string;
  @Input() selectedMessage: string | boolean;
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;

  @Input('template')
  _templateInput: TemplateRef<FooterContext>;

  @ContentChild(DataTableFooterTemplateDirective, { read: TemplateRef })
  _templateQuery: TemplateRef<FooterContext>;

  get template(): TemplateRef<FooterContext> {
    return this._templateInput || this._templateQuery;
  }
}
