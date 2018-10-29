"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function defaultSumFunc(cells) {
    var cellsWithValues = cells.filter(function (cell) { return !!cell; });
    if (!cellsWithValues.length) {
        return null;
    }
    if (cellsWithValues.some(function (cell) { return typeof cell !== 'number'; })) {
        return null;
    }
    return cellsWithValues.reduce(function (res, cell) { return res + cell; });
}
function noopSumFunc(cells) {
    return null;
}
var DataTableSummaryRowComponent = /** @class */ (function () {
    function DataTableSummaryRowComponent() {
        this.summaryRow = {};
    }
    DataTableSummaryRowComponent.prototype.ngOnChanges = function () {
        if (!this.columns || !this.rows) {
            return;
        }
        this.updateInternalColumns();
        this.updateValues();
    };
    DataTableSummaryRowComponent.prototype.updateInternalColumns = function () {
        this._internalColumns = this.columns.map(function (col) { return (__assign({}, col, { cellTemplate: col.summaryTemplate })); });
    };
    DataTableSummaryRowComponent.prototype.updateValues = function () {
        var _this = this;
        this.summaryRow = {};
        this.columns
            .filter(function (col) { return !col.summaryTemplate; })
            .forEach(function (col) {
            var cellsFromSingleColumn = _this.rows.map(function (row) { return row[col.prop]; });
            var sumFunc = _this.getSummaryFunction(col);
            _this.summaryRow[col.prop] = col.pipe ?
                col.pipe.transform(sumFunc(cellsFromSingleColumn)) :
                sumFunc(cellsFromSingleColumn);
        });
    };
    DataTableSummaryRowComponent.prototype.getSummaryFunction = function (column) {
        if (column.summaryFunc === undefined) {
            return defaultSumFunc;
        }
        else if (column.summaryFunc === null) {
            return noopSumFunc;
        }
        else {
            return column.summaryFunc;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "innerWidth", void 0);
    DataTableSummaryRowComponent = __decorate([
        core_1.Component({
            selector: 'datatable-summary-row',
            template: "\n  <datatable-body-row\n    *ngIf=\"summaryRow && _internalColumns\"\n    tabindex=\"-1\"\n    [innerWidth]=\"innerWidth\"\n    [offsetX]=\"offsetX\"\n    [columns]=\"_internalColumns\"\n    [rowHeight]=\"rowHeight\"\n    [row]=\"summaryRow\"\n    [rowIndex]=\"-1\">\n  </datatable-body-row>\n  ",
            host: {
                class: 'datatable-summary-row'
            }
        })
    ], DataTableSummaryRowComponent);
    return DataTableSummaryRowComponent;
}());
exports.DataTableSummaryRowComponent = DataTableSummaryRowComponent;
//# sourceMappingURL=summary-row.component.js.map