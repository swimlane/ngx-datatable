var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';
var DatatableFooterDirective = /** @class */ (function () {
    function DatatableFooterDirective() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DatatableFooterDirective.prototype, "footerHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "totalMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatatableFooterDirective.prototype, "selectedMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerNextIcon", void 0);
    __decorate([
        Input(),
        ContentChild(DataTableFooterTemplateDirective, { read: TemplateRef }),
        __metadata("design:type", TemplateRef)
    ], DatatableFooterDirective.prototype, "template", void 0);
    DatatableFooterDirective = __decorate([
        Directive({ selector: 'ngx-datatable-footer' })
    ], DatatableFooterDirective);
    return DatatableFooterDirective;
}());
export { DatatableFooterDirective };
//# sourceMappingURL=footer.directive.js.map