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
var models_1 = require('../../models');
var utils_1 = require('../../utils');
var services_1 = require('../../services');
var DataTableBodyCell = (function () {
    function DataTableBodyCell(state) {
        this.state = state;
    }
    Object.defineProperty(DataTableBodyCell.prototype, "cssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "height", {
        get: function () {
            var height = this.state.options.rowHeight;
            if (isNaN(height))
                return height;
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "sortDir", {
        get: function () {
            var _this = this;
            var sort = this.state.options.sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "value", {
        get: function () {
            if (!this.row)
                return '';
            var prop = utils_1.deepValueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            return userPipe ? userPipe.transform(prop) : prop;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.TableColumn)
    ], DataTableBodyCell.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "row", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', String)
    ], DataTableBodyCell.prototype, "cssClasses", null);
    __decorate([
        core_1.HostBinding('style.width.px'), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "width", null);
    __decorate([
        core_1.HostBinding('style.height'), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "height", null);
    DataTableBodyCell = __decorate([
        core_1.Component({
            selector: 'datatable-body-cell',
            template: "\n    <div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{ value: value, row: row, column: column }\">\n      </template>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_1.StateService])
    ], DataTableBodyCell);
    return DataTableBodyCell;
}());
exports.DataTableBodyCell = DataTableBodyCell;
//# sourceMappingURL=body-cell.component.js.map