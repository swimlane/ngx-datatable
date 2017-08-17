import {
  Component, Input, HostBinding, ElementRef, Output,
  EventEmitter, HostListener, TemplateRef, ChangeDetectionStrategy
} from '@angular/core';

import { Keys, columnsTotalWidth } from '../../utils';

@Component({
  selector: 'datatable-body-section-header',
  template: `
    <ng-template
      *ngIf="sectionHeaderTemplate"
      [ngTemplateOutlet]="sectionHeaderTemplate.template"
      [ngOutletContext]="{
        section: row,
        expanded: expanded,
        isSelected: isSelected,
        sectionCount: sectionCount
      }">
    </ng-template>
    <div *ngIf="!sectionHeaderTemplate">
      {{row.title}}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableBodySectionHeaderComponent {

  @Input() set columns(val: any[]) {
    this._columns = val;
    this._calculatedWidth = columnsTotalWidth(val);
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() expanded: boolean;
  @Input() rowClass: any;
  @Input() row: any;
  @Input() isSelected: boolean;
  @Input() rowIndex: number;
  @Input() sectionCount: number;

  @Input() sectionHeaderTemplate: TemplateRef<any>;

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if (this.isSelected) cls += ' active';
    if (this.rowIndex % 2 !== 0) cls += ' datatable-row-odd';
    if (this.rowIndex % 2 === 0) cls += ' datatable-row-even';

    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) cls += ` ${k}`;
        }
      }
    }

    return cls;
  }

  @HostBinding('style.height.px')
  @Input() sectionHeaderHeight: number;

  @Output() activate: EventEmitter<any> = new EventEmitter();

  element: any;
  _columns: any[];

  @HostBinding('style.width.px')
  _calculatedWidth: number;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'click',
      event,
      row: this.row,
      rowElement: this.element
    });
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'dblclick',
      event,
      row: this.row,
      rowElement: this.element
    });
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

    if (isAction && isTargetRow) {
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
}
