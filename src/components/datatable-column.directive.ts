import { Directive, TemplateRef, ContentChild, QueryList } from '@angular/core';
import { TableColumn } from 'models';

@Directive({
  selector: 'datatable-column',
  inputs: TableColumn.getProps()
})
export class DataTableColumn {

  @ContentChild(TemplateRef) template: QueryList<TemplateRef<any>>;

}
