var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
let DataTableColumnDirective = class DataTableColumnDirective {
};
__decorate([
    Input(),
    __metadata("design:type", String)
], DataTableColumnDirective.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "prop", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "frozenLeft", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "frozenRight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "flexGrow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "resizeable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "comparator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "pipe", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "sortable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "draggable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "canAutoResize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "minWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "maxWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "checkboxable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "headerCheckboxable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "headerClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "cellClass", void 0);
__decorate([
    Input(),
    ContentChild(DataTableColumnCellDirective, { read: TemplateRef }),
    __metadata("design:type", TemplateRef)
], DataTableColumnDirective.prototype, "cellTemplate", void 0);
__decorate([
    Input(),
    ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef }),
    __metadata("design:type", TemplateRef)
], DataTableColumnDirective.prototype, "headerTemplate", void 0);
DataTableColumnDirective = __decorate([
    Directive({ selector: 'ngx-datatable-column' })
], DataTableColumnDirective);
export { DataTableColumnDirective };
//# sourceMappingURL=column.directive.js.map