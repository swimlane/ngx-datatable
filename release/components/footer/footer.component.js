"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableFooterComponent = /** @class */ (function () {
    function DataTableFooterComponent() {
        this.selectedCount = 0;
        this.page = new core_1.EventEmitter();
    }
    Object.defineProperty(DataTableFooterComponent.prototype, "isVisible", {
        get: function () {
            return (this.rowCount / this.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooterComponent.prototype, "curPage", {
        get: function () {
            return this.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    DataTableFooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-footer',
                    template: "\n    <div\n      class=\"datatable-footer-inner\"\n      [ngClass]=\"{'selected-count': selectedMessage}\"\n      [style.height.px]=\"footerHeight\">\n      <ng-template\n        *ngIf=\"footerTemplate\"\n        [ngTemplateOutlet]=\"footerTemplate.template\"\n        [ngTemplateOutletContext]=\"{ \n          rowCount: rowCount, \n          pageSize: pageSize, \n          selectedCount: selectedCount,\n          curPage: curPage,\n          offset: offset\n        }\">\n      </ng-template>\n      <div class=\"page-count\" *ngIf=\"!footerTemplate\">\n        <span *ngIf=\"selectedMessage\">\n          {{selectedCount.toLocaleString()}} {{selectedMessage}} / \n        </span>\n        {{rowCount.toLocaleString()}} {{totalMessage}}\n      </div>\n      <datatable-pager *ngIf=\"!footerTemplate\"\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n      </datatable-pager>\n    </div>\n  ",
                    host: {
                        class: 'datatable-footer'
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableFooterComponent.ctorParameters = function () { return []; };
    DataTableFooterComponent.propDecorators = {
        'footerHeight': [{ type: core_1.Input },],
        'rowCount': [{ type: core_1.Input },],
        'pageSize': [{ type: core_1.Input },],
        'offset': [{ type: core_1.Input },],
        'pagerLeftArrowIcon': [{ type: core_1.Input },],
        'pagerRightArrowIcon': [{ type: core_1.Input },],
        'pagerPreviousIcon': [{ type: core_1.Input },],
        'pagerNextIcon': [{ type: core_1.Input },],
        'totalMessage': [{ type: core_1.Input },],
        'footerTemplate': [{ type: core_1.Input },],
        'selectedCount': [{ type: core_1.Input },],
        'selectedMessage': [{ type: core_1.Input },],
        'page': [{ type: core_1.Output },],
    };
    return DataTableFooterComponent;
}());
exports.DataTableFooterComponent = DataTableFooterComponent;
//# sourceMappingURL=footer.component.js.map