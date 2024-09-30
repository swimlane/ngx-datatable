import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Output,
  SimpleChanges,
  SkipSelf
} from '@angular/core';

import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { translateXY } from '../../utils/translate';
import { BehaviorSubject } from 'rxjs';
import { ActivateEvent, RowOrGroup, TreeStatus } from '../../types/public.types';
import { NgStyle } from '@angular/common';
import { TableColumn } from '../../types/table-column.type';
import { ColumnGroupWidth, PinnedColumns } from '../../types/internal.types';

@Component({
  selector: 'datatable-body-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngFor="let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [ngStyle]="_groupStyles[colGroup.type]"
      [class.row-disabled]="disable$ ? (disable$ | async) : false"
    >
      <datatable-body-cell
        role="cell"
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        [disable$]="disable$"
        [treeStatus]="treeStatus"
        [ghostLoadingIndicator]="ghostLoadingIndicator"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
    </div>
  `
})
export class DataTableBodyRowComponent<TRow = any> implements DoCheck, OnChanges {
  @Input() set columns(val: TableColumn[]) {
    this._columns = val;
    this.recalculateColumns(val);
    this.buildStylesByGroup();
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() set innerWidth(val: number) {
    if (this._columns) {
      const colByPin = columnsByPin(this._columns);
      this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
    }

    this._innerWidth = val;
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  get innerWidth(): number {
    return this._innerWidth;
  }

  @Input() expanded: boolean;
  @Input() rowClass?: (row: RowOrGroup<TRow>) => string | Record<string, boolean>;
  @Input() row: TRow;
  @Input() group: TRow[];
  @Input() isSelected: boolean;
  @Input() rowIndex: number;
  @Input() displayCheck: (row: TRow, column: TableColumn, value?: any) => boolean;
  @Input() treeStatus?: TreeStatus = 'collapsed';
  @Input() ghostLoadingIndicator = false;
  @Input() verticalScrollVisible = false;

  @Input() disable$: BehaviorSubject<boolean>;
  @Input()
  set offsetX(val: number) {
    this._offsetX = val;
    this.buildStylesByGroup();
  }
  get offsetX() {
    return this._offsetX;
  }

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if (this.isSelected) {
      cls += ' active';
    }
    if (this.rowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    }
    if (this.rowIndex % 2 === 0) {
      cls += ' datatable-row-even';
    }
    if (this.disable$ && this.disable$.value) {
      cls += ' row-disabled';
    }

    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) {
            cls += ` ${k}`;
          }
        }
      }
    }

    return cls;
  }

  @HostBinding('style.height.px')
  @Input()
  rowHeight: number;

  @HostBinding('style.width.px')
  get columnsTotalWidths(): number {
    return this._columnGroupWidths.total;
  }

  @Output() activate: EventEmitter<ActivateEvent<TRow>> = new EventEmitter();
  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  _element: HTMLElement;
  _columnGroupWidths: ColumnGroupWidth;
  _columnsByPin: PinnedColumns[];
  _offsetX: number;
  _columns: TableColumn[];
  _innerWidth: number;
  _groupStyles: {
    left: NgStyle['ngStyle'];
    center: NgStyle['ngStyle'];
    right: NgStyle['ngStyle'];
  } = { left: {}, center: {}, right: {} };

  private _rowDiffer: KeyValueDiffer<keyof RowOrGroup<TRow>, any>;

  constructor(
    differs: KeyValueDiffers,
    @SkipSelf() private scrollbarHelper: ScrollbarHelper,
    private cd: ChangeDetectorRef,
    element: ElementRef<HTMLElement>
  ) {
    this._element = element.nativeElement;
    this._rowDiffer = differs.find({}).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.verticalScrollVisible) {
      this.buildStylesByGroup();
    }
  }

  ngDoCheck(): void {
    if (this._rowDiffer.diff(this.row)) {
      this.cd.markForCheck();
    }
  }

  trackByGroups(index: number, colGroup: PinnedColumns): string {
    return colGroup.type;
  }

  columnTrackingFn(index: number, column: TableColumn): string {
    return column.$$id;
  }

  buildStylesByGroup() {
    this._groupStyles.left = this.calcStylesByGroup('left');
    this._groupStyles.center = this.calcStylesByGroup('center');
    this._groupStyles.right = this.calcStylesByGroup('right');
    this.cd.markForCheck();
  }

  calcStylesByGroup(group: 'left' | 'right' | 'center') {
    const widths = this._columnGroupWidths;
    const offsetX = this.offsetX;

    if (group === 'left') {
      return {
        width: `${widths[group]}px`,
        ...translateXY(offsetX, 0)
      };
    } else if (group === 'right') {
      const bodyWidth = this.innerWidth;
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset =
        (offsetDiff + (this.verticalScrollVisible ? this.scrollbarHelper.width : 0)) * -1;
      return {
        width: `${widths[group]}px`,
        ...translateXY(offset, 0)
      };
    }

    return {
      width: `${widths[group]}px`
    };
  }

  onActivate(event: ActivateEvent<TRow>, index: number): void {
    event.cellIndex = index;
    event.rowElement = this._element;
    this.activate.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetRow = event.target === this._element;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    const isCtrlA = event.key === 'a' && (event.ctrlKey || event.metaKey);

    if ((isAction && isTargetRow) || isCtrlA) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        rowElement: this._element
      });
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: MouseEvent): void {
    this.activate.emit({
      type: 'mouseenter',
      event,
      row: this.row,
      rowElement: this._element
    });
  }

  recalculateColumns(val: TableColumn<TRow>[] = this.columns): void {
    this._columns = val;
    const colsByPin = columnsByPin(this._columns);
    this._columnsByPin = columnsByPinArr(this._columns);
    this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }

  onTreeAction() {
    this.treeAction.emit();
  }
}
