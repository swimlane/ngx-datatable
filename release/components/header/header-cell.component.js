import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { SortDirection, SelectionType } from '../../types';
import { nextSortDir } from '../../utils';
var DataTableHeaderCellComponent = (function () {
    function DataTableHeaderCellComponent() {
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.sortFn = this.onSort.bind(this);
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.sortClass = this.calcSortClass(this.sortDir);
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
            if (this.column.cssClasses)
                cls += ' ' + this.column.cssClasses;
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
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.name;
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
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        get: function () {
            return this.column.checkboxable &&
                this.column.headerCheckboxable &&
                this.selectionType === SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
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
        var newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortClass = function (sortDir) {
        if (sortDir === SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    return DataTableHeaderCellComponent;
}());
export { DataTableHeaderCellComponent };
DataTableHeaderCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-header-cell',
                template: "\n    <div>\n      <label\n        *ngIf=\"isCheckboxable\" \n        class=\"datatable-checkbox\">\n        <input \n          type=\"checkbox\"\n          [attr.checked]=\"allRowsSelected\"\n          (change)=\"select.emit(!allRowsSelected)\" \n        />\n      </label>\n      <span \n        *ngIf=\"!column.headerTemplate\"\n        class=\"datatable-header-cell-wrapper\">\n        <span\n          class=\"datatable-header-cell-label draggable\"\n          (click)=\"onSort()\"\n          [innerHTML]=\"name\">\n        </span>\n      </span>\n      <ng-template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ \n          column: column, \n          sortDir: sortDir,\n          sortFn: sortFn\n        }\">\n      </ng-template>\n      <span\n        (click)=\"onSort()\"\n        [class]=\"sortClass\">\n      </span>\n    </div>\n  "
            },] },
];
/** @nocollapse */
DataTableHeaderCellComponent.ctorParameters = function () { return []; };
DataTableHeaderCellComponent.propDecorators = {
    'sortType': [{ type: Input },],
    'column': [{ type: Input },],
    'sortAscendingIcon': [{ type: Input },],
    'sortDescendingIcon': [{ type: Input },],
    'allRowsSelected': [{ type: Input },],
    'selectionType': [{ type: Input },],
    'headerHeight': [{ type: HostBinding, args: ['style.height.px',] }, { type: Input },],
    'sorts': [{ type: Input },],
    'sort': [{ type: Output },],
    'select': [{ type: Output },],
    'columnCssClasses': [{ type: HostBinding, args: ['class',] },],
    'name': [{ type: HostBinding, args: ['attr.title',] },],
    'minWidth': [{ type: HostBinding, args: ['style.minWidth.px',] },],
    'maxWidth': [{ type: HostBinding, args: ['style.maxWidth.px',] },],
    'width': [{ type: HostBinding, args: ['style.width.px',] },],
};
//# sourceMappingURL=header-cell.component.js.map