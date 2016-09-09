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
var translate_1 = require('../../utils/translate');
var State_1 = require('../../services/State');
var DataTableBodyRow = (function () {
    function DataTableBodyRow(state, element) {
        this.state = state;
        element.nativeElement.classList.add('datatable-body-row');
    }
    Object.defineProperty(DataTableBodyRow.prototype, "isSelected", {
        get: function () {
            return this.state.getSelected(this.key) &&
                this.state.getSelected(this.key).indexOf(this.row) > -1;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRow.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths(this.key);
        var offsetX = this.state.getOffsetX(this.key);
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translate_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.getInnerWidth(this.key);
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.state.getScrollbarWidth(this.key)) * -1;
            translate_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableBodyRow.prototype, "key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "row", void 0);
    __decorate([
        core_1.HostBinding('class.active'), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "isSelected", null);
    DataTableBodyRow = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            template: "\n    <div>\n      <div\n        class=\"datatable-row-left datatable-row-group\"\n        *ngIf=\"state.columnsByPin(key).left.length\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        [style.width]=\"state.columnGroupWidths(key).left + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin(key).left\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-center datatable-row-group\"\n        [style.width]=\"state.columnGroupWidths(key).center + 'px'\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin(key).center.length\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin(key).center\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-right datatable-row-group\"\n        *ngIf=\"state.columnsByPin(key).right.length\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        [style.width]=\"state.columnGroupWidths(key).right + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin(key).right\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableBodyRow);
    return DataTableBodyRow;
}());
exports.DataTableBodyRow = DataTableBodyRow;
//# sourceMappingURL=BodyRow.js.map