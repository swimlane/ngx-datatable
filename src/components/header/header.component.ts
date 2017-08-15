import {
  Component, Output, EventEmitter, Input, HostBinding, ChangeDetectionStrategy
} from '@angular/core';
import { SortType, SelectionType } from '../../types';
import { columnsByPin, allColumnGroupWidths, columnGroupWidths, allColumnsByPinArr, columnsByPinArr, translateXY } from '../../utils';
import { DataTableColumnDirective } from '../columns';
import { mouseEvent } from '../../events';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      [style.width.px]="allColumnGroupWidths.total"
      class="datatable-header-inner">
      <table style="width=100%"><tr><td>
      <div
        *ngFor="let colGroup of allColumns; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="stylesByGroup(colGroup.type)">
        <datatable-header-cell
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
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [allRowsSelected]="allRowsSelected"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)">
        </datatable-header-cell>
      </div>
      </td>    
      </tr></table>
    </div>
  `,
  host: {
    class: 'datatable-header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderComponent {

/*

  <td>
        <div
          *ngIf="allColumns[2]"
          [class]="'datatable-row-' + allColumns[2].type"
          [ngStyle]="stylesByGroup(allColumns[2].type)">
          <datatable-header-cell
            *ngFor="let column of allColumns[2].columns; trackBy: columnTrackingFn"
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
            [column]="column"
            [sortType]="sortType"
            [sorts]="sorts"
            [selectionType]="selectionType"
            [sortAscendingIcon]="sortAscendingIcon"
            [sortDescendingIcon]="sortDescendingIcon"
            [allRowsSelected]="allRowsSelected"
            (sort)="onSort($event)"
            (select)="select.emit($event)"
            (columnContextmenu)="columnContextmenu.emit($event)">
          </datatable-header-cell>
        </div>
      </td>

*/

  @Input() sortAscendingIcon: any;
  @Input() sortDescendingIcon: any;
  @Input() scrollbarH: boolean;

  //@Input() innerWidth: number;
  _innerWidth: number;

  @Input() set innerWidth(val: number){
    this._innerWidth = val;

    if (this._columns){    
      const colByPin = columnsByPin(this._columns);
      this.columnGroupWidths = columnGroupWidths(colByPin, this._columns.filter(column => !column.isGroup));       
    }
  }
    
  get innerWidth(): number{
    return this._innerWidth
  }

  @Input() offsetX: number;
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

    const colsByPin = columnsByPin(val);
    this.columnsByPin = columnsByPinArr(val);
    //this.columnsByPin = allColumnsByPinArr(val);    

    this.allColumns = allColumnsByPinArr(val);    

    this.columnGroupWidths = columnGroupWidths(colsByPin, val.filter(column => !column.isGroup));
    //this.columnGroupWidths = allColumnGroupWidths(colsByPin, val);
    this.allColumnGroupWidths = allColumnGroupWidths(colsByPin, val);
  }

  get columns(): any[] {
    return this._columns;
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() reorder: EventEmitter<any> = new EventEmitter();
  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);

  columnsByPin: any;
  columnGroupWidths: any;
  allColumns: any;
  allColumnGroupWidths: any;
  _columns: any[];
  _headerHeight: string;

  onLongPressStart({ event, model }: { event: any, model: any }) {
    model.dragging = true;
    this.dragEventTarget = event;
  }

  onLongPressEnd({ event, model }: { event: any, model: any }) {
    this.dragEventTarget = event;

    // delay resetting so sort can be
    // prevented if we were dragging
    setTimeout(() => {
      model.dragging = false;
    }, 5);
  }

  @HostBinding('style.width')
  get headerWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    }

    return '100%';
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
    this.reorder.emit({
      column: model,
      prevValue: prevIndex,
      newValue: newIndex
    });
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

  stylesByGroup(group: string): any {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;
    var styles = {};
    var widthCenterPlusGroup;


     styles = {
          width: `${widths[ group ]}px`
        };    

    /*
      if (group === 'center'){
        widthCenterPlusGroup = widths['center'] + widths['group']
        styles = {
          width: `${widthCenterPlusGroup}px`
        };
      }
      else{
        styles = {
          width: `${widths[ group ]}px`
        };        
      }
*/

/*
    const styles = {
      width: `${widths[group]}px`
    };

 else if (group === 'group') {
      //const totalDiff = widths.total - this.innerWidth;
      //const offset = totalDiff * -1;
      //translateXY(styles, offset, 0);
      translateXY(styles, offsetX * -1, 0);
    }      

*/
    
    if (group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    }    
    else if (group === 'grouping') {
      //const totalDiff = widths.total - this.innerWidth;
      //const totalDiff = this.innerWidth - widths.total;

      //const offset = widths.total * -1;
      translateXY(styles, widths.total, -42);
      //TODO: sort out height

    }    
    else if (group === 'right') {
      const totalDiff = widths.total - this.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
