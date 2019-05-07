import {
  Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef,
  ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChildren, QueryList, HostListener
} from '@angular/core';
import { SortType, SelectionType } from '../../types';
import { columnsByPin, columnGroupWidths, columnsByPinArr, translateXY, Keys } from '../../utils';
import { DataTableColumnDirective } from '../columns';
import { DataTableHeaderCellComponent } from '.';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="_columnGroupWidths.total"
      class="datatable-header-inner"
      role="row">
      <div
        *ngFor="let colGroup of _columnsByPin; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="_styleByGroup[colGroup.type]">
        <datatable-header-cell
          #headerCells
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
          [allRowsSelected]="allRowsSelected"
          [offsetX]="offsetX"
          [tabFocusable]="tabFocusColumnName === column.name"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
          (scroll)="scroll.emit($event)">
        </datatable-header-cell>
      </div>
    </div>
  `,
  host: {
    class: 'datatable-header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderComponent implements AfterViewInit {

  @Input() sortAscendingIcon: any;
  @Input() sortDescendingIcon: any;
  @Input() scrollbarH: boolean;
  @Input() dealsWithGroup: boolean;
  @Input() targetMarkerTemplate: any;
  
  targetMarkerContext: any;
  tabFocusColumnName: string;

  @Input() set innerWidth(val: number) {
    this._innerWidth = val;

    if (this._columns) {    
      const colByPin = columnsByPin(this._columns);
      this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
      this.setStylesByGroup();
    }
  }
    
  get innerWidth(): number {
    return this._innerWidth;
  }

  @Input() sorts: any[];
  @Input() sortType: SortType;
  @Input() allRowsSelected: boolean;
  @Input() selectionType: SelectionType;
  @Input() reorderable: boolean;

  dragEventTarget: any;

  @HostBinding('style.height')
  @Input() set headerHeight(val: any) {
    if (val !== 'auto') {
      this._headerHeight = `${val}px`;
    } else {
      this._headerHeight = val;
    }
  }

  get headerHeight(): any {
    return this._headerHeight;
  }

  @Input() set columns(val: any[]) {
    this._columns = val;
    this.tabFocusColumnName = val[0] && val[0].name;

    const colsByPin = columnsByPin(val);
    this._columnsByPin = columnsByPinArr(val);
    this._columnGroupWidths = columnGroupWidths(colsByPin, val);
    this.setStylesByGroup();
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input()
  set offsetX(val: number) {
    this._offsetX = val;
    this.setStylesByGroup();
  }
  get offsetX() { return this._offsetX; }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() reorder: EventEmitter<any> = new EventEmitter();
  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);
  @Output() scroll: EventEmitter<any> = new EventEmitter();

  @ViewChildren('headerCells') headerCells: QueryList<DataTableHeaderCellComponent>;

  _columnsByPin: any;
  _columnGroupWidths: any;
  _innerWidth: number;
  _offsetX: number;
  _columns: any[];
  _headerHeight: string;
  _styleByGroup: {[prop: string]: {}} = {
    left: {},
    center: {},
    right: {}
  };

  constructor(private cd: ChangeDetectorRef, private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const nativeElem = <HTMLElement>this.elementRef.nativeElement;

    // Account for contents having style position: fixed (for scroll prevention). Calculate height necessary for cells.
    if (this.headerHeight && nativeElem.clientHeight === 0) {
      const headerCellElem = <HTMLElement>(
        (this.headerCells.first &&
          this.headerCells.first.elementRef.nativeElement)
      );
      if (headerCellElem && headerCellElem.clientHeight) {
        this.headerHeight = headerCellElem.clientHeight;
        nativeElem.style.minHeight = headerCellElem.clientHeight + 'px';
      }
    }
  }

  onLongPressStart({ event, model }: { event: any, model: any }) {
    model.dragging = true;
    this.dragEventTarget = event;
  }

  onLongPressEnd({ event, model }: { event: any, model: any }) {
    this.dragEventTarget = event;

    // delay resetting so sort can be
    // prevented if we were dragging
    setTimeout(() => {   
      // datatable component creates copies from columns on reorder
      // set dragging to false on new objects
      const column = this._columns.find(c => c.$$id === model.$$id);
      if (column) {
        column.dragging = false;
      }
    }, 5);
  }

  @HostBinding('style.width')
  get headerWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    }

    return '100%';
  }

  @HostListener('click', ['$event'])
  onclick(event: MouseEvent): void {
    this.tabFocusColumnName = (<HTMLElement>event.target).innerText;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    let targetHeader = (<HTMLElement>event.target).parentElement;
    while (targetHeader && targetHeader.tagName.toLowerCase() !== 'datatable-header-cell') {
      targetHeader = targetHeader.parentElement;
    }

    if (targetHeader) {
      if (event.keyCode === Keys.left) {
        let prevHeader = <HTMLElement>targetHeader.previousElementSibling;
  
        // Try previous column group.
        if (!prevHeader) {
          const prevHeaderGroup = <HTMLElement>targetHeader.parentElement.previousElementSibling;
          if (prevHeaderGroup && prevHeaderGroup.children.length > 0) {
            prevHeader = <HTMLElement>prevHeaderGroup.children[prevHeaderGroup.children.length - 1];
          }
        }
        
        if (prevHeader && prevHeader.firstElementChild) {
          (<HTMLElement>prevHeader.firstElementChild).focus();
          this.tabFocusColumnName = prevHeader.innerText.trim();
        }
      } else if (event.keyCode === Keys.right) {
        let nextHeader = <HTMLElement>targetHeader.nextElementSibling;
  
        // Try next column group.
        if (!nextHeader) {
          const nextHeaderGroup = <HTMLElement>targetHeader.parentElement.nextElementSibling;
          if (nextHeaderGroup && nextHeaderGroup.children.length > 0) {
            nextHeader = <HTMLElement>nextHeaderGroup.children[0];
          }
        }
  
        if (nextHeader && nextHeader.firstElementChild) {
          (<HTMLElement>nextHeader.firstElementChild).focus();
          this.tabFocusColumnName = nextHeader.innerText.trim();
        }
      }
    }
  }

  trackByGroups(index: number, colGroup: any): any {    
    return colGroup.type;
  }

  columnTrackingFn(index: number, column: any): any {
    return column.$$id;
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

  onTargetChanged({ prevIndex, newIndex, initialIndex }: any): void {
    if (prevIndex || prevIndex === 0) {
      const oldColumn = this.getColumn(prevIndex);
      oldColumn.isTarget = false;
      oldColumn.targetMarkerContext = undefined;
    }
    if (newIndex || newIndex === 0) {
      const newColumn = this.getColumn(newIndex);
      newColumn.isTarget = true;
      
      if (initialIndex !== newIndex) {
        newColumn.targetMarkerContext = {class: 'targetMarker '.concat( 
          initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')};
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

  onSort({ column, prevValue, newValue }: any): void {
    // if we are dragging don't sort!
    if (column.dragging) return;

    const sorts = this.calcNewSorts(column, prevValue, newValue);
    this.sort.emit({
      sorts,
      column,
      prevValue,
      newValue
    });
  }

  calcNewSorts(column: any, prevValue: number, newValue: number): any[] {
    let idx = 0;

    if (!this.sorts) {
      this.sorts = [];
    }

    const sorts = this.sorts.map((s, i) => {
      s = { ...s };
      if (s.prop === column.prop) idx = i;
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
    this.cd.detectChanges();
  }

  calcStylesByGroup(group: string): any {
    const widths = this._columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`
    };

    if (group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if (group === 'right') {
      const totalDiff = widths.total - this.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }
}
