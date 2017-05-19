import {
  Component, Input, PipeTransform, HostBinding, ViewChild,
  Output, EventEmitter, HostListener, ElementRef, ViewContainerRef, OnDestroy
} from '@angular/core';

import { Keys } from '../../utils';
import { SortDirection } from '../../types';
import { TableColumn } from '../../types/table-column.type';
import { MouseEvent, KeyboardEvent } from '../../events';

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
        [title]="value"
        [innerHTML]="value">
      </span>
      <ng-template #cellTemplate
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngOutletContext]="{
          value: value,
          row: row,
          column: column,
          isSelected: isSelected,
          onCheckboxChangeFn: onCheckboxChangeFn,
          activateFn: activateFn
        }">
      </ng-template>
    </div>
  `,
  host: {
    class: 'datatable-body-cell'
  }
})
export class DataTableBodyCellComponent implements OnDestroy {

  @Input() row: any;
  @Input() column: TableColumn;
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

  @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;
   
  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-body-cell';
    if(this.column.cellClass) {
      if(typeof this.column.cellClass === 'string') {
        cls += ' ' + this.column.cellClass;
      } else if(typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({ 
          row: this.row, 
          column: this.column, 
          value: this.value 
        });

        if(typeof res === 'string') {
          cls += res;
        } else if(typeof res === 'object') {
          const keys = Object.keys(res);
          for(const k of keys) {
            if(res[k] === true) cls += ` ${k}`;
          }
        }
      }
    }
    if(!this.sortDir) cls += ' sort-active';
    if(this.isFocused) cls += ' active';
    if(this.sortDir === SortDirection.asc) cls += ' sort-asc';
    if(this.sortDir === SortDirection.desc) cls += ' sort-desc';
    return cls;
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
    const val = this.column.$$valueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;

    if(userPipe) return userPipe.transform(val);
    if(val !== undefined) return val;
    return '';
  }

  sortDir: SortDirection;
  element: any;
  _sorts: any[];
  isFocused: boolean = false;
  onCheckboxChangeFn = this.onCheckboxChange.bind(this);
  activateFn = this.activate.emit.bind(this.activate);

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnDestroy(): void {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
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

  onCheckboxChange(event: any): void {
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
