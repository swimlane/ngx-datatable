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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var DataTableSelectionComponent = /** @class */ (function () {
    function DataTableSelectionComponent(elementRef) {
        this.elementRef = elementRef;
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.cellSelect = new core_1.EventEmitter();
    }
<<<<<<< HEAD
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row, cellName) {
=======
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        var _a;
>>>>>>> upstream
        if (!this.selectEnabled)
            return;
        var cell = this.selectionType === types_1.SelectionType.cell;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var multi = this.selectionType === types_1.SelectionType.multi;
        var multiClick = this.selectionType === types_1.SelectionType.multiClick;
        var selected = [];
        var selectedCellName = null;
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = utils_1.selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = utils_1.selectRows(this.selected.slice(), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
            if (cell) {
                selectedCellName = utils_1.camelCase(cellName);
            }
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, selected);
        this.selectedCellName = selectedCellName;
        this.prevIndex = index;
        this.select.emit({
            selected: selected,
            selectedCellName: selectedCellName
        });
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.transferCellTabFocus(model.cellElement);
            this.selectRow(event, index, row, model.cellName);
        }
        else if (type === 'keydown') {
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row, model.cellName);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    };
    DataTableSelectionComponent.prototype.onKeyboardFocus = function (model) {
        var keyCode = model.event.keyCode;
        var shouldFocus = keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.left;
        if (shouldFocus) {
            this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
        }
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var prevNextRow = null;
        if (keyCode === utils_1.Keys.up) {
            prevNextRow = this.getPrevRow(rowElement);
            if (!prevNextRow) {
                this.scrollTableBody(rowElement, keyCode);
            }
            else if (!this.getPrevRow(prevNextRow)) {
                this.scrollTableBody(prevNextRow, keyCode);
            }
        }
        else if (keyCode === utils_1.Keys.down) {
            prevNextRow = this.getNextRow(rowElement);
            if (!prevNextRow) {
                this.scrollTableBody(rowElement, keyCode);
            }
            else if (!this.getNextRow(prevNextRow)) {
                this.scrollTableBody(prevNextRow, keyCode);
            }
        }
        return prevNextRow;
    };
    DataTableSelectionComponent.prototype.getPrevRow = function (rowElement) {
        var prevRow = rowElement.previousElementSibling;
        var parentElement = rowElement.parentElement;
        if (prevRow && prevRow.tagName.toLowerCase() === 'datatable-body-row') {
            return prevRow;
        }
        else if (parentElement) {
            // Cannot find next row in current row wrapper, so look at each prev row wrapper to find one with row contents.
            var prevRowWrapper = parentElement;
            while (prevRowWrapper) {
                prevRowWrapper = prevRowWrapper.previousElementSibling;
                if (prevRowWrapper) {
                    for (var i = prevRowWrapper.children.length - 1; i >= 0; i--) {
                        if (prevRowWrapper.children[i].tagName.toLowerCase() === 'datatable-body-row') {
                            return prevRowWrapper.children[i];
                        }
                    }
                }
            }
        }
        return null;
    };
    DataTableSelectionComponent.prototype.getNextRow = function (rowElement) {
        var nextRow = rowElement.nextElementSibling;
        var parentElement = rowElement.parentElement;
        if (nextRow && nextRow.tagName.toLowerCase() === 'datatable-body-row') {
            return nextRow;
        }
        else if (parentElement) {
            // Cannot find next row in current row wrapper, so look at each next row wrapper to find one with row contents.
            var nextRowWrapper = parentElement;
            while (nextRowWrapper) {
                nextRowWrapper = nextRowWrapper.nextElementSibling;
                if (nextRowWrapper) {
                    for (var i = 0; i < nextRowWrapper.children.length; i++) {
                        if (nextRowWrapper.children[i].tagName.toLowerCase() === 'datatable-body-row') {
                            return nextRowWrapper.children[i];
                        }
                    }
                }
            }
        }
        return null;
    };
    /**
     * If it is found that the 2nd last element has been focused (either at top or bottom of table body viewport),
     * then scroll the table viewport so that more elements will be visible and available for focus.
     */
    DataTableSelectionComponent.prototype.scrollTableBody = function (lastRow, keyCode) {
        var lastRowWrap = lastRow.parentElement;
        while (lastRowWrap && lastRowWrap.tagName.toLowerCase() !== 'datatable-row-wrapper') {
            lastRowWrap = lastRowWrap.parentElement;
        }
        if (lastRowWrap) {
            var tableBodyElem = lastRowWrap.parentElement;
            while (tableBodyElem && tableBodyElem.tagName.toLowerCase() !== 'datatable-body') {
                tableBodyElem = tableBodyElem.parentElement;
            }
            if (tableBodyElem) {
                var lastWrapRect = lastRowWrap.getBoundingClientRect();
                var directionMult = (keyCode === utils_1.Keys.down ? 1 : -1);
                tableBodyElem.scrollBy(0, directionMult * lastWrapRect.height);
            }
        }
    };
    /**
     * Resets the tab focus for body cells if paging or scrolling occured that caused focus cell to fall out
     * of bounds. Will automatically set a timeout period that acts like a debunce time to prevent useless
     * operations from occuring while scrolling.
     */
    DataTableSelectionComponent.prototype.resetTabFocusIfLost = function () {
        var _this = this;
        clearTimeout(this._focusResetTimeout);
        this._focusResetTimeout = setTimeout(function () {
            var curTabFocusCellRect;
            var tableBodyRect;
            // Get bounding rectangles of both table body and current tab focus cell.
            if (_this.tabFocusCellElement) {
                curTabFocusCellRect = _this.tabFocusCellElement.getBoundingClientRect();
                var tableBodyElem = _this.tabFocusCellElement.parentElement;
                while (tableBodyElem && tableBodyElem.tagName.toLowerCase() !== 'datatable-body') {
                    tableBodyElem = tableBodyElem.parentElement;
                }
                if (tableBodyElem) {
                    tableBodyRect = tableBodyElem.getBoundingClientRect();
                }
            }
            // Check to see if tab focus cell is outside the boundary of the body.
            if (!_this.tabFocusCellElement || !tableBodyRect
                || curTabFocusCellRect.top >= tableBodyRect.bottom
                || curTabFocusCellRect.bottom <= tableBodyRect.top) {
                var selectionElem = _this.elementRef.nativeElement;
                var firstCell = selectionElem.getElementsByClassName('datatable-body-cell').item(0);
                if (firstCell) {
                    _this.transferCellTabFocus(firstCell);
                }
            }
        }, 100);
    };
    DataTableSelectionComponent.prototype.transferCellTabFocus = function (to) {
        if (this.tabFocusCellElement) {
            this.tabFocusCellElement.tabIndex = -1;
        }
        this.tabFocusCellElement = to;
        to.tabIndex = 0;
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
            if (!nextCellElement || nextCellElement.tagName.toLowerCase() !== 'datatable-body-cell') {
                var cellParent = cellElement.parentElement;
                var prevParent = cellParent.previousElementSibling;
                if (prevParent) {
                    var children = prevParent.getElementsByClassName('datatable-body-cell');
                    if (children.length && children[0].tagName.toLowerCase() === 'datatable-body-cell') {
                        nextCellElement = children[children.length - 1];
                    }
                }
            }
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
            if (!nextCellElement || nextCellElement.tagName.toLowerCase() !== 'datatable-body-cell') {
                var cellParent = cellElement.parentElement;
                var nextParent = cellParent.nextElementSibling;
                if (nextParent) {
                    var children = nextParent.getElementsByClassName('datatable-body-cell');
                    if (children.length && children[0].tagName.toLowerCase() === 'datatable-body-cell') {
                        nextCellElement = children[0];
                    }
                }
            }
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var rowGroup = nextRowElement.getElementsByClassName(cellElement.parentElement.className)[0];
                var children = rowGroup.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement) {
            this.transferCellTabFocus(nextCellElement);
            nextCellElement.focus();
        }
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowSelectedIdx = function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        var rowId = this.rowIdentity(row);
        return selected.findIndex(function (r) {
            var id = _this.rowIdentity(r);
            return id === rowId;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableSelectionComponent.prototype, "selectedCellName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableSelectionComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "cellSelect", void 0);
    DataTableSelectionComponent = __decorate([
        core_1.Component({
            selector: 'datatable-selection',
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;
//# sourceMappingURL=selection.component.js.map