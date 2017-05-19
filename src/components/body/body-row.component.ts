import {
  Component, Input, HostBinding, ElementRef, Output, EventEmitter, HostListener
} from '@angular/core';

import {
  columnsByPin, columnGroupWidths, columnsByPinArr, translateXY, Keys
} from '../../utils';
import { ScrollbarHelper } from '../../services';
import { MouseEvent, KeyboardEvent } from '../../events';

@Component({
  selector: 'datatable-body-row',
  template: `
    <div
      *ngFor="let colGroup of columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{colGroup.type}} datatable-row-group"
      [ngStyle]="stylesByGroup(colGroup.type)">
      <datatable-body-cell
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [isSelected]="isSelected"
        [column]="column"
        [rowHeight]="rowHeight"
        (activate)="onActivate($event, ii)">
      </datatable-body-cell>
    </div>
  `
})
export class DataTableBodyRowComponent {

  @Input() set columns(val: any[]) {
    this._columns = val;
    this.recalculateColumns(val);
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() set innerWidth(val: number) {
    this._innerWidth = val;
    this.recalculateColumns();
  }

  get innerWidth(): number {
    return this._innerWidth;
  }

  @Input() rowClass: any;
  @Input() row: any;
  @Input() offsetX: number;
  @Input() isSelected: boolean;

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if(this.isSelected) cls += ' active';
    if(this.row.$$index % 2 !== 0) cls += ' datatable-row-odd';
    if(this.row.$$index % 2 === 0) cls += ' datatable-row-even';

    if(this.rowClass) {
      const res = this.rowClass(this.row);
      if(typeof res === 'string') {
        cls += ` ${res}`;
      } else if(typeof res === 'object') {
        const keys = Object.keys(res);
        for(const k of keys) {
          if(res[k] === true) cls += ` ${k}`;
        }
      }
    }

    return cls;
  }

  @HostBinding('style.height.px')
  @Input() rowHeight: number;

  @HostBinding('style.width.px')
  get columnsTotalWidths(): string {
    return this.columnGroupWidths.total;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();

  element: any;
  columnGroupWidths: any;
  columnsByPin: any;
  _columns: any[];
  _innerWidth: number;

  constructor(private scrollbarHelper: ScrollbarHelper, element: ElementRef) {
    this.element = element.nativeElement;
  }

  trackByGroups(index: number, colGroup: any): any {
    return colGroup.type;
  }

  columnTrackingFn(index: number, column: any): any {
    return column.$$id;
  }

  stylesByGroup(group: string) {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

  onActivate(event: any, index: number) {
    event.cellIndex = index;
    event.rowElement = this.element;
    this.activate.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetRow = event.target === this.element;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if(isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        rowElement: this.element
      });
    }
  }

  recalculateColumns(val: any[] = this.columns): void {
    const colsByPin = columnsByPin(val);
    this.columnsByPin = columnsByPinArr(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

}
