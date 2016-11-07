"use strict";
var core_1 = require('@angular/core');
var utils_1 = require('../../utils');
var types_1 = require('../../types');
var DataTableBodyCellComponent = (function () {
    function DataTableBodyCellComponent(element, renderer) {
        this.activate = new core_1.EventEmitter();
        this.isFocused = false;
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable-body-cell', true);
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
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortActive", {
        get: function () {
            return !this.sortDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortAscending", {
        get: function () {
            return this.sortDir === types_1.SortDirection.asc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortDescending", {
        get: function () {
            return this.sortDir === types_1.SortDirection.desc;
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
            var prop = utils_1.deepValueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            return userPipe ? userPipe.transform(prop) : prop;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.onFocus = function (event) {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function (event) {
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
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
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
    DataTableBodyCellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-body-cell',
                    template: "\n    <div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{ value: value, row: row, column: column }\">\n      </template>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableBodyCellComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    DataTableBodyCellComponent.propDecorators = {
        'row': [{ type: core_1.Input },],
        'column': [{ type: core_1.Input },],
        'rowHeight': [{ type: core_1.Input },],
        'sorts': [{ type: core_1.Input },],
        'activate': [{ type: core_1.Output },],
        'isFocused': [{ type: core_1.HostBinding, args: ['class.active',] },],
        'isSortActive': [{ type: core_1.HostBinding, args: ['class.sort-active',] },],
        'isSortAscending': [{ type: core_1.HostBinding, args: ['class.sort-asc',] },],
        'isSortDescending': [{ type: core_1.HostBinding, args: ['class.sort-desc',] },],
        'width': [{ type: core_1.HostBinding, args: ['style.width.px',] },],
        'height': [{ type: core_1.HostBinding, args: ['style.height',] },],
        'onFocus': [{ type: core_1.HostListener, args: ['focus', ['$event'],] },],
        'onBlur': [{ type: core_1.HostListener, args: ['blur', ['$event'],] },],
        'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
        'onDblClick': [{ type: core_1.HostListener, args: ['dblclick', ['$event'],] },],
        'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return DataTableBodyCellComponent;
}());
exports.DataTableBodyCellComponent = DataTableBodyCellComponent;
//# sourceMappingURL=body-cell.component.js.map