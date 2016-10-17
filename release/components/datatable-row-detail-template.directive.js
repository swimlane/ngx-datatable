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
var DatatableRowDetailTemplate = (function () {
    function DatatableRowDetailTemplate() {
    }
    Object.defineProperty(DatatableRowDetailTemplate.prototype, "rowDetailTemplate", {
        get: function () {
            return this.template;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DatatableRowDetailTemplate.prototype, "template", void 0);
    DatatableRowDetailTemplate = __decorate([
        core_1.Directive({
            selector: 'datatable-row-detail-template'
        }), 
        __metadata('design:paramtypes', [])
    ], DatatableRowDetailTemplate);
    return DatatableRowDetailTemplate;
}());
exports.DatatableRowDetailTemplate = DatatableRowDetailTemplate;
//# sourceMappingURL=datatable-row-detail-template.directive.js.map