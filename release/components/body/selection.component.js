"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var DataTableSelectionComponent = /** @class */ (function () {
    function DataTableSelectionComponent() {
        this.activate = new core_1.EventEmitter();
        this.activateCell = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.getCellActive = this.getCellActive.bind(this);
        this.getRowActive = this.getRowActive.bind(this);
    }
    DataTableSelectionComponent.prototype.activateRow = function (row, columnIndex, event) {
        var _this = this;
        if (this.activated.$$isDefault && !row.$$isSectionHeader) {
            var nextRow = row;
            var nextColumn = columnIndex;
            if (event) {
                var filteredRows = this.rows.filter(function (t) { return !t.$$isSectionHeader; });
                var rowId_1 = this.rowIdentity(row);
                var rowIndex = filteredRows.findIndex(function (t) { return _this.rowIdentity(t) === rowId_1; });
                if (event.keyCode === utils_1.Keys.up) {
                    nextRow = filteredRows[Math.max(rowIndex - 1, 0)];
                }
                else if (event.keyCode === utils_1.Keys.down || event.keyCode === utils_1.Keys.return) {
                    nextRow = filteredRows[Math.min(rowIndex + 1, filteredRows.length - 1)];
                }
                else if (event.keyCode === utils_1.Keys.left || (event.shiftKey && event.keyCode === utils_1.Keys.tab)) {
                    nextColumn = Math.max(columnIndex - 1, 0);
                }
                else if (event.keyCode === utils_1.Keys.right || event.keyCode === utils_1.Keys.tab) {
                    nextColumn = Math.min(columnIndex + 1, this.columns.length - 1);
                }
            }
            this.activated.row = this.rowIdentity(nextRow);
            this.activated.column = nextColumn;
            this.activateCell.emit(this.activated);
        }
    };
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled || row.$$isSectionHeader)
            return;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var multi = this.selectionType === types_1.SelectionType.multi;
        var multiClick = this.selectionType === types_1.SelectionType.multiClick;
        var selected = [];
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
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, selected);
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
        var _a;
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
            this.activateRow(row, model.cellIndex);
        }
        else if (type === 'keydown') {
            this.activateRow(row, model.cellIndex, event);
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row);
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
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.tab;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === types_1.SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    DataTableSelectionComponent.prototype.focusRow = function (rowElement, keyCode) {
        var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowActive = function (row) {
        return this.activated.row === this.rowIdentity(row)
            && this.selectionType !== types_1.SelectionType.cell;
    };
    DataTableSelectionComponent.prototype.getCellActive = function (row, columnIndex) {
        return this.activated.row === this.rowIdentity(row)
            && columnIndex === this.activated.column
            && this.selectionType === types_1.SelectionType.cell;
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
    DataTableSelectionComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-selection',
                    template: "\n    <ng-content></ng-content>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DataTableSelectionComponent.ctorParameters = function () { return []; };
    DataTableSelectionComponent.propDecorators = {
        'rows': [{ type: core_1.Input },],
        'columns': [{ type: core_1.Input },],
        'selected': [{ type: core_1.Input },],
        'activated': [{ type: core_1.Input },],
        'selectEnabled': [{ type: core_1.Input },],
        'selectionType': [{ type: core_1.Input },],
        'rowIdentity': [{ type: core_1.Input },],
        'selectCheck': [{ type: core_1.Input },],
        'activate': [{ type: core_1.Output },],
        'activateCell': [{ type: core_1.Output },],
        'select': [{ type: core_1.Output },],
    };
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;
//# sourceMappingURL=selection.component.js.map