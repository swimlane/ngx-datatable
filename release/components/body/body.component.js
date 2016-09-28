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
var utils_1 = require('utils');
var services_1 = require('services');
var types_1 = require('types');
var directives_1 = require('directives');
var DataTableBody = (function () {
    function DataTableBody(state, element, renderer) {
        this.state = state;
        this.onRowClick = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-body', true);
    }
    Object.defineProperty(DataTableBody.prototype, "selectEnabled", {
        get: function () {
            return !!this.state.options.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyHeight", {
        get: function () {
            if (this.state.options.scrollbarV) {
                return this.state.bodyHeight + 'px';
            }
            else {
                return 'auto';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBody.prototype, "bodyWidth", {
        get: function () {
            if (this.state.options.scrollbarH) {
                return this.state.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableBody.prototype.ngOnInit = function () {
        var _this = this;
        this.rows = this.state.rows.slice();
        this.updateRows();
        this.sub = this.state.onPageChange.subscribe(function (action) {
            _this.updateRows();
            _this.hideIndicator();
            if (_this.state.options.scrollbarV && action.type === 'pager-event') {
                var offset = (_this.state.options.rowHeight * action.limit) * action.offset;
                _this.scroller.setOffset(offset);
            }
        });
        this.sub.add(this.state.onRowsUpdate.subscribe(function (rows) {
            _this.updateRows();
            _this.hideIndicator();
        }));
    };
    DataTableBody.prototype.onBodyScroll = function (props) {
        this.state.offsetY = props.scrollYPos;
        this.state.offsetX = props.scrollXPos;
        this.updatePage(props.direction);
        this.updateRows();
    };
    DataTableBody.prototype.updatePage = function (direction) {
        var idxs = this.state.indexes;
        var page = idxs.first / this.state.pageSize;
        if (direction === 'up') {
            page = Math.floor(page);
        }
        else if (direction === 'down') {
            page = Math.ceil(page);
        }
        if (direction !== undefined && !isNaN(page)) {
            // pages are offset + 1 ;)
            this.state.setPage({
                type: 'body-event',
                value: page + 1
            });
        }
    };
    DataTableBody.prototype.updateRows = function (refresh) {
        var idxs = this.state.indexes;
        var idx = 0;
        var rowIndex = idxs.first;
        var endSpliceIdx = refresh ? this.state.rowCount : idxs.last - idxs.first;
        this.rows = this.rows.slice(0, endSpliceIdx);
        while (rowIndex < idxs.last && rowIndex < this.state.rowCount) {
            var row = this.state.rows[rowIndex];
            if (row) {
                row.$$index = rowIndex;
                this.rows[idx] = row;
            }
            idx++;
            rowIndex++;
        }
    };
    DataTableBody.prototype.getRowsStyles = function (row) {
        var rowHeight = this.state.options.rowHeight;
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.state.options.scrollbarV) {
            var idx = row ? row.$$index : 0;
            var pos = idx * rowHeight;
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    DataTableBody.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.state.options.loadingIndicator = false; }, 500);
    };
    DataTableBody.prototype.rowClicked = function (event, index, row) {
        this.onRowClick.emit({ event: event, row: row });
        this.selectRow(event, index, row);
    };
    DataTableBody.prototype.rowKeydown = function (event, index, row) {
        if (event.keyCode === utils_1.Keys.return && this.selectEnabled) {
            this.selectRow(event, index, row);
        }
        else if (event.keyCode === utils_1.Keys.up || event.keyCode === utils_1.Keys.down) {
            var dom = event.keyCode === utils_1.Keys.up ?
                event.target.previousElementSibling :
                event.target.nextElementSibling;
            if (dom)
                dom.focus();
        }
    };
    DataTableBody.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var multiShift = this.state.options.selectionType === types_1.SelectionType.multiShift;
        var multiClick = this.state.options.selectionType === types_1.SelectionType.multi;
        var selections = [];
        if (multiShift || multiClick) {
            if (multiShift && event.shiftKey) {
                var selected = this.state.selected.slice();
                selections = utils_1.selectRowsBetween(selected, this.rows, index, this.prevIndex);
            }
            else if (multiShift && !event.shiftKey) {
                selections.push(row);
            }
            else {
                var selected = this.state.selected.slice();
                selections = utils_1.selectRows(selected, row);
            }
        }
        else {
            selections.push(row);
        }
        this.prevIndex = index;
        this.onRowSelect.emit(selections);
    };
    DataTableBody.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBody.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBody.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.ViewChild(directives_1.Scroller), 
        __metadata('design:type', directives_1.Scroller)
    ], DataTableBody.prototype, "scroller", void 0);
    __decorate([
        core_1.HostBinding('style.height'), 
        __metadata('design:type', Object)
    ], DataTableBody.prototype, "bodyHeight", null);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', Object)
    ], DataTableBody.prototype, "bodyWidth", null);
    DataTableBody = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <div>\n      <datatable-progress\n        *ngIf=\"state.options.loadingIndicator\">\n      </datatable-progress>\n      <div\n        scroller\n        (onScroll)=\"onBodyScroll($event)\"\n        *ngIf=\"state.rows.length\"\n        [rowHeight]=\"state.options.rowHeight\"\n        [scrollbarV]=\"state.options.scrollbarV\"\n        [scrollbarH]=\"state.options.scrollbarH\"\n        [count]=\"state.rowCount\"\n        [scrollWidth]=\"state.columnGroupWidths.total\">\n        <datatable-body-row\n          [ngStyle]=\"getRowsStyles(row)\"\n          [style.height]=\"state.options.rowHeight + 'px'\"\n          *ngFor=\"let row of rows; let i = index;\"\n          [attr.tabindex]=\"i\"\n          (click)=\"rowClicked($event, i, row)\"\n          (keydown)=\"rowKeydown($event, i, row)\"\n          [row]=\"row\"\n          [class.datatable-row-even]=\"row.$$index % 2 === 0\"\n          [class.datatable-row-odd]=\"row.$$index % 2 !== 0\">\n        </datatable-body-row>\n      </div>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"state.options.emptyMessage\">\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_1.StateService, core_1.ElementRef, core_1.Renderer])
    ], DataTableBody);
    return DataTableBody;
}());
exports.DataTableBody = DataTableBody;
//# sourceMappingURL=body.component.js.map