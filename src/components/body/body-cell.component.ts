import {
  Component, Input, PipeTransform, HostBinding, 
  Output, EventEmitter, HostListener, ElementRef,
  Renderer, ChangeDetectionStrategy
} from '@angular/core';

import { deepValueGetter, Keys } from '../../utils';
import { SortDirection } from '../../types';

@Component({
  selector: 'datatable-body-cell',
  template: `
    <div class="datatable-body-cell-label">
      <span
        *ngIf="!column.cellTemplate"
        [innerHTML]="value">
      </span>
      <template
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngOutletContext]="{ value: value, row: row, column: column }">
      </template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyCellComponent {

  @Input() row: any;
  @Input() column: any;
  @Input() rowHeight: number;

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.calcSortDir = this.calcSortDir(val);
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.active')
  isFocused: boolean = false;

  @HostBinding('class.sort-active')
  get isSortActive(): boolean {
    return !this.sortDir;
  }

  @HostBinding('class.sort-asc')
  get isSortAscending(): boolean {
    return this.sortDir === SortDirection.asc;
  }

  @HostBinding('class.sort-desc')
  get isSortDescending(): boolean {
    return this.sortDir === SortDirection.desc;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('style.height')
  get height(): string|number {
    const height = this.rowHeight;
    if(isNaN(height)) return height;
    return height + 'px';
  }

  get value(): any {
    if (!this.row || !this.column) return '';
    const prop = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;
    return userPipe ? userPipe.transform(prop) : prop;
  }

  private sortDir: SortDirection;
  private element: any;
  private _sorts: any[];

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    renderer.setElementClass(this.element, 'datatable-body-cell', true);
  }

  @HostListener('focus', ['$event'])
  onFocus(event): void {
    this.isFocused = true;
  }

  @HostListener('blur', ['$event'])
  onBlur(event): void {
    this.isFocused = false;
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    this.activate.emit({
      type: 'click',
      event,
      row: this.row,
      column: this.column,
      value: this.value,
      cellElement: this.element
    });
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event): void {
    this.activate.emit({
      type: 'dblclick',
      event,
      row: this.row,
      column: this.column,
      value: this.value,
      cellElement: this.element
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event): void {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this.element;
    
    const isAction = 
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if(isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        column: this.column,
        value: this.value,
        cellElement: this.element
      });
    }
  }

  calcSortDir(sorts): any {
    if(!sorts) return;

    const sort = sorts.find(s => {
      return s.prop === this.column.prop;
    });

    if(sort) return sort.dir;
  }
  
}
