"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent(element, renderer) {
        this.expanded = false;
        renderer.setElementClass(element.nativeElement, 'datatable-row-wrapper', true);
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "rowDetailTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableRowWrapperComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "row", void 0);
    DataTableRowWrapperComponent = __decorate([
        core_1.Component({
            selector: 'datatable-row-wrapper',
            template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"datatable-row-detail\">\n      <template\n        *ngIf=\"rowDetailTemplate\"\n        [ngTemplateOutlet]=\"rowDetailTemplate\"\n        [ngOutletContext]=\"{ row: row }\">\n      </template>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableRowWrapperComponent);
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;
//# sourceMappingURL=body-row-wrapper.component.js.map