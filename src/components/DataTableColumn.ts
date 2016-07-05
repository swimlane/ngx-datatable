import {
  Component,
  Input,
  ElementRef,
  ViewContainerRef,
  Directive,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { TableColumn } from '../models/TableColumn';

@Directive({
  selector: 'datatable-column',
  inputs: TableColumn.getProps()
})
export class DataTableColumn {

  @ContentChild(TemplateRef) template;

}
