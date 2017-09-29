"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../utils");
var DataTableBodySectionHeaderComponent = /** @class */ (function () {
    function DataTableBodySectionHeaderComponent(element) {
        this.activate = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodySectionHeaderComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            this._calculatedWidth = utils_1.columnsTotalWidth(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodySectionHeaderComponent.prototype, "cssClass", {
        get: function () {
            var cls = 'datatable-body-row';
            if (this.isSelected)
                cls += ' active';
            if (this.rowIndex % 2 !== 0)
                cls += ' datatable-row-odd';
            if (this.rowIndex % 2 === 0)
                cls += ' datatable-row-even';
            if (this.rowClass) {
                var res = this.rowClass(this.row);
                if (typeof res === 'string') {
                    cls += " " + res;
                }
                else if (typeof res === 'object') {
                    var keys = Object.keys(res);
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        if (res[k] === true)
                            cls += " " + k;
                    }
                }
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodySectionHeaderComponent.prototype.onClick = function (event) {
        this.activate.emit({
            type: 'click',
            event: event,
            row: this.row,
            rowElement: this.element
        });
    };
    DataTableBodySectionHeaderComponent.prototype.onDblClick = function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            rowElement: this.element
        });
    };
    DataTableBodySectionHeaderComponent.prototype.onKeyDown = function (event) {
        var code = event.key || event.code;
        var isTargetRow = event.target === this.element;
        var isAction = code === utils_1.Codes.return ||
            code === utils_1.Codes.down ||
            code === utils_1.Codes.up ||
            code === utils_1.Codes.left ||
            code === utils_1.Codes.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this.element
            });
        }
    };
    DataTableBodySectionHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-body-section-header',
                    template: "\n    <ng-template\n      *ngIf=\"sectionHeaderTemplate\"\n      [ngTemplateOutlet]=\"sectionHeaderTemplate.template\"\n      [ngOutletContext]=\"{\n        section: row,\n        expanded: expanded,\n        isSelected: isSelected,\n        sectionCount: sectionCount\n      }\">\n    </ng-template>\n    <div *ngIf=\"!sectionHeaderTemplate\">\n      {{row.title}}\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    DataTableBodySectionHeaderComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    DataTableBodySectionHeaderComponent.propDecorators = {
        'columns': [{ type: core_1.Input },],
        'expanded': [{ type: core_1.Input },],
        'rowClass': [{ type: core_1.Input },],
        'row': [{ type: core_1.Input },],
        'isSelected': [{ type: core_1.Input },],
        'rowIndex': [{ type: core_1.Input },],
        'sectionCount': [{ type: core_1.Input },],
        'sectionHeaderTemplate': [{ type: core_1.Input },],
        'cssClass': [{ type: core_1.HostBinding, args: ['class',] },],
        'sectionHeaderHeight': [{ type: core_1.HostBinding, args: ['style.height.px',] }, { type: core_1.Input },],
        'activate': [{ type: core_1.Output },],
        '_calculatedWidth': [{ type: core_1.HostBinding, args: ['style.width.px',] },],
        'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
        'onDblClick': [{ type: core_1.HostListener, args: ['dblclick', ['$event'],] },],
        'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return DataTableBodySectionHeaderComponent;
}());
exports.DataTableBodySectionHeaderComponent = DataTableBodySectionHeaderComponent;
//# sourceMappingURL=body-section-header.component.js.map