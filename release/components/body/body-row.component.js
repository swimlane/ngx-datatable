var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostBinding, ElementRef, Output, KeyValueDiffers, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { allColumnsByPinArr, columnsByPin, columnGroupWidths, translateXY, Keys } from '../../utils/index';
import { ScrollbarHelper } from '../../services/index';
let DataTableBodyRowComponent = class DataTableBodyRowComponent {
    constructor(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.activate = new EventEmitter();
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
    }
    set columns(val) {
        this._columns = val;
        this.recalculateColumns(val);
    }
    get columns() {
        return this._columns;
    }
    set innerWidth(val) {
        if (this._columns) {
            const colByPin = columnsByPin(this._columns);
            this.columnGroupWidths = columnGroupWidths(colByPin, colByPin);
        }
        this._innerWidth = val;
        this.recalculateColumns();
    }
    get innerWidth() {
        return this._innerWidth;
    }
    get cssClass() {
        let cls = 'datatable-body-row';
        if (this.isSelected)
            cls += ' active';
        if (this.rowIndex % 2 !== 0)
            cls += ' datatable-row-odd';
        if (this.rowIndex % 2 === 0)
            cls += ' datatable-row-even';
        if (this.rowClass) {
            const res = this.rowClass(this.row);
            if (typeof res === 'string') {
                cls += ` ${res}`;
            }
            else if (typeof res === 'object') {
                const keys = Object.keys(res);
                for (const k of keys) {
                    if (res[k] === true)
                        cls += ` ${k}`;
                }
            }
        }
        return cls;
    }
    get columnsTotalWidths() {
        return this.columnGroupWidths.total;
    }
    ngDoCheck() {
        if (this.rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    }
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    stylesByGroup(group) {
        const widths = this.columnGroupWidths;
        const offsetX = this.offsetX;
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            const totalDiff = widths.total - bodyWidth;
            const offsetDiff = totalDiff - offsetX;
            const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    onActivate(event, index) {
        event.cellIndex = index;
        event.rowElement = this.element;
        this.activate.emit(event);
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;
        const isTargetRow = event.target === this.element;
        const isAction = keyCode === Keys.return ||
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
    onMouseenter(event) {
        this.activate.emit({
            type: 'mouseenter',
            event,
            row: this.row,
            rowElement: this.element
        });
    }
    recalculateColumns(val = this.columns) {
        this._columns = val;
        const colsByPin = columnsByPin(this._columns);
        this.columnsByPin = allColumnsByPinArr(this._columns);
        this.columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableBodyRowComponent.prototype, "columns", null);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableBodyRowComponent.prototype, "innerWidth", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableBodyRowComponent.prototype, "expanded", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableBodyRowComponent.prototype, "rowClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableBodyRowComponent.prototype, "row", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableBodyRowComponent.prototype, "group", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableBodyRowComponent.prototype, "offsetX", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableBodyRowComponent.prototype, "isSelected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableBodyRowComponent.prototype, "rowIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableBodyRowComponent.prototype, "displayCheck", void 0);
__decorate([
    HostBinding('class'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableBodyRowComponent.prototype, "cssClass", null);
__decorate([
    HostBinding('style.height.px'),
    Input(),
    __metadata("design:type", Number)
], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
__decorate([
    HostBinding('style.width.px'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DataTableBodyRowComponent.prototype, "columnsTotalWidths", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataTableBodyRowComponent.prototype, "activate", void 0);
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], DataTableBodyRowComponent.prototype, "onKeyDown", null);
__decorate([
    HostListener('mouseenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], DataTableBodyRowComponent.prototype, "onMouseenter", null);
DataTableBodyRowComponent = __decorate([
    Component({
        selector: 'datatable-body-row',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div
      *ngFor="let colGroup of columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{colGroup.type}} datatable-row-group"
      [ngStyle]="stylesByGroup(colGroup.type)">
      <datatable-body-cell
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
        (activate)="onActivate($event, ii)">
      </datatable-body-cell>
    </div>      
  `
    }),
    __metadata("design:paramtypes", [KeyValueDiffers,
        ScrollbarHelper,
        ChangeDetectorRef,
        ElementRef])
], DataTableBodyRowComponent);
export { DataTableBodyRowComponent };
//# sourceMappingURL=body-row.component.js.map