import { Directive, TemplateRef, QueryList, ContentChildren } from '@angular/core';
import { TableColumn } from '../models';

@Directive({
  selector: 'datatable-column',
  inputs: TableColumn.getProps()
})
export class DataTableColumn {

  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;

  get hasHeaderTemplate() {
    // this is a tad nasty but can't think of a better way
    // to differate if the prop is header vs cell
    return this.templates.length === 2;
  }

  get headerTemplate() {
    if(!this.hasHeaderTemplate) return undefined;
    return this.templates.first;
  }

  get cellTemplate() {
    if(this.hasHeaderTemplate) return this.templates.last;
    return this.templates.first;
  }

}
