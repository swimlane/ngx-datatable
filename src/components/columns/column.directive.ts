import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';

@Directive({ selector: 'swui-datatable-column' })
export class DataTableColumnDirective {

  @Input() name;
  @Input() prop;
  @Input() frozenLeft;
  @Input() frozenRight;
  @Input() flexGrow;
  @Input() resizeable;
  @Input() comparator;
  @Input() pipe;
  @Input() sortable;
  @Input() draggable;
  @Input() canAutoResize;
  @Input() minWidth;
  @Input() width;
  @Input() maxWidth;

  @ContentChild(DataTableColumnCellDirective, { read: TemplateRef }) 
  cellTemplate: DataTableColumnCellDirective;

  @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef }) 
  headerTemplate: DataTableColumnHeaderDirective;

}
