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
var utils_1 = require('../../utils');
var DataTableBodyRowComponent = (function () {
    function DataTableBodyRowComponent(element, renderer) {
        this.activate = new core_1.EventEmitter();
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable-body-row', true);
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
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
    Object.defineProperty(DataTableBodyRowComponent.prototype, "isEvenRow", {
        get: function () {
            return this.row.$$index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "isOddRow", {
        get: function () {
            return this.row.$$index % 2 !== 0;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRowComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.bodyWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + utils_1.scrollbarWidth) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this.element;
        this.activate.emit(event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this.element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this.element
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyRowComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRowComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyRowComponent.prototype, "bodyWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyRowComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.HostBinding('class.active'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyRowComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.HostBinding('class.datatable-row-even'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyRowComponent.prototype, "isEvenRow", null);
    __decorate([
        core_1.HostBinding('class.datatable-row-odd'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyRowComponent.prototype, "isOddRow", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyRowComponent.prototype, "activate", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyRowComponent.prototype, "onKeyDown", null);
    DataTableBodyRowComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            template: "\n    <div\n      *ngFor=\"let colGroup of columnsByPin; let i = index; trackBy: $colGroup?.type\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"stylesByGroup(colGroup.type)\"\n      [style.width.px]=\"columnGroupWidths[colGroup.type]\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: column?.$$id\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        (activate)=\"onActivate($event, ii)\">\n      </datatable-body-cell>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableBodyRowComponent);
    return DataTableBodyRowComponent;
}());
exports.DataTableBodyRowComponent = DataTableBodyRowComponent;
//# sourceMappingURL=body-row.component.js.map