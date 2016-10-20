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
var DataTableColumn = (function () {
    function DataTableColumn() {
    }
    Object.defineProperty(DataTableColumn.prototype, "hasHeaderTemplate", {
        get: function () {
            // this is a tad nasty but can't think of a better way
            // to differate if the prop is header vs cell
            return this.templates.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumn.prototype, "headerTemplate", {
        get: function () {
            if (!this.hasHeaderTemplate)
                return undefined;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumn.prototype, "cellTemplate", {
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
    ], DataTableColumn.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "prop", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "isExpressive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "frozenLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "frozenRight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "flexGrow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "resizeable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "comparator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "pipe", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "canAutoResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "maxWidth", void 0);
    __decorate([
        core_1.ContentChildren(core_1.TemplateRef), 
        __metadata('design:type', core_1.QueryList)
    ], DataTableColumn.prototype, "templates", void 0);
    DataTableColumn = __decorate([
        core_1.Directive({
            selector: 'datatable-column',
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumn);
    return DataTableColumn;
}());
exports.DataTableColumn = DataTableColumn;
//# sourceMappingURL=datatable-column.directive.js.map