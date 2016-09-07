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
var State_1 = require('../../services/State');
var DataTableFooter = (function () {
    function DataTableFooter(elm, state) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        elm.nativeElement.classList.add('datatable-footer');
    }
    Object.defineProperty(DataTableFooter.prototype, "visible", {
        get: function () {
            return (this.state.rowCount(this.key) / this.state.pageSize(this.key)) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooter.prototype, "curPage", {
        get: function () {
            return this.state.getOption(this.key, 'offset') + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableFooter.prototype, "key", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableFooter.prototype, "onPageChange", void 0);
    DataTableFooter = __decorate([
        core_1.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      *ngIf=\"state.getOption(key,'footerHeight')\"\n      [style.height]=\"state.getOption(key,'footerHeight')\">\n      <div class=\"page-count\">{{state.rowCount(key)}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize(key)\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.rowCount(key)\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, State_1.StateService])
    ], DataTableFooter);
    return DataTableFooter;
}());
exports.DataTableFooter = DataTableFooter;
//# sourceMappingURL=Footer.js.map