import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { DataTableColumnDirective } from '../columns/column.directive';
import { isNullOrUndefined } from '../../utils/column-helper';
import { Scrollbar } from '../../utils/scrollbar';
import { translateXY } from '../../utils/translate';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      role="row"
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="columnGroupWidths.total"
      class="datatable-header-inner"
    >
      <div
        *ngFor="let colGroup of columnsByPin; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="styleByGroup[colGroup.type]"
      >
        <datatable-header-cell
          role="columnheader"
          *ngFor="let column of colGroup.columns; trackBy: columnTrackingFn"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          [pressModel]="column"
          [pressEnabled]="reorderable && column.draggable"
          (longPressStart)="onLongPressStart($event)"
          (longPressEnd)="onLongPressEnd($event)"
          draggable
          [dragX]="reorderable && column.draggable && column.dragging"
          [dragY]="false"
          [dragModel]="column"
          [dragEventTarget]="dragEventTarget"
          [headerHeight]="headerHeight"
          [isTarget]="column.isTarget"
          [targetMarkerTemplate]="targetMarkerTemplate"
          [targetMarkerContext]="column.targetMarkerContext"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [sortUnsetIcon]="sortUnsetIcon"
          [allRowsSelected]="allRowsSelected"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
        >
        </datatable-header-cell>
      </div>
    </div>
  `,
  host: {
    class: 'datatable-header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderComponent implements OnChanges {
  @Input() allRowsSelected: boolean;
  @Input() columns: any[];
  @Input() dealsWithGroup: boolean;
  @Input() innerWidth: number;
  @Input() offsetX: number;
  @Input() reorderable: boolean;
  @Input() scrollbarH: boolean;
  @Input() scrollbarV: boolean;
  @Input() selectionType: SelectionType;
  @Input() sortAscendingIcon: any;
  @Input() sortDescendingIcon: any;
  @Input() sortType: SortType;
  @Input() sortUnsetIcon: any;
  @Input() sorts: any[];
  @Input() targetMarkerTemplate: any;

  @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent; column: any }>(false);
  @Output() reorder: EventEmitter<any> = new EventEmitter();
  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() sort: EventEmitter<any> = new EventEmitter();

  columnGroupWidths: any = { total: 100 };
  columnsByPin: any;
  dragEventTarget: any;
  styleByGroup: { [prop: string]: {} } = {
    left: {},
    center: {},
    right: {}
  };

  constructor(private cd: ChangeDetectorRef) {
    Scrollbar.widthChange.subscribe(() => this.recalculateColumns());
  }

  private _headerHeight: string;

  get headerHeight(): any {
    return this._headerHeight;
  }

  @HostBinding('style.height')
  @Input()
  set headerHeight(val: any) {
    this._headerHeight = val === 'auto' ? val : `${val}px`;
  }

  @HostBinding('style.width')
  get headerWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    }

    return '100%';
  }

  trackByGroups = (index: number, colGroup: any): any => colGroup.type;

  columnTrackingFn = (index: number, column: any): any => column.$$id;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns || changes.innerWidth || changes.scrollbarV) {
      this.recalculateColumns();
    } else if (changes.offsetX) {
      this.buildStylesByGroup();
    }
  }

  buildStylesByGroup(): void {
    this.styleByGroup.left = this.calcStylesByGroup('left');
    this.styleByGroup.center = this.calcStylesByGroup('center');
    this.styleByGroup.right = this.calcStylesByGroup('right');
    this.cd.markForCheck();
  }

  calcNewSorts(column: any, prevValue: number, newValue: number): any[] {
    let idx = 0;

    if (!this.sorts) {
      this.sorts = [];
    }

    const sorts = this.sorts.map((s, i) => {
      s = { ...s };
      if (s.prop === column.prop) {
        idx = i;
      }
      return s;
    });

    if (newValue === undefined) {
      sorts.splice(idx, 1);
    } else if (prevValue) {
      sorts[idx].dir = newValue;
    } else {
      if (this.sortType === SortType.single) {
        sorts.splice(0, this.sorts.length);
      }

      sorts.push({ dir: newValue, prop: column.prop });
    }

    return sorts;
  }

  calcStylesByGroup(group: string): any {
    const widths = this.columnGroupWidths;
    const styles = { width: `${widths[group]}px` };

    if (group === 'center') {
      translateXY(styles, this.offsetX * -1, 0);
    } else if (group === 'right') {
      const headerWidth = parseInt(this.innerWidth + '', 0);
      const offset = widths.total - headerWidth;
      translateXY(styles, offset * -1, 0);
    }

    return styles;
  }

  fillWidth(): void {
    for (let i = this.columns.length - 1; i > -1; i--) {
      const col = this.columns[i];
      if (col.frozenRight) {
        this.columnGroupWidths.right += Scrollbar.width;
        this.columnGroupWidths.total += Scrollbar.width;
        break;
      }
      i++;
    }
  }

  getColumn(index: number): any {
    const leftColumnCount = this.columnsByPin[0].columns.length;
    if (index < leftColumnCount) {
      return this.columnsByPin[0].columns[index];
    }

    const centerColumnCount = this.columnsByPin[1].columns.length;
    if (index < leftColumnCount + centerColumnCount) {
      return this.columnsByPin[1].columns[index - leftColumnCount];
    }

    return this.columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
  }

  onColumnReordered({ prevIndex, newIndex, model }: any): void {
    const column = this.getColumn(newIndex);
    column.isTarget = false;
    column.targetMarkerContext = undefined;
    this.reorder.emit({
      column: model,
      prevValue: prevIndex,
      newValue: newIndex
    });
  }

  onColumnResized(width: number, column: DataTableColumnDirective): void {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if (width >= column.maxWidth) {
      width = column.maxWidth;
    }

    this.resize.emit({
      column,
      prevValue: column.width,
      newValue: width
    });
  }

  onLongPressEnd({ event, model }: { event: any; model: any }) {
    this.dragEventTarget = event;

    // delay resetting so sort can be
    // prevented if we were dragging
    setTimeout(() => {
      // datatable component creates copies from columns on reorder
      // set dragging to false on new objects
      const column = this.columns.find(c => c.$$id === model.$$id);
      if (column) {
        column.dragging = false;
      }
    }, 5);
  }

  onLongPressStart({ event, model }: { event: any; model: any }) {
    model.dragging = true;
    this.dragEventTarget = event;
  }

  onSort({ column, prevValue, newValue }: any): void {
    // if we are dragging don't sort!
    if (column.dragging) {
      return;
    }

    const sorts = this.calcNewSorts(column, prevValue, newValue);
    this.sort.emit({
      sorts,
      column,
      prevValue,
      newValue
    });
  }

  onTargetChanged({ prevIndex, newIndex, initialIndex }: any): void {
    console.log(prevIndex, newIndex, initialIndex, this.getColumn(prevIndex), this.getColumn(newIndex));
    if (!isNullOrUndefined(prevIndex)) {
      const oldCol = this.getColumn(prevIndex);
      oldCol.isTarget = false;
      oldCol.targetMarkerContext = undefined;
    }
    if (!isNullOrUndefined(newIndex)) {
      const newCol = this.getColumn(newIndex);
      newCol.isTarget = true;

      if (initialIndex !== newIndex) {
        newCol.targetMarkerContext = {
          class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')
        };
      }
    }
  }

  recalculateColumns(): void {
    const colsByPin = columnsByPin(this.columns);
    this.columnsByPin = columnsByPinArr(this.columns);
    this.columnGroupWidths = columnGroupWidths(colsByPin, this.columns);
    if (this.scrollbarV) {
      this.fillWidth();
    }
    this.buildStylesByGroup();
  }
}
