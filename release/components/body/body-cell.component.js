import { Component, Input, HostBinding, ViewChild, Output, EventEmitter, HostListener, ElementRef, ViewContainerRef } from '@angular/core';
import { Keys } from '../../utils';
import { SortDirection } from '../../types';
var DataTableBodyCellComponent = (function () {
    function DataTableBodyCellComponent(element) {
        this.activate = new EventEmitter();
        this.isFocused = false;
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.calcSortDir = this.calcSortDir(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            if (this.column.cssClasses)
                cls += ' ' + this.column.cssClasses;
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortActive", {
        get: function () {
            return !this.sortDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortAscending", {
        get: function () {
            return this.sortDir === SortDirection.asc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortDescending", {
        get: function () {
            return this.sortDir === SortDirection.desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "height", {
        get: function () {
            var height = this.rowHeight;
            if (isNaN(height))
                return height;
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "value", {
        get: function () {
            if (!this.row || !this.column)
                return '';
            var val = this.column.$$valueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            if (userPipe)
                return userPipe.transform(val);
            if (val !== undefined)
                return val;
            return '';
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.ngOnDestroy = function () {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    };
    DataTableBodyCellComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function () {
        this.isFocused = false;
    };
    DataTableBodyCellComponent.prototype.onClick = function (event) {
        this.activate.emit({
            type: 'click',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.onDblClick = function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetCell = event.target === this.element;
        var isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                column: this.column,
                value: this.value,
                cellElement: this.element
            });
        }
    };
    DataTableBodyCellComponent.prototype.onCheckboxChange = function (event) {
        this.activate.emit({
            type: 'checkbox',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (!sorts)
            return;
        var sort = sorts.find(function (s) {
            return s.prop === _this.column.prop;
        });
        if (sort)
            return sort.dir;
    };
    return DataTableBodyCellComponent;
}());
export { DataTableBodyCellComponent };
DataTableBodyCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body-cell',
                template: "\n    <div class=\"datatable-body-cell-label\">\n      <label\n        *ngIf=\"column.checkboxable\" \n        class=\"datatable-checkbox\">\n        <input \n          type=\"checkbox\"\n          [checked]=\"isSelected\"\n          (click)=\"onCheckboxChange($event)\" \n        />\n      </label>\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [title]=\"value\"\n        [innerHTML]=\"value\">\n      </span>\n      <ng-template\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{ value: value, row: row, column: column }\">\n      </ng-template>\n    </div>\n  ",
                host: {
                    class: 'datatable-body-cell'
                }
            },] },
];
/** @nocollapse */
DataTableBodyCellComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
DataTableBodyCellComponent.propDecorators = {
    'row': [{ type: Input },],
    'column': [{ type: Input },],
    'rowHeight': [{ type: Input },],
    'isSelected': [{ type: Input },],
    'sorts': [{ type: Input },],
    'activate': [{ type: Output },],
    'cellTemplate': [{ type: ViewChild, args: ['cellTemplate', { read: ViewContainerRef },] },],
    'columnCssClasses': [{ type: HostBinding, args: ['class',] },],
    'isFocused': [{ type: HostBinding, args: ['class.active',] },],
    'isSortActive': [{ type: HostBinding, args: ['class.sort-active',] },],
    'isSortAscending': [{ type: HostBinding, args: ['class.sort-asc',] },],
    'isSortDescending': [{ type: HostBinding, args: ['class.sort-desc',] },],
    'width': [{ type: HostBinding, args: ['style.width.px',] },],
    'height': [{ type: HostBinding, args: ['style.height',] },],
    'onFocus': [{ type: HostListener, args: ['focus',] },],
    'onBlur': [{ type: HostListener, args: ['blur',] },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    'onDblClick': [{ type: HostListener, args: ['dblclick', ['$event'],] },],
    'onKeyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
};
//# sourceMappingURL=body-cell.component.js.map