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
            return this.state.selected &&
                this.state.selected.indexOf(this.row) > -1;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRow.prototype.stylesByGroup = function (group) {
        var widths = this.state.columnGroupWidths;
        var offsetX = this.state.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translate_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.state.innerWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.state.scrollbarWidth) * -1;
            translate_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
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
            template: "\n    <div>\n      <div\n        class=\"datatable-row-left\"\n        *ngIf=\"state.columnsByPin.left.length\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        [style.width]=\"state.columnGroupWidths.left + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\"\n        [style.width]=\"state.columnGroupWidths.center + 'px'\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"state.columnsByPin.center.length\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\"\n        *ngIf=\"state.columnsByPin.right.length\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        [style.width]=\"state.columnGroupWidths.right + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableBodyRow);
    return DataTableBodyRow;
}());
exports.DataTableBodyRow = DataTableBodyRow;
//# sourceMappingURL=BodyRow.js.map