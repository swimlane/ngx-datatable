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
    function DataTableSelectionComponent() {
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
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
        }
        else if (type === 'keydown') {
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
            keyCode === utils_1.Keys.left;
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
    DataTableSelectionComponent = __decorate([
        core_1.Component({
            selector: 'datatable-selection',
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;
//# sourceMappingURL=selection.component.js.map