import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { TreeStatus } from './body-cell.component';
import { columnGroupWidths, columnsByPin, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { Scrollbar } from '../../utils/scrollbar';
import { translateXY } from '../../utils/translate';

@Component({
  selector: 'datatable-body-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngFor="let colGroup of columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [ngStyle]="groupStyles[colGroup.type]"
    >
      <datatable-body-cell
        role="cell"
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        [treeStatus]="treeStatus"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
    </div>
  `
})
export class DataTableBodyRowComponent implements DoCheck, OnChanges {
  @Input() columns: any[];
  @Input() displayCheck: any;
  @Input() expanded: boolean;
  @Input() group: any;
  @Input() innerWidth: number;
  @Input() isSelected: boolean;
  @Input() offsetX: number;
  @Input() row: any;
  @Input() rowClass: any;
  @Input() rowIndex: number;
  @Input() scrollbarV: boolean;
  @Input() treeStatus: TreeStatus = 'collapsed';

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  columnsByPin: any;
  groupStyles: { [prop: string]: {} } = {
    left: {},
    center: {},
    right: {}
  };

  private _element: any;
  private _columnGroupWidths: any;
  private _rowDiffer: KeyValueDiffer<{}, {}>;

  constructor(private cd: ChangeDetectorRef, differs: KeyValueDiffers, element: ElementRef) {
    Scrollbar.widthChange.subscribe(() => this.recalculateColumns());
    this._element = element.nativeElement;
    this._rowDiffer = differs.find({}).create();
  }

  @HostBinding('style.height.px')
  @Input()
  rowHeight: number;

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if (this.isSelected) {
      cls += ' active';
    }
    if (this.rowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    }
    if (this.rowIndex % 2 === 0) {
      cls += ' datatable-row-even';
    }

    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) {
            cls += ` ${k}`;
          }
        }
      }
    }

    return cls;
  }

  @HostBinding('style.width.px')
  get columnsTotalWidths(): string {
    return this._columnGroupWidths.total;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const actions = [Keys.return, Keys.down, Keys.up, Keys.left, Keys.right];
    const isAction = actions.includes(event.keyCode);
    const isTargetRow = event.target === this._element;

    if (isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();
      this.emitActivate('keydown', event);
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: any): void {
    this.emitActivate('mouseenter', event);
  }

  trackByGroups = (index: number, colGroup: any): any => colGroup.type;

  columnTrackingFn = (index: number, column: any): any => column.$$id;

  ngDoCheck(): void {
    if (this._rowDiffer.diff(this.row)) {
      this.cd.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns || changes.innerWidth || changes.scrollbarV) {
      this.recalculateColumns();
    } else if (changes.offsetX) {
      this.buildStylesByGroup();
    }
  }

  buildStylesByGroup(): void {
    this.groupStyles.left = this.calcStylesByGroup('left');
    this.groupStyles.center = this.calcStylesByGroup('center');
    this.groupStyles.right = this.calcStylesByGroup('right');
    this.cd.markForCheck();
  }

  calcStylesByGroup(group: string): any {
    const widths = this._columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`
    };

    if (group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if (group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      let offset = totalDiff - offsetX;
      if (this.scrollbarV) {
        offset += Scrollbar.width;
      }
      if (offset >= 0) {
        translateXY(styles, offset * -1, 0);
      }
    }

    return styles;
  }

  emitActivate(type: string, event: any): void {
    this.activate.emit({
      type,
      event,
      row: this.row,
      rowElement: this._element
    });
  }

  onActivate(event: any, index: number): void {
    // event comes with keys: { type, event, row, group, rowHeight, column, value, cellElement, treeStatus? }
    event.cellIndex = index;
    event.rowElement = this._element;
    this.activate.emit(event);
  }

  onTreeAction(): void {
    this.treeAction.emit();
  }

  recalculateColumns(): void {
    const colsByPin = columnsByPin(this.columns);
    this.columnsByPin = columnsByPinArr(this.columns);
    this._columnGroupWidths = columnGroupWidths(colsByPin, this.columns);
    this.buildStylesByGroup();
  }
}
