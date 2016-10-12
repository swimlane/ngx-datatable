import {Directive, TemplateRef, QueryList, ContentChildren, Input} from '@angular/core';

@Directive({
  selector: 'datatable-column',
})
export class DataTableColumn {
  @Input() name;
  @Input() prop;
  @Input() $$id;
  @Input() isExpressive;
  @Input() frozenLeft;
  @Input() frozenRight;
  @Input() flexGrow;
  @Input() maxWidth;
  @Input() resizeable;
  @Input() comparator;
  @Input() pipe;
  @Input() sortable;
  @Input() draggable;
  @Input() canAutoResize;
  @Input() _width;
  @Input() _minWidth;
  @Input() minWidth;
  @Input() width;

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
