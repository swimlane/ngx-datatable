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
var utils_1 = require('../utils');
var models_1 = require('../models');
var types_1 = require('../types');
var StateService = (function () {
    function StateService() {
        this.rows = [];
        this.selected = [];
        this.onSortChange = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
        this.scrollbarWidth = utils_1.scrollbarWidth();
        this.offsetX = 0;
        this.offsetY = 0;
        this.innerWidth = 0;
        // this body height is a placeholder
        // its only used internally, if you
        // need to set the tables element style height
        this.bodyHeight = 300;
    }
    Object.defineProperty(StateService.prototype, "columnsByPin", {
        get: function () {
            return utils_1.columnsByPin(this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "columnGroupWidths", {
        get: function () {
            return utils_1.columnGroupWidths(this.columnsByPin, this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "rowCount", {
        get: function () {
            if (!this.options.externalPaging) {
                return this.rows.length;
            }
            else {
                return this.options.count;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "pageSize", {
        get: function () {
            if (this.options.scrollbarV) {
                return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
            }
            else if (this.options.limit) {
                return this.options.limit;
            }
            else {
                return this.rows.length;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "indexes", {
        get: function () {
            var first = 0;
            var last = 0;
            if (this.options.scrollbarV) {
                var floor = Math.floor((this.offsetY || 0) / this.options.rowHeight);
                first = Math.max(floor, 0);
                last = Math.min(first + this.pageSize, this.rowCount);
            }
            else {
                first = Math.max(this.options.offset * this.pageSize, 0);
                last = Math.min(first + this.pageSize, this.rowCount);
            }
            return { first: first, last: last };
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.setSelected = function (selected) {
        if (!this.selected) {
            this.selected = selected || [];
        }
        else {
            this.selected.splice(0, this.selected.length);
            (_a = this.selected).push.apply(_a, selected);
        }
        this.onSelectionChange.emit(this.selected);
        return this;
        var _a;
    };
    StateService.prototype.setRows = function (rows) {
        if (rows) {
            this.rows = rows.slice();
            this.onRowsUpdate.emit(rows);
        }
        return this;
    };
    StateService.prototype.setOptions = function (options) {
        this.options = options;
        return this;
    };
    StateService.prototype.setPage = function (_a) {
        var type = _a.type, value = _a.value;
        this.options.offset = value - 1;
        this.onPageChange.emit({
            type: type,
            offset: this.options.offset,
            limit: this.pageSize,
            count: this.rowCount
        });
    };
    StateService.prototype.nextSort = function (column) {
        var idx = this.options.sorts.findIndex(function (s) {
            return s.prop === column.prop;
        });
        var curSort = this.options.sorts[idx];
        var curDir = undefined;
        if (curSort)
            curDir = curSort.dir;
        var dir = utils_1.nextSortDir(this.options.sortType, curDir);
        if (dir === undefined) {
            this.options.sorts.splice(idx, 1);
        }
        else if (curSort) {
            this.options.sorts[idx].dir = dir;
        }
        else {
            if (this.options.sortType === types_1.SortType.single) {
                this.options.sorts.splice(0, this.options.sorts.length);
            }
            this.options.sorts.push(new models_1.Sort({ dir: dir, prop: column.prop }));
        }
        if (!column.comparator) {
            this.setRows(utils_1.sortRows(this.rows, this.options.sorts));
        }
        else {
            column.comparator(this.rows, this.options.sorts);
        }
        this.onSortChange.emit({ column: column });
    };
    StateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map