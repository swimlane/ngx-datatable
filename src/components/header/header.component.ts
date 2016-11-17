import {
  Component, Output, ElementRef, Renderer, EventEmitter, 
  Input, HostBinding, ChangeDetectionStrategy
} from '@angular/core';
import { SortType } from '../../types';
import { columnsByPin, columnGroupWidths, columnsByPinArr, translateXY } from '../../utils';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      [style.width.px]="columnGroupWidths.total"
      class="datatable-header-inner">
      <div
        *ngFor="let colGroup of columnsByPin; trackBy: colGroup?.type"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="stylesByGroup(colGroup.type)">
        <datatable-header-cell
          *ngFor="let column of colGroup.columns; trackBy: column?.$$id"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          (longPress)="drag = true"
          (longPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [dragModel]="column"
          [headerHeight]="headerHeight"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          (sort)="onSort($event)">
        </datatable-header-cell>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderComponent {

  @Input() sortAscendingIcon: any;
  @Input() sortDescendingIcon: any;
  @Input() scrollbarH: boolean;
  @Input() innerWidth: number;
  @Input() offsetX: number;
  @Input() sorts: any[];
  @Input() sortType: SortType;

  @HostBinding('style.height')
  @Input() set headerHeight(val: any) {
    if(val !== 'auto') { 
      this._headerHeight = `${val}px`;
    } else {
      this._headerHeight = val;
    }
  }

  get headerHeight() {
    return this._headerHeight;
  }

  @Input() set columns(val: any[]) {
    this._columns = val;

    const colsByPin = columnsByPin(val);
    this.columnsByPin = columnsByPinArr(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

  get columns(): any[] { 
    return this._columns; 
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() reorder: EventEmitter<any> = new EventEmitter();
  @Output() resize: EventEmitter<any> = new EventEmitter();

  private columnsByPin: any;
  private columnGroupWidths: any;
  private _columns: any[];
  private _headerHeight: string;

  @HostBinding('style.width')
  private get headerWidth(): string {
    if(this.scrollbarH) {
      return this.innerWidth + 'px';
    }

    return '100%';
  }

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-header', true);
  }

  onColumnResized(width, column) {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if(width >= column.maxWidth) {
      width = column.maxWidth;
    }
    
    this.resize.emit({
      column,
      prevValue: column.width,
      newValue: width
    });
  }

  onColumnReordered({ prevIndex, newIndex, model }) {
    this.reorder.emit({
      column: model,
      prevValue: prevIndex,
      newValue: newIndex
    });
  }

  onSort({ column, prevValue, newValue }) {
    const sorts = this.calcNewSorts(column, prevValue, newValue);
    this.sort.emit({
      sorts,
      column,
      prevValue,
      newValue
    });
  }

  calcNewSorts(column: any, prevValue: number, newValue: number) {
    let idx = 0;
    
    let sorts = this.sorts.map((s, i) => { 
      s = Object.assign({}, s); 
      if(s.prop === column.prop) idx = i;
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

  stylesByGroup(group) {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
