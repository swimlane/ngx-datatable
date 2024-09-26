import {
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
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgStyle } from '@angular/common';
import { DatatableComponentToken } from '../../utils/table-token';
import { Group, GroupContext, RowDetailContext, RowOrGroup } from '../../types/public.types';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DatatableRowDetailDirective } from '../row-detail/row-detail.directive';

@Component({
  selector: 'datatable-row-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="groupHeader && groupHeader.template"
      [style.height.px]="groupHeaderRowHeight"
      class="datatable-group-header"
      [ngStyle]="getGroupHeaderStyle()"
    >
      <div class="datatable-group-cell">
        <div *ngIf="groupHeader.checkboxable">
          <label class="datatable-checkbox">
            <input
              #select
              type="checkbox"
              [checked]="selectedGroupRows.length === group.value.length"
              (change)="onCheckboxChange(select.checked)"
            />
          </label>
        </div>
        <ng-template
          *ngIf="groupHeader && groupHeader.template"
          [ngTemplateOutlet]="groupHeader.template"
          [ngTemplateOutletContext]="groupContext"
        >
        </ng-template>
      </div>
    </div>
    <ng-content
      *ngIf="
        (groupHeader && groupHeader.template && expanded) || !groupHeader || !groupHeader.template
      "
    >
    </ng-content>
    <div
      *ngIf="rowDetail && rowDetail.template && expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail"
    >
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="rowContext"
      >
      </ng-template>
    </div>
  `,
  host: {
    class: 'datatable-row-wrapper'
  }
})
export class DataTableRowWrapperComponent<TRow = any> implements DoCheck, OnInit {
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

  @Input() set rowIndex(val: number) {
    this._rowIndex = val;
    this.rowContext.rowIndex = val;
    this.groupContext.rowIndex = val;
    this.cd.markForCheck();
  }

  get rowIndex(): number {
    return this._rowIndex;
  }

  selectedGroupRows: TRow[] = [];

  @Input() set expanded(val: boolean) {
    this._expanded = val;
    this.groupContext.expanded = val;
    this.rowContext.expanded = val;
    this.cd.markForCheck();
  }

  get expanded(): boolean {
    return this._expanded;
  }

  groupContext: GroupContext<TRow>;
  rowContext: RowDetailContext<TRow>;
  disable$: BehaviorSubject<boolean>;

  private rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any>;
  private selectedRowsDiffer: IterableDiffer<TRow>;
  private _expanded = false;
  private _rowIndex: number;
  private tableComponent = inject(DatatableComponentToken);

  constructor(
    private cd: ChangeDetectorRef,
    differs: KeyValueDiffers,
    private iterableDiffers: IterableDiffers
  ) {
    this.groupContext = {
      group: this.row,
      expanded: this.expanded,
      rowIndex: this.rowIndex
    };

    this.rowContext = {
      row: this.row,
      expanded: this.expanded,
      rowIndex: this.rowIndex,
      disableRow$: this.disable$
    };

    this.rowDiffer = differs.find({}).create();
    this.selectedRowsDiffer = this.iterableDiffers.find(this.selected ?? []).create();
  }

  get group(): Group<TRow> {
    if (typeof this.row === 'object' && 'value' in this.row) {
      return this.row;
    } else {
      throw new Error('Row is not a group');
    }
  }

  ngOnInit(): void {
    if (this.disableCheck) {
      const isRowDisabled = this.disableCheck(this.row);
      this.disable$ = new BehaviorSubject(isRowDisabled);
      this.rowContext.disableRow$ = this.disable$;
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
      this.rowContext.row = this.row;
      this.groupContext.group = this.row;
      this.cd.markForCheck();
    }
    // When groupheader is used with chechbox we use iterableDiffer
    // on currently selected rows to check if it is modified
    // if any of the row of this group is not present in `selected` rows array
    // mark group header checkbox state as indeterminate
    if (this.groupHeader?.checkboxable && this.selectedRowsDiffer.diff(this.selected)) {
      const selectedRows = this.selected.filter(row => this.group.value.find(item => item === row));
      if (this.checkBoxInput) {
        if (selectedRows.length && selectedRows.length !== this.group.value.length) {
          this.checkBoxInput.nativeElement.indeterminate = true;
        } else {
          this.checkBoxInput.nativeElement.indeterminate = false;
        }
      }
      this.selectedGroupRows = selectedRows;
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row });
  }

  getGroupHeaderStyle(): NgStyle['ngStyle'] {
    return {
      'transform': 'translate3d(' + this.offsetX + 'px, 0px, 0px)',
      'backface-visibility': 'hidden',
      'width': this.innerWidth + 'px'
    };
  }

  onCheckboxChange(groupSelected: boolean): void {
    // First remove all rows of this group from `selected`
    this.selected = [...this.selected.filter(row => !this.group.value.find(item => item === row))];
    // If checkbox is checked then add all rows of this group in `selected`
    if (groupSelected) {
      this.selected = [...this.selected, ...this.group.value];
    }
    // Update `selected` of DatatableComponent with newly evaluated `selected`
    this.tableComponent.selected = [...this.selected];
    // Emit select event with updated values
    this.tableComponent.onBodySelect({
      selected: this.selected
    });
  }
}
