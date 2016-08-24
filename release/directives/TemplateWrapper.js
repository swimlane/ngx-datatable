"use strict";
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