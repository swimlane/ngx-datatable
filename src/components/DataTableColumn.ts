import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ComponentResolver
} from '@angular/core';

@Component({
  selector: 'datatable-column',
  template: `
    <div>
      here {{column.name}}
      <ng-content></ng-content>
    </div>
  `
})
export class DataTableColumn {

  @Input() name: string;

  public row: any = {};
  public column: any = {};

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
