import {
  Component,
  Output,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { StateService } from '../../services/State';
import { translateXY } from '../../utils/translate';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      [style.width]="state.columnGroupWidths.total + 'px'"
      class="datatable-header-inner"
      orderable
      (onReorder)="columnReordered($event)">
      <div
        class="datatable-row-left"
        [ngStyle]="stylesByGroup('left')"
        *ngIf="state.columnsByPin.left.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [model]="column"
          (onColumnChange)="onColumnChange.emit($event)">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-center"
        [ngStyle]="stylesByGroup('center')"
        *ngIf="state.columnsByPin.center.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [model]="column"
          (onColumnChange)="onColumnChange.emit($event)">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-right"
        [ngStyle]="stylesByGroup('right')"
        *ngIf="state.columnsByPin.right.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [model]="column"
          (onColumnChange)="onColumnChange.emit($event)">
        </datatable-header-cell>
      </div>
    </div>
  `,
  host: {
    '[style.width]': 'headerWidth',
    '[style.height]': 'headerHeight'
  }
})
export class DataTableHeader {

  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  get headerWidth() {
    if(this.state.options.scrollbarH)
      return this.state.innerWidth + 'px';

    return '100%';
  }

  get headerHeight() {
    let height = this.state.options.headerHeight;
    if(height !== 'auto') return `${height}px`;
    return height;
  }

  constructor(private state: StateService, elm: ElementRef) {
    elm.nativeElement.classList.add('datatable-header');
  }

  columnResized(width, column) {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if(width >= column.maxWidth) {
      width = column.maxWidth;
    }

    column.width = width;

    this.onColumnChange.emit({
      type: 'resize',
      value: column
    });
  }

  columnReordered({ prevIndex, newIndex, model }) {
    this.state.options.columns.splice(prevIndex, 1);
    this.state.options.columns.splice(newIndex, 0, model);

    this.onColumnChange.emit({
      type: 'reorder',
      value: model
    });
  }

  stylesByGroup(group) {
    const widths = this.state.columnGroupWidths;
    const offsetX = this.state.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.state.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
