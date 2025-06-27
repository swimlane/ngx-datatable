import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  IterableDiffer,
  IterableDiffers,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DatatableComponentToken } from '../../utils/table-token';
import { Group, GroupContext, Row, RowDetailContext, RowOrGroup } from '../../types/public.types';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';

@Component({
  selector: 'datatable-row-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isGroup(row) && groupHeader?.template) {
    <div
      class="datatable-group-header"
      [style.height.px]="groupHeaderRowHeight"
      [style.width.px]="innerWidth"
    >
      <div class="datatable-group-cell">
        @if (groupHeader!.checkboxable) {
        <div>
          <label class="datatable-checkbox">
            <input
              #select
              type="checkbox"
              [checked]="selectedGroupRows().length === row.value.length"
              (change)="onCheckboxChange(select.checked, row)"
            />
          </label>
        </div>
        }
        <ng-template
          [ngTemplateOutlet]="groupHeader!.template!"
          [ngTemplateOutletContext]="context"
        >
        </ng-template>
      </div>
    </div>
    } @if ((groupHeader?.template && expanded) || !groupHeader || !groupHeader.template) {
    <ng-content> </ng-content>
    } @if (rowDetail?.template && expanded) {
    <div [style.height.px]="detailRowHeight" class="datatable-row-detail">
      <ng-template [ngTemplateOutlet]="rowDetail!.template!" [ngTemplateOutletContext]="context">
      </ng-template>
    </div>
    }
  `,
  host: {
    class: 'datatable-row-wrapper'
  },
  styleUrl: './body-row-wrapper.component.scss',
  imports: [NgTemplateOutlet]
})
export class DataTableRowWrapperComponent<TRow extends Row = any>
  implements DoCheck, OnInit, OnChanges
{
  @ViewChild('select') checkBoxInput!: ElementRef<HTMLInputElement>;
  @Input() innerWidth!: number;
  @Input() rowDetail?: DatatableRowDetailDirective;
  @Input() groupHeader?: DatatableGroupHeaderDirective;
  @Input() offsetX!: number;
  @Input() detailRowHeight!: number;
  @Input() groupHeaderRowHeight!: number;
  @Input() row!: RowOrGroup<TRow>;
  @Input() groupedRows?: Group<TRow>[];
  @Input() selected!: TRow[];
  @Input() disabled?: boolean;
  @Output() rowContextmenu = new EventEmitter<{
    event: MouseEvent;
    row: RowOrGroup<TRow>;
  }>(false);

  @Input() rowIndex!: number;

  selectedGroupRows = signal<TRow[]>([]);

  @Input({ transform: booleanAttribute }) expanded = false;

  context!: RowDetailContext<TRow> | GroupContext<TRow>;

  private rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any> = inject(KeyValueDiffers)
    .find({})
    .create();
  private iterableDiffers = inject(IterableDiffers);
  private selectedRowsDiffer!: IterableDiffer<TRow>;
  private tableComponent = inject(DatatableComponentToken);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.selectedRowsDiffer = this.iterableDiffers.find(this.selected ?? []).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['row']) {
      // this component renders either a group header or a row. Never both.
      if (this.isGroup(this.row)) {
        this.context = {
          group: this.row,
          expanded: this.expanded,
          rowIndex: this.rowIndex
        };
      } else {
        this.context = {
          row: this.row,
          expanded: this.expanded,
          rowIndex: this.rowIndex,
          disabled: this.disabled
        };
      }
    }
    if (changes['rowIndex']) {
      this.context.rowIndex = this.rowIndex;
    }
    if (changes['expanded']) {
      this.context.expanded = this.expanded;
    }
  }

  ngDoCheck(): void {
    if (this.rowDiffer.diff(this.row)) {
      if ('group' in this.context) {
        this.context.group = this.row as Group<TRow>;
      } else {
        this.context.row = this.row as TRow;
      }
      this.cd.markForCheck();
    }
    // When groupheader is used with chechbox we use iterableDiffer
    // on currently selected rows to check if it is modified
    // if any of the row of this group is not present in `selected` rows array
    // mark group header checkbox state as indeterminate
    if (
      this.isGroup(this.row) &&
      this.groupHeader?.checkboxable &&
      this.selectedRowsDiffer.diff(this.selected)
    ) {
      const thisRow = this.row;
      const selectedRows = this.selected.filter(row =>
        thisRow.value.find((item: TRow) => item === row)
      );
      if (this.checkBoxInput) {
        if (selectedRows.length && selectedRows.length !== this.row.value.length) {
          this.checkBoxInput.nativeElement.indeterminate = true;
        } else {
          this.checkBoxInput.nativeElement.indeterminate = false;
        }
      }
      this.selectedGroupRows.set(selectedRows);
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row });
  }

  onCheckboxChange(groupSelected: boolean, group: Group<TRow>): void {
    // First remove all rows of this group from `selected`
    this.selected = [
      ...this.selected.filter(row => !group.value.find((item: TRow) => item === row))
    ];
    // If checkbox is checked then add all rows of this group in `selected`
    if (groupSelected) {
      this.selected = [...this.selected, ...group.value];
    }
    // Update `selected` of DatatableComponent with newly evaluated `selected`
    this.tableComponent.selected = [...this.selected];
    // Emit select event with updated values
    this.tableComponent.onBodySelect({
      selected: this.selected
    });
  }

  isGroup(row: RowOrGroup<TRow>): row is Group<TRow> {
    return !!this.groupHeader;
  }
}
