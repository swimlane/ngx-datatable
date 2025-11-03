import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';

import { Group, GroupContext, Row } from '../../types/public.types';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';

@Component({
  selector: 'datatable-group-wrapper',
  imports: [NgTemplateOutlet],
  template: `
    @let groupHeader = this.groupHeader();
    @if (groupHeader && groupHeader.template()) {
      <div
        class="datatable-group-header"
        [style.height.px]="groupHeaderRowHeight()"
        [style.width.px]="innerWidth()"
      >
        <div class="datatable-group-cell">
          @if (groupHeader.checkboxable()) {
            <div>
              <label class="datatable-checkbox">
                <input
                  #select
                  type="checkbox"
                  [attr.aria-label]="ariaGroupHeaderCheckboxMessage()"
                  [checked]="checked()"
                  [indeterminate]="indeterminate()"
                  (change)="onCheckboxChange(select.checked)"
                />
              </label>
            </div>
          }
          <ng-template
            [ngTemplateOutlet]="groupHeader.template()"
            [ngTemplateOutletContext]="context()"
          />
        </div>
      </div>
    }
    @if (expanded()) {
      <ng-content />
    }
  `,
  styleUrl: './body-group-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-group-wrapper'
  }
})
export class DataTableGroupWrapperComponent<TRow extends Row = any> {
  readonly innerWidth = input.required<number>();
  readonly groupHeader = input.required<DatatableGroupHeaderDirective | undefined>();
  readonly groupHeaderRowHeight = input.required<number>();
  readonly group = input.required<Group<TRow>>();
  readonly groupedRows = input<Group<TRow>[]>();
  readonly selected = input.required<TRow[]>();
  readonly disabled = input<boolean>();
  readonly rowIndex = input.required<number>();
  readonly expanded = input(false, { transform: booleanAttribute });
  readonly ariaGroupHeaderCheckboxMessage = input.required<string>();
  readonly groupSelectedChange = output<boolean>();

  readonly context = computed<GroupContext<TRow>>(() => {
    return {
      group: this.group(),
      expanded: this.expanded(),
      rowIndex: this.rowIndex()
    };
  });
  readonly selectedRowsOfGroup = computed(() => {
    const groupValue = this.group().value;
    return this.selected().filter(row => groupValue.includes(row));
  });
  readonly checked = computed(
    () => this.selectedRowsOfGroup().length === this.group().value.length
  );
  readonly indeterminate = computed(() => this.selectedRowsOfGroup().length > 0 && !this.checked());

  onCheckboxChange(groupSelected: boolean): void {
    this.groupSelectedChange.emit(groupSelected);
  }
}
