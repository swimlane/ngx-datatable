import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  inject,
  IterableDiffer,
  IterableDiffers,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  signal,
  input,
  output,
  viewChild,
  linkedSignal
} from '@angular/core';

import { Group, Row, RowOrGroup, RowDetailContext, GroupContext } from '../../types/public.types';
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
                  [checked]="selectedGroupRows().length === row.value.length"
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
export class DataTableRowWrapperComponent<TRow extends Row = any> implements DoCheck, OnInit {
  readonly checkBoxInput = viewChild<ElementRef<HTMLInputElement>>('select');
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

  private rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any> = inject(KeyValueDiffers)
    .find({})
    .create();
  private iterableDiffers = inject(IterableDiffers);
  private selectedRowsDiffer!: IterableDiffer<TRow>;
  private tableComponent = inject(DATATABLE_COMPONENT_TOKEN);

  ngOnInit(): void {
    this.selectedRowsDiffer = this.iterableDiffers.find(this.selected() ?? []).create();
  }

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
    // When groupheader is used with chechbox we use iterableDiffer
    // on currently selected rows to check if it is modified
    // if any of the row of this group is not present in `selected` rows array
    // mark group header checkbox state as indeterminate
    if (
      this.isGroup(row) &&
      this.groupHeader()?.checkboxable &&
      this.selectedRowsDiffer.diff(this.selected())
    ) {
      const thisRow = row;
      const selectedRows = this.selected().filter(rowItem =>
        thisRow.value.find((item: TRow) => item === rowItem)
      );
      const checkBoxInput = this.checkBoxInput();
      if (checkBoxInput) {
        if (selectedRows.length && selectedRows.length !== row.value.length) {
          checkBoxInput.nativeElement.indeterminate = true;
        } else {
          checkBoxInput.nativeElement.indeterminate = false;
        }
      }
      this.selectedGroupRows.set(selectedRows);
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row() });
  }

  onCheckboxChange(groupSelected: boolean, group: Group<TRow>): void {
    // First remove all rows of this group from `selected`
    let selected = [
      ...this.selected().filter(row => !group.value.find((item: TRow) => item === row))
    ];
    // If checkbox is checked then add all rows of this group in `selected`
    if (groupSelected) {
      selected = [...this.selected(), ...group.value];
    }
    // Update `selected` of DatatableComponent with newly evaluated `selected`
    this.tableComponent.selected = [...selected];
    // Emit select event with updated values
    this.tableComponent.onBodySelect({
      selected: [...selected]
    });
  }

  isGroup(row: RowOrGroup<TRow>): row is Group<TRow> {
    return !!this.groupHeader();
  }
}
