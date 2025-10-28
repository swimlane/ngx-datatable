import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DoCheck,
  HostListener,
  inject,
  input,
  KeyValueDiffers,
  output,
  signal
} from '@angular/core';

import { Row, RowDetailContext, RowOrGroup } from '../../types/public.types';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';

@Component({
  selector: 'datatable-row-wrapper',
  imports: [NgTemplateOutlet],
  template: `
    <ng-content />
    @let rowDetailTemplate = rowDetail()?.template();
    @if (rowDetailTemplate && expanded()) {
      <div class="datatable-row-detail" [style.height.px]="detailsRowHeight()">
        <ng-template [ngTemplateOutlet]="rowDetailTemplate" [ngTemplateOutletContext]="context()" />
      </div>
    }
  `,
  styleUrl: './body-row-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-row-wrapper'
  }
})
export class DataTableRowWrapperComponent<TRow extends Row = any> implements DoCheck {
  readonly innerWidth = input.required<number>();
  readonly rowDetail = input<DatatableRowDetailDirective>();
  readonly detailRowHeightFn = input.required<(row?: TRow, index?: number) => number>();
  readonly row = input.required<TRow>();
  readonly disabled = input<boolean>();
  readonly rowContextmenu = output<{
    event: MouseEvent;
    row: RowOrGroup<TRow>;
  }>();

  readonly rowIndex = input.required<number>();

  readonly expanded = input(false, { transform: booleanAttribute });
  readonly ariaGroupHeaderCheckboxMessage = input.required<string>();

  readonly detailsRowHeight = computed(() => this.detailRowHeightFn()(this.row(), this.rowIndex()));
  readonly context = computed<RowDetailContext<TRow>>(() => {
    this.rowDiffedCount(); // This allows us to get re-evaluated when the row was mutated internally.
    return {
      row: this.row(),
      expanded: this.expanded(),
      rowIndex: this.rowIndex(),
      disabled: this.disabled()
    };
  });

  // This counter will be incremented every time the row object is mutated.
  readonly rowDiffedCount = signal(0);

  private rowDiffer = inject(KeyValueDiffers).find({}).create<keyof RowOrGroup<TRow>, any>();

  ngDoCheck(): void {
    const row = this.row();
    if (this.rowDiffer.diff(row)) {
      this.rowDiffedCount.update(count => count + 1);
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row() });
  }
}
