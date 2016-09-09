import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { translateXY } from '../../utils/translate';
import { StateService } from '../../services/State';

@Component({
  selector: 'datatable-body-row',
  template: `
    <div>
      <div
        class="datatable-row-left datatable-row-group"
        *ngIf="state.columnsByPin(key).left.length"
        [ngStyle]="stylesByGroup('left')"
        [style.width]="state.columnGroupWidths(key).left + 'px'">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin(key).left"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-center datatable-row-group"
        [style.width]="state.columnGroupWidths(key).center + 'px'"
        [ngStyle]="stylesByGroup('center')"
        *ngIf="state.columnsByPin(key).center.length">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin(key).center"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-right datatable-row-group"
        *ngIf="state.columnsByPin(key).right.length"
        [ngStyle]="stylesByGroup('right')"
        [style.width]="state.columnGroupWidths(key).right + 'px'">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin(key).right"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
    </div>
  `
})
export class DataTableBodyRow {

  @Input() key: string;
  @Input() row: any;

  @HostBinding('class.active')
  get isSelected() {
    return this.state.getSelected(this.key) &&
        this.state.getSelected(this.key).indexOf(this.row) > -1;
  }

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body-row');
  }

  stylesByGroup(group) {
    const widths = this.state.columnGroupWidths(this.key);
    const offsetX = this.state.getOffsetX(this.key);

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.state.getInnerWidth(this.key);
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.state.getScrollbarWidth(this.key)) * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
