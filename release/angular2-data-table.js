(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angular2DataTable = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var State_1 = require('../services/State');
var Visibility_1 = require('../directives/Visibility');
var math_1 = require('../utils/math');
var ColumnMode_1 = require('../enums/ColumnMode');
var TableOptions_1 = require('../models/TableOptions');
var TableColumn_1 = require('../models/TableColumn');
var DataTableColumn_1 = require('./DataTableColumn');
var Header_1 = require('./header/Header');
var Body_1 = require('./body/Body');
var Footer_1 = require('./footer/Footer');
var DataTable = (function () {
    function DataTable(element, state, differs) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onColumnChange = new core_1.EventEmitter();
        this.element = element.nativeElement;
        this.element.classList.add('datatable');
        this.rowDiffer = differs.find({}).create(null);
        this.colDiffer = differs.find({}).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        var _a = this, options = _a.options, rows = _a.rows, selected = _a.selected;
        this.state
            .setOptions(options)
            .setRows(rows)
            .setSelected(selected);
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.adjustColumns();
        setTimeout(function () {
            for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                var col = _a[_i];
                _this.options.columns.push(new TableColumn_1.TableColumn(col));
            }
        });
    };
    DataTable.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.state.setRows(this.rows);
            this.onRowsUpdate.emit(this.rows);
        }
        this.checkColumnToggles();
    };
    DataTable.prototype.checkColumnToggles = function () {
        var colDiff = this.colDiffer.diff(this.options.columns);
        if (colDiff) {
            var chngd_1 = false;
            colDiff.forEachAddedItem(function (c) {
                chngd_1 = true;
                return false;
            });
            if (!chngd_1) {
                colDiff.forEachRemovedItem(function (c) {
                    chngd_1 = true;
                    return false;
                });
            }
            if (chngd_1)
                this.adjustColumns();
        }
    };
    DataTable.prototype.adjustSizes = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.state.innerWidth = Math.floor(width);
        if (this.options.scrollbarV) {
            if (this.options.headerHeight)
                height = -this.options.headerHeight;
            if (this.options.footerHeight)
                height = -this.options.footerHeight;
            this.state.bodyHeight = height;
        }
        this.adjustColumns();
    };
    DataTable.prototype.resize = function () { this.adjustSizes(); };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.options.columns)
            return;
        var width = this.state.innerWidth;
        if (this.options.scrollbarV) {
            width = -this.state.scrollbarWidth;
        }
        if (this.options.columnMode === ColumnMode_1.ColumnMode.force) {
            math_1.forceFillColumnWidths(this.options.columns, width, forceIdx);
        }
        else if (this.options.columnMode === ColumnMode_1.ColumnMode.flex) {
            math_1.adjustColumnWidths(this.options.columns, width);
        }
    };
    DataTable.prototype.onPageChanged = function (event) {
        this.state.setPage(event);
        this.onPageChange.emit(event);
    };
    DataTable.prototype.onRowSelect = function (event) {
        this.state.setSelected(event);
        this.onSelectionChange.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableOptions_1.TableOptions)
    ], DataTable.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowsUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSelectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColumnChange", void 0);
    __decorate([
        core_1.ContentChildren(DataTableColumn_1.DataTableColumn), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTable.prototype, "resize", null);
    DataTable = __decorate([
        core_1.Component({
            selector: 'datatable',
            template: "\n  \t<div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </datatable-header>\n      <datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </datatable-body>\n      <datatable-footer\n        (onPageChange)=\"onPageChanged($event)\">\n      </datatable-footer>\n    </div>\n  ",
            directives: [
                Header_1.DataTableHeader,
                Body_1.DataTableBody,
                Footer_1.DataTableFooter,
                Visibility_1.Visibility
            ],
            host: {
                '[class.fixed-header]': 'options.headerHeight !== "auto"',
                '[class.fixed-row]': 'options.rowHeight !== "auto"',
                '[class.scroll-vertical]': 'options.scrollbarV',
                '[class.scroll-horz]': 'options.scrollbarH',
                '[class.selectable]': 'options.selectable',
                '[class.checkboxable]': 'options.checkboxable'
            },
            providers: [State_1.StateService]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, State_1.StateService, core_1.KeyValueDiffers])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;

},{"../directives/Visibility":17,"../enums/ColumnMode":18,"../models/TableColumn":24,"../models/TableOptions":25,"../services/State":26,"../utils/math":33,"./DataTableColumn":2,"./body/Body":3,"./footer/Footer":7,"./header/Header":9,"@angular/core":undefined}],2:[function(require,module,exports){
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
var TableColumn_1 = require('../models/TableColumn');
var DataTableColumn = (function () {
    function DataTableColumn() {
    }
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', Object)
    ], DataTableColumn.prototype, "template", void 0);
    DataTableColumn = __decorate([
        core_1.Directive({
            selector: 'datatable-column',
            inputs: TableColumn_1.TableColumn.getProps()
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumn);
    return DataTableColumn;
}());
exports.DataTableColumn = DataTableColumn;

},{"../models/TableColumn":24,"@angular/core":undefined}],3:[function(require,module,exports){
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
var State_1 = require('../../services/State');
var SelectionType_1 = require('../../enums/SelectionType');
var keys_1 = require('../../utils/keys');
var selection_1 = require('../../utils/selection');
var ProgressBar_1 = require('./ProgressBar');
var BodyRow_1 = require('./BodyRow');
var Scroller_1 = require('../../directives/Scroller');
var DataTableBody = (function () {
    function DataTableBody(state, elm) {
        this.state = state;
        this.onRowClick = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        elm.nativeElement.classList.add('datatable-body');
    }
    Object.defineProperty(DataTableBody.prototype, "selectEnabled", {
        get: function () {
            return this.state.options.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyHeight", {
        get: function () {
            if (this.state.options.scrollbarV)
                return this.state.bodyHeight + 'px';
            return 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyWidth", {
        get: function () {
            if (this.state.options.scrollbarH)
                return this.state.innerWidth + 'px';
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableBody.prototype.ngOnInit = function () {
        var _this = this;
        this.rows = this.state.rows.slice();
        this.state.onPageChange.subscribe(function (page) {
            var _a = _this.state.indexes, first = _a.first, last = _a.last;
            _this.rows = _this.state.rows.slice(first, last);
            _this.hideIndicator();
        });
        this.state.onRowsUpdate.subscribe(function (rows) {
            var _a = _this.state.indexes, first = _a.first, last = _a.last;
            _this.rows = rows.slice(first, last);
            _this.hideIndicator();
        });
    };
    DataTableBody.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () {
            _this.state.options.loadingIndicator = false;
        }, 500);
    };
    DataTableBody.prototype.rowClicked = function (event, index, row) {
        this.onRowClick.emit({ event: event, row: row });
        this.selectRow(event, index, row);
    };
    DataTableBody.prototype.rowKeydown = function (event, index, row) {
        if (event.keyCode === keys_1.Keys.return && this.selectEnabled) {
            this.selectRow(event, index, row);
        }
        else if (event.keyCode === keys_1.Keys.up || event.keyCode === keys_1.Keys.down) {
            var dom = event.keyCode === keys_1.Keys.up ?
                event.target.previousElementSibling :
                event.target.nextElementSibling;
            if (dom)
                dom.focus();
        }
    };
    DataTableBody.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var multiShift = this.state.options.selectionType === SelectionType_1.SelectionType.multiShift;
        var multiClick = this.state.options.selectionType === SelectionType_1.SelectionType.multi;
        var selections = [];
        if (multiShift || multiClick) {
            if (multiShift && event.shiftKey) {
                var selected = this.state.selected.slice();
                selections = selection_1.selectRowsBetween(selected, this.rows, index, this.prevIndex);
            }
            else if (multiShift && !event.shiftKey) {
                selections.push(row);
            }
            else {
                var selected = this.state.selected.slice();
                selections = selection_1.selectRows(selected, row);
            }
        }
        else {
            selections.push(row);
        }
        this.prevIndex = index;
        this.onRowSelect.emit(selections);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBody.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBody.prototype, "onRowSelect", void 0);
    DataTableBody = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <div>\n      <datatable-progress\n        [hidden]=\"!state.options.loadingIndicator\">\n      </datatable-progress>\n      <div\n        scroller\n        *ngIf=\"state.rows.length\"\n        [rowHeight]=\"state.options.rowHeight\"\n        [count]=\"state.rowCount\"\n        [scrollWidth]=\"state.columnGroupWidths.total\">\n        <datatable-body-row\n          *ngFor=\"let row of rows; let i = index;\"\n          [attr.tabindex]=\"i\"\n          (click)=\"rowClicked($event, i, row)\"\n          (keydown)=\"rowKeydown($event, i, row)\"\n          [row]=\"row\">\n        </datatable-body-row>\n      </div>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"state.options.emptyMessage\">\n      </div>\n    </div>\n  ",
            directives: [
                ProgressBar_1.ProgressBar,
                BodyRow_1.DataTableBodyRow,
                Scroller_1.Scroller
            ],
            host: {
                '[style.width]': 'bodyWidth',
                '[style.height]': 'bodyHeight'
            }
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableBody);
    return DataTableBody;
}());
exports.DataTableBody = DataTableBody;

},{"../../directives/Scroller":15,"../../enums/SelectionType":19,"../../services/State":26,"../../utils/keys":32,"../../utils/selection":35,"./BodyRow":5,"./ProgressBar":6,"@angular/core":undefined}],4:[function(require,module,exports){
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
var TableColumn_1 = require('../../models/TableColumn');
var deepGetter_1 = require('../../utils/deepGetter');
var TemplateWrapper_1 = require('../../directives/TemplateWrapper');
var DataTableBodyCell = (function () {
    function DataTableBodyCell(elm, viewContainerRef, componentResolver) {
        this.elm = elm;
        this.viewContainerRef = viewContainerRef;
        this.componentResolver = componentResolver;
        elm.nativeElement.classList.add('datatable-body-cell');
    }
    Object.defineProperty(DataTableBodyCell.prototype, "value", {
        get: function () {
            if (!this.row)
                return '';
            return deepGetter_1.deepValueGetter(this.row, this.column.prop);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableColumn_1.TableColumn)
    ], DataTableBodyCell.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "row", void 0);
    DataTableBodyCell = __decorate([
        core_1.Component({
            selector: 'datatable-body-cell',
            template: "\n  \t<div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.template\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.template\"\n        [value]=\"value\"\n        [row]=\"row\"\n        [column]=\"column\"\n        [templateWrapper]=\"column.template\">\n      </template>\n    </div>\n  ",
            host: {
                '[style.width]': 'column.width + "px"',
                '[style.height]': 'column.height + "px"'
            },
            directives: [TemplateWrapper_1.TemplateWrapper]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentResolver])
    ], DataTableBodyCell);
    return DataTableBodyCell;
}());
exports.DataTableBodyCell = DataTableBodyCell;

},{"../../directives/TemplateWrapper":16,"../../models/TableColumn":24,"../../utils/deepGetter":30,"@angular/core":undefined}],5:[function(require,module,exports){
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
var State_1 = require('../../services/State');
var BodyCell_1 = require('./BodyCell');
var DataTableBodyRow = (function () {
    function DataTableBodyRow(state, elm) {
        this.state = state;
        elm.nativeElement.classList.add('datatable-body-row');
    }
    Object.defineProperty(DataTableBodyRow.prototype, "isSelected", {
        get: function () {
            return this.state.selected &&
                this.state.selected.indexOf(this.row) > -1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "row", void 0);
    DataTableBodyRow = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            template: "\n  \t<div>\n      <div\n        class=\"datatable-row-left\"\n        *ngIf=\"state.columnsByPin.left.length\"\n        [style.width]=\"state.columnGroupWidths.left + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\"\n        [style.width]=\"state.columnGroupWidths.center + 'px'\"\n        *ngIf=\"state.columnsByPin.center.length\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\"\n        *ngIf=\"state.columnsByPin.right.length\"\n        [style.width]=\"state.columnGroupWidths.right + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  ",
            directives: [BodyCell_1.DataTableBodyCell],
            host: {
                '[class.active]': 'isSelected'
            }
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableBodyRow);
    return DataTableBodyRow;
}());
exports.DataTableBodyRow = DataTableBodyRow;

},{"../../services/State":26,"./BodyCell":4,"@angular/core":undefined}],6:[function(require,module,exports){
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
var ProgressBar = (function () {
    function ProgressBar() {
    }
    ProgressBar = __decorate([
        core_1.Component({
            selector: 'datatable-progress',
            template: "\n    <div\n      class=\"progress-linear\"\n      role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;

},{"@angular/core":undefined}],7:[function(require,module,exports){
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
var State_1 = require('../../services/State');
var Pager_1 = require('./Pager');
var DataTableFooter = (function () {
    function DataTableFooter(elm, state) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        elm.nativeElement.classList.add('datatable-footer');
    }
    Object.defineProperty(DataTableFooter.prototype, "visible", {
        get: function () {
            return (this.state.pageCount / this.state.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooter.prototype, "curPage", {
        get: function () {
            return this.state.options.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableFooter.prototype, "onPageChange", void 0);
    DataTableFooter = __decorate([
        core_1.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      *ngIf=\"state.options.footerHeight\"\n      [style.height]=\"state.options.footerHeight\">\n      <div class=\"page-count\">{{state.pageCount}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.pageCount\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  ",
            directives: [Pager_1.DataTablePager]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, State_1.StateService])
    ], DataTableFooter);
    return DataTableFooter;
}());
exports.DataTableFooter = DataTableFooter;

},{"../../services/State":26,"./Pager":8,"@angular/core":undefined}],8:[function(require,module,exports){
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
var DataTablePager = (function () {
    function DataTablePager(elm) {
        this.size = 0;
        this.onPaged = new core_1.EventEmitter();
        elm.nativeElement.classList.add('datatable-pager');
    }
    Object.defineProperty(DataTablePager.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePager.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePager.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    DataTablePager.prototype.canPrevious = function () {
        return this.page > 1;
    };
    DataTablePager.prototype.canNext = function () {
        return this.page < this.totalPages;
    };
    DataTablePager.prototype.prevPage = function () {
        if (this.page > 1) {
            this.selectPage(--this.page);
        }
    };
    DataTablePager.prototype.nextPage = function () {
        this.selectPage(++this.page);
    };
    DataTablePager.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages) {
            this.page = page;
            this.onPaged.emit(page);
        }
    };
    DataTablePager.prototype.calcPages = function (page) {
        var pages = [], startPage = 1, endPage = this.totalPages, maxSize = 5, isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
            endPage = Math.min(startPage + maxSize - 1, this.totalPages);
        }
        for (var number = startPage; number <= endPage; number++) {
            pages.push({
                number: number,
                text: number
            });
        }
        return pages;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTablePager.prototype, "size", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTablePager.prototype, "onPaged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTablePager.prototype, "count", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTablePager.prototype, "page", null);
    DataTablePager = __decorate([
        core_1.Component({
            selector: 'datatable-pager',
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\"\n          class=\"icon-prev\">\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\"\n          class=\"icon-left\">\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\"\n          class=\"icon-right\">\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\"\n          class=\"icon-skip\">\n        </a>\n      </li>\n    </ul>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DataTablePager);
    return DataTablePager;
}());
exports.DataTablePager = DataTablePager;

},{"@angular/core":undefined}],9:[function(require,module,exports){
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
var State_1 = require('../../services/State');
var LongPress_1 = require('../../directives/LongPress');
var Draggable_1 = require('../../directives/Draggable');
var Resizable_1 = require('../../directives/Resizable');
var Orderable_1 = require('../../directives/Orderable');
var HeaderCell_1 = require('./HeaderCell');
var DataTableHeader = (function () {
    function DataTableHeader(state, elm) {
        this.state = state;
        this.onColumnChange = new core_1.EventEmitter();
        elm.nativeElement.classList.add('datatable-header');
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeader.prototype, "onColumnChange", void 0);
    DataTableHeader = __decorate([
        core_1.Component({
            selector: 'datatable-header',
            template: "\n  \t<div\n      [style.width]=\"state.columnGroupWidths.total\"\n      class=\"datatable-header-inner\"\n      orderable\n      (onReorder)=\"columnReordered($event)\">\n      <div\n        class=\"datatable-row-left\"\n        [style.width]=\"state.columnGroupWidths.left + 'px'\"\n        *ngIf=\"state.columnsByPin.left.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [model]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\"\n        [style.width]=\"state.columnGroupWidths.center + 'px'\"\n        *ngIf=\"state.columnsByPin.center.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [model]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\"\n        [style.width]=\"state.columnGroupWidths.right + 'px'\"\n        *ngIf=\"state.columnsByPin.right.length\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"drag = true\"\n          (onLongPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [model]=\"column\"\n          (onColumnChange)=\"onColumnChange.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            directives: [
                HeaderCell_1.DataTableHeaderCell,
                Draggable_1.Draggable,
                Resizable_1.Resizable,
                Orderable_1.Orderable,
                LongPress_1.LongPress
            ],
            host: {
                '[style.width]': 'headerWidth',
                '[style.height]': 'headerHeight'
            }
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableHeader);
    return DataTableHeader;
}());
exports.DataTableHeader = DataTableHeader;

},{"../../directives/Draggable":11,"../../directives/LongPress":12,"../../directives/Orderable":13,"../../directives/Resizable":14,"../../services/State":26,"./HeaderCell":10,"@angular/core":undefined}],10:[function(require,module,exports){
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
var State_1 = require('../../services/State');
var TableColumn_1 = require('../../models/TableColumn');
var SortDirection_1 = require('../../enums/SortDirection');
var DataTableHeaderCell = (function () {
    function DataTableHeaderCell(element, state) {
        this.element = element;
        this.state = state;
        this.onColumnChange = new core_1.EventEmitter();
        element.nativeElement.classList.add('datatable-header-cell');
    }
    Object.defineProperty(DataTableHeaderCell.prototype, "sortDir", {
        get: function () {
            var _this = this;
            var sort = this.state.options.sorts.find(function (s) {
                return s.prop === _this.model.prop;
            });
            if (sort)
                return sort.dir;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCell.prototype.sortClasses = function (sort) {
        var dir = this.sortDir;
        return {
            'sort-asc icon-down': dir === SortDirection_1.SortDirection.asc,
            'sort-desc icon-up': dir === SortDirection_1.SortDirection.desc
        };
    };
    DataTableHeaderCell.prototype.onSort = function () {
        if (this.model.sortable) {
            this.state.nextSort(this.model);
            this.onColumnChange.emit({
                type: 'sort',
                value: this.model
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableColumn_1.TableColumn)
    ], DataTableHeaderCell.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderCell.prototype, "onColumnChange", void 0);
    DataTableHeaderCell = __decorate([
        core_1.Component({
            selector: 'datatable-header-cell',
            template: "\n  \t<div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"model.name\">\n      </span>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses()\">\n      </span>\n    </div>\n  ",
            host: {
                '[class.sortable]': 'model.sortable',
                '[class.resizable]': 'model.resizable',
                '[style.width]': 'model.width + "px"',
                '[style.minWidth]': 'model.minWidth + "px"',
                '[style.maxWidth]': 'model.maxWidth + "px"',
                '[style.height]': 'model.height + "px"',
                '[attr.title]': 'model.name'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, State_1.StateService])
    ], DataTableHeaderCell);
    return DataTableHeaderCell;
}());
exports.DataTableHeaderCell = DataTableHeaderCell;

},{"../../enums/SortDirection":20,"../../models/TableColumn":24,"../../services/State":26,"@angular/core":undefined}],11:[function(require,module,exports){
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
var rxjs_1 = require('rxjs');
var Draggable = (function () {
    function Draggable(element) {
        this.dragX = true;
        this.dragY = true;
        this.onDragStart = new core_1.EventEmitter();
        this.onDragging = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.dragging = false;
        this.element = element.nativeElement;
    }
    Draggable.prototype.onMouseup = function (event) {
        this.dragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.onDragEnd.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    Draggable.prototype.onMousedown = function (event) {
        var _this = this;
        if (event.target.classList.contains('draggable')) {
            event.preventDefault();
            this.dragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            this.subscription = rxjs_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (event) { return _this.move(event, mouseDownPos_1); });
            this.onDragStart.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    Draggable.prototype.move = function (event, mouseDownPos) {
        if (!this.dragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        if (this.dragX || this.dragY) {
            this.element.classList.add('dragging');
            this.onDragging.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Draggable.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Draggable.prototype, "dragX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Draggable.prototype, "dragY", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragging", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousedown", null);
    Draggable = __decorate([
        core_1.Directive({ selector: '[draggable]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;

},{"@angular/core":undefined,"rxjs":undefined}],12:[function(require,module,exports){
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
var LongPress = (function () {
    function LongPress() {
        this.duration = 500;
        this.onLongPress = new core_1.EventEmitter();
        this.onLongPressing = new core_1.EventEmitter();
        this.onLongPressEnd = new core_1.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPress.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPress.prototype, "longPress", {
        get: function () { return this.longPressing; },
        enumerable: true,
        configurable: true
    });
    LongPress.prototype.onMouseDown = function (event) {
        var _this = this;
        if (event.which !== 1)
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.longPressing = false;
        this.timeout = setTimeout(function () {
            _this.longPressing = true;
            _this.onLongPress.emit(event);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPress.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.longPressing) {
            var xThres = (event.clientX - this.mouseX) > 10;
            var yThres = (event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPress.prototype.loop = function (event) {
        var _this = this;
        if (this.longPressing) {
            this.timeout = setTimeout(function () {
                _this.onLongPressing.emit(event);
                _this.loop(event);
            }, 50);
        }
    };
    LongPress.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    };
    LongPress.prototype.onMouseUp = function () { this.endPress(); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LongPress.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPress.prototype, "onLongPress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPress.prototype, "onLongPressing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPress.prototype, "onLongPressEnd", void 0);
    __decorate([
        core_1.HostBinding('class.press'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.longpress'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "longPress", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseMove", null);
    __decorate([
        core_1.HostListener('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseUp", null);
    LongPress = __decorate([
        core_1.Directive({ selector: '[long-press]' }), 
        __metadata('design:paramtypes', [])
    ], LongPress);
    return LongPress;
}());
exports.LongPress = LongPress;

},{"@angular/core":undefined}],13:[function(require,module,exports){
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
var Draggable_1 = require('./Draggable');
var Orderable = (function () {
    function Orderable() {
        this.onReorder = new core_1.EventEmitter();
    }
    Orderable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.drags.forEach(function (d) {
            return d.onDragStart.subscribe(_this.onDragStart.bind(_this)) &&
                d.onDragEnd.subscribe(_this.onDragEnd.bind(_this));
        });
    };
    Orderable.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.drags.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            this.positions[dragger.model.prop] = {
                left: parseInt(elm.offsetLeft.toString()),
                index: i++
            };
        }
    };
    Orderable.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model;
        var newPos = parseInt(element.offsetLeft.toString());
        var prevPos = this.positions[model.prop];
        var i = 0;
        for (var prop in this.positions) {
            var pos = this.positions[prop];
            var movedLeft = newPos < pos.left && prevPos.left > pos.left;
            var movedRight = newPos > pos.left && prevPos.left < pos.left;
            if (movedLeft || movedRight) {
                this.onReorder.emit({
                    prevIndex: prevPos.index,
                    newIndex: i,
                    model: model
                });
            }
            i++;
        }
        element.style.left = 'auto';
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Orderable.prototype, "onReorder", void 0);
    __decorate([
        core_1.ContentChildren(Draggable_1.Draggable), 
        __metadata('design:type', core_1.QueryList)
    ], Orderable.prototype, "drags", void 0);
    Orderable = __decorate([
        core_1.Directive({ selector: '[orderable]' }), 
        __metadata('design:paramtypes', [])
    ], Orderable);
    return Orderable;
}());
exports.Orderable = Orderable;

},{"./Draggable":11,"@angular/core":undefined}],14:[function(require,module,exports){
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
var rxjs_1 = require('rxjs');
var Resizable = (function () {
    function Resizable(element) {
        this.resizeEnabled = true;
        this.onResize = new core_1.EventEmitter();
        this.prevScreenX = 0;
        this.resizing = false;
        this.element = element.nativeElement;
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    Resizable.prototype.onMouseup = function (event) {
        this.resizing = false;
        if (this.subcription) {
            this.subcription.unsubscribe();
            this.onResize.emit(this.element.clientWidth);
        }
    };
    Resizable.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = event.target.classList.contains('resize-handle');
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subcription = rxjs_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (event) { return _this.move(event); });
        }
    };
    Resizable.prototype.move = function (event) {
        var movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
        var width = this.element.clientWidth;
        var newWidth = width + (movementX || 0);
        this.prevScreenX = event.screenX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Resizable.prototype, "resizeEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Resizable.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Resizable.prototype, "maxWidth", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Resizable.prototype, "onResize", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Resizable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Resizable.prototype, "onMousedown", null);
    Resizable = __decorate([
        core_1.Directive({
            selector: '[resizable]',
            host: {
                '[class.resizable]': 'resizeEnabled'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Resizable);
    return Resizable;
}());
exports.Resizable = Resizable;

},{"@angular/core":undefined,"rxjs":undefined}],15:[function(require,module,exports){
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
var Scroller = (function () {
    function Scroller(elm) {
        elm.nativeElement.classList.add('scroller');
    }
    Object.defineProperty(Scroller.prototype, "scrollHeight", {
        get: function () {
            return (this.count * this.rowHeight) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "count", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollWidth", void 0);
    Scroller = __decorate([
        core_1.Directive({
            selector: '[scroller]',
            host: {
                '[style.height]': 'scrollHeight',
                '[style.width]': 'scrollWidth + "px"'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Scroller);
    return Scroller;
}());
exports.Scroller = Scroller;

},{"@angular/core":undefined}],16:[function(require,module,exports){
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
var core_1 = require("@angular/core");
var TemplateWrapper = (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnChanges = function (changes) {
        if (changes['templateWrapper']) {
            if (this.embeddedViewRef) {
                this.embeddedViewRef.destroy();
            }
            this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateWrapper, {
                value: this.value,
                row: this.row,
                column: this.column
            });
        }
        if (this.embeddedViewRef) {
            this.embeddedViewRef.context.value = this.value;
            this.embeddedViewRef.context.row = this.row;
            this.embeddedViewRef.context.column = this.column;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], TemplateWrapper.prototype, "templateWrapper", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TemplateWrapper.prototype, "column", void 0);
    TemplateWrapper = __decorate([
        core_1.Directive({ selector: '[templateWrapper]' }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], TemplateWrapper);
    return TemplateWrapper;
}());
exports.TemplateWrapper = TemplateWrapper;

},{"@angular/core":undefined}],17:[function(require,module,exports){
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
var VisibilityObserver_1 = require('../utils/VisibilityObserver');
var Visibility = (function () {
    function Visibility(element) {
        this.visible = false;
        this.onVisibilityChange = new core_1.EventEmitter();
        new VisibilityObserver_1.VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
    }
    Visibility.prototype.visbilityChange = function () {
        this.visible = true;
        this.onVisibilityChange.emit(true);
    };
    __decorate([
        core_1.HostBinding('class.visible'), 
        __metadata('design:type', Boolean)
    ], Visibility.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Visibility.prototype, "onVisibilityChange", void 0);
    Visibility = __decorate([
        core_1.Directive({ selector: '[visibility-observer]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Visibility);
    return Visibility;
}());
exports.Visibility = Visibility;

},{"../utils/VisibilityObserver":27,"@angular/core":undefined}],18:[function(require,module,exports){
"use strict";
(function (ColumnMode) {
    ColumnMode[ColumnMode["standard"] = 'standard'] = "standard";
    ColumnMode[ColumnMode["flex"] = 'flex'] = "flex";
    ColumnMode[ColumnMode["force"] = 'force'] = "force";
})(exports.ColumnMode || (exports.ColumnMode = {}));
var ColumnMode = exports.ColumnMode;

},{}],19:[function(require,module,exports){
"use strict";
(function (SelectionType) {
    SelectionType[SelectionType["single"] = 'single'] = "single";
    SelectionType[SelectionType["multi"] = 'multi'] = "multi";
    SelectionType[SelectionType["multiShift"] = 'multiShift'] = "multiShift";
})(exports.SelectionType || (exports.SelectionType = {}));
var SelectionType = exports.SelectionType;

},{}],20:[function(require,module,exports){
"use strict";
(function (SortDirection) {
    SortDirection[SortDirection["asc"] = 'asc'] = "asc";
    SortDirection[SortDirection["desc"] = 'desc'] = "desc";
})(exports.SortDirection || (exports.SortDirection = {}));
var SortDirection = exports.SortDirection;

},{}],21:[function(require,module,exports){
"use strict";
(function (SortType) {
    SortType[SortType["single"] = 'single'] = "single";
    SortType[SortType["multi"] = 'multi'] = "multi";
})(exports.SortType || (exports.SortType = {}));
var SortType = exports.SortType;

},{}],22:[function(require,module,exports){
"use strict";
var DataTable_1 = require('./components/DataTable');
exports.DataTable = DataTable_1.DataTable;
var DataTableColumn_1 = require('./components/DataTableColumn');
var TableOptions_1 = require('./models/TableOptions');
exports.TableOptions = TableOptions_1.TableOptions;
var TableColumn_1 = require('./models/TableColumn');
exports.TableColumn = TableColumn_1.TableColumn;
var Sort_1 = require('./models/Sort');
exports.Sort = Sort_1.Sort;
var SelectionType_1 = require('./enums/SelectionType');
exports.SelectionType = SelectionType_1.SelectionType;
var ColumnMode_1 = require('./enums/ColumnMode');
exports.ColumnMode = ColumnMode_1.ColumnMode;
var SortDirection_1 = require('./enums/SortDirection');
exports.SortDirection = SortDirection_1.SortDirection;
var SortType_1 = require('./enums/SortType');
exports.SortType = SortType_1.SortType;
var DATATABLE_COMPONENTS = [
    DataTable_1.DataTable,
    DataTableColumn_1.DataTableColumn
];
exports.DATATABLE_COMPONENTS = DATATABLE_COMPONENTS;

},{"./components/DataTable":1,"./components/DataTableColumn":2,"./enums/ColumnMode":18,"./enums/SelectionType":19,"./enums/SortDirection":20,"./enums/SortType":21,"./models/Sort":23,"./models/TableColumn":24,"./models/TableOptions":25}],23:[function(require,module,exports){
"use strict";
var Sort = (function () {
    function Sort(props) {
        Object.assign(this, props);
    }
    return Sort;
}());
exports.Sort = Sort;

},{}],24:[function(require,module,exports){
"use strict";
var id_1 = require('../utils/id');
var camelCase_1 = require('../utils/camelCase');
var TableColumn = (function () {
    function TableColumn(props) {
        this.$$id = id_1.id();
        this.isExpressive = false;
        this.frozenLeft = false;
        this.frozenRight = false;
        this.flexGrow = 0;
        this.minWidth = 100;
        this.maxWidth = undefined;
        this.width = 150;
        this.resizable = true;
        this.comparator = undefined;
        this.sortable = true;
        this.draggable = true;
        this.canAutoResize = true;
        Object.assign(this, props);
        if (!this.prop && this.name) {
            this.prop = camelCase_1.camelCase(this.name);
        }
    }
    TableColumn.getProps = function () {
        var props = ['name', 'prop'];
        var col = new TableColumn();
        for (var prop in col) {
            props.push(prop);
        }
        return props;
    };
    return TableColumn;
}());
exports.TableColumn = TableColumn;
;

},{"../utils/camelCase":28,"../utils/id":31}],25:[function(require,module,exports){
"use strict";
var ColumnMode_1 = require('../enums/ColumnMode');
var SortType_1 = require('../enums/SortType');
var TableOptions = (function () {
    function TableOptions(props) {
        this.columns = [];
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.rowHeight = 30;
        this.columnMode = ColumnMode_1.ColumnMode.standard;
        this.loadingMessage = 'Loading...';
        this.emptyMessage = 'No data to display';
        this.headerHeight = 30;
        this.footerHeight = 0;
        this.externalPaging = false;
        this.limit = undefined;
        this.count = 0;
        this.offset = 0;
        this.loadingIndicator = false;
        this.reorderable = true;
        this.sortType = SortType_1.SortType.single;
        this.sorts = [];
        Object.assign(this, props);
    }
    return TableOptions;
}());
exports.TableOptions = TableOptions;

},{"../enums/ColumnMode":18,"../enums/SortType":21}],26:[function(require,module,exports){
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
var StateService = (function () {
    function StateService() {
        this.onSelectionChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
        this.scrollbarWidth = scrollbarWidth_1.scrollbarWidth();
        this.offsetX = 0;
        this.offsetY = 0;
        this.innerWidth = 0;
        this.bodyHeight = 300;
    }
    Object.defineProperty(StateService.prototype, "columnsByPin", {
        get: function () {
            return column_1.columnsByPin(this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "columnGroupWidths", {
        get: function () {
            return column_1.columnGroupWidths(this.columnsByPin, this.options.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "pageCount", {
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
            var first = 0, last = 0;
            if (this.options.scrollbarV) {
                var floor = Math.floor((this.offsetY || 0) / this.options.rowHeight);
                first = Math.max(floor, 0);
                last = Math.min(first + this.pageSize, this.pageCount);
            }
            else {
                first = Math.max(this.options.offset * this.pageSize, 0);
                last = Math.min(first + this.pageSize, this.pageCount);
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
    StateService.prototype.setPage = function (page) {
        this.options.offset = page - 1;
        this.onPageChange.emit({
            offset: this.options.offset,
            limit: this.pageSize,
            count: this.pageCount
        });
    };
    StateService.prototype.nextSort = function (column) {
        var idx = this.options.sorts.findIndex(function (s) { return s.prop === column.prop; });
        var curSort = this.options.sorts[idx];
        var curDir = undefined;
        if (curSort)
            curDir = curSort.dir;
        var dir = sort_1.nextSortDir(this.options.sortType, curDir);
        if (dir === undefined) {
            this.options.sorts.splice(idx, 1);
        }
        else if (curSort) {
            this.options.sorts[idx].dir = dir;
        }
        else {
            if (this.options.sortType === SortType_1.SortType.single) {
                this.options.sorts.splice(0, this.options.sorts.length);
            }
            this.options.sorts.push(new Sort_1.Sort({ dir: dir, prop: column.prop }));
        }
        if (!column.comparator) {
            this.setRows(sort_1.sortRows(this.rows, this.options.sorts));
        }
        else {
            column.comparator(this.rows, this.options.sorts);
        }
    };
    StateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;

},{"../enums/SortType":21,"../models/Sort":23,"../utils/column":29,"../utils/scrollbarWidth":34,"../utils/sort":36,"@angular/core":undefined}],27:[function(require,module,exports){
"use strict";
var VisibilityObserver = (function () {
    function VisibilityObserver(element, callback) {
        this.callback = callback;
        this.runPolyfill(element);
    }
    VisibilityObserver.prototype.runPolyfill = function (element) {
        var _this = this;
        var checkVisibility = function () {
            var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width && height) {
                _this.callback && _this.callback();
            }
            else {
                setTimeout(function () { return checkVisibility(); }, 10);
            }
        };
        checkVisibility();
    };
    VisibilityObserver.prototype.isVisible = function (boundingClientRect, intersectionRect) {
        return ((intersectionRect.width * intersectionRect.height) /
            (boundingClientRect.width * boundingClientRect.height) >= 0.5);
    };
    VisibilityObserver.prototype.visibleTimerCallback = function (element, observer) {
        delete element.visibleTimeout;
        this.processChanges(observer.takeRecords());
        if ('isVisible' in element) {
            delete element.isVisible;
            this.callback && this.callback();
            observer.unobserve(element);
        }
    };
    VisibilityObserver.prototype.processChanges = function (changes) {
        var _this = this;
        changes.forEach(function (changeRecord) {
            var element = changeRecord.target;
            element.isVisible = _this.isVisible(changeRecord.boundingClientRect, changeRecord.intersectionRect);
            if ('isVisible' in element) {
                element.visibleTimeout = setTimeout(_this.visibleTimerCallback.bind(_this), 1000, element, _this.observer);
            }
            else {
                if ('visibleTimeout' in element) {
                    clearTimeout(element.visibleTimeout);
                    delete element.visibleTimeout;
                }
            }
        });
    };
    return VisibilityObserver;
}());
exports.VisibilityObserver = VisibilityObserver;

},{}],28:[function(require,module,exports){
"use strict";
function camelCase(str) {
    str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
exports.camelCase = camelCase;
;

},{}],29:[function(require,module,exports){
"use strict";
function columnsByPin(cols) {
    var ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (var i = 0, len = cols.length; i < len; i++) {
            var c = cols[i];
            if (c.frozenLeft) {
                ret.left.push(c);
            }
            else if (c.frozenRight) {
                ret.right.push(c);
            }
            else {
                ret.center.push(c);
            }
        }
    }
    return ret;
}
exports.columnsByPin = columnsByPin;
;
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: columnTotalWidth(all)
    };
}
exports.columnGroupWidths = columnGroupWidths;
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    if (columns) {
        for (var i = 0, len = columns.length; i < len; i++) {
            var c = columns[i];
            var has = prop && c[prop];
            totalWidth = totalWidth + (has ? c[prop] : c.width);
        }
    }
    return totalWidth;
}
exports.columnTotalWidth = columnTotalWidth;
;

},{}],30:[function(require,module,exports){
"use strict";
function deepValueGetter(obj, path) {
    if (!obj || !path)
        return obj;
    var current = obj, split = path.split('.');
    if (split.length) {
        for (var i = 0, len = split.length; i < len; i++) {
            current = current[split[i]];
        }
    }
    return current;
}
exports.deepValueGetter = deepValueGetter;
;

},{}],31:[function(require,module,exports){
"use strict";
function id() {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
exports.id = id;
;

},{}],32:[function(require,module,exports){
"use strict";
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
})(exports.Keys || (exports.Keys = {}));
var Keys = exports.Keys;

},{}],33:[function(require,module,exports){
"use strict";
var column_1 = require('./column');
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
exports.columnTotalWidth = columnTotalWidth;
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var c = columns_2[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
exports.getTotalFlexGrow = getTotalFlexGrow;
function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = columnTotalWidth(allColumns), totalFlexGrow = getTotalFlexGrow(allColumns), colsByGroup = column_1.columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
exports.adjustColumnWidths = adjustColumnWidths;
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow;
            }
            else {
                column.width = 0;
            }
        }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    do {
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                var column = _c[_b];
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
function forceFillColumnWidths(allColumns, expectedWidth, startIdx) {
    var contentWidth = 0, columnsToResize = startIdx > -1 ?
        allColumns.slice(startIdx, allColumns.length).filter(function (c) { return c.canAutoResize; }) :
        allColumns.filter(function (c) { return c.canAutoResize; });
    for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
        var column = allColumns_1[_i];
        if (!column.canAutoResize) {
            contentWidth += column.width;
        }
        else {
            contentWidth += (column.$$oldWidth || column.width);
        }
    }
    var remainingWidth = expectedWidth - contentWidth, additionWidthPerColumn = remainingWidth / columnsToResize.length, exceedsWindow = contentWidth > expectedWidth;
    for (var _a = 0, columnsToResize_1 = columnsToResize; _a < columnsToResize_1.length; _a++) {
        var column = columnsToResize_1[_a];
        if (exceedsWindow) {
            column.width = column.$$oldWidth || column.width;
        }
        else {
            if (!column.$$oldWidth) {
                column.$$oldWidth = column.width;
            }
            var newSize = column.$$oldWidth + additionWidthPerColumn;
            if (column.minWith && newSize < column.minWidth) {
                column.width = column.minWidth;
            }
            else if (column.maxWidth && newSize > column.maxWidth) {
                column.width = column.maxWidth;
            }
            else {
                column.width = newSize;
            }
        }
    }
}
exports.forceFillColumnWidths = forceFillColumnWidths;

},{"./column":29}],34:[function(require,module,exports){
"use strict";
function scrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}
exports.scrollbarWidth = scrollbarWidth;
;

},{}],35:[function(require,module,exports){
"use strict";
function selectRows(selected, row) {
    var selectedIndex = selected.indexOf(row);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
exports.selectRows = selectRows;
function selectRowsBetween(selected, rows, index, prevIndex) {
    var reverse = index < prevIndex;
    for (var i = 0, len = rows.length; i < len; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: (prevIndex - index)
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            var idx = selected.indexOf(row);
            if (reverse && idx > -1) {
                selected.splice(idx, 1);
                continue;
            }
            if (i >= range.start && i < range.end) {
                if (idx === -1) {
                    selected.push(row);
                }
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;

},{}],36:[function(require,module,exports){
"use strict";
var SortType_1 = require('../enums/SortType');
var SortDirection_1 = require('../enums/SortDirection');
function nextSortDir(sortType, current) {
    if (sortType === SortType_1.SortType.single) {
        if (current === SortDirection_1.SortDirection.asc) {
            return SortDirection_1.SortDirection.desc;
        }
        else {
            return SortDirection_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return SortDirection_1.SortDirection.asc;
        }
        else if (current === SortDirection_1.SortDirection.asc) {
            return SortDirection_1.SortDirection.desc;
        }
        else if (current === SortDirection_1.SortDirection.desc) {
            return undefined;
        }
    }
}
exports.nextSortDir = nextSortDir;
;
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    return 0;
}
exports.orderByComparator = orderByComparator;
function sortRows(rows, dirs) {
    var temp = rows.slice();
    return temp.sort(function (a, b) {
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var _a = dirs_1[_i], prop = _a.prop, dir = _a.dir;
            var comparison = dir !== SortDirection_1.SortDirection.desc ?
                orderByComparator(a[prop], b[prop]) :
                -orderByComparator(a[prop], b[prop]);
            if (comparison !== 0)
                return comparison;
        }
        return 0;
    });
}
exports.sortRows = sortRows;

},{"../enums/SortDirection":20,"../enums/SortType":21}]},{},[22])(22)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9EYXRhVGFibGUudHMiLCJzcmMvY29tcG9uZW50cy9EYXRhVGFibGVDb2x1bW4udHMiLCJzcmMvY29tcG9uZW50cy9ib2R5L0JvZHkudHMiLCJzcmMvY29tcG9uZW50cy9ib2R5L0JvZHlDZWxsLnRzIiwic3JjL2NvbXBvbmVudHMvYm9keS9Cb2R5Um93LnRzIiwic3JjL2NvbXBvbmVudHMvYm9keS9Qcm9ncmVzc0Jhci50cyIsInNyYy9jb21wb25lbnRzL2Zvb3Rlci9Gb290ZXIudHMiLCJzcmMvY29tcG9uZW50cy9mb290ZXIvUGFnZXIudHMiLCJzcmMvY29tcG9uZW50cy9oZWFkZXIvSGVhZGVyLnRzIiwic3JjL2NvbXBvbmVudHMvaGVhZGVyL0hlYWRlckNlbGwudHMiLCJzcmMvZGlyZWN0aXZlcy9EcmFnZ2FibGUudHMiLCJzcmMvZGlyZWN0aXZlcy9Mb25nUHJlc3MudHMiLCJzcmMvZGlyZWN0aXZlcy9PcmRlcmFibGUudHMiLCJzcmMvZGlyZWN0aXZlcy9SZXNpemFibGUudHMiLCJzcmMvZGlyZWN0aXZlcy9TY3JvbGxlci50cyIsInNyYy9kaXJlY3RpdmVzL1RlbXBsYXRlV3JhcHBlci50cyIsInNyYy9kaXJlY3RpdmVzL1Zpc2liaWxpdHkudHMiLCJzcmMvZW51bXMvQ29sdW1uTW9kZS50cyIsInNyYy9lbnVtcy9TZWxlY3Rpb25UeXBlLnRzIiwic3JjL2VudW1zL1NvcnREaXJlY3Rpb24udHMiLCJzcmMvZW51bXMvU29ydFR5cGUudHMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbHMvU29ydC50cyIsInNyYy9tb2RlbHMvVGFibGVDb2x1bW4udHMiLCJzcmMvbW9kZWxzL1RhYmxlT3B0aW9ucy50cyIsInNyYy9zZXJ2aWNlcy9TdGF0ZS50cyIsInNyYy91dGlscy9WaXNpYmlsaXR5T2JzZXJ2ZXIudHMiLCJzcmMvdXRpbHMvY2FtZWxDYXNlLnRzIiwic3JjL3V0aWxzL2NvbHVtbi50cyIsInNyYy91dGlscy9kZWVwR2V0dGVyLnRzIiwic3JjL3V0aWxzL2lkLnRzIiwic3JjL3V0aWxzL2tleXMudHMiLCJzcmMvdXRpbHMvbWF0aC50cyIsInNyYy91dGlscy9zY3JvbGxiYXJXaWR0aC50cyIsInNyYy91dGlscy9zZWxlY3Rpb24udHMiLCJzcmMvdXRpbHMvc29ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxxQkFTTyxlQUFlLENBQUMsQ0FBQTtBQUV2QixzQkFBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRCwyQkFBMkIsMEJBQTBCLENBQUMsQ0FBQTtBQUN0RCxxQkFBMEQsZUFBZSxDQUFDLENBQUE7QUFFMUUsMkJBQTJCLHFCQUFxQixDQUFDLENBQUE7QUFDakQsNkJBQTZCLHdCQUF3QixDQUFDLENBQUE7QUFDdEQsNEJBQTRCLHVCQUF1QixDQUFDLENBQUE7QUFFcEQsZ0NBQWdDLG1CQUFtQixDQUFDLENBQUE7QUFDcEQsdUJBQWdDLGlCQUFpQixDQUFDLENBQUE7QUFDbEQscUJBQThCLGFBQWEsQ0FBQyxDQUFBO0FBQzVDLHVCQUFnQyxpQkFBaUIsQ0FBQyxDQUFBO0FBb0NsRDtJQWtCRSxtQkFBWSxPQUFtQixFQUFVLEtBQW1CLEVBQUUsT0FBd0I7UUFBN0MsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVpsRCxpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNyRCxpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNyRCxlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ25ELHNCQUFpQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMxRCxtQkFBYyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQVMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLE9B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QUFKLGtCQUFJLEVBQUosSUFBSSxDQUFDO1lBQTVCLG1CQUFtQixFQUFYLGNBQUksRUFBRSxZQUFHO1lBQ25CLElBQU0sVUFBVSxHQUFHLEdBQUcsS0FBSyw2QkFBYSxDQUFDLElBQUk7Z0JBQzNDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBR3ZDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUN6QztRQUdELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFoQmUsZ0JBQVEsV0FnQnZCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBDb250ZW50Q2hpbGRyZW5cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL1N0YXRlJztcbmltcG9ydCB7IFZpc2liaWxpdHkgfSBmcm9tICcuLi9kaXJlY3RpdmVzL1Zpc2liaWxpdHknO1xuaW1wb3J0IHsgZm9yY2VGaWxsQ29sdW1uV2lkdGhzLCBhZGp1c3RDb2x1bW5XaWR0aHMgfSBmcm9tICcuLi91dGlscy9tYXRoJztcblxuaW1wb3J0IHsgQ29sdW1uTW9kZSB9IGZyb20gJy4uL2VudW1zL0NvbHVtbk1vZGUnO1xuaW1wb3J0IHsgVGFibGVPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL1RhYmxlT3B0aW9ucyc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL21vZGVscy9UYWJsZUNvbHVtbic7XG5cbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbiB9IGZyb20gJy4vRGF0YVRhYmxlQ29sdW1uJztcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlciB9IGZyb20gJy4vaGVhZGVyL0hlYWRlcic7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5IH0gZnJvbSAnLi9ib2R5L0JvZHknO1xuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyIH0gZnJvbSAnLi9mb290ZXIvRm9vdGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgXHQ8ZGl2XG4gICAgICB2aXNpYmlsaXR5LW9ic2VydmVyXG4gICAgICAob25WaXNpYmlsaXR5Q2hhbmdlKT1cImFkanVzdFNpemVzKClcIj5cbiAgICAgIDxkYXRhdGFibGUtaGVhZGVyXG4gICAgICAgIChvbkNvbHVtbkNoYW5nZSk9XCJvbkNvbHVtbkNoYW5nZS5lbWl0KCRldmVudClcIj5cbiAgICAgIDwvZGF0YXRhYmxlLWhlYWRlcj5cbiAgICAgIDxkYXRhdGFibGUtYm9keVxuICAgICAgICAob25Sb3dDbGljayk9XCJvblJvd0NsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChvblJvd1NlbGVjdCk9XCJvblJvd1NlbGVjdCgkZXZlbnQpXCI+XG4gICAgICA8L2RhdGF0YWJsZS1ib2R5PlxuICAgICAgPGRhdGF0YWJsZS1mb290ZXJcbiAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2VkKCRldmVudClcIj5cbiAgICAgIDwvZGF0YXRhYmxlLWZvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1xuICAgIERhdGFUYWJsZUhlYWRlcixcbiAgICBEYXRhVGFibGVCb2R5LFxuICAgIERhdGFUYWJsZUZvb3RlcixcbiAgICBWaXNpYmlsaXR5XG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmZpeGVkLWhlYWRlcl0nOiAnb3B0aW9ucy5oZWFkZXJIZWlnaHQgIT09IFwiYXV0b1wiJyxcbiAgICAnW2NsYXNzLmZpeGVkLXJvd10nOiAnb3B0aW9ucy5yb3dIZWlnaHQgIT09IFwiYXV0b1wiJyxcbiAgICAnW2NsYXNzLnNjcm9sbC12ZXJ0aWNhbF0nOiAnb3B0aW9ucy5zY3JvbGxiYXJWJyxcbiAgICAnW2NsYXNzLnNjcm9sbC1ob3J6XSc6ICdvcHRpb25zLnNjcm9sbGJhckgnLFxuICAgICdbY2xhc3Muc2VsZWN0YWJsZV0nOiAnb3B0aW9ucy5zZWxlY3RhYmxlJyxcbiAgICAnW2NsYXNzLmNoZWNrYm94YWJsZV0nOiAnb3B0aW9ucy5jaGVja2JveGFibGUnXG4gIH0sXG4gIHByb3ZpZGVyczogWyBTdGF0ZVNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGUge1xuXG5cdEBJbnB1dCgpIG9wdGlvbnM6IFRhYmxlT3B0aW9ucztcbiAgQElucHV0KCkgcm93czogQXJyYXk8YW55Pjtcblx0QElucHV0KCkgc2VsZWN0ZWQ6IEFycmF5PGFueT47XG5cbiAgQE91dHB1dCgpIG9uUGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJvd3NVcGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkNvbHVtbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhVGFibGVDb2x1bW4pIGNvbHVtbnM7XG5cbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByb3dEaWZmZXI6IGFueTtcbiAgcHJpdmF0ZSBjb2xEaWZmZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHN0YXRlOiBTdGF0ZVNlcnZpY2UsIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycykge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YXRhYmxlJyk7XG4gICAgdGhpcy5yb3dEaWZmZXIgPSBkaWZmZXJzLmZpbmQoe30pLmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmNvbERpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IHsgb3B0aW9ucywgcm93cywgc2VsZWN0ZWQgfSA9IHRoaXM7XG5cbiAgICB0aGlzLnN0YXRlXG4gICAgICAuc2V0T3B0aW9ucyhvcHRpb25zKVxuICAgICAgLnNldFJvd3Mocm93cylcbiAgICAgIC5zZXRTZWxlY3RlZChzZWxlY3RlZCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5hZGp1c3RDb2x1bW5zKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZvcihsZXQgY29sIG9mIHRoaXMuY29sdW1ucy50b0FycmF5KCkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbHVtbnMucHVzaChuZXcgVGFibGVDb2x1bW4oY29sKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYodGhpcy5yb3dEaWZmZXIuZGlmZih0aGlzLnJvd3MpKSB7XG4gICAgICB0aGlzLnN0YXRlLnNldFJvd3ModGhpcy5yb3dzKTtcbiAgICAgIHRoaXMub25Sb3dzVXBkYXRlLmVtaXQodGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrQ29sdW1uVG9nZ2xlcygpO1xuICB9XG5cbiAgY2hlY2tDb2x1bW5Ub2dnbGVzKCkge1xuICAgIGxldCBjb2xEaWZmID0gdGhpcy5jb2xEaWZmZXIuZGlmZih0aGlzLm9wdGlvbnMuY29sdW1ucyk7XG4gICAgaWYoY29sRGlmZikge1xuICAgICAgbGV0IGNobmdkID0gZmFsc2U7XG4gICAgICBjb2xEaWZmLmZvckVhY2hBZGRlZEl0ZW0oYyA9PiB7XG4gICAgICAgIGNobmdkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKCFjaG5nZCkge1xuICAgICAgICBjb2xEaWZmLmZvckVhY2hSZW1vdmVkSXRlbShjID0+IHtcbiAgICAgICAgICBjaG5nZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgYSBjb2x1bW4gd2FzIGFkZGVkIG9yIHJlbW92ZWRcbiAgICAgIC8vIHdlIG5lZWQgdG8gcmUtYWRqdXN0IGNvbHVtbnNcbiAgICAgIGlmKGNobmdkKSB0aGlzLmFkanVzdENvbHVtbnMoKTtcbiAgICB9XG4gIH1cblxuICBhZGp1c3RTaXplcygpIHtcbiAgICBsZXQgeyBoZWlnaHQsIHdpZHRoIH0gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zdGF0ZS5pbm5lcldpZHRoID0gTWF0aC5mbG9vcih3aWR0aCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnNjcm9sbGJhclYpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVySGVpZ2h0KSBoZWlnaHQgPS0gdGhpcy5vcHRpb25zLmhlYWRlckhlaWdodDtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9vdGVySGVpZ2h0KSBoZWlnaHQgPS0gdGhpcy5vcHRpb25zLmZvb3RlckhlaWdodDtcbiAgICAgIHRoaXMuc3RhdGUuYm9keUhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLmFkanVzdENvbHVtbnMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICByZXNpemUoKSB7IHRoaXMuYWRqdXN0U2l6ZXMoKTsgfVxuXG4gIGFkanVzdENvbHVtbnMoZm9yY2VJZHg/OiBudW1iZXIpIHtcbiAgICBpZighdGhpcy5vcHRpb25zLmNvbHVtbnMpIHJldHVybjtcblxuICAgIGxldCB3aWR0aCA9IHRoaXMuc3RhdGUuaW5uZXJXaWR0aDtcbiAgICBpZih0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyVikge1xuICAgICAgd2lkdGggPS0gdGhpcy5zdGF0ZS5zY3JvbGxiYXJXaWR0aDtcbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY29sdW1uTW9kZSA9PT0gQ29sdW1uTW9kZS5mb3JjZSl7XG4gICAgICBmb3JjZUZpbGxDb2x1bW5XaWR0aHModGhpcy5vcHRpb25zLmNvbHVtbnMsIHdpZHRoLCBmb3JjZUlkeCk7XG4gICAgfSBlbHNlIGlmKHRoaXMub3B0aW9ucy5jb2x1bW5Nb2RlID09PSBDb2x1bW5Nb2RlLmZsZXgpIHtcbiAgICAgIGFkanVzdENvbHVtbldpZHRocyh0aGlzLm9wdGlvbnMuY29sdW1ucywgd2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFnZUNoYW5nZWQoZXZlbnQpIHtcbiAgICB0aGlzLnN0YXRlLnNldFBhZ2UoZXZlbnQpO1xuICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25Sb3dTZWxlY3QoZXZlbnQpIHtcbiAgICB0aGlzLnN0YXRlLnNldFNlbGVjdGVkKGV2ZW50KTtcbiAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIERpcmVjdGl2ZSxcbiAgVGVtcGxhdGVSZWYsXG4gIENvbnRlbnRDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWxzL1RhYmxlQ29sdW1uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWNvbHVtbicsXG4gIGlucHV0czogVGFibGVDb2x1bW4uZ2V0UHJvcHMoKVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDb2x1bW4ge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9TdGF0ZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vZW51bXMvU2VsZWN0aW9uVHlwZSc7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XG5pbXBvcnQgeyBzZWxlY3RSb3dzLCBzZWxlY3RSb3dzQmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL3NlbGVjdGlvbic7XG5cbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnLi9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Um93IH0gZnJvbSAnLi9Cb2R5Um93JztcbmltcG9ydCB7IFNjcm9sbGVyIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9TY3JvbGxlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1ib2R5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGRhdGF0YWJsZS1wcm9ncmVzc1xuICAgICAgICBbaGlkZGVuXT1cIiFzdGF0ZS5vcHRpb25zLmxvYWRpbmdJbmRpY2F0b3JcIj5cbiAgICAgIDwvZGF0YXRhYmxlLXByb2dyZXNzPlxuICAgICAgPGRpdlxuICAgICAgICBzY3JvbGxlclxuICAgICAgICAqbmdJZj1cInN0YXRlLnJvd3MubGVuZ3RoXCJcbiAgICAgICAgW3Jvd0hlaWdodF09XCJzdGF0ZS5vcHRpb25zLnJvd0hlaWdodFwiXG4gICAgICAgIFtjb3VudF09XCJzdGF0ZS5yb3dDb3VudFwiXG4gICAgICAgIFtzY3JvbGxXaWR0aF09XCJzdGF0ZS5jb2x1bW5Hcm91cFdpZHRocy50b3RhbFwiPlxuICAgICAgICA8ZGF0YXRhYmxlLWJvZHktcm93XG4gICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgaSA9IGluZGV4O1wiXG4gICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaVwiXG4gICAgICAgICAgKGNsaWNrKT1cInJvd0NsaWNrZWQoJGV2ZW50LCBpLCByb3cpXCJcbiAgICAgICAgICAoa2V5ZG93bik9XCJyb3dLZXlkb3duKCRldmVudCwgaSwgcm93KVwiXG4gICAgICAgICAgW3Jvd109XCJyb3dcIj5cbiAgICAgICAgPC9kYXRhdGFibGUtYm9keS1yb3c+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJlbXB0eS1yb3dcIlxuICAgICAgICAqbmdJZj1cIiFyb3dzLmxlbmd0aFwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwic3RhdGUub3B0aW9ucy5lbXB0eU1lc3NhZ2VcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbXG4gICAgUHJvZ3Jlc3NCYXIsXG4gICAgRGF0YVRhYmxlQm9keVJvdyxcbiAgICBTY3JvbGxlclxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tzdHlsZS53aWR0aF0nOidib2R5V2lkdGgnLFxuICAgICdbc3R5bGUuaGVpZ2h0XSc6J2JvZHlIZWlnaHQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQm9keSB7XG5cbiAgQE91dHB1dCgpIG9uUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Sb3dTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgcHJldkluZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgcm93czogYW55O1xuXG4gIGdldCBzZWxlY3RFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm9wdGlvbnMuc2VsZWN0aW9uVHlwZSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0IGJvZHlIZWlnaHQoKSB7XG4gICAgaWYodGhpcy5zdGF0ZS5vcHRpb25zLnNjcm9sbGJhclYpXG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5ib2R5SGVpZ2h0ICsgJ3B4JztcbiAgICByZXR1cm4gJ2F1dG8nO1xuICB9XG5cbiAgZ2V0IGJvZHlXaWR0aCgpIHtcbiAgICBpZih0aGlzLnN0YXRlLm9wdGlvbnMuc2Nyb2xsYmFySClcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlubmVyV2lkdGggKyAncHgnO1xuICAgIHJldHVybiAnMTAwJSc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlOiBTdGF0ZVNlcnZpY2UsIGVsbTogRWxlbWVudFJlZil7XG4gICAgZWxtLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YXRhYmxlLWJvZHknKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm93cyA9IFsuLi50aGlzLnN0YXRlLnJvd3NdO1xuXG4gICAgdGhpcy5zdGF0ZS5vblBhZ2VDaGFuZ2Uuc3Vic2NyaWJlKHBhZ2UgPT4ge1xuICAgICAgY29uc3QgeyBmaXJzdCwgbGFzdCB9ID0gdGhpcy5zdGF0ZS5pbmRleGVzO1xuICAgICAgdGhpcy5yb3dzID0gdGhpcy5zdGF0ZS5yb3dzLnNsaWNlKGZpcnN0LCBsYXN0KTtcbiAgICAgIHRoaXMuaGlkZUluZGljYXRvcigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZS5vblJvd3NVcGRhdGUuc3Vic2NyaWJlKHJvd3MgPT4ge1xuICAgICAgY29uc3QgeyBmaXJzdCwgbGFzdCB9ID0gdGhpcy5zdGF0ZS5pbmRleGVzO1xuICAgICAgdGhpcy5yb3dzID0gcm93cy5zbGljZShmaXJzdCwgbGFzdCk7XG4gICAgICB0aGlzLmhpZGVJbmRpY2F0b3IoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhpZGVJbmRpY2F0b3IoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLm9wdGlvbnMubG9hZGluZ0luZGljYXRvciA9IGZhbHNlO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICByb3dDbGlja2VkKGV2ZW50LCBpbmRleCwgcm93KSB7XG4gICAgdGhpcy5vblJvd0NsaWNrLmVtaXQoeyBldmVudCwgcm93IH0pO1xuICAgIHRoaXMuc2VsZWN0Um93KGV2ZW50LCBpbmRleCwgcm93KTtcbiAgfVxuXG4gIHJvd0tleWRvd24oZXZlbnQsIGluZGV4LCByb3cpIHtcbiAgICBpZihldmVudC5rZXlDb2RlID09PSBLZXlzLnJldHVybiAmJiB0aGlzLnNlbGVjdEVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0Um93KGV2ZW50LCBpbmRleCwgcm93KTtcbiAgICB9IGVsc2UgaWYoZXZlbnQua2V5Q29kZSA9PT0gS2V5cy51cCB8fCBldmVudC5rZXlDb2RlID09PSBLZXlzLmRvd24pIHtcbiAgICAgIGxldCBkb20gPSBldmVudC5rZXlDb2RlID09PSBLZXlzLnVwID9cbiAgICAgICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgOlxuICAgICAgICBldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgaWYoZG9tKSBkb20uZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb3coZXZlbnQsIGluZGV4LCByb3cpIHtcbiAgICBpZighdGhpcy5zZWxlY3RFbmFibGVkKSByZXR1cm47XG5cbiAgICBjb25zdCBtdWx0aVNoaWZ0ID0gdGhpcy5zdGF0ZS5vcHRpb25zLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGlTaGlmdDtcbiAgICBjb25zdCBtdWx0aUNsaWNrID0gdGhpcy5zdGF0ZS5vcHRpb25zLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGk7XG5cbiAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xuICAgIGlmKG11bHRpU2hpZnQgfHwgbXVsdGlDbGljaykge1xuICAgICAgaWYobXVsdGlTaGlmdCAmJiBldmVudC5zaGlmdEtleSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSBbLi4udGhpcy5zdGF0ZS5zZWxlY3RlZF07XG4gICAgICAgIHNlbGVjdGlvbnMgPSBzZWxlY3RSb3dzQmV0d2VlbihzZWxlY3RlZCwgdGhpcy5yb3dzLCBpbmRleCwgdGhpcy5wcmV2SW5kZXgpO1xuICAgICAgfSBlbHNlIGlmKG11bHRpU2hpZnQgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgIHNlbGVjdGlvbnMucHVzaChyb3cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0ZWRdO1xuICAgICAgICBzZWxlY3Rpb25zID0gc2VsZWN0Um93cyhzZWxlY3RlZCwgcm93KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9ucy5wdXNoKHJvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoc2VsZWN0aW9ucyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBDb21wb25lbnRSZXNvbHZlcixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50UmVmLFxuICBEeW5hbWljQ29tcG9uZW50TG9hZGVyLFxuICBJbmplY3RvclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1RhYmxlQ29sdW1uJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbiB9IGZyb20gJy4uL0RhdGFUYWJsZUNvbHVtbic7XG5pbXBvcnQgeyBkZWVwVmFsdWVHZXR0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9kZWVwR2V0dGVyJztcbmltcG9ydCB7IFRlbXBsYXRlV3JhcHBlciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVGVtcGxhdGVXcmFwcGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWJvZHktY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gIFx0PGRpdiBjbGFzcz1cImRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWxcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwiIWNvbHVtbi50ZW1wbGF0ZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwidmFsdWVcIj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAqbmdJZj1cImNvbHVtbi50ZW1wbGF0ZVwiXG4gICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICBbdGVtcGxhdGVXcmFwcGVyXT1cImNvbHVtbi50ZW1wbGF0ZVwiPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbc3R5bGUud2lkdGhdJzonY29sdW1uLndpZHRoICsgXCJweFwiJyxcbiAgICAnW3N0eWxlLmhlaWdodF0nOidjb2x1bW4uaGVpZ2h0ICsgXCJweFwiJ1xuICB9LFxuICBkaXJlY3RpdmVzOiBbIFRlbXBsYXRlV3JhcHBlciBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJvZHlDZWxsIHtcblxuICBASW5wdXQoKSBjb2x1bW46IFRhYmxlQ29sdW1uO1xuICBASW5wdXQoKSByb3c6IGFueTtcblxuICBnZXQgdmFsdWUoKSB7XG4gICAgaWYoIXRoaXMucm93KSByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGRlZXBWYWx1ZUdldHRlcih0aGlzLnJvdywgdGhpcy5jb2x1bW4ucHJvcCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBjb21wb25lbnRSZXNvbHZlcjogQ29tcG9uZW50UmVzb2x2ZXIpIHtcblxuICAgIGVsbS5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhdGF0YWJsZS1ib2R5LWNlbGwnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9TdGF0ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q2VsbCB9IGZyb20gJy4vQm9keUNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keS1yb3cnLFxuICB0ZW1wbGF0ZTogYFxuICBcdDxkaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXJvdy1sZWZ0XCJcbiAgICAgICAgKm5nSWY9XCJzdGF0ZS5jb2x1bW5zQnlQaW4ubGVmdC5sZW5ndGhcIlxuICAgICAgICBbc3R5bGUud2lkdGhdPVwic3RhdGUuY29sdW1uR3JvdXBXaWR0aHMubGVmdCArICdweCdcIj5cbiAgICAgICAgPGRhdGF0YWJsZS1ib2R5LWNlbGxcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHN0YXRlLmNvbHVtbnNCeVBpbi5sZWZ0XCJcbiAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIj5cbiAgICAgICAgPC9kYXRhdGFibGUtYm9keS1jZWxsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXJvdy1jZW50ZXJcIlxuICAgICAgICBbc3R5bGUud2lkdGhdPVwic3RhdGUuY29sdW1uR3JvdXBXaWR0aHMuY2VudGVyICsgJ3B4J1wiXG4gICAgICAgICpuZ0lmPVwic3RhdGUuY29sdW1uc0J5UGluLmNlbnRlci5sZW5ndGhcIj5cbiAgICAgICAgPGRhdGF0YWJsZS1ib2R5LWNlbGxcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHN0YXRlLmNvbHVtbnNCeVBpbi5jZW50ZXJcIlxuICAgICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiPlxuICAgICAgICA8L2RhdGF0YWJsZS1ib2R5LWNlbGw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtcm93LXJpZ2h0XCJcbiAgICAgICAgKm5nSWY9XCJzdGF0ZS5jb2x1bW5zQnlQaW4ucmlnaHQubGVuZ3RoXCJcbiAgICAgICAgW3N0eWxlLndpZHRoXT1cInN0YXRlLmNvbHVtbkdyb3VwV2lkdGhzLnJpZ2h0ICsgJ3B4J1wiPlxuICAgICAgICA8ZGF0YXRhYmxlLWJvZHktY2VsbFxuICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2Ygc3RhdGUuY29sdW1uc0J5UGluLnJpZ2h0XCJcbiAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIj5cbiAgICAgICAgPC9kYXRhdGFibGUtYm9keS1jZWxsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFsgRGF0YVRhYmxlQm9keUNlbGwgXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdpc1NlbGVjdGVkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJvZHlSb3cge1xuXG4gIEBJbnB1dCgpIHJvdzogYW55O1xuXG4gIGdldCBpc1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkICYmXG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkLmluZGV4T2YodGhpcy5yb3cpID4gLTE7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlOiBTdGF0ZVNlcnZpY2UsIGVsbTogRWxlbWVudFJlZil7XG4gICAgZWxtLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YXRhYmxlLWJvZHktcm93Jyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1wcm9ncmVzcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwcm9ncmVzcy1saW5lYXJcIlxuICAgICAgcm9sZT1cInByb2dyZXNzYmFyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvU3RhdGUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlUGFnZXIgfSBmcm9tICcuL1BhZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJzdGF0ZS5vcHRpb25zLmZvb3RlckhlaWdodFwiXG4gICAgICBbc3R5bGUuaGVpZ2h0XT1cInN0YXRlLm9wdGlvbnMuZm9vdGVySGVpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb3VudFwiPnt7c3RhdGUucGFnZUNvdW50fX0gdG90YWw8L2Rpdj5cbiAgICAgIDxkYXRhdGFibGUtcGFnZXJcbiAgICAgICAgW3BhZ2VdPVwiY3VyUGFnZVwiXG4gICAgICAgIFtzaXplXT1cInN0YXRlLnBhZ2VTaXplXCJcbiAgICAgICAgKG9uUGFnZWQpPVwib25QYWdlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIFtjb3VudF09XCJzdGF0ZS5wYWdlQ291bnRcIlxuICAgICAgICBbaGlkZGVuXT1cIiF2aXNpYmxlXCI+XG4gICAgICAgPC9kYXRhdGFibGUtcGFnZXI+XG4gICAgIDwvZGl2PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbIERhdGFUYWJsZVBhZ2VyIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlRm9vdGVyIHtcblxuICBAT3V0cHV0KCkgb25QYWdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgdmlzaWJsZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuc3RhdGUucGFnZUNvdW50IC8gdGhpcy5zdGF0ZS5wYWdlU2l6ZSkgPiAxO1xuICB9XG5cbiAgZ2V0IGN1clBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUub3B0aW9ucy5vZmZzZXQgKyAxO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxtOiBFbGVtZW50UmVmLCBwcml2YXRlIHN0YXRlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBlbG0ubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXRhdGFibGUtZm9vdGVyJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1wYWdlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIGNsYXNzPVwicGFnZXJcIj5cbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhblByZXZpb3VzKClcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UGFnZSgxKVwiXG4gICAgICAgICAgY2xhc3M9XCJpY29uLXByZXZcIj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhblByZXZpb3VzKClcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgICAoY2xpY2spPVwicHJldlBhZ2UoKVwiXG4gICAgICAgICAgY2xhc3M9XCJpY29uLWxlZnRcIj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaVxuICAgICAgICAqbmdGb3I9XCJsZXQgcGcgb2YgcGFnZXNcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInBnLm51bWJlciA9PT0gcGFnZVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBnLm51bWJlcilcIj5cbiAgICAgICAgICB7e3BnLnRleHR9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuTmV4dCgpXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm5leHRQYWdlKClcIlxuICAgICAgICAgIGNsYXNzPVwiaWNvbi1yaWdodFwiPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuTmV4dCgpXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UodG90YWxQYWdlcylcIlxuICAgICAgICAgIGNsYXNzPVwiaWNvbi1za2lwXCI+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVQYWdlciB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyID0gMDtcbiAgQE91dHB1dCgpIG9uUGFnZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX2NvdW50OiBudW1iZXI7XG4gIHByaXZhdGUgX3BhZ2U6IG51bWJlcjtcbiAgcHJpdmF0ZSBwYWdlczogYW55O1xuXG4gIGdldCB0b3RhbFBhZ2VzKCkge1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5zaXplIDwgMSA/IDEgOiBNYXRoLmNlaWwodGhpcy5jb3VudCAvIHRoaXMuc2l6ZSk7XG4gICAgcmV0dXJuIE1hdGgubWF4KGNvdW50IHx8IDAsIDEpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGNvdW50KHZhbCkge1xuICAgIHRoaXMuX2NvdW50ID0gdmFsO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmNhbGNQYWdlcygpO1xuICB9XG5cbiAgZ2V0IGNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBwYWdlKHZhbCkge1xuICAgIHRoaXMuX3BhZ2UgPSB2YWw7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XG4gIH1cblxuICBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsbTogRWxlbWVudFJlZil7XG4gICAgZWxtLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YXRhYmxlLXBhZ2VyJyk7XG4gIH1cblxuICBjYW5QcmV2aW91cygpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID4gMTtcbiAgfVxuXG4gIGNhbk5leHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA8IHRoaXMudG90YWxQYWdlcztcbiAgfVxuXG4gIHByZXZQYWdlKCkge1xuICAgIGlmICh0aGlzLnBhZ2UgPiAxKSB7XG4gICAgICB0aGlzLnNlbGVjdFBhZ2UoLS10aGlzLnBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIG5leHRQYWdlKCkge1xuICAgIHRoaXMuc2VsZWN0UGFnZSgrK3RoaXMucGFnZSk7XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmIChwYWdlID4gMCAmJiBwYWdlIDw9IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgIHRoaXMub25QYWdlZC5lbWl0KHBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGNhbGNQYWdlcyhwYWdlPzogbnVtYmVyKSB7XG4gICAgbGV0IHBhZ2VzID0gW10sXG4gICAgICBzdGFydFBhZ2UgPSAxLFxuICAgICAgZW5kUGFnZSA9IHRoaXMudG90YWxQYWdlcyxcbiAgICAgIG1heFNpemUgPSA1LFxuICAgICAgaXNNYXhTaXplZCA9IG1heFNpemUgPCB0aGlzLnRvdGFsUGFnZXM7XG5cbiAgICBwYWdlID0gcGFnZSB8fCB0aGlzLnBhZ2U7XG5cbiAgICBpZiAoaXNNYXhTaXplZCkge1xuICAgICAgc3RhcnRQYWdlID0gKChNYXRoLmNlaWwocGFnZSAvIG1heFNpemUpIC0gMSkgKiBtYXhTaXplKSArIDE7XG4gICAgICBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbWF4U2l6ZSAtIDEsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbnVtYmVyID0gc3RhcnRQYWdlOyBudW1iZXIgPD0gZW5kUGFnZTsgbnVtYmVyKyspIHtcbiAgICAgIHBhZ2VzLnB1c2goe1xuICAgICAgICBudW1iZXI6IG51bWJlcixcbiAgICAgICAgdGV4dDogbnVtYmVyXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPdXRwdXQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL1N0YXRlJztcblxuaW1wb3J0IHsgTG9uZ1ByZXNzIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Mb25nUHJlc3MnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9EcmFnZ2FibGUnO1xuaW1wb3J0IHsgUmVzaXphYmxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9SZXNpemFibGUnO1xuaW1wb3J0IHsgT3JkZXJhYmxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9PcmRlcmFibGUnO1xuXG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDZWxsIH0gZnJvbSAnLi9IZWFkZXJDZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gIFx0PGRpdlxuICAgICAgW3N0eWxlLndpZHRoXT1cInN0YXRlLmNvbHVtbkdyb3VwV2lkdGhzLnRvdGFsXCJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1pbm5lclwiXG4gICAgICBvcmRlcmFibGVcbiAgICAgIChvblJlb3JkZXIpPVwiY29sdW1uUmVvcmRlcmVkKCRldmVudClcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtcm93LWxlZnRcIlxuICAgICAgICBbc3R5bGUud2lkdGhdPVwic3RhdGUuY29sdW1uR3JvdXBXaWR0aHMubGVmdCArICdweCdcIlxuICAgICAgICAqbmdJZj1cInN0YXRlLmNvbHVtbnNCeVBpbi5sZWZ0Lmxlbmd0aFwiPlxuICAgICAgICA8ZGF0YXRhYmxlLWhlYWRlci1jZWxsXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzdGF0ZS5jb2x1bW5zQnlQaW4ubGVmdFwiXG4gICAgICAgICAgcmVzaXphYmxlXG4gICAgICAgICAgW3Jlc2l6ZUVuYWJsZWRdPVwiY29sdW1uLnJlc2l6YWJsZVwiXG4gICAgICAgICAgKG9uUmVzaXplKT1cImNvbHVtblJlc2l6ZWQoJGV2ZW50LCBjb2x1bW4pXCJcbiAgICAgICAgICBsb25nLXByZXNzXG4gICAgICAgICAgKG9uTG9uZ1ByZXNzKT1cImRyYWcgPSB0cnVlXCJcbiAgICAgICAgICAob25Mb25nUHJlc3NFbmQpPVwiZHJhZyA9IGZhbHNlXCJcbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBbZHJhZ1hdPVwiY29sdW1uLmRyYWdnYWJsZSAmJiBkcmFnXCJcbiAgICAgICAgICBbZHJhZ1ldPVwiZmFsc2VcIlxuICAgICAgICAgIFttb2RlbF09XCJjb2x1bW5cIlxuICAgICAgICAgIChvbkNvbHVtbkNoYW5nZSk9XCJvbkNvbHVtbkNoYW5nZS5lbWl0KCRldmVudClcIj5cbiAgICAgICAgPC9kYXRhdGFibGUtaGVhZGVyLWNlbGw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtcm93LWNlbnRlclwiXG4gICAgICAgIFtzdHlsZS53aWR0aF09XCJzdGF0ZS5jb2x1bW5Hcm91cFdpZHRocy5jZW50ZXIgKyAncHgnXCJcbiAgICAgICAgKm5nSWY9XCJzdGF0ZS5jb2x1bW5zQnlQaW4uY2VudGVyLmxlbmd0aFwiPlxuICAgICAgICA8ZGF0YXRhYmxlLWhlYWRlci1jZWxsXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzdGF0ZS5jb2x1bW5zQnlQaW4uY2VudGVyXCJcbiAgICAgICAgICByZXNpemFibGVcbiAgICAgICAgICBbcmVzaXplRW5hYmxlZF09XCJjb2x1bW4ucmVzaXphYmxlXCJcbiAgICAgICAgICAob25SZXNpemUpPVwiY29sdW1uUmVzaXplZCgkZXZlbnQsIGNvbHVtbilcIlxuICAgICAgICAgIGxvbmctcHJlc3NcbiAgICAgICAgICAob25Mb25nUHJlc3MpPVwiZHJhZyA9IHRydWVcIlxuICAgICAgICAgIChvbkxvbmdQcmVzc0VuZCk9XCJkcmFnID0gZmFsc2VcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIFtkcmFnWF09XCJjb2x1bW4uZHJhZ2dhYmxlICYmIGRyYWdcIlxuICAgICAgICAgIFtkcmFnWV09XCJmYWxzZVwiXG4gICAgICAgICAgW21vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgKG9uQ29sdW1uQ2hhbmdlKT1cIm9uQ29sdW1uQ2hhbmdlLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgICA8L2RhdGF0YWJsZS1oZWFkZXItY2VsbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS1yb3ctcmlnaHRcIlxuICAgICAgICBbc3R5bGUud2lkdGhdPVwic3RhdGUuY29sdW1uR3JvdXBXaWR0aHMucmlnaHQgKyAncHgnXCJcbiAgICAgICAgKm5nSWY9XCJzdGF0ZS5jb2x1bW5zQnlQaW4ucmlnaHQubGVuZ3RoXCI+XG4gICAgICAgIDxkYXRhdGFibGUtaGVhZGVyLWNlbGxcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHN0YXRlLmNvbHVtbnNCeVBpbi5yaWdodFwiXG4gICAgICAgICAgcmVzaXphYmxlXG4gICAgICAgICAgW3Jlc2l6ZUVuYWJsZWRdPVwiY29sdW1uLnJlc2l6YWJsZVwiXG4gICAgICAgICAgKG9uUmVzaXplKT1cImNvbHVtblJlc2l6ZWQoJGV2ZW50LCBjb2x1bW4pXCJcbiAgICAgICAgICBsb25nLXByZXNzXG4gICAgICAgICAgKG9uTG9uZ1ByZXNzKT1cImRyYWcgPSB0cnVlXCJcbiAgICAgICAgICAob25Mb25nUHJlc3NFbmQpPVwiZHJhZyA9IGZhbHNlXCJcbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBbZHJhZ1hdPVwiY29sdW1uLmRyYWdnYWJsZSAmJiBkcmFnXCJcbiAgICAgICAgICBbZHJhZ1ldPVwiZmFsc2VcIlxuICAgICAgICAgIFttb2RlbF09XCJjb2x1bW5cIlxuICAgICAgICAgIChvbkNvbHVtbkNoYW5nZSk9XCJvbkNvbHVtbkNoYW5nZS5lbWl0KCRldmVudClcIj5cbiAgICAgICAgPC9kYXRhdGFibGUtaGVhZGVyLWNlbGw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1xuICAgIERhdGFUYWJsZUhlYWRlckNlbGwsXG4gICAgRHJhZ2dhYmxlLFxuICAgIFJlc2l6YWJsZSxcbiAgICBPcmRlcmFibGUsXG4gICAgTG9uZ1ByZXNzXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLndpZHRoXSc6J2hlYWRlcldpZHRoJyxcbiAgICAnW3N0eWxlLmhlaWdodF0nOidoZWFkZXJIZWlnaHQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlSGVhZGVyIHtcblxuICBAT3V0cHV0KCkgb25Db2x1bW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCBoZWFkZXJXaWR0aCgpIHtcbiAgICBpZih0aGlzLnN0YXRlLm9wdGlvbnMuc2Nyb2xsYmFySClcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlubmVyV2lkdGggKyAncHgnO1xuICAgIHJldHVybiAnMTAwJSc7XG4gIH1cblxuICBnZXQgaGVhZGVySGVpZ2h0KCkge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLnN0YXRlLm9wdGlvbnMuaGVhZGVySGVpZ2h0O1xuICAgIGlmKGhlaWdodCAhPT0gJ2F1dG8nKSByZXR1cm4gYCR7aGVpZ2h0fXB4YDtcbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZTogU3RhdGVTZXJ2aWNlLCBlbG06IEVsZW1lbnRSZWYpe1xuICAgIGVsbS5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhdGF0YWJsZS1oZWFkZXInKTtcbiAgfVxuXG4gIGNvbHVtblJlc2l6ZWQod2lkdGgsIGNvbHVtbikge1xuICAgIGlmICh3aWR0aCA8PSBjb2x1bW4ubWluV2lkdGgpe1xuICAgICAgd2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgfSBlbHNlIGlmKHdpZHRoID49IGNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgd2lkdGggPSBjb2x1bW4ubWF4V2lkdGg7XG4gICAgfVxuXG4gICAgY29sdW1uLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLm9uQ29sdW1uQ2hhbmdlLmVtaXQoe1xuICAgICAgdHlwZTogJ3Jlc2l6ZScsXG4gICAgICB2YWx1ZTogY29sdW1uXG4gICAgfSk7XG4gIH1cblxuICBjb2x1bW5SZW9yZGVyZWQoeyBwcmV2SW5kZXgsIG5ld0luZGV4LCBtb2RlbCB9KSB7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmNvbHVtbnMuc3BsaWNlKHByZXZJbmRleCwgMSk7XG4gICAgdGhpcy5zdGF0ZS5vcHRpb25zLmNvbHVtbnMuc3BsaWNlKG5ld0luZGV4LCAwLCBtb2RlbCk7XG5cbiAgICB0aGlzLm9uQ29sdW1uQ2hhbmdlLmVtaXQoe1xuICAgICAgdHlwZTogJ3Jlb3JkZXInLFxuICAgICAgdmFsdWU6IG1vZGVsXG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL1N0YXRlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1RhYmxlQ29sdW1uJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi9lbnVtcy9Tb3J0RGlyZWN0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgXHQ8ZGl2PlxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtbGFiZWwgZHJhZ2dhYmxlXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uU29ydCgpXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJtb2RlbC5uYW1lXCI+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cInNvcnQtYnRuXCJcbiAgICAgICAgW25nQ2xhc3NdPVwic29ydENsYXNzZXMoKVwiPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5zb3J0YWJsZV0nOiAnbW9kZWwuc29ydGFibGUnLFxuICAgICdbY2xhc3MucmVzaXphYmxlXSc6ICdtb2RlbC5yZXNpemFibGUnLFxuICAgICdbc3R5bGUud2lkdGhdJzonbW9kZWwud2lkdGggKyBcInB4XCInLFxuICAgICdbc3R5bGUubWluV2lkdGhdJzonbW9kZWwubWluV2lkdGggKyBcInB4XCInLFxuICAgICdbc3R5bGUubWF4V2lkdGhdJzonbW9kZWwubWF4V2lkdGggKyBcInB4XCInLFxuICAgICdbc3R5bGUuaGVpZ2h0XSc6ICdtb2RlbC5oZWlnaHQgKyBcInB4XCInLFxuICAgICdbYXR0ci50aXRsZV0nOiAnbW9kZWwubmFtZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDZWxsIHtcblxuICBASW5wdXQoKSBtb2RlbDogVGFibGVDb2x1bW47XG4gIEBPdXRwdXQoKSBvbkNvbHVtbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IHNvcnREaXIoKSB7XG4gICAgbGV0IHNvcnQgPSB0aGlzLnN0YXRlLm9wdGlvbnMuc29ydHMuZmluZChzID0+IHtcbiAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMubW9kZWwucHJvcDtcbiAgICB9KTtcblxuICAgIGlmKHNvcnQpIHJldHVybiBzb3J0LmRpcjtcbiAgfVxuXG4gIHNvcnRDbGFzc2VzKHNvcnQpIHtcbiAgICBsZXQgZGlyID0gdGhpcy5zb3J0RGlyO1xuICAgIHJldHVybiB7XG4gICAgICAnc29ydC1hc2MgaWNvbi1kb3duJzogZGlyID09PSBTb3J0RGlyZWN0aW9uLmFzYyxcbiAgICAgICdzb3J0LWRlc2MgaWNvbi11cCc6IGRpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjXG4gICAgfTtcbiAgfVxuXG4gIG9uU29ydCgpIHtcbiAgICBpZih0aGlzLm1vZGVsLnNvcnRhYmxlKSB7XG4gICAgICB0aGlzLnN0YXRlLm5leHRTb3J0KHRoaXMubW9kZWwpO1xuXG4gICAgICB0aGlzLm9uQ29sdW1uQ2hhbmdlLmVtaXQoe1xuICAgICAgICB0eXBlOiAnc29ydCcsXG4gICAgICAgIHZhbHVlOiB0aGlzLm1vZGVsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzdGF0ZTogU3RhdGVTZXJ2aWNlKXtcbiAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIERyYWdnYWJsZSBEaXJlY3RpdmUgZm9yIEFuZ3VsYXIyXG4gKlxuICogSW5zcGlyYXRpb246XG4gKiBcdCBodHRwczovL2dpdGh1Yi5jb20vQW5ndWxhckNsYXNzL2FuZ3VsYXIyLWV4YW1wbGVzL2Jsb2IvbWFzdGVyL3J4LWRyYWdnYWJsZS9kaXJlY3RpdmVzL2RyYWdnYWJsZS50c1xuICogXHQgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTY2MjUzMC9ob3ctdG8taW1wbGVtZW50LWRyYWctYW5kLWRyb3AtaW4tYW5ndWxhcjJcbiAqXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tkcmFnZ2FibGVdJyB9KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZSB7XG5cbiAgLy8gdGhpcyBraW5kYSBhIGhhY2sgdG8gZ2V0XG4gIC8vIHRoZSBtb2RlbCBpbiB0aGUgb3JkZXJhYmxlXG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KCkgZHJhZ1g6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBkcmFnWTogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRHJhZ2dpbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25EcmFnRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGRyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBhbnk7XG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZXVwJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZXVwKGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuXG4gICAgaWYodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm9uRHJhZ0VuZC5lbWl0KHtcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgbW9kZWw6IHRoaXMubW9kZWxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKGV2ZW50KSB7XG4gICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJhZ2dhYmxlJykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgY29uc3QgbW91c2VEb3duUG9zID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJylcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHRoaXMubW92ZShldmVudCwgbW91c2VEb3duUG9zKSk7XG5cbiAgICAgIHRoaXMub25EcmFnU3RhcnQuZW1pdCh7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIG1vZGVsOiB0aGlzLm1vZGVsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlKGV2ZW50LCBtb3VzZURvd25Qb3MpIHtcbiAgICBpZighdGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG4gICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSBtb3VzZURvd25Qb3MueDtcbiAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIG1vdXNlRG93blBvcy55O1xuXG4gICAgaWYodGhpcy5kcmFnWCkgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHt4fXB4YDtcbiAgICBpZih0aGlzLmRyYWdZKSB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gYCR7eX1weGA7XG5cbiAgICBpZih0aGlzLmRyYWdYIHx8IHRoaXMuZHJhZ1kpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuXG4gICAgICB0aGlzLm9uRHJhZ2dpbmcuZW1pdCh7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIG1vZGVsOiB0aGlzLm1vZGVsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tsb25nLXByZXNzXScgfSlcbmV4cG9ydCBjbGFzcyBMb25nUHJlc3Mge1xuXG4gIEBJbnB1dCgpIGR1cmF0aW9uOiBudW1iZXIgPSA1MDA7XG5cbiAgQE91dHB1dCgpIG9uTG9uZ1ByZXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTG9uZ1ByZXNzaW5nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTG9uZ1ByZXNzRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHByZXNzaW5nOiBib29sZWFuO1xuICBwcml2YXRlIGxvbmdQcmVzc2luZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XG4gIHByaXZhdGUgbW91c2VYOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1vdXNlWTogbnVtYmVyID0gMDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnByZXNzJylcbiAgZ2V0IHByZXNzKCkgeyByZXR1cm4gdGhpcy5wcmVzc2luZzsgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubG9uZ3ByZXNzJylcbiAgZ2V0IGxvbmdQcmVzcygpIHsgcmV0dXJuIHRoaXMubG9uZ1ByZXNzaW5nOyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAvLyBkb24ndCBkbyByaWdodC9taWRkbGUgY2xpY2tzXG4gICAgaWYoZXZlbnQud2hpY2ggIT09IDEpIHJldHVybjtcblxuICAgIHRoaXMubW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICB0aGlzLnByZXNzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmxvbmdQcmVzc2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmxvbmdQcmVzc2luZyA9IHRydWU7XG4gICAgICB0aGlzLm9uTG9uZ1ByZXNzLmVtaXQoZXZlbnQpO1xuICAgICAgdGhpcy5sb29wKGV2ZW50KTtcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcblxuICAgIHRoaXMubG9vcChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgIGlmKHRoaXMucHJlc3NpbmcgJiYgIXRoaXMubG9uZ1ByZXNzaW5nKSB7XG4gICAgICBjb25zdCB4VGhyZXMgPSAoZXZlbnQuY2xpZW50WCAtIHRoaXMubW91c2VYKSA+IDEwO1xuICAgICAgY29uc3QgeVRocmVzID0gKGV2ZW50LmNsaWVudFkgLSB0aGlzLm1vdXNlWSkgPiAxMDtcbiAgICAgIGlmKHhUaHJlcyB8fCB5VGhyZXMpIHtcbiAgICAgICAgdGhpcy5lbmRQcmVzcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvb3AoZXZlbnQpIHtcbiAgICBpZih0aGlzLmxvbmdQcmVzc2luZykge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub25Mb25nUHJlc3NpbmcuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMubG9vcChldmVudCk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICB9XG5cbiAgZW5kUHJlc3MoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5sb25nUHJlc3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByZXNzaW5nID0gZmFsc2U7XG4gICAgdGhpcy5vbkxvbmdQcmVzc0VuZC5lbWl0KHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcpXG4gIG9uTW91c2VVcCgpIHsgdGhpcy5lbmRQcmVzcygpOyB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi9EcmFnZ2FibGUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbb3JkZXJhYmxlXScgfSlcbmV4cG9ydCBjbGFzcyBPcmRlcmFibGUge1xuXG4gIEBPdXRwdXQoKSBvblJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRHJhZ2dhYmxlKVxuICBwcml2YXRlIGRyYWdzOiBRdWVyeUxpc3Q8RHJhZ2dhYmxlPjtcblxuICBwcml2YXRlIHBvc2l0aW9uczogYW55O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmRyYWdzLmZvckVhY2goZCA9PlxuICAgICAgZC5vbkRyYWdTdGFydC5zdWJzY3JpYmUodGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKSAmJlxuICAgICAgZC5vbkRyYWdFbmQuc3Vic2NyaWJlKHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpKTtcbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KCkge1xuICAgIHRoaXMucG9zaXRpb25zID0ge307XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yKGxldCBkcmFnZ2VyIG9mIHRoaXMuZHJhZ3MudG9BcnJheSgpKSB7XG4gICAgICBsZXQgZWxtID0gZHJhZ2dlci5lbGVtZW50O1xuICAgICAgdGhpcy5wb3NpdGlvbnNbZHJhZ2dlci5tb2RlbC5wcm9wXSA9ICB7XG4gICAgICAgIGxlZnQ6IHBhcnNlSW50KGVsbS5vZmZzZXRMZWZ0LnRvU3RyaW5nKCkpLFxuICAgICAgICBpbmRleDogaSsrXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG9uRHJhZ0VuZCh7IGVsZW1lbnQsIG1vZGVsIH0pIHtcbiAgICBjb25zdCBuZXdQb3MgPSBwYXJzZUludChlbGVtZW50Lm9mZnNldExlZnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgcHJldlBvcyA9IHRoaXMucG9zaXRpb25zW21vZGVsLnByb3BdO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLnBvc2l0aW9ucykge1xuICAgICAgbGV0IHBvcyA9IHRoaXMucG9zaXRpb25zW3Byb3BdO1xuXG4gICAgICBsZXQgbW92ZWRMZWZ0ID0gbmV3UG9zIDwgcG9zLmxlZnQgJiYgcHJldlBvcy5sZWZ0ID4gcG9zLmxlZnQ7XG4gICAgICBsZXQgbW92ZWRSaWdodCA9IG5ld1BvcyA+IHBvcy5sZWZ0ICYmIHByZXZQb3MubGVmdCA8IHBvcy5sZWZ0O1xuXG4gICAgICBpZihtb3ZlZExlZnQgfHwgbW92ZWRSaWdodCkge1xuICAgICAgICB0aGlzLm9uUmVvcmRlci5lbWl0KHtcbiAgICAgICAgICBwcmV2SW5kZXg6IHByZXZQb3MuaW5kZXgsXG4gICAgICAgICAgbmV3SW5kZXg6IGksXG4gICAgICAgICAgbW9kZWxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Jlc2l6YWJsZV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5yZXNpemFibGVdJzogJ3Jlc2l6ZUVuYWJsZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlIHtcblxuICBASW5wdXQoKSByZXNpemVFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlcjtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHN1YmNyaXB0aW9uOiBhbnk7XG5cbiAgQE91dHB1dCgpIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHByZXZTY3JlZW5YOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHJlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgIGlmKHRoaXMucmVzaXplRW5hYmxlZCkge1xuICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ3Jlc2l6ZS1oYW5kbGUnKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZXVwJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZXVwKGV2ZW50KSB7XG4gICAgdGhpcy5yZXNpemluZyA9IGZhbHNlO1xuXG4gICAgaWYodGhpcy5zdWJjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5vblJlc2l6ZS5lbWl0KHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWRvd24oZXZlbnQpIHtcbiAgICBjb25zdCBpc0hhbmRsZSA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Jlc2l6ZS1oYW5kbGUnKTtcblxuICAgIGlmKGlzSGFuZGxlKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMucmVzaXppbmcgPSB0cnVlO1xuXG4gICAgICB0aGlzLnN1YmNyaXB0aW9uID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4gdGhpcy5tb3ZlKGV2ZW50KSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZShldmVudCkge1xuICAgIGNvbnN0IG1vdmVtZW50WCA9IGV2ZW50Lm1vdmVtZW50WCB8fCBldmVudC5tb3pNb3ZlbWVudFggfHwgKGV2ZW50LnNjcmVlblggLSB0aGlzLnByZXZTY3JlZW5YKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBuZXdXaWR0aCA9IHdpZHRoICsgKG1vdmVtZW50WCB8fCAwKTtcblxuICAgIHRoaXMucHJldlNjcmVlblggPSBldmVudC5zY3JlZW5YO1xuXG4gICAgY29uc3Qgb3Zlck1pbldpZHRoID0gIXRoaXMubWluV2lkdGggfHwgbmV3V2lkdGggPj0gdGhpcy5taW5XaWR0aDtcbiAgICBjb25zdCB1bmRlck1heFdpZHRoID0gIXRoaXMubWF4V2lkdGggfHwgbmV3V2lkdGggPD0gdGhpcy5tYXhXaWR0aDtcblxuICAgIGlmKG92ZXJNaW5XaWR0aCAmJiB1bmRlck1heFdpZHRoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtuZXdXaWR0aH1weGA7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Njcm9sbGVyXScsXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnc2Nyb2xsSGVpZ2h0JyxcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdzY3JvbGxXaWR0aCArIFwicHhcIidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxlciB7XG5cbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvdW50OiBudW1iZXI7XG4gIEBJbnB1dCgpIHNjcm9sbFdpZHRoOiBudW1iZXI7XG5cbiAgZ2V0IHNjcm9sbEhlaWdodCgpIHtcbiAgICByZXR1cm4gKHRoaXMuY291bnQgKiB0aGlzLnJvd0hlaWdodCkgKyAncHgnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxtOiBFbGVtZW50UmVmKXtcbiAgICBlbG0ubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlcicpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIElucHV0LFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdGVtcGxhdGVXcmFwcGVyXScgfSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVdyYXBwZXIge1xuXG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcblxuICBASW5wdXQoKSB0ZW1wbGF0ZVdyYXBwZXI6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHJvdzogYW55O1xuICBASW5wdXQoKSBjb2x1bW46IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlc1sndGVtcGxhdGVXcmFwcGVyJ10pIHtcbiAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlld1JlZikge1xuICAgICAgICB0aGlzLmVtYmVkZGVkVmlld1JlZi5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVdyYXBwZXIsIHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW1iZWRkZWRWaWV3UmVmKSB7XG4gICAgICB0aGlzLmVtYmVkZGVkVmlld1JlZi5jb250ZXh0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmLmNvbnRleHQucm93ID0gdGhpcy5yb3c7XG4gICAgICB0aGlzLmVtYmVkZGVkVmlld1JlZi5jb250ZXh0LmNvbHVtbiA9IHRoaXMuY29sdW1uO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmdcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFZpc2liaWxpdHlPYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL1Zpc2liaWxpdHlPYnNlcnZlcic7XG5cbi8qKlxuICogVmlzaWJpbGl0eSBPYnNlcnZlciBEaXJlY3RpdmVcbiAqXG4gKiBVc2FnZTpcbiAqXG4gKiBcdFx0PGRpdlxuICogXHRcdFx0dmlzaWJpbGl0eS1vYnNlcnZlclxuICogXHRcdFx0KG9uVmlzaWJpbGl0eUNoYW5nZSk9XCJkb1NvbWV0aGluZygkZXZlbnQpXCI+XG4gKiBcdFx0PC9kaXY+XG4gKlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlzaWJpbGl0eS1vYnNlcnZlcl0nIH0pXG5leHBvcnQgY2xhc3MgVmlzaWJpbGl0eSB7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy52aXNpYmxlJykgdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBvblZpc2liaWxpdHlDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICBuZXcgVmlzaWJpbGl0eU9ic2VydmVyKFxuICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy52aXNiaWxpdHlDaGFuZ2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICB2aXNiaWxpdHlDaGFuZ2UoKSB7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZS5lbWl0KHRydWUpO1xuICB9XG5cbn1cbiIsImV4cG9ydCBlbnVtIENvbHVtbk1vZGUge1xuICBzdGFuZGFyZCA9ICdzdGFuZGFyZCcgYXMgYW55LFxuICBmbGV4ID0gJ2ZsZXgnIGFzIGFueSxcbiAgZm9yY2UgPSAnZm9yY2UnIGFzIGFueVxufVxuIiwiZXhwb3J0IGVudW0gU2VsZWN0aW9uVHlwZSB7XG4gIHNpbmdsZSA9ICdzaW5nbGUnIGFzIGFueSxcbiAgbXVsdGkgPSAnbXVsdGknIGFzIGFueSxcbiAgbXVsdGlTaGlmdCA9ICdtdWx0aVNoaWZ0JyBhcyBhbnlcbn1cbiIsImV4cG9ydCBlbnVtIFNvcnREaXJlY3Rpb24ge1xuICBhc2MgPSAnYXNjJyBhcyBhbnksXG4gIGRlc2MgPSAnZGVzYycgYXMgYW55XG59XG4iLCJleHBvcnQgZW51bSBTb3J0VHlwZSB7XG4gIHNpbmdsZSA9ICdzaW5nbGUnIGFzIGFueSxcbiAgbXVsdGkgPSAnbXVsdGknIGFzIGFueVxufVxuIiwiLy8gQ29tcG9uZW50c1xuaW1wb3J0IHsgRGF0YVRhYmxlIH0gZnJvbSAnLi9jb21wb25lbnRzL0RhdGFUYWJsZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW4gfSBmcm9tICcuL2NvbXBvbmVudHMvRGF0YVRhYmxlQ29sdW1uJztcblxuLy8gTW9kZWxzXG5pbXBvcnQgeyBUYWJsZU9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9UYWJsZU9wdGlvbnMnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuL21vZGVscy9UYWJsZUNvbHVtbic7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9tb2RlbHMvU29ydCc7XG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9TZWxlY3Rpb25UeXBlJztcbmltcG9ydCB7IENvbHVtbk1vZGUgfSBmcm9tICcuL2VudW1zL0NvbHVtbk1vZGUnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4vZW51bXMvU29ydERpcmVjdGlvbic7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4vZW51bXMvU29ydFR5cGUnO1xuXG5jb25zdCBEQVRBVEFCTEVfQ09NUE9ORU5UUyA9IFtcbiAgRGF0YVRhYmxlLFxuICBEYXRhVGFibGVDb2x1bW5cbl07XG5cbmV4cG9ydCB7XG4gIERhdGFUYWJsZSxcbiAgVGFibGVPcHRpb25zLFxuICBUYWJsZUNvbHVtbixcbiAgU29ydCxcbiAgU2VsZWN0aW9uVHlwZSxcbiAgQ29sdW1uTW9kZSxcbiAgU29ydERpcmVjdGlvbixcbiAgU29ydFR5cGUsXG4gIERBVEFUQUJMRV9DT01QT05FTlRTXG59O1xuIiwiaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uL2VudW1zL1NvcnREaXJlY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgU29ydCB7XG5cbiAgcHJvcDogc3RyaW5nO1xuXG4gIGRpcjogU29ydERpcmVjdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy9jYW1lbENhc2UnO1xuXG4vKipcbiAqIERlZmF1bHQgQ29sdW1uIE9wdGlvbnNcbiAqIEB0eXBlIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBjbGFzcyBUYWJsZUNvbHVtbiB7XG5cbiAgLy8gdW5pcXVlIGlkXG4gICQkaWQ6IHN0cmluZyA9IGlkKCk7XG5cbiAgLy8gZGVmaW5lcyBpZiBpdHMgZXhwcmVzc2l2ZVxuICBpc0V4cHJlc3NpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBwaW5uZWQgdG8gdGhlIGxlZnRcbiAgZnJvemVuTGVmdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIHBpbm5lZCB0byB0aGUgcmlnaHRcbiAgZnJvemVuUmlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBUaGUgZ3JvdyBmYWN0b3IgcmVsYXRpdmUgdG8gb3RoZXIgY29sdW1ucy4gU2FtZSBhcyB0aGUgZmxleC1ncm93XG4gIC8vIEFQSSBmcm9tIGh0dHAgPS8vd3d3LnczLm9yZy9UUi9jc3MzLWZsZXhib3gvLiBCYXNpY2FsbHk7XG4gIC8vIHRha2UgYW55IGF2YWlsYWJsZSBleHRyYSB3aWR0aCBhbmQgZGlzdHJpYnV0ZSBpdCBwcm9wb3J0aW9uYWxseVxuICAvLyBhY2NvcmRpbmcgdG8gYWxsIGNvbHVtbnMnIGZsZXhHcm93IHZhbHVlcy5cbiAgZmxleEdyb3c6IG51bWJlciA9IDA7XG5cbiAgLy8gTWluaW11bSB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICBtaW5XaWR0aDogbnVtYmVyID0gMTAwO1xuXG4gIC8vTWF4aW11bSB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICBtYXhXaWR0aDogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gIC8vIFRoZSB3aWR0aCBvZiB0aGUgY29sdW1uOyBieSBkZWZhdWx0IChpbiBwaXhlbHMpLlxuICB3aWR0aDogbnVtYmVyID0gMTUwO1xuXG4gIC8vIElmIHllcyB0aGVuIHRoZSBjb2x1bW4gY2FuIGJlIHJlc2l6ZWQ7IG90aGVyd2lzZSBpdCBjYW5ub3QuXG4gIHJlc2l6YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gQ3VzdG9tIHNvcnQgY29tcGFyYXRvclxuICBjb21wYXJhdG9yOiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgLy8gSWYgeWVzIHRoZW4gdGhlIGNvbHVtbiBjYW4gYmUgc29ydGVkLlxuICBzb3J0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gY2FuIGNvbHVtbiBiZSBkcmFnZ2VkXG4gIGRyYWdnYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gV2hldGhlciB0aGUgY29sdW1uIGNhbiBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB0byBmaWxsIHNwYWNlIGluIHRoZSB0YWJsZS5cbiAgY2FuQXV0b1Jlc2l6ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gY29sdW1uIG5hbWUgLyBsYWJlbFxuICBuYW1lOiBzdHJpbmc7XG5cbiAgLy8gcHJvcGVydHkgdG8gYmluZCB0byBvbiB0aGUgcm93XG4gIHByb3A6IHN0cmluZztcblxuICAvLyBuZzIgdGVtcGxhdGUgcmVmXG4gIHRlbXBsYXRlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJvcHM/OiBhbnkpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcblxuICAgIGlmKCF0aGlzLnByb3AgJiYgdGhpcy5uYW1lKSB7XG4gICAgICB0aGlzLnByb3AgPSBjYW1lbENhc2UodGhpcy5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvcHMoKSB7XG4gICAgbGV0IHByb3BzID0gWyduYW1lJywgJ3Byb3AnXTtcbiAgICBsZXQgY29sID0gbmV3IFRhYmxlQ29sdW1uKCk7XG5cbiAgICBmb3IobGV0IHByb3AgaW4gY29sKSB7XG4gICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG59O1xuIiwiaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuL1RhYmxlQ29sdW1uJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL1NvcnQnO1xuXG5pbXBvcnQgeyBDb2x1bW5Nb2RlIH0gZnJvbSAnLi4vZW51bXMvQ29sdW1uTW9kZSc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL2VudW1zL1NvcnRUeXBlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi9lbnVtcy9TZWxlY3Rpb25UeXBlJztcblxuZXhwb3J0IGNsYXNzIFRhYmxlT3B0aW9ucyB7XG5cbiAgLy8gQ29sdW1uc1xuICBjb2x1bW5zOiBBcnJheTxUYWJsZUNvbHVtbj4gPSBbXTtcblxuICAvLyBFbmFibGUgdmVydGljYWwgc2Nyb2xsYmFyc1xuICBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gRW5hYmxlIGhvcnogc2Nyb2xsYmFyc1xuICBzY3JvbGxiYXJIOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gVGhlIHJvdyBoZWlnaHQ7IHdoaWNoIGlzIG5lY2Vzc2FyeVxuICAvLyB0byBjYWxjdWxhdGUgdGhlIGhlaWdodCBmb3IgdGhlIGxhenkgcmVuZGVyaW5nLlxuICByb3dIZWlnaHQ6IG51bWJlciA9IDMwO1xuXG4gIC8vIGZsZXhcbiAgLy8gZm9yY2VcbiAgLy8gc3RhbmRhcmRcbiAgY29sdW1uTW9kZTogQ29sdW1uTW9kZSA9IENvbHVtbk1vZGUuc3RhbmRhcmQ7XG5cbiAgLy8gTG9hZGluZyBtZXNzYWdlIHByZXNlbnRlZCB3aGVuIHRoZSBhcnJheSBpcyB1bmRlZmluZWRcbiAgbG9hZGluZ01lc3NhZ2U6IHN0cmluZyA9ICdMb2FkaW5nLi4uJztcblxuICAvLyBNZXNzYWdlIHRvIHNob3cgd2hlbiBhcnJheSBpcyBwcmVzZW50ZWRcbiAgLy8gYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xuICBlbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICdObyBkYXRhIHRvIGRpc3BsYXknO1xuXG4gIC8vIFRoZSBtaW5pbXVtIGhlYWRlciBoZWlnaHQgaW4gcGl4ZWxzLlxuICAvLyBwYXNzIGZhbHNleSBmb3Igbm8gaGVhZGVyXG4gIGhlYWRlckhlaWdodDogbnVtYmVyfHN0cmluZyA9IDMwO1xuXG4gIC8vIFRoZSBtaW5pbXVtIGZvb3RlciBoZWlnaHQgaW4gcGl4ZWxzLlxuICAvLyBwYXNzIGZhbHNleSBmb3Igbm8gZm9vdGVyXG4gIGZvb3RlckhlaWdodDogbnVtYmVyID0gMDtcblxuICAvLyBpZiBleHRlcm5hbCBwYWdpbmcgaXMgdHVybmVkIG9uXG4gIGV4dGVybmFsUGFnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gUGFnZSBzaXplXG4gIGxpbWl0OiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgLy8gVG90YWwgY291bnRcbiAgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgLy8gUGFnZSBvZmZzZXRcbiAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuXG4gIC8vIExvYWRpbmcgaW5kaWNhdG9yXG4gIGxvYWRpbmdJbmRpY2F0b3I6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBTZWxlY3Rpb25zP1xuICBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuXG4gIC8vIGlmIHlvdSBjYW4gcmVvcmRlciBjb2x1bW5zXG4gIHJlb3JkZXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvLyB0eXBlIG9mIHNvcnRpbmdcbiAgc29ydFR5cGU6IFNvcnRUeXBlID0gU29ydFR5cGUuc2luZ2xlO1xuXG4gIC8vIHNvcnRzXG4gIHNvcnRzOiBBcnJheTxTb3J0PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocyB9IGZyb20gJy4uL3V0aWxzL2NvbHVtbic7XG5pbXBvcnQgeyBzY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uL3V0aWxzL3Njcm9sbGJhcldpZHRoJztcbmltcG9ydCB7IG5leHRTb3J0RGlyLCBzb3J0Um93cyB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuXG5pbXBvcnQgeyBUYWJsZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvVGFibGVPcHRpb25zJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWxzL1RhYmxlQ29sdW1uJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuLi9tb2RlbHMvU29ydCc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL2VudW1zL1NvcnRUeXBlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRlU2VydmljZSB7XG5cbiAgb3B0aW9uczogVGFibGVPcHRpb25zO1xuICByb3dzOiBBcnJheTxhbnk+O1xuICBzZWxlY3RlZDogQXJyYXk8YW55PjtcblxuICBvblNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG9uUm93c1VwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG9uUGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2Nyb2xsYmFyV2lkdGg6IG51bWJlciA9IHNjcm9sbGJhcldpZHRoKCk7XG4gIG9mZnNldFg6IG51bWJlciA9IDA7XG4gIG9mZnNldFk6IG51bWJlciA9IDA7XG4gIGlubmVyV2lkdGg6IG51bWJlciA9IDA7XG4gIGJvZHlIZWlnaHQ6IG51bWJlciA9IDMwMDtcblxuICBnZXQgY29sdW1uc0J5UGluKCkge1xuICAgIHJldHVybiBjb2x1bW5zQnlQaW4odGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbkdyb3VwV2lkdGhzKCkge1xuICAgIHJldHVybiBjb2x1bW5Hcm91cFdpZHRocyh0aGlzLmNvbHVtbnNCeVBpbiwgdGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuICB9XG5cbiAgZ2V0IHBhZ2VDb3VudCgpIHtcbiAgICBpZighdGhpcy5vcHRpb25zLmV4dGVybmFsUGFnaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3dzLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jb3VudDtcbiAgICB9XG4gIH1cblxuICBnZXQgcGFnZVNpemUoKSB7XG4gICAgaWYodGhpcy5vcHRpb25zLnNjcm9sbGJhclYpIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5ib2R5SGVpZ2h0IC8gdGhpcy5vcHRpb25zLnJvd0hlaWdodCkgKyAxO1xuICAgIH0gZWxzZSBpZih0aGlzLm9wdGlvbnMubGltaXQpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJvd3MubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpbmRleGVzKCkge1xuICAgIGxldCBmaXJzdCA9IDAsIGxhc3QgPSAwO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLnNjcm9sbGJhclYpe1xuICAgICAgY29uc3QgZmxvb3IgPSBNYXRoLmZsb29yKCh0aGlzLm9mZnNldFkgfHwgMCkgLyB0aGlzLm9wdGlvbnMucm93SGVpZ2h0KTtcbiAgICAgIGZpcnN0ID0gTWF0aC5tYXgoZmxvb3IsIDApO1xuICAgICAgbGFzdCA9IE1hdGgubWluKGZpcnN0ICsgdGhpcy5wYWdlU2l6ZSwgdGhpcy5wYWdlQ291bnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdCA9IE1hdGgubWF4KHRoaXMub3B0aW9ucy5vZmZzZXQgKiB0aGlzLnBhZ2VTaXplLCAwKTtcbiAgICAgIGxhc3QgPSBNYXRoLm1pbihmaXJzdCArIHRoaXMucGFnZVNpemUsIHRoaXMucGFnZUNvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBmaXJzdCwgbGFzdCB9O1xuICB9XG5cbiAgc2V0U2VsZWN0ZWQoc2VsZWN0ZWQ6IEFycmF5PGFueT4pIHtcbiAgICBpZighdGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkIHx8IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFJvd3Mocm93czogQXJyYXk8YW55Pikge1xuICAgIGlmKHJvd3MpIHtcbiAgICAgIHRoaXMucm93cyA9IFsuLi5yb3dzXTtcbiAgICAgIHRoaXMub25Sb3dzVXBkYXRlLmVtaXQocm93cyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBUYWJsZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLm9wdGlvbnMub2Zmc2V0ID0gcGFnZSAtIDE7XG5cbiAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHtcbiAgICAgIG9mZnNldDogdGhpcy5vcHRpb25zLm9mZnNldCxcbiAgICAgIGxpbWl0OiB0aGlzLnBhZ2VTaXplLFxuICAgICAgY291bnQ6IHRoaXMucGFnZUNvdW50XG4gICAgfSk7XG4gIH1cblxuICBuZXh0U29ydChjb2x1bW46IFRhYmxlQ29sdW1uKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5vcHRpb25zLnNvcnRzLmZpbmRJbmRleChzID0+XG4gICAgICB7IHJldHVybiBzLnByb3AgPT09IGNvbHVtbi5wcm9wIH0pO1xuXG4gICAgbGV0IGN1clNvcnQgPSB0aGlzLm9wdGlvbnMuc29ydHNbaWR4XTtcbiAgICBsZXQgY3VyRGlyID0gdW5kZWZpbmVkO1xuICAgIGlmKGN1clNvcnQpIGN1ckRpciA9IGN1clNvcnQuZGlyO1xuXG4gICAgY29uc3QgZGlyID0gbmV4dFNvcnREaXIodGhpcy5vcHRpb25zLnNvcnRUeXBlLCBjdXJEaXIpO1xuICAgIGlmKGRpciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc29ydHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfSBlbHNlIGlmKGN1clNvcnQpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zb3J0c1tpZHhdLmRpciA9IGRpcjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5vcHRpb25zLnNvcnRUeXBlID09PSBTb3J0VHlwZS5zaW5nbGUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnNvcnRzLnNwbGljZSgwLCB0aGlzLm9wdGlvbnMuc29ydHMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vcHRpb25zLnNvcnRzLnB1c2gobmV3IFNvcnQoeyBkaXIsIHByb3A6IGNvbHVtbi5wcm9wIH0pKTtcbiAgICB9XG5cbiAgICBpZighY29sdW1uLmNvbXBhcmF0b3IpIHtcbiAgICAgIHRoaXMuc2V0Um93cyhzb3J0Um93cyh0aGlzLnJvd3MsIHRoaXMub3B0aW9ucy5zb3J0cykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4uY29tcGFyYXRvcih0aGlzLnJvd3MsIHRoaXMub3B0aW9ucy5zb3J0cylcbiAgICB9XG4gIH1cblxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJbnRlcnNlY3Rpb25PYnNlcnZlciB7XG4gIHJvb3Q6IEhUTUxFbGVtZW50O1xuICByb290TWFyZ2luOiBzdHJpbmc7XG4gIHRocmVzaG9sZHM6IEFycmF5PG51bWJlcj47XG4gIGRpc2Nvbm5lY3Q6IEZ1bmN0aW9uO1xuICBvYnNlcnZlOiBGdW5jdGlvbjtcbiAgdGFrZVJlY29yZHM6IEZ1bmN0aW9uO1xuICB1bm9ic2VydmU6IEZ1bmN0aW9uO1xufVxuXG5cbi8qKlxuICogT2JzZXJ2ZXMgY2hhbmdlcyB0byBhbiBlbGVtZW50cyB2aXNpYmlsaXR5LlxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0BhbWNkbmwvamF2YXNjcmlwdC1zLW5ldy1pbnRlcnNlY3Rpb25vYnNlcnZlci1jZGNlOGE3M2JlZjgjLmV2bjV0d3VnM1xuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogXHRcdHZhciBlbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhbmRhXCIpO1xuICogXHQgXHRuZXcgVmlzaWJpbGl0eU9ic2VydmVyKGVsbSwgZnVuY3Rpb24oKSB7XG4gKiBcdFx0XHRhbGVydCgnUEFuZGFzIHJvY2shJyk7XG4qIFx0ICB9KTtcbipcbiAqL1xuZXhwb3J0IGNsYXNzIFZpc2liaWxpdHlPYnNlcnZlciB7XG5cbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xuICBjYWxsYmFjazogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgLypcbiAgICAvLyB0aGlzIGlzIG5vdCB3b3JraW5nLi4uXG4gICAgaWYod2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgICB0aGlzLnByb2Nlc3NDaGFuZ2VzLmJpbmQodGhpcyksIHsgdGhyZXNob2xkOiBbMC41XSB9KTtcblxuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7IHRoaXMucnVuUG9seWZpbGwoZWxlbWVudCk7IH1cbiAgICAqL1xuXG4gICB0aGlzLnJ1blBvbHlmaWxsKGVsZW1lbnQpO1xuICB9XG5cbiAgcnVuUG9seWZpbGwoZWxlbWVudCkge1xuICAgIGxldCBjaGVja1Zpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNoZWNrVmlzaWJpbGl0eSgpLCAxMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgaXNWaXNpYmxlKGJvdW5kaW5nQ2xpZW50UmVjdCwgaW50ZXJzZWN0aW9uUmVjdCkge1xuICAgIHJldHVybiAoKGludGVyc2VjdGlvblJlY3Qud2lkdGggKiBpbnRlcnNlY3Rpb25SZWN0LmhlaWdodCkgL1xuICAgICAgICAgICAgKGJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCAqIGJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQpID49IDAuNSk7XG4gIH1cblxuICB2aXNpYmxlVGltZXJDYWxsYmFjayhlbGVtZW50LCBvYnNlcnZlcikge1xuICAgIGRlbGV0ZSBlbGVtZW50LnZpc2libGVUaW1lb3V0O1xuXG4gICAgLy8gUHJvY2VzcyBhbnkgcGVuZGluZyBvYnNlcnZhdGlvbnNcbiAgICB0aGlzLnByb2Nlc3NDaGFuZ2VzKG9ic2VydmVyLnRha2VSZWNvcmRzKCkpO1xuXG4gICAgaWYgKCdpc1Zpc2libGUnIGluIGVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSBlbGVtZW50LmlzVmlzaWJsZTtcbiAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NDaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICBjaGFuZ2VzLmZvckVhY2goKGNoYW5nZVJlY29yZCkgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBjaGFuZ2VSZWNvcmQudGFyZ2V0O1xuXG4gICAgICBlbGVtZW50LmlzVmlzaWJsZSA9IHRoaXMuaXNWaXNpYmxlKFxuICAgICAgICBjaGFuZ2VSZWNvcmQuYm91bmRpbmdDbGllbnRSZWN0LFxuICAgICAgICBjaGFuZ2VSZWNvcmQuaW50ZXJzZWN0aW9uUmVjdCk7XG5cbiAgICAgIGlmICgnaXNWaXNpYmxlJyBpbiBlbGVtZW50KSB7XG4gICAgICAgIC8vIFRyYW5zaXRpb25lZCBmcm9tIGhpZGRlbiB0byB2aXNpYmxlXG4gICAgICAgIGVsZW1lbnQudmlzaWJsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgIHRoaXMudmlzaWJsZVRpbWVyQ2FsbGJhY2suYmluZCh0aGlzKSxcbiAgICAgICAgICAxMDAwLFxuICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgdGhpcy5vYnNlcnZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUcmFuc2l0aW9uZWQgZnJvbSB2aXNpYmxlIHRvIGhpZGRlblxuICAgICAgICBpZiAoJ3Zpc2libGVUaW1lb3V0JyBpbiBlbGVtZW50KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQudmlzaWJsZVRpbWVvdXQpO1xuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LnZpc2libGVUaW1lb3V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb252ZXJ0cyBzdHJpbmdzIGZyb20gc29tZXRoaW5nIHRvIGNhbWVsIGNhc2VcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA0MjUyODcvY29udmVydC1kYXNoLXNlcGFyYXRlZC1zdHJpbmctdG8tY2FtZWxjYXNlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0ciBcbiAqIEByZXR1cm4ge3N0cmluZ30gY2FtZWwgY2FzZSBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgLy8gUmVwbGFjZSBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCBhIHNwYWNlXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9bXmEtekEtWjAtOSBdL2csIFwiIFwiKTtcbiAgLy8gcHV0IGEgc3BhY2UgYmVmb3JlIGFuIHVwcGVyY2FzZSBsZXR0ZXJcbiAgc3RyID0gc3RyLnJlcGxhY2UoLyhbYS16XSg/PVtBLVpdKSkvZywgJyQxICcpO1xuICAvLyBMb3dlciBjYXNlIGZpcnN0IGNoYXJhY3RlciBhbmQgc29tZSBvdGhlciBzdHVmZlxuICBzdHIgPSBzdHIucmVwbGFjZSgvKFteYS16QS1aMC05IF0pfF5bMC05XSsvZywgJycpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAvLyB1cHBlcmNhc2UgY2hhcmFjdGVycyBwcmVjZWRlZCBieSBhIHNwYWNlIG9yIG51bWJlclxuICBzdHIgPSBzdHIucmVwbGFjZSgvKFsgMC05XSspKFthLXpBLVpdKS9nLCBmdW5jdGlvbihhLGIsYykge1xuICAgICAgcmV0dXJuIGIudHJpbSgpK2MudG9VcHBlckNhc2UoKTtcbiAgfSk7XG4gIHJldHVybiBzdHI7XG59OyIsIi8qKlxuICogUmV0dXJucyB0aGUgY29sdW1ucyBieSBwaW4uXG4gKiBAcGFyYW0ge2FycmF5fSBjb2xzdW1uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uc0J5UGluKGNvbHMpe1xuICBsZXQgcmV0ID0ge1xuICAgIGxlZnQ6IFtdLFxuICAgIGNlbnRlcjogW10sXG4gICAgcmlnaHQ6IFtdXG4gIH07XG5cbiAgaWYoY29scykge1xuICAgIGZvcihsZXQgaT0wLCBsZW49Y29scy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGMgPSBjb2xzW2ldO1xuICAgICAgaWYoYy5mcm96ZW5MZWZ0KXtcbiAgICAgICAgcmV0LmxlZnQucHVzaChjKVxuICAgICAgfSBlbHNlIGlmKGMuZnJvemVuUmlnaHQpe1xuICAgICAgICByZXQucmlnaHQucHVzaChjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5jZW50ZXIucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB3aWR0aHMgb2YgYWxsIGdyb3VwIHNldHMgb2YgYSBjb2x1bW5cbiAqIEBwYXJhbSB7b2JqZWN0fSBncm91cHNcbiAqIEBwYXJhbSB7YXJyYXl9IGFsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uR3JvdXBXaWR0aHMoZ3JvdXBzLCBhbGwpe1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGNvbHVtblRvdGFsV2lkdGgoZ3JvdXBzLmxlZnQpLFxuICAgIGNlbnRlcjogY29sdW1uVG90YWxXaWR0aChncm91cHMuY2VudGVyKSxcbiAgICByaWdodDogY29sdW1uVG90YWxXaWR0aChncm91cHMucmlnaHQpLFxuICAgIHRvdGFsOiBjb2x1bW5Ub3RhbFdpZHRoKGFsbClcbiAgfTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgY29sdW1ucyBhbmQgdGhlaXIgZ3JvdXBzXG4gKiBAcGFyYW0ge2FycmF5fSBjb2x1bW5zXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgd2lkdGggdG8gZ2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2x1bW5Ub3RhbFdpZHRoKGNvbHVtbnMsIHByb3A/KSB7XG4gIGxldCB0b3RhbFdpZHRoID0gMDtcblxuICBpZihjb2x1bW5zKSB7XG4gICAgZm9yKGxldCBpPTAsIGxlbj1jb2x1bW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYyA9IGNvbHVtbnNbaV07XG4gICAgICBsZXQgaGFzID0gcHJvcCAmJiBjW3Byb3BdO1xuICAgICAgdG90YWxXaWR0aCA9IHRvdGFsV2lkdGggKyAoaGFzID8gY1twcm9wXSA6IGMud2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b3RhbFdpZHRoO1xufTtcbiIsIi8qKlxuICogUmV0dXJucyBhIGRlZXAgb2JqZWN0IGdpdmVuIGEgc3RyaW5nLiB6b29bJ2FuaW1hbC50eXBlJ11cbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwVmFsdWVHZXR0ZXIob2JqLCBwYXRoKSB7XG4gIGlmKCFvYmogfHwgIXBhdGgpIHJldHVybiBvYmo7XG5cbiAgdmFyIGN1cnJlbnQgPSBvYmosXG4gICAgICBzcGxpdCA9IHBhdGguc3BsaXQoJy4nKTtcblxuICBpZihzcGxpdC5sZW5ndGgpe1xuICAgIGZvcih2YXIgaT0wLCBsZW49c3BsaXQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3NwbGl0W2ldXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudDtcbn07XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmlxdWUgb2JqZWN0IGlkLlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjQ4NjY2L2hvdy10by1nZW5lcmF0ZS1zaG9ydC11aWQtbGlrZS1heDRqOXotaW4tanNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlkKCkge1xuICByZXR1cm4gKFwiMDAwMFwiICsgKE1hdGgucmFuZG9tKCkqTWF0aC5wb3coMzYsNCkgPDwgMCkudG9TdHJpbmcoMzYpKS5zbGljZSgtNCk7XG59OyIsImV4cG9ydCBlbnVtIEtleXMge1xuICB1cCA9IDM4LFxuICBkb3duID0gNDAsXG4gIHJldHVybiA9IDEzLFxuICBlc2NhcGUgPSAyN1xufVxuIiwiaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocyB9IGZyb20gJy4vY29sdW1uJztcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgY29sdW1ucyBhbmQgdGhlaXIgZ3JvdXBzXG4gKiBAcGFyYW0ge2FycmF5fSBjb2x1bW5zXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgd2lkdGggdG8gZ2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2x1bW5Ub3RhbFdpZHRoKGNvbHVtbnM6IGFueSwgcHJvcD86IGFueSkge1xuICBsZXQgdG90YWxXaWR0aCA9IDA7XG5cbiAgZm9yKGxldCBjb2x1bW4gb2YgY29sdW1ucykge1xuICAgIGNvbnN0IGhhcyA9IHByb3AgJiYgY29sdW1uW3Byb3BdO1xuICAgIHRvdGFsV2lkdGggPSB0b3RhbFdpZHRoICsgKGhhcyA/IGNvbHVtbltwcm9wXSA6IGNvbHVtbi53aWR0aCk7XG4gIH1cblxuICByZXR1cm4gdG90YWxXaWR0aDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBUb3RhbCBGbGV4IEdyb3dcbiAqIEBwYXJhbSB7YXJyYXl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3RhbEZsZXhHcm93KGNvbHVtbnMpe1xuICBsZXQgdG90YWxGbGV4R3JvdyA9IDA7XG5cbiAgZm9yIChsZXQgYyBvZiBjb2x1bW5zKSB7XG4gICAgdG90YWxGbGV4R3JvdyArPSBjLmZsZXhHcm93IHx8IDA7XG4gIH1cblxuICByZXR1cm4gdG90YWxGbGV4R3Jvdztcbn1cblxuLyoqXG4gKiBBZGp1c3RzIHRoZSBjb2x1bW4gd2lkdGhzLlxuICogSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9maXhlZC1kYXRhLXRhYmxlL2Jsb2IvbWFzdGVyL3NyYy9GaXhlZERhdGFUYWJsZVdpZHRoSGVscGVyLmpzXG4gKiBAcGFyYW0ge2FycmF5fSBhbGwgY29sdW1uc1xuICogQHBhcmFtIHtpbnR9IHdpZHRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGp1c3RDb2x1bW5XaWR0aHMoYWxsQ29sdW1uczogYW55LCBleHBlY3RlZFdpZHRoOiBhbnkpe1xuICBsZXQgY29sdW1uc1dpZHRoID0gY29sdW1uVG90YWxXaWR0aChhbGxDb2x1bW5zKSxcbiAgICAgIHRvdGFsRmxleEdyb3cgPSBnZXRUb3RhbEZsZXhHcm93KGFsbENvbHVtbnMpLFxuICAgICAgY29sc0J5R3JvdXAgPSBjb2x1bW5zQnlQaW4oYWxsQ29sdW1ucyk7XG5cbiAgaWYgKGNvbHVtbnNXaWR0aCAhPT0gZXhwZWN0ZWRXaWR0aCl7XG4gICAgc2NhbGVDb2x1bW5zKGNvbHNCeUdyb3VwLCBleHBlY3RlZFdpZHRoLCB0b3RhbEZsZXhHcm93KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlc2l6ZXMgY29sdW1ucyBiYXNlZCBvbiB0aGUgZmxleEdyb3cgcHJvcGVydHksIHdoaWxlIHJlc3BlY3RpbmcgbWFudWFsbHkgc2V0IHdpZHRoc1xuICogQHBhcmFtIHthcnJheX0gY29sc0J5R3JvdXBcbiAqIEBwYXJhbSB7aW50fSBtYXhXaWR0aFxuICogQHBhcmFtIHtpbnR9IHRvdGFsRmxleEdyb3dcbiAqL1xuZnVuY3Rpb24gc2NhbGVDb2x1bW5zKGNvbHNCeUdyb3VwOiBhbnksIG1heFdpZHRoOiBhbnksIHRvdGFsRmxleEdyb3c6IGFueSkge1xuICAvLyBjYWxjdWxhdGUgdG90YWwgd2lkdGggYW5kIGZsZXhncm93IHBvaW50cyBmb3IgY291bHVtbnMgdGhhdCBjYW4gYmUgcmVzaXplZFxuICBmb3IobGV0IGF0dHIgaW4gY29sc0J5R3JvdXApIHtcbiAgICBmb3IobGV0IGNvbHVtbiBvZiBjb2xzQnlHcm91cFthdHRyXSkge1xuICAgICAgaWYgKCFjb2x1bW4uY2FuQXV0b1Jlc2l6ZSl7XG4gICAgICAgIG1heFdpZHRoIC09IGNvbHVtbi53aWR0aDtcbiAgICAgICAgdG90YWxGbGV4R3JvdyAtPSBjb2x1bW4uZmxleEdyb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW4ud2lkdGggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCBoYXNNaW5XaWR0aCA9IHt9XG4gIGxldCByZW1haW5pbmdXaWR0aCA9IG1heFdpZHRoO1xuXG4gIC8vIHJlc2l6ZSBjb2x1bW5zIHVudGlsIG5vIHdpZHRoIGlzIGxlZnQgdG8gYmUgZGlzdHJpYnV0ZWRcbiAgZG8ge1xuICAgIGxldCB3aWR0aFBlckZsZXhQb2ludCA9IHJlbWFpbmluZ1dpZHRoIC8gdG90YWxGbGV4R3JvdztcbiAgICByZW1haW5pbmdXaWR0aCA9IDA7XG5cbiAgICBmb3IobGV0IGF0dHIgaW4gY29sc0J5R3JvdXApIHtcbiAgICAgIGZvcihsZXQgY29sdW1uIG9mIGNvbHNCeUdyb3VwW2F0dHJdKSB7XG4gICAgICAgIC8vIGlmIHRoZSBjb2x1bW4gY2FuIGJlIHJlc2l6ZSBhbmQgaXQgaGFzbid0IHJlYWNoZWQgaXRzIG1pbmltdW0gd2lkdGggeWV0XG4gICAgICAgIGlmIChjb2x1bW4uY2FuQXV0b1Jlc2l6ZSAmJiAhaGFzTWluV2lkdGhbY29sdW1uLnByb3BdKXtcbiAgICAgICAgICBsZXQgbmV3V2lkdGggPSBjb2x1bW4ud2lkdGggICsgY29sdW1uLmZsZXhHcm93ICogd2lkdGhQZXJGbGV4UG9pbnQ7XG4gICAgICAgICAgaWYgKGNvbHVtbi5taW5XaWR0aCAhPT0gdW5kZWZpbmVkICYmIG5ld1dpZHRoIDwgY29sdW1uLm1pbldpZHRoKXtcbiAgICAgICAgICAgIHJlbWFpbmluZ1dpZHRoICs9IG5ld1dpZHRoIC0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICAgICAgaGFzTWluV2lkdGhbY29sdW1uLnByb3BdID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uLndpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChyZW1haW5pbmdXaWR0aCAhPT0gMCk7XG59XG5cbi8qKlxuICogRm9yY2VzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1ucyB0b1xuICogZGlzdHJpYnV0ZSBlcXVhbGx5IGJ1dCBvdmVyZmxvd2luZyB3aGVuIG5lc2MuXG4gKlxuICogUnVsZXM6XG4gKlxuICogIC0gSWYgY29tYmluZWQgd2l0aHMgYXJlIGxlc3MgdGhhbiB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGdyaWQsXG4gKiAgICBwcm9wb3JhdGlvbiB0aGUgd2lkdGhzIGdpdmVuIHRoZSBtaW4gLyBtYXggLyBub3JhbWwgd2lkdGhzIHRvIGZpbGwgdGhlIHdpZHRoLlxuICpcbiAqICAtIElmIHRoZSBjb21iaW5lZCB3aWR0aHMsIGV4Y2VlZCB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGdyaWQsXG4gKiAgICB1c2UgdGhlIHN0YW5kYXJkIHdpZHRocy5cbiAqXG4gKiAgLSBJZiBhIGNvbHVtbiBpcyByZXNpemVkLCBpdCBzaG91bGQgYWx3YXlzIHVzZSB0aGF0IHdpZHRoXG4gKlxuICogIC0gVGhlIHByb3BvcmF0aW9uYWwgd2lkdGhzIHNob3VsZCBuZXZlciBmYWxsIGJlbG93IG1pbiBzaXplIGlmIHNwZWNpZmllZC5cbiAqXG4gKiAgLSBJZiB0aGUgZ3JpZCBzdGFydHMgb2ZmIHNtYWxsIGJ1dCB0aGVuIGJlY29tZXMgZ3JlYXRlciB0aGFuIHRoZSBzaXplICggKyAvIC0gKVxuICogICAgdGhlIHdpZHRoIHNob3VsZCB1c2UgdGhlIG9yZ2luaWFsIHdpZHRoOyBub3QgdGhlIG5ld2x5IHByb3BvcmF0aWVkIHdpZHRocy5cbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBhbGxDb2x1bW5zXG4gKiBAcGFyYW0ge2ludH0gZXhwZWN0ZWRXaWR0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yY2VGaWxsQ29sdW1uV2lkdGhzKGFsbENvbHVtbnM6IGFueSwgZXhwZWN0ZWRXaWR0aDogYW55LCBzdGFydElkeDogYW55KXtcbiAgbGV0IGNvbnRlbnRXaWR0aCA9IDAsXG4gICAgICBjb2x1bW5zVG9SZXNpemUgPSBzdGFydElkeCA+IC0xID9cbiAgICAgICAgYWxsQ29sdW1ucy5zbGljZShzdGFydElkeCwgYWxsQ29sdW1ucy5sZW5ndGgpLmZpbHRlcigoYykgPT4geyByZXR1cm4gYy5jYW5BdXRvUmVzaXplIH0pIDpcbiAgICAgICAgYWxsQ29sdW1ucy5maWx0ZXIoKGMpID0+IHsgcmV0dXJuIGMuY2FuQXV0b1Jlc2l6ZSB9KTtcblxuICBmb3IobGV0IGNvbHVtbiBvZiBhbGxDb2x1bW5zKSB7XG4gICAgaWYoIWNvbHVtbi5jYW5BdXRvUmVzaXplKXtcbiAgICAgIGNvbnRlbnRXaWR0aCArPSBjb2x1bW4ud2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRXaWR0aCArPSAoY29sdW1uLiQkb2xkV2lkdGggfHwgY29sdW1uLndpZHRoKTtcbiAgICB9XG4gIH1cblxuICBsZXQgcmVtYWluaW5nV2lkdGggPSBleHBlY3RlZFdpZHRoIC0gY29udGVudFdpZHRoLFxuICAgICAgYWRkaXRpb25XaWR0aFBlckNvbHVtbiA9IHJlbWFpbmluZ1dpZHRoIC8gY29sdW1uc1RvUmVzaXplLmxlbmd0aCxcbiAgICAgIGV4Y2VlZHNXaW5kb3cgPSBjb250ZW50V2lkdGggPiBleHBlY3RlZFdpZHRoO1xuXG4gIGZvcihsZXQgY29sdW1uIG9mIGNvbHVtbnNUb1Jlc2l6ZSkge1xuICAgIGlmKGV4Y2VlZHNXaW5kb3cpe1xuICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLiQkb2xkV2lkdGggfHwgY29sdW1uLndpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZighY29sdW1uLiQkb2xkV2lkdGgpe1xuICAgICAgICBjb2x1bW4uJCRvbGRXaWR0aCA9IGNvbHVtbi53aWR0aDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3U2l6ZSA9IGNvbHVtbi4kJG9sZFdpZHRoICsgYWRkaXRpb25XaWR0aFBlckNvbHVtbjtcbiAgICAgIGlmKGNvbHVtbi5taW5XaXRoICYmIG5ld1NpemUgPCBjb2x1bW4ubWluV2lkdGgpe1xuICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgICB9IGVsc2UgaWYoY29sdW1uLm1heFdpZHRoICYmIG5ld1NpemUgPiBjb2x1bW4ubWF4V2lkdGgpe1xuICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4ubWF4V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW4ud2lkdGggPSBuZXdTaXplO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgc2Nyb2xsYmFyLiAgTmVzYyBmb3Igd2luZG93c1xuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTMzODI4NzMvODg4MTY1XG4gKiBAcmV0dXJuIHtpbnR9IHdpZHRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxiYXJXaWR0aCgpIHtcbiAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIG91dGVyLnN0eWxlLndpZHRoID0gXCIxMDBweFwiO1xuICBvdXRlci5zdHlsZS5tc092ZXJmbG93U3R5bGUgPSBcInNjcm9sbGJhclwiO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGhOb1Njcm9sbCA9IG91dGVyLm9mZnNldFdpZHRoO1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XG5cbiAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gIHZhciB3aWR0aFdpdGhTY3JvbGwgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgcmV0dXJuIHdpZHRoTm9TY3JvbGwgLSB3aWR0aFdpdGhTY3JvbGw7XG59OyIsImV4cG9ydCBmdW5jdGlvbiBzZWxlY3RSb3dzKHNlbGVjdGVkLCByb3cpIHtcbiAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkLmluZGV4T2Yocm93KTtcblxuICBpZihzZWxlY3RlZEluZGV4ID4gLTEpe1xuICAgIHNlbGVjdGVkLnNwbGljZShzZWxlY3RlZEluZGV4LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3RlZC5wdXNoKHJvdyk7XG4gIH1cblxuICByZXR1cm4gc2VsZWN0ZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RSb3dzQmV0d2VlbihzZWxlY3RlZCwgcm93cywgaW5kZXgsIHByZXZJbmRleCkge1xuICBjb25zdCByZXZlcnNlID0gaW5kZXggPCBwcmV2SW5kZXg7XG5cbiAgZm9yKHZhciBpID0gMCwgbGVuID0gcm93cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IHJvd3NbaV07XG4gICAgY29uc3QgZ3JlYXRlciA9IGkgPj0gcHJldkluZGV4ICYmIGkgPD0gaW5kZXg7XG4gICAgY29uc3QgbGVzc2VyID0gaSA8PSBwcmV2SW5kZXggJiYgaSA+PSBpbmRleDtcblxuICAgIGxldCByYW5nZSA9IHsgc3RhcnQ6IDAsIGVuZDogMCB9O1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByYW5nZSA9IHtcbiAgICAgICAgc3RhcnQ6IGluZGV4LFxuICAgICAgICBlbmQ6IChwcmV2SW5kZXggLSBpbmRleClcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0ge1xuICAgICAgICBzdGFydDogcHJldkluZGV4LFxuICAgICAgICBlbmQ6IGluZGV4ICsgMVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZigocmV2ZXJzZSAmJiBsZXNzZXIpIHx8ICghcmV2ZXJzZSAmJiBncmVhdGVyKSl7XG4gICAgICBjb25zdCBpZHggPSBzZWxlY3RlZC5pbmRleE9mKHJvdyk7XG5cbiAgICAgIC8vIGlmIHJldmVyc2Ugc2hpZnQgc2VsZWN0aW9uICh1bnNlbGVjdCkgYW5kIHRoZVxuICAgICAgLy8gcm93IGlzIGFscmVhZHkgc2VsZWN0ZWQsIHJlbW92ZSBpdCBmcm9tIHNlbGVjdGVkXG4gICAgICBpZiAocmV2ZXJzZSAmJiBpZHggPiAtMSkge1xuICAgICAgICBzZWxlY3RlZC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGluIHRoZSBwb3NpdGl2ZSByYW5nZSB0byBiZSBhZGRlZCB0byBgc2VsZWN0ZWRgLCBhbmRcbiAgICAgIC8vIG5vdCBhbHJlYWR5IGluIHRoZSBzZWxlY3RlZCBhcnJheSwgYWRkIGl0XG4gICAgICBpZiggaSA+PSByYW5nZS5zdGFydCAmJiBpIDwgcmFuZ2UuZW5kKXtcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VsZWN0ZWQ7XG59XG4iLCJpbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi4vbW9kZWxzL1NvcnQnO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi9lbnVtcy9Tb3J0VHlwZSc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vZW51bXMvU29ydERpcmVjdGlvbic7XG5cbi8qKlxuICogR2V0cyB0aGUgbmV4dCBzb3J0IGRpcmVjdGlvblxuICogQHBhcmFtICB7U29ydFR5cGV9ICAgICAgc29ydFR5cGVcbiAqIEBwYXJhbSAge1NvcnREaXJlY3Rpb259IGN1cnJlbnRTb3J0XG4gKiBAcmV0dXJuIHtTb3J0RGlyZWN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dFNvcnREaXIoc29ydFR5cGU6IFNvcnRUeXBlLCBjdXJyZW50OiBTb3J0RGlyZWN0aW9uKTogU29ydERpcmVjdGlvbiB7XG4gIGlmIChzb3J0VHlwZSA9PT0gU29ydFR5cGUuc2luZ2xlKSB7XG4gICAgaWYoY3VycmVudCA9PT0gU29ydERpcmVjdGlvbi5hc2Mpe1xuICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb24uZGVzYztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb24uYXNjO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZighY3VycmVudCl7XG4gICAgICByZXR1cm4gU29ydERpcmVjdGlvbi5hc2M7XG4gICAgfSBlbHNlIGlmKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uYXNjKXtcbiAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uLmRlc2M7XG4gICAgfSBlbHNlIGlmKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQWRhcHRlZCBmcm9tIGZ1ZWxkLXVpIG9uIDYvMjE2XG4gKiBodHRwczovL2dpdGh1Yi5jb20vRnVlbEludGVyYWN0aXZlL2Z1ZWwtdWkvdHJlZS9tYXN0ZXIvc3JjL3BpcGVzL09yZGVyQnlcbiAqIEBwYXJhbSAge2FueX0gICAgYVxuICogQHBhcmFtICB7YW55fSAgICBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvcmRlckJ5Q29tcGFyYXRvcihhOiBhbnksIGI6IGFueSk6IG51bWJlciB7XG4gIGlmIChhID09PSBudWxsIHx8IHR5cGVvZiBhID09PSAndW5kZWZpbmVkJykgYSA9IDA7XG4gIGlmIChiID09PSBudWxsIHx8IHR5cGVvZiBiID09PSAndW5kZWZpbmVkJykgYiA9IDA7XG5cbiAgaWYgKChpc05hTihwYXJzZUZsb2F0KGEpKSB8fCAhaXNGaW5pdGUoYSkpIHx8IChpc05hTihwYXJzZUZsb2F0KGIpKSB8fCAhaXNGaW5pdGUoYikpKSB7XG4gICAgLy9Jc24ndCBhIG51bWJlciBzbyBsb3dlcmNhc2UgdGhlIHN0cmluZyB0byBwcm9wZXJseSBjb21wYXJlXG4gICAgaWYgKGEudG9Mb3dlckNhc2UoKSA8IGIudG9Mb3dlckNhc2UoKSkgcmV0dXJuIC0xO1xuICAgIGlmIChhLnRvTG93ZXJDYXNlKCkgPiBiLnRvTG93ZXJDYXNlKCkpIHJldHVybiAxO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vUGFyc2Ugc3RyaW5ncyBhcyBudW1iZXJzIHRvIGNvbXBhcmUgcHJvcGVybHlcbiAgICBpZiAocGFyc2VGbG9hdChhKSA8IHBhcnNlRmxvYXQoYikpIHJldHVybiAtMTtcbiAgICBpZiAocGFyc2VGbG9hdChhKSA+IHBhcnNlRmxvYXQoYikpIHJldHVybiAxO1xuICB9XG5cbiAgLy8gZXF1YWwgZWFjaCBvdGhlclxuICByZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBTb3J0cyB0aGUgcm93c1xuICogQHBhcmFtICB7QXJyYXk8YW55Pn0gIHJvd3NcbiAqIEBwYXJhbSAge0FycmF5PFNvcnQ+fSBkaXJzXG4gKiBAcmV0dXJuIHtBcnJheTxhbnk+fSByZXN1bHRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0Um93cyhyb3dzOiBBcnJheTxhbnk+LCBkaXJzOiBBcnJheTxTb3J0Pikge1xuICBsZXQgdGVtcCA9IFsuLi5yb3dzXTtcblxuICByZXR1cm4gdGVtcC5zb3J0KGZ1bmN0aW9uKGE6IGFueSwgYjogYW55KSB7XG4gICAgZm9yKGNvbnN0IHsgcHJvcCwgZGlyIH0gb2YgZGlycykge1xuICAgICAgY29uc3QgY29tcGFyaXNvbiA9IGRpciAhPT0gU29ydERpcmVjdGlvbi5kZXNjID9cbiAgICAgICAgb3JkZXJCeUNvbXBhcmF0b3IoYVtwcm9wXSwgYltwcm9wXSkgOlxuICAgICAgICAtb3JkZXJCeUNvbXBhcmF0b3IoYVtwcm9wXSwgYltwcm9wXSk7XG5cbiAgICAgIC8vRG9uJ3QgcmV0dXJuIDAgeWV0IGluIGNhc2Ugb2YgbmVlZGluZyB0byBzb3J0IGJ5IG5leHQgcHJvcGVydHlcbiAgICAgIGlmIChjb21wYXJpc29uICE9PSAwKSByZXR1cm4gY29tcGFyaXNvbjtcbiAgICB9XG5cbiAgICAvL2VxdWFsIGVhY2ggb3RoZXJcbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG4iXX0=
