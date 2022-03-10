import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: `ghost-loader`,
  templateUrl: `./ghost-loader.component.html`,
  styleUrls: [`./ghost-loader.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableGhostLoaderComponent {
  @Input() columns;
  @Input() pageSize;
  @Input() rowHeight;
  @Input() ghostBodyHeight;
}
