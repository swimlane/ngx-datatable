import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, numberAttribute, input } from '@angular/core';

import { TableColumnInternal } from '../../../types/internal.types';

@Component({
  selector: 'ghost-loader',
  imports: [NgTemplateOutlet],
  templateUrl: './ghost-loader.component.html',
  styleUrl: './ghost-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableGhostLoaderComponent {
  readonly columns = input.required<TableColumnInternal[]>();
  readonly pageSize = input.required<number, unknown>({ transform: numberAttribute });
  readonly rowHeight = input.required<number | 'auto' | ((row?: any) => number)>();
  readonly ghostBodyHeight = input<number, unknown>(undefined, { transform: numberAttribute });

  protected readonly rowHeightComputed = () => {
    const rowHeight = this.rowHeight();
    if (typeof rowHeight === 'function') {
      // If rowHeight is a function, we cannot determine a fixed height here.
      return 'auto';
    }
    return rowHeight === 'auto' ? 'auto' : rowHeight + 'px';
  };
}
