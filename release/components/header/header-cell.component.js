"use strict";
var core_1 = require('@angular/core');
var types_1 = require('../../types');
var utils_1 = require('../../utils');
var DataTableHeaderCellComponent = (function () {
    function DataTableHeaderCellComponent() {
        this.sort = new core_1.EventEmitter();
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        get: function () {
            return this.column.name || this.column.prop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCellComponent.prototype.sortClasses = function (dir) {
        var result = {};
        if (dir === types_1.SortDirection.asc) {
            result[("sort-asc " + this.sortAscendingIcon)] = true;
        }
        else if (dir === types_1.SortDirection.desc) {
            result[("sort-desc " + this.sortDescendingIcon)] = true;
        }
        return result;
    };
    DataTableHeaderCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (sorts && this.column) {
            var sort = sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    };
    DataTableHeaderCellComponent.prototype.onSort = function () {
        if (!this.column.sortable)
            return;
        var newValue = utils_1.nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-header-cell',
                    template: "\n    <div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        *ngIf=\"!column.headerTemplate\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"name\">\n      </span>\n      <template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ \n          column: column, \n          sortDir: sortDir\n        }\">\n      </template>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses(sortDir)\">\n      </span>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableHeaderCellComponent.ctorParameters = [];
    DataTableHeaderCellComponent.propDecorators = {
        'sortType': [{ type: core_1.Input },],
        'column': [{ type: core_1.Input },],
        'sortAscendingIcon': [{ type: core_1.Input },],
        'sortDescendingIcon': [{ type: core_1.Input },],
        'headerHeight': [{ type: core_1.HostBinding, args: ['style.height.px',] }, { type: core_1.Input },],
        'sorts': [{ type: core_1.Input },],
        'sort': [{ type: core_1.Output },],
        'columnCssClasses': [{ type: core_1.HostBinding, args: ['class',] },],
        'name': [{ type: core_1.HostBinding, args: ['attr.title',] },],
        'minWidth': [{ type: core_1.HostBinding, args: ['style.minWidth.px',] },],
        'maxWidth': [{ type: core_1.HostBinding, args: ['style.maxWidth.px',] },],
        'width': [{ type: core_1.HostBinding, args: ['style.width.px',] },],
    };
    return DataTableHeaderCellComponent;
}());
exports.DataTableHeaderCellComponent = DataTableHeaderCellComponent;
//# sourceMappingURL=header-cell.component.js.map