import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'datatable-progress',
  template: `
    <div
      class="progress-linear"
      role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
  directives: []
})
export class ProgressBar {}
