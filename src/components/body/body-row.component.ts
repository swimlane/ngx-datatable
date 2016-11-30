import {
  Component, Input, HostBinding, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef,
  Renderer, Optional, OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';

import {
  columnsByPin, columnGroupWidths, columnsByPinArr,
  translateXY, Keys, scrollbarWidth
} from '../../utils';

import { SelectionDirective } from '../../directives/selection.directive';

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
        [rowHeight]="rowHeight">
      </datatable-body-cell>
    </div>
  `,
  host: {
    class: 'datatable-body-row'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyRowComponent implements OnDestroy {

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
  isSelected = false;

  @HostBinding('class.datatable-row-even')
  get isEvenRow(): boolean {
    return this.row.$$index % 2 === 0;
  }

  @HostBinding('class.datatable-row-odd')
  get isOddRow(): boolean {
    return this.row.$$index % 2 !== 0;
  }

  private element: any;
  private columnGroupWidths: any;
  private columnsByPin: any;
  private _columns: any[];
  private _innerWidth: number;

  private unlistens: Function[] = [];
  private unsub = Subscription.EMPTY;

  constructor(element: ElementRef,
              renderer: Renderer,
              private cdr: ChangeDetectorRef, /*@Host()*/ @Optional()
              private selection: SelectionDirective) {
    this.element = element.nativeElement;

    if(selection) {
      this.unlistens = [
        renderer.listen(this.element, 'click', () => {
          this.selection.toggleSelect(this.row);
        }),
        renderer.listen(this.element, 'keydown', (event: KeyboardEvent) => {
          const keyCode = event.keyCode;

          if(keyCode === Keys.return) {
            event.preventDefault();
            event.stopPropagation();

            this.selection.toggleSelect(this.row, event.shiftKey);
          }

          /* TODO focus
          else
            if ( keyCode === Keys.down ||
                 keyCode === Keys.up   ||
                 keyCode === Keys.left ||
                 keyCode === Keys.right)

          */
        })
      ];

      // TODO do diffently once we change how rows works
      this.unsub = this.selection.selectionChange.subscribe( s => {
        this.isSelected = this.selection.isSelected(this.row);
        this.cdr.markForCheck();
      });
    }
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

  recalculateColumns(val: any[] = this.columns) {
    const colsByPin = columnsByPin(val);
    this.columnsByPin = columnsByPinArr(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

  ngOnDestroy() {
    this.unlistens.forEach( f => { f(); } );
    this.unsub.unsubscribe();
  }

}
