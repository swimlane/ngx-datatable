import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
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
import { BehaviorSubject } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { DatatableComponentToken } from '../../utils/table-token';
import { Group, GroupContext, RowDetailContext, RowOrGroup } from '../../types/public.types';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';

@Component({
  selector: 'datatable-row-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (groupHeader?.template) {
    <div
      class="datatable-group-header"
      [style.height.px]="groupHeaderRowHeight"
      [style.width.px]="innerWidth"
    >
      <div class="datatable-group-cell">
        @if (groupHeader.checkboxable) {
        <div>
          <label class="datatable-checkbox">
            <input
              #select
              type="checkbox"
              [checked]="selectedGroupRows().length === group().value.length"
              (change)="onCheckboxChange(select.checked)"
            />
          </label>
        </div>
        }
        <ng-template
          [ngTemplateOutlet]="groupHeader.template"
          [ngTemplateOutletContext]="groupContext"
        >
        </ng-template>
      </div>
    </div>
    } @if ((groupHeader?.template && expanded) || !groupHeader || !groupHeader.template) {
    <ng-content> </ng-content>
    } @if (rowDetail?.template && expanded) {
    <div [style.height.px]="detailRowHeight" class="datatable-row-detail">
      <ng-template [ngTemplateOutlet]="rowDetail.template" [ngTemplateOutletContext]="rowContext">
      </ng-template>
    </div>
    }
  `,
  host: {
    class: 'datatable-row-wrapper'
  },
  imports: [NgTemplateOutlet]
})
export class DataTableRowWrapperComponent<TRow = any> implements DoCheck, OnInit, OnChanges {
  @ViewChild('select') checkBoxInput!: ElementRef<HTMLInputElement>;
  @Input() innerWidth: number;
  @Input() rowDetail: DatatableRowDetailDirective;
  @Input() groupHeader: DatatableGroupHeaderDirective;
  @Input() offsetX: number;
  @Input() detailRowHeight: number;
  @Input() groupHeaderRowHeight: number;
  @Input() row: RowOrGroup<TRow>;
  @Input() groupedRows: Group<TRow>[];
  @Input() disableCheck: (row: RowOrGroup<TRow>) => boolean;
  @Input() selected: TRow[];
  @Output() rowContextmenu = new EventEmitter<{
    event: MouseEvent;
    row: RowOrGroup<TRow>;
  }>(false);

  @Input() rowIndex?: number;

  selectedGroupRows = signal<TRow[]>([]);

  @Input({ transform: booleanAttribute }) expanded = false;

  groupContext?: GroupContext<TRow>;
  rowContext?: RowDetailContext<TRow>;
  disable$: BehaviorSubject<boolean>;

  private rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any> = inject(KeyValueDiffers)
    .find({})
    .create();
  private iterableDiffers = inject(IterableDiffers);
  private selectedRowsDiffer: IterableDiffer<TRow>;
  private tableComponent = inject(DatatableComponentToken);
  private cd = inject(ChangeDetectorRef);

  protected group = computed(() => {
    if (typeof this.row === 'object' && 'value' in this.row) {
      return this.row;
    }
  });

  ngOnInit(): void {
    if (this.disableCheck) {
      const isRowDisabled = this.disableCheck(this.row);
      this.disable$ = new BehaviorSubject(isRowDisabled);
      this.rowContext.disableRow$ = this.disable$;
    }
    this.selectedRowsDiffer = this.iterableDiffers.find(this.selected ?? []).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['row']) {
      // this component renders either a group header or a row. Never both.
      if (this.isGroup(this.row)) {
        this.groupContext = {
          group: this.row,
          expanded: this.expanded,
          rowIndex: this.rowIndex
        };
      } else {
        this.rowContext = {
          row: this.row,
          expanded: this.expanded,
          rowIndex: this.rowIndex,
          disableRow$: this.disable$
        };
      }
    }
    if (changes['rowIndex']) {
      (this.rowContext ?? this.groupContext).rowIndex = this.rowIndex;
    }
    if (changes['expanded']) {
      (this.groupContext ?? this.rowContext)!.expanded = this.expanded;
      if (this.rowContext) {
        this.rowContext.expanded = this.expanded;
      }
    }
  }

  ngDoCheck(): void {
    if (this.disableCheck) {
      const isRowDisabled = this.disableCheck(this.row);
      if (isRowDisabled !== this.disable$.value) {
        this.disable$.next(isRowDisabled);
        this.cd.markForCheck();
      }
    }

    if (this.rowDiffer.diff(this.row)) {
      if (this.isGroup(this.row)) {
        this.groupContext.group = this.row;
      } else {
        this.rowContext.row = this.row;
      }
      this.cd.markForCheck();
    }
    // When groupheader is used with chechbox we use iterableDiffer
    // on currently selected rows to check if it is modified
    // if any of the row of this group is not present in `selected` rows array
    // mark group header checkbox state as indeterminate
    if (this.groupHeader?.checkboxable && this.selectedRowsDiffer.diff(this.selected)) {
      const selectedRows = this.selected.filter(row =>
        this.group()?.value.find(item => item === row)
      );
      if (this.checkBoxInput) {
        if (selectedRows.length && selectedRows.length !== this.group()?.value.length) {
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

  onCheckboxChange(groupSelected: boolean): void {
    // First remove all rows of this group from `selected`
    this.selected = [
      ...this.selected.filter(row => !this.group().value.find(item => item === row))
    ];
    // If checkbox is checked then add all rows of this group in `selected`
    if (groupSelected) {
      this.selected = [...this.selected, ...this.group().value];
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
