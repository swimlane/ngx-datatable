import {
  Component, Input, PipeTransform, HostBinding,
  Output, EventEmitter, HostListener, ElementRef,
  Renderer, ChangeDetectionStrategy, OnDestroy
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
export class DataTableBodyCellComponent implements OnDestroy {

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

  private unsub: Function = () => {};

  constructor(elementRef: ElementRef, renderer: Renderer) {
    let el = this.element = elementRef.nativeElement;
    renderer.setElementClass(el, 'datatable-body-cell', true);

    /*
    if( focus cell )
      this.unsub = renderer.listen(el, 'keydown', (e: KeyboardEvent) => {
        const keyCode = e.keyCode;
        const isTargetCell = e.target === this.element;

        const isAction =
          keyCode === Keys.down ||
          keyCode === Keys.up ||
          keyCode === Keys.left ||
          keyCode === Keys.right;

        if(isAction && isTargetCell)
          e.preventDefault();
          e.stopPropagation();
            // TODO handle focus
      });
    */
  }

  @HostListener('focus', ['$event'])
  onFocus(event): void {
    this.isFocused = true;
  }

  @HostListener('blur', ['$event'])
  onBlur(event): void {
    this.isFocused = false;
  }

  calcSortDir(sorts): any {
    if(!sorts) return;

    const sort = sorts.find(s => {
      return s.prop === this.column.prop;
    });

    if(sort) return sort.dir;
  }

  ngOnDestroy() {
    this.unsub();
  }

}
