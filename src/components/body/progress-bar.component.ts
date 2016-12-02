import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'data-table-progress',
  template: `
    <div class="progress-linear" role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
}
