import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'datatable-progress',
  template: `
    <div class="progress-linear" role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ProgressBarComponent {}
