import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'datatable-footer',
  template: `
  	<div>
    </div>
  `,
  directives: []
})
export class DataTableFooter {

  @HostBinding('class.datatable-footer')
  private isFooter = true;

}
