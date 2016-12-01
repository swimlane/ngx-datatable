import {Directive, TemplateRef, QueryList, ContentChildren, Input} from '@angular/core';

@Directive({
  selector: 'datatable-column',
})
export class DataTableColumnDirective {

  @Input() name: string;
  @Input() prop: string;
  @Input() frozenLeft: any;
  @Input() frozenRight: any;
  @Input() flexGrow: number;
  @Input() resizeable: boolean;
  @Input() comparator: Function;
  @Input() pipe: any;
  @Input() sortable: boolean;
  @Input() draggable: boolean;
  @Input() canAutoResize: boolean;
  @Input() minWidth: number;
  @Input() width: number;
  @Input() maxWidth: number;

  @ContentChildren(TemplateRef)
  templates: QueryList<TemplateRef<any>>;

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
