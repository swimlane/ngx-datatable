import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'datatable-scroll',
  template: `
  	<div>
      <ng-content></ng-content>
    </div>
  `
})
export class DataTableScroll {

  @Input() state;

  @HostBinding('class.datatable-scroll')
  private isScroller = true;

}
