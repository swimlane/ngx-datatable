import {
    Component,
    Output,
    ElementRef,
    EventEmitter,
    Input
} from '@angular/core';

import { StateService } from '../../services/State';
import { translateXY } from '../../utils/translate';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      [style.width]="state.columnGroupWidths(key).total + 'px'"
      class="datatable-header-inner"
      orderable
      (onReorder)="columnReordered($event)">
      <div
        class="datatable-row-left"
        [ngStyle]="stylesByGroup('left')"
        *ngIf="state.columnsByPin(key).left.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin(key).left"
          resizeable
          [key]="key"
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
        *ngIf="state.columnsByPin(key).center.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin(key).center"
          resizeable
          [key]="key"
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
        *ngIf="state.columnsByPin(key).right.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin(key).right"
          resizeable
          [key]="key"
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
  @Input() key: string;
  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  get headerWidth() {
    if(this.state.getOption(this.key, 'scrollbarH'))
      return this.state.getInnerWidth(this.key) + 'px';

    return '100%';
  }

  get headerHeight() {
    let height = this.state.getOption(this.key, 'headerHeight');
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
    let options = this.state.getOptions(this.key);
    options.columns.splice(prevIndex, 1);
    options.columns.splice(newIndex, 0, model);
    this.state.setOptions(this.key, options);

    this.onColumnChange.emit({
      type: 'reorder',
      value: model
    });
  }

  stylesByGroup(group) {
    const widths = this.state.columnGroupWidths(this.key);
    const offsetX = this.state.getOffsetX(this.key);

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.state.getInnerWidth(this.key);
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
