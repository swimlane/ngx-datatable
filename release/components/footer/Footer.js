"use strict";
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
        __metadata('design:paramtypes', [core_1.ElementRef, State_1.StateService])
    ], DataTableFooter);
    return DataTableFooter;
}());
exports.DataTableFooter = DataTableFooter;
//# sourceMappingURL=Footer.js.map