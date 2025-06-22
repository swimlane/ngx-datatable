import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import {
  Row,
  SelectionType,
  SortDirection,
  SortEvent,
  SortPropDir,
  SortType
} from '../../types/public.types';
import { NgClass, NgStyle } from '@angular/common';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import {
  ColumnResizeEventInternal,
  InnerSortEvent,
  PinnedColumns,
  ReorderEventInternal,
  SortableTableColumnInternal,
  TableColumnInternal,
  TargetChangedEvent
} from '../../types/internal.types';
import { DraggableDirective } from '../../directives/draggable.directive';
import { LongPressDirective } from '../../directives/long-press.directive';
import { DataTableHeaderCellComponent } from './header-cell.component';
import { OrderableDirective } from '../../directives/orderable.directive';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      role="row"
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="_columnGroupWidths.total"
      class="datatable-header-inner"
    >
      @for (colGroup of _columnsByPin; track colGroup.type) { @if (colGroup.columns.length) {
      <div
        class="datatable-row-group"
        [ngClass]="'datatable-row-' + colGroup.type"
        [ngStyle]="_styleByGroup[colGroup.type]"
      >
        @for (column of colGroup.columns; track column.$$id) {
        <datatable-header-cell
          role="columnheader"
          (resize)="onColumnResized($event)"
          (resizing)="onColumnResizing($event)"
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
          [enableClearingSortState]="enableClearingSortState"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
        >
        </datatable-header-cell>
        }
      </div>
      } }
    </div>
  `,
  host: {
    class: 'datatable-header'
  },
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OrderableDirective,
    NgStyle,
    DataTableHeaderCellComponent,
    LongPressDirective,
    DraggableDirective,
    NgClass
  ]
})
export class DataTableHeaderComponent implements OnDestroy, OnChanges {
  private cd = inject(ChangeDetectorRef);
  private scrollbarHelper = inject(ScrollbarHelper);

  @Input() sortAscendingIcon?: string;
  @Input() sortDescendingIcon?: string;
  @Input() sortUnsetIcon?: string;
  @Input() scrollbarH?: boolean;
  @Input() dealsWithGroup?: boolean;
  @Input() targetMarkerTemplate?: TemplateRef<unknown>;
  @Input() enableClearingSortState = false;

  @Input() set innerWidth(val: number) {
    this._innerWidth = val;
    setTimeout(() => {
      if (this._columns) {
        const colByPin = columnsByPin(this._columns);
        this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
        this.setStylesByGroup();
      }
    });
  }

  get innerWidth(): number {
    return this._innerWidth;
  }

  @Input() sorts!: SortPropDir[];
  @Input() sortType!: SortType;
  @Input() allRowsSelected?: boolean;
  @Input() selectionType?: SelectionType;
  @Input() reorderable?: boolean;
  @Input() verticalScrollVisible = false;

  dragEventTarget?: MouseEvent | TouchEvent;

  @HostBinding('style.height')
  @Input()
  set headerHeight(val: any) {
    if (val !== 'auto') {
      this._headerHeight = `${val}px`;
    } else {
      this._headerHeight = val;
    }
  }

  get headerHeight(): any {
    return this._headerHeight;
  }

  @Input() set columns(val: TableColumnInternal[]) {
    this._columns = val;

    const colsByPin = columnsByPin(val);
    this._columnsByPin = columnsByPinArr(val);
    setTimeout(() => {
      this._columnGroupWidths = columnGroupWidths(colsByPin, val);
      this.setStylesByGroup();
    });
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input()
  set offsetX(val: number) {
    this._offsetX = val;
    this.setStylesByGroup();
  }
  get offsetX() {
    return this._offsetX;
  }

  @Output() sort = new EventEmitter<SortEvent>();
  @Output() reorder = new EventEmitter<ReorderEventInternal>();
  @Output() resize = new EventEmitter<ColumnResizeEventInternal>();
  @Output() resizing = new EventEmitter<ColumnResizeEventInternal>();
  @Output() select = new EventEmitter<void>();
  @Output() columnContextmenu = new EventEmitter<{
    event: MouseEvent;
    column: TableColumnInternal;
  }>(false);

  _columnsByPin!: PinnedColumns[];
  _columnGroupWidths: any = {
    total: 100
  };
  _innerWidth!: number;
  _offsetX!: number;
  _columns!: TableColumnInternal[];
  _headerHeight!: string;
  _styleByGroup: {
    left: NgStyle['ngStyle'];
    center: NgStyle['ngStyle'];
    right: NgStyle['ngStyle'];
  } = { left: {}, center: {}, right: {} };

  private destroyed = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.verticalScrollVisible) {
      this._styleByGroup.right = this.calcStylesByGroup('right');
      if (!this.destroyed) {
        this.cd.detectChanges();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  onLongPressStart({
    event,
    model
  }: {
    event: MouseEvent | TouchEvent;
    model: TableColumnInternal<Row>;
  }) {
    model.dragging = true;
    this.dragEventTarget = event;
  }

  onLongPressEnd({ model }: { model: TableColumnInternal<Row> }) {
    this.dragEventTarget = undefined;

    // delay resetting so sort can be
    // prevented if we were dragging
    setTimeout(() => {
      // datatable component creates copies from columns on reorder
      // set dragging to false on new objects
      const column = this._columns.find(c => c.$$id === model.$$id);
      if (column && 'dragging' in column) {
        column.dragging = false;
      }
    }, 5);
  }

  @HostBinding('style.width')
  get headerWidth(): string {
    if (this.scrollbarH) {
      const width = this.verticalScrollVisible
        ? this.innerWidth - this.scrollbarHelper.width
        : this.innerWidth;
      return width + 'px';
    }

    return '100%';
  }

  onColumnResized({ width, column }: { width: number; column: TableColumnInternal }): void {
    this.resize.emit(this.makeResizeEvent(width, column));
  }

  onColumnResizing({ width, column }: { width: number; column: TableColumnInternal }): void {
    this.resizing.emit(this.makeResizeEvent(width, column));
  }

  private makeResizeEvent(
    width: number,
    column: TableColumnInternal<Row>
  ): ColumnResizeEventInternal {
    if (column.minWidth && width <= column.minWidth) {
      width = column.minWidth;
    } else if (column.maxWidth && width >= column.maxWidth) {
      width = column.maxWidth;
    }
    return {
      column,
      prevValue: column.width,
      newValue: width
    };
  }

  onColumnReordered(event: ReorderEventInternal): void {
    const column = this.getColumn(event.newValue);
    column.isTarget = false;
    column.targetMarkerContext = undefined;
    this.reorder.emit(event);
  }

  onTargetChanged({ prevIndex, newIndex, initialIndex }: TargetChangedEvent): void {
    if (prevIndex || prevIndex === 0) {
      const oldColumn = this.getColumn(prevIndex);
      oldColumn.isTarget = false;
      oldColumn.targetMarkerContext = undefined;
    }
    if (newIndex || newIndex === 0) {
      const newColumn = this.getColumn(newIndex);
      newColumn.isTarget = true;

      if (initialIndex !== newIndex) {
        newColumn.targetMarkerContext = {
          class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')
        };
      }
    }
  }

  getColumn(index: number): any {
    const leftColumnCount = this._columnsByPin[0].columns.length;
    if (index < leftColumnCount) {
      return this._columnsByPin[0].columns[index];
    }

    const centerColumnCount = this._columnsByPin[1].columns.length;
    if (index < leftColumnCount + centerColumnCount) {
      return this._columnsByPin[1].columns[index - leftColumnCount];
    }

    return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
  }

  onSort({ column, prevValue, newValue }: InnerSortEvent): void {
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

  calcNewSorts(
    column: SortableTableColumnInternal,
    prevValue: SortDirection | undefined,
    newValue: SortDirection | undefined
  ): SortPropDir[] {
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

  setStylesByGroup() {
    this._styleByGroup.left = this.calcStylesByGroup('left');
    this._styleByGroup.center = this.calcStylesByGroup('center');
    this._styleByGroup.right = this.calcStylesByGroup('right');
    if (!this.destroyed) {
      this.cd.detectChanges();
    }
  }

  calcStylesByGroup(group: 'center' | 'right' | 'left'): NgStyle['ngStyle'] {
    const widths = this._columnGroupWidths;

    if (group === 'center') {
      return {
        transform: `translateX(${this.offsetX * -1}px)`,
        width: `${widths[group]}px`,
        willChange: 'transform'
      };
    }

    return {
      width: `${widths[group]}px`
    };
  }
}
