var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
let DataTableRowWrapperComponent = class DataTableRowWrapperComponent {
    constructor(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new EventEmitter(false);
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this._expanded = false;
        this.rowDiffer = differs.find({}).create();
    }
    set rowIndex(val) {
        this._rowIndex = val;
        this.rowContext.rowIndex = val;
        this.groupContext.rowIndex = val;
        this.cd.markForCheck();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    set expanded(val) {
        this._expanded = val;
        this.groupContext.expanded = val;
        this.rowContext.expanded = val;
        this.cd.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    ngDoCheck() {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    }
    onContextmenu($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    }
    getGroupHeaderStyle(group) {
        const styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableRowWrapperComponent.prototype, "innerWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "groupHeader", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableRowWrapperComponent.prototype, "offsetX", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "row", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "groupedRows", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "rowContextmenu", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableRowWrapperComponent.prototype, "rowIndex", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DataTableRowWrapperComponent.prototype, "expanded", null);
__decorate([
    HostListener('contextmenu', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], DataTableRowWrapperComponent.prototype, "onContextmenu", null);
DataTableRowWrapperComponent = __decorate([
    Component({
        selector: 'datatable-row-wrapper',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div 
      *ngIf="groupHeader && groupHeader.template"
      class="datatable-group-header"
      [ngStyle]="getGroupHeaderStyle()">
      <ng-template
        *ngIf="groupHeader && groupHeader.template"
        [ngTemplateOutlet]="groupHeader.template"
        [ngTemplateOutletContext]="groupContext">
      </ng-template>
    </div>
    <ng-content 
      *ngIf="(groupHeader && groupHeader.template && expanded) || 
             (!groupHeader || !groupHeader.template)">
    </ng-content>
    <div
      *ngIf="rowDetail && rowDetail.template && expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail">
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="rowContext">
      </ng-template>
    </div>
  `,
        host: {
            class: 'datatable-row-wrapper'
        }
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, KeyValueDiffers])
], DataTableRowWrapperComponent);
export { DataTableRowWrapperComponent };
//# sourceMappingURL=body-row-wrapper.component.js.map