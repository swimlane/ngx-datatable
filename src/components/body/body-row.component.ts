import { 
  Component, Input, HostBinding, ElementRef, ChangeDetectionStrategy,
  Renderer, Output, EventEmitter , HostListener
} from '@angular/core';

import { 
  columnsByPin, columnGroupWidths, columnsByPinArr, 
  translateXY, Keys, scrollbarWidth
} from '../../utils';

@Component({
  selector: 'datatable-body-row',
  template: `
    <div
      *ngFor="let colGroup of columnsByPin; let i = index; trackBy: $colGroup?.type"
      class="datatable-row-{{colGroup.type}} datatable-row-group"
      [ngStyle]="stylesByGroup(colGroup.type)">
      <datatable-body-cell
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: column?.$$id"
        tabindex="-1"
        [row]="row"
        [column]="column"
        [rowHeight]="rowHeight"
        (activate)="onActivate($event, ii)">
      </datatable-body-cell>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
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

  @Input() row: any;
  @Input() offsetX: number;

  @HostBinding('style.height.px')
  @Input() rowHeight: number;

  @HostBinding('class.active')
  @Input() isSelected: boolean;

  @HostBinding('class.datatable-row-even')
  get isEvenRow(): boolean {
    return this.row.$$index % 2 === 0;
  }

  @HostBinding('class.datatable-row-odd')
  get isOddRow(): boolean {
    return this.row.$$index % 2 !== 0;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();

  private element: any;
  private columnGroupWidths: any;
  private columnsByPin: any;
  private _columns: any[];
  private _innerWidth: number;

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    renderer.setElementClass(this.element, 'datatable-body-row', true);
  }

  stylesByGroup(group) {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + scrollbarWidth) * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

  onActivate(event, index) {
    event.cellIndex = index;
    event.rowElement = this.element;
    this.activate.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event): void {
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

  recalculateColumns(val: any[] = this.columns) {
    const colsByPin = columnsByPin(val);
    this.columnsByPin = columnsByPinArr(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

}
