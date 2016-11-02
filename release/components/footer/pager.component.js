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
var DataTablePagerComponent = (function () {
    function DataTablePagerComponent(element, renderer) {
        this.size = 0;
        this.change = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-pager', true);
    }
    Object.defineProperty(DataTablePagerComponent.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagerComponent.prototype.canPrevious = function () {
        return this.page > 1;
    };
    DataTablePagerComponent.prototype.canNext = function () {
        return this.page < this.totalPages;
    };
    DataTablePagerComponent.prototype.prevPage = function () {
        if (this.page > 1) {
            this.selectPage(--this.page);
        }
    };
    DataTablePagerComponent.prototype.nextPage = function () {
        this.selectPage(++this.page);
    };
    DataTablePagerComponent.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages) {
            this.page = page;
            this.change.emit({
                page: page
            });
        }
    };
    DataTablePagerComponent.prototype.calcPages = function (page) {
        var pages = [];
        var startPage = 1;
        var endPage = this.totalPages;
        var maxSize = 5;
        var isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
            endPage = Math.min(startPage + maxSize - 1, this.totalPages);
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTablePagerComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTablePagerComponent.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTablePagerComponent.prototype, "count", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTablePagerComponent.prototype, "page", null);
    DataTablePagerComponent = __decorate([
        core_1.Component({
            selector: 'datatable-pager',
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\">\n          <i class=\"{{pagerPreviousIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\">\n          <i class=\"{{pagerLeftArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\">\n          <i class=\"{{pagerRightArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\">\n          <i class=\"{{pagerNextIcon}}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTablePagerComponent);
    return DataTablePagerComponent;
}());
exports.DataTablePagerComponent = DataTablePagerComponent;
//# sourceMappingURL=pager.component.js.map