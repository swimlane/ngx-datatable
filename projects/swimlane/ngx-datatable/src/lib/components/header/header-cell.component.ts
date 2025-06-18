import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { nextSortDir } from '../../utils/sort';
import {
  HeaderCellContext,
  SelectionType,
  SortDirection,
  SortPropDir,
  SortType
} from '../../types/public.types';
import { NgTemplateOutlet } from '@angular/common';
import { InnerSortEvent, TableColumnInternal } from '../../types/internal.types';
import { fromEvent, Subscription, takeUntil } from 'rxjs';
import { getPositionFromEvent } from '../../utils/events';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div class="datatable-header-cell-template-wrap">
      @if (isTarget) {
      <ng-template
        [ngTemplateOutlet]="targetMarkerTemplate!"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      } @if (isCheckboxable) {
      <label class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit()" />
      </label>
      } @if (column.headerTemplate) {
      <ng-template
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      } @else {
      <span class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()">
          {{ name }}
        </span>
      </span>
      }
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
    @if (column.resizeable) {
    <span
      class="resize-handle"
      (mousedown)="onMousedown($event)"
      (touchstart)="onMousedown($event)"
    ></span>
    }
  `,
  host: {
    'class': 'datatable-header-cell',
    '[attr.resizeable]': 'column.resizeable'
  },
  styleUrl: './header-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class DataTableHeaderCellComponent implements OnInit, OnDestroy {
  private cd = inject(ChangeDetectorRef);

  @Input() sortType!: SortType;
  @Input() sortAscendingIcon?: string;
  @Input() sortDescendingIcon?: string;
  @Input() sortUnsetIcon?: string;

  @Input() isTarget?: boolean;
  @Input() targetMarkerTemplate?: TemplateRef<any>;
  @Input() targetMarkerContext: any;
  @Input() enableClearingSortState = false;

  _allRowsSelected?: boolean;

  @Input() set allRowsSelected(value) {
    this._allRowsSelected = value;
    this.cellContext.allRowsSelected = value;
  }
  get allRowsSelected() {
    return this._allRowsSelected;
  }

  @Input() selectionType?: SelectionType;

  @Input() set column(column: TableColumnInternal) {
    this._column = column;
    this.cellContext.column = column;
    this.cd.markForCheck();
  }

  get column(): TableColumnInternal {
    return this._column;
  }

  @HostBinding('style.height.px')
  @Input()
  headerHeight!: number;

  @Input() set sorts(val: SortPropDir[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.cellContext.sortDir = this.sortDir;
    this.sortClass = this.calcSortClass(this.sortDir);
    this.cd.markForCheck();
  }

  get sorts(): SortPropDir[] {
    return this._sorts;
  }

  @Output() sort = new EventEmitter<InnerSortEvent>();
  @Output() select = new EventEmitter<void>();
  @Output() columnContextmenu = new EventEmitter<{
    event: MouseEvent;
    column: TableColumnInternal;
  }>(false);
  @Output() resize = new EventEmitter<{ width: number; column: TableColumnInternal }>();
  @Output() resizing = new EventEmitter<{ width: number; column: TableColumnInternal }>();

  @HostBinding('class')
  get columnCssClasses(): string {
    let cls = 'datatable-header-cell';

    if (this.column.sortable) {
      cls += ' sortable';
    }
    if (this.column.resizeable) {
      cls += ' resizeable';
    }
    if (this.column.headerClass) {
      if (typeof this.column.headerClass === 'string') {
        cls += ' ' + this.column.headerClass;
      } else if (typeof this.column.headerClass === 'function') {
        const res = this.column.headerClass({
          column: this.column
        });

        if (typeof res === 'string') {
          cls += ' ' + res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              cls += ` ${k}`;
            }
          }
        }
      }
    }

    const sortDir = this.sortDir;
    if (sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

  @HostBinding('attr.title')
  get name(): string | undefined {
    // guaranteed to have a value by setColumnDefaults() in column-helper.ts
    return this.column.headerTemplate === undefined ? this.column.name : undefined;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number | undefined {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number | undefined {
    return this.column.maxWidth;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('tabindex') get tabindex(): number {
    return this.column.sortable ? 0 : -1;
  }

  get isCheckboxable(): boolean | undefined {
    return this.column.headerCheckboxable;
  }

  sortClass?: string;
  sortDir?: SortDirection;

  cellContext: HeaderCellContext;

  private _column!: TableColumnInternal;
  private _sorts!: SortPropDir[];
  private element = inject(ElementRef).nativeElement;
  private subscription?: Subscription;

  constructor() {
    this.cellContext = {
      column: this.column,
      sortDir: this.sortDir,
      sortFn: () => this.onSort(),
      allRowsSelected: this.allRowsSelected,
      selectFn: () => this.select.emit()
    };
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.columnContextmenu.emit({ event: $event, column: this.column });
    if (this.column.draggable) {
      $event.preventDefault();
    }
  }

  @HostListener('keydown.enter')
  enter(): void {
    this.onSort();
  }

  ngOnInit() {
    this.sortClass = this.calcSortClass(this.sortDir);
    // If there is already a default sort then start the counter with 1.
    if (this.sortDir) {
      this.totalSortStatesApplied = 1;
    }
  }

  ngOnDestroy() {
    this.destroySubscription();
  }

  calcSortDir(sorts: SortPropDir[]): any {
    if (sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if (sort) {
        return sort.dir;
      }
    }
  }
  // Counter to reset sort once user sort asc and desc.
  private totalSortStatesApplied = 0;
  onSort(): void {
    if (!this.column.sortable) {
      return;
    }

    this.totalSortStatesApplied++;
    let newValue = nextSortDir(this.sortType, this.sortDir);
    // User has done both direction sort so we reset the next sort.
    if (this.enableClearingSortState && this.totalSortStatesApplied === 3) {
      newValue = undefined;
      this.totalSortStatesApplied = 0;
    }
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

  calcSortClass(sortDir: SortDirection | undefined): string | undefined {
    if (!this.cellContext.column.sortable) {
      return undefined;
    }
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon ?? 'datatable-icon-up'}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon ?? 'datatable-icon-down'}`;
    } else {
      return `sort-btn ${this.sortUnsetIcon ?? 'datatable-icon-sort-unset'}`;
    }
  }

  protected onMousedown(event: MouseEvent | TouchEvent): void {
    const isMouse = event instanceof MouseEvent;
    const initialWidth = this.element.clientWidth;
    const { screenX } = getPositionFromEvent(event);
    event.stopPropagation();

    const mouseup = fromEvent<MouseEvent | TouchEvent>(document, isMouse ? 'mouseup' : 'touchend');
    this.subscription = mouseup.subscribe(() => this.onMouseup());

    const mouseMoveSub = fromEvent<MouseEvent | TouchEvent>(
      document,
      isMouse ? 'mousemove' : 'touchmove'
    )
      .pipe(takeUntil(mouseup))
      .subscribe((e: MouseEvent | TouchEvent) => this.move(e, initialWidth, screenX));

    this.subscription.add(mouseMoveSub);
  }

  private onMouseup(): void {
    if (this.subscription && !this.subscription.closed) {
      this.destroySubscription();
      this.resize.emit({ width: this.element.clientWidth, column: this.column });
    }
  }

  private move(
    event: MouseEvent | TouchEvent,
    initialWidth: number,
    mouseDownScreenX: number
  ): void {
    const movementX = getPositionFromEvent(event).screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    this.resizing.emit({ width: newWidth, column: this.column });
  }

  private destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
