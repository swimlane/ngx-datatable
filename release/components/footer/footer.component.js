"use strict";
var core_1 = require('@angular/core');
var DataTableFooterComponent = (function () {
    function DataTableFooterComponent(element, renderer) {
        this.page = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-footer', true);
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
                    template: "\n    <div\n      [style.height.px]=\"footerHeight\">\n      <div class=\"page-count\">{{rowCount.toLocaleString()}} {{totalMessage}}</div>\n      <datatable-pager\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n       </datatable-pager>\n     </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableFooterComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
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
        'page': [{ type: core_1.Output },],
    };
    return DataTableFooterComponent;
}());
exports.DataTableFooterComponent = DataTableFooterComponent;
//# sourceMappingURL=footer.component.js.map