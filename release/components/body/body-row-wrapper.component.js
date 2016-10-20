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
var services_1 = require('../../services');
var DataTableRowWrapper = (function () {
    function DataTableRowWrapper(element, state, renderer) {
        this.element = element;
        this.state = state;
        renderer.setElementClass(this.element.nativeElement, 'datatable-row-wrapper', true);
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapper.prototype, "row", void 0);
    DataTableRowWrapper = __decorate([
        core_1.Component({
            selector: 'datatable-row-wrapper',
            template: "\n        <ng-content></ng-content>\n        <div *ngIf=\"row.$$expanded === 1 && state.options.rowDetailTemplate\"\n              [style.height]=\"state.options.detailRowHeight +  'px'\" \n              class=\"datatable-row-detail\">\n          <template\n            [ngTemplateOutlet]=\"state.options.rowDetailTemplate\"\n            [ngOutletContext]=\"{ row: row}\">\n          </template>\n        </div>\n    ",
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, services_1.StateService, core_1.Renderer])
    ], DataTableRowWrapper);
    return DataTableRowWrapper;
}());
exports.DataTableRowWrapper = DataTableRowWrapper;
//# sourceMappingURL=body-row-wrapper.component.js.map