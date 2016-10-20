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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var utils_1 = require('../utils');
var types_1 = require('../types');
var models_1 = require('../models');
var datatable_column_directive_1 = require('./datatable-column.directive');
var services_1 = require('../services');
var datatable_row_detail_template_directive_1 = require('./datatable-row-detail-template.directive');
var DataTable = (function () {
    function DataTable(state, renderer, element, differs) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onColumnChange = new core_1.EventEmitter();
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable', true);
        this.rowDiffer = differs.find({}).create(null);
        this.colDiffer = differs.find({}).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSubscriber = this.state.onPageChange.subscribe(function (action) {
            _this.onPageChange.emit({
                page: action.value,
                offset: _this.state.options.offset,
                limit: _this.state.pageSize,
                count: _this.state.rowCount
            });
        });
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.adjustSizes();
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.rowDetailTemplateChild) {
            this.state.options.rowDetailTemplate = this.rowDetailTemplateChild.rowDetailTemplate;
        }
        this.adjustColumns();
        if (this.columns.length) {
            // changing the columns without a timeout
            // causes a interesting timing bug
            setTimeout(function () {
                // this translates the expressive columns
                // that are defined into the markup to
                // column objects
                for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.options.columns.push(new models_1.TableColumn(col));
                }
            });
        }
    };
    DataTable.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('options')) {
            this.state.setOptions(changes.options.currentValue);
        }
        if (changes.hasOwnProperty('rows')) {
            this.state.setRows(changes.rows.currentValue);
        }
        if (changes.hasOwnProperty('selected')) {
            this.state.setSelected(changes.selected.currentValue);
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.state.setRows(this.rows);
            this.onRowsUpdate.emit(this.rows);
        }
        this.checkColumnChanges();
    };
    DataTable.prototype.ngOnDestroy = function () {
        this.pageSubscriber.unsubscribe();
    };
    DataTable.prototype.checkColumnChanges = function () {
        var colDiff = this.colDiffer.diff(this.options.columns);
        if (colDiff) {
            var chngd_1 = false;
            colDiff.forEachAddedItem(function () {
                chngd_1 = true;
                return false;
            });
            if (!chngd_1) {
                colDiff.forEachRemovedItem(function () {
                    chngd_1 = true;
                    return false;
                });
            }
            // if a column was added or removed
            // we need to re-adjust columns
            if (chngd_1)
                this.adjustColumns();
        }
    };
    DataTable.prototype.adjustSizes = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.state.innerWidth = Math.floor(width);
        if (this.options.scrollbarV) {
            if (this.options.headerHeight)
                height = height - this.options.headerHeight;
            if (this.options.footerHeight)
                height = height - this.options.footerHeight;
            this.state.bodyHeight = height;
        }
        this.adjustColumns();
    };
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DataTable.prototype.toggleExpandRow = function (row) {
        // Should we write a guard here??
        this.state.toggleRowExpansion(row);
    };
    /**
     * API method to expand all the rows.
     */
    DataTable.prototype.expandAllRows = function () {
        this.state.toggleAllRows(true);
    };
    /**
     * API method to collapse all the rows.
     */
    DataTable.prototype.collapseAllRows = function () {
        this.state.toggleAllRows(false);
    };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.options.columns)
            return;
        var width = this.state.innerWidth;
        if (this.options.scrollbarV) {
            width = width - this.state.scrollbarWidth;
        }
        if (this.options.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(this.options.columns, width, forceIdx);
        }
        else if (this.options.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(this.options.columns, width);
        }
    };
    DataTable.prototype.onRowSelect = function (event) {
        this.state.setSelected(event);
        this.onSelectionChange.emit(event);
    };
    DataTable.prototype.resize = function () {
        this.adjustSizes();
    };
    Object.defineProperty(DataTable.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.options.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.options.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isVertScroll", {
        get: function () {
            return this.options.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isHorScroll", {
        get: function () {
            return this.options.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isSelectable", {
        get: function () {
            return this.options.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.TableOptions)
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
        core_1.ContentChildren(datatable_column_directive_1.DataTableColumn), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        core_1.ContentChild(datatable_row_detail_template_directive_1.DatatableRowDetailTemplate), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "rowDetailTemplateChild", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTable.prototype, "resize", null);
    __decorate([
        core_1.HostBinding('class.fixed-header'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isSelectable", null);
    DataTable = __decorate([
        core_1.Component({
            selector: 'datatable',
            providers: [services_1.StateService],
            template: "\n    <div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header\n        *ngIf=\"state.options.headerHeight\"\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </datatable-header>\n      <datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </datatable-body>\n      <datatable-footer\n         *ngIf=\"state.options.footerHeight\"\n        (onPageChange)=\"state.setPage($event)\">\n      </datatable-footer>\n    </div>\n  "
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [services_1.StateService, core_1.Renderer, core_1.ElementRef, core_1.KeyValueDiffers])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.component.js.map