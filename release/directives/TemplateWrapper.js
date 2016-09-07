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
var TemplateWrapper = (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnChanges = function (changes) {
        if (changes['templateWrapper']) {
            if (this.embeddedViewRef) {
                this.embeddedViewRef.destroy();
            }
            this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateWrapper, {
                value: this.value,
                row: this.row,
                column: this.column,
                sort: this.sort
            });
        }
        if (this.embeddedViewRef) {
            this.embeddedViewRef.context.value = this.value;
            this.embeddedViewRef.context.row = this.row;
            this.embeddedViewRef.context.column = this.column;
            this.embeddedViewRef.context.sort = this.sort;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], TemplateWrapper.prototype, "templateWrapper", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "sort", void 0);
    TemplateWrapper = __decorate([
        core_1.Directive({ selector: '[templateWrapper]' }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], TemplateWrapper);
    return TemplateWrapper;
}());
exports.TemplateWrapper = TemplateWrapper;
//# sourceMappingURL=TemplateWrapper.js.map