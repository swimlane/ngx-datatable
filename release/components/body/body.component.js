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
var utils_1 = require('../../utils');
var services_1 = require('../../services');
var types_1 = require('../../types');
var directives_1 = require('../../directives');
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
                // First get the row Index that we need to move to.
                var rowIndex = action.limit * action.offset;
                // const offset = (this.state.options.rowHeight * action.limit) * action.offset;
                _this.scroller.setOffset(_this.state.rowHeightsCache.query(rowIndex - 1));
            }
        });
        this.sub.add(this.state.onExpandChange.subscribe(function (expandedState) {
            // If there was more than one row expanded then there was a mass change
            // in the data set hence adjust the scroll position.
            if (expandedState.rows.length > 1) {
                // -1 is added to the scrollOffset as we want to move the scroller to the offset position
                // where the entire row is visible. What about the small offset e.g. if the scroll
                // position is between rows?  Do we need to take care of it?
                var scrollOffset_1 = _this.state.rowHeightsCache.query(expandedState.currentIndex);
                // Set the offset only after the scroll bar has been updated on the screen.
                setTimeout(function () { return _this.scroller.setOffset(scrollOffset_1); });
            }
        }));
        this.sub.add(this.state.onRowsUpdate.subscribe(function (rows) {
            _this.updateRows();
            _this.hideIndicator();
        }));
        this.sub.add(this.state.onSortChange.subscribe(function () {
            _this.scroller.setOffset(0);
        }));
    };
    DataTableBody.prototype.trackRowBy = function (index, obj) {
        return obj.$$index;
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
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param row  the row for which the height need to be calculated.
     * @returns {number}  height of the row.
     */
    DataTableBody.prototype.getRowHeight = function (row) {
        // Adding detail row height if its expanded.
        return this.state.options.rowHeight +
            (row.$$expanded === 1 ? this.state.options.detailRowHeight : 0);
    };
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param row The row that needs to be placed in the 2D space.
     * @returns {{styles: string}}  Returns the CSS3 style to be applied
     */
    DataTableBody.prototype.getRowsStyles = function (row) {
        var rowHeight = this.getRowHeight(row);
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.state.options.scrollbarV) {
            var idx = row ? row.$$index : 0;
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.state.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    DataTableBody.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.state.options.loadingIndicator = false; }, 500);
    };
    DataTableBody.prototype.rowClicked = function (event, index, row) {
        var clickType = event.type === 'dblclick' ? types_1.ClickType.double : types_1.ClickType.single;
        this.onRowClick.emit({ type: clickType, event: event, row: row });
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
            template: "\n    <div>\n      <datatable-progress\n        *ngIf=\"state.options.loadingIndicator\">\n      </datatable-progress>\n      <div\n        scroller\n        (onScroll)=\"onBodyScroll($event)\"\n        *ngIf=\"state.rows.length\"\n        [rowHeight]=\"state.options.rowHeight\"\n        [scrollbarV]=\"state.options.scrollbarV\"\n        [scrollbarH]=\"state.options.scrollbarH\"\n        [count]=\"state.rowCount\"\n        [scrollHeight]=\"state.scrollHeight\"\n        [limit]=\"state.options.limit\"\n        [scrollWidth]=\"state.columnGroupWidths.total\">\n        <datatable-row-wrapper \n          *ngFor=\"let row of rows; let i = index; trackBy: trackRowBy\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [style.height]=\"getRowHeight(row) + 'px'\"\n          [row]=\"row\">\n          <datatable-body-row\n            [attr.tabindex]=\"i\"\n            [style.height]=\"state.options.rowHeight +  'px'\"\n            (click)=\"rowClicked($event, i, row)\"\n            (dblclick)=\"rowClicked($event, i, row)\"\n            (keydown)=\"rowKeydown($event, i, row)\"\n            [row]=\"row\"\n            [class.datatable-row-even]=\"row.$$index % 2 === 0\"\n            [class.datatable-row-odd]=\"row.$$index % 2 !== 0\">\n          </datatable-body-row>\n        </datatable-row-wrapper>\n      </div>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"state.options.emptyMessage\">\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_1.StateService, core_1.ElementRef, core_1.Renderer])
    ], DataTableBody);
    return DataTableBody;
}());
exports.DataTableBody = DataTableBody;
//# sourceMappingURL=body.component.js.map