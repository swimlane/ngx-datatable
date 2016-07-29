import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'datatable-progress',
  template: `
    <div *ngIf= "visible"
      class="progress-linear"
      role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBar {

  @Input() visible: boolean = false;

}
