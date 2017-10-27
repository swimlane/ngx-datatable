var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';
let DatatableGroupHeaderDirective = class DatatableGroupHeaderDirective {
    constructor() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Group visbility was toggled.
         */
        this.toggle = new EventEmitter();
    }
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    }
    /**
     * API method to expand all groups.
     */
    expandAllGroups() {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    }
    /**
     * API method to collapse all groups.
     */
    collapseAllGroups() {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatatableGroupHeaderDirective.prototype, "rowHeight", void 0);
__decorate([
    Input(),
    ContentChild(DatatableGroupHeaderTemplateDirective, { read: TemplateRef }),
    __metadata("design:type", TemplateRef)
], DatatableGroupHeaderDirective.prototype, "template", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DatatableGroupHeaderDirective.prototype, "toggle", void 0);
DatatableGroupHeaderDirective = __decorate([
    Directive({ selector: 'ngx-datatable-group-header' })
], DatatableGroupHeaderDirective);
export { DatatableGroupHeaderDirective };
//# sourceMappingURL=body-group-header.directive.js.map