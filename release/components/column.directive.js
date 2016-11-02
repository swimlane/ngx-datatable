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
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    Object.defineProperty(DataTableColumnDirective.prototype, "hasHeaderTemplate", {
        get: function () {
            // this is a tad nasty but can't think of a better way
            // to differate if the prop is header vs cell
            return this.templates.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumnDirective.prototype, "headerTemplate", {
        get: function () {
            if (!this.hasHeaderTemplate)
                return undefined;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumnDirective.prototype, "cellTemplate", {
        get: function () {
            if (this.hasHeaderTemplate)
                return this.templates.last;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "prop", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "isExpressive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "frozenLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "frozenRight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "flexGrow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "resizeable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "comparator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "pipe", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "canAutoResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "maxWidth", void 0);
    __decorate([
        core_1.ContentChildren(core_1.TemplateRef), 
        __metadata('design:type', core_1.QueryList)
    ], DataTableColumnDirective.prototype, "templates", void 0);
    DataTableColumnDirective = __decorate([
        core_1.Directive({
            selector: 'datatable-column',
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;
//# sourceMappingURL=column.directive.js.map