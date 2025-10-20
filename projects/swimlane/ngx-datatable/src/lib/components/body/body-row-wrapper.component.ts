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
  KeyValueDiffer,
  KeyValueDiffers,
  linkedSignal,
  output,
  signal
} from '@angular/core';

import { Group, GroupContext, Row, RowDetailContext, RowOrGroup } from '../../types/public.types';
import { DATATABLE_COMPONENT_TOKEN } from '../../utils/table-token';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';

@Component({
  selector: 'datatable-row-wrapper',
  imports: [NgTemplateOutlet],
  template: `
    @let row = this.row();
    @let groupHeader = this.groupHeader();
    @if (isGroup(row) && groupHeader && groupHeader.template) {
      <div
        class="datatable-group-header"
        [style.height.px]="groupHeaderRowHeight()"
        [style.width.px]="innerWidth()"
      >
        <div class="datatable-group-cell">
          @if (groupHeader.checkboxable) {
            <div>
              <label class="datatable-checkbox">
                <input
                  #select
                  type="checkbox"
                  [attr.aria-label]="ariaGroupHeaderCheckboxMessage()"
                  [checked]="checked()"
                  [indeterminate]="indeterminate()"
                  (change)="onCheckboxChange(select.checked, row)"
                />
              </label>
            </div>
          }
          <ng-template
            [ngTemplateOutlet]="groupHeader.template"
            [ngTemplateOutletContext]="context()"
          />
        </div>
      </div>
    }
    @if ((groupHeader?.template && expanded()) || !groupHeader || !groupHeader?.template) {
      <ng-content />
    }
    @let rowDetailTemplate = rowDetail()?.template();
    @if (rowDetailTemplate && expanded()) {
      <div class="datatable-row-detail" [style.height.px]="detailRowHeight()">
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
  readonly groupHeader = input<DatatableGroupHeaderDirective>();
  readonly offsetX = input.required<number>();
  readonly detailRowHeight = input.required<number>();
  readonly groupHeaderRowHeight = input.required<number>();
  readonly row = input.required<RowOrGroup<TRow>>();
  readonly groupedRows = input<Group<TRow>[]>();
  readonly selected = input.required<TRow[]>();
  readonly disabled = input<boolean>();
  readonly rowContextmenu = output<{
    event: MouseEvent;
    row: RowOrGroup<TRow>;
  }>();

  readonly rowIndex = input.required<number>();

  readonly selectedGroupRows = signal<TRow[]>([]);

  readonly expanded = input(false, { transform: booleanAttribute });
  readonly ariaGroupHeaderCheckboxMessage = input.required<string>();

  readonly context = linkedSignal<RowDetailContext<TRow> | GroupContext<TRow>>(() => {
    const row = this.row();
    if (this.isGroup(row)) {
      return {
        group: row,
        expanded: this.expanded(),
        rowIndex: this.rowIndex()
      };
    } else {
      return {
        row,
        expanded: this.expanded(),
        rowIndex: this.rowIndex(),
        disabled: this.disabled()
      };
    }
  });
  readonly selectedRowsOfGroup = computed(() =>
    (this.row() as Group<TRow>).value.filter(row => this.selected().includes(row))
  );
  readonly checked = computed(
    () => this.selectedRowsOfGroup().length === (this.row() as Group<TRow>).value.length
  );
  readonly indeterminate = computed(() => this.selectedRowsOfGroup().length > 0 && !this.checked());

  private rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any> = inject(KeyValueDiffers)
    .find({})
    .create();
  private tableComponent = inject(DATATABLE_COMPONENT_TOKEN);

  ngDoCheck(): void {
    const row = this.row();
    if (this.rowDiffer.diff(row)) {
      if ('group' in this.context()) {
        this.context.set({
          group: row as Group<TRow>,
          expanded: this.expanded(),
          rowIndex: this.rowIndex()
        });
      } else {
        this.context.set({
          row: row as TRow,
          expanded: this.expanded(),
          rowIndex: this.rowIndex(),
          disabled: this.disabled()
        });
      }
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row() });
  }

  onCheckboxChange(groupSelected: boolean, group: Group<TRow>): void {
    const selectedSet = new Set(this.selected());
    group.value.forEach((item: TRow) => {
      if (groupSelected) {
        selectedSet.add(item);
      } else {
        selectedSet.delete(item);
      }
    });
    const selected = Array.from(selectedSet);
    // Update `selected` of DatatableComponent with newly evaluated `selected`
    this.tableComponent.selected = [...selected];
    // Emit select event with updated values
    this.tableComponent.onBodySelect(this.tableComponent.selected);
  }

  isGroup(row: RowOrGroup<TRow>): row is Group<TRow> {
    return !!this.groupHeader();
  }
}
