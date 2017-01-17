import {
  Component, Input, PipeTransform, HostBinding, 
  Output, EventEmitter, HostListener, ElementRef
} from '@angular/core';

import { deepValueGetter, Keys } from '../../utils';
import { SortDirection } from '../../types';

@Component({
  selector: 'datatable-body-cell',
  template: `
    <div class="datatable-body-cell-label">
      <label
        *ngIf="column.checkboxable" 
        class="datatable-checkbox">
        <input 
          type="checkbox"
          [checked]="isSelected"
          (click)="onCheckboxChange($event)" 
        />
      </label>
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
  host: {
    class: 'datatable-body-cell'
  }
})
export class DataTableBodyCellComponent {

  @Input() row: any;
  @Input() column: any;
  @Input() rowHeight: number;
  @Input() isSelected: boolean;

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.calcSortDir = this.calcSortDir(val);
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();
   
  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-body-cell';
    if(this.column.cssClasses) cls += ' ' + this.column.cssClasses;
    return cls;
  }

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
    if (!this.row || !this.column || !this.column.prop) return '';
    const val = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;

    if(userPipe) return userPipe.transform(val);
    if(val !== undefined) return val;
    return '';
  }

  sortDir: SortDirection;
  element: any;
  _sorts: any[];

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
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
  onDblClick(event: MouseEvent): void {
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
  onKeyDown(event: KeyboardEvent): void {
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

  onCheckboxChange(event): void {
    this.activate.emit({
      type: 'checkbox',
      event,
      row: this.row,
      column: this.column,
      value: this.value,
      cellElement: this.element
    });
  }

  calcSortDir(sorts: any[]): any {
    if(!sorts) return;

    const sort = sorts.find((s: any) => {
      return s.prop === this.column.prop;
    });

    if(sort) return sort.dir;
  }

}
