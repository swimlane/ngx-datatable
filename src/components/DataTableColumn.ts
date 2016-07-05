import {
  Component,
  Input,
  ElementRef,
  ViewContainerRef,
  Directive,
  TemplateRef,
  ContentChild
} from '@angular/core';

@Directive({ selector: 'datatable-column' })
export class DataTableColumn {

  @ContentChild(TemplateRef) template;

  @Input() name: string;

}
