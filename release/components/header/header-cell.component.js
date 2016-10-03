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
var models_1 = require('../../models');
var types_1 = require('../../types');
var DataTableHeaderCell = (function () {
    function DataTableHeaderCell(element, state, renderer) {
        this.element = element;
        this.state = state;
        this.onColumnChange = new core_1.EventEmitter();
        this.sort = this.onSort.bind(this);
        renderer.setElementClass(this.element.nativeElement, 'datatable-header-cell', true);
    }
    Object.defineProperty(DataTableHeaderCell.prototype, "sortDir", {
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
    Object.defineProperty(DataTableHeaderCell.prototype, "name", {
        get: function () {
            return this.column.name || this.column.prop;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCell.prototype.sortClasses = function (sort) {
        var dir = this.sortDir;
        return {
            'sort-asc icon-down': dir === types_1.SortDirection.asc,
            'sort-desc icon-up': dir === types_1.SortDirection.desc
        };
    };
    DataTableHeaderCell.prototype.onSort = function () {
        if (this.column.sortable) {
            this.state.nextSort(this.column);
            this.onColumnChange.emit({
                type: 'sort',
                value: this.column
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.TableColumn)
    ], DataTableHeaderCell.prototype, "column", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderCell.prototype, "onColumnChange", void 0);
    DataTableHeaderCell = __decorate([
        core_1.Component({
            selector: 'datatable-header-cell',
            template: "\n    <div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        *ngIf=\"!column.headerTemplate\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"name\">\n      </span>\n      <template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ column: column, sort: sort }\">\n      </template>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses()\">\n      </span>\n    </div>\n  ",
            host: {
                '[class.sortable]': 'column.sortable',
                '[class.resizable]': 'column.resizable',
                '[style.width]': 'column.width + "px"',
                '[style.minWidth]': 'column.minWidth + "px"',
                '[style.maxWidth]': 'column.maxWidth + "px"',
                '[style.height]': 'column.height + "px"',
                '[attr.title]': 'name'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, services_1.StateService, core_1.Renderer])
    ], DataTableHeaderCell);
    return DataTableHeaderCell;
}());
exports.DataTableHeaderCell = DataTableHeaderCell;
//# sourceMappingURL=header-cell.component.js.map