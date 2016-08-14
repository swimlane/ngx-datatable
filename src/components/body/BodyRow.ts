import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { translateXY } from '../../utils/translate';
import { StateService } from '../../services/State';

@Component({
  selector: 'datatable-body-row',
  template: `
    <div>
      <div
        class="datatable-row-left"
        *ngIf="state.columnsByPin.left.length"
        [ngStyle]="stylesByGroup('left')"
        [style.width]="state.columnGroupWidths.left + 'px'">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.left"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-center"
        [style.width]="state.columnGroupWidths.center + 'px'"
        [ngStyle]="stylesByGroup('center')"
        *ngIf="state.columnsByPin.center.length">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.center"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-right"
        *ngIf="state.columnsByPin.right.length"
        [ngStyle]="stylesByGroup('right')"
        [style.width]="state.columnGroupWidths.right + 'px'">
        <datatable-body-cell
          *ngFor="let column of state.columnsByPin.right"
          [row]="row"
          [column]="column">
        </datatable-body-cell>
      </div>
    </div>
  `
})
export class DataTableBodyRow {

  @Input() row: any;

  @HostBinding('class.active')
  get isSelected() {
    return this.state.selected &&
      this.state.selected.indexOf(this.row) > -1;
  }

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body-row');
  }

  stylesByGroup(group) {
    const widths = this.state.columnGroupWidths;
    const offsetX = this.state.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.state.innerWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.state.scrollbarWidth) * -1;
      translateXY(styles, offset, 0);
    }

    console.log('hi', styles)

    return styles;
  }

}
