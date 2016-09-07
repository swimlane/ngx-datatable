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
var column_1 = require('../utils/column');
var scrollbarWidth_1 = require('../utils/scrollbarWidth');
var sort_1 = require('../utils/sort');
var Sort_1 = require('../models/Sort');
var SortType_1 = require('../enums/SortType');
var _ = require('lodash');
var StateService = (function () {
    function StateService() {
        this.options = new Map();
        this.rows = new Map();
        this.selected = new Map();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
        this.scrollbarWidth = new Map();
        this.offsetX = new Map();
        this.offsetY = new Map();
        this.innerWidth = new Map();
        this.bodyHeight = new Map();
    }
    StateService.prototype.newInstance = function () {
        var key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        this.bodyHeight.set(key, 300);
        this.offsetX.set(key, 0);
        this.offsetY.set(key, 0);
        this.innerWidth.set(key, 0);
        this.scrollbarWidth.set(key, scrollbarWidth_1.scrollbarWidth());
        return key;
    };
    StateService.prototype.getScrollbarWidth = function (key) {
        return this.scrollbarWidth.get(key);
    };
    StateService.prototype.setScollbarWidth = function (key, value) {
        this.scrollbarWidth.set(key, value);
        return this;
    };
    StateService.prototype.getOffsetX = function (key) {
        return this.offsetX.get(key);
    };
    StateService.prototype.setOffsetX = function (key, value) {
        this.offsetX.set(key, value);
        return this;
    };
    StateService.prototype.getOffsetY = function (key) {
        return this.offsetY.get(key);
    };
    StateService.prototype.setOffsetY = function (key, value) {
        this.offsetY.set(key, value);
        return this;
    };
    StateService.prototype.getInnerWidth = function (key) {
        return this.innerWidth.get(key);
    };
    StateService.prototype.setInnerWidth = function (key, value) {
        this.innerWidth.set(key, value);
        return this;
    };
    StateService.prototype.getBodyHeight = function (key) {
        return this.bodyHeight.get(key);
    };
    StateService.prototype.setBodyHeight = function (key, value) {
        this.bodyHeight.set(key, value);
        return this;
    };
    StateService.prototype.columnsByPin = function (key) {
        return column_1.columnsByPin(this.getOption(key, 'columns'));
    };
    StateService.prototype.columnGroupWidths = function (key) {
        return column_1.columnGroupWidths(this.columnsByPin(key), this.getOption(key, 'columns'));
    };
    StateService.prototype.rowCount = function (key) {
        if (!this.getOption(key, 'externalPaging')) {
            return this.rows.get(key).length;
        }
        else {
            return this.getOption(key, 'count');
        }
    };
    StateService.prototype.getRows = function (key) {
        return this.rows.get(key);
    };
    StateService.prototype.pageSize = function (key) {
        if (this.getOption(key, 'scrollbarV')) {
            return Math.ceil(this.getBodyHeight(key) / this.getOption(key, 'rowHeight')) + 1;
        }
        else if (this.getOption(key, 'limit')) {
            return this.getOption(key, 'limit');
        }
        else {
            return this.rows.get(key).length;
        }
    };
    StateService.prototype.indexes = function (key) {
        var first = 0;
        var last = 0;
        if (this.getOption(key, 'scrollbarV')) {
            var floor = Math.floor((this.getOffsetY(key) || 0) / this.getOption(key, 'rowHeight'));
            first = Math.max(floor, 0);
            last = Math.min(first + this.pageSize(key), this.rowCount(key));
        }
        else {
            first = Math.max(this.getOption(key, 'offset') * this.pageSize(key), 0);
            last = Math.min(first + this.pageSize(key), this.rowCount(key));
        }
        return { first: first, last: last };
    };
    StateService.prototype.setSelected = function (key, selected) {
        if (!this.selected.get(key)) {
            this.selected.set(key, selected || []);
        }
        else {
            var selected_1 = this.selected.get(key);
            selected_1.splice(0, selected_1.length);
            selected_1.push.apply(selected_1, selected_1);
            this.selected.set(key, selected_1);
        }
        this.onSelectionChange.emit(this.selected);
        return this;
    };
    StateService.prototype.getSelected = function (key) {
        return this.selected.get(key);
    };
    StateService.prototype.setRows = function (key, rows) {
        if (rows) {
            this.rows.set(key, rows.slice());
            this.onRowsUpdate.emit(rows);
        }
        return this;
    };
    StateService.prototype.setOptions = function (key, options) {
        this.options.set(key, options);
        return this;
    };
    StateService.prototype.addOption = function (key, option) {
        var options = this.options.get(key);
        _.extend(options, option);
        this.options.set(key, options);
        return this;
    };
    StateService.prototype.getOption = function (key, option) {
        var options = this.options.get(key);
        return options[option];
    };
    StateService.prototype.updateOption = function (key, option, value) {
        var options = this.options.get(key);
        var obj = { option: value };
        _.merge(options, obj);
        this.options.set(key, options);
        return this;
    };
    StateService.prototype.deleteOption = function (key, option) {
    };
    StateService.prototype.getOptions = function (key) {
        return this.options.get(key);
    };
    StateService.prototype.setPage = function (key, _a) {
        var type = _a.type, value = _a.value;
        this.updateOption(key, 'offset', value - 1);
        this.onPageChange.emit({
            type: type,
            offset: this.getOption(key, 'offset'),
            limit: this.pageSize(key),
            count: this.rowCount(key)
        });
    };
    StateService.prototype.nextSort = function (key, column) {
        var idx = this.getOption(key, 'sorts').findIndex(function (s) {
            return s.prop === column.prop;
        });
        var currentSort = this.getOption(key, 'sorts');
        var curSort = currentSort[idx];
        var curDir = undefined;
        if (curSort)
            curDir = curSort.dir;
        var dir = sort_1.nextSortDir(this.getOption(key, 'sortType'), curDir);
        if (dir === undefined) {
            currentSort.splice(idx, 1);
        }
        else if (curSort) {
            currentSort[idx].dir = dir;
        }
        else {
            if (this.getOption(key, 'sortType') === SortType_1.SortType.single) {
                currentSort.splice(0, currentSort.length);
            }
            currentSort.push(new Sort_1.Sort({ dir: dir, prop: column.prop }));
        }
        console.debug('Current Sort', currentSort);
        this.updateOption(key, 'sorts', currentSort);
        if (!column.comparator) {
            var rows = this.rows.get(key);
            this.setRows(key, sort_1.sortRows(rows, currentSort));
        }
        else {
            column.comparator(this.rows, currentSort);
        }
    };
    StateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=State.js.map