import {
  Component,
  Input,
  ElementRef,
  ViewContainerRef,
  Directive
} from '@angular/core';

@Directive({
  selector: 'datatable-column'
})
export class DataTableColumn {

  @Input() name: string;

  public row: any = {};
  public column: any = {};

  constructor(private elementRef: ElementRef) {
  }

  get template() {
    return this.elementRef.nativeElement.innerHTML;
  }

}
