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
var types_1 = require('../../types');
var utils_1 = require('../../utils');
var DataTableHeaderComponent = (function () {
    function DataTableHeaderComponent(element, renderer) {
        this.sort = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-header', true);
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerHeight", {
        get: function () {
            return this._headerHeight;
        },
        set: function (val) {
            if (val !== 'auto') {
                this._headerHeight = val + "px";
            }
            else {
                this._headerHeight = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnsByPin = utils_1.columnsByPinArr(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.onColumnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    DataTableHeaderComponent.prototype.onColumnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, column = _a.column;
        this.reorder.emit({
            column: column,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        });
    };
    DataTableHeaderComponent.prototype.calcNewSorts = function (column, prevValue, newValue) {
        var idx = 0;
        var sorts = this.sorts.map(function (s, i) {
            s = Object.assign({}, s);
            if (s.prop === column.prop)
                idx = i;
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === types_1.SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            utils_1.translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "innerWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableHeaderComponent.prototype, "sorts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.HostBinding('style.height'),
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTableHeaderComponent.prototype, "headerHeight", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableHeaderComponent.prototype, "columns", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "resize", void 0);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', String)
    ], DataTableHeaderComponent.prototype, "headerWidth", null);
    DataTableHeaderComponent = __decorate([
        core_1.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      [style.width.px]=\"columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of columnsByPin; trackBy: colGroup?.type\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"stylesByGroup(colGroup.type)\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: column?.$$id\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          (longPress)=\"drag = true\"\n          (longPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [headerHeight]=\"headerHeight\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          (sort)=\"onSort($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableHeaderComponent);
    return DataTableHeaderComponent;
}());
exports.DataTableHeaderComponent = DataTableHeaderComponent;
//# sourceMappingURL=header.component.js.map