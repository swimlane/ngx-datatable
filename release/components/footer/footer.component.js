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
var DataTableFooter = (function () {
    function DataTableFooter(element, state, renderer) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-footer', true);
    }
    Object.defineProperty(DataTableFooter.prototype, "visible", {
        get: function () {
            return (this.state.rowCount / this.state.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooter.prototype, "curPage", {
        get: function () {
            return this.state.options.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableFooter.prototype, "onPageChange", void 0);
    DataTableFooter = __decorate([
        core_1.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      *ngIf=\"state.options.footerHeight\"\n      [style.height]=\"state.options.footerHeight\">\n      <div class=\"page-count\">{{state.rowCount}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.rowCount\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, services_1.StateService, core_1.Renderer])
    ], DataTableFooter);
    return DataTableFooter;
}());
exports.DataTableFooter = DataTableFooter;
//# sourceMappingURL=footer.component.js.map