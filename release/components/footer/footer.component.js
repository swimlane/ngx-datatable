import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
var DataTableFooterComponent = (function () {
    function DataTableFooterComponent() {
        this.selectedCount = 0;
        this.page = new EventEmitter();
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
    return DataTableFooterComponent;
}());
export { DataTableFooterComponent };
DataTableFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-footer',
                template: "\n    <div\n      [ngClass]=\"{'selected-count': selectedMessage}\"\n      [style.height.px]=\"footerHeight\">\n      <div class=\"page-count\">\n        <span *ngIf=\"selectedMessage\">\n          {{selectedCount.toLocaleString()}} {{selectedMessage}} / \n        </span>\n\n        {{rowCount.toLocaleString()}} {{totalMessage}}\n      </div>\n      <datatable-pager\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n      </datatable-pager>\n    </div>\n  ",
                host: {
                    class: 'datatable-footer'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DataTableFooterComponent.ctorParameters = function () { return []; };
DataTableFooterComponent.propDecorators = {
    'footerHeight': [{ type: Input },],
    'rowCount': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'offset': [{ type: Input },],
    'pagerLeftArrowIcon': [{ type: Input },],
    'pagerRightArrowIcon': [{ type: Input },],
    'pagerPreviousIcon': [{ type: Input },],
    'pagerNextIcon': [{ type: Input },],
    'totalMessage': [{ type: Input },],
    'selectedCount': [{ type: Input },],
    'selectedMessage': [{ type: Input },],
    'page': [{ type: Output },],
};
//# sourceMappingURL=footer.component.js.map