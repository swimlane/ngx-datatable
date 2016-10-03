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
var services_1 = require('../../services');
var utils_1 = require('../../utils');
var DataTableHeader = (function () {
    function DataTableHeader(state, element, renderer) {
        this.state = state;
        this.onColumnChange = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-header', true);
    }
    Object.defineProperty(DataTableHeader.prototype, "headerWidth", {
        get: function () {
            if (this.state.options.scrollbarH)
                return this.state.innerWidth + 'px';
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeader.prototype, "headerHeight", {
        get: function () {
            var height = this.state.options.headerHeight;
            if (height !== 'auto')
                return height + "px";
            return height;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeader.prototype.trackColBy = function (index, obj) {
        return obj.$$id;
    };
    DataTableHeader.prototype.columnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        column.width = width;
        this.onColumnChange.emit({
            type: 'resize',
            value: column
        });
    };
    DataTableHeader.prototype.columnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        this.state.options.columns.splice(prevIndex, 1);
        this.state.options.columns.splice(newIndex, 0, model);
        this.onColumnChange.emit({
            type: 'reorder',
            value: model
        });
    };
    DataTableHeader.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths;
        var offsetX = this.state.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            utils_1.translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.innerWidth;
            var offset = totalDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeader.prototype, "onColumnChange", void 0);
    DataTableHeader = __decorate([
        core_1.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      [style.width]=\"state.columnGroupWidths.total + 'px'\"\n      class=\"datatable-header-inner\"\n      orderable\n      (onReorder)=\"columnReordered($event)\">\n      <div\n        class=\"datatable-row-left\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        *ngIf=\"state.columnsByPin.left.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.left; trackBy: trackColBy\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [column]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin.center.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.center; trackBy: trackColBy\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [column]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        *ngIf=\"state.columnsByPin.right.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.right; trackBy: trackColBy\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [column]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            host: {
                '[style.width]': 'headerWidth',
                '[style.height]': 'headerHeight'
            }
        }), 
        __metadata('design:paramtypes', [services_1.StateService, core_1.ElementRef, core_1.Renderer])
    ], DataTableHeader);
    return DataTableHeader;
}());
exports.DataTableHeader = DataTableHeader;
//# sourceMappingURL=header.component.js.map